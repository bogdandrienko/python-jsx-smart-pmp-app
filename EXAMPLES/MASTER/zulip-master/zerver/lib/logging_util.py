# System documented in https://zulip.readthedocs.io/en/latest/subsystems/logging.html
import hashlib
import logging
import threading
import traceback
from datetime import datetime, timedelta, timezone
from logging import Logger
from typing import Optional, Tuple

import orjson
from django.conf import settings
from django.core.cache import cache
from django.utils.timezone import now as timezone_now


class _RateLimitFilter:
    """This class is designed to rate-limit Django error reporting
    notifications so that it won't send thousands of emails if the
    database or cache is completely down.  It uses a remote shared
    cache (shared by all Django processes) for its default behavior
    (so that the deduplication is global, not per-process), and a
    local in-process cache for when it can't access the remote cache.

    This is critical code because it is called every time
    `logging.error` or `logging.exception` (or an exception) happens
    in the codebase.

    Adapted from https://djangosnippets.org/snippets/2242/.

    """
    last_error = datetime.min.replace(tzinfo=timezone.utc)
    # This thread-local variable is used to detect recursive
    # exceptions during exception handling (primarily intended for
    # when accessing the shared cache throws an exception).
    handling_exception = threading.local()
    should_reset_handling_exception = False

    def can_use_remote_cache(self) -> Tuple[bool, bool]:
        if getattr(self.handling_exception, 'value', False):
            # If we're processing an exception that occurred
            # while handling an exception, this almost
            # certainly was because interacting with the
            # remote cache is failing (e.g. because the cache
            # is down).  Fall back to tracking duplicate
            # exceptions in memory without the remote shared cache.
            return False, False

        # Now we test if the remote cache is accessible.
        #
        # This code path can only be reached if we are not potentially
        # handling a recursive exception, so here we set
        # self.handling_exception (in case the cache access we're
        # about to do triggers a `logging.error` or exception that
        # might recurse into this filter class), and actually record
        # that this is the main exception handler thread.
        try:
            self.handling_exception.value = True
            cache.set('RLF_TEST_KEY', 1, 1)
            return cache.get('RLF_TEST_KEY') == 1, True
        except Exception:
            return False, True

    def filter(self, record: logging.LogRecord) -> bool:
        # When the original filter() call finishes executing, it's
        # going to change handling_exception.value to False. The
        # local variable below tracks whether the *current*,
        # potentially recursive, filter() call is allowed to touch
        # that value (only the original will find this to be True
        # at the end of its execution)
        should_reset_handling_exception = False
        try:
            # Track duplicate errors
            duplicate = False
            rate = getattr(settings, f'{self.__class__.__name__.upper()}_LIMIT',
                           600)  # seconds

            if rate > 0:
                (use_cache, should_reset_handling_exception) = self.can_use_remote_cache()
                if use_cache:
                    if record.exc_info is not None:
                        tb = '\n'.join(traceback.format_exception(*record.exc_info))
                    else:
                        tb = str(record)
                    key = self.__class__.__name__.upper() + hashlib.sha1(tb.encode()).hexdigest()
                    duplicate = cache.get(key) == 1
                    if not duplicate:
                        cache.set(key, 1, rate)
                else:
                    min_date = timezone_now() - timedelta(seconds=rate)
                    duplicate = (self.last_error >= min_date)
                    if not duplicate:
                        self.last_error = timezone_now()

            return not duplicate
        finally:
            if should_reset_handling_exception:
                self.handling_exception.value = False

class ZulipLimiter(_RateLimitFilter):
    pass

class EmailLimiter(_RateLimitFilter):
    pass

class ReturnTrue(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return True

class ReturnEnabled(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return settings.LOGGING_ENABLED

class RequireReallyDeployed(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        from django.conf import settings
        return settings.PRODUCTION

def skip_200_and_304(record: logging.LogRecord) -> bool:
    # Apparently, `status_code` is added by Django and is not an actual
    # attribute of LogRecord; as a result, mypy throws an error if we
    # access the `status_code` attribute directly.
    if getattr(record, 'status_code', None) in [200, 304]:
        return False

    return True

def skip_site_packages_logs(record: logging.LogRecord) -> bool:
    # This skips the log records that are generated from libraries
    # installed in site packages.
    # Workaround for https://code.djangoproject.com/ticket/26886
    if 'site-packages' in record.pathname:
        return False
    return True

def find_log_caller_module(record: logging.LogRecord) -> Optional[str]:
    '''Find the module name corresponding to where this record was logged.

    Sadly `record.module` is just the innermost component of the full
    module name, so we have to go reconstruct this ourselves.
    '''
    # Repeat a search similar to that in logging.Logger.findCaller.
    # The logging call should still be on the stack somewhere; search until
    # we find something in the same source file, and that should give the
    # right module name.
    f = logging.currentframe()
    while True:
        if f.f_code.co_filename == record.pathname:
            return f.f_globals.get('__name__')
        if f.f_back is None:
            return None
        f = f.f_back

logger_nicknames = {
    'root': '',  # This one is more like undoing a nickname.
    'zulip.requests': 'zr',  # Super common.
}

def find_log_origin(record: logging.LogRecord) -> str:
    logger_name = logger_nicknames.get(record.name, record.name)

    if settings.LOGGING_SHOW_MODULE:
        module_name = find_log_caller_module(record)
        if module_name == logger_name or module_name == record.name:
            # Abbreviate a bit.
            pass
        else:
            logger_name = '{}/{}'.format(logger_name, module_name or '?')

    if settings.RUNNING_INSIDE_TORNADO:
        # In multi-sharded Tornado, it's often valuable to have which shard is
        # responsible for the request in the logs.
        from zerver.tornado.ioloop_logging import logging_data
        shard = logging_data.get('port', 'unknown')
        logger_name = f"{logger_name}:{shard}"

    return logger_name

log_level_abbrevs = {
    'DEBUG':    'DEBG',
    'INFO':     'INFO',
    'WARNING':  'WARN',
    'ERROR':    'ERR',
    'CRITICAL': 'CRIT',
}

def abbrev_log_levelname(levelname: str) -> str:
    # It's unlikely someone will set a custom log level with a custom name,
    # but it's an option, so we shouldn't crash if someone does.
    return log_level_abbrevs.get(levelname, levelname[:4])

class ZulipFormatter(logging.Formatter):
    # Used in the base implementation.  Default uses `,`.
    default_msec_format = '%s.%03d'

    def __init__(self) -> None:
        super().__init__(fmt=self._compute_fmt())

    def _compute_fmt(self) -> str:
        pieces = ['%(asctime)s', '%(zulip_level_abbrev)-4s']
        if settings.LOGGING_SHOW_PID:
            pieces.append('pid:%(process)d')
        pieces.extend(['[%(zulip_origin)s]', '%(message)s'])
        return ' '.join(pieces)

    def format(self, record: logging.LogRecord) -> str:
        if not getattr(record, 'zulip_decorated', False):
            # The `setattr` calls put this logic explicitly outside the bounds of the
            # type system; otherwise mypy would complain LogRecord lacks these attributes.
            setattr(record, 'zulip_level_abbrev', abbrev_log_levelname(record.levelname))
            setattr(record, 'zulip_origin', find_log_origin(record))
            setattr(record, 'zulip_decorated', True)
        return super().format(record)

class ZulipWebhookFormatter(ZulipFormatter):
    def _compute_fmt(self) -> str:
        basic = super()._compute_fmt()
        multiline = [
            basic,
            "user: %(user)s",
            "client: %(client)s",
            "url: %(url)s",
            "content_type: %(content_type)s",
            "custom_headers:",
            "%(custom_headers)s",
            "payload:",
            "%(payload)s",
        ]
        return "\n".join(multiline)

    def format(self, record: logging.LogRecord) -> str:
        from zerver.lib.request import get_current_request
        request = get_current_request()
        if not request:
            setattr(record, 'user', None)
            setattr(record, 'client', None)
            setattr(record, 'url', None)
            setattr(record, 'content_type', None)
            setattr(record, 'custom_headers', None)
            setattr(record, 'payload', None)
            return super().format(record)

        if request.content_type == 'application/json':
            payload = request.body
        else:
            payload = request.POST.get('payload')

        try:
            payload = orjson.dumps(orjson.loads(payload), option=orjson.OPT_INDENT_2).decode()
        except orjson.JSONDecodeError:
            pass

        custom_header_template = "{header}: {value}\n"

        header_text = ""
        for header in request.META.keys():
            if header.lower().startswith('http_x'):
                header_text += custom_header_template.format(
                    header=header, value=request.META[header])

        header_message = header_text if header_text else None

        setattr(record, 'user', f"{request.user.delivery_email} ({request.user.realm.string_id})")
        setattr(record, 'client', request.client.name)
        setattr(record, 'url', request.META.get('PATH_INFO', None))
        setattr(record, 'content_type', request.content_type)
        setattr(record, 'custom_headers', header_message)
        setattr(record, 'payload', payload)
        return super().format(record)

def log_to_file(logger: Logger,
                filename: str,
                log_format: str="%(asctime)s %(levelname)-8s %(message)s",
                ) -> None:
    """Note: `filename` should be declared in zproject/computed_settings.py with zulip_path."""
    formatter = logging.Formatter(log_format)
    handler = logging.FileHandler(filename)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
