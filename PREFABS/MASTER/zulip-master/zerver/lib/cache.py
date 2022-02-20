# See https://zulip.readthedocs.io/en/latest/subsystems/caching.html for docs
import hashlib
import logging
import os
import re
import secrets
import sys
import time
import traceback
from functools import lru_cache, wraps
from typing import (
    TYPE_CHECKING,
    Any,
    Callable,
    Dict,
    Iterable,
    List,
    Optional,
    Sequence,
    Tuple,
    TypeVar,
    cast,
)

from django.conf import settings
from django.core.cache import cache as djcache
from django.core.cache import caches
from django.core.cache.backends.base import BaseCache
from django.db.models import Q
from django.http import HttpRequest

from zerver.lib.utils import make_safe_digest, statsd, statsd_key

if TYPE_CHECKING:
    # These modules have to be imported for type annotations but
    # they cannot be imported at runtime due to cyclic dependency.
    from zerver.models import Message, Realm, UserProfile

MEMCACHED_MAX_KEY_LENGTH = 250

FuncT = TypeVar('FuncT', bound=Callable[..., object])

logger = logging.getLogger()

class NotFoundInCache(Exception):
    pass


remote_cache_time_start = 0.0
remote_cache_total_time = 0.0
remote_cache_total_requests = 0

def get_remote_cache_time() -> float:
    return remote_cache_total_time

def get_remote_cache_requests() -> int:
    return remote_cache_total_requests

def remote_cache_stats_start() -> None:
    global remote_cache_time_start
    remote_cache_time_start = time.time()

def remote_cache_stats_finish() -> None:
    global remote_cache_total_time
    global remote_cache_total_requests
    global remote_cache_time_start
    remote_cache_total_requests += 1
    remote_cache_total_time += (time.time() - remote_cache_time_start)

def get_or_create_key_prefix() -> str:
    if settings.PUPPETEER_TESTS:
        # This sets the prefix for the benefit of the Puppeteer tests.
        #
        # Having a fixed key is OK since we don't support running
        # multiple copies of the Puppeteer tests at the same time anyway.
        return 'puppeteer_tests:'
    elif settings.TEST_SUITE:
        # The Python tests overwrite KEY_PREFIX on each test, but use
        # this codepath as well, just to save running the more complex
        # code below for reading the normal key prefix.
        return 'django_tests_unused:'

    # directory `var` should exist in production
    os.makedirs(os.path.join(settings.DEPLOY_ROOT, "var"), exist_ok=True)

    filename = os.path.join(settings.DEPLOY_ROOT, "var", "remote_cache_prefix")
    try:
        with open(filename, 'x') as f:
            prefix = secrets.token_hex(16) + ':'
            f.write(prefix + "\n")
    except FileExistsError:
        tries = 1
        while tries < 10:
            with open(filename) as f:
                prefix = f.readline()[:-1]
            if len(prefix) == 33:
                break
            tries += 1
            prefix = ''
            time.sleep(0.5)

    if not prefix:
        print("Could not read remote cache key prefix file")
        sys.exit(1)

    return prefix

KEY_PREFIX: str = get_or_create_key_prefix()

def bounce_key_prefix_for_testing(test_name: str) -> None:
    global KEY_PREFIX
    KEY_PREFIX = test_name + ':' + str(os.getpid()) + ':'
    # We are taking the hash of the KEY_PREFIX to decrease the size of the key.
    # Memcached keys should have a length of less than 250.
    KEY_PREFIX = hashlib.sha1(KEY_PREFIX.encode('utf-8')).hexdigest() + ":"

def get_cache_backend(cache_name: Optional[str]) -> BaseCache:
    if cache_name is None:
        return djcache
    return caches[cache_name]

def get_cache_with_key(
        keyfunc: Callable[..., str],
        cache_name: Optional[str]=None,
) -> Callable[[FuncT], FuncT]:
    """
    The main goal of this function getting value from the cache like in the "cache_with_key".
    A cache value can contain any data including the "None", so
    here used exception for case if value isn't found in the cache.
    """
    def decorator(func: FuncT) -> FuncT:
        @wraps(func)
        def func_with_caching(*args: object, **kwargs: object) -> object:
            key = keyfunc(*args, **kwargs)
            try:
                val = cache_get(key, cache_name=cache_name)
            except InvalidCacheKeyException:
                stack_trace = traceback.format_exc()
                log_invalid_cache_keys(stack_trace, [key])
                val = None

            if val is not None:
                return val[0]
            raise NotFoundInCache()

        return cast(FuncT, func_with_caching)  # https://github.com/python/mypy/issues/1927

    return decorator

def cache_with_key(
        keyfunc: Callable[..., str], cache_name: Optional[str]=None,
        timeout: Optional[int]=None, with_statsd_key: Optional[str]=None,
) -> Callable[[FuncT], FuncT]:
    """Decorator which applies Django caching to a function.

       Decorator argument is a function which computes a cache key
       from the original function's arguments.  You are responsible
       for avoiding collisions with other uses of this decorator or
       other uses of caching."""

    def decorator(func: FuncT) -> FuncT:
        @wraps(func)
        def func_with_caching(*args: object, **kwargs: object) -> object:
            key = keyfunc(*args, **kwargs)

            try:
                val = cache_get(key, cache_name=cache_name)
            except InvalidCacheKeyException:
                stack_trace = traceback.format_exc()
                log_invalid_cache_keys(stack_trace, [key])
                return func(*args, **kwargs)

            extra = ""
            if cache_name == 'database':
                extra = ".dbcache"

            if with_statsd_key is not None:
                metric_key = with_statsd_key
            else:
                metric_key = statsd_key(key)

            status = "hit" if val is not None else "miss"
            statsd.incr(f"cache{extra}.{metric_key}.{status}")

            # Values are singleton tuples so that we can distinguish
            # a result of None from a missing key.
            if val is not None:
                return val[0]

            val = func(*args, **kwargs)

            cache_set(key, val, cache_name=cache_name, timeout=timeout)

            return val

        return cast(FuncT, func_with_caching)  # https://github.com/python/mypy/issues/1927

    return decorator

class InvalidCacheKeyException(Exception):
    pass

def log_invalid_cache_keys(stack_trace: str, key: List[str]) -> None:
    logger.warning(
        "Invalid cache key used: %s\nStack trace: %s\n", key, stack_trace,
    )

def validate_cache_key(key: str) -> None:
    if not key.startswith(KEY_PREFIX):
        key = KEY_PREFIX + key

    # Theoretically memcached can handle non-ascii characters
    # and only "control" characters are strictly disallowed, see:
    # https://github.com/memcached/memcached/blob/master/doc/protocol.txt
    # However, limiting the characters we allow in keys simiplifies things,
    # and anyway we use make_safe_digest when forming some keys to ensure
    # the resulting keys fit the regex below.
    # The regex checks "all characters between ! and ~ in the ascii table",
    # which happens to be the set of all "nice" ascii characters.
    if not bool(re.fullmatch(r"([!-~])+", key)):
        raise InvalidCacheKeyException("Invalid characters in the cache key: " + key)
    if len(key) > MEMCACHED_MAX_KEY_LENGTH:
        raise InvalidCacheKeyException(f"Cache key too long: {key} Length: {len(key)}")

def cache_set(key: str, val: Any, cache_name: Optional[str]=None, timeout: Optional[int]=None) -> None:
    final_key = KEY_PREFIX + key
    validate_cache_key(final_key)

    remote_cache_stats_start()
    cache_backend = get_cache_backend(cache_name)
    cache_backend.set(final_key, (val,), timeout=timeout)
    remote_cache_stats_finish()

def cache_get(key: str, cache_name: Optional[str]=None) -> Any:
    final_key = KEY_PREFIX + key
    validate_cache_key(final_key)

    remote_cache_stats_start()
    cache_backend = get_cache_backend(cache_name)
    ret = cache_backend.get(final_key)
    remote_cache_stats_finish()
    return ret

def cache_get_many(keys: List[str], cache_name: Optional[str]=None) -> Dict[str, Any]:
    keys = [KEY_PREFIX + key for key in keys]
    for key in keys:
        validate_cache_key(key)
    remote_cache_stats_start()
    ret = get_cache_backend(cache_name).get_many(keys)
    remote_cache_stats_finish()
    return {key[len(KEY_PREFIX):]: value for key, value in ret.items()}

def safe_cache_get_many(keys: List[str], cache_name: Optional[str]=None) -> Dict[str, Any]:
    """Variant of cache_get_many that drops any keys that fail
    validation, rather than throwing an exception visible to the
    caller."""
    try:
        # Almost always the keys will all be correct, so we just try
        # to do normal cache_get_many to avoid the overhead of
        # validating all the keys here.
        return cache_get_many(keys, cache_name)
    except InvalidCacheKeyException:
        stack_trace = traceback.format_exc()
        good_keys, bad_keys = filter_good_and_bad_keys(keys)

        log_invalid_cache_keys(stack_trace, bad_keys)
        return cache_get_many(good_keys, cache_name)

def cache_set_many(items: Dict[str, Any], cache_name: Optional[str]=None,
                   timeout: Optional[int]=None) -> None:
    new_items = {}
    for key in items:
        new_key = KEY_PREFIX + key
        validate_cache_key(new_key)
        new_items[new_key] = items[key]
    items = new_items
    remote_cache_stats_start()
    get_cache_backend(cache_name).set_many(items, timeout=timeout)
    remote_cache_stats_finish()

def safe_cache_set_many(items: Dict[str, Any], cache_name: Optional[str]=None,
                        timeout: Optional[int]=None) -> None:
    """Variant of cache_set_many that drops saving any keys that fail
    validation, rather than throwing an exception visible to the
    caller."""
    try:
        # Almost always the keys will all be correct, so we just try
        # to do normal cache_set_many to avoid the overhead of
        # validating all the keys here.
        return cache_set_many(items, cache_name, timeout)
    except InvalidCacheKeyException:
        stack_trace = traceback.format_exc()

        good_keys, bad_keys = filter_good_and_bad_keys(list(items.keys()))
        log_invalid_cache_keys(stack_trace, bad_keys)

        good_items = {key: items[key] for key in good_keys}
        return cache_set_many(good_items, cache_name, timeout)

def cache_delete(key: str, cache_name: Optional[str]=None) -> None:
    final_key = KEY_PREFIX + key
    validate_cache_key(final_key)

    remote_cache_stats_start()
    get_cache_backend(cache_name).delete(final_key)
    remote_cache_stats_finish()

def cache_delete_many(items: Iterable[str], cache_name: Optional[str]=None) -> None:
    keys = [KEY_PREFIX + item for item in items]
    for key in keys:
        validate_cache_key(key)
    remote_cache_stats_start()
    get_cache_backend(cache_name).delete_many(keys)
    remote_cache_stats_finish()

def filter_good_and_bad_keys(keys: List[str]) -> Tuple[List[str], List[str]]:
    good_keys = []
    bad_keys = []
    for key in keys:
        try:
            validate_cache_key(key)
            good_keys.append(key)
        except InvalidCacheKeyException:
            bad_keys.append(key)

    return good_keys, bad_keys

# Generic_bulk_cached fetch and its helpers.  We start with declaring
# a few type variables that help define its interface.

# Type for the cache's keys; will typically be int or str.
ObjKT = TypeVar('ObjKT')

# Type for items to be fetched from the database (e.g. a Django model object)
ItemT = TypeVar('ItemT')

# Type for items to be stored in the cache (e.g. a dictionary serialization).
# Will equal ItemT unless a cache_transformer is specified.
CacheItemT = TypeVar('CacheItemT')

# Type for compressed items for storage in the cache.  For
# serializable objects, will be the object; if encoded, bytes.
CompressedItemT = TypeVar('CompressedItemT')

# Required Arguments are as follows:
# * object_ids: The list of object ids to look up
# * cache_key_function: object_id => cache key
# * query_function: [object_ids] => [objects from database]
# * setter: Function to call before storing items to cache (e.g. compression)
# * extractor: Function to call on items returned from cache
#   (e.g. decompression).  Should be the inverse of the setter
#   function.
# * id_fetcher: Function mapping an object from database => object_id
#   (in case we're using a key more complex than obj.id)
# * cache_transformer: Function mapping an object from database =>
#   value for cache (in case the values that we're caching are some
#   function of the objects, not the objects themselves)
def generic_bulk_cached_fetch(
        cache_key_function: Callable[[ObjKT], str],
        query_function: Callable[[List[ObjKT]], Iterable[ItemT]],
        object_ids: Sequence[ObjKT],
        *,
        extractor: Callable[[CompressedItemT], CacheItemT],
        setter: Callable[[CacheItemT], CompressedItemT],
        id_fetcher: Callable[[ItemT], ObjKT],
        cache_transformer: Callable[[ItemT], CacheItemT],
) -> Dict[ObjKT, CacheItemT]:
    if len(object_ids) == 0:
        # Nothing to fetch.
        return {}

    cache_keys: Dict[ObjKT, str] = {}
    for object_id in object_ids:
        cache_keys[object_id] = cache_key_function(object_id)

    cached_objects_compressed: Dict[str, Tuple[CompressedItemT]] = safe_cache_get_many(
        [cache_keys[object_id] for object_id in object_ids],
    )

    cached_objects: Dict[str, CacheItemT] = {}
    for (key, val) in cached_objects_compressed.items():
        cached_objects[key] = extractor(cached_objects_compressed[key][0])
    needed_ids = [object_id for object_id in object_ids if
                  cache_keys[object_id] not in cached_objects]

    # Only call query_function if there are some ids to fetch from the database:
    if len(needed_ids) > 0:
        db_objects = query_function(needed_ids)
    else:
        db_objects = []

    items_for_remote_cache: Dict[str, Tuple[CompressedItemT]] = {}
    for obj in db_objects:
        key = cache_keys[id_fetcher(obj)]
        item = cache_transformer(obj)
        items_for_remote_cache[key] = (setter(item),)
        cached_objects[key] = item
    if len(items_for_remote_cache) > 0:
        safe_cache_set_many(items_for_remote_cache)
    return {object_id: cached_objects[cache_keys[object_id]] for object_id in object_ids
            if cache_keys[object_id] in cached_objects}

def transformed_bulk_cached_fetch(
    cache_key_function: Callable[[ObjKT], str],
    query_function: Callable[[List[ObjKT]], Iterable[ItemT]],
    object_ids: Sequence[ObjKT],
    *,
    id_fetcher: Callable[[ItemT], ObjKT],
    cache_transformer: Callable[[ItemT], CacheItemT],
) -> Dict[ObjKT, CacheItemT]:
    return generic_bulk_cached_fetch(
        cache_key_function,
        query_function,
        object_ids,
        extractor=lambda obj: obj,
        setter=lambda obj: obj,
        id_fetcher=id_fetcher,
        cache_transformer=cache_transformer,
    )

def bulk_cached_fetch(
    cache_key_function: Callable[[ObjKT], str],
    query_function: Callable[[List[ObjKT]], Iterable[ItemT]],
    object_ids: Sequence[ObjKT],
    *,
    id_fetcher: Callable[[ItemT], ObjKT],
) -> Dict[ObjKT, ItemT]:
    return transformed_bulk_cached_fetch(
        cache_key_function,
        query_function,
        object_ids,
        id_fetcher=id_fetcher,
        cache_transformer=lambda obj: obj,
    )

def preview_url_cache_key(url: str) -> str:
    return f"preview_url:{make_safe_digest(url)}"

def display_recipient_cache_key(recipient_id: int) -> str:
    return f"display_recipient_dict:{recipient_id}"

def display_recipient_bulk_get_users_by_id_cache_key(user_id: int) -> str:
    # Cache key function for a function for bulk fetching users, used internally
    # by display_recipient code.
    return 'bulk_fetch_display_recipients:' + user_profile_by_id_cache_key(user_id)

def user_profile_by_email_cache_key(email: str) -> str:
    # See the comment in zerver/lib/avatar_hash.py:gravatar_hash for why we
    # are proactively encoding email addresses even though they will
    # with high likelihood be ASCII-only for the foreseeable future.
    return f'user_profile_by_email:{make_safe_digest(email.strip())}'

def user_profile_cache_key_id(email: str, realm_id: int) -> str:
    return f"user_profile:{make_safe_digest(email.strip())}:{realm_id}"

def user_profile_cache_key(email: str, realm: 'Realm') -> str:
    return user_profile_cache_key_id(email, realm.id)

def bot_profile_cache_key(email: str) -> str:
    return f"bot_profile:{make_safe_digest(email.strip())}"

def user_profile_by_id_cache_key(user_profile_id: int) -> str:
    return f"user_profile_by_id:{user_profile_id}"

def user_profile_by_api_key_cache_key(api_key: str) -> str:
    return f"user_profile_by_api_key:{api_key}"

realm_user_dict_fields: List[str] = [
    'id', 'full_name', 'email',
    'avatar_source', 'avatar_version', 'is_active',
    'role', 'is_bot', 'realm_id', 'timezone',
    'date_joined', 'bot_owner_id', 'delivery_email',
    'bot_type', 'long_term_idle'
]

def realm_user_dicts_cache_key(realm_id: int) -> str:
    return f"realm_user_dicts:{realm_id}"

def get_realm_used_upload_space_cache_key(realm: 'Realm') -> str:
    return f'realm_used_upload_space:{realm.id}'

def active_user_ids_cache_key(realm_id: int) -> str:
    return f"active_user_ids:{realm_id}"

def active_non_guest_user_ids_cache_key(realm_id: int) -> str:
    return f"active_non_guest_user_ids:{realm_id}"

bot_dict_fields: List[str] = [
    'api_key',
    'avatar_source',
    'avatar_version',
    'bot_owner__id',
    'bot_type',
    'default_all_public_streams',
    'default_events_register_stream__name',
    'default_sending_stream__name',
    'email',
    'full_name',
    'id',
    'is_active',
    'realm_id',
]

def bot_dicts_in_realm_cache_key(realm: 'Realm') -> str:
    return f"bot_dicts_in_realm:{realm.id}"

def get_stream_cache_key(stream_name: str, realm_id: int) -> str:
    return f"stream_by_realm_and_name:{realm_id}:{make_safe_digest(stream_name.strip().lower())}"

def delete_user_profile_caches(user_profiles: Iterable['UserProfile']) -> None:
    # Imported here to avoid cyclic dependency.
    from zerver.lib.users import get_all_api_keys
    from zerver.models import is_cross_realm_bot_email
    keys = []
    for user_profile in user_profiles:
        keys.append(user_profile_by_email_cache_key(user_profile.delivery_email))
        keys.append(user_profile_by_id_cache_key(user_profile.id))
        for api_key in get_all_api_keys(user_profile):
            keys.append(user_profile_by_api_key_cache_key(api_key))
        keys.append(user_profile_cache_key(user_profile.email, user_profile.realm))
        if user_profile.is_bot and is_cross_realm_bot_email(user_profile.email):
            # Handle clearing system bots from their special cache.
            keys.append(bot_profile_cache_key(user_profile.email))

    cache_delete_many(keys)

def delete_display_recipient_cache(user_profile: 'UserProfile') -> None:
    from zerver.models import Subscription  # We need to import here to avoid cyclic dependency.
    recipient_ids = Subscription.objects.filter(user_profile=user_profile)
    recipient_ids = recipient_ids.values_list('recipient_id', flat=True)
    keys = [display_recipient_cache_key(rid) for rid in recipient_ids]
    keys.append(display_recipient_bulk_get_users_by_id_cache_key(user_profile.id))
    cache_delete_many(keys)

def changed(kwargs: Any, fields: List[str]) -> bool:
    if kwargs.get('update_fields') is None:
        # adds/deletes should invalidate the cache
        return True

    update_fields = set(kwargs['update_fields'])
    for f in fields:
        if f in update_fields:
            return True

    return False

# Called by models.py to flush the user_profile cache whenever we save
# a user_profile object
def flush_user_profile(sender: Any, **kwargs: Any) -> None:
    user_profile = kwargs['instance']
    delete_user_profile_caches([user_profile])

    # Invalidate our active_users_in_realm info dict if any user has changed
    # the fields in the dict or become (in)active
    if changed(kwargs, realm_user_dict_fields):
        cache_delete(realm_user_dicts_cache_key(user_profile.realm_id))

    if changed(kwargs, ['is_active']):
        cache_delete(active_user_ids_cache_key(user_profile.realm_id))
        cache_delete(active_non_guest_user_ids_cache_key(user_profile.realm_id))

    if changed(kwargs, ['role']):
        cache_delete(active_non_guest_user_ids_cache_key(user_profile.realm_id))

    if changed(kwargs, ['email', 'full_name', 'id', 'is_mirror_dummy']):
        delete_display_recipient_cache(user_profile)

    # Invalidate our bots_in_realm info dict if any bot has
    # changed the fields in the dict or become (in)active
    if user_profile.is_bot and changed(kwargs, bot_dict_fields):
        cache_delete(bot_dicts_in_realm_cache_key(user_profile.realm))

# Called by models.py to flush various caches whenever we save
# a Realm object.  The main tricky thing here is that Realm info is
# generally cached indirectly through user_profile objects.
def flush_realm(sender: Any, from_deletion: bool=False, **kwargs: Any) -> None:
    realm = kwargs['instance']
    users = realm.get_active_users()
    delete_user_profile_caches(users)

    if from_deletion or realm.deactivated or (kwargs["update_fields"] is not None and
                                              "string_id" in kwargs['update_fields']):
        cache_delete(realm_user_dicts_cache_key(realm.id))
        cache_delete(active_user_ids_cache_key(realm.id))
        cache_delete(bot_dicts_in_realm_cache_key(realm))
        cache_delete(realm_alert_words_cache_key(realm))
        cache_delete(realm_alert_words_automaton_cache_key(realm))
        cache_delete(active_non_guest_user_ids_cache_key(realm.id))
        cache_delete(realm_rendered_description_cache_key(realm))
        cache_delete(realm_text_description_cache_key(realm))
    elif changed(kwargs, ['description']):
        cache_delete(realm_rendered_description_cache_key(realm))
        cache_delete(realm_text_description_cache_key(realm))

def realm_alert_words_cache_key(realm: 'Realm') -> str:
    return f"realm_alert_words:{realm.string_id}"

def realm_alert_words_automaton_cache_key(realm: 'Realm') -> str:
    return f"realm_alert_words_automaton:{realm.string_id}"

def realm_rendered_description_cache_key(realm: 'Realm') -> str:
    return f"realm_rendered_description:{realm.string_id}"

def realm_text_description_cache_key(realm: 'Realm') -> str:
    return f"realm_text_description:{realm.string_id}"

# Called by models.py to flush the stream cache whenever we save a stream
# object.
def flush_stream(sender: Any, **kwargs: Any) -> None:
    from zerver.models import UserProfile
    stream = kwargs['instance']
    items_for_remote_cache = {}
    items_for_remote_cache[get_stream_cache_key(stream.name, stream.realm_id)] = (stream,)
    cache_set_many(items_for_remote_cache)

    if kwargs.get('update_fields') is None or 'name' in kwargs['update_fields'] and \
       UserProfile.objects.filter(
           Q(default_sending_stream=stream) |
           Q(default_events_register_stream=stream)).exists():
        cache_delete(bot_dicts_in_realm_cache_key(stream.realm))

def flush_used_upload_space_cache(sender: Any, **kwargs: Any) -> None:
    attachment = kwargs['instance']

    if kwargs.get("created") is None or kwargs.get("created") is True:
        cache_delete(get_realm_used_upload_space_cache_key(attachment.owner.realm))

def to_dict_cache_key_id(message_id: int) -> str:
    return f'message_dict:{message_id}'

def to_dict_cache_key(message: 'Message', realm_id: Optional[int]=None) -> str:
    return to_dict_cache_key_id(message.id)

def open_graph_description_cache_key(content: bytes, request: HttpRequest) -> str:
    return 'open_graph_description_path:{}'.format(make_safe_digest(request.META['PATH_INFO']))

def flush_message(sender: Any, **kwargs: Any) -> None:
    message = kwargs['instance']
    cache_delete(to_dict_cache_key_id(message.id))

def flush_submessage(sender: Any, **kwargs: Any) -> None:
    submessage = kwargs['instance']
    # submessages are not cached directly, they are part of their
    # parent messages
    message_id = submessage.message_id
    cache_delete(to_dict_cache_key_id(message_id))

DECORATOR = Callable[[Callable[..., Any]], Callable[..., Any]]

def ignore_unhashable_lru_cache(maxsize: int=128, typed: bool=False) -> DECORATOR:
    """
    This is a wrapper over lru_cache function. It adds following features on
    top of lru_cache:

        * It will not cache result of functions with unhashable arguments.
        * It will clear cache whenever zerver.lib.cache.KEY_PREFIX changes.
    """
    internal_decorator = lru_cache(maxsize=maxsize, typed=typed)

    def decorator(user_function: Callable[..., Any]) -> Callable[..., Any]:
        if settings.DEVELOPMENT and not settings.TEST_SUITE:  # nocoverage
            # In the development environment, we want every file
            # change to refresh the source files from disk.
            return user_function

        # Casting to Any since we're about to monkey-patch this.
        cache_enabled_user_function = cast(Any, internal_decorator(user_function))

        def wrapper(*args: Any, **kwargs: Any) -> Any:
            if not hasattr(cache_enabled_user_function, 'key_prefix'):
                cache_enabled_user_function.key_prefix = KEY_PREFIX

            if cache_enabled_user_function.key_prefix != KEY_PREFIX:
                # Clear cache when cache.KEY_PREFIX changes. This is used in
                # tests.
                cache_enabled_user_function.cache_clear()
                cache_enabled_user_function.key_prefix = KEY_PREFIX

            try:
                return cache_enabled_user_function(*args, **kwargs)
            except TypeError:
                # args or kwargs contains an element which is unhashable. In
                # this case we don't cache the result.
                pass

            # Deliberately calling this function from outside of exception
            # handler to get a more descriptive traceback. Otherwise traceback
            # can include the exception from cached_enabled_user_function as
            # well.
            return user_function(*args, **kwargs)

        setattr(wrapper, 'cache_info', cache_enabled_user_function.cache_info)
        setattr(wrapper, 'cache_clear', cache_enabled_user_function.cache_clear)
        return wrapper

    return decorator

def dict_to_items_tuple(user_function: Callable[..., Any]) -> Callable[..., Any]:
    """Wrapper that converts any dict args to dict item tuples."""
    def dict_to_tuple(arg: Any) -> Any:
        if isinstance(arg, dict):
            return tuple(sorted(arg.items()))
        return arg

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        new_args = (dict_to_tuple(arg) for arg in args)
        return user_function(*new_args, **kwargs)

    return wrapper

def items_tuple_to_dict(user_function: Callable[..., Any]) -> Callable[..., Any]:
    """Wrapper that converts any dict items tuple args to dicts."""
    def dict_items_to_dict(arg: Any) -> Any:
        if isinstance(arg, tuple):
            try:
                return dict(arg)
            except TypeError:
                pass
        return arg

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        new_args = (dict_items_to_dict(arg) for arg in args)
        new_kwargs = {key: dict_items_to_dict(val) for key, val in kwargs.items()}
        return user_function(*new_args, **new_kwargs)

    return wrapper
