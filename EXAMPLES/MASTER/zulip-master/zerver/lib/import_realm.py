import datetime
import logging
import multiprocessing
import os
import secrets
import shutil
from typing import Any, Dict, Iterable, List, Optional, Tuple

import orjson
from bs4 import BeautifulSoup
from django.conf import settings
from django.core.cache import cache
from django.db import connection
from django.utils.timezone import now as timezone_now
from psycopg2.extras import execute_values
from psycopg2.sql import SQL, Identifier

from analytics.models import RealmCount, StreamCount, UserCount
from zerver.lib.actions import (
    UserMessageLite,
    bulk_insert_ums,
    do_change_avatar_fields,
    do_change_plan_type,
)
from zerver.lib.avatar_hash import user_avatar_path_from_ids
from zerver.lib.bulk_create import bulk_create_users, bulk_set_users_or_streams_recipient_fields
from zerver.lib.export import DATE_FIELDS, Field, Path, Record, TableData, TableName
from zerver.lib.markdown import markdown_convert
from zerver.lib.markdown import version as markdown_version
from zerver.lib.message import get_last_message_id
from zerver.lib.server_initialization import create_internal_realm, server_initialized
from zerver.lib.streams import render_stream_description
from zerver.lib.timestamp import datetime_to_timestamp
from zerver.lib.upload import BadImageError, get_bucket, guess_type, sanitize_name
from zerver.lib.utils import generate_api_key, process_list_in_batches
from zerver.models import (
    AlertWord,
    Attachment,
    BotConfigData,
    BotStorageData,
    Client,
    CustomProfileField,
    CustomProfileFieldValue,
    DefaultStream,
    Huddle,
    Message,
    MutedTopic,
    Reaction,
    Realm,
    RealmAuditLog,
    RealmDomain,
    RealmEmoji,
    RealmFilter,
    Recipient,
    Service,
    Stream,
    Subscription,
    UserActivity,
    UserActivityInterval,
    UserGroup,
    UserGroupMembership,
    UserHotspot,
    UserMessage,
    UserPresence,
    UserProfile,
    get_huddle_hash,
    get_system_bot,
    get_user_profile_by_id,
)

realm_tables = [("zerver_defaultstream", DefaultStream, "defaultstream"),
                ("zerver_realmemoji", RealmEmoji, "realmemoji"),
                ("zerver_realmdomain", RealmDomain, "realmdomain"),
                ("zerver_realmfilter", RealmFilter, "realmfilter")]  # List[Tuple[TableName, Any, str]]


# ID_MAP is a dictionary that maps table names to dictionaries
# that map old ids to new ids.  We use this in
# re_map_foreign_keys and other places.
#
# We explicitly initialize ID_MAP with the tables that support
# id re-mapping.
#
# Code reviewers: give these tables extra scrutiny, as we need to
# make sure to reload related tables AFTER we re-map the ids.
ID_MAP: Dict[str, Dict[int, int]] = {
    'alertword': {},
    'client': {},
    'user_profile': {},
    'huddle': {},
    'realm': {},
    'stream': {},
    'recipient': {},
    'subscription': {},
    'defaultstream': {},
    'reaction': {},
    'realmemoji': {},
    'realmdomain': {},
    'realmfilter': {},
    'message': {},
    'user_presence': {},
    'useractivity': {},
    'useractivityinterval': {},
    'usermessage': {},
    'customprofilefield': {},
    'customprofilefieldvalue': {},
    'attachment': {},
    'realmauditlog': {},
    'recipient_to_huddle_map': {},
    'userhotspot': {},
    'mutedtopic': {},
    'service': {},
    'usergroup': {},
    'usergroupmembership': {},
    'botstoragedata': {},
    'botconfigdata': {},
    'analytics_realmcount': {},
    'analytics_streamcount': {},
    'analytics_usercount': {},
}

id_map_to_list: Dict[str, Dict[int, List[int]]] = {
    'huddle_to_user_list': {},
}

path_maps: Dict[str, Dict[str, str]] = {
    'attachment_path': {},
}

def update_id_map(table: TableName, old_id: int, new_id: int) -> None:
    if table not in ID_MAP:
        raise Exception(f'''
            Table {table} is not initialized in ID_MAP, which could
            mean that we have not thought through circular
            dependencies.
            ''')
    ID_MAP[table][old_id] = new_id

def fix_datetime_fields(data: TableData, table: TableName) -> None:
    for item in data[table]:
        for field_name in DATE_FIELDS[table]:
            if item[field_name] is not None:
                item[field_name] = datetime.datetime.fromtimestamp(item[field_name], tz=datetime.timezone.utc)

def fix_upload_links(data: TableData, message_table: TableName) -> None:
    """
    Because the URLs for uploaded files encode the realm ID of the
    organization being imported (which is only determined at import
    time), we need to rewrite the URLs of links to uploaded files
    during the import process.
    """
    for message in data[message_table]:
        if message['has_attachment'] is True:
            for key, value in path_maps['attachment_path'].items():
                if key in message['content']:
                    message['content'] = message['content'].replace(key, value)
                    if message['rendered_content']:
                        message['rendered_content'] = message['rendered_content'].replace(key, value)

def create_subscription_events(data: TableData, realm_id: int) -> None:
    """
    When the export data doesn't contain the table `zerver_realmauditlog`,
    this function creates RealmAuditLog objects for `subscription_created`
    type event for all the existing Stream subscriptions.

    This is needed for all the export tools which do not include the
    table `zerver_realmauditlog` (Slack, Gitter, etc.) because the appropriate
    data about when a user was subscribed is not exported by the third-party
    service.
    """
    all_subscription_logs = []

    event_last_message_id = get_last_message_id()
    event_time = timezone_now()

    recipient_id_to_stream_id = {
        d['id']: d['type_id']
        for d in data['zerver_recipient']
        if d['type'] == Recipient.STREAM
    }

    for sub in data['zerver_subscription']:
        recipient_id = sub['recipient_id']
        stream_id = recipient_id_to_stream_id.get(recipient_id)

        if stream_id is None:
            continue

        user_id = sub['user_profile_id']

        all_subscription_logs.append(RealmAuditLog(realm_id=realm_id,
                                                   acting_user_id=user_id,
                                                   modified_user_id=user_id,
                                                   modified_stream_id=stream_id,
                                                   event_last_message_id=event_last_message_id,
                                                   event_time=event_time,
                                                   event_type=RealmAuditLog.SUBSCRIPTION_CREATED))
    RealmAuditLog.objects.bulk_create(all_subscription_logs)

def fix_service_tokens(data: TableData, table: TableName) -> None:
    """
    The tokens in the services are created by 'generate_api_key'.
    As the tokens are unique, they should be re-created for the imports.
    """
    for item in data[table]:
        item['token'] = generate_api_key()

def process_huddle_hash(data: TableData, table: TableName) -> None:
    """
    Build new huddle hashes with the updated ids of the users
    """
    for huddle in data[table]:
        user_id_list = id_map_to_list['huddle_to_user_list'][huddle['id']]
        huddle['huddle_hash'] = get_huddle_hash(user_id_list)

def get_huddles_from_subscription(data: TableData, table: TableName) -> None:
    """
    Extract the IDs of the user_profiles involved in a huddle from the subscription object
    This helps to generate a unique huddle hash from the updated user_profile ids
    """
    id_map_to_list['huddle_to_user_list'] = {
        value: [] for value in ID_MAP['recipient_to_huddle_map'].values()}

    for subscription in data[table]:
        if subscription['recipient'] in ID_MAP['recipient_to_huddle_map']:
            huddle_id = ID_MAP['recipient_to_huddle_map'][subscription['recipient']]
            id_map_to_list['huddle_to_user_list'][huddle_id].append(subscription['user_profile_id'])

def fix_customprofilefield(data: TableData) -> None:
    """
    In CustomProfileField with 'field_type' like 'USER', the IDs need to be
    re-mapped.
    """
    field_type_USER_id_list = []
    for item in data['zerver_customprofilefield']:
        if item['field_type'] == CustomProfileField.USER:
            field_type_USER_id_list.append(item['id'])

    for item in data['zerver_customprofilefieldvalue']:
        if item['field_id'] in field_type_USER_id_list:
            old_user_id_list = orjson.loads(item['value'])

            new_id_list = re_map_foreign_keys_many_to_many_internal(
                table='zerver_customprofilefieldvalue',
                field_name='value',
                related_table='user_profile',
                old_id_list=old_user_id_list)
            item['value'] = orjson.dumps(new_id_list).decode()

def fix_message_rendered_content(realm: Realm,
                                 sender_map: Dict[int, Record],
                                 messages: List[Record]) -> None:
    """
    This function sets the rendered_content of all the messages
    after the messages have been imported from a non-Zulip platform.
    """
    for message in messages:
        if message['rendered_content'] is not None:
            # For Zulip->Zulip imports, we use the original rendered
            # Markdown; this avoids issues where e.g. a mention can no
            # longer render properly because a user has changed their
            # name.
            #
            # However, we still need to update the data-user-id and
            # similar values stored on mentions, stream mentions, and
            # similar syntax in the rendered HTML.
            soup = BeautifulSoup(message["rendered_content"], "html.parser")

            user_mentions = soup.findAll("span", {"class": "user-mention"})
            if len(user_mentions) != 0:
                user_id_map = ID_MAP["user_profile"]
                for mention in user_mentions:
                    if not mention.has_attr("data-user-id"):
                        # Legacy mentions don't have a data-user-id
                        # field; we should just import them
                        # unmodified.
                        continue
                    if mention['data-user-id'] == "*":
                        # No rewriting is required for wildcard mentions
                        continue
                    old_user_id = int(mention["data-user-id"])
                    if old_user_id in user_id_map:
                        mention["data-user-id"] = str(user_id_map[old_user_id])
                message['rendered_content'] = str(soup)

            stream_mentions = soup.findAll("a", {"class": "stream"})
            if len(stream_mentions) != 0:
                stream_id_map = ID_MAP["stream"]
                for mention in stream_mentions:
                    old_stream_id = int(mention["data-stream-id"])
                    if old_stream_id in stream_id_map:
                        mention["data-stream-id"] = str(stream_id_map[old_stream_id])
                message['rendered_content'] = str(soup)

            user_group_mentions = soup.findAll("span", {"class": "user-group-mention"})
            if len(user_group_mentions) != 0:
                user_group_id_map = ID_MAP["usergroup"]
                for mention in user_group_mentions:
                    old_user_group_id = int(mention["data-user-group-id"])
                    if old_user_group_id in user_group_id_map:
                        mention["data-user-group-id"] = str(user_group_id_map[old_user_group_id])
                message['rendered_content'] = str(soup)
            continue

        try:
            content = message['content']

            sender_id = message['sender_id']
            sender = sender_map[sender_id]
            sent_by_bot = sender['is_bot']
            translate_emoticons = sender['translate_emoticons']

            # We don't handle alert words on import from third-party
            # platforms, since they generally don't have an "alert
            # words" type feature, and notifications aren't important anyway.
            realm_alert_words_automaton = None

            rendered_content = markdown_convert(
                content=content,
                realm_alert_words_automaton=realm_alert_words_automaton,
                message_realm=realm,
                sent_by_bot=sent_by_bot,
                translate_emoticons=translate_emoticons,
            )

            message['rendered_content'] = rendered_content
            message['rendered_content_version'] = markdown_version
        except Exception:
            # This generally happens with two possible causes:
            # * rendering Markdown throwing an uncaught exception
            # * rendering Markdown failing with the exception being
            #   caught in Markdown (which then returns None, causing the the
            #   rendered_content assert above to fire).
            logging.warning("Error in Markdown rendering for message ID %s; continuing", message['id'])

def current_table_ids(data: TableData, table: TableName) -> List[int]:
    """
    Returns the ids present in the current table
    """
    id_list = []
    for item in data[table]:
        id_list.append(item["id"])
    return id_list

def idseq(model_class: Any) -> str:
    if model_class == RealmDomain:
        return 'zerver_realmalias_id_seq'
    elif model_class == BotStorageData:
        return 'zerver_botuserstatedata_id_seq'
    elif model_class == BotConfigData:
        return 'zerver_botuserconfigdata_id_seq'
    return f'{model_class._meta.db_table}_id_seq'

def allocate_ids(model_class: Any, count: int) -> List[int]:
    """
    Increases the sequence number for a given table by the amount of objects being
    imported into that table. Hence, this gives a reserved range of IDs to import the
    converted Slack objects into the tables.
    """
    conn = connection.cursor()
    sequence = idseq(model_class)
    conn.execute("select nextval(%s) from generate_series(1, %s)",
                 [sequence, count])
    query = conn.fetchall()  # Each element in the result is a tuple like (5,)
    conn.close()
    # convert List[Tuple[int]] to List[int]
    return [item[0] for item in query]

def convert_to_id_fields(data: TableData, table: TableName, field_name: Field) -> None:
    '''
    When Django gives us dict objects via model_to_dict, the foreign
    key fields are `foo`, but we want `foo_id` for the bulk insert.
    This function handles the simple case where we simply rename
    the fields.  For cases where we need to munge ids in the
    database, see re_map_foreign_keys.
    '''
    for item in data[table]:
        item[field_name + "_id"] = item[field_name]
        del item[field_name]

def re_map_foreign_keys(data: TableData,
                        table: TableName,
                        field_name: Field,
                        related_table: TableName,
                        verbose: bool=False,
                        id_field: bool=False,
                        recipient_field: bool=False,
                        reaction_field: bool=False) -> None:
    """
    This is a wrapper function for all the realm data tables
    and only avatar and attachment records need to be passed through the internal function
    because of the difference in data format (TableData corresponding to realm data tables
    and List[Record] corresponding to the avatar and attachment records)
    """

    # See comments in bulk_import_user_message_data.
    assert('usermessage' not in related_table)

    re_map_foreign_keys_internal(data[table], table, field_name, related_table, verbose, id_field,
                                 recipient_field, reaction_field)

def re_map_foreign_keys_internal(data_table: List[Record],
                                 table: TableName,
                                 field_name: Field,
                                 related_table: TableName,
                                 verbose: bool=False,
                                 id_field: bool=False,
                                 recipient_field: bool=False,
                                 reaction_field: bool=False) -> None:
    '''
    We occasionally need to assign new ids to rows during the
    import/export process, to accommodate things like existing rows
    already being in tables.  See bulk_import_client for more context.

    The tricky part is making sure that foreign key references
    are in sync with the new ids, and this fixer function does
    the re-mapping.  (It also appends `_id` to the field.)
    '''
    lookup_table = ID_MAP[related_table]
    for item in data_table:
        old_id = item[field_name]
        if recipient_field:
            if related_table == "stream" and item['type'] == 2:
                pass
            elif related_table == "user_profile" and item['type'] == 1:
                pass
            elif related_table == "huddle" and item['type'] == 3:
                # save the recipient id with the huddle id, so that we can extract
                # the user_profile ids involved in a huddle with the help of the
                # subscription object
                # check function 'get_huddles_from_subscription'
                ID_MAP['recipient_to_huddle_map'][item['id']] = lookup_table[old_id]
            else:
                continue
        old_id = item[field_name]
        if reaction_field:
            if item['reaction_type'] == Reaction.REALM_EMOJI:
                old_id = int(old_id)
            else:
                continue
        if old_id in lookup_table:
            new_id = lookup_table[old_id]
            if verbose:
                logging.info('Remapping %s %s from %s to %s',
                             table, field_name + '_id', old_id, new_id)
        else:
            new_id = old_id
        if not id_field:
            item[field_name + "_id"] = new_id
            del item[field_name]
        else:
            if reaction_field:
                item[field_name] = str(new_id)
            else:
                item[field_name] = new_id

def re_map_foreign_keys_many_to_many(data: TableData,
                                     table: TableName,
                                     field_name: Field,
                                     related_table: TableName,
                                     verbose: bool=False) -> None:
    """
    We need to assign new ids to rows during the import/export
    process.

    The tricky part is making sure that foreign key references
    are in sync with the new ids, and this wrapper function does
    the re-mapping only for ManyToMany fields.
    """
    for item in data[table]:
        old_id_list = item[field_name]
        new_id_list = re_map_foreign_keys_many_to_many_internal(
            table, field_name, related_table, old_id_list, verbose)
        item[field_name] = new_id_list
        del item[field_name]

def re_map_foreign_keys_many_to_many_internal(table: TableName,
                                              field_name: Field,
                                              related_table: TableName,
                                              old_id_list: List[int],
                                              verbose: bool=False) -> List[int]:
    """
    This is an internal function for tables with ManyToMany fields,
    which takes the old ID list of the ManyToMany relation and returns the
    new updated ID list.
    """
    lookup_table = ID_MAP[related_table]
    new_id_list = []
    for old_id in old_id_list:
        if old_id in lookup_table:
            new_id = lookup_table[old_id]
            if verbose:
                logging.info('Remapping %s %s from %s to %s',
                             table, field_name + '_id', old_id, new_id)
        else:
            new_id = old_id
        new_id_list.append(new_id)
    return new_id_list

def fix_bitfield_keys(data: TableData, table: TableName, field_name: Field) -> None:
    for item in data[table]:
        item[field_name] = item[field_name + '_mask']
        del item[field_name + '_mask']

def fix_realm_authentication_bitfield(data: TableData, table: TableName, field_name: Field) -> None:
    """Used to fixup the authentication_methods bitfield to be a string"""
    for item in data[table]:
        values_as_bitstring = ''.join('1' if field[1] else '0' for field in
                                      item[field_name])
        values_as_int = int(values_as_bitstring, 2)
        item[field_name] = values_as_int

def remove_denormalized_recipient_column_from_data(data: TableData) -> None:
    """
    The recipient column shouldn't be imported, we'll set the correct values
    when Recipient table gets imported.
    """
    for stream_dict in data['zerver_stream']:
        if "recipient" in stream_dict:
            del stream_dict["recipient"]

    for user_profile_dict in data['zerver_userprofile']:
        if 'recipient' in user_profile_dict:
            del user_profile_dict['recipient']

    for huddle_dict in data['zerver_huddle']:
        if 'recipient' in huddle_dict:
            del huddle_dict['recipient']

def get_db_table(model_class: Any) -> str:
    """E.g. (RealmDomain -> 'zerver_realmdomain')"""
    return model_class._meta.db_table

def update_model_ids(model: Any, data: TableData, related_table: TableName) -> None:
    table = get_db_table(model)

    # Important: remapping usermessage rows is
    # not only unnessary, it's expensive and can cause
    # memory errors. We don't even use ids from ID_MAP.
    assert('usermessage' not in table)

    old_id_list = current_table_ids(data, table)
    allocated_id_list = allocate_ids(model, len(data[table]))
    for item in range(len(data[table])):
        update_id_map(related_table, old_id_list[item], allocated_id_list[item])
    re_map_foreign_keys(data, table, 'id', related_table=related_table, id_field=True)

def bulk_import_user_message_data(data: TableData, dump_file_id: int) -> None:
    model = UserMessage
    table = 'zerver_usermessage'
    lst = data[table]

    # IMPORTANT NOTE: We do not use any primary id
    # data from either the import itself or ID_MAP.
    # We let the DB itself generate ids.  Note that
    # no tables use user_message.id as a foreign key,
    # so we can safely avoid all re-mapping complexity.

    def process_batch(items: List[Dict[str, Any]]) -> None:
        ums = [
            UserMessageLite(
                user_profile_id = item['user_profile_id'],
                message_id = item['message_id'],
                flags=item['flags'],
            )
            for item in items
        ]
        bulk_insert_ums(ums)

    chunk_size = 10000

    process_list_in_batches(
        lst=lst,
        chunk_size=chunk_size,
        process_batch=process_batch,
    )

    logging.info("Successfully imported %s from %s[%s].", model, table, dump_file_id)

def bulk_import_model(data: TableData, model: Any, dump_file_id: Optional[str]=None) -> None:
    table = get_db_table(model)
    # TODO, deprecate dump_file_id
    model.objects.bulk_create(model(**item) for item in data[table])
    if dump_file_id is None:
        logging.info("Successfully imported %s from %s.", model, table)
    else:
        logging.info("Successfully imported %s from %s[%s].", model, table, dump_file_id)

# Client is a table shared by multiple realms, so in order to
# correctly import multiple realms into the same server, we need to
# check if a Client object already exists, and so we need to support
# remap all Client IDs to the values in the new DB.
def bulk_import_client(data: TableData, model: Any, table: TableName) -> None:
    for item in data[table]:
        try:
            client = Client.objects.get(name=item['name'])
        except Client.DoesNotExist:
            client = Client.objects.create(name=item['name'])
        update_id_map(table='client', old_id=item['id'], new_id=client.id)

def process_avatars(record: Dict[str, Any]) -> None:
    from zerver.lib.upload import upload_backend
    if record['s3_path'].endswith('.original'):
        user_profile = get_user_profile_by_id(record['user_profile_id'])
        if settings.LOCAL_UPLOADS_DIR is not None:
            avatar_path = user_avatar_path_from_ids(user_profile.id, record['realm_id'])
            medium_file_path = os.path.join(settings.LOCAL_UPLOADS_DIR, "avatars",
                                            avatar_path) + '-medium.png'
            if os.path.exists(medium_file_path):
                # We remove the image here primarily to deal with
                # issues when running the import script multiple
                # times in development (where one might reuse the
                # same realm ID from a previous iteration).
                os.remove(medium_file_path)
        try:
            upload_backend.ensure_medium_avatar_image(user_profile=user_profile)
            if record.get("importer_should_thumbnail"):
                upload_backend.ensure_basic_avatar_image(user_profile=user_profile)
        except BadImageError:
            logging.warning(
                "Could not thumbnail avatar image for user %s; ignoring",
                user_profile.id,
            )
            # Delete the record of the avatar to avoid 404s.
            do_change_avatar_fields(user_profile, UserProfile.AVATAR_FROM_GRAVATAR, acting_user=None)

def import_uploads(realm: Realm, import_dir: Path, processes: int, processing_avatars: bool=False,
                   processing_emojis: bool=False, processing_realm_icons: bool=False) -> None:
    if processing_avatars and processing_emojis:
        raise AssertionError("Cannot import avatars and emojis at the same time!")
    if processing_avatars:
        logging.info("Importing avatars")
    elif processing_emojis:
        logging.info("Importing emojis")
    elif processing_realm_icons:
        logging.info("Importing realm icons and logos")
    else:
        logging.info("Importing uploaded files")

    records_filename = os.path.join(import_dir, "records.json")
    with open(records_filename, "rb") as records_file:
        records: List[Dict[str, Any]] = orjson.loads(records_file.read())
    timestamp = datetime_to_timestamp(timezone_now())

    re_map_foreign_keys_internal(records, 'records', 'realm_id', related_table="realm",
                                 id_field=True)
    if not processing_emojis and not processing_realm_icons:
        re_map_foreign_keys_internal(records, 'records', 'user_profile_id',
                                     related_table="user_profile", id_field=True)

    s3_uploads = settings.LOCAL_UPLOADS_DIR is None

    if s3_uploads:
        if processing_avatars or processing_emojis or processing_realm_icons:
            bucket_name = settings.S3_AVATAR_BUCKET
        else:
            bucket_name = settings.S3_AUTH_UPLOADS_BUCKET
        bucket = get_bucket(bucket_name)

    count = 0
    for record in records:
        count += 1
        if count % 1000 == 0:
            logging.info("Processed %s/%s uploads", count, len(records))

        if processing_avatars:
            # For avatars, we need to rehash the user ID with the
            # new server's avatar salt
            relative_path = user_avatar_path_from_ids(record['user_profile_id'], record['realm_id'])
            if record['s3_path'].endswith('.original'):
                relative_path += '.original'
            else:
                # TODO: This really should be unconditional.  However,
                # until we fix the S3 upload backend to use the .png
                # path suffix for its normal avatar URLs, we need to
                # only do this for the LOCAL_UPLOADS_DIR backend.
                if not s3_uploads:
                    relative_path += '.png'
        elif processing_emojis:
            # For emojis we follow the function 'upload_emoji_image'
            relative_path = RealmEmoji.PATH_ID_TEMPLATE.format(
                realm_id=record['realm_id'],
                emoji_file_name=record['file_name'])
            record['last_modified'] = timestamp
        elif processing_realm_icons:
            icon_name = os.path.basename(record["path"])
            relative_path = os.path.join(str(record['realm_id']), "realm", icon_name)
            record['last_modified'] = timestamp
        else:
            # Should be kept in sync with its equivalent in zerver/lib/uploads in the
            # function 'upload_message_file'
            relative_path = "/".join([
                str(record['realm_id']),
                secrets.token_urlsafe(18),
                sanitize_name(os.path.basename(record['path'])),
            ])
            path_maps['attachment_path'][record['s3_path']] = relative_path

        if s3_uploads:
            key = bucket.Object(relative_path)
            metadata = {}
            if processing_emojis and "user_profile_id" not in record:
                # Exported custom emoji from tools like Slack don't have
                # the data for what user uploaded them in `user_profile_id`.
                pass
            elif processing_realm_icons and "user_profile_id" not in record:
                # Exported realm icons and logos from local export don't have
                # the value of user_profile_id in the associated record.
                pass
            else:
                user_profile_id = int(record['user_profile_id'])
                # Support email gateway bot and other cross-realm messages
                if user_profile_id in ID_MAP["user_profile"]:
                    logging.info("Uploaded by ID mapped user: %s!", user_profile_id)
                    user_profile_id = ID_MAP["user_profile"][user_profile_id]
                user_profile = get_user_profile_by_id(user_profile_id)
                metadata["user_profile_id"] = str(user_profile.id)

            if 'last_modified' in record:
                metadata["orig_last_modified"] = str(record['last_modified'])
            metadata["realm_id"] = str(record['realm_id'])

            # Zulip exports will always have a content-type, but third-party exports might not.
            content_type = record.get("content_type")
            if content_type is None:
                content_type = guess_type(record['s3_path'])[0]
                if content_type is None:
                    # This is the default for unknown data.  Note that
                    # for `.original` files, this is the value we'll
                    # set; that is OK, because those are never served
                    # directly anyway.
                    content_type = 'application/octet-stream'

            key.upload_file(os.path.join(import_dir, record['path']),
                            ExtraArgs={
                                'ContentType': content_type,
                                'Metadata': metadata})
        else:
            if processing_avatars or processing_emojis or processing_realm_icons:
                file_path = os.path.join(settings.LOCAL_UPLOADS_DIR, "avatars", relative_path)
            else:
                file_path = os.path.join(settings.LOCAL_UPLOADS_DIR, "files", relative_path)
            orig_file_path = os.path.join(import_dir, record['path'])
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            shutil.copy(orig_file_path, file_path)

    if processing_avatars:
        # Ensure that we have medium-size avatar images for every
        # avatar.  TODO: This implementation is hacky, both in that it
        # does get_user_profile_by_id for each user, and in that it
        # might be better to require the export to just have these.

        if processes == 1:
            for record in records:
                process_avatars(record)
        else:
            connection.close()
            cache._cache.disconnect_all()
            with multiprocessing.Pool(processes) as p:
                for out in p.imap_unordered(process_avatars, records):
                    pass

# Importing data suffers from a difficult ordering problem because of
# models that reference each other circularly.  Here is a correct order.
#
# * Client [no deps]
# * Realm [-notifications_stream]
# * Stream [only depends on realm]
# * Realm's notifications_stream
# * Now can do all realm_tables
# * UserProfile, in order by ID to avoid bot loop issues
# * Huddle
# * Recipient
# * Subscription
# * Message
# * UserMessage
#
# Because the Python object => JSON conversion process is not fully
# faithful, we have to use a set of fixers (e.g. on DateTime objects
# and Foreign Keys) to do the import correctly.
def do_import_realm(import_dir: Path, subdomain: str, processes: int=1) -> Realm:
    logging.info("Importing realm dump %s", import_dir)
    if not os.path.exists(import_dir):
        raise Exception("Missing import directory!")

    realm_data_filename = os.path.join(import_dir, "realm.json")
    if not os.path.exists(realm_data_filename):
        raise Exception("Missing realm.json file!")

    if not server_initialized():
        create_internal_realm()

    logging.info("Importing realm data from %s", realm_data_filename)
    with open(realm_data_filename, "rb") as f:
        data = orjson.loads(f.read())
    remove_denormalized_recipient_column_from_data(data)

    sort_by_date = data.get('sort_by_date', False)

    bulk_import_client(data, Client, 'zerver_client')

    # We don't import the Stream model yet, since it depends on Realm,
    # which isn't imported yet.  But we need the Stream model IDs for
    # notifications_stream.
    update_model_ids(Stream, data, 'stream')
    re_map_foreign_keys(data, 'zerver_realm', 'notifications_stream', related_table="stream")
    re_map_foreign_keys(data, 'zerver_realm', 'signup_notifications_stream', related_table="stream")

    fix_datetime_fields(data, 'zerver_realm')
    # Fix realm subdomain information
    data['zerver_realm'][0]['string_id'] = subdomain
    data['zerver_realm'][0]['name'] = subdomain
    fix_realm_authentication_bitfield(data, 'zerver_realm', 'authentication_methods')
    update_model_ids(Realm, data, 'realm')

    realm = Realm(**data['zerver_realm'][0])

    if realm.notifications_stream_id is not None:
        notifications_stream_id: Optional[int] = int(realm.notifications_stream_id)
    else:
        notifications_stream_id = None
    realm.notifications_stream_id = None
    if realm.signup_notifications_stream_id is not None:
        signup_notifications_stream_id: Optional[int] = int(realm.signup_notifications_stream_id)
    else:
        signup_notifications_stream_id = None
    realm.signup_notifications_stream_id = None
    realm.save()

    # Email tokens will automatically be randomly generated when the
    # Stream objects are created by Django.
    fix_datetime_fields(data, 'zerver_stream')
    re_map_foreign_keys(data, 'zerver_stream', 'realm', related_table="realm")
    # Handle rendering of stream descriptions for import from non-Zulip
    for stream in data['zerver_stream']:
        if 'rendered_description' in stream:
            continue
        stream["rendered_description"] = render_stream_description(stream["description"])
    bulk_import_model(data, Stream)

    realm.notifications_stream_id = notifications_stream_id
    realm.signup_notifications_stream_id = signup_notifications_stream_id
    realm.save()

    # Remap the user IDs for notification_bot and friends to their
    # appropriate IDs on this server
    for item in data['zerver_userprofile_crossrealm']:
        logging.info("Adding to ID map: %s %s", item['id'], get_system_bot(item['email']).id)
        new_user_id = get_system_bot(item['email']).id
        update_id_map(table='user_profile', old_id=item['id'], new_id=new_user_id)
        new_recipient_id = Recipient.objects.get(type=Recipient.PERSONAL, type_id=new_user_id).id
        update_id_map(table='recipient', old_id=item['recipient_id'], new_id=new_recipient_id)

    # Merge in zerver_userprofile_mirrordummy
    data['zerver_userprofile'] = data['zerver_userprofile'] + data['zerver_userprofile_mirrordummy']
    del data['zerver_userprofile_mirrordummy']
    data['zerver_userprofile'].sort(key=lambda r: r['id'])

    # To remap foreign key for UserProfile.last_active_message_id
    update_message_foreign_keys(import_dir=import_dir, sort_by_date=sort_by_date)

    fix_datetime_fields(data, 'zerver_userprofile')
    update_model_ids(UserProfile, data, 'user_profile')
    re_map_foreign_keys(data, 'zerver_userprofile', 'realm', related_table="realm")
    re_map_foreign_keys(data, 'zerver_userprofile', 'bot_owner', related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_userprofile', 'default_sending_stream',
                        related_table="stream")
    re_map_foreign_keys(data, 'zerver_userprofile', 'default_events_register_stream',
                        related_table="stream")
    re_map_foreign_keys(data, 'zerver_userprofile', 'last_active_message_id',
                        related_table="message", id_field=True)
    for user_profile_dict in data['zerver_userprofile']:
        user_profile_dict['password'] = None
        user_profile_dict['api_key'] = generate_api_key()
        # Since Zulip doesn't use these permissions, drop them
        del user_profile_dict['user_permissions']
        del user_profile_dict['groups']
        # The short_name field is obsolete in Zulip, but it's
        # convenient for third party exports to populate it.
        if 'short_name' in user_profile_dict:
            del user_profile_dict['short_name']

    user_profiles = [UserProfile(**item) for item in data['zerver_userprofile']]
    for user_profile in user_profiles:
        user_profile.set_unusable_password()
    UserProfile.objects.bulk_create(user_profiles)

    re_map_foreign_keys(data, 'zerver_defaultstream', 'stream', related_table="stream")
    re_map_foreign_keys(data, 'zerver_realmemoji', 'author', related_table="user_profile")
    for (table, model, related_table) in realm_tables:
        re_map_foreign_keys(data, table, 'realm', related_table="realm")
        update_model_ids(model, data, related_table)
        bulk_import_model(data, model)

    if 'zerver_huddle' in data:
        update_model_ids(Huddle, data, 'huddle')
        # We don't import Huddle yet, since we don't have the data to
        # compute huddle hashes until we've imported some of the
        # tables below.
        # TODO: double-check this.

    re_map_foreign_keys(data, 'zerver_recipient', 'type_id', related_table="stream",
                        recipient_field=True, id_field=True)
    re_map_foreign_keys(data, 'zerver_recipient', 'type_id', related_table="user_profile",
                        recipient_field=True, id_field=True)
    re_map_foreign_keys(data, 'zerver_recipient', 'type_id', related_table="huddle",
                        recipient_field=True, id_field=True)
    update_model_ids(Recipient, data, 'recipient')
    bulk_import_model(data, Recipient)
    bulk_set_users_or_streams_recipient_fields(Stream, Stream.objects.filter(realm=realm))
    bulk_set_users_or_streams_recipient_fields(UserProfile, UserProfile.objects.filter(realm=realm))

    re_map_foreign_keys(data, 'zerver_subscription', 'user_profile', related_table="user_profile")
    get_huddles_from_subscription(data, 'zerver_subscription')
    re_map_foreign_keys(data, 'zerver_subscription', 'recipient', related_table="recipient")
    update_model_ids(Subscription, data, 'subscription')
    bulk_import_model(data, Subscription)

    if 'zerver_realmauditlog' in data:
        fix_datetime_fields(data, 'zerver_realmauditlog')
        re_map_foreign_keys(data, 'zerver_realmauditlog', 'realm', related_table="realm")
        re_map_foreign_keys(data, 'zerver_realmauditlog', 'modified_user',
                            related_table='user_profile')
        re_map_foreign_keys(data, 'zerver_realmauditlog', 'acting_user',
                            related_table='user_profile')
        re_map_foreign_keys(data, 'zerver_realmauditlog', 'modified_stream',
                            related_table="stream")
        update_model_ids(RealmAuditLog, data, related_table="realmauditlog")
        bulk_import_model(data, RealmAuditLog)
    else:
        logging.info('about to call create_subscription_events')
        create_subscription_events(
            data=data,
            realm_id=realm.id,
        )
        logging.info('done with create_subscription_events')

    if 'zerver_huddle' in data:
        process_huddle_hash(data, 'zerver_huddle')
        bulk_import_model(data, Huddle)
        for huddle in Huddle.objects.filter(recipient_id=None):
            recipient = Recipient.objects.get(type=Recipient.HUDDLE, type_id=huddle.id)
            huddle.recipient = recipient
            huddle.save(update_fields=["recipient"])

    if 'zerver_alertword' in data:
        re_map_foreign_keys(data, 'zerver_alertword', 'user_profile', related_table='user_profile')
        re_map_foreign_keys(data, 'zerver_alertword', 'realm', related_table='realm')
        update_model_ids(AlertWord, data, 'alertword')
        bulk_import_model(data, AlertWord)

    if 'zerver_userhotspot' in data:
        fix_datetime_fields(data, 'zerver_userhotspot')
        re_map_foreign_keys(data, 'zerver_userhotspot', 'user', related_table='user_profile')
        update_model_ids(UserHotspot, data, 'userhotspot')
        bulk_import_model(data, UserHotspot)

    if 'zerver_mutedtopic' in data:
        fix_datetime_fields(data, 'zerver_mutedtopic')
        re_map_foreign_keys(data, 'zerver_mutedtopic', 'user_profile', related_table='user_profile')
        re_map_foreign_keys(data, 'zerver_mutedtopic', 'stream', related_table='stream')
        re_map_foreign_keys(data, 'zerver_mutedtopic', 'recipient', related_table='recipient')
        update_model_ids(MutedTopic, data, 'mutedtopic')
        bulk_import_model(data, MutedTopic)

    if 'zerver_service' in data:
        re_map_foreign_keys(data, 'zerver_service', 'user_profile', related_table='user_profile')
        fix_service_tokens(data, 'zerver_service')
        update_model_ids(Service, data, 'service')
        bulk_import_model(data, Service)

    if 'zerver_usergroup' in data:
        re_map_foreign_keys(data, 'zerver_usergroup', 'realm', related_table='realm')
        re_map_foreign_keys_many_to_many(data, 'zerver_usergroup',
                                         'members', related_table='user_profile')
        update_model_ids(UserGroup, data, 'usergroup')
        bulk_import_model(data, UserGroup)

        re_map_foreign_keys(data, 'zerver_usergroupmembership',
                            'user_group', related_table='usergroup')
        re_map_foreign_keys(data, 'zerver_usergroupmembership',
                            'user_profile', related_table='user_profile')
        update_model_ids(UserGroupMembership, data, 'usergroupmembership')
        bulk_import_model(data, UserGroupMembership)

    if 'zerver_botstoragedata' in data:
        re_map_foreign_keys(data, 'zerver_botstoragedata', 'bot_profile', related_table='user_profile')
        update_model_ids(BotStorageData, data, 'botstoragedata')
        bulk_import_model(data, BotStorageData)

    if 'zerver_botconfigdata' in data:
        re_map_foreign_keys(data, 'zerver_botconfigdata', 'bot_profile', related_table='user_profile')
        update_model_ids(BotConfigData, data, 'botconfigdata')
        bulk_import_model(data, BotConfigData)

    fix_datetime_fields(data, 'zerver_userpresence')
    re_map_foreign_keys(data, 'zerver_userpresence', 'user_profile', related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_userpresence', 'client', related_table='client')
    re_map_foreign_keys(data, 'zerver_userpresence', 'realm', related_table="realm")
    update_model_ids(UserPresence, data, 'user_presence')
    bulk_import_model(data, UserPresence)

    fix_datetime_fields(data, 'zerver_useractivity')
    re_map_foreign_keys(data, 'zerver_useractivity', 'user_profile', related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_useractivity', 'client', related_table='client')
    update_model_ids(UserActivity, data, 'useractivity')
    bulk_import_model(data, UserActivity)

    fix_datetime_fields(data, 'zerver_useractivityinterval')
    re_map_foreign_keys(data, 'zerver_useractivityinterval', 'user_profile', related_table="user_profile")
    update_model_ids(UserActivityInterval, data, 'useractivityinterval')
    bulk_import_model(data, UserActivityInterval)

    re_map_foreign_keys(data, 'zerver_customprofilefield', 'realm', related_table="realm")
    update_model_ids(CustomProfileField, data, related_table="customprofilefield")
    bulk_import_model(data, CustomProfileField)

    re_map_foreign_keys(data, 'zerver_customprofilefieldvalue', 'user_profile',
                        related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_customprofilefieldvalue', 'field',
                        related_table="customprofilefield")
    fix_customprofilefield(data)
    update_model_ids(CustomProfileFieldValue, data, related_table="customprofilefieldvalue")
    bulk_import_model(data, CustomProfileFieldValue)

    # Import uploaded files and avatars
    import_uploads(realm, os.path.join(import_dir, "avatars"), processes, processing_avatars=True)
    import_uploads(realm, os.path.join(import_dir, "uploads"), processes)

    # We need to have this check as the emoji files are only present in the data
    # importer from Slack
    # For Zulip export, this doesn't exist
    if os.path.exists(os.path.join(import_dir, "emoji")):
        import_uploads(realm, os.path.join(import_dir, "emoji"), processes, processing_emojis=True)

    if os.path.exists(os.path.join(import_dir, "realm_icons")):
        import_uploads(realm, os.path.join(import_dir, "realm_icons"), processes,
                       processing_realm_icons=True)

    sender_map = {
        user['id']: user
        for user in data['zerver_userprofile']
    }

    # Import zerver_message and zerver_usermessage
    import_message_data(realm=realm, sender_map=sender_map, import_dir=import_dir)

    re_map_foreign_keys(data, 'zerver_reaction', 'message', related_table="message")
    re_map_foreign_keys(data, 'zerver_reaction', 'user_profile', related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_reaction', 'emoji_code', related_table="realmemoji", id_field=True,
                        reaction_field=True)
    update_model_ids(Reaction, data, 'reaction')
    bulk_import_model(data, Reaction)

    # Similarly, we need to recalculate the first_message_id for stream objects.
    for stream in Stream.objects.filter(realm=realm):
        recipient = Recipient.objects.get(type=Recipient.STREAM, type_id=stream.id)
        first_message = Message.objects.filter(recipient=recipient).first()
        if first_message is None:
            stream.first_message_id = None
        else:
            stream.first_message_id = first_message.id
        stream.save(update_fields=["first_message_id"])

    # Do attachments AFTER message data is loaded.
    # TODO: de-dup how we read these json files.
    fn = os.path.join(import_dir, "attachment.json")
    if not os.path.exists(fn):
        raise Exception("Missing attachment.json file!")

    logging.info("Importing attachment data from %s", fn)
    with open(fn, "rb") as f:
        data = orjson.loads(f.read())

    import_attachments(data)

    # Import the analytics file.
    import_analytics_data(realm=realm, import_dir=import_dir)

    if settings.BILLING_ENABLED:
        do_change_plan_type(realm, Realm.LIMITED)
    else:
        do_change_plan_type(realm, Realm.SELF_HOSTED)
    return realm

# create_users and do_import_system_bots differ from their equivalent
# in zerver/lib/server_initialization.py because here we check if the
# bots don't already exist and only then create a user for these bots.
def do_import_system_bots(realm: Any) -> None:
    internal_bots = [(bot['name'], bot['email_template'] % (settings.INTERNAL_BOT_DOMAIN,))
                     for bot in settings.INTERNAL_BOTS]
    create_users(realm, internal_bots, bot_type=UserProfile.DEFAULT_BOT)
    print("Finished importing system bots.")

def create_users(realm: Realm, name_list: Iterable[Tuple[str, str]],
                 bot_type: Optional[int]=None) -> None:
    user_set = set()
    for full_name, email in name_list:
        if not UserProfile.objects.filter(email=email):
            user_set.add((email, full_name, True))
    bulk_create_users(realm, user_set, bot_type)

def update_message_foreign_keys(import_dir: Path,
                                sort_by_date: bool) -> None:
    old_id_list = get_incoming_message_ids(
        import_dir=import_dir,
        sort_by_date=sort_by_date,
    )

    count = len(old_id_list)

    new_id_list = allocate_ids(model_class=Message, count=count)

    for old_id, new_id in zip(old_id_list, new_id_list):
        update_id_map(
            table='message',
            old_id=old_id,
            new_id=new_id,
        )

    # We don't touch user_message keys here; that happens later when
    # we're actually read the files a second time to get actual data.

def get_incoming_message_ids(import_dir: Path,
                             sort_by_date: bool) -> List[int]:
    '''
    This function reads in our entire collection of message
    ids, which can be millions of integers for some installations.
    And then we sort the list.  This is necessary to ensure
    that the sort order of incoming ids matches the sort order
    of date_sent, which isn't always guaranteed by our
    utilities that convert third party chat data.  We also
    need to move our ids to a new range if we're dealing
    with a server that has data for other realms.
    '''

    if sort_by_date:
        tups: List[Tuple[int, int]] = []
    else:
        message_ids: List[int] = []

    dump_file_id = 1
    while True:
        message_filename = os.path.join(import_dir, f"messages-{dump_file_id:06}.json")
        if not os.path.exists(message_filename):
            break

        with open(message_filename, "rb") as f:
            data = orjson.loads(f.read())

        # Aggressively free up memory.
        del data['zerver_usermessage']

        for row in data['zerver_message']:
            # We truncate date_sent to int to theoretically
            # save memory and speed up the sort.  For
            # Zulip-to-Zulip imports, the
            # message_id will generally be a good tiebreaker.
            # If we occasionally mis-order the ids for two
            # messages from the same second, it's not the
            # end of the world, as it's likely those messages
            # arrived to the original server in somewhat
            # arbitrary order.

            message_id = row['id']

            if sort_by_date:
                date_sent = int(row['date_sent'])
                tup = (date_sent, message_id)
                tups.append(tup)
            else:
                message_ids.append(message_id)

        dump_file_id += 1

    if sort_by_date:
        tups.sort()
        message_ids = [tup[1] for tup in tups]

    return message_ids

def import_message_data(realm: Realm,
                        sender_map: Dict[int, Record],
                        import_dir: Path) -> None:
    dump_file_id = 1
    while True:
        message_filename = os.path.join(import_dir, f"messages-{dump_file_id:06}.json")
        if not os.path.exists(message_filename):
            break

        with open(message_filename, "rb") as f:
            data = orjson.loads(f.read())

        logging.info("Importing message dump %s", message_filename)
        re_map_foreign_keys(data, 'zerver_message', 'sender', related_table="user_profile")
        re_map_foreign_keys(data, 'zerver_message', 'recipient', related_table="recipient")
        re_map_foreign_keys(data, 'zerver_message', 'sending_client', related_table='client')
        fix_datetime_fields(data, 'zerver_message')
        # Parser to update message content with the updated attachment URLs
        fix_upload_links(data, 'zerver_message')

        # We already create mappings for zerver_message ids
        # in update_message_foreign_keys(), so here we simply
        # apply them.
        message_id_map = ID_MAP['message']
        for row in data['zerver_message']:
            row['id'] = message_id_map[row['id']]

        for row in data['zerver_usermessage']:
            assert(row['message'] in message_id_map)

        fix_message_rendered_content(
            realm=realm,
            sender_map=sender_map,
            messages=data['zerver_message'],
        )
        logging.info("Successfully rendered Markdown for message batch")

        # A LOT HAPPENS HERE.
        # This is where we actually import the message data.
        bulk_import_model(data, Message)

        # Due to the structure of these message chunks, we're
        # guaranteed to have already imported all the Message objects
        # for this batch of UserMessage objects.
        re_map_foreign_keys(data, 'zerver_usermessage', 'message', related_table="message")
        re_map_foreign_keys(data, 'zerver_usermessage', 'user_profile', related_table="user_profile")
        fix_bitfield_keys(data, 'zerver_usermessage', 'flags')

        bulk_import_user_message_data(data, dump_file_id)
        dump_file_id += 1

def import_attachments(data: TableData) -> None:

    # Clean up the data in zerver_attachment that is not
    # relevant to our many-to-many import.
    fix_datetime_fields(data, 'zerver_attachment')
    re_map_foreign_keys(data, 'zerver_attachment', 'owner', related_table="user_profile")
    re_map_foreign_keys(data, 'zerver_attachment', 'realm', related_table="realm")

    # Configure ourselves.  Django models many-to-many (m2m)
    # relations asymmetrically. The parent here refers to the
    # Model that has the ManyToManyField.  It is assumed here
    # the child models have been loaded, but we are in turn
    # responsible for loading the parents and the m2m rows.
    parent_model = Attachment
    parent_db_table_name = 'zerver_attachment'
    parent_singular = 'attachment'
    child_singular = 'message'
    child_plural = 'messages'
    m2m_table_name = 'zerver_attachment_messages'
    parent_id = 'attachment_id'
    child_id = 'message_id'

    update_model_ids(parent_model, data, 'attachment')
    # We don't bulk_import_model yet, because we need to first compute
    # the many-to-many for this table.

    # First, build our list of many-to-many (m2m) rows.
    # We do this in a slightly convoluted way to anticipate
    # a future where we may need to call re_map_foreign_keys.

    m2m_rows: List[Record] = []
    for parent_row in data[parent_db_table_name]:
        for fk_id in parent_row[child_plural]:
            m2m_row: Record = {}
            m2m_row[parent_singular] = parent_row['id']
            m2m_row[child_singular] = ID_MAP['message'][fk_id]
            m2m_rows.append(m2m_row)

    # Create our table data for insert.
    m2m_data: TableData = {m2m_table_name: m2m_rows}
    convert_to_id_fields(m2m_data, m2m_table_name, parent_singular)
    convert_to_id_fields(m2m_data, m2m_table_name, child_singular)
    m2m_rows = m2m_data[m2m_table_name]

    # Next, delete out our child data from the parent rows.
    for parent_row in data[parent_db_table_name]:
        del parent_row[child_plural]

    # Update 'path_id' for the attachments
    for attachment in data[parent_db_table_name]:
        attachment['path_id'] = path_maps['attachment_path'][attachment['path_id']]

    # Next, load the parent rows.
    bulk_import_model(data, parent_model)

    # Now, go back to our m2m rows.
    # TODO: Do this the kosher Django way.  We may find a
    # better way to do this in Django 1.9 particularly.
    with connection.cursor() as cursor:
        sql_template = SQL('''
            INSERT INTO {m2m_table_name} ({parent_id}, {child_id}) VALUES %s
        ''').format(
            m2m_table_name=Identifier(m2m_table_name),
            parent_id=Identifier(parent_id),
            child_id=Identifier(child_id),
        )
        tups = [(row[parent_id], row[child_id]) for row in m2m_rows]
        execute_values(cursor.cursor, sql_template, tups)

    logging.info('Successfully imported M2M table %s', m2m_table_name)

def import_analytics_data(realm: Realm, import_dir: Path) -> None:
    analytics_filename = os.path.join(import_dir, "analytics.json")
    if not os.path.exists(analytics_filename):
        return

    logging.info("Importing analytics data from %s", analytics_filename)
    with open(analytics_filename, "rb") as f:
        data = orjson.loads(f.read())

    # Process the data through the fixer functions.
    fix_datetime_fields(data, 'analytics_realmcount')
    re_map_foreign_keys(data, 'analytics_realmcount', 'realm', related_table="realm")
    update_model_ids(RealmCount, data, 'analytics_realmcount')
    bulk_import_model(data, RealmCount)

    fix_datetime_fields(data, 'analytics_usercount')
    re_map_foreign_keys(data, 'analytics_usercount', 'realm', related_table="realm")
    re_map_foreign_keys(data, 'analytics_usercount', 'user', related_table="user_profile")
    update_model_ids(UserCount, data, 'analytics_usercount')
    bulk_import_model(data, UserCount)

    fix_datetime_fields(data, 'analytics_streamcount')
    re_map_foreign_keys(data, 'analytics_streamcount', 'realm', related_table="realm")
    re_map_foreign_keys(data, 'analytics_streamcount', 'stream', related_table="stream")
    update_model_ids(StreamCount, data, 'analytics_streamcount')
    bulk_import_model(data, StreamCount)
