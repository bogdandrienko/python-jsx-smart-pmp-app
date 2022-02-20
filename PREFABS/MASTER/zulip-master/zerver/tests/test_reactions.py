from typing import Any, Dict, List, Mapping
from unittest import mock

import orjson
from django.http import HttpResponse

from zerver.lib.cache import cache_get, to_dict_cache_key_id
from zerver.lib.emoji import emoji_name_to_emoji_code
from zerver.lib.message import extract_message_dict
from zerver.lib.request import JsonableError
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import tornado_redirected_to_list, zulip_reaction_info
from zerver.models import Message, Reaction, RealmEmoji, UserMessage, get_realm


class ReactionEmojiTest(ZulipTestCase):
    def test_missing_emoji(self) -> None:
        """
        Sending reaction without emoji fails
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': '',
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assertEqual(result.status_code, 400)

    def test_add_invalid_emoji(self) -> None:
        """
        Sending invalid emoji fails
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'foo',
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_error(result, "Emoji 'foo' does not exist")

    def test_add_deactivated_realm_emoji(self) -> None:
        """
        Sending deactivated realm emoji fails.
        """
        emoji = RealmEmoji.objects.get(name="green_tick")
        emoji.deactivated = True
        emoji.save(update_fields=['deactivated'])
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'green_tick',
            'reaction_type': 'realm_emoji',
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_error(result, "Emoji 'green_tick' does not exist")

    def test_valid_emoji(self) -> None:
        """
        Reacting with valid emoji succeeds
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'smile',
        }

        base_query = Reaction.objects.filter(user_profile=sender,
                                             message=Message.objects.get(id=1),
                                             )
        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_success(result)
        self.assertEqual(200, result.status_code)
        self.assertTrue(base_query.filter(emoji_name=reaction_info['emoji_name']).exists())

        reaction_info['emoji_name'] = 'green_tick'
        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_success(result)
        self.assertEqual(200, result.status_code)
        self.assertTrue(base_query.filter(emoji_name=reaction_info['emoji_name']).exists())

    def test_cached_reaction_data(self) -> None:
        """
        Formatted reactions data is saved in cache.
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'smile',
        }
        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)

        self.assert_json_success(result)
        self.assertEqual(200, result.status_code)
        key = to_dict_cache_key_id(1)
        message = extract_message_dict(cache_get(key)[0])

        expected_reaction_data = [{
            'emoji_name': 'smile',
            'emoji_code': '1f642',
            'reaction_type': 'unicode_emoji',
            'user': {
                'email': 'user10@zulip.testserver',
                'id': 10,
                'full_name': 'King Hamlet',
            },
            'user_id': 10,
        }]
        self.assertEqual(expected_reaction_data, message['reactions'])

    def test_zulip_emoji(self) -> None:
        """
        Reacting with zulip emoji succeeds
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'zulip',
            'reaction_type': 'zulip_extra_emoji',
        }
        base_query = Reaction.objects.filter(user_profile=sender,
                                             emoji_name=reaction_info['emoji_name'])

        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_success(result)
        self.assertEqual(200, result.status_code)
        self.assertTrue(base_query.filter(message=Message.objects.get(id=1)).exists())

        reaction_info.pop('reaction_type')
        result = self.api_post(sender, '/api/v1/messages/2/reactions',
                               reaction_info)
        self.assert_json_success(result)
        self.assertEqual(200, result.status_code)
        self.assertTrue(base_query.filter(message=Message.objects.get(id=2)).exists())

    def test_valid_emoji_react_historical(self) -> None:
        """
        Reacting with valid emoji on a historical message succeeds
        """
        stream_name = "Saxony"
        self.subscribe(self.example_user("cordelia"), stream_name)
        message_id = self.send_stream_message(self.example_user("cordelia"), stream_name)

        user_profile = self.example_user('hamlet')
        sender = user_profile

        # Verify that hamlet did not receive the message.
        self.assertFalse(UserMessage.objects.filter(user_profile=user_profile,
                                                    message_id=message_id).exists())

        # Have hamlet react to the message
        reaction_info = {
            'emoji_name': 'smile',
        }

        result = self.api_post(sender, f'/api/v1/messages/{message_id}/reactions',
                               reaction_info)
        self.assert_json_success(result)

        # Fetch the now-created UserMessage object to confirm it exists and is historical
        user_message = UserMessage.objects.get(user_profile=user_profile, message_id=message_id)
        self.assertTrue(user_message.flags.historical)
        self.assertTrue(user_message.flags.read)
        self.assertFalse(user_message.flags.starred)

    def test_valid_realm_emoji(self) -> None:
        """
        Reacting with valid realm emoji succeeds
        """
        sender = self.example_user("hamlet")

        reaction_info = {
            'emoji_name': 'green_tick',
            'reaction_type': 'realm_emoji',
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions',
                               reaction_info)
        self.assert_json_success(result)

    def test_emoji_name_to_emoji_code(self) -> None:
        """
        An emoji name is mapped canonically to emoji code.
        """
        realm = get_realm('zulip')
        realm_emoji = RealmEmoji.objects.get(name="green_tick")

        # Test active realm emoji.
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'green_tick')
        self.assertEqual(emoji_code, str(realm_emoji.id))
        self.assertEqual(reaction_type, 'realm_emoji')

        # Test deactivated realm emoji.
        realm_emoji.deactivated = True
        realm_emoji.save(update_fields=['deactivated'])
        with self.assertRaises(JsonableError) as exc:
            emoji_name_to_emoji_code(realm, 'green_tick')
        self.assertEqual(str(exc.exception), "Emoji 'green_tick' does not exist")

        # Test ':zulip:' emoji.
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'zulip')
        self.assertEqual(emoji_code, 'zulip')
        self.assertEqual(reaction_type, 'zulip_extra_emoji')

        # Test Unicode emoji.
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'astonished')
        self.assertEqual(emoji_code, '1f632')
        self.assertEqual(reaction_type, 'unicode_emoji')

        # Test override Unicode emoji.
        overriding_emoji = RealmEmoji.objects.create(
            name='astonished', realm=realm, file_name='astonished')
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'astonished')
        self.assertEqual(emoji_code, str(overriding_emoji.id))
        self.assertEqual(reaction_type, 'realm_emoji')

        # Test deactivate over-ridding realm emoji.
        overriding_emoji.deactivated = True
        overriding_emoji.save(update_fields=['deactivated'])
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'astonished')
        self.assertEqual(emoji_code, '1f632')
        self.assertEqual(reaction_type, 'unicode_emoji')

        # Test override `:zulip:` emoji.
        overriding_emoji = RealmEmoji.objects.create(
            name='zulip', realm=realm, file_name='zulip')
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'zulip')
        self.assertEqual(emoji_code, str(overriding_emoji.id))
        self.assertEqual(reaction_type, 'realm_emoji')

        # Test non-existent emoji.
        with self.assertRaises(JsonableError) as exc:
            emoji_name_to_emoji_code(realm, 'invalid_emoji')
        self.assertEqual(str(exc.exception), "Emoji 'invalid_emoji' does not exist")

class ReactionMessageIDTest(ZulipTestCase):
    def test_missing_message_id(self) -> None:
        """
        Reacting without a message_id fails
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'smile',
        }

        result = self.api_post(sender, '/api/v1/messages//reactions',
                               reaction_info)
        self.assertEqual(result.status_code, 404)

    def test_invalid_message_id(self) -> None:
        """
        Reacting to an invalid message id fails
        """
        sender = self.example_user("hamlet")
        reaction_info = {
            'emoji_name': 'smile',
        }

        result = self.api_post(sender, '/api/v1/messages/-1/reactions',
                               reaction_info)
        self.assertEqual(result.status_code, 404)

    def test_inaccessible_message_id(self) -> None:
        """
        Reacting to a inaccessible (for instance, private) message fails
        """
        pm_sender = self.example_user("hamlet")
        pm_recipient = self.example_user("othello")
        reaction_sender = self.example_user("iago")

        result = self.api_post(pm_sender,
                               "/api/v1/messages", {"type": "private",
                                                    "content": "Test message",
                                                    "to": pm_recipient.email})
        self.assert_json_success(result)
        pm_id = result.json()['id']
        reaction_info = {
            'emoji_name': 'smile',
        }

        result = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                               reaction_info)
        self.assert_json_error(result, "Invalid message(s)")

class ReactionTest(ZulipTestCase):
    def test_add_existing_reaction(self) -> None:
        """
        Creating the same reaction twice fails
        """
        pm_sender = self.example_user("hamlet")
        pm_recipient = self.example_user("othello")
        reaction_sender = pm_recipient

        pm = self.api_post(pm_sender,
                           "/api/v1/messages", {"type": "private",
                                                "content": "Test message",
                                                "to": pm_recipient.email})
        self.assert_json_success(pm)
        content = orjson.loads(pm.content)

        pm_id = content['id']

        reaction_info = {
            'emoji_name': 'smile',
        }

        first = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                              reaction_info)
        self.assert_json_success(first)

        second = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                               reaction_info)
        self.assert_json_error(second, "Reaction already exists.")

    def test_remove_nonexisting_reaction(self) -> None:
        """
        Removing a reaction twice fails
        """
        pm_sender = self.example_user("hamlet")
        pm_recipient = self.example_user("othello")
        reaction_sender = pm_recipient

        pm = self.api_post(pm_sender,
                           "/api/v1/messages", {"type": "private",
                                                "content": "Test message",
                                                "to": pm_recipient.email})
        self.assert_json_success(pm)

        content = orjson.loads(pm.content)
        pm_id = content['id']
        reaction_info = {
            'emoji_name': 'smile',
        }

        add = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                            reaction_info)
        self.assert_json_success(add)

        first = self.api_delete(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                                reaction_info)
        self.assert_json_success(first)

        second = self.api_delete(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                                 reaction_info)
        self.assert_json_error(second, "Reaction doesn't exist.")

    def test_remove_existing_reaction_with_renamed_emoji(self) -> None:
        """
        Removes an old existing reaction but the name of emoji got changed during
        various emoji infra changes.
        """
        realm = get_realm('zulip')
        sender = self.example_user("hamlet")
        emoji_code, reaction_type = emoji_name_to_emoji_code(realm, 'smile')
        reaction_info = {
            'emoji_name': 'smile',
            'emoji_code': emoji_code,
            'reaction_type': reaction_type,
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions', reaction_info)
        self.assert_json_success(result)

        with mock.patch('zerver.lib.emoji.name_to_codepoint', name_to_codepoint={}):
            result = self.api_delete(sender, '/api/v1/messages/1/reactions', reaction_info)
            self.assert_json_success(result)

    def test_remove_existing_reaction_with_deactivated_realm_emoji(self) -> None:
        """
        Removes an old existing reaction but the realm emoji used there has been deactivated.
        """
        sender = self.example_user("hamlet")

        emoji = RealmEmoji.objects.get(name="green_tick")

        reaction_info = {
            'emoji_name': 'green_tick',
            'emoji_code': str(emoji.id),
            'reaction_type': 'realm_emoji',
        }

        result = self.api_post(sender, '/api/v1/messages/1/reactions', reaction_info)
        self.assert_json_success(result)

        # Deactivate realm emoji.
        emoji.deactivated = True
        emoji.save(update_fields=['deactivated'])
        result = self.api_delete(sender, '/api/v1/messages/1/reactions', reaction_info)
        self.assert_json_success(result)

class ReactionEventTest(ZulipTestCase):
    def test_add_event(self) -> None:
        """
        Recipients of the message receive the reaction event
        and event contains relevant data
        """
        pm_sender = self.example_user('hamlet')
        pm_recipient = self.example_user('othello')
        reaction_sender = pm_recipient

        result = self.api_post(pm_sender,
                               "/api/v1/messages", {"type": "private",
                                                    "content": "Test message",
                                                    "to": pm_recipient.email})
        self.assert_json_success(result)
        pm_id = result.json()['id']

        expected_recipient_ids = {pm_sender.id, pm_recipient.id}

        reaction_info = {
            'emoji_name': 'smile',
        }

        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                                   reaction_info)
        self.assert_json_success(result)
        self.assertEqual(len(events), 1)

        event = events[0]['event']
        event_user_ids = set(events[0]['users'])

        self.assertEqual(expected_recipient_ids, event_user_ids)
        self.assertEqual(event['user']['email'], reaction_sender.email)
        self.assertEqual(event['type'], 'reaction')
        self.assertEqual(event['op'], 'add')
        self.assertEqual(event['emoji_name'], 'smile')
        self.assertEqual(event['message_id'], pm_id)

    def test_remove_event(self) -> None:
        """
        Recipients of the message receive the reaction event
        and event contains relevant data
        """
        pm_sender = self.example_user('hamlet')
        pm_recipient = self.example_user('othello')
        reaction_sender = pm_recipient

        result = self.api_post(pm_sender,
                               "/api/v1/messages", {"type": "private",
                                                    "content": "Test message",
                                                    "to": pm_recipient.email})
        self.assert_json_success(result)
        content = result.json()
        pm_id = content['id']

        expected_recipient_ids = {pm_sender.id, pm_recipient.id}

        reaction_info = {
            'emoji_name': 'smile',
        }

        add = self.api_post(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                            reaction_info)
        self.assert_json_success(add)

        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.api_delete(reaction_sender, f'/api/v1/messages/{pm_id}/reactions',
                                     reaction_info)
        self.assert_json_success(result)
        self.assertEqual(len(events), 1)

        event = events[0]['event']
        event_user_ids = set(events[0]['users'])

        self.assertEqual(expected_recipient_ids, event_user_ids)
        self.assertEqual(event['user']['email'], reaction_sender.email)
        self.assertEqual(event['type'], 'reaction')
        self.assertEqual(event['op'], 'remove')
        self.assertEqual(event['emoji_name'], 'smile')
        self.assertEqual(event['message_id'], pm_id)

class EmojiReactionBase(ZulipTestCase):
    """Reusable testing functions for emoji reactions tests.  Be careful when
    changing this: It's used in test_retention.py as well."""

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)

    def post_reaction(self, reaction_info: Dict[str, str]) -> HttpResponse:
        message_id = 1

        result = self.api_post(
            self.example_user('hamlet'),
            f'/api/v1/messages/{message_id}/reactions',
            reaction_info
        )
        return result

    def post_other_reaction(self, reaction_info: Dict[str, str]) -> HttpResponse:
        message_id = 1

        result = self.api_post(
            self.example_user('AARON'),
            f'/api/v1/messages/{message_id}/reactions',
            reaction_info
        )
        return result

    def delete_reaction(self, reaction_info: Dict[str, str]) -> HttpResponse:
        message_id = 1

        result = self.api_delete(
            self.example_user('hamlet'),
            f'/api/v1/messages/{message_id}/reactions',
            reaction_info
        )
        return result

    def get_message_reactions(self, message_id: int, emoji_code: str,
                              reaction_type: str) -> List[Reaction]:
        message = Message.objects.get(id=message_id)
        reactions = Reaction.objects.filter(message=message,
                                            emoji_code=emoji_code,
                                            reaction_type=reaction_type)
        return list(reactions)

class DefaultEmojiReactionTests(EmojiReactionBase):
    def setUp(self) -> None:
        super().setUp()
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'hamburger',
            'emoji_code': '1f354',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_success(result)

    def test_add_default_emoji_reaction(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'thumbs_up',
            'emoji_code': '1f44d',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_success(result)

    def test_add_default_emoji_invalid_code(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'hamburger',
            'emoji_code': 'TBD',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid emoji code.')

    def test_add_default_emoji_invalid_name(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'non-existent',
            'emoji_code': '1f44d',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid emoji name.')

    def test_add_to_existing_renamed_default_emoji_reaction(self) -> None:
        hamlet = self.example_user('hamlet')
        message = Message.objects.get(id=1)
        reaction = Reaction.objects.create(user_profile=hamlet,
                                           message=message,
                                           emoji_name='old_name',
                                           emoji_code='1f603',
                                           reaction_type='unicode_emoji',
                                           )
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'smiley',
            'emoji_code': '1f603',
        }
        result = self.post_other_reaction(reaction_info)
        self.assert_json_success(result)

        reactions = self.get_message_reactions(1, '1f603', 'unicode_emoji')
        for reaction in reactions:
            self.assertEqual(reaction.emoji_name, 'old_name')

    def test_add_duplicate_reaction(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'non-existent',
            'emoji_code': '1f354',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Reaction already exists.')

    def test_add_reaction_by_name(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': '+1',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_success(result)
        hamlet = self.example_user('hamlet')
        message = Message.objects.get(id=1)
        self.assertTrue(
            Reaction.objects.filter(user_profile=hamlet,
                                    message=message,
                                    emoji_name=reaction_info['emoji_name'],
                                    emoji_code='1f44d',
                                    reaction_type='unicode_emoji').exists(),
        )

    def test_preserve_non_canonical_name(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': '+1',
            'emoji_code': '1f44d',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_success(result)

        reactions = self.get_message_reactions(1, '1f44d', 'unicode_emoji')
        for reaction in reactions:
            self.assertEqual(reaction.emoji_name, '+1')

    def test_reaction_name_collapse(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': '+1',
            'emoji_code': '1f44d',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_success(result)

        reaction_info['emoji_name'] = 'thumbs_up'
        result = self.post_other_reaction(reaction_info)
        self.assert_json_success(result)

        reactions = self.get_message_reactions(1, '1f44d', 'unicode_emoji')
        for reaction in reactions:
            self.assertEqual(reaction.emoji_name, '+1')

    def test_delete_default_emoji_reaction(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'hamburger',
            'emoji_code': '1f354',
        }
        result = self.delete_reaction(reaction_info)
        self.assert_json_success(result)

    def test_delete_insufficient_arguments_reaction(self) -> None:
        result = self.delete_reaction({})
        self.assert_json_error(result, 'At least one of the following '
                               'arguments must be present: emoji_name, '
                               'emoji_code')

    def test_delete_non_existing_emoji_reaction(self) -> None:
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'thumbs_up',
            'emoji_code': '1f44d',
        }
        result = self.delete_reaction(reaction_info)
        self.assert_json_error(result, "Reaction doesn't exist.")

    def test_delete_renamed_default_emoji(self) -> None:
        hamlet = self.example_user('hamlet')
        message = Message.objects.get(id=1)
        Reaction.objects.create(user_profile=hamlet,
                                message=message,
                                emoji_name='old_name',
                                emoji_code='1f44f',
                                reaction_type='unicode_emoji',
                                )

        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'new_name',
            'emoji_code': '1f44f',
        }
        result = self.delete_reaction(reaction_info)
        self.assert_json_success(result)

    def test_delete_reaction_by_name(self) -> None:
        hamlet = self.example_user('hamlet')
        message = Message.objects.get(id=1)
        Reaction.objects.create(user_profile=hamlet,
                                message=message,
                                emoji_name='+1',
                                emoji_code='1f44d',
                                reaction_type='unicode_emoji',
                                )

        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': '+1',
        }
        result = self.delete_reaction(reaction_info)
        self.assert_json_success(result)
        self.assertFalse(
            Reaction.objects.filter(user_profile=hamlet,
                                    message=message,
                                    emoji_name=reaction_info['emoji_name'],
                                    emoji_code='1f44d',
                                    reaction_type='unicode_emoji').exists(),
        )

    def test_react_historical(self) -> None:
        """
        Reacting with valid emoji on a historical message succeeds.
        """
        stream_name = "Saxony"
        self.subscribe(self.example_user("cordelia"), stream_name)
        message_id = self.send_stream_message(self.example_user("cordelia"), stream_name)

        user_profile = self.example_user('hamlet')

        # Verify that hamlet did not receive the message.
        self.assertFalse(UserMessage.objects.filter(user_profile=user_profile,
                                                    message_id=message_id).exists())

        # Have hamlet react to the message
        reaction_info = {
            'reaction_type': 'unicode_emoji',
            'emoji_name': 'hamburger',
            'emoji_code': '1f354',
        }

        result = self.api_post(
            user_profile,
            f'/api/v1/messages/{message_id}/reactions',
            reaction_info
        )
        self.assert_json_success(result)

        # Fetch the now-created UserMessage object to confirm it exists and is historical
        user_message = UserMessage.objects.get(user_profile=user_profile, message_id=message_id)
        self.assertTrue(user_message.flags.historical)
        self.assertTrue(user_message.flags.read)
        self.assertFalse(user_message.flags.starred)

class ZulipExtraEmojiReactionTest(EmojiReactionBase):
    def test_add_zulip_emoji_reaction(self) -> None:
        result = self.post_reaction(zulip_reaction_info())
        self.assert_json_success(result)

    def test_add_duplicate_zulip_reaction(self) -> None:
        result = self.post_reaction(zulip_reaction_info())
        self.assert_json_success(result)

        result = self.post_reaction(zulip_reaction_info())
        self.assert_json_error(result, 'Reaction already exists.')

    def test_add_invalid_extra_emoji(self) -> None:
        reaction_info = {
            'emoji_name': 'extra_emoji',
            'emoji_code': 'extra_emoji',
            'reaction_type': 'zulip_extra_emoji',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid emoji code.')

    def test_add_invalid_emoji_name(self) -> None:
        reaction_info = {
            'emoji_name': 'zulip_invalid',
            'emoji_code': 'zulip',
            'reaction_type': 'zulip_extra_emoji',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid emoji name.')

    def test_delete_zulip_emoji(self) -> None:
        result = self.post_reaction(zulip_reaction_info())
        self.assert_json_success(result)

        result = self.delete_reaction(zulip_reaction_info())
        self.assert_json_success(result)

    def test_delete_non_existent_zulip_reaction(self) -> None:
        result = self.delete_reaction(zulip_reaction_info())
        self.assert_json_error(result, "Reaction doesn't exist.")

class RealmEmojiReactionTests(EmojiReactionBase):
    def setUp(self) -> None:
        super().setUp()
        green_tick_emoji = RealmEmoji.objects.get(name="green_tick")
        self.default_reaction_info = {
            'reaction_type': 'realm_emoji',
            'emoji_name': 'green_tick',
            'emoji_code': str(green_tick_emoji.id),
        }

    def test_add_realm_emoji(self) -> None:
        result = self.post_reaction(self.default_reaction_info)
        self.assert_json_success(result)

    def test_add_realm_emoji_invalid_code(self) -> None:
        reaction_info = {
            'reaction_type': 'realm_emoji',
            'emoji_name': 'green_tick',
            'emoji_code': '9999',
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid custom emoji.')

    def test_add_realm_emoji_invalid_name(self) -> None:
        green_tick_emoji = RealmEmoji.objects.get(name="green_tick")
        reaction_info = {
            'reaction_type': 'realm_emoji',
            'emoji_name': 'bogus_name',
            'emoji_code': str(green_tick_emoji.id),
        }
        result = self.post_reaction(reaction_info)
        self.assert_json_error(result, 'Invalid custom emoji name.')

    def test_add_deactivated_realm_emoji(self) -> None:
        emoji = RealmEmoji.objects.get(name="green_tick")
        emoji.deactivated = True
        emoji.save(update_fields=['deactivated'])

        result = self.post_reaction(self.default_reaction_info)
        self.assert_json_error(result, 'This custom emoji has been deactivated.')

    def test_add_to_existing_deactivated_realm_emoji_reaction(self) -> None:
        result = self.post_reaction(self.default_reaction_info)
        self.assert_json_success(result)

        emoji = RealmEmoji.objects.get(name="green_tick")
        emoji.deactivated = True
        emoji.save(update_fields=['deactivated'])

        result = self.post_other_reaction(self.default_reaction_info)
        self.assert_json_success(result)

        reactions = self.get_message_reactions(1,
                                               self.default_reaction_info['emoji_code'],
                                               'realm_emoji')
        self.assertEqual(len(reactions), 2)

    def test_remove_realm_emoji_reaction(self) -> None:
        result = self.post_reaction(self.default_reaction_info)
        self.assert_json_success(result)

        result = self.delete_reaction(self.default_reaction_info)
        self.assert_json_success(result)

    def test_remove_deactivated_realm_emoji_reaction(self) -> None:
        result = self.post_reaction(self.default_reaction_info)
        self.assert_json_success(result)

        emoji = RealmEmoji.objects.get(name="green_tick")
        emoji.deactivated = True
        emoji.save(update_fields=['deactivated'])

        result = self.delete_reaction(self.default_reaction_info)
        self.assert_json_success(result)

    def test_remove_non_existent_realm_emoji_reaction(self) -> None:
        reaction_info = {
            'reaction_type': 'realm_emoji',
            'emoji_name': 'non_existent',
            'emoji_code': 'TBD',
        }
        result = self.delete_reaction(reaction_info)
        self.assert_json_error(result, "Reaction doesn't exist.")

    def test_invalid_reaction_type(self) -> None:
        reaction_info = {
            'emoji_name': 'zulip',
            'emoji_code': 'zulip',
            'reaction_type': 'nonexistent_emoji_type',
        }
        sender = self.example_user("hamlet")
        message_id = 1
        result = self.api_post(sender, f'/api/v1/messages/{message_id}/reactions',
                               reaction_info)
        self.assert_json_error(result, "Invalid emoji type.")

class ReactionAPIEventTest(EmojiReactionBase):
    def test_add_event(self) -> None:
        """
        Recipients of the message receive the reaction event
        and event contains relevant data
        """
        pm_sender = self.example_user('hamlet')
        pm_recipient = self.example_user('othello')
        reaction_sender = pm_recipient
        pm_id = self.send_personal_message(pm_sender, pm_recipient)
        expected_recipient_ids = {pm_sender.id, pm_recipient.id}
        reaction_info = {
            'emoji_name': 'hamburger',
            'emoji_code': '1f354',
            'reaction_type': 'unicode_emoji',
        }
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            self.api_post(
                reaction_sender,
                f'/api/v1/messages/{pm_id}/reactions',
                reaction_info
            )

        self.assertEqual(len(events), 1)

        event = events[0]['event']
        event_user_ids = set(events[0]['users'])

        self.assertEqual(expected_recipient_ids, event_user_ids)
        self.assertEqual(event['user']['user_id'], reaction_sender.id)
        self.assertEqual(event['user']['email'], reaction_sender.email)
        self.assertEqual(event['user']['full_name'], reaction_sender.full_name)
        self.assertEqual(event['type'], 'reaction')
        self.assertEqual(event['op'], 'add')
        self.assertEqual(event['message_id'], pm_id)
        self.assertEqual(event['emoji_name'], reaction_info['emoji_name'])
        self.assertEqual(event['emoji_code'], reaction_info['emoji_code'])
        self.assertEqual(event['reaction_type'], reaction_info['reaction_type'])

    def test_remove_event(self) -> None:
        """
        Recipients of the message receive the reaction event
        and event contains relevant data
        """
        pm_sender = self.example_user('hamlet')
        pm_recipient = self.example_user('othello')
        reaction_sender = pm_recipient
        pm_id = self.send_personal_message(pm_sender, pm_recipient)
        expected_recipient_ids = {pm_sender.id, pm_recipient.id}
        reaction_info = {
            'emoji_name': 'hamburger',
            'emoji_code': '1f354',
            'reaction_type': 'unicode_emoji',
        }
        add = self.api_post(
            reaction_sender,
            f'/api/v1/messages/{pm_id}/reactions',
            reaction_info,
        )
        self.assert_json_success(add)

        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.api_delete(
                reaction_sender,
                f'/api/v1/messages/{pm_id}/reactions',
                reaction_info,
            )

        self.assert_json_success(result)
        self.assertEqual(len(events), 1)

        event = events[0]['event']
        event_user_ids = set(events[0]['users'])

        self.assertEqual(expected_recipient_ids, event_user_ids)
        self.assertEqual(event['user']['user_id'], reaction_sender.id)
        self.assertEqual(event['user']['email'], reaction_sender.email)
        self.assertEqual(event['user']['full_name'], reaction_sender.full_name)
        self.assertEqual(event['type'], 'reaction')
        self.assertEqual(event['op'], 'remove')
        self.assertEqual(event['message_id'], pm_id)
        self.assertEqual(event['emoji_name'], reaction_info['emoji_name'])
        self.assertEqual(event['emoji_code'], reaction_info['emoji_code'])
        self.assertEqual(event['reaction_type'], reaction_info['reaction_type'])
