# Generated by Django 4.0 on 2022-01-10 19:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_django', '0002_delete_examplesmodel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='LoggingModel',
        ),
    ]