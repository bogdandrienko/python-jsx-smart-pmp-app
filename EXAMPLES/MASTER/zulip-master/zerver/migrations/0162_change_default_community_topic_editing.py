# Generated by Django 1.11.11 on 2018-04-24 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zerver', '0161_realm_message_content_delete_limit_seconds'),
    ]

    operations = [
        migrations.AlterField(
            model_name='realm',
            name='allow_community_topic_editing',
            field=models.BooleanField(default=True),
        ),
    ]
