# System documented in https://zulip.readthedocs.io/en/latest/subsystems/logging.html
import logging
import os
import platform
import subprocess
import traceback
from typing import Any, Dict, Optional
from urllib.parse import SplitResult

from django.conf import settings
from django.http import HttpRequest
from django.utils.translation import override as override_language
from django.views.debug import get_exception_reporter_filter
from sentry_sdk import capture_exception
from typing_extensions import Protocol, runtime_checkable

from version import ZULIP_VERSION
from zerver.lib.logging_util import find_log_caller_module
from zerver.lib.queue import queue_json_publish


def try_git_describe() -> Optional[str]:
    try:  # nocoverage
        return subprocess.check_output(
            ['git', 'describe', '--tags', '--match=[0-9]*', '--always', '--dirty', '--long'],
            stderr=subprocess.PIPE,
            cwd=os.path.join(os.path.dirname(__file__), '..'),
            universal_newlines=True,
        ).strip()
    except (FileNotFoundError, subprocess.CalledProcessError):  # nocoverage
        return None

def add_request_metadata(report: Dict[str, Any], request: HttpRequest) -> None:
    report['has_request'] = True

    report['path'] = request.path
    report['method'] = request.method
    report['remote_addr'] = request.META.get('REMOTE_ADDR', None)
    report['query_string'] = request.META.get('QUERY_STRING', None)
    report['server_name'] = request.META.get('SERVER_NAME', None)
    try:
        from django.contrib.auth.models import AnonymousUser
        user_profile = request.user
        if isinstance(user_profile, AnonymousUser):
            user_full_name = None
            user_email = None
            user_role = None
        else:
            user_full_name = user_profile.full_name
            user_email = user_profile.email
            with override_language(settings.LANGUAGE_CODE):
                # str() to force the lazy-translation to apply now,
                # since it won't serialize into the worker queue.
                user_role = str(user_profile.get_role_name())
    except Exception:
        # Unexpected exceptions here should be handled gracefully
        traceback.print_exc()
        user_full_name = None
        user_email = None
        user_role = None

    report['user'] = {
        'user_email': user_email,
        'user_full_name': user_full_name,
        'user_role': user_role,
    }

    exception_filter = get_exception_reporter_filter(request)
    try:
        report['data'] = exception_filter.get_post_parameters(request) \
            if request.method == 'POST' else request.GET
    except Exception:
        # exception_filter.get_post_parameters will throw
        # RequestDataTooBig if there's a really big file uploaded
        report['data'] = {}

    try:
        report['host'] = SplitResult("", request.get_host(), "", "", "").hostname
    except Exception:
        # request.get_host() will throw a DisallowedHost
        # exception if the host is invalid
        report['host'] = platform.node()

@runtime_checkable
class HasRequest(Protocol):
    request: HttpRequest

class AdminNotifyHandler(logging.Handler):
    """An logging handler that sends the log/exception to the queue to be
       turned into an email and/or a Zulip message for the server admins.
    """

    # adapted in part from django/utils/log.py

    def __init__(self) -> None:
        logging.Handler.__init__(self)

    def emit(self, record: logging.LogRecord) -> None:
        report: Dict[str, Any] = {}

        # This parameter determines whether Zulip should attempt to
        # send Zulip messages containing the error report.  If there's
        # syntax that makes the Markdown processor throw an exception,
        # we really don't want to send that syntax into a new Zulip
        # message in exception handler (that's the stuff of which
        # recursive exception loops are made).
        #
        # We initialize is_markdown_rendering_exception to `True` to
        # prevent the infinite loop of Zulip messages by ERROR_BOT if
        # the outer try block here throws an exception before we have
        # a chance to check the exception for whether it comes from
        # markdown.
        is_markdown_rendering_exception = True

        try:
            report['node'] = platform.node()
            report['host'] = platform.node()

            report['deployment_data'] = dict(
                git=try_git_describe(),
                ZULIP_VERSION=ZULIP_VERSION,
            )

            if record.exc_info:
                stack_trace = ''.join(traceback.format_exception(*record.exc_info))
                message = str(record.exc_info[1])
                is_markdown_rendering_exception = record.msg.startswith('Exception in Markdown parser')
            else:
                stack_trace = 'No stack trace available'
                message = record.getMessage()
                if '\n' in message:
                    # Some exception code paths in queue processors
                    # seem to result in super-long messages
                    stack_trace = message
                    message = message.split('\n')[0]
                is_markdown_rendering_exception = False
            report['stack_trace'] = stack_trace
            report['message'] = message

            report['logger_name'] = record.name
            report['log_module'] = find_log_caller_module(record)
            report['log_lineno'] = record.lineno

            if isinstance(record, HasRequest):
                add_request_metadata(report, record.request)

        except Exception:
            report['message'] = "Exception in preparing exception report!"
            logging.warning(report['message'], exc_info=True)
            report['stack_trace'] = "See /var/log/zulip/errors.log"
            capture_exception()

        if settings.DEBUG_ERROR_REPORTING:  # nocoverage
            logging.warning("Reporting an error to admins...")
            logging.warning(
                "Reporting an error to admins: %s %s %s %s %s",
                record.levelname, report['logger_name'], report['log_module'],
                report['message'], report['stack_trace'],
            )

        try:
            if settings.STAGING_ERROR_NOTIFICATIONS:
                # On staging, process the report directly so it can happen inside this
                # try/except to prevent looping
                from zerver.lib.error_notify import notify_server_error
                notify_server_error(report, is_markdown_rendering_exception)
            else:
                queue_json_publish('error_reports', dict(
                    type = "server",
                    report = report,
                ))
        except Exception:
            # If this breaks, complain loudly but don't pass the traceback up the stream
            # However, we *don't* want to use logging.exception since that could trigger a loop.
            logging.warning("Reporting an exception triggered an exception!", exc_info=True)
            capture_exception()
