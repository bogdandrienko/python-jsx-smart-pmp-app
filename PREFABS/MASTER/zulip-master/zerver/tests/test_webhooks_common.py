from types import SimpleNamespace
from typing import Dict
from unittest.mock import MagicMock, patch

from django.http import HttpRequest

from zerver.decorator import webhook_view
from zerver.lib.exceptions import InvalidJSONError, JsonableError
from zerver.lib.send_email import FromAddress
from zerver.lib.test_classes import WebhookTestCase, ZulipTestCase
from zerver.lib.test_helpers import HostRequestMock
from zerver.lib.users import get_api_key
from zerver.lib.webhooks.common import (
    INVALID_JSON_MESSAGE,
    MISSING_EVENT_HEADER_MESSAGE,
    MissingHTTPEventHeader,
    get_fixture_http_headers,
    standardize_headers,
    validate_extract_webhook_http_header,
)
from zerver.models import UserProfile, get_realm, get_user


class WebhooksCommonTestCase(ZulipTestCase):
    def test_webhook_http_header_header_exists(self) -> None:
        webhook_bot = get_user('webhook-bot@zulip.com', get_realm('zulip'))
        request = HostRequestMock()
        request.META['HTTP_X_CUSTOM_HEADER'] = 'custom_value'
        request.user = webhook_bot

        header_value = validate_extract_webhook_http_header(request, 'X_CUSTOM_HEADER',
                                                            'test_webhook')

        self.assertEqual(header_value, 'custom_value')

    def test_webhook_http_header_header_does_not_exist(self) -> None:
        webhook_bot = get_user('webhook-bot@zulip.com', get_realm('zulip'))
        webhook_bot.last_reminder = None
        notification_bot = self.notification_bot()
        request = HostRequestMock()
        request.user = webhook_bot
        request.path = 'some/random/path'

        exception_msg = "Missing the HTTP event header 'X_CUSTOM_HEADER'"
        with self.assertRaisesRegex(MissingHTTPEventHeader, exception_msg):
            validate_extract_webhook_http_header(request, 'X_CUSTOM_HEADER',
                                                 'test_webhook')

        msg = self.get_last_message()
        expected_message = MISSING_EVENT_HEADER_MESSAGE.format(
            bot_name=webhook_bot.full_name,
            request_path=request.path,
            header_name='X_CUSTOM_HEADER',
            integration_name='test_webhook',
            support_email=FromAddress.SUPPORT,
        ).rstrip()
        self.assertEqual(msg.sender.email, notification_bot.email)
        self.assertEqual(msg.content, expected_message)

    def test_notify_bot_owner_on_invalid_json(self) -> None:
        @webhook_view('ClientName', notify_bot_owner_on_invalid_json=False)
        def my_webhook_no_notify(request: HttpRequest, user_profile: UserProfile) -> None:
            raise InvalidJSONError("Malformed JSON")

        @webhook_view('ClientName', notify_bot_owner_on_invalid_json=True)
        def my_webhook_notify(request: HttpRequest, user_profile: UserProfile) -> None:
            raise InvalidJSONError("Malformed JSON")

        webhook_bot_email = 'webhook-bot@zulip.com'
        webhook_bot_realm = get_realm('zulip')
        webhook_bot = get_user(webhook_bot_email, webhook_bot_realm)
        webhook_bot_api_key = get_api_key(webhook_bot)
        request = HostRequestMock()
        request.POST['api_key'] = webhook_bot_api_key
        request.host = "zulip.testserver"
        expected_msg = INVALID_JSON_MESSAGE.format(webhook_name='ClientName')

        last_message_id = self.get_last_message().id
        with self.assertRaisesRegex(JsonableError, "Malformed JSON"):
            my_webhook_no_notify(request)

        # First verify that without the setting, it doesn't send a PM to bot owner.
        msg = self.get_last_message()
        self.assertEqual(msg.id, last_message_id)
        self.assertNotEqual(msg.content, expected_msg.strip())

        # Then verify that with the setting, it does send such a message.
        with self.assertRaisesRegex(JsonableError, "Malformed JSON"):
            my_webhook_notify(request)
        msg = self.get_last_message()
        self.assertNotEqual(msg.id, last_message_id)
        self.assertEqual(msg.sender.email, self.notification_bot().email)
        self.assertEqual(msg.content, expected_msg.strip())

    @patch("zerver.lib.webhooks.common.importlib.import_module")
    def test_get_fixture_http_headers_for_success(self, import_module_mock: MagicMock) -> None:
        def fixture_to_headers(fixture_name: str) -> Dict[str, str]:
            # A sample function which would normally perform some
            # extra operations before returning a dictionary
            # corresponding to the fixture name passed. For this test,
            # we just return a fixed dictionary.
            return {"key": "value"}

        fake_module = SimpleNamespace(fixture_to_headers=fixture_to_headers)
        import_module_mock.return_value = fake_module

        headers = get_fixture_http_headers("some_integration", "complex_fixture")
        self.assertEqual(headers, {"key": "value"})

    def test_get_fixture_http_headers_for_non_existant_integration(self) -> None:
        headers = get_fixture_http_headers("some_random_nonexistant_integration", "fixture_name")
        self.assertEqual(headers, {})

    @patch("zerver.lib.webhooks.common.importlib.import_module")
    def test_get_fixture_http_headers_with_no_fixtures_to_headers_function(
        self,
        import_module_mock: MagicMock,
    ) -> None:

        fake_module = SimpleNamespace()
        import_module_mock.return_value = fake_module

        self.assertEqual(
            get_fixture_http_headers("some_integration", "simple_fixture"),
            {},
        )

    def test_standardize_headers(self) -> None:
        self.assertEqual(standardize_headers({}), {})

        raw_headers = {"Content-Type": "text/plain", "X-Event-Type": "ping"}
        djangoified_headers = standardize_headers(raw_headers)
        expected_djangoified_headers = {"CONTENT_TYPE": "text/plain", "HTTP_X_EVENT_TYPE": "ping"}
        self.assertEqual(djangoified_headers, expected_djangoified_headers)

class MissingEventHeaderTestCase(WebhookTestCase):
    STREAM_NAME = 'groove'
    URL_TEMPLATE = '/api/v1/external/groove?stream={stream}&api_key={api_key}'

    # This tests the validate_extract_webhook_http_header function with
    # an actual webhook, instead of just making a mock
    def test_missing_event_header(self) -> None:
        self.subscribe(self.test_user, self.STREAM_NAME)
        result = self.client_post(self.url, self.get_body('ticket_state_changed'),
                                  content_type="application/x-www-form-urlencoded")
        self.assert_json_error(result, "Missing the HTTP event header 'X_GROOVE_EVENT'")

        webhook_bot = get_user('webhook-bot@zulip.com', get_realm('zulip'))
        webhook_bot.last_reminder = None
        notification_bot = self.notification_bot()
        msg = self.get_last_message()
        expected_message = MISSING_EVENT_HEADER_MESSAGE.format(
            bot_name=webhook_bot.full_name,
            request_path='/api/v1/external/groove',
            header_name='X_GROOVE_EVENT',
            integration_name='Groove',
            support_email=FromAddress.SUPPORT,
        ).rstrip()
        if msg.sender.email != notification_bot.email:  # nocoverage
            # This block seems to fire occasionally; debug output:
            print(msg)
            print(msg.content)
        self.assertEqual(msg.sender.email, notification_bot.email)
        self.assertEqual(msg.content, expected_message)

    def get_body(self, fixture_name: str) -> str:
        return self.webhook_fixture_data("groove", fixture_name, file_type="json")
