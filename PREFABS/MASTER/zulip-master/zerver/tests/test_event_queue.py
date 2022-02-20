import time
from typing import Any, Callable, Dict, List, Tuple
from unittest import mock

import orjson
from django.http import HttpRequest, HttpResponse

from zerver.lib.actions import do_change_subscription_property, do_mute_topic
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import POSTRequestMock, mock_queue_publish
from zerver.models import Recipient, Stream, Subscription, UserProfile, get_stream
from zerver.tornado.event_queue import (
    ClientDescriptor,
    allocate_client_descriptor,
    get_client_descriptor,
    maybe_enqueue_notifications,
    missedmessage_hook,
    persistent_queue_filename,
)
from zerver.tornado.views import cleanup_event_queue, get_events


class MissedMessageNotificationsTest(ZulipTestCase):
    """Tests the logic for when missed-message notifications
    should be triggered, based on user settings"""

    def check_will_notify(self, *args: Any, **kwargs: Any) -> Tuple[str, str]:
        email_notice = None
        mobile_notice = None
        with mock_queue_publish("zerver.tornado.event_queue.queue_json_publish") as mock_queue_json_publish:
            notified = maybe_enqueue_notifications(*args, **kwargs)
            for entry in mock_queue_json_publish.call_args_list:
                args = entry[0]
                if args[0] == "missedmessage_mobile_notifications":
                    mobile_notice = args[1]
                if args[0] == "missedmessage_emails":
                    email_notice = args[1]

            # Now verify the return value matches the queue actions
            if email_notice:
                self.assertTrue(notified['email_notified'])
            else:
                self.assertFalse(notified.get('email_notified', False))
            if mobile_notice:
                self.assertTrue(notified['push_notified'])
            else:
                self.assertFalse(notified.get('push_notified', False))
        return email_notice, mobile_notice

    def test_enqueue_notifications(self) -> None:
        user_profile = self.example_user("hamlet")
        message_id = 32

        # Boring message doesn't send a notice
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is None)

        # Private message sends a notice
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=True,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=True,
            stream_name=None, always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is not None)
        self.assertTrue(mobile_notice is not None)

        # Private message won't double-send either notice if we've
        # already sent notices before.
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=True,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=True, already_notified={
                'push_notified': True,
                'email_notified': False,
            })
        self.assertTrue(email_notice is not None)
        self.assertTrue(mobile_notice is None)

        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=True,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=True, already_notified={
                'push_notified': False,
                'email_notified': True,
            })
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is not None)

        # Mention sends a notice
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=True, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is not None)
        self.assertTrue(mobile_notice is not None)

        # Wildcard mention triggers both email and push notices (Like a
        # direct mention, whether the notice is actually delivered is
        # determined later, in the email/push notification code)
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=True,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is not None)
        self.assertTrue(mobile_notice is not None)

        # stream_push_notify pushes but doesn't email
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=True, stream_email_notify=False,
            stream_name="Denmark", always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is not None)

        # stream_email_notify emails but doesn't push
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=True,
            stream_name="Denmark", always_push_notify=False, idle=True, already_notified={})
        self.assertTrue(email_notice is not None)
        self.assertTrue(mobile_notice is None)

        # Private message doesn't send a notice if not idle
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=True,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=True,
            stream_name=None, always_push_notify=False, idle=False, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is None)

        # Mention doesn't send a notice if not idle
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=True, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=False, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is None)

        # Wildcard mention doesn't send a notice if not idle
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=True,
            stream_push_notify=False, stream_email_notify=False,
            stream_name=None, always_push_notify=False, idle=False, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is None)

        # Private message sends push but not email if not idle but always_push_notify
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=True,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=False, stream_email_notify=True,
            stream_name=None, always_push_notify=True, idle=False, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is not None)

        # Stream message sends push but not email if not idle but always_push_notify
        email_notice, mobile_notice = self.check_will_notify(
            user_profile.id, message_id, private_message=False,
            mentioned=False, wildcard_mention_notify=False,
            stream_push_notify=True, stream_email_notify=True,
            stream_name="Denmark", always_push_notify=True, idle=False, already_notified={})
        self.assertTrue(email_notice is None)
        self.assertTrue(mobile_notice is not None)

    def tornado_call(self, view_func: Callable[[HttpRequest, UserProfile], HttpResponse],
                     user_profile: UserProfile, post_data: Dict[str, Any]) -> HttpResponse:
        request = POSTRequestMock(post_data, user_profile)
        return view_func(request, user_profile)

    def test_stream_watchers(self) -> None:
        '''
        We used to have a bug with stream_watchers, where we set their flags to
        None.
        '''
        cordelia = self.example_user('cordelia')
        hamlet = self.example_user('hamlet')
        realm = hamlet.realm
        stream_name = 'Denmark'

        self.unsubscribe(hamlet, stream_name)

        queue_data = dict(
            all_public_streams=True,
            apply_markdown=True,
            client_gravatar=True,
            client_type_name='home grown API program',
            event_types=['message'],
            last_connection_time=time.time(),
            queue_timeout=0,
            realm_id=realm.id,
            user_profile_id=hamlet.id,
        )

        client = allocate_client_descriptor(queue_data)

        self.send_stream_message(cordelia, stream_name)

        self.assertEqual(len(client.event_queue.contents()), 1)

        # This next line of code should silently succeed and basically do
        # nothing under the covers.  This test is here to prevent a bug
        # from re-appearing.
        missedmessage_hook(
            user_profile_id=hamlet.id,
            client=client,
            last_for_client=True,
        )

    def test_end_to_end_missedmessage_hook(self) -> None:
        """Tests what arguments missedmessage_hook passes into maybe_enqueue_notifications.
        Combined with the previous test, this ensures that the missedmessage_hook is correct"""
        user_profile = self.example_user('hamlet')

        user_profile.enable_online_push_notifications = False
        user_profile.save()

        # Fetch the Denmark stream for testing
        stream = get_stream("Denmark", user_profile.realm)
        sub = Subscription.objects.get(user_profile=user_profile, recipient__type=Recipient.STREAM,
                                       recipient__type_id=stream.id)

        self.login_user(user_profile)

        def change_subscription_properties(user_profile: UserProfile, stream: Stream, sub: Subscription,
                                           properties: Dict[str, bool]) -> None:
            for property_name, value in properties.items():
                do_change_subscription_property(user_profile, sub, stream, property_name, value)

        def allocate_event_queue() -> ClientDescriptor:
            result = self.tornado_call(get_events, user_profile,
                                       {"apply_markdown": orjson.dumps(True).decode(),
                                        "client_gravatar": orjson.dumps(True).decode(),
                                        "event_types": orjson.dumps(["message"]).decode(),
                                        "user_client": "website",
                                        "dont_block": orjson.dumps(True).decode()})
            self.assert_json_success(result)
            queue_id = orjson.loads(result.content)["queue_id"]
            return get_client_descriptor(queue_id)

        def destroy_event_queue(queue_id: str) -> None:
            result = self.tornado_call(cleanup_event_queue, user_profile,
                                       {"queue_id": queue_id})
            self.assert_json_success(result)

        client_descriptor = allocate_event_queue()
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            # To test the missed_message hook, we first need to send a message
            msg_id = self.send_stream_message(self.example_user("iago"), "Denmark")

            # Verify that nothing happens if you call it as not the
            # "last client descriptor", in which case the function
            # short-circuits, since the `missedmessage_hook` handler
            # for garbage-collection is only for the user's last queue.
            missedmessage_hook(user_profile.id, client_descriptor, False)
            mock_enqueue.assert_not_called()

            # Now verify that we called the appropriate enqueue function
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False, False, False,
                                         "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with a private message; this should trigger notifications
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_personal_message(self.example_user("iago"), user_profile)
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, True, False, False, False,
                                         False, None, False, True,
                                         {'email_notified': True, 'push_notified': True}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with a mention; this should trigger notifications
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="@**King Hamlet** what's up?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, True, False, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': True, 'push_notified': True}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with a wildcard mention; this should trigger notifications
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="@**all** what's up?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, True, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': True, 'push_notified': True}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with a wildcard mention sent by the user
        # themself using a human client; should not notify.
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("hamlet"), "Denmark",
                                          content="@**all** what's up?",
                                          sending_client_name="website")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Wildcard mentions in muted streams don't notify.
        change_subscription_properties(user_profile, stream, sub, {'is_muted': True})
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="@**all** what's up?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)
        change_subscription_properties(user_profile, stream, sub, {'is_muted': False})

        # With wildcard_mentions_notify=False, we treat the user as not mentioned.
        user_profile.wildcard_mentions_notify = False
        user_profile.save()
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="@**all** what's up?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)
        user_profile.wildcard_mentions_notify = True
        user_profile.save()

        # If wildcard_mentions_notify=True for a stream and False for a user, we treat the user
        # as mentioned for that stream.
        user_profile.wildcard_mentions_notify = False
        sub.wildcard_mentions_notify = True
        user_profile.save()
        sub.save()
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="@**all** what's up?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, True, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': True, 'push_notified': True}))
        destroy_event_queue(client_descriptor.event_queue.id)
        user_profile.wildcard_mentions_notify = True
        sub.wildcard_mentions_notify = None
        user_profile.save()
        sub.save()

        # Test the hook with a stream message with stream_push_notify
        change_subscription_properties(user_profile, stream, sub, {'push_notifications': True})
        client_descriptor = allocate_event_queue()
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="what's up everyone?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False,
                                         True, False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with a stream message with stream_email_notify
        client_descriptor = allocate_event_queue()
        change_subscription_properties(user_profile, stream, sub,
                                       {'push_notifications': False,
                                        'email_notifications': True})
        self.assertTrue(client_descriptor.event_queue.empty())
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="what's up everyone?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False,
                                         False, True, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with stream message with stream_push_notify on
        # a muted topic, which we should not push notify for
        client_descriptor = allocate_event_queue()
        change_subscription_properties(user_profile, stream, sub,
                                       {'push_notifications': True,
                                        'email_notifications': False})

        self.assertTrue(client_descriptor.event_queue.empty())
        do_mute_topic(user_profile, stream, "mutingtest")
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="what's up everyone?", topic_name="mutingtest")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False, False,
                                         False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Test the hook with stream message with stream_email_notify on
        # a muted stream, which we should not push notify for
        client_descriptor = allocate_event_queue()
        change_subscription_properties(user_profile, stream, sub,
                                       {'push_notifications': False,
                                        'email_notifications': True})

        self.assertTrue(client_descriptor.event_queue.empty())
        change_subscription_properties(user_profile, stream, sub, {'is_muted': True})
        msg_id = self.send_stream_message(self.example_user("iago"), "Denmark",
                                          content="what's up everyone?")
        with mock.patch("zerver.tornado.event_queue.maybe_enqueue_notifications") as mock_enqueue:
            missedmessage_hook(user_profile.id, client_descriptor, True)
            mock_enqueue.assert_called_once()
            args_list = mock_enqueue.call_args_list[0][0]

            self.assertEqual(args_list, (user_profile.id, msg_id, False, False, False,
                                         False, False, "Denmark", False, True,
                                         {'email_notified': False, 'push_notified': False}))
        destroy_event_queue(client_descriptor.event_queue.id)

        # Clean up the state we just changed (not necessary unless we add more test code below)
        change_subscription_properties(user_profile, stream, sub,
                                       {'push_notifications': True,
                                        'is_muted': False})

class FileReloadLogicTest(ZulipTestCase):
    def test_persistent_queue_filename(self) -> None:
        with self.settings(JSON_PERSISTENT_QUEUE_FILENAME_PATTERN="/home/zulip/tornado/event_queues%s.json"):
            self.assertEqual(persistent_queue_filename(9800),
                             "/home/zulip/tornado/event_queues.json")
            self.assertEqual(persistent_queue_filename(9800, last=True),
                             "/home/zulip/tornado/event_queues.json.last")
        with self.settings(JSON_PERSISTENT_QUEUE_FILENAME_PATTERN="/home/zulip/tornado/event_queues%s.json",
                           TORNADO_PROCESSES=4):
            self.assertEqual(persistent_queue_filename(9800),
                             "/home/zulip/tornado/event_queues.9800.json")
            self.assertEqual(persistent_queue_filename(9800, last=True),
                             "/home/zulip/tornado/event_queues.9800.last.json")

class EventQueueTest(ZulipTestCase):
    def get_client_descriptor(self) -> ClientDescriptor:
        hamlet = self.example_user('hamlet')
        realm = hamlet.realm
        queue_data = dict(
            all_public_streams=False,
            apply_markdown=False,
            client_gravatar=True,
            client_type_name='website',
            event_types=None,
            last_connection_time=time.time(),
            queue_timeout=0,
            realm_id=realm.id,
            user_profile_id=hamlet.id,
        )

        client = allocate_client_descriptor(queue_data)
        return client

    def verify_to_dict_end_to_end(self, client: ClientDescriptor) -> None:
        client_dict = client.to_dict()
        new_client = ClientDescriptor.from_dict(client_dict)
        self.assertEqual(client.to_dict(), new_client.to_dict())

        client_dict = client.to_dict()
        del client_dict['event_queue']['newest_pruned_id']
        new_client = ClientDescriptor.from_dict(client_dict)
        self.assertEqual(client_dict, new_client.to_dict())

    def test_one_event(self) -> None:
        client = self.get_client_descriptor()
        queue = client.event_queue
        in_dict = dict(
            type="arbitrary",
            x="foo",
            y=42,
            z=False,
            timestamp="1",
        )
        out_dict = dict(
            id=0,
            **in_dict,
        )
        queue.push(in_dict)
        self.assertFalse(queue.empty())
        self.verify_to_dict_end_to_end(client)
        self.assertEqual(queue.contents(), [out_dict])
        self.verify_to_dict_end_to_end(client)

    def test_event_collapsing(self) -> None:
        client = self.get_client_descriptor()
        queue = client.event_queue

        '''
        The update_message_flags events are special, because
        they can be collapsed together.  Given two umfe's, we:
            * use the latest timestamp
            * concatenate the messages
        '''
        def umfe(timestamp: int, messages: List[int]) -> Dict[str, Any]:
            return dict(
                type='update_message_flags',
                operation='add',
                flag='read',
                all=False,
                timestamp=timestamp,
                messages=messages,
            )

        events = [
            umfe(timestamp=1, messages=[101]),
            umfe(timestamp=2, messages=[201, 202]),
            dict(type='unknown'),
            dict(type='restart', server_generation="1"),
            umfe(timestamp=3, messages=[301, 302, 303]),
            dict(type='restart', server_generation="2"),
            umfe(timestamp=4, messages=[401, 402, 403, 404]),
        ]

        for event in events:
            queue.push(event)

        self.verify_to_dict_end_to_end(client)

        self.assertEqual(queue.contents(), [
            dict(id=2, type='unknown'),
            dict(id=5, type='restart', server_generation="2"),
            dict(
                id=6,
                type='update_message_flags',
                operation='add',
                flag='read',
                all=False,
                timestamp=4,
                messages=[101, 201, 202, 301, 302, 303, 401, 402, 403, 404],
            ),
        ])

        '''
        Note that calling queue.contents() has the side
        effect that we will no longer be able to collapse
        the previous events, so the next event will just
        get added to the queue, rather than collapsed.
        '''
        queue.push(
            umfe(timestamp=5, messages=[501, 502, 503, 504, 505]),
        )
        self.assertEqual(queue.contents(), [
            dict(id=2, type='unknown'),
            dict(id=5, type='restart', server_generation="2"),
            dict(
                id=6,
                type='update_message_flags',
                operation='add',
                flag='read',
                all=False,
                timestamp=4,
                messages=[101, 201, 202, 301, 302, 303, 401, 402, 403, 404],
            ),
            dict(
                id=7,
                type='update_message_flags',
                operation='add',
                flag='read',
                all=False,
                timestamp=5,
                messages=[501, 502, 503, 504, 505],
            ),
        ])

    def test_flag_add_collapsing(self) -> None:
        client = self.get_client_descriptor()
        queue = client.event_queue
        queue.push({"type": "update_message_flags",
                    "flag": "read",
                    "operation": "add",
                    "all": False,
                    "messages": [1, 2, 3, 4],
                    "timestamp": "1"})
        self.verify_to_dict_end_to_end(client)
        queue.push({"type": "update_message_flags",
                    "flag": "read",
                    "all": False,
                    "operation": "add",
                    "messages": [5, 6],
                    "timestamp": "1"})
        self.verify_to_dict_end_to_end(client)
        self.assertEqual(queue.contents(),
                         [{'id': 1,
                           'type': 'update_message_flags',
                           "all": False,
                           "flag": "read",
                           "operation": "add",
                           "messages": [1, 2, 3, 4, 5, 6],
                           "timestamp": "1"}])
        self.verify_to_dict_end_to_end(client)

    def test_flag_remove_collapsing(self) -> None:
        client = self.get_client_descriptor()
        queue = client.event_queue
        queue.push({"type": "update_message_flags",
                    "flag": "collapsed",
                    "operation": "remove",
                    "all": False,
                    "messages": [1, 2, 3, 4],
                    "timestamp": "1"})
        self.verify_to_dict_end_to_end(client)
        queue.push({"type": "update_message_flags",
                    "flag": "collapsed",
                    "all": False,
                    "operation": "remove",
                    "messages": [5, 6],
                    "timestamp": "1"})
        self.verify_to_dict_end_to_end(client)
        self.assertEqual(queue.contents(),
                         [{'id': 1,
                           'type': 'update_message_flags',
                           "all": False,
                           "flag": "collapsed",
                           "operation": "remove",
                           "messages": [1, 2, 3, 4, 5, 6],
                           "timestamp": "1"}])
        self.verify_to_dict_end_to_end(client)

    def test_collapse_event(self) -> None:
        '''
        This mostly focues on the internals of
        how we store "virtual_events" that we
        can collapse if subsequent events are
        of the same form.  See the code in
        EventQueue.push for more context.
        '''
        client = self.get_client_descriptor()
        queue = client.event_queue
        queue.push({"type": "restart",
                    "server_generation": 1,
                    "timestamp": "1"})
        # Verify the server_generation event is stored as a virtual event
        self.assertEqual(queue.virtual_events,
                         {'restart':
                          {'id': 0,
                           'type': 'restart',
                           'server_generation': 1,
                           "timestamp": "1"}})
        # And we can reconstruct newest_pruned_id etc.
        self.verify_to_dict_end_to_end(client)

        queue.push({"type": "unknown",
                    "timestamp": "1"})
        self.assertEqual(list(queue.queue),
                         [{'id': 1,
                           'type': 'unknown',
                           "timestamp": "1"}])
        self.assertEqual(queue.virtual_events,
                         {'restart':
                          {'id': 0,
                           'type': 'restart',
                           'server_generation': 1,
                           "timestamp": "1"}})
        # And we can still reconstruct newest_pruned_id etc. correctly
        self.verify_to_dict_end_to_end(client)

        # Verify virtual events are converted to real events by .contents()
        self.assertEqual(queue.contents(),
                         [{'id': 0,
                           'type': 'restart',
                           "server_generation": 1,
                           "timestamp": "1"},
                          {'id': 1,
                           'type': 'unknown',
                           "timestamp": "1"}])

        # And now verify to_dict after pruning
        queue.prune(0)
        self.verify_to_dict_end_to_end(client)

        queue.prune(1)
        self.verify_to_dict_end_to_end(client)
