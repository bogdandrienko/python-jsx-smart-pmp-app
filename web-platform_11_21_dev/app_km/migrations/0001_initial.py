# Generated by Django 3.2.8 on 2021-11-15 10:21

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountTemplateModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('template_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('template_slug', models.SlugField(unique=True, verbose_name='ссылка')),
                ('template_description', models.TextField(blank=True, verbose_name='описание')),
                ('template_addition_file_1', models.FileField(blank=True, null=True, upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 1')),
                ('template_addition_file_2', models.FileField(blank=True, null=True, upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 2')),
            ],
            options={
                'verbose_name': 'Шаблон',
                'verbose_name_plural': 'Шаблоны',
                'db_table': 'account_template_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='ApplicationModuleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module_position', models.IntegerField(verbose_name='позиция')),
                ('module_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('module_slug', models.CharField(max_length=50, verbose_name='ссылка')),
                ('module_image', models.ImageField(blank=True, upload_to='uploads/application/module', verbose_name='картинка')),
                ('module_description', models.CharField(blank=True, max_length=100, verbose_name='описание')),
            ],
            options={
                'verbose_name': 'Модуль',
                'verbose_name_plural': 'Модули',
                'db_table': 'application_module_table',
                'ordering': ('module_position',),
            },
        ),
        migrations.CreateModel(
            name='ArticleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_title', models.CharField(max_length=200, verbose_name='название статьи')),
                ('article_text', models.TextField(blank=True, verbose_name='текст статьи')),
                ('article_pub_date', models.DateTimeField(auto_now_add=True)),
                ('article_image', models.ImageField(blank=True, upload_to='app_news/', verbose_name='картинка статьи')),
                ('article_rating_positive', models.IntegerField(default=0, verbose_name='лайки статьи')),
                ('article_rating_negative', models.IntegerField(default=0, verbose_name='дизлайки статьи')),
                ('article_rating_value', models.IntegerField(default=0, verbose_name='рейтинг статьи')),
            ],
            options={
                'verbose_name': 'Статья',
                'verbose_name_plural': 'Статьи',
                'db_table': 'article_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='CategoryRationalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('category_slug', models.SlugField(unique=True, verbose_name='ссылка')),
                ('category_description', models.TextField(blank=True, verbose_name='описание')),
                ('category_image', models.ImageField(blank=True, upload_to='uploads/rational/category', verbose_name='картинка')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
                'db_table': 'category_rational_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='CityModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='город')),
            ],
            options={
                'verbose_name': 'Город',
                'verbose_name_plural': 'Города',
                'db_table': 'city_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='ContactModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('contact_slug', models.SlugField(unique=True, verbose_name='ссылка')),
                ('contact_description', models.TextField(blank=True, verbose_name='описание')),
                ('contact_image', models.ImageField(blank=True, upload_to='uploads/contact', verbose_name='картинка')),
            ],
            options={
                'verbose_name': 'Контакт',
                'verbose_name_plural': 'Контакты',
                'db_table': 'contact_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='DocumentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('document_slug', models.SlugField(unique=True, verbose_name='ссылка')),
                ('document_description', models.TextField(blank=True, verbose_name='описание')),
                ('document_addition_file_1', models.FileField(blank=True, null=True, upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 1')),
                ('document_addition_file_2', models.FileField(blank=True, null=True, upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 2')),
            ],
            options={
                'verbose_name': 'Документ',
                'verbose_name_plural': 'Документы',
                'db_table': 'document_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='EmailModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email_subject', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_message', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_email', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_date', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
            ],
            options={
                'verbose_name': 'Письмо',
                'verbose_name_plural': 'Письма',
                'db_table': 'email_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='MessageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_name', models.CharField(max_length=50, verbose_name='название')),
                ('message_slug', models.CharField(max_length=50, verbose_name='кому')),
                ('message_description', models.TextField(blank=True, verbose_name='текст')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
                'db_table': 'message_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='SmsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sms_description', models.TextField(blank=True, verbose_name='текст сообщения')),
                ('sms_date', models.DateTimeField(auto_now_add=True, verbose_name='дата отправки')),
                ('sms_author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='автор сообщения')),
            ],
            options={
                'verbose_name': 'Смс',
                'verbose_name_plural': 'Смс',
                'db_table': 'sms_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='RationalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rational_date_certification', models.DateTimeField(auto_created=True, blank=True, default=django.utils.timezone.now, verbose_name='дата получения удостоверения на предложение')),
                ('rational_date_registered', models.DateTimeField(auto_created=True, blank=True, default=django.utils.timezone.now, verbose_name='дата регистрации')),
                ('rational_structure_from', models.CharField(blank=True, max_length=50, verbose_name='имя подразделения')),
                ('rational_uid_registered', models.IntegerField(blank=True, default=0, verbose_name='номер регистрации')),
                ('rational_name', models.CharField(max_length=50, verbose_name='название статьи')),
                ('rational_place_innovation', models.CharField(blank=True, max_length=100, verbose_name='место внедрения')),
                ('rational_description', ckeditor.fields.RichTextField(blank=True, verbose_name='описание')),
                ('rational_addition_file_1', models.FileField(blank=True, null=True, upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 1')),
                ('rational_addition_file_2', models.FileField(blank=True, null=True, upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 2')),
                ('rational_addition_file_3', models.FileField(blank=True, null=True, upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', verbose_name='приложение 3')),
                ('rational_offering_members', ckeditor.fields.RichTextField(blank=True, default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Фамилия, имя, отчество авторов</p></td><td><p>Место работы</p></td><td><p>Должность</p></td><td><p>Доля (%) участия*</p></td><td><p>Год рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> ', verbose_name='предложившие участники')),
                ('rational_conclusion', ckeditor.fields.RichTextField(blank=True, default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Название Структурного подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> ', verbose_name='заключения по предложению')),
                ('rational_change_documentations', ckeditor.fields.RichTextField(blank=True, default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Наименование документа</p></td><td><p>№ извещения</p></td><td><p>Дата изменения</p></td><td><p>Должность и название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> ', verbose_name='изменение нормативной и тех. документации')),
                ('rational_resolution', models.CharField(blank=True, max_length=200, verbose_name='принятое решение')),
                ('rational_responsible_members', ckeditor.fields.RichTextField(blank=True, default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> ', verbose_name='ответственные участники')),
                ('rational_date_create', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
                ('rational_addition_image', models.ImageField(blank=True, upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', verbose_name='картинка к предложению')),
                ('rational_status', models.BooleanField(blank=True, default=False, verbose_name='статус')),
                ('rational_author_name', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='имя автора')),
                ('rational_category', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_km.categoryrationalmodel', verbose_name='Категория')),
            ],
            options={
                'verbose_name': 'Рационализаторское предложение',
                'verbose_name_plural': 'Рационализаторские предложения',
                'db_table': 'rational_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='NotificationModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification_name', models.CharField(max_length=50, verbose_name='название')),
                ('notification_slug', models.CharField(max_length=50, verbose_name='ссылка')),
                ('notification_description', models.TextField(verbose_name='описание')),
                ('notification_date', models.DateTimeField(auto_now_add=True, verbose_name='дата и время')),
                ('notification_status', models.BooleanField(default=True, verbose_name='статус')),
                ('notification_author', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='имя автора')),
            ],
            options={
                'verbose_name': 'Уведомление',
                'verbose_name_plural': 'Уведомления',
                'db_table': 'notification_table',
                'ordering': ('-notification_status', '-notification_date'),
            },
        ),
        migrations.CreateModel(
            name='LikeRationalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like_status', models.BooleanField(default=False, verbose_name='лайк/дизлайк')),
                ('like_date', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
                ('like_article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_km.rationalmodel', verbose_name='предложение')),
                ('like_author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='автор')),
            ],
            options={
                'verbose_name': 'Лайк',
                'verbose_name_plural': 'Лайки',
                'db_table': 'like_rational_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='CommentRationalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.TextField(verbose_name='текст')),
                ('comment_date', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
                ('comment_article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_km.rationalmodel', verbose_name='предложение')),
                ('comment_author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='автор')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'db_table': 'comment_rational_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='CommentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author_name', models.CharField(max_length=50, verbose_name='имя автора')),
                ('comment_text', models.TextField(blank=True, verbose_name='текст комментария')),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_km.articlemodel')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'db_table': 'comment_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='BankIdeasModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, verbose_name='Название')),
                ('category', models.CharField(blank=True, max_length=30, verbose_name='Категория')),
                ('short_description', models.CharField(blank=True, max_length=50, verbose_name='описание')),
                ('long_description', models.TextField(blank=True, verbose_name='описание')),
                ('image', models.ImageField(blank=True, upload_to='uploads/bankidea', verbose_name='картинка')),
                ('document', models.FileField(blank=True, null=True, upload_to='uploads/bankidea/%d_%m_%Y/%H_%M_%S', verbose_name='документ')),
                ('status', models.BooleanField(blank=True, default=False, verbose_name='статус отображения')),
                ('datetime_register', models.DateTimeField(auto_now_add=True, verbose_name='Дата регистрации')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Идею',
                'verbose_name_plural': 'Идеи',
                'db_table': 'bank_ideas_table',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='ApplicationComponentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('component_position', models.IntegerField(verbose_name='позиция в списке закладок')),
                ('component_name', models.CharField(max_length=50, unique=True, verbose_name='название закладки')),
                ('component_slug', models.CharField(max_length=50, verbose_name='ссылка закладки')),
                ('component_image', models.ImageField(blank=True, upload_to='uploads/application/component', verbose_name='картинка закладки')),
                ('component_description', models.CharField(blank=True, max_length=100, verbose_name='описание закладки')),
                ('component_Foreign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_km.applicationmodulemodel', verbose_name='модуль')),
            ],
            options={
                'verbose_name': 'Компонент',
                'verbose_name_plural': 'Компоненты',
                'db_table': 'application_component_table',
                'ordering': ('component_Foreign', 'component_position'),
            },
        ),
    ]
