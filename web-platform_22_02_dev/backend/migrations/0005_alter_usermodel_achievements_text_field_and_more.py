# Generated by Django 4.0 on 2022-02-11 10:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_usermodel_achievements_text_field_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='achievements_text_field',
            field=models.TextField(blank=True, db_column='achievements_text_field_db_column', db_index=True, db_tablespace='achievements_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">achievements_text_field</small><hr><br>', max_length=512, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Достижения'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='biography_text_field',
            field=models.TextField(blank=True, db_column='biography_text_field_db_column', db_index=True, db_tablespace='biography_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">biography_text_field</small><hr><br>', max_length=512, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Биография'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='category_char_field',
            field=models.CharField(blank=True, db_column='category_char_field_db_column', db_index=True, db_tablespace='category_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">category_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Категория'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='department_site_char_field',
            field=models.CharField(blank=True, db_column='department_site_char_field_db_column', db_index=True, db_tablespace='department_site_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">department_site_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Отдел/Участок'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='education_text_field',
            field=models.TextField(blank=True, db_column='education_text_field_db_column', db_index=True, db_tablespace='education_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">education_text_field</small><hr><br>', max_length=512, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Образование'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='email_field',
            field=models.EmailField(blank=True, db_column='email_field_db_column', db_index=True, db_tablespace='email_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Строка содержащая почту, example: "bogdandrienko@gmail.com"</small><hr><br>', max_length=256, null=True, validators=[django.core.validators.MinLengthValidator(1), django.core.validators.MaxLengthValidator(254)], verbose_name='email_field'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='first_name_char_field',
            field=models.CharField(blank=True, db_column='first_char_field_db_column', db_index=True, db_tablespace='first_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">first_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='hobbies_text_field',
            field=models.TextField(blank=True, db_column='hobbies_text_field_db_column', db_index=True, db_tablespace='hobbies_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">hobbies_text_field</small><hr><br>', max_length=512, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Увлечения'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='image_field',
            field=models.ImageField(blank=True, db_column='image_field_db_column', db_index=True, db_tablespace='image_field_db_tablespace', default='admin/account/default_avatar.jpg', error_messages=False, help_text='<small class="text-muted">image_field_db_column</small><hr><br>', max_length=200, null=True, upload_to='uploads/admin/account/avatar', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png'])], verbose_name='Изображение профиля пользователя'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='last_name_char_field',
            field=models.CharField(blank=True, db_column='last_name_char_field_db_column', db_index=True, db_tablespace='last_name_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">last_name_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Фамилия'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='password_slug_field',
            field=models.SlugField(blank=True, db_column='password_slug_field_db_column', db_tablespace='password_slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">password_slug_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(16)], verbose_name='Пароль от аккаунта пользователя'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='patronymic_char_field',
            field=models.CharField(blank=True, db_column='patronymic_char_field_db_column', db_index=True, db_tablespace='patronymic_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">patronymic_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Отчество'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='position_char_field',
            field=models.CharField(blank=True, db_column='position_char_field_db_column', db_index=True, db_tablespace='position_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">position_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Должность'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='secret_answer_char_field',
            field=models.CharField(blank=True, db_column='secret_answer_char_field_db_column', db_index=True, db_tablespace='secret_answer_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">secret_answer_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(16)], verbose_name='Секретный ответ'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='secret_question_char_field',
            field=models.CharField(blank=True, db_column='secret_question_char_field_db_column', db_index=True, db_tablespace='secret_question_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">secret_question_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Секретный вопрос'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='subdivision_char_field',
            field=models.CharField(blank=True, db_column='subdivision_char_field_db_column', db_index=True, db_tablespace='subdivision_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">subdivision_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Подразделение'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='workshop_service_char_field',
            field=models.CharField(blank=True, db_column='workshop_service_char_field_db_column', db_index=True, db_tablespace='workshop_service_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">workshop_service_char_field</small><hr><br>', max_length=64, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Цех/Служба'),
        ),
    ]