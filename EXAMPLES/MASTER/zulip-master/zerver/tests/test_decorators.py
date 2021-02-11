import base64
import os
import re
from collections import defaultdict
from typing import Any, Dict, Iterable, List, Tuple
from unittest import mock, skipUnless

import orjson
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ValidationError
from django.http import HttpRequest, HttpResponse
from django.utils.timezone import now as timezone_now

from zerver.decorator import (
    authenticate_notify,
    authenticated_json_view,
    authenticated_rest_api_view,
    authenticated_uploads_api_view,
    cachify,
    get_client_name,
    internal_notify_view,
    is_local_addr,
    rate_limit,
    return_success_on_head_request,
    validate_api_key,
    webhook_view,
    zulip_login_required,
)
from zerver.forms import OurAuthenticationForm
from zerver.lib.actions import (
    do_deactivate_realm,
    do_deactivate_user,
    do_reactivate_realm,
    do_reactivate_user,
    do_set_realm_property,
)
from zerver.lib.cache import dict_to_items_tuple, ignore_unhashable_lru_cache, items_tuple_to_dict
from zerver.lib.exceptions import (
    InvalidAPIKeyError,
    InvalidAPIKeyFormatError,
    JsonableError,
    UnsupportedWebhookEventType,
)
from zerver.lib.initial_password import initial_password
from zerver.lib.request import (
    REQ,
    RequestConfusingParmsError,
    RequestVariableConversionError,
    RequestVariableMissingError,
    has_request_variables,
)
from zerver.lib.response import json_response, json_success
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import HostRequestMock
from zerver.lib.user_agent import parse_user_agent
from zerver.lib.users import get_api_key
from zerver.lib.utils import generate_api_key, has_api_key_format
from zerver.lib.validator import (
    Validator,
    check_bool,
    check_capped_string,
    check_color,
    check_dict,
    check_dict_only,
    check_float,
    check_int,
    check_int_in,
    check_list,
    check_none_or,
    check_short_string,
    check_string,
    check_string_fixed_length,
    check_string_in,
    check_string_or_int,
    check_string_or_int_list,
    check_tuple,
    check_union,
    check_url,
    equals,
    to_non_negative_int,
    to_positive_or_allowed_int,
)
from zerver.models import Realm, UserProfile, get_realm, get_user

if settings.ZILENCER_ENABLED:
    from zilencer.models import RemoteZulipServer


class DecoratorTestCase(ZulipTestCase):
    def test_get_client_name(self) -> None:
        req = HostRequestMock()
        self.assertEqual(get_client_name(req), 'Unspecified')

        req.META['HTTP_USER_AGENT'] = 'ZulipElectron/4.0.3 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Zulip/4.0.3 Chrome/66.0.3359.181 Electron/3.1.10 Safari/537.36'
        self.assertEqual(get_client_name(req), 'ZulipElectron')

        req.META['HTTP_USER_AGENT'] = 'ZulipDesktop/0.4.4 (Mac)'
        self.assertEqual(get_client_name(req), 'ZulipDesktop')

        req.META['HTTP_USER_AGENT'] = 'ZulipMobile/26.22.145 (Android 10)'
        self.assertEqual(get_client_name(req), 'ZulipMobile')

        req.META['HTTP_USER_AGENT'] = 'ZulipMobile/26.22.145 (iOS 13.3.1)'
        self.assertEqual(get_client_name(req), 'ZulipMobile')

        # TODO: This should ideally be Firefox.
        req.META['HTTP_USER_AGENT'] = 'Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0'
        self.assertEqual(get_client_name(req), 'Mozilla')

        # TODO: This should ideally be Chrome.
        req.META['HTTP_USER_AGENT'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.43 Safari/537.36'
        self.assertEqual(get_client_name(req), 'Mozilla')

        # TODO: This should ideally be Mobile Safari if we had better user-agent parsing.
        req.META['HTTP_USER_AGENT'] = 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36'
        self.assertEqual(get_client_name(req), 'Mozilla')

    def test_REQ_aliases(self) -> None:

        @has_request_variables
        def double(request: HttpRequest,
                   x: int=REQ(whence='number', aliases=['x', 'n'], converter=int)) -> int:
            return x + x

        class Request:
            GET: Dict[str, str] = {}
            POST: Dict[str, str] = {}

        request = Request()

        request.POST = dict(bogus='5555')
        with self.assertRaises(RequestVariableMissingError):
            double(request)

        request.POST = dict(number='3')
        self.assertEqual(double(request), 6)

        request.POST = dict(x='4')
        self.assertEqual(double(request), 8)

        request.POST = dict(n='5')
        self.assertEqual(double(request), 10)

        request.POST = dict(number='6', x='7')
        with self.assertRaises(RequestConfusingParmsError) as cm:
            double(request)
        self.assertEqual(str(cm.exception), "Can't decide between 'number' and 'x' arguments")

    def test_REQ_converter(self) -> None:

        def my_converter(data: str) -> List[int]:
            lst = orjson.loads(data)
            if not isinstance(lst, list):
                raise ValueError('not a list')
            if 13 in lst:
                raise JsonableError('13 is an unlucky number!')
            return [int(elem) for elem in lst]

        @has_request_variables
        def get_total(request: HttpRequest, numbers: Iterable[int]=REQ(converter=my_converter)) -> int:
            return sum(numbers)

        class Request:
            GET: Dict[str, str] = {}
            POST: Dict[str, str] = {}

        request = Request()

        with self.assertRaises(RequestVariableMissingError):
            get_total(request)

        request.POST['numbers'] = 'bad_value'
        with self.assertRaises(RequestVariableConversionError) as cm:
            get_total(request)
        self.assertEqual(str(cm.exception), "Bad value for 'numbers': bad_value")

        request.POST['numbers'] = orjson.dumps('{fun: unfun}').decode()
        with self.assertRaises(JsonableError) as cm:
            get_total(request)
        self.assertEqual(str(cm.exception), 'Bad value for \'numbers\': "{fun: unfun}"')

        request.POST['numbers'] = orjson.dumps([2, 3, 5, 8, 13, 21]).decode()
        with self.assertRaises(JsonableError) as cm:
            get_total(request)
        self.assertEqual(str(cm.exception), "13 is an unlucky number!")

        request.POST['numbers'] = orjson.dumps([1, 2, 3, 4, 5, 6]).decode()
        result = get_total(request)
        self.assertEqual(result, 21)

    def test_REQ_validator(self) -> None:

        @has_request_variables
        def get_total(request: HttpRequest,
                      numbers: Iterable[int]=REQ(validator=check_list(check_int))) -> int:
            return sum(numbers)

        class Request:
            GET: Dict[str, str] = {}
            POST: Dict[str, str] = {}

        request = Request()

        with self.assertRaises(RequestVariableMissingError):
            get_total(request)

        request.POST['numbers'] = 'bad_value'
        with self.assertRaises(JsonableError) as cm:
            get_total(request)
        self.assertEqual(str(cm.exception), 'Argument "numbers" is not valid JSON.')

        request.POST['numbers'] = orjson.dumps([1, 2, "what?", 4, 5, 6]).decode()
        with self.assertRaises(JsonableError) as cm:
            get_total(request)
        self.assertEqual(str(cm.exception), 'numbers[2] is not an integer')

        request.POST['numbers'] = orjson.dumps([1, 2, 3, 4, 5, 6]).decode()
        result = get_total(request)
        self.assertEqual(result, 21)

    def test_REQ_str_validator(self) -> None:

        @has_request_variables
        def get_middle_characters(request: HttpRequest,
                                  value: str=REQ(str_validator=check_string_fixed_length(5))) -> str:
            return value[1:-1]

        class Request:
            GET: Dict[str, str] = {}
            POST: Dict[str, str] = {}

        request = Request()

        with self.assertRaises(RequestVariableMissingError):
            get_middle_characters(request)

        request.POST['value'] = 'long_value'
        with self.assertRaises(JsonableError) as cm:
            get_middle_characters(request)
        self.assertEqual(str(cm.exception), 'value has incorrect length 10; should be 5')

        request.POST['value'] = 'valid'
        result = get_middle_characters(request)
        self.assertEqual(result, 'ali')

    def test_REQ_argument_type(self) -> None:
        @has_request_variables
        def get_payload(request: HttpRequest,
                        payload: Dict[str, Any]=REQ(argument_type='body')) -> Dict[str, Any]:
            return payload

        request = HostRequestMock()
        request.body = 'notjson'
        with self.assertRaises(JsonableError) as cm:
            get_payload(request)
        self.assertEqual(str(cm.exception), 'Malformed JSON')

        request.body = '{"a": "b"}'
        self.assertEqual(get_payload(request), {'a': 'b'})

    def logger_output(self, output_string: str, type: str, logger: str) -> str:
        return f'{type.upper()}:zulip.zerver.{logger}:{output_string}'

    def test_webhook_view(self) -> None:
        @webhook_view('ClientName')
        def my_webhook(request: HttpRequest, user_profile: UserProfile) -> str:
            return user_profile.email

        @webhook_view('ClientName')
        def my_webhook_raises_exception(request: HttpRequest, user_profile: UserProfile) -> None:
            raise Exception("raised by webhook function")

        @webhook_view('ClientName')
        def my_webhook_raises_exception_unsupported_event(
                request: HttpRequest, user_profile: UserProfile) -> None:
            raise UnsupportedWebhookEventType("test_event")

        webhook_bot_email = 'webhook-bot@zulip.com'
        webhook_bot_realm = get_realm('zulip')
        webhook_bot = get_user(webhook_bot_email, webhook_bot_realm)
        webhook_bot_api_key = get_api_key(webhook_bot)

        request = HostRequestMock()
        request.POST['api_key'] = 'X'*32

        with self.assertRaisesRegex(JsonableError, "Invalid API key"):
            my_webhook(request)

        # Start a valid request here
        request.POST['api_key'] = webhook_bot_api_key

        with self.assertLogs(level="WARNING") as m:
            with self.assertRaisesRegex(JsonableError,
                                        "Account is not associated with this subdomain"):
                api_result = my_webhook(request)
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(webhook_bot_email, "zulip", "")]
        )

        with self.assertLogs(level="WARNING") as m:
            with self.assertRaisesRegex(JsonableError,
                                        "Account is not associated with this subdomain"):
                request.host = "acme." + settings.EXTERNAL_HOST
                api_result = my_webhook(request)
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(webhook_bot_email, "zulip", "acme")]
        )

        request.host = "zulip.testserver"
        # Test when content_type is application/json and request.body
        # is valid JSON; exception raised in the webhook function
        # should be re-raised

        with self.assertLogs('zulip.zerver.webhooks', level='INFO') as log:
            with self.assertRaisesRegex(Exception, "raised by webhook function"):
                request.body = "{}"
                request.content_type = 'application/json'
                my_webhook_raises_exception(request)

        # Test when content_type is not application/json; exception raised
        # in the webhook function should be re-raised

        with self.assertLogs('zulip.zerver.webhooks', level='INFO') as log:
            with self.assertRaisesRegex(Exception, "raised by webhook function"):
                request.body = "notjson"
                request.content_type = 'text/plain'
                my_webhook_raises_exception(request)

        # Test when content_type is application/json but request.body
        # is not valid JSON; invalid JSON should be logged and the
        # exception raised in the webhook function should be re-raised
        with self.assertLogs('zulip.zerver.webhooks', level='ERROR') as log:
            with self.assertRaisesRegex(Exception, "raised by webhook function"):
                request.body = "invalidjson"
                request.content_type = 'application/json'
                request.META['HTTP_X_CUSTOM_HEADER'] = 'custom_value'
                my_webhook_raises_exception(request)

        self.assertIn(self.logger_output("raised by webhook function\n", 'error', 'webhooks'), log.output[0])

        # Test when an unsupported webhook event occurs
        exception_msg = "The 'test_event' event isn't currently supported by the ClientName webhook"
        with self.assertLogs('zulip.zerver.webhooks.unsupported', level='ERROR') as log:
            with self.assertRaisesRegex(UnsupportedWebhookEventType, exception_msg):
                request.body = "invalidjson"
                request.content_type = 'application/json'
                request.META['HTTP_X_CUSTOM_HEADER'] = 'custom_value'
                my_webhook_raises_exception_unsupported_event(request)

        self.assertIn(self.logger_output(exception_msg, 'error', 'webhooks.unsupported'), log.output[0])

        with self.settings(RATE_LIMITING=True):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                api_result = my_webhook(request)

        # Verify rate limiting was attempted.
        self.assertTrue(rate_limit_mock.called)

        # Verify the main purpose of the decorator, which is that it passed in the
        # user_profile to my_webhook, allowing it return the correct
        # email for the bot (despite the API caller only knowing the API key).
        self.assertEqual(api_result, webhook_bot_email)

        # Now deactivate the user
        webhook_bot.is_active = False
        webhook_bot.save()
        with self.assertRaisesRegex(JsonableError, "Account is deactivated"):
            my_webhook(request)

        # Reactive the user, but deactivate their realm.
        webhook_bot.is_active = True
        webhook_bot.save()
        webhook_bot.realm.deactivated = True
        webhook_bot.realm.save()
        with self.assertRaisesRegex(JsonableError, "This organization has been deactivated"):
            my_webhook(request)

class SkipRateLimitingTest(ZulipTestCase):
    def test_authenticated_rest_api_view(self) -> None:
        @authenticated_rest_api_view(skip_rate_limiting=False)
        def my_rate_limited_view(request: HttpRequest, user_profile: UserProfile) -> str:
            return json_success()  # nocoverage # mock prevents this from being called

        @authenticated_rest_api_view(skip_rate_limiting=True)
        def my_unlimited_view(request: HttpRequest, user_profile: UserProfile) -> str:
            return json_success()

        request = HostRequestMock(host="zulip.testserver")
        request.META['HTTP_AUTHORIZATION'] = self.encode_email(self.example_email("hamlet"))
        request.method = 'POST'
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_unlimited_view(request)

        self.assert_json_success(result)
        self.assertFalse(rate_limit_mock.called)
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_rate_limited_view(request)

        # Don't assert json_success, since it'll be the rate_limit mock object
        self.assertTrue(rate_limit_mock.called)

    def test_authenticated_uploads_api_view(self) -> None:
        @authenticated_uploads_api_view(skip_rate_limiting=False)
        def my_rate_limited_view(request: HttpRequest, user_profile: UserProfile) -> str:
            return json_success()  # nocoverage # mock prevents this from being called

        @authenticated_uploads_api_view(skip_rate_limiting=True)
        def my_unlimited_view(request: HttpRequest, user_profile: UserProfile) -> str:
            return json_success()

        request = HostRequestMock(host="zulip.testserver")
        request.method = 'POST'
        request.POST['api_key'] = get_api_key(self.example_user("hamlet"))
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_unlimited_view(request)

        self.assert_json_success(result)
        self.assertFalse(rate_limit_mock.called)
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_rate_limited_view(request)

        # Don't assert json_success, since it'll be the rate_limit mock object
        self.assertTrue(rate_limit_mock.called)

    def test_authenticated_json_view(self) -> None:
        def my_view(request: HttpRequest, user_profile: UserProfile) -> str:
            return json_success()

        my_rate_limited_view = authenticated_json_view(my_view, skip_rate_limiting=False)
        my_unlimited_view = authenticated_json_view(my_view, skip_rate_limiting=True)

        request = HostRequestMock(host="zulip.testserver")
        request.method = 'POST'
        request.user = self.example_user("hamlet")
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_unlimited_view(request)

        self.assert_json_success(result)
        self.assertFalse(rate_limit_mock.called)
        with mock.patch('zerver.decorator.rate_limit') as rate_limit_mock:
            result = my_rate_limited_view(request)

        # Don't assert json_success, since it'll be the rate_limit mock object
        self.assertTrue(rate_limit_mock.called)

class DecoratorLoggingTestCase(ZulipTestCase):
    def test_authenticated_rest_api_view_logging(self) -> None:
        @authenticated_rest_api_view(webhook_client_name="ClientName")
        def my_webhook_raises_exception(request: HttpRequest, user_profile: UserProfile) -> None:
            raise Exception("raised by webhook function")

        webhook_bot_email = 'webhook-bot@zulip.com'

        request = HostRequestMock()
        request.META['HTTP_AUTHORIZATION'] = self.encode_email(webhook_bot_email)
        request.method = 'POST'
        request.host = "zulip.testserver"

        request.body = '{}'
        request.content_type = 'text/plain'

        with mock.patch('zerver.decorator.webhook_logger.exception') as mock_exception:
            with self.assertRaisesRegex(Exception, "raised by webhook function"):
                my_webhook_raises_exception(request)

        mock_exception.assert_called_with("raised by webhook function", stack_info=True)

    def test_authenticated_rest_api_view_logging_unsupported_event(self) -> None:
        @authenticated_rest_api_view(webhook_client_name="ClientName")
        def my_webhook_raises_exception(request: HttpRequest, user_profile: UserProfile) -> None:
            raise UnsupportedWebhookEventType("test_event")

        webhook_bot_email = 'webhook-bot@zulip.com'

        request = HostRequestMock()
        request.META['HTTP_AUTHORIZATION'] = self.encode_email(webhook_bot_email)
        request.method = 'POST'
        request.host = "zulip.testserver"

        request.body = '{}'
        request.content_type = 'text/plain'

        with mock.patch('zerver.decorator.webhook_unsupported_events_logger.exception') as mock_exception:
            exception_msg = "The 'test_event' event isn't currently supported by the ClientName webhook"
            with self.assertRaisesRegex(UnsupportedWebhookEventType, exception_msg):
                my_webhook_raises_exception(request)

        mock_exception.assert_called_with(exception_msg, stack_info=True)

    def test_authenticated_rest_api_view_with_non_webhook_view(self) -> None:
        @authenticated_rest_api_view()
        def non_webhook_view_raises_exception(request: HttpRequest, user_profile: UserProfile) -> None:
            raise Exception("raised by a non-webhook view")

        request = HostRequestMock()
        request.META['HTTP_AUTHORIZATION'] = self.encode_email("aaron@zulip.com")
        request.method = 'POST'
        request.host = "zulip.testserver"

        request.body = '{}'
        request.content_type = 'application/json'

        with mock.patch('zerver.decorator.webhook_logger.exception') as mock_exception:
            with self.assertRaisesRegex(Exception, "raised by a non-webhook view"):
                non_webhook_view_raises_exception(request)

        self.assertFalse(mock_exception.called)

    def test_authenticated_rest_api_view_errors(self) -> None:
        user_profile = self.example_user("hamlet")
        api_key = get_api_key(user_profile)
        credentials = f"{user_profile.email}:{api_key}"
        api_auth = 'Digest ' + base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
        result = self.client_post('/api/v1/external/zendesk', {},
                                  HTTP_AUTHORIZATION=api_auth)
        self.assert_json_error(result, "This endpoint requires HTTP basic authentication.")

        api_auth = 'Basic ' + base64.b64encode(b"foo").decode('utf-8')
        result = self.client_post('/api/v1/external/zendesk', {},
                                  HTTP_AUTHORIZATION=api_auth)
        self.assert_json_error(result, "Invalid authorization header for basic auth",
                               status_code=401)

        result = self.client_post('/api/v1/external/zendesk', {})
        self.assert_json_error(result, "Missing authorization header for basic auth",
                               status_code=401)

class RateLimitTestCase(ZulipTestCase):
    def errors_disallowed(self) -> Any:
        # Due to what is probably a hack in rate_limit(),
        # some tests will give a false positive (or succeed
        # for the wrong reason), unless we complain
        # about logging errors.  There might be a more elegant way
        # make logging errors fail than what I'm doing here.
        class TestLoggingErrorException(Exception):
            pass
        return mock.patch('logging.error', side_effect=TestLoggingErrorException)

    def test_internal_local_clients_skip_rate_limiting(self) -> None:
        class Client:
            name = 'internal'

        class Request:
            client = Client()
            META = {'REMOTE_ADDR': '127.0.0.1'}
            user = AnonymousUser()

        req = Request()

        def f(req: Any) -> str:
            return 'some value'

        f = rate_limit()(f)
        with self.settings(RATE_LIMITING=True):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                with self.errors_disallowed():
                    self.assertEqual(f(req), 'some value')

        self.assertFalse(rate_limit_mock.called)

    def test_debug_clients_skip_rate_limiting(self) -> None:
        class Client:
            name = 'internal'

        class Request:
            client = Client()
            META = {'REMOTE_ADDR': '3.3.3.3'}
            user = AnonymousUser()

        req = Request()

        def f(req: Any) -> str:
            return 'some value'

        f = rate_limit()(f)
        with self.settings(RATE_LIMITING=True):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                with self.errors_disallowed():
                    with self.settings(DEBUG_RATE_LIMITING=True):
                        self.assertEqual(f(req), 'some value')

        self.assertFalse(rate_limit_mock.called)

    def test_rate_limit_setting_of_false_bypasses_rate_limiting(self) -> None:
        class Client:
            name = 'external'

        class Request:
            client = Client()
            META = {'REMOTE_ADDR': '3.3.3.3'}
            user = self.example_user("hamlet")

        req = Request()

        def f(req: Any) -> str:
            return 'some value'

        f = rate_limit()(f)
        with self.settings(RATE_LIMITING=False):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                with self.errors_disallowed():
                    self.assertEqual(f(req), 'some value')

        self.assertFalse(rate_limit_mock.called)

    def test_rate_limiting_happens_in_normal_case(self) -> None:
        class Client:
            name = 'external'

        class Request:
            client = Client()
            META = {'REMOTE_ADDR': '3.3.3.3'}
            user = self.example_user("hamlet")

        req = Request()

        def f(req: Any) -> str:
            return 'some value'

        f = rate_limit()(f)
        with self.settings(RATE_LIMITING=True):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                with self.errors_disallowed():
                    self.assertEqual(f(req), 'some value')

        self.assertTrue(rate_limit_mock.called)

    @skipUnless(settings.ZILENCER_ENABLED, "requires zilencer")
    def test_rate_limiting_skipped_if_remote_server(self) -> None:
        server_uuid = "1234-abcd"
        server = RemoteZulipServer(uuid=server_uuid,
                                   api_key="magic_secret_api_key",
                                   hostname="demo.example.com",
                                   last_updated=timezone_now())

        class Client:
            name = 'external'

        class Request:
            client = Client()
            META = {'REMOTE_ADDR': '3.3.3.3'}
            user = server

        req = Request()

        def f(req: Any) -> str:
            return 'some value'

        f = rate_limit()(f)
        with self.settings(RATE_LIMITING=True):
            with mock.patch('zerver.decorator.rate_limit_user') as rate_limit_mock:
                with self.errors_disallowed():
                    self.assertEqual(f(req), 'some value')

        self.assertFalse(rate_limit_mock.called)

class ValidatorTestCase(ZulipTestCase):
    def test_check_string(self) -> None:
        x: Any = "hello"
        check_string('x', x)

        x = 4
        with self.assertRaisesRegex(ValidationError, r'x is not a string'):
            check_string('x', x)

    def test_check_string_fixed_length(self) -> None:
        x: Any = "hello"
        check_string_fixed_length(5)('x', x)

        x = 4
        with self.assertRaisesRegex(ValidationError, r'x is not a string'):
            check_string_fixed_length(5)('x', x)

        x = "helloz"
        with self.assertRaisesRegex(ValidationError, r'x has incorrect length 6; should be 5'):
            check_string_fixed_length(5)('x', x)

        x = "hi"
        with self.assertRaisesRegex(ValidationError, r'x has incorrect length 2; should be 5'):
            check_string_fixed_length(5)('x', x)

    def test_check_capped_string(self) -> None:
        x: Any = "hello"
        check_capped_string(5)('x', x)

        x = 4
        with self.assertRaisesRegex(ValidationError, r'x is not a string'):
            check_capped_string(5)('x', x)

        x = "helloz"
        with self.assertRaisesRegex(ValidationError, r'x is too long \(limit: 5 characters\)'):
            check_capped_string(5)('x', x)

        x = "hi"
        check_capped_string(5)('x', x)

    def test_check_string_in(self) -> None:
        check_string_in(['valid', 'othervalid'])('Test', "valid")
        with self.assertRaisesRegex(ValidationError, r'Test is not a string'):
            check_string_in(['valid', 'othervalid'])('Test', 15)
        check_string_in(['valid', 'othervalid'])('Test', "othervalid")
        with self.assertRaisesRegex(ValidationError, r'Invalid Test'):
            check_string_in(['valid', 'othervalid'])('Test', "invalid")

    def test_check_int_in(self) -> None:
        check_int_in([1])("Test", 1)
        with self.assertRaisesRegex(ValidationError, r"Invalid Test"):
            check_int_in([1])("Test", 2)
        with self.assertRaisesRegex(ValidationError, r"Test is not an integer"):
            check_int_in([1])("Test", "t")

    def test_check_short_string(self) -> None:
        x: Any = "hello"
        check_short_string('x', x)

        x = 'x' * 201
        with self.assertRaisesRegex(ValidationError, r"x is too long \(limit: 50 characters\)"):
            check_short_string('x', x)

        x = 4
        with self.assertRaisesRegex(ValidationError, r'x is not a string'):
            check_short_string('x', x)

    def test_check_bool(self) -> None:
        x: Any = True
        check_bool('x', x)

        x = 4
        with self.assertRaisesRegex(ValidationError, r'x is not a boolean'):
            check_bool('x', x)

    def test_check_int(self) -> None:
        x: Any = 5
        check_int('x', x)

        x = [{}]
        with self.assertRaisesRegex(ValidationError, r'x is not an integer'):
            check_int('x', x)

    def test_to_non_negative_int(self) -> None:
        self.assertEqual(to_non_negative_int('5'), 5)
        with self.assertRaisesRegex(ValueError, 'argument is negative'):
            self.assertEqual(to_non_negative_int('-1'))
        with self.assertRaisesRegex(ValueError, re.escape('5 is too large (max 4)')):
            self.assertEqual(to_non_negative_int('5', max_int_size=4))
        with self.assertRaisesRegex(ValueError, re.escape(f'{2**32} is too large (max {2**32-1})')):
            self.assertEqual(to_non_negative_int(str(2**32)))

    def test_to_positive_or_allowed_int(self) -> None:
        self.assertEqual(to_positive_or_allowed_int(-1)('5'), 5)
        self.assertEqual(to_positive_or_allowed_int(-1)('-1'), -1)
        with self.assertRaisesRegex(ValueError, 'argument is negative'):
            to_positive_or_allowed_int(-1)('-5')
        with self.assertRaises(ValueError):
            to_positive_or_allowed_int(-1)('0')

    def test_check_float(self) -> None:
        x: Any = 5.5
        check_float('x', x)

        x = 5
        with self.assertRaisesRegex(ValidationError, r'x is not a float'):
            check_float('x', x)

        x = [{}]
        with self.assertRaisesRegex(ValidationError, r'x is not a float'):
            check_float('x', x)

    def test_check_color(self) -> None:
        x = ['#000099', '#80ffaa', '#80FFAA', '#abcd12', '#ffff00', '#ff0', '#f00']  # valid
        y = ['000099', '#80f_aa', '#80fraa', '#abcd1234', 'blue']  # invalid
        z = 5  # invalid

        for hex_color in x:
            check_color('color', hex_color)

        for hex_color in y:
            with self.assertRaisesRegex(ValidationError, r'color is not a valid hex color code'):
                check_color('color', hex_color)

        with self.assertRaisesRegex(ValidationError, r'color is not a string'):
            check_color('color', z)

    def test_check_tuple(self) -> None:
        x: Any = 999
        with self.assertRaisesRegex(ValidationError, r'x is not a tuple'):
            check_tuple([check_string])('x', x)

        x = (5, 2)
        with self.assertRaisesRegex(ValidationError, r'x\[0\] is not a string'):
            check_tuple([check_string, check_string])('x', x)

        x = (1, 2, 3)
        with self.assertRaisesRegex(ValidationError, r'x should have exactly 2 items'):
            check_tuple([check_int, check_int])('x', x)

        check_tuple([check_string, check_int])('x', ('string', 42))

    def test_check_list(self) -> None:
        x: Any = 999
        with self.assertRaisesRegex(ValidationError, r'x is not a list'):
            check_list(check_string)('x', x)

        x = ["hello", 5]
        with self.assertRaisesRegex(ValidationError, r'x\[1\] is not a string'):
            check_list(check_string)('x', x)

        x = [["yo"], ["hello", "goodbye", 5]]
        with self.assertRaisesRegex(ValidationError, r'x\[1\]\[2\] is not a string'):
            check_list(check_list(check_string))('x', x)

        x = ["hello", "goodbye", "hello again"]
        with self.assertRaisesRegex(ValidationError, r'x should have exactly 2 items'):
            check_list(check_string, length=2)('x', x)

    def test_check_dict(self) -> None:
        keys: List[Tuple[str, Validator[object]]] = [
            ('names', check_list(check_string)),
            ('city', check_string),
        ]

        x: Any = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
        }
        check_dict(keys)('x', x)

        x = 999
        with self.assertRaisesRegex(ValidationError, r'x is not a dict'):
            check_dict(keys)('x', x)

        x = {}
        with self.assertRaisesRegex(ValidationError, r'names key is missing from x'):
            check_dict(keys)('x', x)

        x = {
            'names': ['alice', 'bob', {}],
        }
        with self.assertRaisesRegex(ValidationError, r'x\["names"\]\[2\] is not a string'):
            check_dict(keys)('x', x)

        x = {
            'names': ['alice', 'bob'],
            'city': 5,
        }
        with self.assertRaisesRegex(ValidationError, r'x\["city"\] is not a string'):
            check_dict(keys)('x', x)

        x = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
        }
        with self.assertRaisesRegex(ValidationError, r'x contains a value that is not a string'):
            check_dict(value_validator=check_string)('x', x)

        x = {
            'city': 'Boston',
        }
        check_dict(value_validator=check_string)('x', x)

        # test dict_only
        x = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
        }
        check_dict_only(keys)('x', x)

        x = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
            'state': 'Massachusetts',
        }
        with self.assertRaisesRegex(ValidationError, r'Unexpected arguments: state'):
            check_dict_only(keys)('x', x)

        # Test optional keys
        optional_keys = [
            ('food', check_list(check_string)),
            ('year', check_int),
        ]

        x = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
            'food': ['Lobster Spaghetti'],
        }

        check_dict(keys)('x', x)  # since _allow_only_listed_keys is False

        with self.assertRaisesRegex(ValidationError, r'Unexpected arguments: food'):
            check_dict_only(keys)('x', x)

        check_dict_only(keys, optional_keys)('x', x)

        x = {
            'names': ['alice', 'bob'],
            'city': 'Boston',
            'food': 'Lobster Spaghetti',
        }
        with self.assertRaisesRegex(ValidationError, r'x\["food"\] is not a list'):
            check_dict_only(keys, optional_keys)('x', x)

    def test_encapsulation(self) -> None:
        # There might be situations where we want deep
        # validation, but the error message should be customized.
        # This is an example.
        def check_person(val: object) -> Dict[str, object]:
            try:
                return check_dict([
                    ('name', check_string),
                    ('age', check_int),
                ])('_', val)
            except ValidationError:
                raise ValidationError('This is not a valid person')

        person = {'name': 'King Lear', 'age': 42}
        check_person(person)

        nonperson = 'misconfigured data'
        with self.assertRaisesRegex(ValidationError, r'This is not a valid person'):
            check_person(nonperson)

    def test_check_union(self) -> None:
        x: Any = 5
        check_union([check_string, check_int])('x', x)

        x = 'x'
        check_union([check_string, check_int])('x', x)

        x = [{}]
        with self.assertRaisesRegex(ValidationError, r'x is not an allowed_type'):
            check_union([check_string, check_int])('x', x)

    def test_equals(self) -> None:
        x: Any = 5
        equals(5)('x', x)
        with self.assertRaisesRegex(ValidationError, r'x != 6 \(5 is wrong\)'):
            equals(6)('x', x)

    def test_check_none_or(self) -> None:
        x: Any = 5
        check_none_or(check_int)('x', x)
        x = None
        check_none_or(check_int)('x', x)
        x = 'x'
        with self.assertRaisesRegex(ValidationError, r'x is not an integer'):
            check_none_or(check_int)('x', x)

    def test_check_url(self) -> None:
        url: Any = "http://127.0.0.1:5002/"
        check_url('url', url)

        url = "http://zulip-bots.example.com/"
        check_url('url', url)

        url = "http://127.0.0"
        with self.assertRaisesRegex(ValidationError, r'url is not a URL'):
            check_url('url', url)

        url = 99.3
        with self.assertRaisesRegex(ValidationError, r'url is not a string'):
            check_url('url', url)

    def test_check_string_or_int_list(self) -> None:
        x: Any = "string"
        check_string_or_int_list('x', x)

        x = [1, 2, 4]
        check_string_or_int_list('x', x)

        x = None
        with self.assertRaisesRegex(ValidationError, r'x is not a string or an integer list'):
            check_string_or_int_list('x', x)

        x = [1, 2, '3']
        with self.assertRaisesRegex(ValidationError, r'x\[2\] is not an integer'):
            check_string_or_int_list('x', x)

    def test_check_string_or_int(self) -> None:
        x: Any = "string"
        check_string_or_int('x', x)

        x = 1
        check_string_or_int('x', x)

        x = None
        with self.assertRaisesRegex(ValidationError, r'x is not a string or integer'):
            check_string_or_int('x', x)


class DeactivatedRealmTest(ZulipTestCase):
    def test_send_deactivated_realm(self) -> None:
        """
        rest_dispatch rejects requests in a deactivated realm, both /json and api

        """
        realm = get_realm("zulip")
        do_deactivate_realm(get_realm("zulip"))

        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "Not logged in", status_code=401)

        # Even if a logged-in session was leaked, it still wouldn't work
        realm.deactivated = False
        realm.save()
        self.login('hamlet')
        realm.deactivated = True
        realm.save()

        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "has been deactivated", status_code=400)

        result = self.api_post(self.example_user("hamlet"),
                               "/api/v1/messages", {"type": "private",
                                                    "content": "Test message",
                                                    "client": "test suite",
                                                    "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "has been deactivated", status_code=401)

    def test_fetch_api_key_deactivated_realm(self) -> None:
        """
        authenticated_json_view views fail in a deactivated realm

        """
        realm = get_realm("zulip")
        user_profile = self.example_user('hamlet')
        test_password = "abcd1234"
        user_profile.set_password(test_password)

        self.login_user(user_profile)
        realm.deactivated = True
        realm.save()
        result = self.client_post("/json/fetch_api_key", {"password": test_password})
        self.assert_json_error_contains(result, "has been deactivated", status_code=400)

    def test_webhook_deactivated_realm(self) -> None:
        """
        Using a webhook while in a deactivated realm fails

        """
        do_deactivate_realm(get_realm("zulip"))
        user_profile = self.example_user("hamlet")
        api_key = get_api_key(user_profile)
        url = f"/api/v1/external/jira?api_key={api_key}&stream=jira_custom"
        data = self.webhook_fixture_data('jira', 'created_v2')
        result = self.client_post(url, data,
                                  content_type="application/json")
        self.assert_json_error_contains(result, "has been deactivated", status_code=400)

class LoginRequiredTest(ZulipTestCase):
    def test_login_required(self) -> None:
        """
        Verifies the zulip_login_required decorator blocks deactivated users.
        """
        user_profile = self.example_user('hamlet')

        # Verify fails if logged-out
        result = self.client_get('/accounts/accept_terms/')
        self.assertEqual(result.status_code, 302)

        # Verify succeeds once logged-in
        self.login_user(user_profile)
        result = self.client_get('/accounts/accept_terms/')
        self.assert_in_response("I agree to the", result)

        # Verify fails if user deactivated (with session still valid)
        user_profile.is_active = False
        user_profile.save()
        result = self.client_get('/accounts/accept_terms/')
        self.assertEqual(result.status_code, 302)

        # Verify succeeds if user reactivated
        do_reactivate_user(user_profile)
        self.login_user(user_profile)
        result = self.client_get('/accounts/accept_terms/')
        self.assert_in_response("I agree to the", result)

        # Verify fails if realm deactivated
        user_profile.realm.deactivated = True
        user_profile.realm.save()
        result = self.client_get('/accounts/accept_terms/')
        self.assertEqual(result.status_code, 302)

class FetchAPIKeyTest(ZulipTestCase):
    def test_fetch_api_key_success(self) -> None:
        user = self.example_user("cordelia")
        self.login_user(user)
        result = self.client_post("/json/fetch_api_key",
                                  dict(password=initial_password(user.delivery_email)))
        self.assert_json_success(result)

    def test_fetch_api_key_email_address_visibility(self) -> None:
        user = self.example_user("cordelia")
        do_set_realm_property(user.realm, "email_address_visibility",
                              Realm.EMAIL_ADDRESS_VISIBILITY_ADMINS)

        self.login_user(user)
        result = self.client_post("/json/fetch_api_key",
                                  dict(password=initial_password(user.delivery_email)))
        self.assert_json_success(result)

    def test_fetch_api_key_wrong_password(self) -> None:
        self.login('cordelia')
        result = self.client_post("/json/fetch_api_key",
                                  dict(password='wrong_password'))
        self.assert_json_error_contains(result, "password is incorrect")

class InactiveUserTest(ZulipTestCase):
    def test_send_deactivated_user(self) -> None:
        """
        rest_dispatch rejects requests from deactivated users, both /json and api

        """
        user_profile = self.example_user('hamlet')
        self.login_user(user_profile)
        do_deactivate_user(user_profile)

        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "Not logged in", status_code=401)

        # Even if a logged-in session was leaked, it still wouldn't work
        do_reactivate_user(user_profile)
        self.login_user(user_profile)
        user_profile.is_active = False
        user_profile.save()

        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "Account is deactivated", status_code=400)

        result = self.api_post(self.example_user("hamlet"),
                               "/api/v1/messages", {"type": "private",
                                                    "content": "Test message",
                                                    "client": "test suite",
                                                    "to": self.example_email("othello")})
        self.assert_json_error_contains(result, "Account is deactivated", status_code=401)

    def test_fetch_api_key_deactivated_user(self) -> None:
        """
        authenticated_json_view views fail with a deactivated user

        """
        user_profile = self.example_user('hamlet')
        email = user_profile.delivery_email
        test_password = "abcd1234"
        user_profile.set_password(test_password)
        user_profile.save()

        self.login_by_email(email, password=test_password)
        user_profile.is_active = False
        user_profile.save()
        result = self.client_post("/json/fetch_api_key", {"password": test_password})
        self.assert_json_error_contains(result, "Account is deactivated", status_code=400)

    def test_login_deactivated_user(self) -> None:
        """
        logging in fails with an inactive user

        """
        user_profile = self.example_user('hamlet')
        do_deactivate_user(user_profile)

        result = self.login_with_return(self.example_email("hamlet"))
        self.assert_in_response(
            "Your account is no longer active.",
            result)

    def test_login_deactivated_mirror_dummy(self) -> None:
        """
        logging in fails with an inactive user

        """
        user_profile = self.example_user('hamlet')
        user_profile.is_mirror_dummy = True
        user_profile.save()

        password = initial_password(user_profile.delivery_email)
        request = mock.MagicMock()
        request.get_host.return_value = 'zulip.testserver'

        payload = dict(
            username=user_profile.delivery_email,
            password=password,
        )

        # Test a mirror-dummy active user.
        form = OurAuthenticationForm(request, payload)
        with self.settings(AUTHENTICATION_BACKENDS=('zproject.backends.EmailAuthBackend',)):
            self.assertTrue(form.is_valid())

        # Test a mirror-dummy deactivated user.
        do_deactivate_user(user_profile)
        user_profile.save()

        form = OurAuthenticationForm(request, payload)
        with self.settings(AUTHENTICATION_BACKENDS=('zproject.backends.EmailAuthBackend',)):
            self.assertFalse(form.is_valid())
            self.assertIn("Please enter a correct email", str(form.errors))

        # Test a non-mirror-dummy deactivated user.
        user_profile.is_mirror_dummy = False
        user_profile.save()

        form = OurAuthenticationForm(request, payload)
        with self.settings(AUTHENTICATION_BACKENDS=('zproject.backends.EmailAuthBackend',)):
            self.assertFalse(form.is_valid())
            self.assertIn("Your account is no longer active", str(form.errors))

    def test_webhook_deactivated_user(self) -> None:
        """
        Deactivated users can't use webhooks

        """
        user_profile = self.example_user('hamlet')
        do_deactivate_user(user_profile)

        api_key = get_api_key(user_profile)
        url = f"/api/v1/external/jira?api_key={api_key}&stream=jira_custom"
        data = self.webhook_fixture_data('jira', 'created_v2')
        result = self.client_post(url, data,
                                  content_type="application/json")
        self.assert_json_error_contains(result, "Account is deactivated", status_code=400)


class TestIncomingWebhookBot(ZulipTestCase):
    def test_webhook_bot_permissions(self) -> None:
        webhook_bot = self.example_user('webhook_bot')
        othello = self.example_user('othello')
        payload = dict(
            type='private',
            content='Test message',
            client='test suite',
            to=othello.email,
        )

        result = self.api_post(webhook_bot, "/api/v1/messages", payload)
        self.assert_json_success(result)
        post_params = {"anchor": 1, "num_before": 1, "num_after": 1}
        result = self.api_get(webhook_bot, "/api/v1/messages", dict(post_params))
        self.assert_json_error(result, 'This API is not available to incoming webhook bots.',
                               status_code=401)

class TestValidateApiKey(ZulipTestCase):
    def setUp(self) -> None:
        super().setUp()
        zulip_realm = get_realm('zulip')
        self.webhook_bot = get_user('webhook-bot@zulip.com', zulip_realm)
        self.default_bot = get_user('default-bot@zulip.com', zulip_realm)

    def test_has_api_key_format(self) -> None:
        self.assertFalse(has_api_key_format("TooShort"))
        # Has an invalid character:
        self.assertFalse(has_api_key_format("32LONGXXXXXXXXXXXXXXXXXXXXXXXXX-"))
        # Too long:
        self.assertFalse(has_api_key_format("33LONGXXXXXXXXXXXXXXXXXXXXXXXXXXX"))

        self.assertTrue(has_api_key_format("VIzRVw2CspUOnEm9Yu5vQiQtJNkvETkp"))
        for i in range(0, 10):
            self.assertTrue(has_api_key_format(generate_api_key()))

    def test_validate_api_key_if_profile_does_not_exist(self) -> None:
        with self.assertRaises(JsonableError):
            validate_api_key(HostRequestMock(), 'email@doesnotexist.com', 'VIzRVw2CspUOnEm9Yu5vQiQtJNkvETkp')

    def test_validate_api_key_if_api_key_does_not_match_profile_api_key(self) -> None:
        with self.assertRaises(InvalidAPIKeyFormatError):
            validate_api_key(HostRequestMock(), self.webhook_bot.email, 'not_32_length')

        with self.assertRaises(InvalidAPIKeyError):
            # We use default_bot's key but webhook_bot's email address to test
            # the logic when an API key is passed and it doesn't belong to the
            # user whose email address has been provided.
            api_key = get_api_key(self.default_bot)
            validate_api_key(HostRequestMock(), self.webhook_bot.email, api_key)

    def test_validate_api_key_if_profile_is_not_active(self) -> None:
        self._change_is_active_field(self.default_bot, False)
        with self.assertRaises(JsonableError):
            api_key = get_api_key(self.default_bot)
            validate_api_key(HostRequestMock(), self.default_bot.email, api_key)
        self._change_is_active_field(self.default_bot, True)

    def test_validate_api_key_if_profile_is_incoming_webhook_and_is_webhook_is_unset(self) -> None:
        with self.assertRaises(JsonableError), self.assertLogs(level="WARNING") as root_warn_log:
            api_key = get_api_key(self.webhook_bot)
            validate_api_key(HostRequestMock(), self.webhook_bot.email, api_key)
        self.assertEqual(root_warn_log.output, [
            'WARNING:root:User webhook-bot@zulip.com (zulip) attempted to access API on wrong subdomain ()'
        ])

    def test_validate_api_key_if_profile_is_incoming_webhook_and_is_webhook_is_set(self) -> None:
        api_key = get_api_key(self.webhook_bot)
        profile = validate_api_key(HostRequestMock(host="zulip.testserver"),
                                   self.webhook_bot.email, api_key,
                                   allow_webhook_access=True)
        self.assertEqual(profile.id, self.webhook_bot.id)

    def test_validate_api_key_if_email_is_case_insensitive(self) -> None:
        api_key = get_api_key(self.default_bot)
        profile = validate_api_key(HostRequestMock(host="zulip.testserver"), self.default_bot.email.upper(), api_key)
        self.assertEqual(profile.id, self.default_bot.id)

    def test_valid_api_key_if_user_is_on_wrong_subdomain(self) -> None:
        with self.settings(RUNNING_INSIDE_TORNADO=False):
            api_key = get_api_key(self.default_bot)
            with self.assertLogs(level="WARNING") as m:
                with self.assertRaisesRegex(JsonableError,
                                            "Account is not associated with this subdomain"):
                    validate_api_key(HostRequestMock(host=settings.EXTERNAL_HOST),
                                     self.default_bot.email, api_key)
            self.assertEqual(
                m.output,
                ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(self.default_bot.email, "zulip", "")]
            )

            with self.assertLogs(level="WARNING") as m:
                with self.assertRaisesRegex(JsonableError,
                                            "Account is not associated with this subdomain"):
                    validate_api_key(HostRequestMock(host='acme.' + settings.EXTERNAL_HOST),
                                     self.default_bot.email, api_key)
            self.assertEqual(
                m.output,
                ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(self.default_bot.email, "zulip", "acme")]
            )

    def _change_is_active_field(self, profile: UserProfile, value: bool) -> None:
        profile.is_active = value
        profile.save()

class TestInternalNotifyView(ZulipTestCase):
    BORING_RESULT = 'boring'

    class Request:
        def __init__(self, POST: Dict[str, Any], META: Dict[str, Any]) -> None:
            self.POST = POST
            self.META = META
            self.method = 'POST'

    def internal_notify(self, is_tornado: bool, req: HttpRequest) -> HttpResponse:
        boring_view = lambda req: self.BORING_RESULT
        return internal_notify_view(is_tornado)(boring_view)(req)

    def test_valid_internal_requests(self) -> None:
        secret = 'random'
        req: HttpRequest = self.Request(
            POST=dict(secret=secret),
            META=dict(REMOTE_ADDR='127.0.0.1'),
        )

        with self.settings(SHARED_SECRET=secret):
            self.assertTrue(authenticate_notify(req))
            self.assertEqual(self.internal_notify(False, req), self.BORING_RESULT)
            self.assertEqual(req._requestor_for_logs, 'internal')

            with self.assertRaises(RuntimeError):
                self.internal_notify(True, req)

        req._tornado_handler = 'set'
        with self.settings(SHARED_SECRET=secret):
            self.assertTrue(authenticate_notify(req))
            self.assertEqual(self.internal_notify(True, req), self.BORING_RESULT)
            self.assertEqual(req._requestor_for_logs, 'internal')

            with self.assertRaises(RuntimeError):
                self.internal_notify(False, req)

    def test_internal_requests_with_broken_secret(self) -> None:
        secret = 'random'
        req = self.Request(
            POST=dict(secret=secret),
            META=dict(REMOTE_ADDR='127.0.0.1'),
        )

        with self.settings(SHARED_SECRET='broken'):
            self.assertFalse(authenticate_notify(req))
            self.assertEqual(self.internal_notify(True, req).status_code, 403)

    def test_external_requests(self) -> None:
        secret = 'random'
        req = self.Request(
            POST=dict(secret=secret),
            META=dict(REMOTE_ADDR='3.3.3.3'),
        )

        with self.settings(SHARED_SECRET=secret):
            self.assertFalse(authenticate_notify(req))
            self.assertEqual(self.internal_notify(True, req).status_code, 403)

    def test_is_local_address(self) -> None:
        self.assertTrue(is_local_addr('127.0.0.1'))
        self.assertTrue(is_local_addr('::1'))
        self.assertFalse(is_local_addr('42.43.44.45'))

class TestHumanUsersOnlyDecorator(ZulipTestCase):
    def test_human_only_endpoints(self) -> None:
        default_bot = self.example_user('default_bot')

        post_endpoints = [
            "/api/v1/users/me/apns_device_token",
            "/api/v1/users/me/android_gcm_reg_id",
            "/api/v1/users/me/enter-sends",
            "/api/v1/users/me/hotspots",
            "/api/v1/users/me/presence",
            "/api/v1/users/me/tutorial_status",
            "/api/v1/report/send_times",
        ]
        for endpoint in post_endpoints:
            result = self.api_post(default_bot, endpoint)
            self.assert_json_error(result, "This endpoint does not accept bot requests.")

        patch_endpoints = [
            "/api/v1/settings",
            "/api/v1/settings/display",
            "/api/v1/settings/notifications",
            "/api/v1/users/me/profile_data",
        ]
        for endpoint in patch_endpoints:
            result = self.api_patch(default_bot, endpoint)
            self.assert_json_error(result, "This endpoint does not accept bot requests.")

        delete_endpoints = [
            "/api/v1/users/me/apns_device_token",
            "/api/v1/users/me/android_gcm_reg_id",
        ]
        for endpoint in delete_endpoints:
            result = self.api_delete(default_bot, endpoint)
            self.assert_json_error(result, "This endpoint does not accept bot requests.")

class TestAuthenticatedRequirePostDecorator(ZulipTestCase):
    def test_authenticated_html_post_view_with_get_request(self) -> None:
        self.login('hamlet')
        with self.assertLogs(level="WARNING") as mock_warning:
            result = self.client_get(r'/accounts/register/', {'stream': 'Verona'})
            self.assertEqual(result.status_code, 405)
            self.assertEqual(mock_warning.output, ["WARNING:root:Method Not Allowed (GET): /accounts/register/"])

        with self.assertLogs(level="WARNING") as mock_warning:
            result = self.client_get(r'/accounts/logout/', {'stream': 'Verona'})
            self.assertEqual(result.status_code, 405)
            self.assertEqual(mock_warning.output, ["WARNING:root:Method Not Allowed (GET): /accounts/logout/"])

    def test_authenticated_json_post_view_with_get_request(self) -> None:
        self.login('hamlet')
        with self.assertLogs(level="WARNING") as mock_warning:
            result = self.client_get(r'/api/v1/dev_fetch_api_key', {'stream': 'Verona'})
            self.assertEqual(result.status_code, 405)
            self.assertEqual(mock_warning.output, ["WARNING:root:Method Not Allowed (GET): /api/v1/dev_fetch_api_key"])

        with self.assertLogs(level="WARNING") as mock_warning:
            result = self.client_get(r'/json/remotes/server/register', {'stream': 'Verona'})
            self.assertEqual(result.status_code, 405)
            self.assertEqual(mock_warning.output, ["WARNING:root:Method Not Allowed (GET): /json/remotes/server/register"])

class TestAuthenticatedJsonPostViewDecorator(ZulipTestCase):
    def test_authenticated_json_post_view_if_everything_is_correct(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        response = self._do_test(user)
        self.assertEqual(response.status_code, 200)

    def test_authenticated_json_post_view_with_get_request(self) -> None:
        self.login('hamlet')
        with self.assertLogs(level="WARNING") as m:
            result = self.client_get(r'/json/subscriptions/exists', {'stream': 'Verona'})
            self.assertEqual(result.status_code, 405)
        self.assertEqual(m.output, ["WARNING:root:Method Not Allowed ({}): {}".format("GET", "/json/subscriptions/exists")])

    def test_authenticated_json_post_view_if_subdomain_is_invalid(self) -> None:
        user = self.example_user('hamlet')
        email = user.delivery_email
        self.login_user(user)
        with self.assertLogs(level="WARNING") as m, \
                mock.patch('zerver.decorator.get_subdomain', return_value=''):
            self.assert_json_error_contains(self._do_test(user),
                                            "Account is not associated with this "
                                            "subdomain")
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, 'zulip', ''),
                "WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, 'zulip', '')]
        )

        with self.assertLogs(level="WARNING") as m, \
                mock.patch('zerver.decorator.get_subdomain', return_value='acme'):
            self.assert_json_error_contains(self._do_test(user),
                                            "Account is not associated with this "
                                            "subdomain")
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, 'zulip', 'acme'),
                "WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, 'zulip', 'acme')]
        )

    def test_authenticated_json_post_view_if_user_is_incoming_webhook(self) -> None:
        bot = self.example_user('webhook_bot')
        bot.set_password('test')
        bot.save()
        self.login_by_email(bot.email, password='test')
        self.assert_json_error_contains(self._do_test(bot), "Webhook bots can only access webhooks")

    def test_authenticated_json_post_view_if_user_is_not_active(self) -> None:
        user_profile = self.example_user('hamlet')
        self.login_user(user_profile)
        # we deactivate user manually because do_deactivate_user removes user session
        user_profile.is_active = False
        user_profile.save()
        self.assert_json_error_contains(self._do_test(user_profile), "Account is deactivated")
        do_reactivate_user(user_profile)

    def test_authenticated_json_post_view_if_user_realm_is_deactivated(self) -> None:
        user_profile = self.example_user('hamlet')
        self.login_user(user_profile)
        # we deactivate user's realm manually because do_deactivate_user removes user session
        user_profile.realm.deactivated = True
        user_profile.realm.save()
        self.assert_json_error_contains(self._do_test(user_profile), "This organization has been deactivated")
        do_reactivate_realm(user_profile.realm)

    def _do_test(self, user: UserProfile) -> HttpResponse:
        stream_name = "stream name"
        self.common_subscribe_to_streams(user, [stream_name], allow_fail=True)
        data = {"password": initial_password(user.email), "stream": stream_name}
        return self.client_post('/json/subscriptions/exists', data)

class TestAuthenticatedJsonViewDecorator(ZulipTestCase):
    def test_authenticated_json_view_if_subdomain_is_invalid(self) -> None:
        user = self.example_user('hamlet')
        email = user.delivery_email
        self.login_user(user)

        with self.assertLogs(level="WARNING") as m, \
                mock.patch('zerver.decorator.get_subdomain', return_value=''):
            self.assert_json_error_contains(self._do_test(email),
                                            "Account is not associated with this "
                                            "subdomain")
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, "zulip", "")]
        )

        with self.assertLogs(level="WARNING") as m, \
                mock.patch('zerver.decorator.get_subdomain', return_value='acme'):
            self.assert_json_error_contains(self._do_test(email),
                                            "Account is not associated with this "
                                            "subdomain")
        self.assertEqual(
            m.output,
            ["WARNING:root:User {} ({}) attempted to access API on wrong subdomain ({})".format(email, "zulip", "acme")]
        )

    def _do_test(self, user_email: str) -> HttpResponse:
        data = {"password": initial_password(user_email)}
        return self.client_post(r'/accounts/webathena_kerberos_login/', data)

class TestZulipLoginRequiredDecorator(ZulipTestCase):
    def test_zulip_login_required_if_subdomain_is_invalid(self) -> None:
        self.login('hamlet')

        with mock.patch('zerver.decorator.get_subdomain', return_value='zulip'):
            result = self.client_get('/accounts/accept_terms/')
            self.assertEqual(result.status_code, 200)

        with mock.patch('zerver.decorator.get_subdomain', return_value=''):
            result = self.client_get('/accounts/accept_terms/')
            self.assertEqual(result.status_code, 302)

        with mock.patch('zerver.decorator.get_subdomain', return_value='acme'):
            result = self.client_get('/accounts/accept_terms/')
            self.assertEqual(result.status_code, 302)

    def test_2fa_failure(self) -> None:
        @zulip_login_required
        def test_view(request: HttpRequest) -> HttpResponse:
            return HttpResponse('Success')

        request = HttpRequest()
        request.META['SERVER_NAME'] = 'localhost'
        request.META['SERVER_PORT'] = 80
        request.META['PATH_INFO'] = ''
        request.user = hamlet = self.example_user('hamlet')
        request.user.is_verified = lambda: False
        self.login_user(hamlet)
        request.session = self.client.session
        request.get_host = lambda: 'zulip.testserver'

        response = test_view(request)
        content = getattr(response, 'content')
        self.assertEqual(content.decode(), 'Success')

        with self.settings(TWO_FACTOR_AUTHENTICATION_ENABLED=True):
            request = HttpRequest()
            request.META['SERVER_NAME'] = 'localhost'
            request.META['SERVER_PORT'] = 80
            request.META['PATH_INFO'] = ''
            request.user = hamlet = self.example_user('hamlet')
            request.user.is_verified = lambda: False
            self.login_user(hamlet)
            request.session = self.client.session
            request.get_host = lambda: 'zulip.testserver'
            self.create_default_device(request.user)

            response = test_view(request)

            status_code = getattr(response, 'status_code')
            self.assertEqual(status_code, 302)

            url = getattr(response, 'url')
            response_url = url.split("?")[0]
            self.assertEqual(response_url, settings.HOME_NOT_LOGGED_IN)

    def test_2fa_success(self) -> None:
        @zulip_login_required
        def test_view(request: HttpRequest) -> HttpResponse:
            return HttpResponse('Success')

        with self.settings(TWO_FACTOR_AUTHENTICATION_ENABLED=True):
            request = HttpRequest()
            request.META['SERVER_NAME'] = 'localhost'
            request.META['SERVER_PORT'] = 80
            request.META['PATH_INFO'] = ''
            request.user = hamlet = self.example_user('hamlet')
            request.user.is_verified = lambda: True
            self.login_user(hamlet)
            request.session = self.client.session
            request.get_host = lambda: 'zulip.testserver'
            self.create_default_device(request.user)

            response = test_view(request)
            content = getattr(response, 'content')
            self.assertEqual(content.decode(), 'Success')

class TestRequireDecorators(ZulipTestCase):
    def test_require_server_admin_decorator(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)

        result = self.client_get('/activity')
        self.assertEqual(result.status_code, 302)

        user.is_staff = True
        user.save()

        result = self.client_get('/activity')
        self.assertEqual(result.status_code, 200)

    def test_require_non_guest_user_decorator(self) -> None:
        guest_user = self.example_user('polonius')
        self.login_user(guest_user)
        result = self.common_subscribe_to_streams(guest_user, ["Denmark"], allow_fail=True)
        self.assert_json_error(result, "Not allowed for guest users")

        outgoing_webhook_bot = self.example_user('outgoing_webhook_bot')
        result = self.api_get(outgoing_webhook_bot, '/api/v1/bots')
        self.assert_json_error(result, "This endpoint does not accept bot requests.")

        guest_user = self.example_user('polonius')
        self.login_user(guest_user)
        result = self.client_get('/json/bots')
        self.assert_json_error(result, "Not allowed for guest users")


class ReturnSuccessOnHeadRequestDecorator(ZulipTestCase):
    def test_returns_200_if_request_method_is_head(self) -> None:
        class HeadRequest:
            method = 'HEAD'

        request = HeadRequest()

        @return_success_on_head_request
        def test_function(request: HttpRequest) -> HttpResponse:
            return json_response(msg='from_test_function')  # nocoverage. isn't meant to be called

        response = test_function(request)
        self.assert_json_success(response)
        self.assertNotEqual(orjson.loads(response.content).get('msg'), 'from_test_function')

    def test_returns_normal_response_if_request_method_is_not_head(self) -> None:
        class HeadRequest:
            method = 'POST'

        request = HeadRequest()

        @return_success_on_head_request
        def test_function(request: HttpRequest) -> HttpResponse:
            return json_response(msg='from_test_function')

        response = test_function(request)
        self.assertEqual(orjson.loads(response.content).get('msg'), 'from_test_function')

class RestAPITest(ZulipTestCase):
    def test_method_not_allowed(self) -> None:
        self.login('hamlet')
        result = self.client_patch('/json/users')
        self.assertEqual(result.status_code, 405)
        self.assert_in_response('Method Not Allowed', result)

    def test_options_method(self) -> None:
        self.login('hamlet')
        result = self.client_options('/json/users')
        self.assertEqual(result.status_code, 204)
        self.assertEqual(str(result['Allow']), 'GET, HEAD, POST')

        result = self.client_options('/json/streams/15')
        self.assertEqual(result.status_code, 204)
        self.assertEqual(str(result['Allow']), 'DELETE, PATCH')

    def test_http_accept_redirect(self) -> None:
        result = self.client_get('/json/users',
                                 HTTP_ACCEPT='text/html')
        self.assertEqual(result.status_code, 302)
        self.assertTrue(result["Location"].endswith("/login/?next=/json/users"))

class CacheTestCase(ZulipTestCase):
    def test_cachify_basics(self) -> None:

        @cachify
        def add(w: Any, x: Any, y: Any, z: Any) -> Any:
            return w + x + y + z

        for i in range(2):
            self.assertEqual(add(1, 2, 4, 8), 15)
            self.assertEqual(add('a', 'b', 'c', 'd'), 'abcd')

    def test_cachify_is_per_call(self) -> None:

        def test_greetings(greeting: str) -> Tuple[List[str], List[str]]:

            result_log: List[str] = []
            work_log: List[str] = []

            @cachify
            def greet(first_name: str, last_name: str) -> str:
                msg = f'{greeting} {first_name} {last_name}'
                work_log.append(msg)
                return msg

            result_log.append(greet('alice', 'smith'))
            result_log.append(greet('bob', 'barker'))
            result_log.append(greet('alice', 'smith'))
            result_log.append(greet('cal', 'johnson'))

            return (work_log, result_log)

        work_log, result_log = test_greetings('hello')
        self.assertEqual(work_log, [
            'hello alice smith',
            'hello bob barker',
            'hello cal johnson',
        ])

        self.assertEqual(result_log, [
            'hello alice smith',
            'hello bob barker',
            'hello alice smith',
            'hello cal johnson',
        ])

        work_log, result_log = test_greetings('goodbye')
        self.assertEqual(work_log, [
            'goodbye alice smith',
            'goodbye bob barker',
            'goodbye cal johnson',
        ])

        self.assertEqual(result_log, [
            'goodbye alice smith',
            'goodbye bob barker',
            'goodbye alice smith',
            'goodbye cal johnson',
        ])

class TestUserAgentParsing(ZulipTestCase):
    def test_user_agent_parsing(self) -> None:
        """Test for our user agent parsing logic, using a large data set."""
        user_agents_parsed: Dict[str, int] = defaultdict(int)
        user_agents_path = os.path.join(settings.DEPLOY_ROOT, "zerver/tests/fixtures/user_agents_unique")
        with open(user_agents_path) as f:
            for line in f:
                line = line.strip()
                match = re.match('^(?P<count>[0-9]+) "(?P<user_agent>.*)"$', line)
                assert match is not None
                groupdict = match.groupdict()
                count = groupdict["count"]
                user_agent = groupdict["user_agent"]
                ret = parse_user_agent(user_agent)
                user_agents_parsed[ret["name"]] += int(count)


class TestIgnoreUnhashableLRUCache(ZulipTestCase):
    def test_cache_hit(self) -> None:
        @ignore_unhashable_lru_cache()
        def f(arg: Any) -> Any:
            return arg

        def get_cache_info() -> Tuple[int, int, int]:
            info = getattr(f, 'cache_info')()
            hits = getattr(info, 'hits')
            misses = getattr(info, 'misses')
            currsize = getattr(info, 'currsize')
            return hits, misses, currsize

        def clear_cache() -> None:
            getattr(f, 'cache_clear')()

        # Check hashable argument.
        result = f(1)
        hits, misses, currsize = get_cache_info()
        # First one should be a miss.
        self.assertEqual(hits, 0)
        self.assertEqual(misses, 1)
        self.assertEqual(currsize, 1)
        self.assertEqual(result, 1)

        result = f(1)
        hits, misses, currsize = get_cache_info()
        # Second one should be a hit.
        self.assertEqual(hits, 1)
        self.assertEqual(misses, 1)
        self.assertEqual(currsize, 1)
        self.assertEqual(result, 1)

        # Check unhashable argument.
        result = f({1: 2})
        hits, misses, currsize = get_cache_info()
        # Cache should not be used.
        self.assertEqual(hits, 1)
        self.assertEqual(misses, 1)
        self.assertEqual(currsize, 1)
        self.assertEqual(result, {1: 2})

        # Clear cache.
        clear_cache()
        hits, misses, currsize = get_cache_info()
        self.assertEqual(hits, 0)
        self.assertEqual(misses, 0)
        self.assertEqual(currsize, 0)

    def test_cache_hit_dict_args(self) -> None:
        @ignore_unhashable_lru_cache()
        @items_tuple_to_dict
        def g(arg: Any) -> Any:
            return arg

        def get_cache_info() -> Tuple[int, int, int]:
            info = getattr(g, 'cache_info')()
            hits = getattr(info, 'hits')
            misses = getattr(info, 'misses')
            currsize = getattr(info, 'currsize')
            return hits, misses, currsize

        def clear_cache() -> None:
            getattr(g, 'cache_clear')()

        # Not used as a decorator on the definition to allow defining
        # get_cache_info and clear_cache
        f = dict_to_items_tuple(g)

        # Check hashable argument.
        result = f(1)
        hits, misses, currsize = get_cache_info()
        # First one should be a miss.
        self.assertEqual(hits, 0)
        self.assertEqual(misses, 1)
        self.assertEqual(currsize, 1)
        self.assertEqual(result, 1)

        result = f(1)
        hits, misses, currsize = get_cache_info()
        # Second one should be a hit.
        self.assertEqual(hits, 1)
        self.assertEqual(misses, 1)
        self.assertEqual(currsize, 1)
        self.assertEqual(result, 1)

        # Check dict argument.
        result = f({1: 2})
        hits, misses, currsize = get_cache_info()
        # First one is a miss
        self.assertEqual(hits, 1)
        self.assertEqual(misses, 2)
        self.assertEqual(currsize, 2)
        self.assertEqual(result, {1: 2})

        result = f({1: 2})
        hits, misses, currsize = get_cache_info()
        # Second one should be a hit.
        self.assertEqual(hits, 2)
        self.assertEqual(misses, 2)
        self.assertEqual(currsize, 2)
        self.assertEqual(result, {1: 2})

        # Clear cache.
        clear_cache()
        hits, misses, currsize = get_cache_info()
        self.assertEqual(hits, 0)
        self.assertEqual(misses, 0)
        self.assertEqual(currsize, 0)
