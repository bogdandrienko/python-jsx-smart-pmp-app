import datetime
from email.headerregistry import Address
from typing import Any, Dict, Iterable, List, Mapping, Optional, TypeVar, Union
from unittest import mock

import orjson
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.test import override_settings
from django.utils.timezone import now as timezone_now

from zerver.lib.actions import (
    create_users,
    do_change_can_create_users,
    do_change_user_role,
    do_create_user,
    do_deactivate_user,
    do_delete_user,
    do_invite_users,
    do_reactivate_user,
    do_set_realm_property,
    get_emails_from_user_ids,
    get_recipient_info,
)
from zerver.lib.avatar import avatar_url, get_gravatar_url
from zerver.lib.create_user import copy_user_settings
from zerver.lib.events import do_events_register
from zerver.lib.exceptions import JsonableError
from zerver.lib.send_email import clear_scheduled_emails, deliver_email, send_future_email
from zerver.lib.stream_topic import StreamTopicTarget
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import (
    cache_tries_captured,
    get_subscription,
    get_test_image_file,
    queries_captured,
    reset_emails_in_zulip_realm,
    simulated_empty_cache,
    tornado_redirected_to_list,
)
from zerver.lib.topic_mutes import add_topic_mute
from zerver.lib.upload import upload_avatar_image
from zerver.lib.users import access_user_by_id, get_accounts_for_email, user_ids_to_users
from zerver.models import (
    CustomProfileField,
    InvalidFakeEmailDomain,
    Message,
    PreregistrationUser,
    Realm,
    RealmDomain,
    Recipient,
    ScheduledEmail,
    Stream,
    Subscription,
    UserHotspot,
    UserProfile,
    check_valid_user_ids,
    get_client,
    get_fake_email_domain,
    get_realm,
    get_source_profile,
    get_stream,
    get_system_bot,
    get_user,
    get_user_by_delivery_email,
    get_user_by_id_in_realm_including_cross_realm,
)

K = TypeVar('K')
V = TypeVar('V')
def find_dict(lst: Iterable[Dict[K, V]], k: K, v: V) -> Dict[K, V]:
    for dct in lst:
        if dct[k] == v:
            return dct
    raise AssertionError(f'Cannot find element in list where key {k} == {v}')

class PermissionTest(ZulipTestCase):
    def test_role_setters(self) -> None:
        user_profile = self.example_user('hamlet')

        user_profile.is_realm_admin = True
        self.assertEqual(user_profile.is_realm_admin, True)
        self.assertEqual(user_profile.role, UserProfile.ROLE_REALM_ADMINISTRATOR)

        user_profile.is_guest = False
        self.assertEqual(user_profile.is_guest, False)
        self.assertEqual(user_profile.role, UserProfile.ROLE_REALM_ADMINISTRATOR)

        user_profile.is_realm_admin = False
        self.assertEqual(user_profile.is_realm_admin, False)
        self.assertEqual(user_profile.role, UserProfile.ROLE_MEMBER)

        user_profile.is_guest = True
        self.assertEqual(user_profile.is_guest, True)
        self.assertEqual(user_profile.role, UserProfile.ROLE_GUEST)

        user_profile.is_realm_admin = False
        self.assertEqual(user_profile.is_guest, True)
        self.assertEqual(user_profile.role, UserProfile.ROLE_GUEST)

        user_profile.is_guest = False
        self.assertEqual(user_profile.is_guest, False)
        self.assertEqual(user_profile.role, UserProfile.ROLE_MEMBER)

    def test_get_admin_users(self) -> None:
        user_profile = self.example_user('hamlet')
        do_change_user_role(user_profile, UserProfile.ROLE_MEMBER)
        self.assertFalse(user_profile.is_realm_owner)
        admin_users = user_profile.realm.get_human_admin_users()
        self.assertFalse(user_profile in admin_users)
        admin_users = user_profile.realm.get_admin_users_and_bots()
        self.assertFalse(user_profile in admin_users)

        do_change_user_role(user_profile, UserProfile.ROLE_REALM_ADMINISTRATOR)
        self.assertFalse(user_profile.is_realm_owner)
        admin_users = user_profile.realm.get_human_admin_users()
        self.assertTrue(user_profile in admin_users)
        admin_users = user_profile.realm.get_admin_users_and_bots()
        self.assertTrue(user_profile in admin_users)

        do_change_user_role(user_profile, UserProfile.ROLE_REALM_OWNER)
        self.assertTrue(user_profile.is_realm_owner)
        admin_users = user_profile.realm.get_human_admin_users()
        self.assertTrue(user_profile in admin_users)
        admin_users = user_profile.realm.get_admin_users_and_bots()
        self.assertTrue(user_profile in admin_users)

    def test_updating_non_existent_user(self) -> None:
        self.login('hamlet')
        admin = self.example_user('hamlet')
        do_change_user_role(admin, UserProfile.ROLE_REALM_ADMINISTRATOR)

        invalid_user_id = 1000
        result = self.client_patch(f'/json/users/{invalid_user_id}', {})
        self.assert_json_error(result, 'No such user')

    def test_owner_api(self) -> None:
        self.login('iago')

        desdemona = self.example_user('desdemona')
        othello = self.example_user('othello')
        iago = self.example_user('iago')
        realm = iago.realm

        do_change_user_role(iago, UserProfile.ROLE_REALM_OWNER)

        result = self.client_get('/json/users')
        self.assert_json_success(result)
        members = result.json()['members']
        iago_dict = find_dict(members, 'email', iago.email)
        self.assertTrue(iago_dict['is_owner'])
        othello_dict = find_dict(members, 'email', othello.email)
        self.assertFalse(othello_dict['is_owner'])

        req = dict(role=UserProfile.ROLE_REALM_OWNER)
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{othello.id}', req)
        self.assert_json_success(result)
        owner_users = realm.get_human_owner_users()
        self.assertTrue(othello in owner_users)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], othello.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_OWNER)

        req = dict(role=UserProfile.ROLE_MEMBER)
        events = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{othello.id}', req)
        self.assert_json_success(result)
        owner_users = realm.get_human_owner_users()
        self.assertFalse(othello in owner_users)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], othello.id)
        self.assertEqual(person['role'], UserProfile.ROLE_MEMBER)

        # Cannot take away from last owner
        self.login('desdemona')
        req = dict(role=UserProfile.ROLE_MEMBER)
        events = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{iago.id}', req)
        self.assert_json_success(result)
        owner_users = realm.get_human_owner_users()
        self.assertFalse(iago in owner_users)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], iago.id)
        self.assertEqual(person['role'], UserProfile.ROLE_MEMBER)
        with tornado_redirected_to_list([]):
            result = self.client_patch(f'/json/users/{desdemona.id}', req)
        self.assert_json_error(result, 'The owner permission cannot be removed from the only organization owner.')

        do_change_user_role(iago, UserProfile.ROLE_REALM_ADMINISTRATOR)
        self.login('iago')
        with tornado_redirected_to_list([]):
            result = self.client_patch(f'/json/users/{desdemona.id}', req)
        self.assert_json_error(result, 'Must be an organization owner')

    def test_admin_api(self) -> None:
        self.login('desdemona')

        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        desdemona = self.example_user('desdemona')
        realm = hamlet.realm

        # Make sure we see is_admin flag in /json/users
        result = self.client_get('/json/users')
        self.assert_json_success(result)
        members = result.json()['members']
        desdemona_dict = find_dict(members, 'email', desdemona.email)
        self.assertTrue(desdemona_dict['is_admin'])
        othello_dict = find_dict(members, 'email', othello.email)
        self.assertFalse(othello_dict['is_admin'])

        # Giveth
        req = dict(role=orjson.dumps(UserProfile.ROLE_REALM_ADMINISTRATOR).decode())

        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{othello.id}', req)
        self.assert_json_success(result)
        admin_users = realm.get_human_admin_users()
        self.assertTrue(othello in admin_users)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], othello.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_ADMINISTRATOR)

        # Taketh away
        req = dict(role=orjson.dumps(UserProfile.ROLE_MEMBER).decode())
        events = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{othello.id}', req)
        self.assert_json_success(result)
        admin_users = realm.get_human_admin_users()
        self.assertFalse(othello in admin_users)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], othello.id)
        self.assertEqual(person['role'], UserProfile.ROLE_MEMBER)

        # Make sure only admins can patch other user's info.
        self.login('othello')
        result = self.client_patch(f'/json/users/{hamlet.id}', req)
        self.assert_json_error(result, 'Insufficient permission')

    def test_admin_api_hide_emails(self) -> None:
        reset_emails_in_zulip_realm()

        user = self.example_user('hamlet')
        admin = self.example_user('iago')
        self.login_user(user)

        # First, verify client_gravatar works normally
        result = self.client_get("/json/users", {"client_gravatar": "true"})
        self.assert_json_success(result)
        members = result.json()['members']
        hamlet = find_dict(members, 'user_id', user.id)
        self.assertEqual(hamlet['email'], user.email)
        self.assertIsNone(hamlet['avatar_url'])
        self.assertNotIn('delivery_email', hamlet)

        # Also verify the /events code path.  This is a bit hacky, but
        # we need to verify client_gravatar is not being overridden.
        with mock.patch('zerver.lib.events.request_event_queue',
                        return_value=None) as mock_request_event_queue:
            with self.assertRaises(JsonableError):
                result = do_events_register(user, get_client("website"),
                                            client_gravatar=True)
            self.assertEqual(mock_request_event_queue.call_args_list[0][0][3],
                             True)

        #############################################################
        # Now, switch email address visibility, check client_gravatar
        # is automatically disabled for the user.
        do_set_realm_property(user.realm, "email_address_visibility",
                              Realm.EMAIL_ADDRESS_VISIBILITY_ADMINS)
        result = self.client_get("/json/users", {"client_gravatar": "true"})
        self.assert_json_success(result)
        members = result.json()['members']
        hamlet = find_dict(members, 'user_id', user.id)
        self.assertEqual(hamlet['email'], f"user{user.id}@zulip.testserver")
        # Note that the Gravatar URL should still be computed from the
        # `delivery_email`; otherwise, we won't be able to serve the
        # user's Gravatar.
        self.assertEqual(hamlet['avatar_url'], get_gravatar_url(user.delivery_email, 1))
        self.assertNotIn('delivery_email', hamlet)

        # Also verify the /events code path.  This is a bit hacky, but
        # basically we want to verify client_gravatar is being
        # overridden.
        with mock.patch('zerver.lib.events.request_event_queue',
                        return_value=None) as mock_request_event_queue:
            with self.assertRaises(JsonableError):
                result = do_events_register(user, get_client("website"),
                                            client_gravatar=True)
            self.assertEqual(mock_request_event_queue.call_args_list[0][0][3],
                             False)

        # client_gravatar is still turned off for admins.  In theory,
        # it doesn't need to be, but client-side changes would be
        # required in apps like the mobile apps.
        # delivery_email is sent for admins.
        admin.refresh_from_db()
        self.login_user(admin)
        result = self.client_get("/json/users", {"client_gravatar": "true"})
        self.assert_json_success(result)
        members = result.json()['members']
        hamlet = find_dict(members, 'user_id', user.id)
        self.assertEqual(hamlet['email'], f"user{user.id}@zulip.testserver")
        self.assertEqual(hamlet['avatar_url'], get_gravatar_url(user.email, 1))
        self.assertEqual(hamlet['delivery_email'], self.example_email("hamlet"))

    def test_user_cannot_promote_to_admin(self) -> None:
        self.login('hamlet')
        req = dict(role=orjson.dumps(UserProfile.ROLE_REALM_ADMINISTRATOR).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Insufficient permission')

    def test_admin_user_can_change_full_name(self) -> None:
        new_name = 'new name'
        self.login('iago')
        hamlet = self.example_user('hamlet')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch(f'/json/users/{hamlet.id}', req)
        self.assert_json_success(result)
        hamlet = self.example_user('hamlet')
        self.assertEqual(hamlet.full_name, new_name)

    def test_non_admin_cannot_change_full_name(self) -> None:
        self.login('hamlet')
        req = dict(full_name=orjson.dumps('new name').decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('othello').id), req)
        self.assert_json_error(result, 'Insufficient permission')

    def test_admin_cannot_set_long_full_name(self) -> None:
        new_name = 'a' * (UserProfile.MAX_NAME_LENGTH + 1)
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Name too long!')

    def test_admin_cannot_set_short_full_name(self) -> None:
        new_name = 'a'
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Name too short!')

    def test_not_allowed_format(self) -> None:
        # Name of format "Alice|999" breaks in Markdown
        new_name = 'iago|72'
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Invalid format!')

    def test_allowed_format_complex(self) -> None:
        # Adding characters after r'|d+' doesn't break Markdown
        new_name = 'Hello- 12iago|72k'
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_success(result)

    def test_not_allowed_format_complex(self) -> None:
        new_name = 'Hello- 12iago|72'
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Invalid format!')

    def test_admin_cannot_set_full_name_with_invalid_characters(self) -> None:
        new_name = 'Opheli*'
        self.login('iago')
        req = dict(full_name=orjson.dumps(new_name).decode())
        result = self.client_patch('/json/users/{}'.format(self.example_user('hamlet').id), req)
        self.assert_json_error(result, 'Invalid characters in name!')

    def test_access_user_by_id(self) -> None:
        iago = self.example_user("iago")

        # Must be a valid user ID in the realm
        with self.assertRaises(JsonableError):
            access_user_by_id(iago, 1234, for_admin=False)
        with self.assertRaises(JsonableError):
            access_user_by_id(iago, self.mit_user("sipbtest").id, for_admin=False)

        # Can only access bot users if allow_bots is passed
        bot = self.example_user("default_bot")
        access_user_by_id(iago, bot.id, allow_bots=True, for_admin=True)
        with self.assertRaises(JsonableError):
            access_user_by_id(iago, bot.id, for_admin=True)

        # Can only access deactivated users if allow_deactivated is passed
        hamlet = self.example_user("hamlet")
        do_deactivate_user(hamlet)
        with self.assertRaises(JsonableError):
            access_user_by_id(iago, hamlet.id, for_admin=False)
        with self.assertRaises(JsonableError):
            access_user_by_id(iago, hamlet.id, for_admin=True)
        access_user_by_id(iago, hamlet.id, allow_deactivated=True, for_admin=True)

        # Non-admin user can't admin another user
        with self.assertRaises(JsonableError):
            access_user_by_id(self.example_user("cordelia"), self.example_user("aaron").id, for_admin=True)
        # But does have read-only access to it.
        access_user_by_id(self.example_user("cordelia"), self.example_user("aaron").id, for_admin=False)

    def test_change_regular_member_to_guest(self) -> None:
        iago = self.example_user("iago")
        self.login_user(iago)

        hamlet = self.example_user("hamlet")
        self.assertFalse(hamlet.is_guest)

        req = dict(role=orjson.dumps(UserProfile.ROLE_GUEST).decode())
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{hamlet.id}', req)
        self.assert_json_success(result)

        hamlet = self.example_user("hamlet")
        self.assertTrue(hamlet.is_guest)
        self.assertFalse(hamlet.can_access_all_realm_members())
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], hamlet.id)
        self.assertTrue(person['role'], UserProfile.ROLE_GUEST)

    def test_change_guest_to_regular_member(self) -> None:
        iago = self.example_user("iago")
        self.login_user(iago)

        polonius = self.example_user("polonius")
        self.assertTrue(polonius.is_guest)
        req = dict(role=orjson.dumps(UserProfile.ROLE_MEMBER).decode())
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{polonius.id}', req)
        self.assert_json_success(result)

        polonius = self.example_user("polonius")
        self.assertFalse(polonius.is_guest)
        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], polonius.id)
        self.assertEqual(person['role'], UserProfile.ROLE_MEMBER)

    def test_change_admin_to_guest(self) -> None:
        iago = self.example_user("iago")
        self.login_user(iago)
        hamlet = self.example_user("hamlet")
        do_change_user_role(hamlet, UserProfile.ROLE_REALM_ADMINISTRATOR)
        self.assertFalse(hamlet.is_guest)
        self.assertTrue(hamlet.is_realm_admin)

        # Test changing a user from admin to guest and revoking admin status
        hamlet = self.example_user("hamlet")
        self.assertFalse(hamlet.is_guest)
        req = dict(role=orjson.dumps(UserProfile.ROLE_GUEST).decode())
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{hamlet.id}', req)
        self.assert_json_success(result)

        hamlet = self.example_user("hamlet")
        self.assertTrue(hamlet.is_guest)
        self.assertFalse(hamlet.is_realm_admin)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], hamlet.id)
        self.assertEqual(person['role'], UserProfile.ROLE_GUEST)

    def test_change_guest_to_admin(self) -> None:
        iago = self.example_user("iago")
        self.login_user(iago)
        polonius = self.example_user("polonius")
        self.assertTrue(polonius.is_guest)
        self.assertFalse(polonius.is_realm_admin)

        # Test changing a user from guest to admin and revoking guest status
        polonius = self.example_user("polonius")
        self.assertFalse(polonius.is_realm_admin)
        req = dict(role=orjson.dumps(UserProfile.ROLE_REALM_ADMINISTRATOR).decode())
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{polonius.id}', req)
        self.assert_json_success(result)

        polonius = self.example_user("polonius")
        self.assertFalse(polonius.is_guest)
        self.assertTrue(polonius.is_realm_admin)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], polonius.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_ADMINISTRATOR)

    def test_change_owner_to_guest(self) -> None:
        self.login("desdemona")
        iago = self.example_user("iago")
        do_change_user_role(iago, UserProfile.ROLE_REALM_OWNER)
        self.assertFalse(iago.is_guest)
        self.assertTrue(iago.is_realm_owner)

        # Test changing a user from owner to guest and revoking owner status
        iago = self.example_user("iago")
        self.assertFalse(iago.is_guest)
        req = dict(role=UserProfile.ROLE_GUEST)
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{iago.id}', req)
        self.assert_json_success(result)

        iago = self.example_user("iago")
        self.assertTrue(iago.is_guest)
        self.assertFalse(iago.is_realm_owner)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], iago.id)
        self.assertEqual(person['role'], UserProfile.ROLE_GUEST)

    def test_change_guest_to_owner(self) -> None:
        desdemona = self.example_user("desdemona")
        self.login_user(desdemona)
        polonius = self.example_user("polonius")
        self.assertTrue(polonius.is_guest)
        self.assertFalse(polonius.is_realm_owner)

        # Test changing a user from guest to admin and revoking guest status
        polonius = self.example_user("polonius")
        self.assertFalse(polonius.is_realm_owner)
        req = dict(role=UserProfile.ROLE_REALM_OWNER)
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{polonius.id}', req)
        self.assert_json_success(result)

        polonius = self.example_user("polonius")
        self.assertFalse(polonius.is_guest)
        self.assertTrue(polonius.is_realm_owner)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], polonius.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_OWNER)

    def test_change_admin_to_owner(self) -> None:
        desdemona = self.example_user("desdemona")
        self.login_user(desdemona)
        iago = self.example_user("iago")
        self.assertTrue(iago.is_realm_admin)
        self.assertFalse(iago.is_realm_owner)

        # Test changing a user from admin to owner and revoking admin status
        iago = self.example_user("iago")
        self.assertFalse(iago.is_realm_owner)
        req = dict(role=UserProfile.ROLE_REALM_OWNER)
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{iago.id}', req)
        self.assert_json_success(result)

        iago = self.example_user("iago")
        self.assertTrue(iago.is_realm_owner)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], iago.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_OWNER)

    def test_change_owner_to_admin(self) -> None:
        desdemona = self.example_user("desdemona")
        self.login_user(desdemona)
        iago = self.example_user("iago")
        do_change_user_role(iago, UserProfile.ROLE_REALM_OWNER)
        self.assertTrue(iago.is_realm_owner)

        # Test changing a user from admin to owner and revoking admin status
        iago = self.example_user("iago")
        self.assertTrue(iago.is_realm_owner)
        req = dict(role=UserProfile.ROLE_REALM_ADMINISTRATOR)
        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            result = self.client_patch(f'/json/users/{iago.id}', req)
        self.assert_json_success(result)

        iago = self.example_user("iago")
        self.assertFalse(iago.is_realm_owner)

        person = events[0]['event']['person']
        self.assertEqual(person['user_id'], iago.id)
        self.assertEqual(person['role'], UserProfile.ROLE_REALM_ADMINISTRATOR)

    def test_admin_user_can_change_profile_data(self) -> None:
        realm = get_realm('zulip')
        self.login('iago')
        new_profile_data = []
        cordelia = self.example_user("cordelia")

        # Test for all type of data
        fields = {
            'Phone number': 'short text data',
            'Biography': 'long text data',
            'Favorite food': 'short text data',
            'Favorite editor': 'vim',
            'Birthday': '1909-03-05',
            'Favorite website': 'https://zulip.com',
            'Mentor': [cordelia.id],
            'GitHub': 'timabbott',
        }

        for field_name in fields:
            field = CustomProfileField.objects.get(name=field_name, realm=realm)
            new_profile_data.append({
                'id': field.id,
                'value': fields[field_name],
            })

        result = self.client_patch(f'/json/users/{cordelia.id}',
                                   {'profile_data': orjson.dumps(new_profile_data).decode()})
        self.assert_json_success(result)

        cordelia = self.example_user("cordelia")
        for field_dict in cordelia.profile_data:
            with self.subTest(field_name=field_dict['name']):
                self.assertEqual(field_dict['value'], fields[field_dict['name']])

        # Test admin user cannot set invalid profile data
        invalid_fields = [
            ('Favorite editor', 'invalid choice', "'invalid choice' is not a valid choice for 'Favorite editor'."),
            ('Birthday', '1909-34-55', "Birthday is not a date"),
            ('Favorite website', 'not url', "Favorite website is not a URL"),
            ('Mentor', "not list of user ids", "User IDs is not a list"),
        ]

        for field_name, field_value, error_msg in invalid_fields:
            new_profile_data = []
            field = CustomProfileField.objects.get(name=field_name, realm=realm)
            new_profile_data.append({
                'id': field.id,
                'value': field_value,
            })

            result = self.client_patch(f'/json/users/{cordelia.id}',
                                       {'profile_data': orjson.dumps(new_profile_data).decode()})
            self.assert_json_error(result, error_msg)

        # non-existent field and no data
        invalid_profile_data = [{
            'id': 9001,
            'value': '',
        }]
        result = self.client_patch(f'/json/users/{cordelia.id}',
                                   {'profile_data': orjson.dumps(invalid_profile_data).decode()})
        self.assert_json_error(result, 'Field id 9001 not found.')

        # non-existent field and data
        invalid_profile_data = [{
            'id': 9001,
            'value': 'some data',
        }]
        result = self.client_patch(f'/json/users/{cordelia.id}',
                                   {'profile_data': orjson.dumps(invalid_profile_data).decode()})
        self.assert_json_error(result, 'Field id 9001 not found.')

        # Test for clearing/resetting field values.
        empty_profile_data = []
        for field_name in fields:
            field = CustomProfileField.objects.get(name=field_name, realm=realm)
            value: Union[str, None, List[Any]] = ''
            if field.field_type == CustomProfileField.USER:
                value = []
            empty_profile_data.append({
                'id': field.id,
                'value': value,
            })
        result = self.client_patch(f'/json/users/{cordelia.id}',
                                   {'profile_data': orjson.dumps(empty_profile_data).decode()})
        self.assert_json_success(result)
        for field_dict in cordelia.profile_data:
            with self.subTest(field_name=field_dict['name']):
                self.assertEqual(field_dict['value'], None)

        # Test adding some of the field values after removing all.
        hamlet = self.example_user("hamlet")
        new_fields = {
            'Phone number': None,
            'Biography': 'A test user',
            'Favorite food': None,
            'Favorite editor': None,
            'Birthday': None,
            'Favorite website': 'https://zulip.github.io',
            'Mentor': [hamlet.id],
            'GitHub': 'timabbott',
        }
        new_profile_data = []
        for field_name in fields:
            field = CustomProfileField.objects.get(name=field_name, realm=realm)
            value = None
            if new_fields[field_name]:
                value = new_fields[field_name]
            new_profile_data.append({
                'id': field.id,
                'value': value,
            })
        result = self.client_patch(f'/json/users/{cordelia.id}',
                                   {'profile_data': orjson.dumps(new_profile_data).decode()})
        self.assert_json_success(result)
        for field_dict in cordelia.profile_data:
            with self.subTest(field_name=field_dict['name']):
                self.assertEqual(field_dict['value'], new_fields[str(field_dict['name'])])

    def test_non_admin_user_cannot_change_profile_data(self) -> None:
        self.login('cordelia')
        hamlet = self.example_user("hamlet")
        realm = get_realm("zulip")

        new_profile_data = []
        field = CustomProfileField.objects.get(name="Biography", realm=realm)
        new_profile_data.append({
            'id': field.id,
            'value': "New hamlet Biography",
        })
        result = self.client_patch(f'/json/users/{hamlet.id}',
                                   {'profile_data': orjson.dumps(new_profile_data).decode()})
        self.assert_json_error(result, 'Insufficient permission')

        result = self.client_patch('/json/users/{}'.format(self.example_user("cordelia").id),
                                   {'profile_data': orjson.dumps(new_profile_data).decode()})
        self.assert_json_error(result, 'Insufficient permission')

class QueryCountTest(ZulipTestCase):
    def test_create_user_with_multiple_streams(self) -> None:
        # add_new_user_history needs messages to be current
        Message.objects.all().update(date_sent=timezone_now())

        ContentType.objects.clear_cache()

        # This just focuses on making sure we don't too many
        # queries/cache tries or send too many events.
        realm = get_realm("zulip")

        self.make_stream("private_stream1", invite_only=True)
        self.make_stream("private_stream2", invite_only=True)

        stream_names = [
            "Denmark",
            "Scotland",
            "Verona",
            "private_stream1",
            "private_stream2",
        ]
        streams = [
            get_stream(stream_name, realm)
            for stream_name in stream_names
        ]

        do_invite_users(
            user_profile=self.example_user("hamlet"),
            invitee_emails=["fred@zulip.com"],
            streams=streams,
        )

        prereg_user = PreregistrationUser.objects.get(email="fred@zulip.com")

        events: List[Mapping[str, Any]] = []

        with queries_captured() as queries:
            with cache_tries_captured() as cache_tries:
                with tornado_redirected_to_list(events):
                    fred = do_create_user(
                        email="fred@zulip.com",
                        password="password",
                        realm=realm,
                        full_name="Fred Flintstone",
                        prereg_user=prereg_user,
                    )

        self.assert_length(queries, 68)
        self.assert_length(cache_tries, 20)
        self.assert_length(events, 7)

        peer_add_events = [event for event in events if event["event"].get("op") == "peer_add"]

        notifications = set()
        for event in peer_add_events:
            stream_ids = event["event"]["stream_ids"]
            stream_names = sorted(
                Stream.objects.get(id=stream_id).name
                for stream_id in stream_ids
            )
            self.assertTrue(event["event"]["user_ids"], {fred.id})
            notifications.add(",".join(stream_names))

        self.assertEqual(notifications, {"Denmark,Scotland,Verona", "private_stream1", "private_stream2"})

class BulkCreateUserTest(ZulipTestCase):
    def test_create_users(self) -> None:
        realm = get_realm('zulip')
        realm.email_address_visibility = Realm.EMAIL_ADDRESS_VISIBILITY_ADMINS
        realm.save()

        name_list = [
            ('Fred Flintstone', 'fred@zulip.com'),
            ('Lisa Simpson', 'lisa@zulip.com'),
        ]

        create_users(realm, name_list)

        fred = get_user_by_delivery_email('fred@zulip.com', realm)
        self.assertEqual(
            fred.email,
            f'user{fred.id}@zulip.testserver',
        )

        lisa = get_user_by_delivery_email('lisa@zulip.com', realm)
        self.assertEqual(lisa.full_name, 'Lisa Simpson')
        self.assertEqual(lisa.is_bot, False)
        self.assertEqual(lisa.bot_type, None)

        realm.email_address_visibility = Realm.EMAIL_ADDRESS_VISIBILITY_EVERYONE
        realm.save()

        name_list = [
            ('Bono', 'bono@zulip.com'),
            ('Cher', 'cher@zulip.com'),
        ]

        create_users(realm, name_list)
        bono = get_user_by_delivery_email('bono@zulip.com', realm)
        self.assertEqual(bono.email, 'bono@zulip.com')
        self.assertEqual(bono.delivery_email, 'bono@zulip.com')

        cher = get_user_by_delivery_email('cher@zulip.com', realm)
        self.assertEqual(cher.full_name, 'Cher')

class AdminCreateUserTest(ZulipTestCase):
    def test_create_user_backend(self) -> None:

        # This test should give us complete coverage on
        # create_user_backend.  It mostly exercises error
        # conditions, and it also does a basic test of the success
        # path.

        admin = self.example_user('hamlet')
        realm = admin.realm
        self.login_user(admin)
        do_change_user_role(admin, UserProfile.ROLE_REALM_ADMINISTRATOR)
        valid_params = dict(
            email='romeo@zulip.net',
            password='xxxx',
            full_name='Romeo Montague',
        )

        self.assertEqual(admin.can_create_users, False)
        result = self.client_post("/json/users", valid_params)
        self.assert_json_error(result, "User not authorized for this query")

        do_change_can_create_users(admin, True)
        # can_create_users is insufficient without being a realm administrator:
        do_change_user_role(admin, UserProfile.ROLE_MEMBER)
        result = self.client_post("/json/users", valid_params)
        self.assert_json_error(result, "Must be an organization administrator")

        do_change_user_role(admin, UserProfile.ROLE_REALM_ADMINISTRATOR)

        result = self.client_post("/json/users", {})
        self.assert_json_error(result, "Missing 'email' argument")

        result = self.client_post("/json/users", dict(
            email='romeo@not-zulip.com',
        ))
        self.assert_json_error(result, "Missing 'password' argument")

        result = self.client_post("/json/users", dict(
            email='romeo@not-zulip.com',
            password='xxxx',
        ))
        self.assert_json_error(result, "Missing 'full_name' argument")

        # Test short_name gets properly ignored
        result = self.client_post("/json/users", dict(
            email='romeo@zulip.com',
            password='xxxx',
            full_name='Romeo Montague',
            short_name='DEPRECATED'
        ))
        self.assert_json_success(result)

        result = self.client_post("/json/users", dict(
            email='broken',
            password='xxxx',
            full_name='Romeo Montague',
        ))
        self.assert_json_error(result, "Bad name or username")

        do_set_realm_property(realm, 'emails_restricted_to_domains', True)
        result = self.client_post("/json/users", dict(
            email='romeo@not-zulip.com',
            password='xxxx',
            full_name='Romeo Montague',
        ))
        self.assert_json_error(result,
                               "Email 'romeo@not-zulip.com' not allowed in this organization")

        RealmDomain.objects.create(realm=get_realm('zulip'), domain='zulip.net')
        # Check can't use a bad password with zxcvbn enabled
        with self.settings(PASSWORD_MIN_LENGTH=6, PASSWORD_MIN_GUESSES=1000):
            result = self.client_post("/json/users", valid_params)
            self.assert_json_error(result, "The password is too weak.")

        result = self.client_post("/json/users", valid_params)
        self.assert_json_success(result)

        # Romeo is a newly registered user
        new_user = get_user_by_delivery_email('romeo@zulip.net', get_realm('zulip'))
        result = orjson.loads(result.content)
        self.assertEqual(new_user.full_name, 'Romeo Montague')
        self.assertEqual(new_user.id, result['user_id'])

        # Make sure the recipient field is set correctly.
        self.assertEqual(new_user.recipient, Recipient.objects.get(type=Recipient.PERSONAL,
                                                                   type_id=new_user.id))

        # we can't create the same user twice.
        result = self.client_post("/json/users", valid_params)
        self.assert_json_error(result,
                               "Email 'romeo@zulip.net' already in use")

        # Don't allow user to sign up with disposable email.
        realm.emails_restricted_to_domains = False
        realm.disallow_disposable_email_addresses = True
        realm.save()

        valid_params["email"] = "abc@mailnator.com"
        result = self.client_post("/json/users", valid_params)
        self.assert_json_error(result, "Disposable email addresses are not allowed in this organization")

        # Don't allow creating a user with + in their email address when realm
        # is restricted to a domain.
        realm.emails_restricted_to_domains = True
        realm.save()

        valid_params["email"] = "iago+label@zulip.com"
        result = self.client_post("/json/users", valid_params)
        self.assert_json_error(result, "Email addresses containing + are not allowed.")

        # Users can be created with + in their email address when realm
        # is not restricted to a domain.
        realm.emails_restricted_to_domains = False
        realm.save()

        valid_params["email"] = "iago+label@zulip.com"
        result = self.client_post("/json/users", valid_params)
        self.assert_json_success(result)

class UserProfileTest(ZulipTestCase):
    def test_get_emails_from_user_ids(self) -> None:
        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        dct = get_emails_from_user_ids([hamlet.id, othello.id])
        self.assertEqual(dct[hamlet.id], hamlet.email)
        self.assertEqual(dct[othello.id], othello.email)

    def test_valid_user_id(self) -> None:
        realm = get_realm("zulip")
        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        bot = self.example_user("default_bot")

        # Invalid user ID
        invalid_uid: object = 1000
        with self.assertRaisesRegex(ValidationError, r"User IDs is not a list"):
            check_valid_user_ids(realm.id, invalid_uid)
        with self.assertRaisesRegex(ValidationError, rf"Invalid user ID: {invalid_uid}"):
            check_valid_user_ids(realm.id, [invalid_uid])

        invalid_uid = "abc"
        with self.assertRaisesRegex(ValidationError, r"User IDs\[0\] is not an integer"):
            check_valid_user_ids(realm.id, [invalid_uid])

        invalid_uid = str(othello.id)
        with self.assertRaisesRegex(ValidationError, r"User IDs\[0\] is not an integer"):
            check_valid_user_ids(realm.id, [invalid_uid])

        # User is in different realm
        with self.assertRaisesRegex(ValidationError, rf"Invalid user ID: {hamlet.id}"):
            check_valid_user_ids(get_realm("zephyr").id, [hamlet.id])

        # User is not active
        hamlet.is_active = False
        hamlet.save()
        with self.assertRaisesRegex(ValidationError, rf"User with ID {hamlet.id} is deactivated"):
            check_valid_user_ids(realm.id, [hamlet.id])
        check_valid_user_ids(realm.id, [hamlet.id], allow_deactivated=True)

        # User is a bot
        with self.assertRaisesRegex(ValidationError, rf"User with ID {bot.id} is a bot"):
            check_valid_user_ids(realm.id, [bot.id])

        # Successfully get non-bot, active user belong to your realm
        check_valid_user_ids(realm.id, [othello.id])

    def test_cache_invalidation(self) -> None:
        hamlet = self.example_user('hamlet')
        with mock.patch('zerver.lib.cache.delete_display_recipient_cache') as m:
            hamlet.full_name = 'Hamlet Junior'
            hamlet.save(update_fields=["full_name"])

        self.assertTrue(m.called)

        with mock.patch('zerver.lib.cache.delete_display_recipient_cache') as m:
            hamlet.long_term_idle = True
            hamlet.save(update_fields=["long_term_idle"])

        self.assertFalse(m.called)

    def test_user_ids_to_users(self) -> None:
        real_user_ids = [
            self.example_user('hamlet').id,
            self.example_user('cordelia').id,
        ]

        self.assertEqual(user_ids_to_users([], get_realm("zulip")), [])
        self.assertEqual({user_profile.id for user_profile in user_ids_to_users(real_user_ids, get_realm("zulip"))},
                         set(real_user_ids))
        with self.assertRaises(JsonableError):
            user_ids_to_users([1234], get_realm("zephyr"))
        with self.assertRaises(JsonableError):
            user_ids_to_users(real_user_ids, get_realm("zephyr"))

    def test_bulk_get_users(self) -> None:
        from zerver.lib.users import bulk_get_users
        hamlet = self.example_user("hamlet")
        cordelia = self.example_user("cordelia")
        webhook_bot = self.example_user("webhook_bot")
        result = bulk_get_users(
            [hamlet.email, cordelia.email],
            get_realm("zulip"),
        )
        self.assertEqual(result[hamlet.email].email, hamlet.email)
        self.assertEqual(result[cordelia.email].email, cordelia.email)

        result = bulk_get_users(
            [hamlet.email, cordelia.email, webhook_bot.email],
            None,
            base_query=UserProfile.objects.all(),
        )
        self.assertEqual(result[hamlet.email].email, hamlet.email)
        self.assertEqual(result[cordelia.email].email, cordelia.email)
        self.assertEqual(result[webhook_bot.email].email, webhook_bot.email)

    def test_get_accounts_for_email(self) -> None:
        reset_emails_in_zulip_realm()

        def check_account_present_in_accounts(user: UserProfile, accounts: List[Dict[str, Optional[str]]]) -> None:
            for account in accounts:
                realm = user.realm
                if account["avatar"] == avatar_url(user) and account["full_name"] == user.full_name \
                        and account["realm_name"] == realm.name and account["string_id"] == realm.string_id:
                    return
            raise AssertionError("Account not found")

        lear_realm = get_realm("lear")
        cordelia_in_zulip = self.example_user("cordelia")
        cordelia_in_lear = get_user_by_delivery_email("cordelia@zulip.com", lear_realm)

        email = "cordelia@zulip.com"
        accounts = get_accounts_for_email(email)
        self.assert_length(accounts, 2)
        check_account_present_in_accounts(cordelia_in_zulip, accounts)
        check_account_present_in_accounts(cordelia_in_lear, accounts)

        email = "CORDelia@zulip.com"
        accounts = get_accounts_for_email(email)
        self.assert_length(accounts, 2)
        check_account_present_in_accounts(cordelia_in_zulip, accounts)
        check_account_present_in_accounts(cordelia_in_lear, accounts)

        email = "IAGO@ZULIP.COM"
        accounts = get_accounts_for_email(email)
        self.assert_length(accounts, 1)
        check_account_present_in_accounts(self.example_user("iago"), accounts)

        # We verify that get_accounts_for_email don't return deactivated users accounts
        user = self.example_user("hamlet")
        do_deactivate_user(user)
        email = self.example_email("hamlet")
        accounts = get_accounts_for_email(email)
        with self.assertRaises(AssertionError):
            check_account_present_in_accounts(user, accounts)

    def test_get_source_profile(self) -> None:
        reset_emails_in_zulip_realm()
        iago = get_source_profile("iago@zulip.com", "zulip")
        assert iago is not None
        self.assertEqual(iago.email, "iago@zulip.com")
        self.assertEqual(iago.realm, get_realm("zulip"))

        iago = get_source_profile("IAGO@ZULIP.com", "zulip")
        assert iago is not None
        self.assertEqual(iago.email, "iago@zulip.com")

        cordelia = get_source_profile("cordelia@zulip.com", "lear")
        assert cordelia is not None
        self.assertEqual(cordelia.email, "cordelia@zulip.com")

        self.assertIsNone(get_source_profile("iagod@zulip.com", "zulip"))
        self.assertIsNone(get_source_profile("iago@zulip.com", "ZULIP"))
        self.assertIsNone(get_source_profile("iago@zulip.com", "lear"))

    def test_copy_user_settings(self) -> None:
        iago = self.example_user("iago")
        cordelia = self.example_user("cordelia")
        hamlet = self.example_user("hamlet")
        hamlet.color_scheme = UserProfile.COLOR_SCHEME_LIGHT

        cordelia.default_language = "de"
        cordelia.emojiset = "twitter"
        cordelia.timezone = "America/Phoenix"
        cordelia.color_scheme = UserProfile.COLOR_SCHEME_NIGHT
        cordelia.enable_offline_email_notifications = False
        cordelia.enable_stream_push_notifications = True
        cordelia.enter_sends = False
        cordelia.avatar_source = UserProfile.AVATAR_FROM_USER
        cordelia.save()

        # Upload cordelia's avatar
        with get_test_image_file('img.png') as image_file:
            upload_avatar_image(image_file, cordelia, cordelia)

        UserHotspot.objects.filter(user=cordelia).delete()
        UserHotspot.objects.filter(user=iago).delete()
        hotspots_completed = ['intro_reply', 'intro_streams', 'intro_topics']
        for hotspot in hotspots_completed:
            UserHotspot.objects.create(user=cordelia, hotspot=hotspot)

        events: List[Mapping[str, Any]] = []
        with tornado_redirected_to_list(events):
            copy_user_settings(cordelia, iago)

        # Check that we didn't send an realm_user update events to
        # users; this work is happening before the user account is
        # created, so any changes will be reflected in the "add" event
        # introducing the user to clients.
        self.assertEqual(len(events), 0)

        # We verify that cordelia and iago match, but hamlet has the defaults.
        self.assertEqual(iago.full_name, "Cordelia Lear")
        self.assertEqual(cordelia.full_name, "Cordelia Lear")
        self.assertEqual(hamlet.full_name, "King Hamlet")

        self.assertEqual(iago.default_language, "de")
        self.assertEqual(cordelia.default_language, "de")
        self.assertEqual(hamlet.default_language, "en")

        self.assertEqual(iago.emojiset, "twitter")
        self.assertEqual(cordelia.emojiset, "twitter")
        self.assertEqual(hamlet.emojiset, "google-blob")

        self.assertEqual(iago.timezone, "America/Phoenix")
        self.assertEqual(cordelia.timezone, "America/Phoenix")
        self.assertEqual(hamlet.timezone, "")

        self.assertEqual(iago.color_scheme, UserProfile.COLOR_SCHEME_NIGHT)
        self.assertEqual(cordelia.color_scheme, UserProfile.COLOR_SCHEME_NIGHT)
        self.assertEqual(hamlet.color_scheme, UserProfile.COLOR_SCHEME_LIGHT)

        self.assertEqual(iago.enable_offline_email_notifications, False)
        self.assertEqual(cordelia.enable_offline_email_notifications, False)
        self.assertEqual(hamlet.enable_offline_email_notifications, True)

        self.assertEqual(iago.enable_stream_push_notifications, True)
        self.assertEqual(cordelia.enable_stream_push_notifications, True)
        self.assertEqual(hamlet.enable_stream_push_notifications, False)

        self.assertEqual(iago.enter_sends, False)
        self.assertEqual(cordelia.enter_sends, False)
        self.assertEqual(hamlet.enter_sends, True)

        hotspots = list(UserHotspot.objects.filter(user=iago).values_list('hotspot', flat=True))
        self.assertEqual(hotspots, hotspots_completed)

    def test_get_user_by_id_in_realm_including_cross_realm(self) -> None:
        realm = get_realm('zulip')
        hamlet = self.example_user('hamlet')
        othello = self.example_user('othello')
        bot = get_system_bot(settings.WELCOME_BOT)

        # Pass in the ID of a cross-realm bot and a valid realm
        cross_realm_bot = get_user_by_id_in_realm_including_cross_realm(
            bot.id, realm)
        self.assertEqual(cross_realm_bot.email, bot.email)
        self.assertEqual(cross_realm_bot.id, bot.id)

        # Pass in the ID of a cross-realm bot but with a invalid realm,
        # note that the realm should be irrelevant here
        cross_realm_bot = get_user_by_id_in_realm_including_cross_realm(
            bot.id, None)
        self.assertEqual(cross_realm_bot.email, bot.email)
        self.assertEqual(cross_realm_bot.id, bot.id)

        # Pass in the ID of a non-cross-realm user with a realm
        user_profile = get_user_by_id_in_realm_including_cross_realm(
            othello.id, realm)
        self.assertEqual(user_profile.email, othello.email)
        self.assertEqual(user_profile.id, othello.id)

        # If the realm doesn't match, or if the ID is not that of a
        # cross-realm bot, UserProfile.DoesNotExist is raised
        with self.assertRaises(UserProfile.DoesNotExist):
            get_user_by_id_in_realm_including_cross_realm(
                hamlet.id, None)

    def test_get_user_subscription_status(self) -> None:
        self.login('hamlet')
        iago = self.example_user('iago')
        stream = get_stream('Rome', iago.realm)

        # Invalid User ID.
        result = self.client_get(f"/json/users/25/subscriptions/{stream.id}")
        self.assert_json_error(result, "No such user")

        # Invalid Stream ID.
        result = self.client_get(f"/json/users/{iago.id}/subscriptions/25")
        self.assert_json_error(result, "Invalid stream id")

        result = orjson.loads(self.client_get(f"/json/users/{iago.id}/subscriptions/{stream.id}").content)
        self.assertFalse(result['is_subscribed'])

        # Subscribe to the stream.
        self.subscribe(iago, stream.name)
        with queries_captured() as queries:
            result = orjson.loads(self.client_get(f"/json/users/{iago.id}/subscriptions/{stream.id}").content)

        self.assert_length(queries, 6)
        self.assertTrue(result['is_subscribed'])

        # Logging in with a Guest user.
        polonius = self.example_user("polonius")
        self.login('polonius')
        self.assertTrue(polonius.is_guest)
        self.assertTrue(stream.is_web_public)

        result = orjson.loads(self.client_get(f"/json/users/{iago.id}/subscriptions/{stream.id}").content)
        self.assertTrue(result['is_subscribed'])

class ActivateTest(ZulipTestCase):
    def test_basics(self) -> None:
        user = self.example_user('hamlet')
        do_deactivate_user(user)
        self.assertFalse(user.is_active)
        do_reactivate_user(user)
        self.assertTrue(user.is_active)

    def test_api(self) -> None:
        admin = self.example_user('othello')
        do_change_user_role(admin, UserProfile.ROLE_REALM_ADMINISTRATOR)
        self.login('othello')

        user = self.example_user('hamlet')
        self.assertTrue(user.is_active)

        result = self.client_delete(f'/json/users/{user.id}')
        self.assert_json_success(result)
        user = self.example_user('hamlet')
        self.assertFalse(user.is_active)

        result = self.client_post(f'/json/users/{user.id}/reactivate')
        self.assert_json_success(result)
        user = self.example_user('hamlet')
        self.assertTrue(user.is_active)

    def test_api_with_nonexistent_user(self) -> None:
        self.login('iago')

        # Organization administrator cannot deactivate organization owner.
        result = self.client_delete(f'/json/users/{self.example_user("desdemona").id}')
        self.assert_json_error(result, 'Must be an organization owner')

        iago = self.example_user('iago')
        desdemona = self.example_user('desdemona')
        do_change_user_role(iago, UserProfile.ROLE_REALM_OWNER)

        # Cannot deactivate a user with the bot api
        result = self.client_delete('/json/bots/{}'.format(self.example_user("hamlet").id))
        self.assert_json_error(result, 'No such bot')

        # Cannot deactivate a nonexistent user.
        invalid_user_id = 1000
        result = self.client_delete(f'/json/users/{invalid_user_id}')
        self.assert_json_error(result, 'No such user')

        result = self.client_delete('/json/users/{}'.format(self.example_user("webhook_bot").id))
        self.assert_json_error(result, 'No such user')

        result = self.client_delete(f'/json/users/{desdemona.id}')
        self.assert_json_success(result)

        result = self.client_delete(f'/json/users/{iago.id}')
        self.assert_json_error(result, 'Cannot deactivate the only organization owner')

        # Cannot reactivate a nonexistent user.
        invalid_user_id = 1000
        result = self.client_post(f'/json/users/{invalid_user_id}/reactivate')
        self.assert_json_error(result, 'No such user')

    def test_api_with_insufficient_permissions(self) -> None:
        non_admin = self.example_user('othello')
        do_change_user_role(non_admin, UserProfile.ROLE_MEMBER)
        self.login('othello')

        # Cannot deactivate a user with the users api
        result = self.client_delete('/json/users/{}'.format(self.example_user("hamlet").id))
        self.assert_json_error(result, 'Insufficient permission')

        # Cannot reactivate a user
        result = self.client_post('/json/users/{}/reactivate'.format(self.example_user("hamlet").id))
        self.assert_json_error(result, 'Insufficient permission')

    def test_clear_scheduled_jobs(self) -> None:
        user = self.example_user('hamlet')
        send_future_email('zerver/emails/followup_day1', user.realm,
                          to_user_ids=[user.id], delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        do_deactivate_user(user)
        self.assertEqual(ScheduledEmail.objects.count(), 0)

    def test_send_future_email_with_multiple_recipients(self) -> None:
        hamlet = self.example_user('hamlet')
        iago = self.example_user('iago')
        send_future_email('zerver/emails/followup_day1', iago.realm,
                          to_user_ids=[hamlet.id, iago.id], delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.filter(users__in=[hamlet, iago]).distinct().count(), 1)
        email = ScheduledEmail.objects.all().first()
        self.assertEqual(email.users.count(), 2)

    def test_clear_scheduled_emails_with_multiple_user_ids(self) -> None:
        hamlet = self.example_user('hamlet')
        iago = self.example_user('iago')
        send_future_email('zerver/emails/followup_day1', iago.realm,
                          to_user_ids=[hamlet.id, iago.id], delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        clear_scheduled_emails([hamlet.id, iago.id])
        self.assertEqual(ScheduledEmail.objects.count(), 0)

    def test_clear_schedule_emails_with_one_user_id(self) -> None:
        hamlet = self.example_user('hamlet')
        iago = self.example_user('iago')
        send_future_email('zerver/emails/followup_day1', iago.realm,
                          to_user_ids=[hamlet.id, iago.id], delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        clear_scheduled_emails([hamlet.id])
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        self.assertEqual(ScheduledEmail.objects.filter(users=hamlet).count(), 0)
        self.assertEqual(ScheduledEmail.objects.filter(users=iago).count(), 1)

    def test_deliver_email(self) -> None:
        iago = self.example_user('iago')
        hamlet = self.example_user('hamlet')
        send_future_email('zerver/emails/followup_day1', iago.realm,
                          to_user_ids=[hamlet.id, iago.id], delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        email = ScheduledEmail.objects.all().first()
        deliver_email(email)
        from django.core.mail import outbox
        self.assertEqual(len(outbox), 1)
        for message in outbox:
            self.assertEqual(
                set(message.to),
                {
                    str(Address(display_name=hamlet.full_name, addr_spec=hamlet.delivery_email)),
                    str(Address(display_name=iago.full_name, addr_spec=iago.delivery_email)),
                },
            )
        self.assertEqual(ScheduledEmail.objects.count(), 0)

    def test_deliver_email_no_addressees(self) -> None:
        iago = self.example_user('iago')
        hamlet = self.example_user('hamlet')
        to_user_ids = [hamlet.id, iago.id]
        send_future_email('zerver/emails/followup_day1', iago.realm,
                          to_user_ids=to_user_ids, delay=datetime.timedelta(hours=1))
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        email = ScheduledEmail.objects.all().first()
        email.users.remove(*to_user_ids)

        with self.assertLogs('zulip.send_email', level='INFO') as info_log:
            deliver_email(email)
        from django.core.mail import outbox
        self.assertEqual(len(outbox), 0)
        self.assertEqual(ScheduledEmail.objects.count(), 1)
        self.assertEqual(info_log.output, [
            f'WARNING:zulip.send_email:ScheduledEmail id {email.id} has empty users and address attributes.'
        ])

class RecipientInfoTest(ZulipTestCase):
    def test_stream_recipient_info(self) -> None:
        hamlet = self.example_user('hamlet')
        cordelia = self.example_user('cordelia')
        othello = self.example_user('othello')

        # These tests were written with the old default for
        # enable_online_push_notifications; that default is better for
        # testing the full code path anyway.
        hamlet.enable_online_push_notifications = False
        cordelia.enable_online_push_notifications = False
        othello.enable_online_push_notifications = False
        hamlet.save()
        cordelia.save()
        othello.save()

        realm = hamlet.realm

        stream_name = 'Test Stream'
        topic_name = 'test topic'

        for user in [hamlet, cordelia, othello]:
            self.subscribe(user, stream_name)

        stream = get_stream(stream_name, realm)
        recipient = stream.recipient

        stream_topic = StreamTopicTarget(
            stream_id=stream.id,
            topic_name=topic_name,
        )

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=False,
        )

        all_user_ids = {hamlet.id, cordelia.id, othello.id}

        expected_info = dict(
            active_user_ids=all_user_ids,
            push_notify_user_ids=set(),
            stream_push_user_ids=set(),
            stream_email_user_ids=set(),
            wildcard_mention_user_ids=set(),
            um_eligible_user_ids=all_user_ids,
            long_term_idle_user_ids=set(),
            default_bot_user_ids=set(),
            service_bot_tuples=[],
        )

        self.assertEqual(info, expected_info)

        cordelia.wildcard_mentions_notify = False
        cordelia.save()
        hamlet.enable_stream_push_notifications = True
        hamlet.save()
        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=False,
        )
        self.assertEqual(info['stream_push_user_ids'], {hamlet.id})
        self.assertEqual(info['wildcard_mention_user_ids'], set())

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=True,
        )
        self.assertEqual(info['wildcard_mention_user_ids'], {hamlet.id, othello.id})

        sub = get_subscription(stream_name, hamlet)
        sub.push_notifications = False
        sub.save()
        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
        )
        self.assertEqual(info['stream_push_user_ids'], set())

        hamlet.enable_stream_push_notifications = False
        hamlet.save()
        sub = get_subscription(stream_name, hamlet)
        sub.push_notifications = True
        sub.save()
        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
        )
        self.assertEqual(info['stream_push_user_ids'], {hamlet.id})

        # Now mute Hamlet to omit him from stream_push_user_ids.
        add_topic_mute(
            user_profile=hamlet,
            stream_id=stream.id,
            recipient_id=recipient.id,
            topic_name=topic_name,
        )

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=False,
        )
        self.assertEqual(info['stream_push_user_ids'], set())
        self.assertEqual(info['wildcard_mention_user_ids'], set())

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=True,
        )
        self.assertEqual(info['stream_push_user_ids'], set())
        # Since Hamlet has muted the stream and Cordelia has disabled
        # wildcard notifications, it should just be Othello here.
        self.assertEqual(info['wildcard_mention_user_ids'], {othello.id})

        sub = get_subscription(stream_name, othello)
        sub.wildcard_mentions_notify = False
        sub.save()

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=True,
        )
        self.assertEqual(info['stream_push_user_ids'], set())
        # Verify that stream-level wildcard_mentions_notify=False works correctly.
        self.assertEqual(info['wildcard_mention_user_ids'], set())

        # Verify that True works as expected as well
        sub = get_subscription(stream_name, othello)
        sub.wildcard_mentions_notify = True
        sub.save()

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possible_wildcard_mention=True,
        )
        self.assertEqual(info['stream_push_user_ids'], set())
        self.assertEqual(info['wildcard_mention_user_ids'], {othello.id})

        # Add a service bot.
        service_bot = do_create_user(
            email='service-bot@zulip.com',
            password='',
            realm=realm,
            full_name='',
            bot_type=UserProfile.EMBEDDED_BOT,
        )

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possibly_mentioned_user_ids={service_bot.id},
        )
        self.assertEqual(info['service_bot_tuples'], [
            (service_bot.id, UserProfile.EMBEDDED_BOT),
        ])

        # Add a normal bot.
        normal_bot = do_create_user(
            email='normal-bot@zulip.com',
            password='',
            realm=realm,
            full_name='',
            bot_type=UserProfile.DEFAULT_BOT,
        )

        info = get_recipient_info(
            recipient=recipient,
            sender_id=hamlet.id,
            stream_topic=stream_topic,
            possibly_mentioned_user_ids={service_bot.id, normal_bot.id},
        )
        self.assertEqual(info['default_bot_user_ids'], {normal_bot.id})

    def test_get_recipient_info_invalid_recipient_type(self) -> None:
        hamlet = self.example_user('hamlet')
        realm = hamlet.realm

        stream = get_stream('Rome', realm)
        stream_topic = StreamTopicTarget(
            stream_id=stream.id,
            topic_name='test topic',
        )

        # Make sure get_recipient_info asserts on invalid recipient types
        with self.assertRaisesRegex(ValueError, 'Bad recipient type'):
            invalid_recipient = Recipient(type=999)  # 999 is not a valid type
            get_recipient_info(
                recipient=invalid_recipient,
                sender_id=hamlet.id,
                stream_topic=stream_topic,
            )

class BulkUsersTest(ZulipTestCase):
    def test_client_gravatar_option(self) -> None:
        reset_emails_in_zulip_realm()
        self.login('cordelia')

        hamlet = self.example_user('hamlet')

        def get_hamlet_avatar(client_gravatar: bool) -> Optional[str]:
            data = dict(client_gravatar=orjson.dumps(client_gravatar).decode())
            result = self.client_get('/json/users', data)
            self.assert_json_success(result)
            rows = result.json()['members']
            hamlet_data = [
                row for row in rows
                if row['user_id'] == hamlet.id
            ][0]
            return hamlet_data['avatar_url']

        self.assertEqual(
            get_hamlet_avatar(client_gravatar=True),
            None,
        )

        '''
        The main purpose of this test is to make sure we
        return None for avatar_url when client_gravatar is
        set to True.  And we do a sanity check for when it's
        False, but we leave it to other tests to validate
        the specific URL.
        '''
        self.assertIn(
            'gravatar.com',
            get_hamlet_avatar(client_gravatar=False),
        )

class GetProfileTest(ZulipTestCase):

    def test_cache_behavior(self) -> None:
        """Tests whether fetching a user object the normal way, with
        `get_user`, makes 1 cache query and 1 database query.
        """
        realm = get_realm("zulip")
        email = self.example_user("hamlet").email
        with queries_captured() as queries:
            with simulated_empty_cache() as cache_queries:
                user_profile = get_user(email, realm)

        self.assert_length(queries, 1)
        self.assert_length(cache_queries, 1)
        self.assertEqual(user_profile.email, email)

    def test_get_user_profile(self) -> None:
        hamlet = self.example_user('hamlet')
        iago = self.example_user('iago')
        desdemona = self.example_user('desdemona')

        self.login('hamlet')
        result = orjson.loads(self.client_get('/json/users/me').content)
        self.assertEqual(result['email'], hamlet.email)
        self.assertEqual(result['full_name'], 'King Hamlet')
        self.assertIn("user_id", result)
        self.assertFalse(result['is_bot'])
        self.assertFalse(result['is_admin'])
        self.assertFalse(result['is_owner'])
        self.assertFalse(result['is_guest'])
        self.assertFalse('delivery_email' in result)
        self.login('iago')
        result = orjson.loads(self.client_get('/json/users/me').content)
        self.assertEqual(result['email'], iago.email)
        self.assertEqual(result['full_name'], 'Iago')
        self.assertFalse(result['is_bot'])
        self.assertTrue(result['is_admin'])
        self.assertFalse(result['is_owner'])
        self.assertFalse(result['is_guest'])
        self.login('desdemona')
        result = orjson.loads(self.client_get('/json/users/me').content)
        self.assertEqual(result['email'], desdemona.email)
        self.assertFalse(result['is_bot'])
        self.assertTrue(result['is_admin'])
        self.assertTrue(result['is_owner'])
        self.assertFalse(result['is_guest'])

        # Tests the GET ../users/{id} API endpoint.
        user = self.example_user('hamlet')
        result = orjson.loads(self.client_get(f'/json/users/{user.id}').content)
        self.assertEqual(result['user']['email'], user.email)
        self.assertEqual(result['user']['full_name'], user.full_name)
        self.assertIn("user_id", result['user'])
        self.assertNotIn("profile_data", result['user'])
        self.assertFalse(result['user']['is_bot'])
        self.assertFalse(result['user']['is_admin'])
        self.assertFalse(result['user']['is_owner'])

        result = orjson.loads(self.client_get(f"/json/users/{user.id}", {"include_custom_profile_fields": "true"}).content)

        self.assertIn('profile_data', result['user'])
        result = self.client_get("/json/users/30")
        self.assert_json_error(result, "No such user")

        bot = self.example_user("default_bot")
        result = orjson.loads(self.client_get(f'/json/users/{bot.id}').content)
        self.assertEqual(result['user']['email'], bot.email)
        self.assertTrue(result['user']['is_bot'])

    def test_get_all_profiles_avatar_urls(self) -> None:
        hamlet = self.example_user('hamlet')
        result = self.api_get(hamlet, "/api/v1/users")
        self.assert_json_success(result)

        (my_user,) = [
            user for user in result.json()['members']
            if user['email'] == hamlet.email
        ]

        self.assertEqual(
            my_user['avatar_url'],
            avatar_url(hamlet),
        )

class DeleteUserTest(ZulipTestCase):
    def test_do_delete_user(self) -> None:
        realm = get_realm("zulip")
        cordelia = self.example_user('cordelia')
        othello = self.example_user('othello')
        hamlet = self.example_user('hamlet')
        hamlet_personal_recipient = hamlet.recipient
        hamlet_user_id = hamlet.id

        self.send_personal_message(cordelia, hamlet)
        self.send_personal_message(hamlet, cordelia)

        personal_message_ids_to_hamlet = Message.objects.filter(recipient=hamlet_personal_recipient) \
            .values_list('id', flat=True)
        self.assertTrue(len(personal_message_ids_to_hamlet) > 0)
        self.assertTrue(Message.objects.filter(sender=hamlet).exists())

        huddle_message_ids_from_cordelia = [
            self.send_huddle_message(
                cordelia,
                [hamlet, othello]
            )
            for i in range(3)
        ]
        huddle_message_ids_from_hamlet = [
            self.send_huddle_message(
                hamlet,
                [cordelia, othello]
            )
            for i in range(3)
        ]

        huddle_with_hamlet_recipient_ids = list(
            Subscription.objects.filter(user_profile=hamlet, recipient__type=Recipient.HUDDLE)
            .values_list('recipient_id', flat=True)
        )
        self.assertTrue(len(huddle_with_hamlet_recipient_ids) > 0)

        do_delete_user(hamlet)

        replacement_dummy_user = UserProfile.objects.get(id=hamlet_user_id, realm=realm)

        self.assertEqual(replacement_dummy_user.delivery_email, f"deleteduser{hamlet_user_id}@{realm.uri}")
        self.assertEqual(replacement_dummy_user.is_mirror_dummy, True)

        self.assertEqual(Message.objects.filter(id__in=personal_message_ids_to_hamlet).count(), 0)
        # Huddle messages from hamlet should have been deleted, but messages of other participants should
        # be kept.
        self.assertEqual(Message.objects.filter(id__in=huddle_message_ids_from_hamlet).count(), 0)
        self.assertEqual(Message.objects.filter(id__in=huddle_message_ids_from_cordelia).count(), 3)

        self.assertEqual(Message.objects.filter(sender_id=hamlet_user_id).count(), 0)

        # Verify that the dummy user is subscribed to the deleted user's huddles, to keep huddle data
        # in a correct state.
        for recipient_id in huddle_with_hamlet_recipient_ids:
            self.assertTrue(Subscription.objects.filter(user_profile=replacement_dummy_user,
                                                        recipient_id=recipient_id).exists())

class FakeEmailDomainTest(ZulipTestCase):
    def test_get_fake_email_domain(self) -> None:
        realm = get_realm("zulip")
        self.assertEqual("zulip.testserver", get_fake_email_domain(realm))

        with self.settings(EXTERNAL_HOST="example.com"):
            self.assertEqual("zulip.example.com", get_fake_email_domain(realm))

    @override_settings(FAKE_EMAIL_DOMAIN="fakedomain.com", REALM_HOSTS={"zulip": "127.0.0.1"})
    def test_get_fake_email_domain_realm_host_is_ip_addr(self) -> None:
        realm = get_realm("zulip")
        self.assertEqual("fakedomain.com", get_fake_email_domain(realm))

    @override_settings(FAKE_EMAIL_DOMAIN="invaliddomain", REALM_HOSTS={"zulip": "127.0.0.1"})
    def test_invalid_fake_email_domain(self) -> None:
        realm = get_realm("zulip")
        with self.assertRaises(InvalidFakeEmailDomain):
            get_fake_email_domain(realm)

    @override_settings(FAKE_EMAIL_DOMAIN="127.0.0.1", REALM_HOSTS={"zulip": "127.0.0.1"})
    def test_invalid_fake_email_domain_ip(self) -> None:
        with self.assertRaises(InvalidFakeEmailDomain):
            realm = get_realm("zulip")
            get_fake_email_domain(realm)
