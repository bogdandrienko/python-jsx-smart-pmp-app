import logging
import os
import time
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Tuple, Type

import redis
from django.conf import settings
from django.http import HttpRequest

from zerver.lib.exceptions import RateLimited
from zerver.lib.redis_utils import get_redis_client
from zerver.lib.utils import statsd
from zerver.models import UserProfile

# Implement a rate-limiting scheme inspired by the one described here, but heavily modified
# https://www.domaintools.com/resources/blog/rate-limiting-with-redis

client = get_redis_client()
rules: Dict[str, List[Tuple[int, int]]] = settings.RATE_LIMITING_RULES

KEY_PREFIX = ''

logger = logging.getLogger(__name__)

class RateLimiterLockingException(Exception):
    pass

class RateLimitedObject(ABC):
    def __init__(self, backend: Optional['Type[RateLimiterBackend]']=None) -> None:
        if backend is not None:
            self.backend: Type[RateLimiterBackend] = backend
        else:
            self.backend = RedisRateLimiterBackend

    def rate_limit(self) -> Tuple[bool, float]:
        # Returns (ratelimited, secs_to_freedom)
        return self.backend.rate_limit_entity(self.key(), self.get_rules(),
                                              self.max_api_calls(),
                                              self.max_api_window())

    def rate_limit_request(self, request: HttpRequest) -> None:
        ratelimited, time = self.rate_limit()

        if not hasattr(request, '_ratelimits_applied'):
            request._ratelimits_applied = []
        request._ratelimits_applied.append(RateLimitResult(
            entity=self,
            secs_to_freedom=time,
            remaining=0,
            over_limit=ratelimited,
        ))
        # Abort this request if the user is over their rate limits
        if ratelimited:
            # Pass information about what kind of entity got limited in the exception:
            raise RateLimited(time)

        calls_remaining, seconds_until_reset = self.api_calls_left()

        request._ratelimits_applied[-1].remaining = calls_remaining
        request._ratelimits_applied[-1].secs_to_freedom = seconds_until_reset

    def block_access(self, seconds: int) -> None:
        "Manually blocks an entity for the desired number of seconds"
        self.backend.block_access(self.key(), seconds)

    def unblock_access(self) -> None:
        self.backend.unblock_access(self.key())

    def clear_history(self) -> None:
        self.backend.clear_history(self.key())

    def max_api_calls(self) -> int:
        "Returns the API rate limit for the highest limit"
        return self.get_rules()[-1][1]

    def max_api_window(self) -> int:
        "Returns the API time window for the highest limit"
        return self.get_rules()[-1][0]

    def api_calls_left(self) -> Tuple[int, float]:
        """Returns how many API calls in this range this client has, as well as when
        the rate-limit will be reset to 0"""
        max_window = self.max_api_window()
        max_calls = self.max_api_calls()
        return self.backend.get_api_calls_left(self.key(), max_window, max_calls)

    def get_rules(self) -> List[Tuple[int, int]]:
        """
        This is a simple wrapper meant to protect against having to deal with
        an empty list of rules, as it would require fiddling with that special case
        all around this system. "9999 max request per seconds" should be a good proxy
        for "no rules".
        """
        rules_list = self.rules()
        return rules_list or [(1, 9999)]

    @abstractmethod
    def key(self) -> str:
        pass

    @abstractmethod
    def rules(self) -> List[Tuple[int, int]]:
        pass

class RateLimitedUser(RateLimitedObject):
    def __init__(self, user: UserProfile, domain: str='api_by_user') -> None:
        self.user = user
        self.domain = domain
        if settings.RUNNING_INSIDE_TORNADO and domain in settings.RATE_LIMITING_DOMAINS_FOR_TORNADO:
            backend: Optional[Type[RateLimiterBackend]] = TornadoInMemoryRateLimiterBackend
        else:
            backend = None
        super().__init__(backend=backend)

    def key(self) -> str:
        return f"{type(self).__name__}:{self.user.id}:{self.domain}"

    def rules(self) -> List[Tuple[int, int]]:
        # user.rate_limits are general limits, applicable to the domain 'api_by_user'
        if self.user.rate_limits != "" and self.domain == 'api_by_user':
            result: List[Tuple[int, int]] = []
            for limit in self.user.rate_limits.split(','):
                (seconds, requests) = limit.split(':', 2)
                result.append((int(seconds), int(requests)))
            return result
        return rules[self.domain]

def bounce_redis_key_prefix_for_testing(test_name: str) -> None:
    global KEY_PREFIX
    KEY_PREFIX = test_name + ':' + str(os.getpid()) + ':'

def add_ratelimit_rule(range_seconds: int, num_requests: int, domain: str='api_by_user') -> None:
    "Add a rate-limiting rule to the ratelimiter"
    global rules

    if domain not in rules:
        # If we don't have any rules for domain yet, the domain key needs to be
        # added to the rules dictionary.
        rules[domain] = []

    rules[domain].append((range_seconds, num_requests))
    rules[domain].sort(key=lambda x: x[0])

def remove_ratelimit_rule(range_seconds: int, num_requests: int, domain: str='api_by_user') -> None:
    global rules
    rules[domain] = [x for x in rules[domain] if x[0] != range_seconds and x[1] != num_requests]

class RateLimiterBackend(ABC):
    @classmethod
    @abstractmethod
    def block_access(cls, entity_key: str, seconds: int) -> None:
        "Manually blocks an entity for the desired number of seconds"

    @classmethod
    @abstractmethod
    def unblock_access(cls, entity_key: str) -> None:
        pass

    @classmethod
    @abstractmethod
    def clear_history(cls, entity_key: str) -> None:
        pass

    @classmethod
    @abstractmethod
    def get_api_calls_left(cls, entity_key: str, range_seconds: int,
                           max_calls: int) -> Tuple[int, float]:
        pass

    @classmethod
    @abstractmethod
    def rate_limit_entity(cls, entity_key: str, rules: List[Tuple[int, int]],
                          max_api_calls: int, max_api_window: int) -> Tuple[bool, float]:
        # Returns (ratelimited, secs_to_freedom)
        pass

class TornadoInMemoryRateLimiterBackend(RateLimiterBackend):
    # reset_times[rule][key] is the time at which the event
    # request from the rate-limited key will be accepted.
    reset_times: Dict[Tuple[int, int], Dict[str, float]] = {}

    # last_gc_time is the last time when the garbage was
    # collected from reset_times for rule (time_window, max_count).
    last_gc_time: Dict[Tuple[int, int], float] = {}

    # timestamps_blocked_until[key] contains the timestamp
    # up to which the key has been blocked manually.
    timestamps_blocked_until: Dict[str, float] = {}

    @classmethod
    def _garbage_collect_for_rule(cls, now: float, time_window: int, max_count: int) -> None:
        keys_to_delete = []
        reset_times_for_rule = cls.reset_times.get((time_window, max_count), None)
        if reset_times_for_rule is None:
            return

        keys_to_delete = [entity_key for entity_key in reset_times_for_rule
                          if reset_times_for_rule[entity_key] < now]

        for entity_key in keys_to_delete:
            del reset_times_for_rule[entity_key]

        if not reset_times_for_rule:
            del cls.reset_times[(time_window, max_count)]

    @classmethod
    def need_to_limit(cls, entity_key: str, time_window: int,
                      max_count: int) -> Tuple[bool, float]:
        '''
        Returns a tuple of `(rate_limited, time_till_free)`.
        For simplicity, we have loosened the semantics here from
        - each key may make atmost `count * (t / window)` request within any t
          time interval.
        to
        - each key may make atmost `count * [(t / window) + 1]` request within
          any t time interval.
        Thus, we only need to store reset_times for each key which will be less
        memory-intensive. This also has the advantage that you can only ever
        lock yourself out completely for `window / count` seconds instead of
        `window` seconds.
        '''
        now = time.time()

        # Remove all timestamps from `reset_times` that are too old.
        if cls.last_gc_time.get((time_window, max_count), 0) <= now - time_window / max_count:
            cls.last_gc_time[(time_window, max_count)] = now
            cls._garbage_collect_for_rule(now, time_window, max_count)

        reset_times_for_rule = cls.reset_times.setdefault((time_window, max_count), {})
        new_reset = max(reset_times_for_rule.get(entity_key, now), now) \
            + time_window / max_count

        if new_reset > now + time_window:
            # Compute for how long the bucket will remain filled.
            time_till_free = new_reset - time_window - now
            return True, time_till_free

        reset_times_for_rule[entity_key] = new_reset
        return False, 0.0

    @classmethod
    def get_api_calls_left(cls, entity_key: str, range_seconds: int,
                           max_calls: int) -> Tuple[int, float]:
        now = time.time()
        if (range_seconds, max_calls) in cls.reset_times and \
                entity_key in cls.reset_times[(range_seconds, max_calls)]:
            reset_time = cls.reset_times[(range_seconds, max_calls)][entity_key]
        else:
            return max_calls, 0

        calls_remaining = (now + range_seconds - reset_time) * max_calls // range_seconds
        return int(calls_remaining), reset_time - now

    @classmethod
    def block_access(cls, entity_key: str, seconds: int) -> None:
        now = time.time()
        cls.timestamps_blocked_until[entity_key] = now + seconds

    @classmethod
    def unblock_access(cls, entity_key: str) -> None:
        del cls.timestamps_blocked_until[entity_key]

    @classmethod
    def clear_history(cls, entity_key: str) -> None:
        for rule, reset_times_for_rule in cls.reset_times.items():
            reset_times_for_rule.pop(entity_key, None)
        cls.timestamps_blocked_until.pop(entity_key, None)

    @classmethod
    def rate_limit_entity(cls, entity_key: str, rules: List[Tuple[int, int]],
                          max_api_calls: int, max_api_window: int) -> Tuple[bool, float]:
        now = time.time()
        if entity_key in cls.timestamps_blocked_until:
            # Check whether the key is manually blocked.
            if now < cls.timestamps_blocked_until[entity_key]:
                blocking_ttl = cls.timestamps_blocked_until[entity_key] - now
                return True, blocking_ttl
            else:
                del cls.timestamps_blocked_until[entity_key]

        assert rules
        for time_window, max_count in rules:
            ratelimited, time_till_free = cls.need_to_limit(entity_key, time_window, max_count)

            if ratelimited:
                statsd.incr(f"ratelimiter.limited.{entity_key}")
                break

        return ratelimited, time_till_free

class RedisRateLimiterBackend(RateLimiterBackend):
    @classmethod
    def get_keys(cls, entity_key: str) -> List[str]:
        return [f"{KEY_PREFIX}ratelimit:{entity_key}:{keytype}"
                for keytype in ['list', 'zset', 'block']]

    @classmethod
    def block_access(cls, entity_key: str, seconds: int) -> None:
        "Manually blocks an entity for the desired number of seconds"
        _, _, blocking_key = cls.get_keys(entity_key)
        with client.pipeline() as pipe:
            pipe.set(blocking_key, 1)
            pipe.expire(blocking_key, seconds)
            pipe.execute()

    @classmethod
    def unblock_access(cls, entity_key: str) -> None:
        _, _, blocking_key = cls.get_keys(entity_key)
        client.delete(blocking_key)

    @classmethod
    def clear_history(cls, entity_key: str) -> None:
        for key in cls.get_keys(entity_key):
            client.delete(key)

    @classmethod
    def get_api_calls_left(cls, entity_key: str, range_seconds: int,
                           max_calls: int) -> Tuple[int, float]:
        list_key, set_key, _ = cls.get_keys(entity_key)
        # Count the number of values in our sorted set
        # that are between now and the cutoff
        now = time.time()
        boundary = now - range_seconds

        with client.pipeline() as pipe:
            # Count how many API calls in our range have already been made
            pipe.zcount(set_key, boundary, now)
            # Get the newest call so we can calculate when the ratelimit
            # will reset to 0
            pipe.lindex(list_key, 0)

            results = pipe.execute()

        count: int = results[0]
        newest_call: Optional[bytes] = results[1]

        calls_left = max_calls - count
        if newest_call is not None:
            time_reset = now + (range_seconds - (now - float(newest_call)))
        else:
            time_reset = now

        return calls_left, time_reset - now

    @classmethod
    def is_ratelimited(cls, entity_key: str, rules: List[Tuple[int, int]]) -> Tuple[bool, float]:
        "Returns a tuple of (rate_limited, time_till_free)"
        assert rules
        list_key, set_key, blocking_key = cls.get_keys(entity_key)

        # Go through the rules from shortest to longest,
        # seeing if this user has violated any of them. First
        # get the timestamps for each nth items
        with client.pipeline() as pipe:
            for _, request_count in rules:
                pipe.lindex(list_key, request_count - 1)  # 0-indexed list

            # Get blocking info
            pipe.get(blocking_key)
            pipe.ttl(blocking_key)

            rule_timestamps: List[Optional[bytes]] = pipe.execute()

        # Check if there is a manual block on this API key
        blocking_ttl_b = rule_timestamps.pop()
        key_blocked = rule_timestamps.pop()

        if key_blocked is not None:
            # We are manually blocked. Report for how much longer we will be
            if blocking_ttl_b is None:  # nocoverage # defensive code, this should never happen
                blocking_ttl = 0.5
            else:
                blocking_ttl = int(blocking_ttl_b)
            return True, blocking_ttl

        now = time.time()
        for timestamp, (range_seconds, num_requests) in zip(rule_timestamps, rules):
            # Check if the nth timestamp is newer than the associated rule. If so,
            # it means we've hit our limit for this rule
            if timestamp is None:
                continue

            boundary = float(timestamp) + range_seconds
            if boundary >= now:
                free = boundary - now
                return True, free

        return False, 0.0

    @classmethod
    def incr_ratelimit(cls, entity_key: str, max_api_calls: int, max_api_window: int) -> None:
        """Increases the rate-limit for the specified entity"""
        list_key, set_key, _ = cls.get_keys(entity_key)
        now = time.time()

        # Start Redis transaction
        with client.pipeline() as pipe:
            count = 0
            while True:
                try:
                    # To avoid a race condition between getting the element we might trim from our list
                    # and removing it from our associated set, we abort this whole transaction if
                    # another agent manages to change our list out from under us
                    # When watching a value, the pipeline is set to Immediate mode
                    pipe.watch(list_key)

                    # Get the last elem that we'll trim (so we can remove it from our sorted set)
                    last_val = pipe.lindex(list_key, max_api_calls - 1)

                    # Restart buffered execution
                    pipe.multi()

                    # Add this timestamp to our list
                    pipe.lpush(list_key, now)

                    # Trim our list to the oldest rule we have
                    pipe.ltrim(list_key, 0, max_api_calls - 1)

                    # Add our new value to the sorted set that we keep
                    # We need to put the score and val both as timestamp,
                    # as we sort by score but remove by value
                    pipe.zadd(set_key, {str(now): now})

                    # Remove the trimmed value from our sorted set, if there was one
                    if last_val is not None:
                        pipe.zrem(set_key, last_val)

                    # Set the TTL for our keys as well
                    api_window = max_api_window
                    pipe.expire(list_key, api_window)
                    pipe.expire(set_key, api_window)

                    pipe.execute()

                    # If no exception was raised in the execution, there were no transaction conflicts
                    break
                except redis.WatchError:  # nocoverage # Ideally we'd have a test for this.
                    if count > 10:
                        raise RateLimiterLockingException()
                    count += 1

                    continue

    @classmethod
    def rate_limit_entity(cls, entity_key: str, rules: List[Tuple[int, int]],
                          max_api_calls: int, max_api_window: int) -> Tuple[bool, float]:
        ratelimited, time = cls.is_ratelimited(entity_key, rules)

        if ratelimited:
            statsd.incr(f"ratelimiter.limited.{entity_key}")

        else:
            try:
                cls.incr_ratelimit(entity_key, max_api_calls, max_api_window)
            except RateLimiterLockingException:
                logger.warning("Deadlock trying to incr_ratelimit for %s", entity_key)
                # rate-limit users who are hitting the API so hard we can't update our stats.
                ratelimited = True

        return ratelimited, time

class RateLimitResult:
    def __init__(self, entity: RateLimitedObject, secs_to_freedom: float, over_limit: bool,
                 remaining: int) -> None:
        if over_limit:
            assert not remaining

        self.entity = entity
        self.secs_to_freedom = secs_to_freedom
        self.over_limit = over_limit
        self.remaining = remaining
