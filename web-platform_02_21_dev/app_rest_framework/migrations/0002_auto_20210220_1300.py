# Generated by Django 3.1.6 on 2021-02-20 07:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_rest_framework', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ('id',), 'verbose_name': 'Задачи', 'verbose_name_plural': 'Задача'},
        ),
    ]
