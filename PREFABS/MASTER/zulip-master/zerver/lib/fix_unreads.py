import logging
import time
from typing import Callable, List, TypeVar

from psycopg2.extensions import cursor
from psycopg2.sql import SQL

CursorObj = TypeVar('CursorObj', bound=cursor)

from django.db import connection

from zerver.models import UserProfile

'''
NOTE!  Be careful modifying this library, as it is used
in a migration, and it needs to be valid for the state
of the database that is in place when the 0104_fix_unreads
migration runs.
'''

logger = logging.getLogger('zulip.fix_unreads')
logger.setLevel(logging.WARNING)

def build_topic_mute_checker(cursor: CursorObj, user_profile: UserProfile) -> Callable[[int, str], bool]:
    '''
    This function is similar to the function of the same name
    in zerver/lib/topic_mutes.py, but it works without the ORM,
    so that we can use it in migrations.
    '''
    query = SQL('''
        SELECT
            recipient_id,
            topic_name
        FROM
            zerver_mutedtopic
        WHERE
            user_profile_id = %s
    ''')
    cursor.execute(query, [user_profile.id])
    rows = cursor.fetchall()

    tups = {
        (recipient_id, topic_name.lower())
        for (recipient_id, topic_name) in rows
    }

    def is_muted(recipient_id: int, topic: str) -> bool:
        return (recipient_id, topic.lower()) in tups

    return is_muted

def update_unread_flags(cursor: CursorObj, user_message_ids: List[int]) -> None:
    query = SQL('''
        UPDATE zerver_usermessage
        SET flags = flags | 1
        WHERE id IN %(user_message_ids)s
    ''')

    cursor.execute(query, {"user_message_ids": tuple(user_message_ids)})


def get_timing(message: str, f: Callable[[], None]) -> None:
    start = time.time()
    logger.info(message)
    f()
    elapsed = time.time() - start
    logger.info('elapsed time: %.03f\n', elapsed)


def fix_unsubscribed(cursor: CursorObj, user_profile: UserProfile) -> None:

    recipient_ids = []

    def find_recipients() -> None:
        query = SQL('''
            SELECT
                zerver_subscription.recipient_id
            FROM
                zerver_subscription
            INNER JOIN zerver_recipient ON (
                zerver_recipient.id = zerver_subscription.recipient_id
            )
            WHERE (
                zerver_subscription.user_profile_id = %(user_profile_id)s AND
                zerver_recipient.type = 2 AND
                (NOT zerver_subscription.active)
            )
        ''')
        cursor.execute(query, {"user_profile_id": user_profile.id})
        rows = cursor.fetchall()
        for row in rows:
            recipient_ids.append(row[0])
        logger.info(str(recipient_ids))

    get_timing(
        'get recipients',
        find_recipients,
    )

    if not recipient_ids:
        return

    user_message_ids = []

    def find() -> None:
        query = SQL('''
            SELECT
                zerver_usermessage.id
            FROM
                zerver_usermessage
            INNER JOIN zerver_message ON (
                zerver_message.id = zerver_usermessage.message_id
            )
            WHERE (
                zerver_usermessage.user_profile_id = %(user_profile_id)s AND
                (zerver_usermessage.flags & 1) = 0 AND
                zerver_message.recipient_id in %(recipient_ids)s
            )
        ''')

        cursor.execute(query, {
            "user_profile_id": user_profile.id,
            "recipient_ids": tuple(recipient_ids),
        })
        rows = cursor.fetchall()
        for row in rows:
            user_message_ids.append(row[0])
        logger.info('rows found: %d', len(user_message_ids))

    get_timing(
        'finding unread messages for non-active streams',
        find,
    )

    if not user_message_ids:
        return

    def fix() -> None:
        update_unread_flags(cursor, user_message_ids)

    get_timing(
        'fixing unread messages for non-active streams',
        fix,
    )

def fix(user_profile: UserProfile) -> None:
    logger.info('\n---\nFixing %s:', user_profile.id)
    with connection.cursor() as cursor:
        fix_unsubscribed(cursor, user_profile)
