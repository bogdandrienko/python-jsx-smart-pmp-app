import os
import shutil
from io import BytesIO
from typing import Any, Dict, Iterator, List, Optional, Set, Tuple
from unittest import mock
from unittest.mock import ANY, call

import orjson
from django.conf import settings
from django.utils.timezone import now as timezone_now

from zerver.data_import.import_util import (
    build_defaultstream,
    build_recipient,
    build_subscription,
    build_usermessages,
    build_zerver_realm,
)
from zerver.data_import.sequencer import NEXT_ID
from zerver.data_import.slack import (
    AddedChannelsT,
    AddedMPIMsT,
    DMMembersT,
    ZerverFieldsT,
    channel_message_to_zerver_message,
    channels_to_zerver_stream,
    convert_slack_workspace_messages,
    do_convert_data,
    fetch_shared_channel_users,
    get_admin,
    get_guest,
    get_message_sending_user,
    get_owner,
    get_slack_api_data,
    get_subscription,
    get_user_timezone,
    process_message_files,
    slack_workspace_to_realm,
    users_to_zerver_userprofile,
)
from zerver.lib.import_realm import do_import_realm
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import get_test_image_file
from zerver.lib.topic import EXPORT_TOPIC_NAME
from zerver.models import Realm, RealmAuditLog, Recipient, UserProfile, get_realm


def remove_folder(path: str) -> None:
    if os.path.exists(path):
        shutil.rmtree(path)

class MockResponse:
    def __init__(self, json_data: Optional[Dict[str, Any]], status_code: int) -> None:
        self.json_data = json_data
        self.status_code = status_code

    def json(self) -> Optional[Dict[str, Any]]:
        return self.json_data

# This method will be used by the mock to replace requests.get
def mocked_requests_get(*args: str) -> MockResponse:
    if args == ("https://slack.com/api/users.list", {"token": "xoxp-valid-token"}):
        return MockResponse({"ok": True, "members": "user_data"}, 200)
    elif args == ("https://slack.com/api/users.list", {"token": "xoxp-invalid-token"}):
        return MockResponse({"ok": False, "error": "invalid_auth"}, 200)
    else:
        return MockResponse(None, 404)

class SlackImporter(ZulipTestCase):
    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_get_slack_api_data(self, mock_get: mock.Mock) -> None:
        token = 'xoxp-valid-token'
        slack_user_list_url = "https://slack.com/api/users.list"
        self.assertEqual(get_slack_api_data(slack_user_list_url, "members", token=token),
                         "user_data")
        token = 'xoxp-invalid-token'
        with self.assertRaises(Exception) as invalid:
            get_slack_api_data(slack_user_list_url, "members", token=token)
        self.assertEqual(invalid.exception.args, ('Error accessing Slack API: invalid_auth',))

        with self.assertRaises(Exception) as invalid:
            get_slack_api_data(slack_user_list_url, "members")
        self.assertEqual(invalid.exception.args, ('Slack token missing in kwargs',))

        token = 'xoxp-status404'
        wrong_url = "https://slack.com/api/wrong"
        with self.assertRaises(Exception) as invalid:
            get_slack_api_data(wrong_url, "members", token=token)
        self.assertEqual(invalid.exception.args, ('HTTP error accessing the Slack API.',))

    def test_build_zerver_realm(self) -> None:
        realm_id = 2
        realm_subdomain = "test-realm"
        time = float(timezone_now().timestamp())
        test_realm: List[Dict[str, Any]] = build_zerver_realm(realm_id, realm_subdomain, time, 'Slack')
        test_zerver_realm_dict = test_realm[0]

        self.assertEqual(test_zerver_realm_dict['id'], realm_id)
        self.assertEqual(test_zerver_realm_dict['string_id'], realm_subdomain)
        self.assertEqual(test_zerver_realm_dict['name'], realm_subdomain)
        self.assertEqual(test_zerver_realm_dict['date_created'], time)

    def test_get_owner(self) -> None:
        user_data = [{'is_owner': False, 'is_primary_owner': False},
                     {'is_owner': True, 'is_primary_owner': False},
                     {'is_owner': False, 'is_primary_owner': True},
                     {'is_owner': True, 'is_primary_owner': True}]
        self.assertEqual(get_owner(user_data[0]), False)
        self.assertEqual(get_owner(user_data[1]), True)
        self.assertEqual(get_owner(user_data[2]), True)
        self.assertEqual(get_owner(user_data[3]), True)

    def test_get_admin(self) -> None:
        user_data = [{'is_admin': True},
                     {'is_admin': False}]
        self.assertEqual(get_admin(user_data[0]), True)
        self.assertEqual(get_admin(user_data[1]), False)

    def test_get_guest(self) -> None:
        user_data = [{'is_restricted': False, 'is_ultra_restricted': False},
                     {'is_restricted': True, 'is_ultra_restricted': False},
                     {'is_restricted': False, 'is_ultra_restricted': True},
                     {'is_restricted': True, 'is_ultra_restricted': True}]
        self.assertEqual(get_guest(user_data[0]), False)
        self.assertEqual(get_guest(user_data[1]), True)
        self.assertEqual(get_guest(user_data[2]), True)
        self.assertEqual(get_guest(user_data[3]), True)

    def test_get_timezone(self) -> None:
        user_chicago_timezone = {"tz": "America/Chicago"}
        user_timezone_none = {"tz": None}
        user_no_timezone: Dict[str, Any] = {}

        self.assertEqual(get_user_timezone(user_chicago_timezone), "America/Chicago")
        self.assertEqual(get_user_timezone(user_timezone_none), "America/New_York")
        self.assertEqual(get_user_timezone(user_no_timezone), "America/New_York")

    @mock.patch("zerver.data_import.slack.get_data_file")
    @mock.patch("zerver.data_import.slack.get_slack_api_data")
    @mock.patch("zerver.data_import.slack.get_messages_iterator")
    def test_fetch_shared_channel_users(self, messages_mock: mock.Mock, api_mock: mock.Mock,
                                        data_file_mock: mock.Mock) -> None:
        users = [{"id": "U061A1R2R"}, {"id": "U061A5N1G"}, {"id": "U064KUGRJ"}]
        data_file_mock.side_effect = [
            [
                {"name": "general", "members": ["U061A1R2R", "U061A5N1G"]},
                {"name": "sharedchannel", "members": ["U061A1R2R", "U061A3E0G"]},
            ],
            [],
        ]
        api_mock.side_effect = [
            {"id": "U061A3E0G", "team_id": "T6LARQE2Z"},
            {"domain": "foreignteam1"},
            {"id": "U061A8H1G", "team_id": "T7KJRQE8Y"},
            {"domain": "foreignteam2"},
        ]
        messages_mock.return_value = [
            {"user": "U061A1R2R"},
            {"user": "U061A5N1G"},
            {"user": "U061A8H1G"},
        ]
        slack_data_dir = self.fixture_file_name('', type='slack_fixtures')
        fetch_shared_channel_users(users, slack_data_dir, "token")

        # Normal users
        self.assertEqual(len(users), 5)
        self.assertEqual(users[0]["id"], "U061A1R2R")
        self.assertEqual(users[0]["is_mirror_dummy"], False)
        self.assertFalse("team_domain" in users[0])
        self.assertEqual(users[1]["id"], "U061A5N1G")
        self.assertEqual(users[2]["id"], "U064KUGRJ")

        # Shared channel users
        self.assertEqual(users[3]["id"], "U061A3E0G")
        self.assertEqual(users[3]["team_domain"], "foreignteam1")
        self.assertEqual(users[3]["is_mirror_dummy"], True)
        self.assertEqual(users[4]["id"], "U061A8H1G")
        self.assertEqual(users[4]["team_domain"], "foreignteam2")
        self.assertEqual(users[4]["is_mirror_dummy"], True)

        api_calls = [
            call("https://slack.com/api/users.info", "user", token="token", user="U061A3E0G"),
            call("https://slack.com/api/team.info", "team", token="token", team="T6LARQE2Z"),
            call("https://slack.com/api/users.info", "user", token="token", user="U061A8H1G"),
            call("https://slack.com/api/team.info", "team", token="token", team="T7KJRQE8Y"),
        ]
        api_mock.assert_has_calls(api_calls, any_order=True)

    @mock.patch("zerver.data_import.slack.get_data_file")
    def test_users_to_zerver_userprofile(self, mock_get_data_file: mock.Mock) -> None:
        custom_profile_field_user1 = {"Xf06054BBB": {"value": "random1"},
                                      "Xf023DSCdd": {"value": "employee"}}
        custom_profile_field_user2 = {"Xf06054BBB": {"value": "random2"},
                                      "Xf023DSCdd": {"value": "employer"}}
        user_data = [{"id": "U08RGD1RD",
                      "team_id": "T5YFFM2QY",
                      "name": "john",
                      "deleted": False,
                      "is_mirror_dummy": False,
                      "real_name": "John Doe",
                      "profile": {"image_32": "", "email": "jon@gmail.com", "avatar_hash": "hash",
                                  "phone": "+1-123-456-77-868",
                                  "fields": custom_profile_field_user1}},
                     {"id": "U0CBK5KAT",
                      "team_id": "T5YFFM2QY",
                      "is_admin": True,
                      "is_bot": False,
                      "is_owner": True,
                      "is_primary_owner": True,
                      'name': 'Jane',
                      "real_name": "Jane Doe",
                      "deleted": False,
                      "is_mirror_dummy": False,
                      "profile": {"image_32": "https://secure.gravatar.com/avatar/random.png",
                                  "fields": custom_profile_field_user2,
                                  "email": "jane@foo.com", "avatar_hash": "hash"}},
                     {"id": "U09TYF5Sk",
                      "team_id": "T5YFFM2QY",
                      "name": "Bot",
                      "real_name": "Bot",
                      "is_bot": True,
                      "deleted": False,
                      "is_mirror_dummy": False,
                      "profile": {"image_32": "https://secure.gravatar.com/avatar/random1.png",
                                  "skype": "test_skype_name",
                                  "email": "bot1@zulipchat.com", "avatar_hash": "hash"}},
                     {"id": "UHSG7OPQN",
                      "team_id": "T6LARQE2Z",
                      'name': 'matt.perry',
                      "color": '9d8eee',
                      "is_bot": False,
                      "is_app_user": False,
                      "is_mirror_dummy": True,
                      "team_domain": "foreignteam",
                      "profile": {"image_32": "https://secure.gravatar.com/avatar/random6.png",
                                  "avatar_hash": "hash", "first_name": "Matt", "last_name": "Perry",
                                  "real_name": "Matt Perry", "display_name": "matt.perry", "team": "T6LARQE2Z"}},
                     {"id": "U8VAHEVUY",
                      "team_id": "T5YFFM2QY",
                      "name": "steviejacob34",
                      "real_name": "Steve Jacob",
                      "is_admin": False,
                      "is_owner": False,
                      "is_primary_owner": False,
                      "is_restricted": True,
                      "is_ultra_restricted": False,
                      "is_bot": False,
                      "is_mirror_dummy": False,
                      "profile": {"email": "steviejacob34@yahoo.com", "avatar_hash": "hash",
                                  "image_32": "https://secure.gravatar.com/avatar/random6.png"}},
                     {"id": "U8X25EBAB",
                      "team_id": "T5YFFM2QY",
                      "name": "pratikweb_0",
                      "real_name": "Pratik",
                      "is_admin": False,
                      "is_owner": False,
                      "is_primary_owner": False,
                      "is_restricted": True,
                      "is_ultra_restricted": True,
                      "is_bot": False,
                      "is_mirror_dummy": False,
                      "profile": {"email": "pratik@mit.edu", "avatar_hash": "hash",
                                  "image_32": "https://secure.gravatar.com/avatar/random.png"}},
                     {"id": "U015J7JSE",
                      "team_id": "T5YFFM2QY",
                      "name": "georgesm27",
                      "real_name": "George",
                      "is_admin": True,
                      "is_owner": True,
                      "is_primary_owner": False,
                      "is_restricted": False,
                      "is_ultra_restricted": False,
                      "is_bot": False,
                      "is_mirror_dummy": False,
                      "profile": {"email": "geroge@yahoo.com", "avatar_hash": "hash",
                                  "image_32": "https://secure.gravatar.com/avatar/random5.png"}},
                     {"id": "U1RDFEC80",
                      "team_id": "T5YFFM2QY",
                      "name": "daniel.smith",
                      "real_name": "Daniel Smith",
                      "is_admin": True,
                      "is_owner": False,
                      "is_primary_owner": False,
                      "is_restricted": False,
                      "is_ultra_restricted": False,
                      "is_bot": False,
                      "is_mirror_dummy": False,
                      "profile": {"email": "daniel@gmail.com", "avatar_hash": "hash",
                                  "image_32": "https://secure.gravatar.com/avatar/random7.png"}}]

        mock_get_data_file.return_value = user_data
        # As user with slack_id 'U0CBK5KAT' is the primary owner, that user should be imported first
        # and hence has zulip_id = 1
        test_slack_user_id_to_zulip_user_id = {'U08RGD1RD': 1, 'U0CBK5KAT': 0, 'U09TYF5Sk': 2, 'UHSG7OPQN': 3, 'U8VAHEVUY': 4, 'U8X25EBAB': 5, 'U015J7JSE': 6, 'U1RDFEC80': 7}
        slack_data_dir = './random_path'
        timestamp = int(timezone_now().timestamp())
        mock_get_data_file.return_value = user_data

        with self.assertLogs(level="INFO"):
            zerver_userprofile, avatar_list, slack_user_id_to_zulip_user_id, customprofilefield, \
                customprofilefield_value = users_to_zerver_userprofile(slack_data_dir, user_data, 1,
                                                                       timestamp, 'test_domain')

        # Test custom profile fields
        self.assertEqual(customprofilefield[0]['field_type'], 1)
        self.assertEqual(customprofilefield[3]['name'], 'skype')
        cpf_name = {cpf['name'] for cpf in customprofilefield}
        self.assertIn('phone', cpf_name)
        self.assertIn('skype', cpf_name)
        cpf_name.remove('phone')
        cpf_name.remove('skype')
        for name in cpf_name:
            self.assertTrue(name.startswith('Slack custom field '))

        self.assertEqual(len(customprofilefield_value), 6)
        self.assertEqual(customprofilefield_value[0]['field'], 0)
        self.assertEqual(customprofilefield_value[0]['user_profile'], 1)
        self.assertEqual(customprofilefield_value[3]['user_profile'], 0)
        self.assertEqual(customprofilefield_value[5]['value'], 'test_skype_name')

        # test that the primary owner should always be imported first
        self.assertDictEqual(slack_user_id_to_zulip_user_id, test_slack_user_id_to_zulip_user_id)
        self.assertEqual(len(avatar_list), 8)

        self.assertEqual(len(zerver_userprofile), 8)

        self.assertEqual(zerver_userprofile[0]['is_staff'], False)
        self.assertEqual(zerver_userprofile[0]['is_bot'], False)
        self.assertEqual(zerver_userprofile[0]['is_active'], True)
        self.assertEqual(zerver_userprofile[0]['is_mirror_dummy'], False)
        self.assertEqual(zerver_userprofile[0]['role'], UserProfile.ROLE_MEMBER)
        self.assertEqual(zerver_userprofile[0]['enable_desktop_notifications'], True)
        self.assertEqual(zerver_userprofile[0]['email'], 'jon@gmail.com')
        self.assertEqual(zerver_userprofile[0]['full_name'], 'John Doe')

        self.assertEqual(zerver_userprofile[1]['id'], test_slack_user_id_to_zulip_user_id['U0CBK5KAT'])
        self.assertEqual(zerver_userprofile[1]['role'], UserProfile.ROLE_REALM_OWNER)
        self.assertEqual(zerver_userprofile[1]['is_staff'], False)
        self.assertEqual(zerver_userprofile[1]['is_active'], True)
        self.assertEqual(zerver_userprofile[0]['is_mirror_dummy'], False)

        self.assertEqual(zerver_userprofile[2]['id'], test_slack_user_id_to_zulip_user_id['U09TYF5Sk'])
        self.assertEqual(zerver_userprofile[2]['is_bot'], True)
        self.assertEqual(zerver_userprofile[2]['is_active'], True)
        self.assertEqual(zerver_userprofile[2]['is_mirror_dummy'], False)
        self.assertEqual(zerver_userprofile[2]['email'], 'bot1@zulipchat.com')
        self.assertEqual(zerver_userprofile[2]['bot_type'], 1)
        self.assertEqual(zerver_userprofile[2]['avatar_source'], 'U')

        self.assertEqual(zerver_userprofile[3]['id'], test_slack_user_id_to_zulip_user_id['UHSG7OPQN'])
        self.assertEqual(zerver_userprofile[3]['role'], UserProfile.ROLE_MEMBER)
        self.assertEqual(zerver_userprofile[3]['is_staff'], False)
        self.assertEqual(zerver_userprofile[3]['is_active'], False)
        self.assertEqual(zerver_userprofile[3]['email'], 'matt.perry@foreignteam.slack.com')
        self.assertEqual(zerver_userprofile[3]['realm'], 1)
        self.assertEqual(zerver_userprofile[3]['full_name'], 'Matt Perry')
        self.assertEqual(zerver_userprofile[3]['is_mirror_dummy'], True)
        self.assertEqual(zerver_userprofile[3]['can_forge_sender'], False)

        self.assertEqual(zerver_userprofile[4]['id'], test_slack_user_id_to_zulip_user_id['U8VAHEVUY'])
        self.assertEqual(zerver_userprofile[4]['role'], UserProfile.ROLE_GUEST)
        self.assertEqual(zerver_userprofile[4]['is_staff'], False)
        self.assertEqual(zerver_userprofile[4]['is_active'], True)
        self.assertEqual(zerver_userprofile[4]['is_mirror_dummy'], False)

        self.assertEqual(zerver_userprofile[5]['id'], test_slack_user_id_to_zulip_user_id['U8X25EBAB'])
        self.assertEqual(zerver_userprofile[5]['role'], UserProfile.ROLE_GUEST)
        self.assertEqual(zerver_userprofile[5]['is_staff'], False)
        self.assertEqual(zerver_userprofile[5]['is_active'], True)
        self.assertEqual(zerver_userprofile[5]['is_mirror_dummy'], False)

        self.assertEqual(zerver_userprofile[6]['id'], test_slack_user_id_to_zulip_user_id['U015J7JSE'])
        self.assertEqual(zerver_userprofile[6]['role'], UserProfile.ROLE_REALM_OWNER)
        self.assertEqual(zerver_userprofile[6]['is_staff'], False)
        self.assertEqual(zerver_userprofile[6]['is_active'], True)
        self.assertEqual(zerver_userprofile[6]['is_mirror_dummy'], False)

        self.assertEqual(zerver_userprofile[7]['id'], test_slack_user_id_to_zulip_user_id['U1RDFEC80'])
        self.assertEqual(zerver_userprofile[7]['role'], UserProfile.ROLE_REALM_ADMINISTRATOR)
        self.assertEqual(zerver_userprofile[7]['is_staff'], False)
        self.assertEqual(zerver_userprofile[7]['is_active'], True)
        self.assertEqual(zerver_userprofile[7]['is_mirror_dummy'], False)

    def test_build_defaultstream(self) -> None:
        realm_id = 1
        stream_id = 1
        default_channel_general = build_defaultstream(realm_id, stream_id, 1)
        test_default_channel = {'stream': 1, 'realm': 1, 'id': 1}
        self.assertDictEqual(test_default_channel, default_channel_general)
        default_channel_general = build_defaultstream(realm_id, stream_id, 1)
        test_default_channel = {'stream': 1, 'realm': 1, 'id': 1}
        self.assertDictEqual(test_default_channel, default_channel_general)

    def test_build_pm_recipient_sub_from_user(self) -> None:
        zulip_user_id = 3
        recipient_id = 5
        subscription_id = 7
        sub = build_subscription(recipient_id, zulip_user_id, subscription_id)
        recipient = build_recipient(zulip_user_id, recipient_id, Recipient.PERSONAL)

        self.assertEqual(recipient['id'], sub['recipient'])
        self.assertEqual(recipient['type_id'], sub['user_profile'])

        self.assertEqual(recipient['type'], Recipient.PERSONAL)
        self.assertEqual(recipient['type_id'], 3)

        self.assertEqual(sub['recipient'], 5)
        self.assertEqual(sub['id'], 7)
        self.assertEqual(sub['active'], True)

    def test_build_subscription(self) -> None:
        channel_members = ["U061A1R2R", "U061A3E0G", "U061A5N1G", "U064KUGRJ"]
        slack_user_id_to_zulip_user_id = {"U061A1R2R": 1, "U061A3E0G": 8, "U061A5N1G": 7, "U064KUGRJ": 5}
        subscription_id_count = 0
        recipient_id = 12
        zerver_subscription: List[Dict[str, Any]] = []
        final_subscription_id = get_subscription(channel_members, zerver_subscription,
                                                 recipient_id, slack_user_id_to_zulip_user_id,
                                                 subscription_id_count)
        # sanity checks
        self.assertEqual(final_subscription_id, 4)
        self.assertEqual(zerver_subscription[0]['recipient'], 12)
        self.assertEqual(zerver_subscription[0]['id'], 0)
        self.assertEqual(zerver_subscription[0]['user_profile'],
                         slack_user_id_to_zulip_user_id[channel_members[0]])
        self.assertEqual(zerver_subscription[2]['user_profile'],
                         slack_user_id_to_zulip_user_id[channel_members[2]])
        self.assertEqual(zerver_subscription[3]['id'], 3)
        self.assertEqual(zerver_subscription[1]['recipient'],
                         zerver_subscription[3]['recipient'])
        self.assertEqual(zerver_subscription[1]['pin_to_top'], False)

    def test_channels_to_zerver_stream(self) -> None:
        slack_user_id_to_zulip_user_id = {"U061A1R2R": 1, "U061A3E0G": 8, "U061A5N1G": 7, "U064KUGRJ": 5}
        zerver_userprofile = [{'id': 1}, {'id': 8}, {'id': 7}, {'id': 5}]
        realm_id = 3

        with self.assertLogs(level="INFO"):
            realm, added_channels, added_mpims, dm_members, slack_recipient_name_to_zulip_recipient_id = \
                channels_to_zerver_stream(self.fixture_file_name("", "slack_fixtures"), realm_id,
                                          {"zerver_userpresence": []}, slack_user_id_to_zulip_user_id,
                                          zerver_userprofile)

        test_added_channels = {'sharedchannel': ("C061A0HJG", 3), 'general': ("C061A0YJG", 1),
                               'general1': ("C061A0YJP", 2), 'random': ("C061A0WJG", 0)}
        test_added_mpims = {'mpdm-user9--user2--user10-1': ('G9HBG2A5D', 0),
                            'mpdm-user6--user7--user4-1': ('G6H1Z0ZPS', 1),
                            'mpdm-user4--user1--user5-1': ('G6N944JPL', 2)}
        test_dm_members = {'DJ47BL849': ('U061A1R2R', 'U061A5N1G'), 'DHX1UP7EG': ('U061A5N1G', 'U064KUGRJ'),
                           'DK8HSJDHS': ('U061A1R2R', 'U064KUGRJ'), 'DRS3PSLDK': ('U064KUGRJ', 'U064KUGRJ')}
        slack_recipient_names = set(slack_user_id_to_zulip_user_id.keys()) | set(test_added_channels.keys()) \
            | set(test_added_mpims.keys())

        self.assertDictEqual(test_added_channels, added_channels)
        # zerver defaultstream already tested in helper functions.
        # Note that the `random` stream is archived and thus should
        # not be created as a DefaultStream.
        self.assertEqual(realm["zerver_defaultstream"],
                         [{'id': 0, 'realm': 3, 'stream': 1}])

        self.assertDictEqual(test_added_mpims, added_mpims)
        self.assertDictEqual(test_dm_members, dm_members)

        # We can't do an assertDictEqual since during the construction of personal
        # recipients, slack_user_id_to_zulip_user_id are iterated in different order in Python 3.5 and 3.6.
        self.assertEqual(set(slack_recipient_name_to_zulip_recipient_id.keys()), slack_recipient_names)
        self.assertEqual(set(slack_recipient_name_to_zulip_recipient_id.values()), set(range(11)))

        # functioning of zerver subscriptions are already tested in the helper functions
        # This is to check the concatenation of the output lists from the helper functions
        # subscriptions for stream
        zerver_subscription = realm["zerver_subscription"]
        zerver_recipient = realm["zerver_recipient"]
        zerver_stream = realm["zerver_stream"]

        self.assertEqual(self.get_set(zerver_subscription, "recipient"), set(range(11)))
        self.assertEqual(self.get_set(zerver_subscription, "user_profile"), {1, 5, 7, 8})

        self.assertEqual(self.get_set(zerver_recipient, "id"), self.get_set(zerver_subscription, "recipient"))
        self.assertEqual(self.get_set(zerver_recipient, "type_id"), {0, 1, 2, 3, 5, 7, 8})
        self.assertEqual(self.get_set(zerver_recipient, "type"), {1, 2, 3})

        # stream mapping
        self.assertEqual(zerver_stream[0]['name'], "random")
        self.assertEqual(zerver_stream[0]['deactivated'], True)
        self.assertEqual(zerver_stream[0]['description'], 'no purpose')
        self.assertEqual(zerver_stream[0]['invite_only'], False)
        self.assertEqual(zerver_stream[0]['realm'], realm_id)
        self.assertEqual(zerver_stream[2]['id'],
                         test_added_channels[zerver_stream[2]['name']][1])

        self.assertEqual(self.get_set(realm["zerver_huddle"], "id"), {0, 1, 2})
        self.assertEqual(realm["zerver_userpresence"], [])

    @mock.patch("zerver.data_import.slack.users_to_zerver_userprofile",
                return_value=[[], [], {}, [], []])
    @mock.patch("zerver.data_import.slack.channels_to_zerver_stream",
                return_value=[{"zerver_stream": []}, {}, {}, {}, {}])
    def test_slack_workspace_to_realm(self, mock_channels_to_zerver_stream: mock.Mock,
                                      mock_users_to_zerver_userprofile: mock.Mock) -> None:

        realm_id = 1
        user_list: List[Dict[str, Any]] = []
        realm, slack_user_id_to_zulip_user_id, slack_recipient_name_to_zulip_recipient_id, \
            added_channels, added_mpims, dm_members, \
            avatar_list, em = slack_workspace_to_realm('testdomain', realm_id, user_list, 'test-realm',
                                                       './random_path', {})
        test_zerver_realmdomain = [{'realm': realm_id, 'allow_subdomains': False,
                                    'domain': 'testdomain', 'id': realm_id}]
        # Functioning already tests in helper functions
        self.assertEqual(slack_user_id_to_zulip_user_id, {})
        self.assertEqual(added_channels, {})
        self.assertEqual(added_mpims, {})
        self.assertEqual(slack_recipient_name_to_zulip_recipient_id, {})
        self.assertEqual(avatar_list, [])

        mock_channels_to_zerver_stream.assert_called_once_with("./random_path", 1, ANY, {}, [])
        passed_realm = mock_channels_to_zerver_stream.call_args_list[0][0][2]
        zerver_realmdomain = passed_realm['zerver_realmdomain']
        self.assertListEqual(zerver_realmdomain, test_zerver_realmdomain)
        self.assertEqual(passed_realm['zerver_realm'][0]['description'], 'Organization imported from Slack!')
        self.assertEqual(passed_realm['zerver_userpresence'], [])
        self.assertEqual(len(passed_realm.keys()), 14)

        self.assertEqual(realm['zerver_stream'], [])
        self.assertEqual(realm['zerver_userprofile'], [])
        self.assertEqual(realm['zerver_realmemoji'], [])
        self.assertEqual(realm['zerver_customprofilefield'], [])
        self.assertEqual(realm['zerver_customprofilefieldvalue'], [])
        self.assertEqual(len(realm.keys()), 5)

    def test_get_message_sending_user(self) -> None:
        message_with_file = {'subtype': 'file', 'type': 'message',
                             'file': {'user': 'U064KUGRJ'}}
        message_without_file = {'subtype': 'file', 'type': 'messge', 'user': 'U064KUGRJ'}

        user_file = get_message_sending_user(message_with_file)
        self.assertEqual(user_file, 'U064KUGRJ')
        user_without_file = get_message_sending_user(message_without_file)
        self.assertEqual(user_without_file, 'U064KUGRJ')

    def test_build_zerver_message(self) -> None:
        zerver_usermessage: List[Dict[str, Any]] = []

        # recipient_id -> set of user_ids
        subscriber_map = {
            2: {3, 7, 15, 16},  # these we care about
            4: {12},
            6: {19, 21},
        }

        recipient_id = 2
        mentioned_user_ids = [7]
        message_id = 9

        um_id = NEXT_ID('user_message')

        build_usermessages(
            zerver_usermessage=zerver_usermessage,
            subscriber_map=subscriber_map,
            recipient_id=recipient_id,
            mentioned_user_ids=mentioned_user_ids,
            message_id=message_id,
            is_private=False,
        )

        self.assertEqual(zerver_usermessage[0]['id'], um_id + 1)
        self.assertEqual(zerver_usermessage[0]['message'], message_id)
        self.assertEqual(zerver_usermessage[0]['flags_mask'], 1)

        self.assertEqual(zerver_usermessage[1]['id'], um_id + 2)
        self.assertEqual(zerver_usermessage[1]['message'], message_id)
        self.assertEqual(zerver_usermessage[1]['user_profile'], 7)
        self.assertEqual(zerver_usermessage[1]['flags_mask'], 9)  # mentioned

        self.assertEqual(zerver_usermessage[2]['id'], um_id + 3)
        self.assertEqual(zerver_usermessage[2]['message'], message_id)

        self.assertEqual(zerver_usermessage[3]['id'], um_id + 4)
        self.assertEqual(zerver_usermessage[3]['message'], message_id)

    @mock.patch("zerver.data_import.slack.build_usermessages", return_value = (2, 4))
    def test_channel_message_to_zerver_message(self, mock_build_usermessage: mock.Mock) -> None:

        user_data = [{"id": "U066MTL5U", "name": "john doe", "deleted": False, "real_name": "John"},
                     {"id": "U061A5N1G", "name": "jane doe", "deleted": False, "real_name": "Jane"},
                     {"id": "U061A1R2R", "name": "jon", "deleted": False, "real_name": "Jon"}]

        slack_user_id_to_zulip_user_id = {"U066MTL5U": 5, "U061A5N1G": 24, "U061A1R2R": 43}

        reactions = [{"name": "grinning", "users": ["U061A5N1G"], "count": 1}]

        all_messages: List[Dict[str, Any]] = [
            {"text": "<@U066MTL5U> has joined the channel", "subtype": "channel_join",
             "user": "U066MTL5U", "ts": "1434139102.000002", "channel_name": "random"},
            {"text": "<@U061A5N1G>: hey!", "user": "U061A1R2R",
             "ts": "1437868294.000006", "has_image": True, "channel_name": "random"},
            {"text": "random", "user": "U061A5N1G", "reactions": reactions,
             "ts": "1439868294.000006", "channel_name": "random"},
            {"text": "without a user", "user": None,  # this message will be ignored as it has no user
             "ts": "1239868294.000006", "channel_name": "general"},
            {"text": "<http://journals.plos.org/plosone/article>", "user": "U061A1R2R",
             "ts": "1463868370.000008", "channel_name": "general"},
            {"text": "added bot", "user": "U061A5N1G", "subtype": "bot_add",
             "ts": "1433868549.000010", "channel_name": "general"},
            # This message will be ignored since it has no user and file is None.
            # See #9217 for the situation; likely file uploads on archived channels
            {'upload': False, 'file': None, 'text': 'A file was shared',
             'channel_name': 'general', 'type': 'message', 'ts': '1433868549.000011',
             'subtype': 'file_share'},
            {"text": "random test", "user": "U061A1R2R",
             "ts": "1433868669.000012", "channel_name": "general"},
            {"text": "Hello everyone", "user": "U061A1R2R", "type": "message",
             "ts": "1433868669.000015", "mpim_name": "mpdm-user9--user2--user10-1"},
            {"text": "Who is watching the World Cup", "user": "U061A5N1G", "type": "message",
             "ts": "1433868949.000015", "mpim_name": "mpdm-user6--user7--user4-1"},
            {'client_msg_id': '998d9229-35aa-424f-8d87-99e00df27dc9', 'type': 'message',
             'text': 'Who is coming for camping this weekend?', 'user': 'U061A1R2R',
             'ts': '1553607595.000700', 'pm_name': 'DHX1UP7EG'},
            {"client_msg_id": "998d9229-35aa-424f-8d87-99e00df27dc9", "type": "message",
             "text": "<@U061A5N1G>: Are you in Kochi?", "user": "U066MTL5U",
             "ts": "1553607595.000700", "pm_name": "DJ47BL849"},
        ]

        slack_recipient_name_to_zulip_recipient_id = {'random': 2, 'general': 1, 'mpdm-user9--user2--user10-1': 5,
                                                      'mpdm-user6--user7--user4-1': 6, 'U066MTL5U': 7, 'U061A5N1G': 8,
                                                      'U061A1R2R': 8}
        dm_members = {'DJ47BL849': ('U066MTL5U', 'U061A5N1G'), 'DHX1UP7EG': ('U061A5N1G', 'U061A1R2R')}

        zerver_usermessage: List[Dict[str, Any]] = []
        subscriber_map: Dict[int, Set[int]] = {}
        added_channels: Dict[str, Tuple[str, int]] = {'random': ('c5', 1), 'general': ('c6', 2)}

        zerver_message, zerver_usermessage, attachment, uploads, reaction = \
            channel_message_to_zerver_message(
                1, user_data, slack_user_id_to_zulip_user_id, slack_recipient_name_to_zulip_recipient_id,
                all_messages, [], subscriber_map, added_channels, dm_members, 'domain', set())
        # functioning already tested in helper function
        self.assertEqual(zerver_usermessage, [])
        # subtype: channel_join is filtered
        self.assertEqual(len(zerver_message), 9)

        self.assertEqual(uploads, [])
        self.assertEqual(attachment, [])

        # Test reactions
        self.assertEqual(reaction[0]['user_profile'], 24)
        self.assertEqual(reaction[0]['emoji_name'], reactions[0]['name'])

        # Message conversion already tested in tests.test_slack_message_conversion
        self.assertEqual(zerver_message[0]['content'], '@**Jane**: hey!')
        self.assertEqual(zerver_message[0]['has_link'], False)
        self.assertEqual(zerver_message[2]['content'], 'http://journals.plos.org/plosone/article')
        self.assertEqual(zerver_message[2]['has_link'], True)
        self.assertEqual(zerver_message[5]['has_link'], False)
        self.assertEqual(zerver_message[7]['has_link'], False)

        self.assertEqual(zerver_message[3][EXPORT_TOPIC_NAME], 'imported from Slack')
        self.assertEqual(zerver_message[3]['content'], '/me added bot')
        self.assertEqual(zerver_message[4]['recipient'], slack_recipient_name_to_zulip_recipient_id['general'])
        self.assertEqual(zerver_message[2][EXPORT_TOPIC_NAME], 'imported from Slack')
        self.assertEqual(zerver_message[1]['recipient'], slack_recipient_name_to_zulip_recipient_id['random'])
        self.assertEqual(zerver_message[5]['recipient'], slack_recipient_name_to_zulip_recipient_id['mpdm-user9--user2--user10-1'])
        self.assertEqual(zerver_message[6]['recipient'], slack_recipient_name_to_zulip_recipient_id['mpdm-user6--user7--user4-1'])
        self.assertEqual(zerver_message[7]['recipient'], slack_recipient_name_to_zulip_recipient_id['U061A5N1G'])
        self.assertEqual(zerver_message[7]['recipient'], slack_recipient_name_to_zulip_recipient_id['U061A5N1G'])

        self.assertEqual(zerver_message[3]['id'], zerver_message[0]['id'] + 3)
        self.assertEqual(zerver_message[4]['id'], zerver_message[0]['id'] + 4)
        self.assertEqual(zerver_message[5]['id'], zerver_message[0]['id'] + 5)
        self.assertEqual(zerver_message[7]['id'], zerver_message[0]['id'] + 7)

        self.assertIsNone(zerver_message[3]['rendered_content'])
        self.assertEqual(zerver_message[0]['has_image'], False)
        self.assertEqual(zerver_message[0]['date_sent'], float(all_messages[1]['ts']))
        self.assertEqual(zerver_message[2]['rendered_content_version'], 1)

        self.assertEqual(zerver_message[0]['sender'], 43)
        self.assertEqual(zerver_message[3]['sender'], 24)
        self.assertEqual(zerver_message[5]['sender'], 43)
        self.assertEqual(zerver_message[6]['sender'], 24)
        self.assertEqual(zerver_message[7]['sender'], 43)
        self.assertEqual(zerver_message[8]['sender'], 5)

    @mock.patch("zerver.data_import.slack.channel_message_to_zerver_message")
    @mock.patch("zerver.data_import.slack.get_messages_iterator")
    def test_convert_slack_workspace_messages(self, mock_get_messages_iterator: mock.Mock,
                                              mock_message: mock.Mock) -> None:
        output_dir = os.path.join(settings.TEST_WORKER_DIR, 'test-slack-import')
        os.makedirs(output_dir, exist_ok=True)

        added_channels: Dict[str, Tuple[str, int]] = {'random': ('c5', 1), 'general': ('c6', 2)}

        time = float(timezone_now().timestamp())
        zerver_message = [{'id': 1, 'ts': time}, {'id': 5, 'ts': time}]

        def fake_get_messages_iter(slack_data_dir: str, added_channels: AddedChannelsT,
                                   added_mpims: AddedMPIMsT, dm_members: DMMembersT) -> Iterator[ZerverFieldsT]:
            import copy
            return iter(copy.deepcopy(zerver_message))

        realm: Dict[str, Any] = {'zerver_subscription': []}
        user_list: List[Dict[str, Any]] = []
        reactions = [{"name": "grinning", "users": ["U061A5N1G"], "count": 1}]
        attachments: List[Dict[str, Any]] = []
        uploads: List[Dict[str, Any]] = []

        zerver_usermessage = [{'id': 3}, {'id': 5}, {'id': 6}, {'id': 9}]

        mock_get_messages_iterator.side_effect = fake_get_messages_iter
        mock_message.side_effect = [[zerver_message[:1], zerver_usermessage[:2],
                                     attachments, uploads, reactions[:1]],
                                    [zerver_message[1:2], zerver_usermessage[2:5],
                                     attachments, uploads, reactions[1:1]]]

        with self.assertLogs(level="INFO"):
            # Hacky: We should include a zerver_userprofile, not the empty []
            test_reactions, uploads, zerver_attachment = convert_slack_workspace_messages(
                './random_path', user_list, 2, {}, {}, added_channels, {}, {},
                realm, [], [], 'domain', output_dir=output_dir, chunk_size=1)

        messages_file_1 = os.path.join(output_dir, 'messages-000001.json')
        self.assertTrue(os.path.exists(messages_file_1))
        messages_file_2 = os.path.join(output_dir, 'messages-000002.json')
        self.assertTrue(os.path.exists(messages_file_2))

        with open(messages_file_1, "rb") as f:
            message_json = orjson.loads(f.read())
        self.assertEqual(message_json['zerver_message'], zerver_message[:1])
        self.assertEqual(message_json['zerver_usermessage'], zerver_usermessage[:2])

        with open(messages_file_2, "rb") as f:
            message_json = orjson.loads(f.read())
        self.assertEqual(message_json['zerver_message'], zerver_message[1:2])
        self.assertEqual(message_json['zerver_usermessage'], zerver_usermessage[2:5])

        self.assertEqual(test_reactions, reactions)

    @mock.patch("zerver.data_import.slack.requests.get")
    @mock.patch("zerver.data_import.slack.process_uploads", return_value = [])
    @mock.patch("zerver.data_import.slack.build_attachment",
                return_value = [])
    @mock.patch("zerver.data_import.slack.build_avatar_url")
    @mock.patch("zerver.data_import.slack.build_avatar")
    @mock.patch("zerver.data_import.slack.get_slack_api_data")
    def test_slack_import_to_existing_database(self, mock_get_slack_api_data: mock.Mock,
                                               mock_build_avatar_url: mock.Mock,
                                               mock_build_avatar: mock.Mock,
                                               mock_process_uploads: mock.Mock,
                                               mock_attachment: mock.Mock,
                                               mock_requests_get: mock.Mock) -> None:
        test_slack_dir = os.path.join(settings.DEPLOY_ROOT, "zerver", "tests", "fixtures",
                                      "slack_fixtures")
        test_slack_zip_file = os.path.join(test_slack_dir, "test_slack_importer.zip")
        test_slack_unzipped_file = os.path.join(test_slack_dir, "test_slack_importer")

        test_realm_subdomain = 'test-slack-import'
        output_dir = os.path.join(settings.DEPLOY_ROOT, "var", "test-slack-importer-data")
        token = 'xoxp-valid-token'

        # If the test fails, the 'output_dir' would not be deleted and hence it would give an
        # error when we run the tests next time, as 'do_convert_data' expects an empty 'output_dir'
        # hence we remove it before running 'do_convert_data'
        self.rm_tree(output_dir)
        # Also the unzipped data file should be removed if the test fails at 'do_convert_data'
        self.rm_tree(test_slack_unzipped_file)

        user_data_fixture = orjson.loads(self.fixture_data('user_data.json', type='slack_fixtures'))
        team_info_fixture = orjson.loads(self.fixture_data('team_info.json', type='slack_fixtures'))
        mock_get_slack_api_data.side_effect = [user_data_fixture['members'], {}, team_info_fixture["team"]]
        with get_test_image_file("img.png") as f:
            mock_requests_get.return_value.raw = BytesIO(f.read())

        with self.assertLogs(level="INFO"):
            do_convert_data(test_slack_zip_file, output_dir, token)

        self.assertTrue(os.path.exists(output_dir))
        self.assertTrue(os.path.exists(output_dir + '/realm.json'))

        realm_icons_path = os.path.join(output_dir, 'realm_icons')
        realm_icon_records_path = os.path.join(realm_icons_path, 'records.json')

        self.assertTrue(os.path.exists(realm_icon_records_path))
        with open(realm_icon_records_path, "rb") as f:
            records = orjson.loads(f.read())
            self.assertEqual(len(records), 2)
            self.assertEqual(records[0]["path"], "0/icon.original")
            self.assertTrue(os.path.exists(os.path.join(realm_icons_path, records[0]["path"])))

            self.assertEqual(records[1]["path"], "0/icon.png")
            self.assertTrue(os.path.exists(os.path.join(realm_icons_path, records[1]["path"])))

        # test import of the converted slack data into an existing database
        with self.settings(BILLING_ENABLED=False), self.assertLogs(level="INFO"):
            do_import_realm(output_dir, test_realm_subdomain)
        realm = get_realm(test_realm_subdomain)
        self.assertTrue(realm.name, test_realm_subdomain)
        self.assertEqual(realm.icon_source, Realm.ICON_UPLOADED)

        # test RealmAuditLog
        realmauditlog = RealmAuditLog.objects.filter(realm=realm)
        realmauditlog_event_type = {log.event_type for log in realmauditlog}
        self.assertEqual(realmauditlog_event_type, {RealmAuditLog.SUBSCRIPTION_CREATED,
                                                    RealmAuditLog.REALM_PLAN_TYPE_CHANGED})

        Realm.objects.filter(name=test_realm_subdomain).delete()

        remove_folder(output_dir)
        # remove tar file created in 'do_convert_data' function
        os.remove(output_dir + '.tar.gz')
        self.assertFalse(os.path.exists(output_dir))

    def test_message_files(self) -> None:
        alice_id = 7
        alice = dict(
            id=alice_id,
            profile=dict(
                email='alice@example.com',
            ),
        )
        files = [
            dict(
                url_private='files.slack.com/apple.png',
                title='Apple',
                name='apple.png',
                mimetype='image/png',
                timestamp=9999,
                created=8888,
                size=3000000,
            ),
            dict(
                url_private='example.com/banana.zip',
                title='banana',
            ),
        ]
        message = dict(
            user=alice_id,
            files=files,
        )
        domain_name = 'example.com'
        realm_id = 5
        message_id = 99
        slack_user_id = 'alice'
        users = [alice]
        slack_user_id_to_zulip_user_id = {
            'alice': alice_id,
        }

        zerver_attachment: List[Dict[str, Any]] = []
        uploads_list: List[Dict[str, Any]] = []

        info = process_message_files(
            message=message,
            domain_name=domain_name,
            realm_id=realm_id,
            message_id=message_id,
            slack_user_id=slack_user_id,
            users=users,
            slack_user_id_to_zulip_user_id=slack_user_id_to_zulip_user_id,
            zerver_attachment=zerver_attachment,
            uploads_list=uploads_list,
        )
        self.assertEqual(len(zerver_attachment), 1)
        self.assertEqual(len(uploads_list), 1)

        image_path = zerver_attachment[0]['path_id']
        self.assertIn('/SlackImportAttachment/', image_path)
        expected_content = f'[Apple](/user_uploads/{image_path})\n[banana](example.com/banana.zip)'
        self.assertEqual(info['content'], expected_content)

        self.assertTrue(info['has_link'])
        self.assertTrue(info['has_image'])

        self.assertEqual(uploads_list[0]['s3_path'], image_path)
        self.assertEqual(uploads_list[0]['realm_id'], realm_id)
        self.assertEqual(uploads_list[0]['user_profile_email'], 'alice@example.com')
