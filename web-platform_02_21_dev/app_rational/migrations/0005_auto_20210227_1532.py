# Generated by Django 3.1.6 on 2021-02-27 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_rational', '0004_auto_20210227_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likerationalmodel',
            name='created',
            field=models.DateTimeField(auto_now_add=True, verbose_name='дата создания'),
        ),
    ]
