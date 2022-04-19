# Generated by Django 4.0 on 2022-04-19 06:31

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ideatestmodel',
            options={'ordering': ('-registration',), 'verbose_name': 'Тест Идея', 'verbose_name_plural': 'Тест Банк идей 1, Идеи'},
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='author_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='category_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='comment_moderate_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='created_datetime_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='description_text_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='image_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='moderate_author_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='name_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='place_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='register_datetime_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='sphere_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='status_moderate_char_field',
        ),
        migrations.RemoveField(
            model_name='ideatestmodel',
            name='subdivision_char_field',
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='author',
            field=models.ForeignKey(blank=True, db_column='author_db_column', db_tablespace='author_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">UserModel: foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='idea_test_author_related_name', to='backend.usermodel', verbose_name='Автор'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='category',
            field=models.CharField(blank=True, db_column='category_db_column', db_index=True, db_tablespace='category_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Категория'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='comment_moderate',
            field=models.CharField(blank=True, db_column='comment_moderate_field_db_column', db_index=True, db_tablespace='comment_moderate_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Комментарий модерации'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='creation',
            field=models.DateTimeField(blank=True, db_column='creation_db_column', db_index=True, db_tablespace='creation_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">datetime</small><hr><br>', null=True, verbose_name='Дата и время создания'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='description',
            field=models.TextField(blank=True, db_column='description_db_column', db_index=True, db_tablespace='description_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">text_field[0, 3000]</small><hr><br>', max_length=3000, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(3000)], verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='image',
            field=models.ImageField(blank=True, db_column='image_db_column', db_index=True, db_tablespace='image_db_tablespace', default='uploads/idea/default_idea.jpg', error_messages=False, help_text='<small class="text-muted">>image_field[jpg, png]</small><hr><br>', max_length=200, null=True, upload_to='uploads/idea/avatar/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png'])], verbose_name='Изображение'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='moderate_author',
            field=models.ForeignKey(blank=True, db_column='moderate_author_db_column', db_tablespace='moderate_author_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">UserModel: foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='idea_test_moderate_author', to='backend.usermodel', verbose_name='Модерация'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='name',
            field=models.CharField(blank=True, db_column='name_db_column', db_index=True, db_tablespace='name_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Название'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='place',
            field=models.CharField(blank=True, db_column='place_db_column', db_index=True, db_tablespace='place_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Место'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='registration',
            field=models.DateTimeField(blank=True, db_column='registration_db_column', db_index=True, db_tablespace='registration_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">datetime</small><hr><br>', null=True, verbose_name='Дата и время регистрации'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='sphere',
            field=models.CharField(blank=True, db_column='sphere_db_column', db_index=True, db_tablespace='sphere_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Сфера'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='status_moderate',
            field=models.CharField(blank=True, db_column='status_moderate_db_column', db_index=True, db_tablespace='status_moderate_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Статус'),
        ),
        migrations.AddField(
            model_name='ideatestmodel',
            name='subdivision',
            field=models.CharField(blank=True, db_column='subdivision_db_column', db_index=True, db_tablespace='subdivision_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">char_field[0, 300]</small><hr><br>', max_length=300, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Подразделение'),
        ),
    ]
