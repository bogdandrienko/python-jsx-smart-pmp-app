# Generated by Django 4.0 on 2022-02-22 15:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_rationalmodel_number_char_field_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='rationalmodel',
            name='author_premoderate_char_field',
            field=models.CharField(blank=True, db_column='author_premoderate_char_field_db_column', db_index=True, db_tablespace='author_premoderate_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">author_premoderate_char_field</small><hr><br>', max_length=256, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(256)], verbose_name='author_premoderate_char_field'),
        ),
        migrations.AddField(
            model_name='rationalmodel',
            name='comment_premoderate_char_field',
            field=models.CharField(blank=True, db_column='comment_premoderate_char_field_db_column', db_index=True, db_tablespace='comment_premoderate_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">comment_premoderate_char_field</small><hr><br>', max_length=256, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(256)], verbose_name='comment_premoderate_char_field'),
        ),
        migrations.AddField(
            model_name='rationalmodel',
            name='conclusion_premoderate_char_field',
            field=models.CharField(blank=True, db_column='conclusion_premoderate_char_field_db_column', db_index=True, db_tablespace='conclusion_premoderate_char_field_db_tablespace', default='Приостановлено', error_messages=False, help_text='<small class="text-muted">conclusion_premoderate_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='conclusion_premoderate_char_field'),
        ),
    ]