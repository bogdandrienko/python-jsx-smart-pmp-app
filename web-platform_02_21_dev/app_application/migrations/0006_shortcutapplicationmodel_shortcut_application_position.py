# Generated by Django 3.1.6 on 2021-03-14 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_application', '0005_shortcutapplicationmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='shortcutapplicationmodel',
            name='shortcut_application_position',
            field=models.IntegerField(default=1, unique=True, verbose_name='позиция в списке закладок'),
            preserve_default=False,
        ),
    ]
