# Generated by Django 3.2.9 on 2021-11-25 15:29

import datetime
from django.conf import settings
import django.core.validators
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
            name='LoggingModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username_slug_field', models.SlugField(blank=True, db_column='username_slug_field_db_column', db_tablespace='username_slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">Тут отображается идентификатор пользователя, например: </small><hr><br>', max_length=12, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(12)], verbose_name='Имя пользователя')),
                ('ip_genericipaddress_field', models.GenericIPAddressField(blank=True, db_column='ip_genericipaddress_field_field_db_column', db_index=True, db_tablespace='ip_genericipaddress_field_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Строка содержащая ip-адрес, example: "127.0.0.1"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(12)], verbose_name='Ip адрес клиента')),
                ('request_path_slug_field', models.SlugField(blank=True, db_column='request_path_slug_field_field_db_column', db_tablespace='request_path_slug_field_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">Строка содержащая путь обращения, example: "https://.../home/"</small><hr><br>', max_length=128, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(128)], verbose_name='Действие пользователя')),
                ('request_method_slug_field', models.SlugField(blank=True, db_column='request_method_slug_field_field_db_column', db_tablespace='request_method_slug_field_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">GET: просмотр страницы, POST: отправка данных из формы</small><hr><br>', max_length=4, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(4)], verbose_name='Метод запроса')),
                ('error_text_field', models.TextField(blank=True, db_column='error_text_field_db_column', db_index=True, db_tablespace='error_text_field_db_tablespace', default='error: ', error_messages=False, help_text='<small class="text-muted">Много текста, example: "текст, текст..."</small><hr><br>', max_length=512, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='Текст ошибки и/или исключения')),
                ('datetime_field', models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Дата и время записи')),
            ],
            options={
                'verbose_name': 'Лог',
                'verbose_name_plural': '1_Логи',
                'db_table': 'logging_model_table',
                'ordering': ('-datetime_field',),
            },
        ),
        migrations.CreateModel(
            name='ExamplesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('positive_integer_field', models.PositiveIntegerField(auto_created=True, blank=True, db_column='positive_integer_field_db_column', db_index=True, db_tablespace='positive_integer_field_tablespace', default=0, help_text='<small class="text-muted">Положительное целочисленное значение от 0 до 2147483647, example: "0"</small><hr><br>', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(2147483647)], verbose_name='positive_integer_field')),
                ('big_integer_field', models.BigIntegerField(auto_created=True, blank=True, db_column='big_integer_field_db_column', db_index=True, db_tablespace='big_integer_field_tablespace', default=0, help_text='<small class="text-muted">Большое целочисленное значение от -9223372036854775808 до 9223372036854775807, example: "0"</small><hr><br>', null=True, validators=[django.core.validators.MinValueValidator(-9223372036854775808), django.core.validators.MaxValueValidator(9223372036854775807)], verbose_name='big integer')),
                ('binary_field', models.BinaryField(blank=True, db_column='binary_field_db_column', db_index=True, db_tablespace='binary_field_db_tablespace', default=None, editable=True, error_messages=False, help_text='<small class="text-muted">Бинарные данные (сохранять без преписки b"), example: "OTcwODAxMzUxMTc5"</small><hr><br>', max_length=1024, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(1), django.core.validators.MaxLengthValidator(1024)], verbose_name='binary_field')),
                ('boolean_field', models.BooleanField(blank=True, db_column='boolean_field_db_column', db_index=True, db_tablespace='boolean_field_db_tablespace', default=False, error_messages=False, help_text='<small class="text-muted">Значение правда или ложь, example: "True" / "False"</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='boolean_field')),
                ('null_boolean_field', models.BooleanField(blank=True, db_column='null_boolean_field_db_column', db_index=True, db_tablespace='null_boolean_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Значение правда, ложь или неизвестно, example: "True" / "False / Неизвестно"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='null_boolean_field')),
                ('char_field', models.CharField(blank=True, db_column='char_field_db_column', db_index=True, db_tablespace='char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">Небольшая срока текста, example: "текст, текст"</small><hr><br>', max_length=64, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='char_field')),
                ('text_field', models.TextField(blank=True, db_column='text_field_db_column', db_index=True, db_tablespace='text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">Много текста, example: "текст, текст..."</small><hr><br>', max_length=512, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(512)], verbose_name='text_field')),
                ('slug_field', models.SlugField(blank=True, db_column='slug_field_db_column', db_tablespace='slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">Строка текста валидная для ссылок и системных вызовов, example: "success"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(50)], verbose_name='slug_field')),
                ('email_field', models.EmailField(blank=True, db_column='email_field_db_column', db_index=True, db_tablespace='email_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Строка содержащая почту, example: "bogdandrienko@gmail.com"</small><hr><br>', max_length=254, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(1), django.core.validators.MaxLengthValidator(254)], verbose_name='email_field')),
                ('url_field', models.URLField(blank=True, db_column='url_field_db_column', db_index=True, db_tablespace='url_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Строка содержащая url-адрес, example: "http://89.218.132.130:8000/"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(200)], verbose_name='url_field')),
                ('genericipaddress_field', models.GenericIPAddressField(blank=True, db_column='genericipaddress_field_db_column', db_index=True, db_tablespace='genericipaddress_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Строка содержащая ip-адрес, example: "127.0.0.1"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='genericipaddress_field')),
                ('integer_field', models.IntegerField(blank=True, db_column='integer_field_db_column', db_index=True, db_tablespace='integer_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">Целочисленное значение от -2147483648 до 2147483647, example: "0"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(-2147483648), django.core.validators.MaxValueValidator(2147483647)], verbose_name='integer_field')),
                ('float_field', models.FloatField(blank=True, db_column='float_field_db_column', db_index=True, db_tablespace='float_field_db_tablespace', default=0.0, error_messages=False, help_text='<small class="text-muted">Число с плавающей запятой, example: "0.0"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(-1000), django.core.validators.MaxValueValidator(1000)], verbose_name='float_field')),
                ('decimal_field', models.DecimalField(blank=True, db_column='decimal_field_db_column', db_index=True, db_tablespace='decimal_field_db_tablespace', decimal_places=5, default=0.0, error_messages=False, help_text='<small class="text-muted">Нецелочисленное значение, example: "0.000"</small><hr><br>', max_digits=10, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(-1000), django.core.validators.MaxValueValidator(1000)], verbose_name='decimal_field')),
                ('datetime_field', models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='datetime_field')),
                ('date_field', models.DateField(blank=True, db_column='date_field_db_column', db_index=True, db_tablespace='date_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Дата, example: "31.12.2021"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='date_field')),
                ('time_field', models.TimeField(blank=True, db_column='time_field_db_column', db_index=True, db_tablespace='time_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">Время, example: "23:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='time_field')),
                ('duration_field', models.DurationField(blank=True, db_column='duration_field_db_column', db_index=True, db_tablespace='duration_field_db_tablespace', default=datetime.timedelta(seconds=1200), error_messages=False, help_text='<small class="text-muted">Длительность во времени, example: "2:59:59"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='duration_field')),
                ('file_field', models.FileField(blank=True, db_column='file_field_db_column', db_index=True, db_tablespace='file_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Файл, с расширением указанным в валидаторе, example: "example.xlsx"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, upload_to='uploads/example/%Y/%m/%d/', validators=[django.core.validators.FileExtensionValidator(['xlsx', 'xls'])], verbose_name='file_field')),
                ('image_field', models.ImageField(blank=True, db_column='image_field_db_column', db_index=True, db_tablespace='image_field_db_tablespace', default='uploads/example/example.jpg', error_messages=False, help_text='<small class="text-muted">>Файл, с расширением изображения, example: "example.jpg(/png/bpm...)"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, upload_to='uploads/example/example.jpg', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png'])], verbose_name='file_field')),
                ('foreign_key_field', models.ForeignKey(blank=True, db_column='foreign_key_field_db_column', db_tablespace='foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get(username="Bogdan")"</small><hr><br>', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='foreign_key_field')),
                ('many_to_many_field', models.ManyToManyField(blank=True, db_column='many_to_many_field_db_column', db_index=True, db_tablespace='many_to_many_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get(username="Bogdan")"</small><hr><br>', related_name='many_to_many_field', to=settings.AUTH_USER_MODEL, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='many_to_many_field')),
                ('one_to_one_field', models.OneToOneField(blank=True, db_column='one_to_one_field_db_column', db_tablespace='one_to_one_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get(username="Bogdan")"</small><hr><br>', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='one_to_one_field', to=settings.AUTH_USER_MODEL, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='one_to_one_field')),
            ],
            options={
                'verbose_name': 'Шаблон',
                'verbose_name_plural': '0_Шаблоны',
                'db_table': 'example_table',
                'ordering': ('-id',),
            },
        ),
    ]
