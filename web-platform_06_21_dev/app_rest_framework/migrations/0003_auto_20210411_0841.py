# Generated by Django 3.1.6 on 2021-04-11 02:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_rest_framework', '0002_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='data',
            old_name='date',
            new_name='data_date',
        ),
        migrations.RenameField(
            model_name='data',
            old_name='description',
            new_name='data_description',
        ),
        migrations.RenameField(
            model_name='data',
            old_name='done',
            new_name='data_done',
        ),
        migrations.RenameField(
            model_name='data',
            old_name='title',
            new_name='data_title',
        ),
    ]
