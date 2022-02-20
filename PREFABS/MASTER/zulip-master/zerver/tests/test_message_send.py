import datetime
from typing import Any, Optional, Set
from unittest import mock

import orjson
import pytz
from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse
from django.test import override_settings
from django.utils.timezone import now as timezone_now

from zerver.decorator import JsonableError
from zerver.lib.actions import (
    build_message_send_dict,
    check_message,
    check_send_stream_message,
    do_change_can_forge_sender,
    do_change_stream_post_policy,
    do_create_user,
    do_deactivate_user,
    do_send_messages,
    do_set_realm_property,
    extract_private_recipients,
    extract_stream_indicator,
    internal_prep_private_message,
    internal_prep_stream_message_by_name,
    internal_send_huddle_message,
    internal_send_private_message,
    internal_send_stream_message,
    internal_send_stream_message_by_name,
    send_rate_limited_pm_notification_to_bot_owner,
)
from zerver.lib.addressee import Addressee
from zerver.lib.cache import cache_delete, get_stream_cache_key
from zerver.lib.message import MessageDict, get_raw_unread_data, get_recent_private_conversations
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import (
    get_user_messages,
    make_client,
    message_stream_count,
    most_recent_message,
    most_recent_usermessage,
    queries_captured,
    reset_emails_in_zulip_realm,
)
from zerver.lib.timestamp import convert_to_UTC, datetime_to_timestamp
from zerver.models import (
    MAX_MESSAGE_LENGTH,
    MAX_TOPIC_NAME_LENGTH,
    Message,
    Realm,
    RealmDomain,
    Recipient,
    ScheduledMessage,
    Stream,
    Subscription,
    UserMessage,
    UserProfile,
    flush_per_request_caches,
    get_huddle_recipient,
    get_realm,
    get_stream,
    get_system_bot,
    get_user,
)
from zerver.views.message_send import InvalidMirrorInput


class MessagePOSTTest(ZulipTestCase):

    def _send_and_verify_message(self, user: UserProfile, stream_name: str, error_msg: Optional[str]=None) -> None:
        if error_msg is None:
            msg_id = self.send_stream_message(user, stream_name)
            result = self.api_get(user, '/json/messages/' + str(msg_id))
            self.assert_json_success(result)
        else:
            with self.assertRaisesRegex(JsonableError, error_msg):
                self.send_stream_message(user, stream_name)

    def test_message_to_stream_by_name(self) -> None:
        """
        Sending a message to a stream to which you are subscribed is
        successful.
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic"})
        self.assert_json_success(result)

    def test_api_message_to_stream_by_name(self) -> None:
        """
        Same as above, but for the API view
        """
        user = self.example_user('hamlet')
        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "to": "Verona",
                                                          "client": "test suite",
                                                          "content": "Test message",
                                                          "topic": "Test topic"})
        self.assert_json_success(result)

    def test_message_to_stream_with_nonexistent_id(self) -> None:
        cordelia = self.example_user('cordelia')
        bot = self.create_test_bot(
            short_name='whatever',
            user_profile=cordelia,
        )
        result = self.api_post(
            bot, "/api/v1/messages",
            {
                "type": "stream",
                "to": orjson.dumps([99999]).decode(),
                "client": "test suite",
                "content": "Stream message by ID.",
                "topic": "Test topic for stream ID message",
            },
        )
        self.assert_json_error(result, "Stream with ID '99999' does not exist")

        msg = self.get_last_message()
        expected = ("Your bot `whatever-bot@zulip.testserver` tried to send a message to "
                    "stream ID 99999, but there is no stream with that ID.")
        self.assertEqual(msg.content, expected)

    def test_message_to_stream_by_id(self) -> None:
        """
        Sending a message to a stream (by stream ID) to which you are
        subscribed is successful.
        """
        self.login('hamlet')
        realm = get_realm('zulip')
        stream = get_stream('Verona', realm)
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": orjson.dumps([stream.id]).decode(),
                                                     "client": "test suite",
                                                     "content": "Stream message by ID.",
                                                     "topic": "Test topic for stream ID message"})
        self.assert_json_success(result)
        sent_message = self.get_last_message()
        self.assertEqual(sent_message.content, "Stream message by ID.")

    def test_sending_message_as_stream_post_policy_admins(self) -> None:
        """
        Sending messages to streams which only the admins can create and post to.
        """
        admin_profile = self.example_user("iago")
        self.login_user(admin_profile)

        stream_name = "Verona"
        stream = get_stream(stream_name, admin_profile.realm)
        do_change_stream_post_policy(stream, Stream.STREAM_POST_POLICY_ADMINS)

        # Admins and their owned bots can send to STREAM_POST_POLICY_ADMINS streams
        self._send_and_verify_message(admin_profile, stream_name)
        admin_owned_bot = self.create_test_bot(
            short_name='whatever1',
            full_name='whatever1',
            user_profile=admin_profile,
        )
        self._send_and_verify_message(admin_owned_bot, stream_name)

        non_admin_profile = self.example_user("hamlet")
        self.login_user(non_admin_profile)

        # Non admins and their owned bots cannot send to STREAM_POST_POLICY_ADMINS streams
        self._send_and_verify_message(non_admin_profile, stream_name,
                                      "Only organization administrators can send to this stream.")
        non_admin_owned_bot = self.create_test_bot(
            short_name='whatever2',
            full_name='whatever2',
            user_profile=non_admin_profile,
        )
        self._send_and_verify_message(non_admin_owned_bot, stream_name,
                                      "Only organization administrators can send to this stream.")

        # Bots without owner (except cross realm bot) cannot send to announcement only streams
        bot_without_owner = do_create_user(
            email='free-bot@zulip.testserver',
            password='',
            realm=non_admin_profile.realm,
            full_name='freebot',
            bot_type=UserProfile.DEFAULT_BOT,
        )
        self._send_and_verify_message(bot_without_owner, stream_name,
                                      "Only organization administrators can send to this stream.")

        # Cross realm bots should be allowed
        notification_bot = get_system_bot("notification-bot@zulip.com")
        internal_send_stream_message(stream.realm, notification_bot, stream,
                                     'Test topic', 'Test message by notification bot')
        self.assertEqual(self.get_last_message().content, 'Test message by notification bot')

        guest_profile = self.example_user("polonius")
        # Guests cannot send to non-STREAM_POST_POLICY_EVERYONE streams
        self._send_and_verify_message(guest_profile, stream_name, "Only organization administrators can send to this stream.")

    def test_sending_message_as_stream_post_policy_restrict_new_members(self) -> None:
        """
        Sending messages to streams which new members cannot create and post to.
        """
        admin_profile = self.example_user("iago")
        self.login_user(admin_profile)

        do_set_realm_property(admin_profile.realm, 'waiting_period_threshold', 10)
        admin_profile.date_joined = timezone_now() - datetime.timedelta(days=9)
        admin_profile.save()
        self.assertTrue(admin_profile.is_new_member)
        self.assertTrue(admin_profile.is_realm_admin)

        stream_name = "Verona"
        stream = get_stream(stream_name, admin_profile.realm)
        do_change_stream_post_policy(stream, Stream.STREAM_POST_POLICY_RESTRICT_NEW_MEMBERS)

        # Admins and their owned bots can send to STREAM_POST_POLICY_RESTRICT_NEW_MEMBERS streams,
        # even if the admin is a new user
        self._send_and_verify_message(admin_profile, stream_name)
        admin_owned_bot = self.create_test_bot(
            short_name='whatever1',
            full_name='whatever1',
            user_profile=admin_profile,
        )
        self._send_and_verify_message(admin_owned_bot, stream_name)

        non_admin_profile = self.example_user("hamlet")
        self.login_user(non_admin_profile)

        non_admin_profile.date_joined = timezone_now() - datetime.timedelta(days=9)
        non_admin_profile.save()
        self.assertTrue(non_admin_profile.is_new_member)
        self.assertFalse(non_admin_profile.is_realm_admin)

        # Non admins and their owned bots can send to STREAM_POST_POLICY_RESTRICT_NEW_MEMBERS streams,
        # if the user is not a new member
        self._send_and_verify_message(non_admin_profile, stream_name,
                                      "New members cannot send to this stream.")
        non_admin_owned_bot = self.create_test_bot(
            short_name='whatever2',
            full_name='whatever2',
            user_profile=non_admin_profile,
        )
        self._send_and_verify_message(non_admin_owned_bot, stream_name,
                                      "New members cannot send to this stream.")

        # Bots without owner (except cross realm bot) cannot send to announcement only stream
        bot_without_owner = do_create_user(
            email='free-bot@zulip.testserver',
            password='',
            realm=non_admin_profile.realm,
            full_name='freebot',
            bot_type=UserProfile.DEFAULT_BOT,
        )
        self._send_and_verify_message(bot_without_owner, stream_name,
                                      "New members cannot send to this stream.")

        # Cross realm bots should be allowed
        notification_bot = get_system_bot("notification-bot@zulip.com")
        internal_send_stream_message(stream.realm, notification_bot, stream,
                                     'Test topic', 'Test message by notification bot')
        self.assertEqual(self.get_last_message().content, 'Test message by notification bot')

        guest_profile = self.example_user("polonius")
        # Guests cannot send to non-STREAM_POST_POLICY_EVERYONE streams
        self._send_and_verify_message(guest_profile, stream_name, "Guests cannot send to this stream.")

    def test_api_message_with_default_to(self) -> None:
        """
        Sending messages without a to field should be sent to the default
        stream for the user_profile.
        """
        user = self.example_user('hamlet')
        user.default_sending_stream_id = get_stream('Verona', user.realm).id
        user.save()
        # The `to` field is required according to OpenAPI specification
        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "client": "test suite",
                                                          "content": "Test message no to",
                                                          "topic": "Test topic"},
                               intentionally_undocumented=True)
        self.assert_json_success(result)

        sent_message = self.get_last_message()
        self.assertEqual(sent_message.content, "Test message no to")

    def test_message_to_nonexistent_stream(self) -> None:
        """
        Sending a message to a nonexistent stream fails.
        """
        self.login('hamlet')
        self.assertFalse(Stream.objects.filter(name="nonexistent_stream"))
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "nonexistent_stream",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic"})
        self.assert_json_error(result, "Stream 'nonexistent_stream' does not exist")

    def test_message_to_nonexistent_stream_with_bad_characters(self) -> None:
        """
        Nonexistent stream name with bad characters should be escaped properly.
        """
        self.login('hamlet')
        self.assertFalse(Stream.objects.filter(name="""&<"'><non-existent>"""))
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": """&<"'><non-existent>""",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic"})
        self.assert_json_error(result, "Stream '&amp;&lt;&quot;&#x27;&gt;&lt;non-existent&gt;' does not exist")

    def test_personal_message(self) -> None:
        """
        Sending a personal message to a valid username is successful.
        """
        user_profile = self.example_user("hamlet")
        self.login_user(user_profile)
        othello = self.example_user('othello')
        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": othello.email})
        self.assert_json_success(result)
        message_id = orjson.loads(result.content)['id']

        recent_conversations = get_recent_private_conversations(user_profile)
        self.assertEqual(len(recent_conversations), 1)
        recent_conversation = list(recent_conversations.values())[0]
        recipient_id = list(recent_conversations.keys())[0]
        self.assertEqual(set(recent_conversation['user_ids']), {othello.id})
        self.assertEqual(recent_conversation['max_message_id'], message_id)

        # Now send a message to yourself and see how that interacts with the data structure
        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": user_profile.email})
        self.assert_json_success(result)
        self_message_id = orjson.loads(result.content)['id']

        recent_conversations = get_recent_private_conversations(user_profile)
        self.assertEqual(len(recent_conversations), 2)
        recent_conversation = recent_conversations[recipient_id]
        self.assertEqual(set(recent_conversation['user_ids']), {othello.id})
        self.assertEqual(recent_conversation['max_message_id'], message_id)

        # Now verify we have the appropriate self-pm data structure
        del recent_conversations[recipient_id]
        recent_conversation = list(recent_conversations.values())[0]
        recipient_id = list(recent_conversations.keys())[0]
        self.assertEqual(set(recent_conversation['user_ids']), set())
        self.assertEqual(recent_conversation['max_message_id'], self_message_id)

    def test_personal_message_by_id(self) -> None:
        """
        Sending a personal message to a valid user ID is successful.
        """
        self.login('hamlet')
        result = self.client_post(
            "/json/messages",
            {
                "type": "private",
                "content": "Test message",
                "client": "test suite",
                "to": orjson.dumps([self.example_user("othello").id]).decode(),
            },
        )
        self.assert_json_success(result)

        msg = self.get_last_message()
        self.assertEqual("Test message", msg.content)
        self.assertEqual(msg.recipient_id, self.example_user("othello").recipient_id)

    def test_group_personal_message_by_id(self) -> None:
        """
        Sending a personal message to a valid user ID is successful.
        """
        self.login('hamlet')
        result = self.client_post(
            "/json/messages",
            {
                "type": "private",
                "content": "Test message",
                "client": "test suite",
                "to": orjson.dumps([self.example_user("othello").id,
                                    self.example_user("cordelia").id]).decode(),
            },
        )
        self.assert_json_success(result)

        msg = self.get_last_message()
        self.assertEqual("Test message", msg.content)
        self.assertEqual(msg.recipient_id, get_huddle_recipient(
            {self.example_user("hamlet").id,
             self.example_user("othello").id,
             self.example_user("cordelia").id}).id,
        )

    def test_personal_message_copying_self(self) -> None:
        """
        Sending a personal message to yourself plus another user is successful,
        and counts as a message just to that user.
        """
        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        self.login_user(hamlet)
        result = self.client_post("/json/messages", {
            "type": "private",
            "content": "Test message",
            "client": "test suite",
            "to": orjson.dumps([hamlet.id, othello.id]).decode()})
        self.assert_json_success(result)
        msg = self.get_last_message()
        # Verify that we're not actually on the "recipient list"
        self.assertNotIn("Hamlet", str(msg.recipient))

    def test_personal_message_to_nonexistent_user(self) -> None:
        """
        Sending a personal message to an invalid email returns error JSON.
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": "nonexistent"})
        self.assert_json_error(result, "Invalid email 'nonexistent'")

    def test_personal_message_to_deactivated_user(self) -> None:
        """
        Sending a personal message to a deactivated user returns error JSON.
        """
        othello = self.example_user('othello')
        cordelia = self.example_user('cordelia')
        do_deactivate_user(othello)
        self.login('hamlet')

        result = self.client_post("/json/messages", {
            "type": "private",
            "content": "Test message",
            "client": "test suite",
            "to": orjson.dumps([othello.id]).decode()})
        self.assert_json_error(result, f"'{othello.email}' is no longer using Zulip.")

        result = self.client_post("/json/messages", {
            "type": "private",
            "content": "Test message",
            "client": "test suite",
            "to": orjson.dumps([othello.id, cordelia.id]).decode()})
        self.assert_json_error(result, f"'{othello.email}' is no longer using Zulip.")

    def test_invalid_type(self) -> None:
        """
        Sending a message of unknown type returns error JSON.
        """
        self.login('hamlet')
        othello = self.example_user('othello')
        result = self.client_post("/json/messages", {"type": "invalid type",
                                                     "content": "Test message",
                                                     "client": "test suite",
                                                     "to": othello.email})
        self.assert_json_error(result, "Invalid message type")

    def test_empty_message(self) -> None:
        """
        Sending a message that is empty or only whitespace should fail
        """
        self.login('hamlet')
        othello = self.example_user('othello')
        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": " ",
                                                     "client": "test suite",
                                                     "to": othello.email})
        self.assert_json_error(result, "Message must not be empty")

    def test_empty_string_topic(self) -> None:
        """
        Sending a message that has empty string topic should fail
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": ""})
        self.assert_json_error(result, "Topic can't be empty")

    def test_missing_topic(self) -> None:
        """
        Sending a message without topic should fail
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message"})
        self.assert_json_error(result, "Missing topic")

    def test_invalid_message_type(self) -> None:
        """
        Messages other than the type of "private" or "stream" are considered as invalid
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "invalid",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic"})
        self.assert_json_error(result, "Invalid message type")

    def test_private_message_without_recipients(self) -> None:
        """
        Sending private message without recipients should fail
        """
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "private",
                                                     "content": "Test content",
                                                     "client": "test suite",
                                                     "to": ""})
        self.assert_json_error(result, "Message must have recipients")

    def test_mirrored_huddle(self) -> None:
        """
        Sending a mirrored huddle message works
        """
        result = self.api_post(self.mit_user("starnine"),
                               "/json/messages", {"type": "private",
                                                  "sender": self.mit_email("sipbtest"),
                                                  "content": "Test message",
                                                  "client": "zephyr_mirror",
                                                  "to": orjson.dumps([self.mit_email("starnine"),
                                                                      self.mit_email("espuser")]).decode()},
                               subdomain="zephyr")
        self.assert_json_success(result)

    def test_mirrored_personal(self) -> None:
        """
        Sending a mirrored personal message works
        """
        result = self.api_post(self.mit_user("starnine"),
                               "/json/messages", {"type": "private",
                                                  "sender": self.mit_email("sipbtest"),
                                                  "content": "Test message",
                                                  "client": "zephyr_mirror",
                                                  "to": self.mit_email("starnine")},
                               subdomain="zephyr")
        self.assert_json_success(result)

    def test_mirrored_personal_browser(self) -> None:
        """
        Sending a mirrored personal message via the browser should not work.
        """
        user = self.mit_user('starnine')
        self.login_user(user)
        result = self.client_post("/json/messages",
                                  {"type": "private",
                                   "sender": self.mit_email("sipbtest"),
                                   "content": "Test message",
                                   "client": "zephyr_mirror",
                                   "to": self.mit_email("starnine")},
                                  subdomain="zephyr")
        self.assert_json_error(result, "Invalid mirrored message")

    def test_mirrored_personal_to_someone_else(self) -> None:
        """
        Sending a mirrored personal message to someone else is not allowed.
        """
        result = self.api_post(self.mit_user("starnine"), "/api/v1/messages",
                               {"type": "private",
                                "sender": self.mit_email("sipbtest"),
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": self.mit_email("espuser")},
                               subdomain="zephyr")
        self.assert_json_error(result, "User not authorized for this query")

    def test_duplicated_mirrored_huddle(self) -> None:
        """
        Sending two mirrored huddles in the row return the same ID
        """
        msg = {"type": "private",
               "sender": self.mit_email("sipbtest"),
               "content": "Test message",
               "client": "zephyr_mirror",
               "to": orjson.dumps([self.mit_email("espuser"),
                                   self.mit_email("starnine")]).decode()}

        with mock.patch('DNS.dnslookup', return_value=[['starnine:*:84233:101:Athena Consulting Exchange User,,,:/mit/starnine:/bin/bash']]):
            result1 = self.api_post(self.mit_user("starnine"), "/api/v1/messages", msg,
                                    subdomain="zephyr")
            self.assert_json_success(result1)

        with mock.patch('DNS.dnslookup', return_value=[['espuser:*:95494:101:Esp Classroom,,,:/mit/espuser:/bin/athena/bash']]):
            result2 = self.api_post(self.mit_user("espuser"), "/api/v1/messages", msg,
                                    subdomain="zephyr")
            self.assert_json_success(result2)

        self.assertEqual(orjson.loads(result1.content)['id'],
                         orjson.loads(result2.content)['id'])

    def test_message_with_null_bytes(self) -> None:
        """
        A message with null bytes in it is handled.
        """
        self.login('hamlet')
        post_data = {"type": "stream", "to": "Verona", "client": "test suite",
                     "content": "  I like null bytes \x00 in my content", "topic": "Test topic"}
        result = self.client_post("/json/messages", post_data)
        self.assert_json_error(result, "Message must not contain null bytes")

    def test_strip_message(self) -> None:
        """
        A message with mixed whitespace at the end is cleaned up.
        """
        self.login('hamlet')
        post_data = {"type": "stream", "to": "Verona", "client": "test suite",
                     "content": "  I like whitespace at the end! \n\n \n", "topic": "Test topic"}
        result = self.client_post("/json/messages", post_data)
        self.assert_json_success(result)
        sent_message = self.get_last_message()
        self.assertEqual(sent_message.content, "  I like whitespace at the end!")

    def test_long_message(self) -> None:
        """
        Sending a message longer than the maximum message length succeeds but is
        truncated.
        """
        self.login('hamlet')
        long_message = "A" * (MAX_MESSAGE_LENGTH + 1)
        post_data = {"type": "stream", "to": "Verona", "client": "test suite",
                     "content": long_message, "topic": "Test topic"}
        result = self.client_post("/json/messages", post_data)
        self.assert_json_success(result)

        sent_message = self.get_last_message()
        self.assertEqual(sent_message.content,
                         "A" * (MAX_MESSAGE_LENGTH - 20) + "\n[message truncated]")

    def test_long_topic(self) -> None:
        """
        Sending a message with a topic longer than the maximum topic length
        succeeds, but the topic is truncated.
        """
        self.login('hamlet')
        long_topic = "A" * (MAX_TOPIC_NAME_LENGTH + 1)
        post_data = {"type": "stream", "to": "Verona", "client": "test suite",
                     "content": "test content", "topic": long_topic}
        result = self.client_post("/json/messages", post_data)
        self.assert_json_success(result)

        sent_message = self.get_last_message()
        self.assertEqual(sent_message.topic_name(),
                         "A" * (MAX_TOPIC_NAME_LENGTH - 3) + "...")

    def test_send_forged_message_as_not_superuser(self) -> None:
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic",
                                                     "forged": "true"})
        self.assert_json_error(result, "User not authorized for this query")

    def test_send_message_as_not_superuser_to_different_domain(self) -> None:
        self.login('hamlet')
        result = self.client_post("/json/messages", {"type": "stream",
                                                     "to": "Verona",
                                                     "client": "test suite",
                                                     "content": "Test message",
                                                     "topic": "Test topic",
                                                     "realm_str": "mit"})
        self.assert_json_error(result, "User not authorized for this query")

    def test_send_message_as_superuser_to_domain_that_dont_exist(self) -> None:
        user = self.example_user("default_bot")
        password = "test_password"
        user.set_password(password)
        user.can_forge_sender = True
        user.save()
        result = self.api_post(user,
                               "/api/v1/messages", {"type": "stream",
                                                    "to": "Verona",
                                                    "client": "test suite",
                                                    "content": "Test message",
                                                    "topic": "Test topic",
                                                    "realm_str": "non-existing"})
        user.can_forge_sender = False
        user.save()
        self.assert_json_error(result, "Unknown organization 'non-existing'")

    def test_send_message_when_sender_is_not_set(self) -> None:
        result = self.api_post(self.mit_user("starnine"), "/api/v1/messages",
                               {"type": "private",
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": self.mit_email("starnine")},
                               subdomain="zephyr")
        self.assert_json_error(result, "Missing sender")

    def test_send_message_as_not_superuser_when_type_is_not_private(self) -> None:
        result = self.api_post(self.mit_user("starnine"), "/api/v1/messages",
                               {"type": "not-private",
                                "sender": self.mit_email("sipbtest"),
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": self.mit_email("starnine")},
                               subdomain="zephyr")
        self.assert_json_error(result, "User not authorized for this query")

    @mock.patch("zerver.views.message_send.create_mirrored_message_users")
    def test_send_message_create_mirrored_message_user_returns_invalid_input(
            self, create_mirrored_message_users_mock: Any) -> None:
        create_mirrored_message_users_mock.side_effect = InvalidMirrorInput()
        result = self.api_post(self.mit_user("starnine"), "/api/v1/messages",
                               {"type": "private",
                                "sender": self.mit_email("sipbtest"),
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": self.mit_email("starnine")},
                               subdomain="zephyr")
        self.assert_json_error(result, "Invalid mirrored message")

    @mock.patch("zerver.views.message_send.create_mirrored_message_users")
    def test_send_message_when_client_is_zephyr_mirror_but_string_id_is_not_zephyr(
            self, create_mirrored_message_users_mock: Any) -> None:
        create_mirrored_message_users_mock.return_value = mock.Mock()
        user = self.mit_user("starnine")
        user.realm.string_id = 'notzephyr'
        user.realm.save()
        result = self.api_post(user, "/api/v1/messages",
                               {"type": "private",
                                "sender": self.mit_email("sipbtest"),
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": user.email},
                               subdomain="notzephyr")
        self.assert_json_error(result, "Zephyr mirroring is not allowed in this organization")

    @mock.patch("zerver.views.message_send.create_mirrored_message_users")
    def test_send_message_when_client_is_zephyr_mirror_but_recipient_is_user_id(
            self, create_mirrored_message_users_mock: Any) -> None:
        create_mirrored_message_users_mock.return_value = mock.Mock()
        user = self.mit_user("starnine")
        self.login_user(user)
        result = self.api_post(user, "/api/v1/messages",
                               {"type": "private",
                                "sender": self.mit_email("sipbtest"),
                                "content": "Test message",
                                "client": "zephyr_mirror",
                                "to": orjson.dumps([user.id]).decode()},
                               subdomain="zephyr")
        self.assert_json_error(result, "Mirroring not allowed with recipient user IDs")

    def test_send_message_irc_mirror(self) -> None:
        reset_emails_in_zulip_realm()
        self.login('hamlet')
        bot_info = {
            'full_name': 'IRC bot',
            'short_name': 'irc',
        }
        result = self.client_post("/json/bots", bot_info)
        self.assert_json_success(result)

        email = "irc-bot@zulip.testserver"
        user = get_user(email, get_realm('zulip'))
        user.can_forge_sender = True
        user.save()
        user = get_user(email, get_realm('zulip'))
        self.subscribe(user, "IRCland")

        # Simulate a mirrored message with a slightly old timestamp.
        fake_date_sent = timezone_now() - datetime.timedelta(minutes=37)
        fake_timestamp = datetime_to_timestamp(fake_date_sent)

        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "forged": "true",
                                                          "time": fake_timestamp,
                                                          "sender": "irc-user@irc.zulip.com",
                                                          "content": "Test message",
                                                          "client": "irc_mirror",
                                                          "topic": "from irc",
                                                          "to": "IRCLand"})
        self.assert_json_success(result)

        msg = self.get_last_message()
        self.assertEqual(int(datetime_to_timestamp(msg.date_sent)), int(fake_timestamp))

        # Now test again using forged=yes
        fake_date_sent = timezone_now() - datetime.timedelta(minutes=22)
        fake_timestamp = datetime_to_timestamp(fake_date_sent)

        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "forged": "yes",
                                                          "time": fake_timestamp,
                                                          "sender": "irc-user@irc.zulip.com",
                                                          "content": "Test message",
                                                          "client": "irc_mirror",
                                                          "topic": "from irc",
                                                          "to": "IRCLand"})
        self.assert_json_success(result)

        msg = self.get_last_message()
        self.assertEqual(int(datetime_to_timestamp(msg.date_sent)), int(fake_timestamp))

    def test_unsubscribed_can_forge_sender(self) -> None:
        reset_emails_in_zulip_realm()

        cordelia = self.example_user('cordelia')
        stream_name = 'private_stream'
        self.make_stream(stream_name, invite_only=True)

        self.unsubscribe(cordelia, stream_name)

        # As long as Cordelia cam_forge_sender, she can send messages
        # to ANY stream, even one she is not unsubscribed to, and
        # she can do it for herself or on behalf of a mirrored user.

        def test_with(sender_email: str, client: str, forged: bool) -> None:
            payload = dict(
                type="stream",
                to=stream_name,
                client=client,
                topic='whatever',
                content='whatever',
                forged=orjson.dumps(forged).decode(),
            )

            # Only pass the 'sender' property when doing mirroring behavior.
            if forged:
                payload['sender'] = sender_email

            cordelia.can_forge_sender = False
            cordelia.save()

            result = self.api_post(cordelia, "/api/v1/messages", payload)
            self.assert_json_error_contains(result, 'authorized')

            cordelia.can_forge_sender = True
            cordelia.save()

            result = self.api_post(cordelia, "/api/v1/messages", payload)
            self.assert_json_success(result)

        test_with(
            sender_email=cordelia.email,
            client='test suite',
            forged=False,
        )

        test_with(
            sender_email='irc_person@zulip.com',
            client='irc_mirror',
            forged=True,
        )

    def test_bot_can_send_to_owner_stream(self) -> None:
        cordelia = self.example_user('cordelia')
        bot = self.create_test_bot(
            short_name='whatever',
            user_profile=cordelia,
        )

        stream_name = 'private_stream'
        self.make_stream(stream_name, invite_only=True)

        payload = dict(
            type="stream",
            to=stream_name,
            client='test suite',
            topic='whatever',
            content='whatever',
        )

        result = self.api_post(bot, "/api/v1/messages", payload)
        self.assert_json_error_contains(result, 'Not authorized to send')

        # We subscribe the bot owner! (aka cordelia)
        assert bot.bot_owner is not None
        self.subscribe(bot.bot_owner, stream_name)

        result = self.api_post(bot, "/api/v1/messages", payload)
        self.assert_json_success(result)

    def test_cross_realm_bots_can_use_api_on_own_subdomain(self) -> None:
        # Cross realm bots should use internal_send_*_message, not the API:
        notification_bot = self.notification_bot()
        stream = self.make_stream("notify_channel", get_realm("zulipinternal"))

        result = self.api_post(notification_bot,
                               "/api/v1/messages",
                               {"type": "stream",
                                "to": "notify_channel",
                                "client": "test suite",
                                "content": "Test message",
                                "topic": "Test topic"},
                               subdomain='zulipinternal')

        self.assert_json_success(result)
        message = self.get_last_message()

        self.assertEqual(message.content, "Test message")
        self.assertEqual(message.sender, notification_bot)
        self.assertEqual(message.recipient.type_id, stream.id)

    def test_guest_user(self) -> None:
        sender = self.example_user('polonius')

        stream_name = 'public stream'
        self.make_stream(stream_name, invite_only=False)
        payload = dict(
            type="stream",
            to=stream_name,
            client='test suite',
            topic='whatever',
            content='whatever',
        )

        # Guest user can't send message to unsubscribed public streams
        result = self.api_post(sender, "/api/v1/messages", payload)
        self.assert_json_error(result, "Not authorized to send to stream 'public stream'")

        self.subscribe(sender, stream_name)
        # Guest user can send message to subscribed public streams
        result = self.api_post(sender, "/api/v1/messages", payload)
        self.assert_json_success(result)

class ScheduledMessageTest(ZulipTestCase):

    def last_scheduled_message(self) -> ScheduledMessage:
        return ScheduledMessage.objects.all().order_by('-id')[0]

    def do_schedule_message(self, msg_type: str, to: str, msg: str,
                            defer_until: str='', tz_guess: str='',
                            delivery_type: str='send_later',
                            realm_str: str='zulip') -> HttpResponse:
        self.login('hamlet')

        topic_name = ''
        if msg_type == 'stream':
            topic_name = 'Test topic'

        payload = {"type": msg_type,
                   "to": to,
                   "client": "test suite",
                   "content": msg,
                   "topic": topic_name,
                   "realm_str": realm_str,
                   "delivery_type": delivery_type,
                   "tz_guess": tz_guess}
        if defer_until:
            payload["deliver_at"] = defer_until
        # `Topic` cannot be empty according to OpenAPI specification.
        intentionally_undocumented: bool = (topic_name == '')
        result = self.client_post("/json/messages", payload,
                                  intentionally_undocumented=intentionally_undocumented)
        return result

    def test_schedule_message(self) -> None:
        content = "Test message"
        defer_until = timezone_now().replace(tzinfo=None) + datetime.timedelta(days=1)
        defer_until_str = str(defer_until)

        # Scheduling a message to a stream you are subscribed is successful.
        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 1', defer_until_str)
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.content, 'Test message 1')
        self.assertEqual(message.topic_name(), 'Test topic')
        self.assertEqual(message.scheduled_timestamp, convert_to_UTC(defer_until))
        self.assertEqual(message.delivery_type, ScheduledMessage.SEND_LATER)
        # Scheduling a message for reminders.
        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 2', defer_until_str,
                                          delivery_type='remind')
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.delivery_type, ScheduledMessage.REMIND)

        # Scheduling a private message is successful.
        othello = self.example_user('othello')
        hamlet = self.example_user('hamlet')
        result = self.do_schedule_message('private', othello.email,
                                          content + ' 3', defer_until_str)
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.content, 'Test message 3')
        self.assertEqual(message.scheduled_timestamp, convert_to_UTC(defer_until))
        self.assertEqual(message.delivery_type, ScheduledMessage.SEND_LATER)

        # Setting a reminder in PM's to other users causes a error.
        result = self.do_schedule_message('private', othello.email,
                                          content + ' 4', defer_until_str,
                                          delivery_type='remind')
        self.assert_json_error(result, 'Reminders can only be set for streams.')

        # Setting a reminder in PM's to ourself is successful.
        # Required by reminders from message actions popover caret feature.
        result = self.do_schedule_message('private', hamlet.email,
                                          content + ' 5', defer_until_str,
                                          delivery_type='remind')
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.content, 'Test message 5')
        self.assertEqual(message.delivery_type, ScheduledMessage.REMIND)

        # Scheduling a message while guessing timezone.
        tz_guess = 'Asia/Kolkata'
        result = self.do_schedule_message('stream', 'Verona', content + ' 6',
                                          defer_until_str, tz_guess=tz_guess)
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.content, 'Test message 6')
        local_tz = pytz.timezone(tz_guess)
        utz_defer_until = local_tz.normalize(local_tz.localize(defer_until))
        self.assertEqual(message.scheduled_timestamp,
                         convert_to_UTC(utz_defer_until))
        self.assertEqual(message.delivery_type, ScheduledMessage.SEND_LATER)

        # Test with users timezone setting as set to some timezone rather than
        # empty. This will help interpret timestamp in users local timezone.
        user = self.example_user("hamlet")
        user.timezone = 'US/Pacific'
        user.save(update_fields=['timezone'])
        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 7', defer_until_str)
        message = self.last_scheduled_message()
        self.assert_json_success(result)
        self.assertEqual(message.content, 'Test message 7')
        local_tz = pytz.timezone(user.timezone)
        utz_defer_until = local_tz.normalize(local_tz.localize(defer_until))
        self.assertEqual(message.scheduled_timestamp,
                         convert_to_UTC(utz_defer_until))
        self.assertEqual(message.delivery_type, ScheduledMessage.SEND_LATER)

    def test_scheduling_in_past(self) -> None:
        # Scheduling a message in past should fail.
        content = "Test message"
        defer_until = timezone_now()
        defer_until_str = str(defer_until)

        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 1', defer_until_str)
        self.assert_json_error(result, 'Time must be in the future.')

    def test_invalid_timestamp(self) -> None:
        # Scheduling a message from which timestamp couldn't be parsed
        # successfully should fail.
        content = "Test message"
        defer_until = 'Missed the timestamp'

        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 1', defer_until)
        self.assert_json_error(result, 'Invalid time format')

    def test_missing_deliver_at(self) -> None:
        content = "Test message"

        result = self.do_schedule_message('stream', 'Verona',
                                          content + ' 1')
        self.assert_json_error(result, 'Missing deliver_at in a request for delayed message delivery')

class StreamMessagesTest(ZulipTestCase):

    def assert_stream_message(self, stream_name: str, topic_name: str="test topic",
                              content: str="test content") -> None:
        """
        Check that messages sent to a stream reach all subscribers to that stream.
        """
        realm = get_realm('zulip')
        subscribers = self.users_subscribed_to_stream(stream_name, realm)

        # Outgoing webhook bots don't store UserMessage rows; they will be processed later.
        subscribers = [subscriber for subscriber in subscribers
                       if subscriber.bot_type != UserProfile.OUTGOING_WEBHOOK_BOT]

        old_subscriber_messages = []
        for subscriber in subscribers:
            old_subscriber_messages.append(message_stream_count(subscriber))

        non_subscribers = [user_profile for user_profile in UserProfile.objects.all()
                           if user_profile not in subscribers]
        old_non_subscriber_messages = []
        for non_subscriber in non_subscribers:
            old_non_subscriber_messages.append(message_stream_count(non_subscriber))

        non_bot_subscribers = [user_profile for user_profile in subscribers
                               if not user_profile.is_bot]
        a_subscriber = non_bot_subscribers[0]
        self.login_user(a_subscriber)
        self.send_stream_message(a_subscriber, stream_name,
                                 content=content, topic_name=topic_name)

        # Did all of the subscribers get the message?
        new_subscriber_messages = []
        for subscriber in subscribers:
            new_subscriber_messages.append(message_stream_count(subscriber))

        # Did non-subscribers not get the message?
        new_non_subscriber_messages = []
        for non_subscriber in non_subscribers:
            new_non_subscriber_messages.append(message_stream_count(non_subscriber))

        self.assertEqual(old_non_subscriber_messages, new_non_subscriber_messages)
        self.assertEqual(new_subscriber_messages, [elt + 1 for elt in old_subscriber_messages])

    def test_performance(self) -> None:
        '''
        This test is part of the automated test suite, but
        it is more intended as an aid to measuring the
        performance of do_send_messages() with consistent
        data setup across different commits.  You can modify
        the values below and run just this test, and then
        comment out the print statement toward the bottom.
        '''
        num_messages = 2
        num_extra_users = 10

        sender = self.example_user('cordelia')
        realm = sender.realm
        message_content = 'whatever'
        stream = get_stream('Denmark', realm)
        topic_name = 'lunch'
        recipient = stream.recipient
        sending_client = make_client(name="test suite")

        for i in range(num_extra_users):
            # Make every other user be idle.
            long_term_idle = i % 2 > 0

            email = f'foo{i}@example.com'
            user = UserProfile.objects.create(
                realm=realm,
                email=email,
                delivery_email=email,
                long_term_idle=long_term_idle,
            )
            Subscription.objects.create(
                user_profile=user,
                recipient=recipient,
            )

        def send_test_message() -> None:
            message = Message(
                sender=sender,
                recipient=recipient,
                content=message_content,
                date_sent=timezone_now(),
                sending_client=sending_client,
            )
            message.set_topic_name(topic_name)
            message_dict = build_message_send_dict({'message': message})
            do_send_messages([message_dict])

        before_um_count = UserMessage.objects.count()

        for i in range(num_messages):
            send_test_message()

        after_um_count = UserMessage.objects.count()
        ums_created = after_um_count - before_um_count

        num_active_users = num_extra_users / 2
        self.assertTrue(ums_created > (num_active_users * num_messages))

    def test_not_too_many_queries(self) -> None:
        recipient_list  = [self.example_user("hamlet"), self.example_user("iago"),
                           self.example_user("cordelia"), self.example_user("othello")]
        for user_profile in recipient_list:
            self.subscribe(user_profile, "Denmark")

        sender = self.example_user('hamlet')
        sending_client = make_client(name="test suite")
        stream_name = 'Denmark'
        topic_name = 'foo'
        content = 'whatever'
        realm = sender.realm

        # To get accurate count of the queries, we should make sure that
        # caches don't come into play. If we count queries while caches are
        # filled, we will get a lower count. Caches are not supposed to be
        # persistent, so our test can also fail if cache is invalidated
        # during the course of the unit test.
        flush_per_request_caches()
        cache_delete(get_stream_cache_key(stream_name, realm.id))
        with queries_captured() as queries:
            check_send_stream_message(
                sender=sender,
                client=sending_client,
                stream_name=stream_name,
                topic=topic_name,
                body=content,
            )

        self.assert_length(queries, 12)

    def test_stream_message_dict(self) -> None:
        user_profile = self.example_user('iago')
        self.subscribe(user_profile, "Denmark")
        self.send_stream_message(self.example_user("hamlet"), "Denmark",
                                 content="whatever", topic_name="my topic")
        message = most_recent_message(user_profile)
        row = MessageDict.get_raw_db_rows([message.id])[0]
        dct = MessageDict.build_dict_from_raw_db_row(row)
        MessageDict.post_process_dicts([dct], apply_markdown=True, client_gravatar=False)
        self.assertEqual(dct['display_recipient'], 'Denmark')

        stream = get_stream('Denmark', user_profile.realm)
        self.assertEqual(dct['stream_id'], stream.id)

    def test_stream_message_unicode(self) -> None:
        receiving_user_profile = self.example_user('iago')
        sender = self.example_user('hamlet')
        self.subscribe(receiving_user_profile, "Denmark")
        self.send_stream_message(sender, "Denmark",
                                 content="whatever", topic_name="my topic")
        message = most_recent_message(receiving_user_profile)
        self.assertEqual(str(message),
                         '<Message: Denmark / my topic / '
                         '<UserProfile: {} {}>>'.format(sender.email, sender.realm))

    def test_message_mentions(self) -> None:
        user_profile = self.example_user('iago')
        self.subscribe(user_profile, "Denmark")
        self.send_stream_message(self.example_user("hamlet"), "Denmark",
                                 content="test @**Iago** rules")
        message = most_recent_message(user_profile)
        assert(UserMessage.objects.get(user_profile=user_profile, message=message).flags.mentioned.is_set)

    def test_is_private_flag(self) -> None:
        user_profile = self.example_user('iago')
        self.subscribe(user_profile, "Denmark")

        self.send_stream_message(self.example_user("hamlet"), "Denmark",
                                 content="test")
        message = most_recent_message(user_profile)
        self.assertFalse(UserMessage.objects.get(user_profile=user_profile, message=message).flags.is_private.is_set)

        self.send_personal_message(self.example_user("hamlet"), user_profile,
                                   content="test")
        message = most_recent_message(user_profile)
        self.assertTrue(UserMessage.objects.get(user_profile=user_profile, message=message).flags.is_private.is_set)

    def _send_stream_message(self, user: UserProfile, stream_name: str, content: str) -> Set[int]:
        with mock.patch('zerver.lib.actions.send_event') as m:
            self.send_stream_message(
                user,
                stream_name,
                content=content,
            )
        self.assertEqual(m.call_count, 1)
        users = m.call_args[0][2]
        user_ids = {u['id'] for u in users}
        return user_ids

    def test_unsub_mention(self) -> None:
        cordelia = self.example_user('cordelia')
        hamlet = self.example_user('hamlet')

        stream_name = 'Test Stream'

        self.subscribe(hamlet, stream_name)

        UserMessage.objects.filter(
            user_profile=cordelia,
        ).delete()

        def mention_cordelia() -> Set[int]:
            content = 'test @**Cordelia Lear** rules'

            user_ids = self._send_stream_message(
                user=hamlet,
                stream_name=stream_name,
                content=content,
            )
            return user_ids

        def num_cordelia_messages() -> int:
            return UserMessage.objects.filter(
                user_profile=cordelia,
            ).count()

        user_ids = mention_cordelia()
        self.assertEqual(0, num_cordelia_messages())
        self.assertNotIn(cordelia.id, user_ids)

        # Make sure test isn't too brittle-subscribing
        # Cordelia and mentioning her should give her a
        # message.
        self.subscribe(cordelia, stream_name)
        user_ids = mention_cordelia()
        self.assertIn(cordelia.id, user_ids)
        self.assertEqual(1, num_cordelia_messages())

    def test_message_bot_mentions(self) -> None:
        cordelia = self.example_user('cordelia')
        hamlet = self.example_user('hamlet')
        realm = hamlet.realm

        stream_name = 'Test Stream'

        self.subscribe(hamlet, stream_name)

        normal_bot = do_create_user(
            email='normal-bot@zulip.com',
            password='',
            realm=realm,
            full_name='Normal Bot',
            bot_type=UserProfile.DEFAULT_BOT,
            bot_owner=cordelia,
        )

        content = 'test @**Normal Bot** rules'

        user_ids = self._send_stream_message(
            user=hamlet,
            stream_name=stream_name,
            content=content,
        )

        self.assertIn(normal_bot.id, user_ids)
        user_message = most_recent_usermessage(normal_bot)
        self.assertEqual(user_message.message.content, content)
        self.assertTrue(user_message.flags.mentioned)

    def send_and_verify_wildcard_mention_message(self,
                                                 sender_name: str,
                                                 test_fails: bool=False,
                                                 sub_count: int=16) -> None:
        sender = self.example_user(sender_name)
        content = "@**all** test wildcard mention"
        with mock.patch(
            "zerver.lib.message.num_subscribers_for_stream_id", return_value=sub_count
        ):
            if not test_fails:
                msg_id = self.send_stream_message(sender, "test_stream", content)
                result = self.api_get(sender, '/json/messages/' + str(msg_id))
                self.assert_json_success(result)

            else:
                with self.assertRaisesRegex(JsonableError,
                                            "You do not have permission to use wildcard mentions in this stream."):
                    self.send_stream_message(sender, "test_stream", content)

    def test_wildcard_mention_restrictions(self) -> None:
        cordelia = self.example_user("cordelia")
        iago = self.example_user("iago")
        polonius = self.example_user("polonius")
        realm = cordelia.realm

        stream_name = "test_stream"
        self.subscribe(cordelia, stream_name)
        self.subscribe(iago, stream_name)
        self.subscribe(polonius, stream_name)

        do_set_realm_property(
            realm, "wildcard_mention_policy", Realm.WILDCARD_MENTION_POLICY_EVERYONE
        )
        self.send_and_verify_wildcard_mention_message("polonius")

        do_set_realm_property(
            realm, "wildcard_mention_policy", Realm.WILDCARD_MENTION_POLICY_MEMBERS
        )
        self.send_and_verify_wildcard_mention_message("polonius", test_fails=True)
        # There is no restriction on small streams.
        self.send_and_verify_wildcard_mention_message("polonius", sub_count=10)
        self.send_and_verify_wildcard_mention_message("cordelia")

        do_set_realm_property(
            realm,
            "wildcard_mention_policy",
            Realm.WILDCARD_MENTION_POLICY_FULL_MEMBERS
        )
        do_set_realm_property(realm, "waiting_period_threshold", 10)
        iago.date_joined = timezone_now()
        iago.save()
        cordelia.date_joined = timezone_now()
        cordelia.save()
        self.send_and_verify_wildcard_mention_message("cordelia", test_fails=True)
        self.send_and_verify_wildcard_mention_message("cordelia", sub_count=10)
        # Administrators can use wildcard mentions even if they are new.
        self.send_and_verify_wildcard_mention_message("iago")

        cordelia.date_joined = timezone_now() - datetime.timedelta(days=11)
        cordelia.save()
        self.send_and_verify_wildcard_mention_message("cordelia")

        do_set_realm_property(
            realm,
            "wildcard_mention_policy",
            Realm.WILDCARD_MENTION_POLICY_STREAM_ADMINS
        )
        # TODO: Change this when we implement stream administrators
        self.send_and_verify_wildcard_mention_message("cordelia", test_fails=True)
        # There is no restriction on small streams.
        self.send_and_verify_wildcard_mention_message("cordelia", sub_count=10)
        self.send_and_verify_wildcard_mention_message("iago")

        cordelia.date_joined = timezone_now()
        cordelia.save()
        do_set_realm_property(
            realm, "wildcard_mention_policy", Realm.WILDCARD_MENTION_POLICY_ADMINS
        )
        self.send_and_verify_wildcard_mention_message("cordelia", test_fails=True)
        # There is no restriction on small streams.
        self.send_and_verify_wildcard_mention_message("cordelia", sub_count=10)
        self.send_and_verify_wildcard_mention_message("iago")

        do_set_realm_property(
            realm, "wildcard_mention_policy", Realm.WILDCARD_MENTION_POLICY_NOBODY
        )
        self.send_and_verify_wildcard_mention_message("iago", test_fails=True)
        self.send_and_verify_wildcard_mention_message("iago", sub_count=10)

    def test_invalid_wildcard_mention_policy(self) -> None:
        cordelia = self.example_user("cordelia")
        self.login_user(cordelia)

        self.subscribe(cordelia, "test_stream")
        do_set_realm_property(cordelia.realm, "wildcard_mention_policy", 10)
        content = "@**all** test wildcard mention"
        with mock.patch(
            "zerver.lib.message.num_subscribers_for_stream_id", return_value=16
        ):
            with self.assertRaisesRegex(AssertionError, "Invalid wildcard mention policy"):
                self.send_stream_message(cordelia, "test_stream", content)

    def test_stream_message_mirroring(self) -> None:
        user = self.mit_user('starnine')
        self.subscribe(user, 'Verona')

        do_change_can_forge_sender(user, True)
        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "to": "Verona",
                                                          "sender": self.mit_email("sipbtest"),
                                                          "client": "zephyr_mirror",
                                                          "topic": "announcement",
                                                          "content": "Everyone knows Iago rules",
                                                          "forged": "true"},
                               subdomain="zephyr")
        self.assert_json_success(result)

        do_change_can_forge_sender(user, False)
        result = self.api_post(user, "/api/v1/messages", {"type": "stream",
                                                          "to": "Verona",
                                                          "sender": self.mit_email("sipbtest"),
                                                          "client": "zephyr_mirror",
                                                          "topic": "announcement",
                                                          "content": "Everyone knows Iago rules",
                                                          "forged": "true"},
                               subdomain="zephyr")
        self.assert_json_error(result, "User not authorized for this query")

    def test_message_to_stream(self) -> None:
        """
        If you send a message to a stream, everyone subscribed to the stream
        receives the messages.
        """
        self.assert_stream_message("Scotland")

    def test_non_ascii_stream_message(self) -> None:
        """
        Sending a stream message containing non-ASCII characters in the stream
        name, topic, or message body succeeds.
        """
        self.login('hamlet')

        # Subscribe everyone to a stream with non-ASCII characters.
        non_ascii_stream_name = "hümbüǵ"
        realm = get_realm("zulip")
        stream = self.make_stream(non_ascii_stream_name)
        for user_profile in UserProfile.objects.filter(is_active=True, is_bot=False,
                                                       realm=realm)[0:3]:
            self.subscribe(user_profile, stream.name)

        self.assert_stream_message(non_ascii_stream_name, topic_name="hümbüǵ",
                                   content="hümbüǵ")

    def test_get_raw_unread_data_for_huddle_messages(self) -> None:
        users = [
            self.example_user('hamlet'),
            self.example_user('cordelia'),
            self.example_user('iago'),
            self.example_user('prospero'),
            self.example_user('othello'),
        ]

        message1_id = self.send_huddle_message(users[0], users, "test content 1")
        message2_id = self.send_huddle_message(users[0], users, "test content 2")

        msg_data = get_raw_unread_data(users[1])

        # both the messages are present in msg_data
        self.assertIn(message1_id, msg_data["huddle_dict"].keys())
        self.assertIn(message2_id, msg_data["huddle_dict"].keys())

        # only these two messages are present in msg_data
        self.assertEqual(len(msg_data["huddle_dict"].keys()), 2)

        recent_conversations = get_recent_private_conversations(users[1])
        self.assertEqual(len(recent_conversations), 1)
        recent_conversation = list(recent_conversations.values())[0]
        self.assertEqual(set(recent_conversation['user_ids']), {user.id for user in users if
                                                                user != users[1]})
        self.assertEqual(recent_conversation['max_message_id'], message2_id)

class PersonalMessageSendTest(ZulipTestCase):
    def test_personal_to_self(self) -> None:
        """
        If you send a personal to yourself, only you see it.
        """
        old_user_profiles = list(UserProfile.objects.all())
        test_email = self.nonreg_email('test1')
        self.register(test_email, "test1")

        old_messages = []
        for user_profile in old_user_profiles:
            old_messages.append(message_stream_count(user_profile))

        user_profile = self.nonreg_user('test1')
        self.send_personal_message(user_profile, user_profile)

        new_messages = []
        for user_profile in old_user_profiles:
            new_messages.append(message_stream_count(user_profile))

        self.assertEqual(old_messages, new_messages)

        user_profile = self.nonreg_user('test1')
        recipient = Recipient.objects.get(type_id=user_profile.id, type=Recipient.PERSONAL)
        self.assertEqual(most_recent_message(user_profile).recipient, recipient)

    def assert_personal(self, sender: UserProfile, receiver: UserProfile, content: str="testcontent") -> None:
        """
        Send a private message from `sender_email` to `receiver_email` and check
        that only those two parties actually received the message.
        """
        sender_messages = message_stream_count(sender)
        receiver_messages = message_stream_count(receiver)

        other_user_profiles = UserProfile.objects.filter(~Q(id=sender.id) &
                                                         ~Q(id=receiver.id))
        old_other_messages = []
        for user_profile in other_user_profiles:
            old_other_messages.append(message_stream_count(user_profile))

        self.send_personal_message(sender, receiver, content)

        # Users outside the conversation don't get the message.
        new_other_messages = []
        for user_profile in other_user_profiles:
            new_other_messages.append(message_stream_count(user_profile))

        self.assertEqual(old_other_messages, new_other_messages)

        # The personal message is in the streams of both the sender and receiver.
        self.assertEqual(message_stream_count(sender),
                         sender_messages + 1)
        self.assertEqual(message_stream_count(receiver),
                         receiver_messages + 1)

        recipient = Recipient.objects.get(type_id=receiver.id, type=Recipient.PERSONAL)
        self.assertEqual(most_recent_message(sender).recipient, recipient)
        self.assertEqual(most_recent_message(receiver).recipient, recipient)

    def test_personal(self) -> None:
        """
        If you send a personal, only you and the recipient see it.
        """
        self.login('hamlet')
        self.assert_personal(
            sender=self.example_user("hamlet"),
            receiver=self.example_user("othello"),
        )

    def test_private_message_policy(self) -> None:
        """
        Tests that PRIVATE_MESSAGE_POLICY_DISABLED works correctly.
        """
        user_profile = self.example_user("hamlet")
        self.login_user(user_profile)
        do_set_realm_property(user_profile.realm, "private_message_policy",
                              Realm.PRIVATE_MESSAGE_POLICY_DISABLED)
        with self.assertRaises(JsonableError):
            self.send_personal_message(user_profile, self.example_user("cordelia"))

        bot_profile = self.create_test_bot("testbot", user_profile)
        self.send_personal_message(user_profile, get_system_bot(settings.NOTIFICATION_BOT))
        self.send_personal_message(user_profile, bot_profile)
        self.send_personal_message(bot_profile, user_profile)

    def test_non_ascii_personal(self) -> None:
        """
        Sending a PM containing non-ASCII characters succeeds.
        """
        self.login('hamlet')
        self.assert_personal(
            sender=self.example_user("hamlet"),
            receiver=self.example_user("othello"),
            content="hümbüǵ",
        )


class ExtractTest(ZulipTestCase):
    def test_extract_stream_indicator(self) -> None:
        self.assertEqual(
            extract_stream_indicator('development'),
            "development",
        )
        self.assertEqual(
            extract_stream_indicator('commas,are,fine'),
            "commas,are,fine",
        )
        self.assertEqual(
            extract_stream_indicator('"Who hasn\'t done this?"'),
            "Who hasn't done this?",
        )
        self.assertEqual(
            extract_stream_indicator("999"),
            999,
        )

        # For legacy reasons it's plausible that users will
        # put a single stream into an array and then encode it
        # as JSON.  We can probably eliminate this support
        # by mid 2020 at the latest.
        self.assertEqual(
            extract_stream_indicator('["social"]'),
            'social',
        )

        self.assertEqual(
            extract_stream_indicator("[123]"),
            123,
        )

        with self.assertRaisesRegex(JsonableError, 'Invalid data type for stream'):
            extract_stream_indicator('{}')

        with self.assertRaisesRegex(JsonableError, 'Invalid data type for stream'):
            extract_stream_indicator('[{}]')

        with self.assertRaisesRegex(JsonableError, 'Expected exactly one stream'):
            extract_stream_indicator('[1,2,"general"]')

    def test_extract_private_recipients_emails(self) -> None:

        # JSON list w/dups, empties, and trailing whitespace
        s = orjson.dumps([' alice@zulip.com ', ' bob@zulip.com ', '   ', 'bob@zulip.com']).decode()
        # sorted() gets confused by extract_private_recipients' return type
        # For testing, ignorance here is better than manual casting
        result = sorted(extract_private_recipients(s))
        self.assertEqual(result, ['alice@zulip.com', 'bob@zulip.com'])

        # simple string with one name
        s = 'alice@zulip.com    '
        self.assertEqual(extract_private_recipients(s), ['alice@zulip.com'])

        # JSON-encoded string
        s = '"alice@zulip.com"'
        self.assertEqual(extract_private_recipients(s), ['alice@zulip.com'])

        # bare comma-delimited string
        s = 'bob@zulip.com, alice@zulip.com'
        result = sorted(extract_private_recipients(s))
        self.assertEqual(result, ['alice@zulip.com', 'bob@zulip.com'])

        # JSON-encoded, comma-delimited string
        s = '"bob@zulip.com,alice@zulip.com"'
        result = sorted(extract_private_recipients(s))
        self.assertEqual(result, ['alice@zulip.com', 'bob@zulip.com'])

        # Invalid data
        s = orjson.dumps(dict(color='red')).decode()
        with self.assertRaisesRegex(JsonableError, 'Invalid data type for recipients'):
            extract_private_recipients(s)

        s = orjson.dumps([{}]).decode()
        with self.assertRaisesRegex(JsonableError, 'Invalid data type for recipients'):
            extract_private_recipients(s)

        # Empty list
        self.assertEqual(extract_private_recipients('[]'), [])

        # Heterogeneous lists are not supported
        mixed = orjson.dumps(['eeshan@example.com', 3, 4]).decode()
        with self.assertRaisesRegex(JsonableError, 'Recipient lists may contain emails or user IDs, but not both.'):
            extract_private_recipients(mixed)

    def test_extract_recipient_ids(self) -> None:
        # JSON list w/dups
        s = orjson.dumps([3, 3, 12]).decode()
        result = sorted(extract_private_recipients(s))
        self.assertEqual(result, [3, 12])

        # Invalid data
        ids = orjson.dumps(dict(recipient=12)).decode()
        with self.assertRaisesRegex(JsonableError, 'Invalid data type for recipients'):
            extract_private_recipients(ids)

        # Heterogeneous lists are not supported
        mixed = orjson.dumps([3, 4, 'eeshan@example.com']).decode()
        with self.assertRaisesRegex(JsonableError, 'Recipient lists may contain emails or user IDs, but not both.'):
            extract_private_recipients(mixed)

class InternalPrepTest(ZulipTestCase):

    def test_returns_for_internal_sends(self) -> None:
        # For our internal_send_* functions we return
        # if the prep stages fail.  This is mostly defensive
        # code, since we are generally creating the messages
        # ourselves, but we want to make sure that the functions
        # won't actually explode if we give them bad content.
        bad_content = ''
        realm = get_realm('zulip')
        cordelia = self.example_user('cordelia')
        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        stream = get_stream('Verona', realm)

        with self.assertLogs(level="ERROR") as m:
            internal_send_private_message(
                realm=realm,
                sender=cordelia,
                recipient_user=hamlet,
                content=bad_content,
            )

        self.assertEqual(m.output[0].split('\n')[0],
                         "ERROR:root:Error queueing internal message by {}: {}".format(
                             "cordelia@zulip.com",
                             "Message must not be empty"
        ))

        with self.assertLogs(level="ERROR") as m:
            internal_send_huddle_message(
                realm=realm,
                sender=cordelia,
                emails=[hamlet.email, othello.email],
                content=bad_content,
            )

        self.assertEqual(m.output[0].split('\n')[0],
                         "ERROR:root:Error queueing internal message by {}: {}".format(
                             "cordelia@zulip.com",
                             "Message must not be empty"
        ))

        with self.assertLogs(level="ERROR") as m:
            internal_send_stream_message(
                realm=realm,
                sender=cordelia,
                topic='whatever',
                content=bad_content,
                stream=stream,
            )

        self.assertEqual(m.output[0].split('\n')[0],
                         "ERROR:root:Error queueing internal message by {}: {}".format(
                             "cordelia@zulip.com",
                             "Message must not be empty"
        ))

        with self.assertLogs(level="ERROR") as m:
            internal_send_stream_message_by_name(
                realm=realm,
                sender=cordelia,
                stream_name=stream.name,
                topic='whatever',
                content=bad_content,
            )

        self.assertEqual(m.output[0].split('\n')[0],
                         "ERROR:root:Error queueing internal message by {}: {}".format(
                             "cordelia@zulip.com",
                             "Message must not be empty"
        ))

    def test_error_handling(self) -> None:
        realm = get_realm('zulip')
        sender = self.example_user('cordelia')
        recipient_user = self.example_user('hamlet')
        content = 'x' * 15000

        result = internal_prep_private_message(
            realm=realm,
            sender=sender,
            recipient_user=recipient_user,
            content=content)
        assert result is not None
        message = result.message
        self.assertIn('message was too long', message.content)

        # Simulate sending a message to somebody not in the
        # realm of the sender.
        recipient_user = self.mit_user('starnine')
        with self.assertLogs(level="ERROR") as m:
            result = internal_prep_private_message(
                realm=realm,
                sender=sender,
                recipient_user=recipient_user,
                content=content)

        self.assertEqual(m.output[0].split('\n')[0],
                         "ERROR:root:Error queueing internal message by {}: {}".format(
                             "cordelia@zulip.com",
                             "You can't send private messages outside of your organization."
        ))

    def test_ensure_stream_gets_called(self) -> None:
        realm = get_realm('zulip')
        sender = self.example_user('cordelia')
        stream_name = 'test_stream'
        topic = 'whatever'
        content = 'hello'

        internal_prep_stream_message_by_name(
            realm=realm,
            sender=sender,
            stream_name=stream_name,
            topic=topic,
            content=content)

        # This would throw an error if the stream
        # wasn't automatically created.
        Stream.objects.get(name=stream_name, realm_id=realm.id)

class TestCrossRealmPMs(ZulipTestCase):
    def make_realm(self, domain: str) -> Realm:
        realm = Realm.objects.create(string_id=domain, invite_required=False)
        RealmDomain.objects.create(realm=realm, domain=domain)
        return realm

    def create_user(self, email: str) -> UserProfile:
        subdomain = email.split("@")[1]
        self.register(email, 'test', subdomain=subdomain)
        return get_user(email, get_realm(subdomain))

    @override_settings(CROSS_REALM_BOT_EMAILS=['notification-bot@zulip.com',
                                               'welcome-bot@zulip.com',
                                               'support@3.example.com'])
    def test_realm_scenarios(self) -> None:
        self.make_realm('1.example.com')
        r2 = self.make_realm('2.example.com')
        self.make_realm('3.example.com')

        def assert_message_received(to_user: UserProfile, from_user: UserProfile) -> None:
            messages = get_user_messages(to_user)
            self.assertEqual(messages[-1].sender.id, from_user.id)

        def assert_invalid_user() -> Any:
            return self.assertRaisesRegex(
                JsonableError,
                'Invalid user ID ')

        user1_email = 'user1@1.example.com'
        user1a_email = 'user1a@1.example.com'
        user2_email = 'user2@2.example.com'
        user3_email = 'user3@3.example.com'
        notification_bot_email = 'notification-bot@zulip.com'
        support_email = 'support@3.example.com'  # note: not zulip.com

        user1 = self.create_user(user1_email)
        user1a = self.create_user(user1a_email)
        user2 = self.create_user(user2_email)
        user3 = self.create_user(user3_email)
        notification_bot = get_system_bot(notification_bot_email)
        with self.settings(CROSS_REALM_BOT_EMAILS=['notification-bot@zulip.com', 'welcome-bot@zulip.com']):
            # HACK: We should probably be creating this "bot" user another
            # way, but since you can't register a user with a
            # cross-realm email, we need to hide this for now.
            support_bot = self.create_user(support_email)

        # Users can PM themselves
        self.send_personal_message(user1, user1)
        assert_message_received(user1, user1)

        # Users on the same realm can PM each other
        self.send_personal_message(user1, user1a)
        assert_message_received(user1a, user1)

        # Cross-realm bots in the zulip.com realm can PM any realm
        # (They need lower level APIs to do this.)
        internal_send_private_message(
            realm=r2,
            sender=get_system_bot(notification_bot_email),
            recipient_user=get_user(user2_email, r2),
            content='bla',
        )
        assert_message_received(user2, notification_bot)

        # All users can PM cross-realm bots in the zulip.com realm
        self.send_personal_message(user1, notification_bot)
        assert_message_received(notification_bot, user1)

        # Users can PM cross-realm bots on non-zulip realms.
        # (The support bot represents some theoretical bot that we may
        # create in the future that does not have zulip.com as its realm.)
        self.send_personal_message(user1,  support_bot)
        assert_message_received(support_bot, user1)

        # Allow sending PMs to two different cross-realm bots simultaneously.
        # (We don't particularly need this feature, but since users can
        # already individually send PMs to cross-realm bots, we shouldn't
        # prevent them from sending multiple bots at once.  We may revisit
        # this if it's a nuisance for huddles.)
        self.send_huddle_message(user1, [notification_bot, support_bot])
        assert_message_received(notification_bot, user1)
        assert_message_received(support_bot, user1)

        # Prevent old loophole where I could send PMs to other users as long
        # as I copied a cross-realm bot from the same realm.
        with assert_invalid_user():
            self.send_huddle_message(user1, [user3, support_bot])

        # Users on three different realms can't PM each other,
        # even if one of the users is a cross-realm bot.
        with assert_invalid_user():
            self.send_huddle_message(user1, [user2, notification_bot])

        with assert_invalid_user():
            self.send_huddle_message(notification_bot, [user1, user2])

        # Users on the different realms cannot PM each other
        with assert_invalid_user():
            self.send_personal_message(user1, user2)

        # Users on non-zulip realms can't PM "ordinary" Zulip users
        with assert_invalid_user():
            self.send_personal_message(user1, self.example_user('hamlet'))

        # Users on three different realms cannot PM each other
        with assert_invalid_user():
            self.send_huddle_message(user1, [user2, user3])

class TestAddressee(ZulipTestCase):
    def test_addressee_for_user_ids(self) -> None:
        realm = get_realm('zulip')
        user_ids = [self.example_user('cordelia').id,
                    self.example_user('hamlet').id,
                    self.example_user('othello').id]

        result = Addressee.for_user_ids(user_ids=user_ids, realm=realm)
        user_profiles = result.user_profiles()
        result_user_ids = [user_profiles[0].id, user_profiles[1].id,
                           user_profiles[2].id]

        self.assertEqual(set(result_user_ids), set(user_ids))

    def test_addressee_for_user_ids_nonexistent_id(self) -> None:
        def assert_invalid_user_id() -> Any:
            return self.assertRaisesRegex(
                JsonableError,
                'Invalid user ID ')

        with assert_invalid_user_id():
            Addressee.for_user_ids(user_ids=[779], realm=get_realm('zulip'))

    def test_addressee_legacy_build_for_user_ids(self) -> None:
        realm = get_realm('zulip')
        self.login('hamlet')
        user_ids = [self.example_user('cordelia').id,
                    self.example_user('othello').id]

        result = Addressee.legacy_build(
            sender=self.example_user('hamlet'), message_type_name='private',
            message_to=user_ids, topic_name='random_topic',
            realm=realm,
        )
        user_profiles = result.user_profiles()
        result_user_ids = [user_profiles[0].id, user_profiles[1].id]

        self.assertEqual(set(result_user_ids), set(user_ids))

    def test_addressee_legacy_build_for_stream_id(self) -> None:
        realm = get_realm('zulip')
        self.login('iago')
        sender = self.example_user('iago')
        self.subscribe(sender, "Denmark")
        stream = get_stream('Denmark', realm)

        result = Addressee.legacy_build(
            sender=sender, message_type_name='stream',
            message_to=[stream.id], topic_name='random_topic',
            realm=realm,
        )

        stream_id = result.stream_id()
        self.assertEqual(stream.id, stream_id)

class CheckMessageTest(ZulipTestCase):
    def test_basic_check_message_call(self) -> None:
        sender = self.example_user('othello')
        client = make_client(name="test suite")
        stream_name = 'España y Francia'
        self.make_stream(stream_name)
        topic_name = 'issue'
        message_content = 'whatever'
        addressee = Addressee.for_stream_name(stream_name, topic_name)
        ret = check_message(sender, client, addressee, message_content)
        self.assertEqual(ret.message.sender.id, sender.id)

    def test_guest_user_can_send_message(self) -> None:
        # Guest users can write to web_public streams.
        sender = self.example_user("polonius")
        client = make_client(name="test suite")
        rome_stream = get_stream("Rome", sender.realm)

        is_sender_subscriber = Subscription.objects.filter(
            user_profile=sender,
            recipient__type_id=rome_stream.id,
        ).exists()
        self.assertFalse(is_sender_subscriber)
        self.assertTrue(rome_stream.is_web_public)

        topic_name = 'issue'
        message_content = 'whatever'
        addressee = Addressee.for_stream_name(rome_stream.name, topic_name)
        ret = check_message(sender, client, addressee, message_content)
        self.assertEqual(ret.message.sender.id, sender.id)

    def test_bot_pm_feature(self) -> None:
        """We send a PM to a bot's owner if their bot sends a message to
        an unsubscribed stream"""
        parent = self.example_user('othello')
        bot = do_create_user(
            email='othello-bot@zulip.com',
            password='',
            realm=parent.realm,
            full_name='',
            bot_type=UserProfile.DEFAULT_BOT,
            bot_owner=parent,
        )
        bot.last_reminder = None

        sender = bot
        client = make_client(name="test suite")
        stream_name = 'Россия'
        topic_name = 'issue'
        addressee = Addressee.for_stream_name(stream_name, topic_name)
        message_content = 'whatever'
        old_count = message_stream_count(parent)

        # Try sending to stream that doesn't exist sends a reminder to
        # the sender
        with self.assertRaises(JsonableError):
            check_message(sender, client, addressee, message_content)

        new_count = message_stream_count(parent)
        self.assertEqual(new_count, old_count + 1)
        self.assertIn("that stream does not exist.", most_recent_message(parent).content)

        # Try sending to stream that exists with no subscribers soon
        # after; due to rate-limiting, this should send nothing.
        self.make_stream(stream_name)
        ret = check_message(sender, client, addressee, message_content)
        new_count = message_stream_count(parent)
        self.assertEqual(new_count, old_count + 1)

        # Try sending to stream that exists with no subscribers longer
        # after; this should send an error to the bot owner that the
        # stream doesn't exist
        assert(sender.last_reminder is not None)
        sender.last_reminder = sender.last_reminder - datetime.timedelta(hours=1)
        sender.save(update_fields=["last_reminder"])
        ret = check_message(sender, client, addressee, message_content)

        new_count = message_stream_count(parent)
        self.assertEqual(new_count, old_count + 2)
        self.assertEqual(ret.message.sender.email, 'othello-bot@zulip.com')
        self.assertIn("does not have any subscribers", most_recent_message(parent).content)

    def test_bot_pm_error_handling(self) -> None:
        # This just test some defensive code.
        cordelia = self.example_user('cordelia')
        test_bot = self.create_test_bot(
            short_name='test',
            user_profile=cordelia,
        )
        content = 'whatever'
        good_realm = test_bot.realm
        wrong_realm = get_realm("zephyr")
        wrong_sender = cordelia

        send_rate_limited_pm_notification_to_bot_owner(test_bot, wrong_realm, content)
        self.assertEqual(test_bot.last_reminder, None)

        send_rate_limited_pm_notification_to_bot_owner(wrong_sender, good_realm, content)
        self.assertEqual(test_bot.last_reminder, None)

        test_bot.realm.deactivated = True
        send_rate_limited_pm_notification_to_bot_owner(test_bot, good_realm, content)
        self.assertEqual(test_bot.last_reminder, None)
