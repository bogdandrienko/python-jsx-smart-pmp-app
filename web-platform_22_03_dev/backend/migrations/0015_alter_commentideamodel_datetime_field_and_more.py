# Generated by Django 4.0.2 on 2022-03-13 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_alter_ideamodel_register_datetime_field'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentideamodel',
            name='datetime_field',
            field=models.DateTimeField(auto_now=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', error_messages=False, help_text='<small class="text-muted">datetime_field</small><hr><br>', null=True, verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='ideamodel',
            name='register_datetime_field',
            field=models.DateTimeField(auto_now=True, db_column='register_datetime_field_db_column', db_index=True, db_tablespace='register_datetime_field_db_tablespace', error_messages=False, help_text='<small class="text-muted">register_datetime_field</small><hr><br>', null=True, verbose_name='Дата регистрации'),
        ),
        migrations.AlterField(
            model_name='ratingideamodel',
            name='datetime_field',
            field=models.DateTimeField(auto_now=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', error_messages=False, help_text='<small class="text-muted">datetime_field</small><hr><br>', null=True, verbose_name='Дата и время создания'),
        ),
    ]
