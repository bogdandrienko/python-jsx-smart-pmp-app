import base64
import logging
import re
import time
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Sequence, Tuple, Union

import gcm
import lxml.html
import orjson
from django.conf import settings
from django.db import IntegrityError, transaction
from django.db.models import F
from django.utils.timezone import now as timezone_now
from django.utils.translation import ugettext as _

from zerver.decorator import statsd_increment
from zerver.lib.avatar import absolute_avatar_url
from zerver.lib.exceptions import JsonableError
from zerver.lib.message import access_message, bulk_access_messages_expect_usermessage, huddle_users
from zerver.lib.remote_server import send_json_to_push_bouncer, send_to_push_bouncer
from zerver.lib.timestamp import datetime_to_timestamp
from zerver.models import (
    ArchivedMessage,
    Message,
    PushDeviceToken,
    Recipient,
    UserMessage,
    UserProfile,
    get_display_recipient,
    get_user_profile_by_id,
    receives_offline_push_notifications,
    receives_online_notifications,
)

if TYPE_CHECKING:
    from apns2.client import APNsClient

logger = logging.getLogger(__name__)

if settings.ZILENCER_ENABLED:
    from zilencer.models import RemotePushDeviceToken

DeviceToken = Union[PushDeviceToken, "RemotePushDeviceToken"]

# We store the token as b64, but apns-client wants hex strings
def b64_to_hex(data: str) -> str:
    return base64.b64decode(data).hex()

def hex_to_b64(data: str) -> str:
    return base64.b64encode(bytes.fromhex(data)).decode()

#
# Sending to APNs, for iOS
#

_apns_client: Optional["APNsClient"] = None
_apns_client_initialized = False

def get_apns_client() -> 'Optional[APNsClient]':
    # We lazily do this import as part of optimizing Zulip's base
    # import time.
    from apns2.client import APNsClient
    global _apns_client, _apns_client_initialized
    if not _apns_client_initialized:
        # NB if called concurrently, this will make excess connections.
        # That's a little sloppy, but harmless unless a server gets
        # hammered with a ton of these all at once after startup.
        if settings.APNS_CERT_FILE is not None:
            _apns_client = APNsClient(credentials=settings.APNS_CERT_FILE,
                                      use_sandbox=settings.APNS_SANDBOX)
        _apns_client_initialized = True
    return _apns_client

def apns_enabled() -> bool:
    client = get_apns_client()
    return client is not None

def modernize_apns_payload(data: Dict[str, Any]) -> Dict[str, Any]:
    '''Take a payload in an unknown Zulip version's format, and return in current format.'''
    # TODO this isn't super robust as is -- if a buggy remote server
    # sends a malformed payload, we are likely to raise an exception.
    if 'message_ids' in data:
        # The format sent by 1.6.0, from the earliest pre-1.6.0
        # version with bouncer support up until 613d093d7 pre-1.7.0:
        #   'alert': str,              # just sender, and text about PM/group-PM/mention
        #   'message_ids': List[int],  # always just one
        return {
            'alert': data['alert'],
            'badge': 0,
            'custom': {
                'zulip': {
                    'message_ids': data['message_ids'],
                },
            },
        }
    else:
        # Something already compatible with the current format.
        # `alert` may be a string, or a dict with `title` and `body`.
        # In 1.7.0 and 1.7.1, before 0912b5ba8 pre-1.8.0, the only
        # item in `custom.zulip` is `message_ids`.
        return data

APNS_MAX_RETRIES = 3

@statsd_increment("apple_push_notification")
def send_apple_push_notification(user_id: int, devices: List[DeviceToken],
                                 payload_data: Dict[str, Any], remote: bool=False) -> None:
    if not devices:
        return
    # We lazily do the APNS imports as part of optimizing Zulip's base
    # import time; since these are only needed in the push
    # notification queue worker, it's best to only import them in the
    # code that needs them.
    from apns2.payload import Payload as APNsPayload
    from hyper.http20.exceptions import HTTP20Error

    client = get_apns_client()
    if client is None:
        logger.debug("APNs: Dropping a notification because nothing configured.  "
                     "Set PUSH_NOTIFICATION_BOUNCER_URL (or APNS_CERT_FILE).")
        return

    if remote:
        assert settings.ZILENCER_ENABLED
        DeviceTokenClass = RemotePushDeviceToken
    else:
        DeviceTokenClass = PushDeviceToken

    logger.info("APNs: Sending notification for user %d to %d devices",
                user_id, len(devices))
    payload = APNsPayload(**modernize_apns_payload(payload_data))
    expiration = int(time.time() + 24 * 3600)
    retries_left = APNS_MAX_RETRIES
    for device in devices:
        # TODO obviously this should be made to actually use the async

        def attempt_send() -> Optional[str]:
            assert client is not None
            try:
                stream_id = client.send_notification_async(
                    device.token, payload, topic=settings.APNS_TOPIC,
                    expiration=expiration)
                return client.get_notification_result(stream_id)
            except HTTP20Error as e:
                logger.warning("APNs: HTTP error sending for user %d to device %s: %s",
                               user_id, device.token, e.__class__.__name__)
                return None
            except BrokenPipeError as e:
                logger.warning("APNs: BrokenPipeError sending for user %d to device %s: %s",
                               user_id, device.token, e.__class__.__name__)
                return None
            except ConnectionError as e:  # nocoverage
                logger.warning("APNs: ConnectionError sending for user %d to device %s: %s",
                               user_id, device.token, e.__class__.__name__)
                return None

        result = attempt_send()
        while result is None and retries_left > 0:
            retries_left -= 1
            result = attempt_send()
        if result is None:
            result = "HTTP error, retries exhausted"

        if result[0] == "Unregistered":
            # For some reason, "Unregistered" result values have a
            # different format, as a tuple of the pair ("Unregistered", 12345132131).
            result = result[0]
        if result == 'Success':
            logger.info("APNs: Success sending for user %d to device %s",
                        user_id, device.token)
        elif result in ["Unregistered", "BadDeviceToken", "DeviceTokenNotForTopic"]:
            logger.info("APNs: Removing invalid/expired token %s (%s)", device.token, result)
            # We remove all entries for this token (There
            # could be multiple for different Zulip servers).
            DeviceTokenClass.objects.filter(token=device.token, kind=DeviceTokenClass.APNS).delete()
        else:
            logger.warning("APNs: Failed to send for user %d to device %s: %s",
                           user_id, device.token, result)

#
# Sending to GCM, for Android
#

def make_gcm_client() -> gcm.GCM:  # nocoverage
    # From GCM upstream's doc for migrating to FCM:
    #
    #   FCM supports HTTP and XMPP protocols that are virtually
    #   identical to the GCM server protocols, so you don't need to
    #   update your sending logic for the migration.
    #
    #   https://developers.google.com/cloud-messaging/android/android-migrate-fcm
    #
    # The one thing we're required to change on the server is the URL of
    # the endpoint.  So we get to keep using the GCM client library we've
    # been using (as long as we're happy with it) -- just monkey-patch in
    # that one change, because the library's API doesn't anticipate that
    # as a customization point.
    gcm.gcm.GCM_URL = 'https://fcm.googleapis.com/fcm/send'
    return gcm.GCM(settings.ANDROID_GCM_API_KEY)

if settings.ANDROID_GCM_API_KEY:  # nocoverage
    gcm_client = make_gcm_client()
else:
    gcm_client = None

def gcm_enabled() -> bool:  # nocoverage
    return gcm_client is not None

def send_android_push_notification_to_user(user_profile: UserProfile, data: Dict[str, Any],
                                           options: Dict[str, Any]) -> None:
    devices = list(PushDeviceToken.objects.filter(user=user_profile,
                                                  kind=PushDeviceToken.GCM))
    send_android_push_notification(devices, data, options)

def parse_gcm_options(options: Dict[str, Any], data: Dict[str, Any]) -> str:
    """
    Parse GCM options, supplying defaults, and raising an error if invalid.

    The options permitted here form part of the Zulip notification
    bouncer's API.  They are:

    `priority`: Passed through to GCM; see upstream doc linked below.
        Zulip servers should always set this; when unset, we guess a value
        based on the behavior of old server versions.

    Including unrecognized options is an error.

    For details on options' semantics, see this GCM upstream doc:
      https://firebase.google.com/docs/cloud-messaging/http-server-ref

    Returns `priority`.
    """
    priority = options.pop('priority', None)
    if priority is None:
        # An older server.  Identify if this seems to be an actual notification.
        if data.get('event') == 'message':
            priority = 'high'
        else:  # `'event': 'remove'`, presumably
            priority = 'normal'
    if priority not in ('normal', 'high'):
        raise JsonableError(_(
            "Invalid GCM option to bouncer: priority {!r}",
        ).format(priority))

    if options:
        # We're strict about the API; there is no use case for a newer Zulip
        # server talking to an older bouncer, so we only need to provide
        # one-way compatibility.
        raise JsonableError(_(
            "Invalid GCM options to bouncer: {}",
        ).format(orjson.dumps(options).decode()))

    return priority  # when this grows a second option, can make it a tuple

@statsd_increment("android_push_notification")
def send_android_push_notification(devices: List[DeviceToken], data: Dict[str, Any],
                                   options: Dict[str, Any], remote: bool=False) -> None:
    """
    Send a GCM message to the given devices.

    See https://firebase.google.com/docs/cloud-messaging/http-server-ref
    for the GCM upstream API which this talks to.

    data: The JSON object (decoded) to send as the 'data' parameter of
        the GCM message.
    options: Additional options to control the GCM message sent.
        For details, see `parse_gcm_options`.
    """
    if not devices:
        return
    if not gcm_client:
        logger.debug("Skipping sending a GCM push notification since "
                     "PUSH_NOTIFICATION_BOUNCER_URL and ANDROID_GCM_API_KEY are both unset")
        return

    reg_ids = [device.token for device in devices]
    priority = parse_gcm_options(options, data)
    try:
        # See https://firebase.google.com/docs/cloud-messaging/http-server-ref .
        # Two kwargs `retries` and `session` get eaten by `json_request`;
        # the rest pass through to the GCM server.
        res = gcm_client.json_request(registration_ids=reg_ids,
                                      priority=priority,
                                      data=data,
                                      retries=10)
    except OSError:
        logger.warning("Error while pushing to GCM", exc_info=True)
        return

    if res and 'success' in res:
        for reg_id, msg_id in res['success'].items():
            logger.info("GCM: Sent %s as %s", reg_id, msg_id)

    if remote:
        assert settings.ZILENCER_ENABLED
        DeviceTokenClass = RemotePushDeviceToken
    else:
        DeviceTokenClass = PushDeviceToken

    # res.canonical will contain results when there are duplicate registrations for the same
    # device. The "canonical" registration is the latest registration made by the device.
    # Ref: https://developer.android.com/google/gcm/adv.html#canonical
    if 'canonical' in res:
        for reg_id, new_reg_id in res['canonical'].items():
            if reg_id == new_reg_id:
                # I'm not sure if this should happen. In any case, not really actionable.
                logger.warning("GCM: Got canonical ref but it already matches our ID %s!", reg_id)
            elif not DeviceTokenClass.objects.filter(token=new_reg_id,
                                                     kind=DeviceTokenClass.GCM).count():
                # This case shouldn't happen; any time we get a canonical ref it should have been
                # previously registered in our system.
                #
                # That said, recovery is easy: just update the current PDT object to use the new ID.
                logger.warning(
                    "GCM: Got canonical ref %s replacing %s but new ID not registered! Updating.",
                    new_reg_id, reg_id)
                DeviceTokenClass.objects.filter(
                    token=reg_id, kind=DeviceTokenClass.GCM).update(token=new_reg_id)
            else:
                # Since we know the new ID is registered in our system we can just drop the old one.
                logger.info("GCM: Got canonical ref %s, dropping %s", new_reg_id, reg_id)

                DeviceTokenClass.objects.filter(token=reg_id, kind=DeviceTokenClass.GCM).delete()

    if 'errors' in res:
        for error, reg_ids in res['errors'].items():
            if error in ['NotRegistered', 'InvalidRegistration']:
                for reg_id in reg_ids:
                    logger.info("GCM: Removing %s", reg_id)
                    # We remove all entries for this token (There
                    # could be multiple for different Zulip servers).
                    DeviceTokenClass.objects.filter(token=reg_id, kind=DeviceTokenClass.GCM).delete()
            else:
                for reg_id in reg_ids:
                    logger.warning("GCM: Delivery to %s failed: %s", reg_id, error)

    # python-gcm handles retrying of the unsent messages.
    # Ref: https://github.com/geeknam/python-gcm/blob/master/gcm/gcm.py#L497

#
# Sending to a bouncer
#

def uses_notification_bouncer() -> bool:
    return settings.PUSH_NOTIFICATION_BOUNCER_URL is not None

def send_notifications_to_bouncer(user_profile_id: int,
                                  apns_payload: Dict[str, Any],
                                  gcm_payload: Dict[str, Any],
                                  gcm_options: Dict[str, Any]) -> None:
    post_data = {
        'user_id': user_profile_id,
        'apns_payload': apns_payload,
        'gcm_payload': gcm_payload,
        'gcm_options': gcm_options,
    }
    # Calls zilencer.views.remote_server_notify_push
    send_json_to_push_bouncer('POST', 'push/notify', post_data)

#
# Managing device tokens
#

def num_push_devices_for_user(user_profile: UserProfile, kind: Optional[int]=None) -> PushDeviceToken:
    if kind is None:
        return PushDeviceToken.objects.filter(user=user_profile).count()
    else:
        return PushDeviceToken.objects.filter(user=user_profile, kind=kind).count()

def add_push_device_token(user_profile: UserProfile,
                          token_str: str,
                          kind: int,
                          ios_app_id: Optional[str]=None) -> PushDeviceToken:
    logger.info("Registering push device: %d %r %d %r",
                user_profile.id, token_str, kind, ios_app_id)

    # Regardless of whether we're using the push notifications
    # bouncer, we want to store a PushDeviceToken record locally.
    # These can be used to discern whether the user has any mobile
    # devices configured, and is also where we will store encryption
    # keys for mobile push notifications.
    try:
        with transaction.atomic():
            token = PushDeviceToken.objects.create(
                user_id=user_profile.id,
                kind=kind,
                token=token_str,
                ios_app_id=ios_app_id,
                # last_updated is to be renamed to date_created.
                last_updated=timezone_now())
    except IntegrityError:
        token = PushDeviceToken.objects.get(
            user_id=user_profile.id,
            kind=kind,
            token=token_str,
        )

    # If we're sending things to the push notification bouncer
    # register this user with them here
    if uses_notification_bouncer():
        post_data = {
            'server_uuid': settings.ZULIP_ORG_ID,
            'user_id': user_profile.id,
            'token': token_str,
            'token_kind': kind,
        }

        if kind == PushDeviceToken.APNS:
            post_data['ios_app_id'] = ios_app_id

        logger.info("Sending new push device to bouncer: %r", post_data)
        # Calls zilencer.views.register_remote_push_device
        send_to_push_bouncer('POST', 'push/register', post_data)

    return token

def remove_push_device_token(user_profile: UserProfile, token_str: str, kind: int) -> None:
    try:
        token = PushDeviceToken.objects.get(token=token_str, kind=kind, user=user_profile)
        token.delete()
    except PushDeviceToken.DoesNotExist:
        # If we are using bouncer, don't raise the exception. It will
        # be raised by the code below eventually. This is important
        # during the transition period after upgrading to a version
        # that stores local PushDeviceToken objects even when using
        # the push notifications bouncer.
        if not uses_notification_bouncer():
            raise JsonableError(_("Token does not exist"))

    # If we're sending things to the push notification bouncer
    # unregister this user with them here
    if uses_notification_bouncer():
        # TODO: Make this a remove item
        post_data = {
            'server_uuid': settings.ZULIP_ORG_ID,
            'user_id': user_profile.id,
            'token': token_str,
            'token_kind': kind,
        }
        # Calls zilencer.views.unregister_remote_push_device
        send_to_push_bouncer("POST", "push/unregister", post_data)

def clear_push_device_tokens(user_profile_id: int) -> None:
    # Deletes all of a user's PushDeviceTokens.
    if uses_notification_bouncer():
        post_data = {
            'server_uuid': settings.ZULIP_ORG_ID,
            'user_id': user_profile_id,
        }
        send_to_push_bouncer("POST", "push/unregister/all", post_data)
        return

    PushDeviceToken.objects.filter(user_id=user_profile_id).delete()

#
# Push notifications in general
#

def push_notifications_enabled() -> bool:
    '''True just if this server has configured a way to send push notifications.'''
    if (uses_notification_bouncer()
            and settings.ZULIP_ORG_KEY is not None
            and settings.ZULIP_ORG_ID is not None):  # nocoverage
        # We have the needed configuration to send push notifications through
        # the bouncer.  Better yet would be to confirm that this config actually
        # works -- e.g., that we have ever successfully sent to the bouncer --
        # but this is a good start.
        return True
    if settings.DEVELOPMENT and (apns_enabled() or gcm_enabled()):  # nocoverage
        # Since much of the notifications logic is platform-specific, the mobile
        # developers often work on just one platform at a time, so we should
        # only require one to be configured.
        return True
    elif apns_enabled() and gcm_enabled():  # nocoverage
        # We have the needed configuration to send through APNs and GCM directly
        # (i.e., we are the bouncer, presumably.)  Again, assume it actually works.
        return True
    return False

def initialize_push_notifications() -> None:
    if not push_notifications_enabled():
        if settings.DEVELOPMENT and not settings.TEST_SUITE:  # nocoverage
            # Avoid unnecessary spam on development environment startup
            return
        logger.warning("Mobile push notifications are not configured.\n  "
                       "See https://zulip.readthedocs.io/en/latest/"
                       "production/mobile-push-notifications.html")

def get_gcm_alert(message: Message) -> str:
    """
    Determine what alert string to display based on the missed messages.
    """
    sender_str = message.sender.full_name
    if message.recipient.type == Recipient.HUDDLE and message.trigger == 'private_message':
        return f"New private group message from {sender_str}"
    elif message.recipient.type == Recipient.PERSONAL and message.trigger == 'private_message':
        return f"New private message from {sender_str}"
    elif message.is_stream_message() and (message.trigger == 'mentioned' or
                                          message.trigger == 'wildcard_mentioned'):
        return f"New mention from {sender_str}"
    else:  # message.is_stream_message() and message.trigger == 'stream_push_notify'
        return f"New stream message from {sender_str} in {get_display_recipient(message.recipient)}"

def get_mobile_push_content(rendered_content: str) -> str:
    def get_text(elem: lxml.html.HtmlElement) -> str:
        # Convert default emojis to their Unicode equivalent.
        classes = elem.get("class", "")
        if "emoji" in classes:
            match = re.search(r"emoji-(?P<emoji_code>\S+)", classes)
            if match:
                emoji_code = match.group('emoji_code')
                char_repr = ""
                for codepoint in emoji_code.split('-'):
                    char_repr += chr(int(codepoint, 16))
                return char_repr
        # Handles realm emojis, avatars etc.
        if elem.tag == "img":
            return elem.get("alt", "")
        if elem.tag == 'blockquote':
            return ''  # To avoid empty line before quote text
        return elem.text or ''

    def format_as_quote(quote_text: str) -> str:
        return "".join(
            f"> {line}\n" for line in quote_text.splitlines()
            if line  # Remove empty lines
        )

    def render_olist(ol: lxml.html.HtmlElement) -> str:
        items = []
        counter = int(ol.get('start')) if ol.get('start') else 1
        nested_levels = len(list(ol.iterancestors('ol')))
        indent = ('\n' + '  ' * nested_levels) if nested_levels else ''

        for li in ol:
            items.append(indent + str(counter) + '. ' + process(li).strip())
            counter += 1

        return '\n'.join(items)

    def render_spoiler(elem: lxml.html.HtmlElement) -> str:
        header = elem.find_class('spoiler-header')[0]
        text = process(header).strip()
        if len(text) == 0:
            return "(…)\n"
        return f"{text} (…)\n"

    def process(elem: lxml.html.HtmlElement) -> str:
        plain_text = ''
        if elem.tag == 'ol':
            plain_text = render_olist(elem)
        elif 'spoiler-block' in elem.get("class", ""):
            plain_text += render_spoiler(elem)
        else:
            plain_text = get_text(elem)
            sub_text = ''
            for child in elem:
                sub_text += process(child)
            if elem.tag == 'blockquote':
                sub_text = format_as_quote(sub_text)
            plain_text += sub_text
            plain_text += elem.tail or ""
        return plain_text

    if settings.PUSH_NOTIFICATION_REDACT_CONTENT:
        return "***REDACTED***"

    elem = lxml.html.fromstring(rendered_content)
    plain_text = process(elem)
    return plain_text

def truncate_content(content: str) -> Tuple[str, bool]:
    # We use Unicode character 'HORIZONTAL ELLIPSIS' (U+2026) instead
    # of three dots as this saves two extra characters for textual
    # content. This function will need to be updated to handle Unicode
    # combining characters and tags when we start supporting themself.
    if len(content) <= 200:
        return content, False
    return content[:200] + "…", True

def get_base_payload(user_profile: UserProfile) -> Dict[str, Any]:
    '''Common fields for all notification payloads.'''
    data: Dict[str, Any] = {}

    # These will let the app support logging into multiple realms and servers.
    data['server'] = settings.EXTERNAL_HOST
    data['realm_id'] = user_profile.realm.id
    data['realm_uri'] = user_profile.realm.uri
    data['user_id'] = user_profile.id

    return data

def get_message_payload(user_profile: UserProfile, message: Message) -> Dict[str, Any]:
    '''Common fields for `message` payloads, for all platforms.'''
    data = get_base_payload(user_profile)

    # `sender_id` is preferred, but some existing versions use `sender_email`.
    data['sender_id'] = message.sender.id
    data['sender_email'] = message.sender.email

    if message.recipient.type == Recipient.STREAM:
        data['recipient_type'] = "stream"
        data['stream'] = get_display_recipient(message.recipient)
        data['topic'] = message.topic_name()
    elif message.recipient.type == Recipient.HUDDLE:
        data['recipient_type'] = "private"
        data['pm_users'] = huddle_users(message.recipient.id)
    else:  # Recipient.PERSONAL
        data['recipient_type'] = "private"

    return data

def get_apns_alert_title(message: Message) -> str:
    """
    On an iOS notification, this is the first bolded line.
    """
    if message.recipient.type == Recipient.HUDDLE:
        recipients = get_display_recipient(message.recipient)
        assert isinstance(recipients, list)
        return ', '.join(sorted(r['full_name'] for r in recipients))
    elif message.is_stream_message():
        return f"#{get_display_recipient(message.recipient)} > {message.topic_name()}"
    # For personal PMs, we just show the sender name.
    return message.sender.full_name

def get_apns_alert_subtitle(message: Message) -> str:
    """
    On an iOS notification, this is the second bolded line.
    """
    if message.trigger == "mentioned":
        return _("{full_name} mentioned you:").format(full_name=message.sender.full_name)
    elif message.trigger == "wildcard_mentioned":
        return _("{full_name} mentioned everyone:").format(full_name=message.sender.full_name)
    elif message.recipient.type == Recipient.PERSONAL:
        return ""
    # For group PMs, or regular messages to a stream, just use a colon to indicate this is the sender.
    return message.sender.full_name + ":"

def get_apns_badge_count(user_profile: UserProfile, read_messages_ids: Optional[Sequence[int]]=[]) -> int:
    # NOTE: We have temporarily set get_apns_badge_count to always
    # return 0 until we can debug a likely mobile app side issue with
    # handling notifications while the app is open.
    return 0

def get_apns_badge_count_future(user_profile: UserProfile, read_messages_ids: Optional[Sequence[int]]=[]) -> int:
    # Future implementation of get_apns_badge_count; unused but
    # we expect to use this once we resolve client-side bugs.
    return UserMessage.objects.filter(
        user_profile=user_profile
    ).extra(
        where=[UserMessage.where_active_push_notification()]
    ).exclude(
        # If we've just marked some messages as read, they're still
        # marked as having active notifications; we'll clear that flag
        # only after we've sent that update to the devices.  So we need
        # to exclude them explicitly from the count.
        message_id__in=read_messages_ids
    ).count()

def get_message_payload_apns(user_profile: UserProfile, message: Message) -> Dict[str, Any]:
    '''A `message` payload for iOS, via APNs.'''
    zulip_data = get_message_payload(user_profile, message)
    zulip_data.update(
        message_ids=[message.id],
    )

    assert message.rendered_content is not None
    content, _ = truncate_content(get_mobile_push_content(message.rendered_content))
    apns_data = {
        'alert': {
            'title': get_apns_alert_title(message),
            'subtitle': get_apns_alert_subtitle(message),
            'body': content,
        },
        'sound': 'default',
        'badge': get_apns_badge_count(user_profile),
        'custom': {'zulip': zulip_data},
    }
    return apns_data

def get_message_payload_gcm(
        user_profile: UserProfile, message: Message,
) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    '''A `message` payload + options, for Android via GCM/FCM.'''
    data = get_message_payload(user_profile, message)
    assert message.rendered_content is not None
    content, truncated = truncate_content(get_mobile_push_content(message.rendered_content))
    data.update(
        event='message',
        alert=get_gcm_alert(message),
        zulip_message_id=message.id,  # message_id is reserved for CCS
        time=datetime_to_timestamp(message.date_sent),
        content=content,
        content_truncated=truncated,
        sender_full_name=message.sender.full_name,
        sender_avatar_url=absolute_avatar_url(message.sender),
    )
    gcm_options = {'priority': 'high'}
    return data, gcm_options

def get_remove_payload_gcm(
        user_profile: UserProfile, message_ids: List[int],
) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    '''A `remove` payload + options, for Android via GCM/FCM.'''
    gcm_payload = get_base_payload(user_profile)
    gcm_payload.update(
        event='remove',
        zulip_message_ids=','.join(str(id) for id in message_ids),
        # Older clients (all clients older than 2019-02-13) look only at
        # `zulip_message_id` and ignore `zulip_message_ids`.  Do our best.
        zulip_message_id=message_ids[0],
    )
    gcm_options = {'priority': 'normal'}
    return gcm_payload, gcm_options

def get_remove_payload_apns(user_profile: UserProfile, message_ids: List[int]) -> Dict[str, Any]:
    zulip_data = get_base_payload(user_profile)
    zulip_data.update(
        event='remove',
        zulip_message_ids=','.join(str(id) for id in message_ids),
    )
    apns_data = {
        'badge': get_apns_badge_count(user_profile, message_ids),
        'custom': {'zulip': zulip_data},
    }
    return apns_data

def handle_remove_push_notification(user_profile_id: int, message_ids: List[int]) -> None:
    """This should be called when a message that previously had a
    mobile push notification executed is read.  This triggers a push to the
    mobile app, when the message is read on the server, to remove the
    message from the notification.
    """
    user_profile = get_user_profile_by_id(user_profile_id)
    message_ids = bulk_access_messages_expect_usermessage(user_profile_id, message_ids)
    gcm_payload, gcm_options = get_remove_payload_gcm(user_profile, message_ids)
    apns_payload = get_remove_payload_apns(user_profile, message_ids)

    if uses_notification_bouncer():
        send_notifications_to_bouncer(user_profile_id,
                                      apns_payload,
                                      gcm_payload,
                                      gcm_options)
    else:
        android_devices = list(PushDeviceToken.objects.filter(
            user=user_profile, kind=PushDeviceToken.GCM))
        apple_devices = list(PushDeviceToken.objects.filter(
            user=user_profile, kind=PushDeviceToken.APNS))
        if android_devices:
            send_android_push_notification(android_devices, gcm_payload, gcm_options)
        if apple_devices:
            send_apple_push_notification(user_profile_id, apple_devices, apns_payload)

    UserMessage.objects.filter(
        user_profile_id=user_profile_id,
        message_id__in=message_ids,
    ).update(
        flags=F('flags').bitand(
            ~UserMessage.flags.active_mobile_push_notification))

@statsd_increment("push_notifications")
def handle_push_notification(user_profile_id: int, missed_message: Dict[str, Any]) -> None:
    """
    missed_message is the event received by the
    zerver.worker.queue_processors.PushNotificationWorker.consume function.
    """
    if not push_notifications_enabled():
        return
    user_profile = get_user_profile_by_id(user_profile_id)
    if not (receives_offline_push_notifications(user_profile) or
            receives_online_notifications(user_profile)):
        return

    try:
        (message, user_message) = access_message(user_profile, missed_message['message_id'])
    except JsonableError:
        if ArchivedMessage.objects.filter(id=missed_message['message_id']).exists():
            # If the cause is a race with the message being deleted,
            # that's normal and we have no need to log an error.
            return
        logging.info(
            "Unexpected message access failure handling push notifications: %s %s",
            user_profile.id, missed_message['message_id'],
        )
        return

    if user_message is not None:
        # If the user has read the message already, don't push-notify.
        #
        # TODO: It feels like this is already handled when things are
        # put in the queue; maybe we should centralize this logic with
        # the `zerver/tornado/event_queue.py` logic?
        if user_message.flags.read or user_message.flags.active_mobile_push_notification:
            return

        # Otherwise, we mark the message as having an active mobile
        # push notification, so that we can send revocation messages
        # later.
        user_message.flags.active_mobile_push_notification = True
        user_message.save(update_fields=["flags"])
    else:
        # Users should only be getting push notifications into this
        # queue for messages they haven't received if they're
        # long-term idle; anything else is likely a bug.
        if not user_profile.long_term_idle:
            logger.error(
                "Could not find UserMessage with message_id %s and user_id %s",
                missed_message['message_id'], user_profile_id,
            )
            return

    message.trigger = missed_message['trigger']

    apns_payload = get_message_payload_apns(user_profile, message)
    gcm_payload, gcm_options = get_message_payload_gcm(user_profile, message)
    logger.info("Sending push notifications to mobile clients for user %s", user_profile_id)

    if uses_notification_bouncer():
        send_notifications_to_bouncer(user_profile_id,
                                      apns_payload,
                                      gcm_payload,
                                      gcm_options)
        return

    android_devices = list(PushDeviceToken.objects.filter(user=user_profile,
                                                          kind=PushDeviceToken.GCM))

    apple_devices = list(PushDeviceToken.objects.filter(user=user_profile,
                                                        kind=PushDeviceToken.APNS))

    send_apple_push_notification(user_profile.id, apple_devices, apns_payload)

    send_android_push_notification(android_devices, gcm_payload, gcm_options)
