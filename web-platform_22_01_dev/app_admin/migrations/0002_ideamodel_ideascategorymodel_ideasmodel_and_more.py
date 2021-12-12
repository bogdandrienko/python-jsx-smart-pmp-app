# Generated by Django 4.0 on 2021-12-11 17:12

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0015_alter_examplesmodel_options_and_more'),
        ('app_admin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IdeaModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_char_field', models.CharField(blank=True, db_column='name_char_field_db_column', db_index=True, db_tablespace='name_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">name_char_field</small><hr><br>', max_length=32, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Название')),
                ('category_slug_field', models.SlugField(blank=True, choices=[('innovation', 'Инновации'), ('optimization', 'Оптимизации'), ('industry', 'Индустрия 4.0'), ('other', 'Другое')], db_column='category_slug_field_db_column', db_tablespace='category_slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">category_slug_field</small><hr><br>', max_length=16, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(16)], verbose_name='Категория')),
                ('short_description_char_field', models.CharField(blank=True, db_column='short_description_char_field_db_column', db_index=True, db_tablespace='short_description_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">short_description_char_field</small><hr><br>', max_length=64, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Краткое описание')),
                ('full_description_text_field', models.TextField(blank=True, db_column='full_description_text_field_db_column', db_index=True, db_tablespace='full_description_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">full_description_text_field</small><hr><br>', max_length=1024, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(1024)], verbose_name='Полное описание')),
                ('avatar_image_field', models.ImageField(blank=True, db_column='avatar_image_field_db_column', db_index=True, db_tablespace='avatar_image_field_db_tablespace', default='uploads/idea/default_avatar.jpg', error_messages=False, help_text='<small class="text-muted">>avatar_image_field</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, upload_to='uploads/idea/avatar/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png'])], verbose_name='Аватарка-заставка для идеи')),
                ('addiction_file_field', models.FileField(blank=True, db_column='addiction_file_field_db_column', db_index=True, db_tablespace='addiction_file_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">addiction_file_field</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, upload_to='uploads/idea/files/', validators=[django.core.validators.FileExtensionValidator(['xlsx', 'xls', 'docx', 'doc', 'pdf'])], verbose_name='Файл-приложение')),
                ('visibility_boolean_field', models.BooleanField(blank=True, db_column='visibility_boolean_field_db_column', db_index=True, db_tablespace='visibility_boolean_field_db_tablespace', default=False, error_messages=False, help_text='<small class="text-muted">visibility_boolean_field</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Видимость идеи в общем списке')),
                ('created_datetime_field', models.DateTimeField(blank=True, db_column='created_datetime_field_db_column', db_index=True, db_tablespace='created_datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">created_datetime_field</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Дата создания')),
                ('register_datetime_field', models.DateTimeField(blank=True, db_column='register_datetime_field_db_column', db_index=True, db_tablespace='register_datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">register_datetime_field</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Дата регистрации')),
                ('author_foreign_key_field', models.ForeignKey(blank=True, db_column='author_foreign_key_field_db_column', db_tablespace='author_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.usermodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Автор')),
            ],
            options={
                'verbose_name': 'Идея',
                'verbose_name_plural': '0_Идеи',
                'db_table': 'idea_model_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeasCategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('category_slug', models.SlugField(unique=True, verbose_name='ссылка')),
                ('category_description', models.TextField(blank=True, verbose_name='описание')),
                ('category_image', models.ImageField(blank=True, upload_to='uploads/rational/category', verbose_name='картинка')),
            ],
            options={
                'verbose_name': 'Категория в банке идей',
                'verbose_name_plural': 'Категории в банке идей',
                'db_table': 'ideas_category_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeasModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_register', models.DateTimeField(auto_created=True, blank=True, null=True, verbose_name='Дата регистрации')),
                ('name', models.CharField(blank=True, max_length=50, verbose_name='Название')),
                ('short_description', models.CharField(blank=True, max_length=50, verbose_name='Короткое описание')),
                ('long_description', models.TextField(blank=True, verbose_name='Длинное описание')),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/bankidea/%d_%m_%Y', verbose_name='Картинка к идеи')),
                ('document', models.FileField(blank=True, null=True, upload_to='uploads/bankidea/%d_%m_%Y', verbose_name='Документ к идеи')),
                ('status', models.BooleanField(blank=True, default=False, verbose_name='Статус отображения')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('category', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.ideascategorymodel', verbose_name='Категория')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user', verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Идею',
                'verbose_name_plural': 'Банк идей',
                'db_table': 'ideas_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeasLikeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like_status', models.BooleanField(blank=True, default=False, verbose_name='Лайк/дизлайк')),
                ('like_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('like_author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user', verbose_name='Пользователь')),
                ('like_idea', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.ideasmodel', verbose_name='Идея')),
            ],
            options={
                'verbose_name': 'Лайк в банке идей',
                'verbose_name_plural': 'Лайки в банке идей',
                'db_table': 'ideas_like_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeasCommentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.TextField(verbose_name='Текст комментария')),
                ('comment_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('comment_author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user', verbose_name='Пользователь')),
                ('comment_idea', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.ideasmodel', verbose_name='Идея')),
            ],
            options={
                'verbose_name': 'Комментарий в банке идей',
                'verbose_name_plural': 'Комментарии в банке идей',
                'db_table': 'ideas_comment_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeaRatingModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_boolean_field', models.BooleanField(blank=True, db_column='status_boolean_field_db_column', db_index=True, db_tablespace='status_boolean_field_db_tablespace', default=True, error_messages=False, help_text='<small class="text-muted">status_boolean_field</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Лайк / дизлайк')),
                ('datetime_field', models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Дата создания')),
                ('author_foreign_key_field', models.ForeignKey(blank=True, db_column='author_foreign_key_field_db_column', db_tablespace='author_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.usermodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Автор')),
                ('idea_foreign_key_field', models.ForeignKey(blank=True, db_column='idea_foreign_key_field_db_column', db_tablespace='idea_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.ideamodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Идея')),
            ],
            options={
                'verbose_name': 'Рейтинг',
                'verbose_name_plural': '1_Идеи_Рейтинги',
                'db_table': 'idea_rating_model_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='IdeaCommentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_field', models.TextField(blank=True, db_column='text_field_db_column', db_index=True, db_tablespace='text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">text_field</small><hr><br>', max_length=512, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Комментарий')),
                ('datetime_field', models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Дата создания')),
                ('author_foreign_key_field', models.ForeignKey(blank=True, db_column='author_foreign_key_field_db_column', db_tablespace='author_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.usermodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Автор')),
                ('idea_foreign_key_field', models.ForeignKey(blank=True, db_column='idea_foreign_key_field_db_column', db_tablespace='idea_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.ideamodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Идея')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': '1_Идеи_Комментарии',
                'db_table': 'idea_comment_model_table',
                'ordering': ('-id',),
            },
        ),
    ]
