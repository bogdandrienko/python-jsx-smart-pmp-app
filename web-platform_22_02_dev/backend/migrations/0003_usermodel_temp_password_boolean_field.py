# Generated by Django 4.0 on 2022-02-09 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_usermodel_achievements_text_field_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='temp_password_boolean_field',
            field=models.BooleanField(blank=True, db_column='temp_password_boolean_field_db_column', db_index=True, db_tablespace='temp_password_boolean_field_db_tablespace', default=True, error_messages=False, help_text='<small class="text-muted">temp_password_boolean_field</small><hr><br>', verbose_name='Временный пароль пользователя'),
        ),
    ]
