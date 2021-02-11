import time

from django.db import connection, migrations
from django.db.backends.postgresql.schema import DatabaseSchemaEditor
from django.db.migrations.state import StateApps
from django.db.models import Min
from psycopg2.sql import SQL

BATCH_SIZE = 1000

def sql_copy_pub_date_to_date_sent(id_range_lower_bound: int, id_range_upper_bound: int) -> None:
    query = SQL("""
            UPDATE zerver_message
            SET date_sent = pub_date
            WHERE id BETWEEN %(lower_bound)s AND %(upper_bound)s
    """)
    with connection.cursor() as cursor:
        cursor.execute(query, {
            "lower_bound": id_range_lower_bound,
            "upper_bound": id_range_upper_bound,
        })

def copy_pub_date_to_date_sent(apps: StateApps, schema_editor: DatabaseSchemaEditor) -> None:
    Message = apps.get_model('zerver', 'Message')
    if not Message.objects.exists():
        # Nothing to do
        return

    first_uncopied_id = Message.objects.filter(date_sent__isnull=True
                                               ).aggregate(Min('id'))['id__min']
    # Note: the below id can fall in a segment
    # where date_sent = pub_date already, but it's not a big problem
    # this will just do some redundant UPDATEs.
    last_id = Message.objects.latest("id").id

    id_range_lower_bound = first_uncopied_id
    id_range_upper_bound = first_uncopied_id + BATCH_SIZE
    while id_range_upper_bound <= last_id:
        sql_copy_pub_date_to_date_sent(id_range_lower_bound, id_range_upper_bound)
        id_range_lower_bound = id_range_upper_bound + 1
        id_range_upper_bound = id_range_lower_bound + BATCH_SIZE
        time.sleep(0.1)

    if last_id > id_range_lower_bound:
        # Copy for the last batch.
        sql_copy_pub_date_to_date_sent(id_range_lower_bound, last_id)


class Migration(migrations.Migration):
    atomic = False
    dependencies = [
        ('zerver', '0243_message_add_date_sent_column'),
    ]

    operations = [
        migrations.RunSQL("""
        CREATE FUNCTION zerver_message_date_sent_to_pub_date_trigger_function()
        RETURNS trigger AS $$
        BEGIN
            NEW.date_sent = NEW.pub_date;
            RETURN NEW;
        END
        $$ LANGUAGE 'plpgsql';

        CREATE TRIGGER zerver_message_date_sent_to_pub_date_trigger
        BEFORE INSERT ON zerver_message
        FOR EACH ROW
        EXECUTE PROCEDURE zerver_message_date_sent_to_pub_date_trigger_function();
        """),
        migrations.RunPython(copy_pub_date_to_date_sent, elidable=True),
        # The name for the index was chosen to match the name of the index Django would create
        # in a normal migration with AlterField of date_sent to have db_index=True:
        migrations.RunSQL("""
        CREATE INDEX CONCURRENTLY zerver_message_date_sent_3b5b05d8 ON zerver_message (date_sent);
        """),
    ]
