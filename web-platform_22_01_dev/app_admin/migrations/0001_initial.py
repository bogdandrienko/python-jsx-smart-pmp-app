# Generated by Django 4.0 on 2021-12-09 10:45

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ComputerVisionModuleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_char_field', models.CharField(blank=True, db_column='name_char_field_db_column', db_index=True, db_tablespace='name_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">короткое и лаконичное имя для модуля</small><hr><br>', max_length=64, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Имя модуля:')),
                ('description_text_field', models.TextField(blank=True, db_column='description_text_field_db_column', db_index=True, db_tablespace='description_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">описание для модуля</small><hr><br>', max_length=1024, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(1024)], verbose_name='Описание модуля:')),
                ('path_slug_field', models.SlugField(blank=True, choices=[('16_operation', 'Грохота, 16 операция, 10 отметка'), ('26_operation', 'Грохота, 26 операция, 10 отметка'), ('36_operation', 'Грохота, 36 операция, 10 отметка')], db_column='path_slug_field_db_column', db_tablespace='path_slug_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">полный путь от класса до функции вызова цикла модуля</small><hr><br>', max_length=128, null=True, unique=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(128)], verbose_name='Путь модуля:')),
                ('play_boolean_field', models.BooleanField(blank=True, db_column='play_boolean_field_db_column', db_index=True, db_tablespace='play_boolean_field_db_tablespace', default=False, error_messages=False, help_text='<small class="text-muted">нужно ли запускать модуль каждый тик главного цикла событий</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Запуск работы модуля:')),
                ('delay_float_field', models.FloatField(blank=True, db_column='delay_float_field_db_column', db_index=True, db_tablespace='delay_float_field_db_tablespace', default=3.0, error_messages=False, help_text='<small class="text-muted">время для тика каждого компонента в модуле</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3600)], verbose_name='Задержка цикла модуля:')),
                ('datetime_field', models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">дата и время последнего тика модуля</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='datetime_field')),
                ('duration_float_field', models.FloatField(blank=True, db_column='duration_float_field_db_column', db_index=True, db_tablespace='duration_float_field_db_tablespace', default=0.0, error_messages=False, help_text='<small class="text-muted">длительность последнего тика модуля</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3600)], verbose_name='Длительность операции:')),
                ('restart_boolean_field', models.BooleanField(blank=True, db_column='restart_boolean_field_db_column', db_index=True, db_tablespace='restart_boolean_field_db_tablespace', default=True, error_messages=False, help_text='<small class="text-muted">нужно ли перезапускать модуль после ошибки</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Рестарт модуля после ошибки:')),
                ('error_text_field', models.TextField(blank=True, db_column='error_text_field_db_column', db_index=True, db_tablespace='error_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">описание исключения и/или ошибки модуля</small><hr><br>', max_length=2048, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(2048)], verbose_name='Текст исключения-ошибки модуля:')),
            ],
            options={
                'verbose_name': 'Computer Vision Module',
                'verbose_name_plural': 'Computer Vision Modules',
                'db_table': 'computer_vision_module_model_table',
                'ordering': ('name_char_field', 'path_slug_field'),
            },
        ),
        migrations.CreateModel(
            name='ComputerVisionComponentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('play_boolean_field', models.BooleanField(blank=True, db_column='play_boolean_field_db_column', db_index=True, db_tablespace='play_boolean_field_db_tablespace', default=False, error_messages=False, help_text='<small class="text-muted">нужно ли делать расчёты каждый тик в этом компоненте</small><hr><br>', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Запуск работы компонента:')),
                ('alias_char_field', models.CharField(blank=True, db_column='alias_char_field_db_column', db_index=True, db_tablespace='alias_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">псевдоним, используемый для отображения или записи в стороннюю базу</small><hr><br>', max_length=64, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Псевдоним компонента:')),
                ('protocol_slug_field', models.SlugField(blank=True, db_column='protocol_slug_field_db_column', db_tablespace='protocol_slug_field_db_tablespace', default='http://', error_messages=False, help_text='<small class="text-muted">способ соединения с api: "http://" / "rtsp://" / "https://"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(50)], verbose_name='Протокол api источника компонента:')),
                ('port_integer_field', models.IntegerField(blank=True, db_column='port_integer_field_db_column', db_index=True, db_tablespace='port_integer_field_db_tablespace', default=80, error_messages=False, help_text='<small class="text-muted">порт соединения: "80" / "434"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9999999)], verbose_name='Порт api источника компонента:')),
                ('genericipaddress_field', models.GenericIPAddressField(blank=True, db_column='genericipaddress_field_db_column', db_index=True, db_tablespace='genericipaddress_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">ip адрес в формате: "192.168.15.202"<hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(32)], verbose_name='Ip адрес источника компонента:')),
                ('login_slug_field', models.SlugField(blank=True, db_column='login_protocol_slug_field_db_column', db_tablespace='login_protocol_slug_field_db_tablespace', default='admin', error_messages=False, help_text='<small class="text-muted">логин от источника компонента: "admin"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(50)], verbose_name='Логин источника компонента:')),
                ('password_slug_field', models.SlugField(blank=True, db_column='password_protocol_slug_field_db_column', db_tablespace='password_protocol_slug_field_db_tablespace', default='q1234567', error_messages=False, help_text='<small class="text-muted">пароль от источника компонента: "q1234567"</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(50)], verbose_name='Пароль источника компонента:')),
                ('mask_char_field', models.CharField(blank=True, db_column='mask_char_field_db_column', db_index=True, db_tablespace='mask_char_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">путь от главной папки к папке с изображением-маской: "static/media/data/computer_vision/temp"</small><hr><br>', max_length=64, null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(64)], verbose_name='Путь к маске компонента:')),
                ('bright_level_integer_field', models.IntegerField(blank=True, db_column='bright_level_integer_field_db_column', db_index=True, db_tablespace='bright_level_integer_field_db_tablespace', default=100, error_messages=False, help_text='<small class="text-muted">bright_level</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='bright_level')),
                ('in_range_set_from_integer_field', models.IntegerField(blank=True, db_column='in_range_set_from_integer_field_db_column', db_index=True, db_tablespace='bright_level_integer_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">in_range_set_from</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='in_range_set_from')),
                ('in_range_set_to_integer_field', models.IntegerField(blank=True, db_column='in_range_set_to_integer_field_db_column', db_index=True, db_tablespace='in_range_set_to_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">in_range_set_to</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='in_range_set_to')),
                ('count_not_zero_integer_field', models.IntegerField(blank=True, db_column='count_not_zero_integer_field_db_column', db_index=True, db_tablespace='count_not_zero_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">count_not_zero</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='count_not_zero')),
                ('point_1_1_integer_field', models.IntegerField(blank=True, db_column='point_1_1_field_db_column', db_index=True, db_tablespace='point_1_1_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_1_1</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_1_1')),
                ('point_1_2_integer_field', models.IntegerField(blank=True, db_column='point_1_2_field_db_column', db_index=True, db_tablespace='point_1_2_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_1_2</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_1_2')),
                ('point_1_3_integer_field', models.IntegerField(blank=True, db_column='point_1_3_field_db_column', db_index=True, db_tablespace='point_1_3_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_1_3</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_1_3')),
                ('point_2_1_integer_field', models.IntegerField(blank=True, db_column='point_2_1_field_db_column', db_index=True, db_tablespace='point_2_1_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_2_1</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_2_1')),
                ('point_2_2_integer_field', models.IntegerField(blank=True, db_column='point_2_2_field_db_column', db_index=True, db_tablespace='point_2_2_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_2_2</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_2_2')),
                ('point_2_3_integer_field', models.IntegerField(blank=True, db_column='point_2_3_field_db_column', db_index=True, db_tablespace='point_2_3_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">point_2_3</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='point_2_3')),
                ('alarm_level_integer_field', models.IntegerField(blank=True, db_column='alarm_level_field_db_column', db_index=True, db_tablespace='alarm_level_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">alarm_level</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='alarm_level')),
                ('null_level_integer_field', models.IntegerField(blank=True, db_column='null_level_field_db_column', db_index=True, db_tablespace='null_level_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">null_level</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(256)], verbose_name='null_level')),
                ('correct_coefficient_float_field', models.FloatField(blank=True, db_column='correct_coefficient_float_field_db_column', db_index=True, db_tablespace='correct_coefficient_float_field_db_tablespace', default=0.0, error_messages=False, help_text='<small class="text-muted">correct_coefficient_</small><hr><br>', null=True, unique_for_date=False, unique_for_month=False, unique_for_year=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='correct_coefficient_')),
                ('module_foreign_key_field', models.ForeignKey(blank=True, db_column='module_foreign_key_field_db_column', db_tablespace='module_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">связь, к какому модулю относится компонент</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_admin.computervisionmodulemodel', unique_for_date=False, unique_for_month=False, unique_for_year=False, verbose_name='Модуль компонента:')),
            ],
            options={
                'verbose_name': 'Computer Vision Component',
                'verbose_name_plural': 'Computer Vision Components',
                'db_table': 'computer_vision_component_model_table',
                'ordering': ('play_boolean_field', 'alias_char_field', 'genericipaddress_field'),
            },
        ),
    ]
