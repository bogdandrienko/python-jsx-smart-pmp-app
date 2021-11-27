# Generated by Django 3.2.9 on 2021-11-27 17:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_admin', '0007_alter_ideamodel_category_slug_field'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ideamodel',
            name='category_slug_field',
            field=models.SlugField(blank=True, choices=[('innovation', 'Инновации'), ('optimization', 'Оптимизации'), ('industry', 'Индустрия 4.0'), ('other', 'Другое')], db_column='category_slug_field_db_column', db_tablespace='category_slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">category_slug_field</small><hr><br>', max_length=16, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(16)], verbose_name='Категория'),
        ),
    ]
