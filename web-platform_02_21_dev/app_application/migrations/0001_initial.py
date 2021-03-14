# Generated by Django 3.1.6 on 2021-03-14 07:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationModuleModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module_position', models.IntegerField(unique=True, verbose_name='позиция')),
                ('module_name', models.CharField(max_length=50, unique=True, verbose_name='название')),
                ('module_slug', models.CharField(max_length=50, verbose_name='ссылка')),
                ('module_image', models.ImageField(blank=True, upload_to='uploads/application/icons', verbose_name='картинка')),
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
            name='ApplicationComponentModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('component_position', models.IntegerField(unique=True, verbose_name='позиция в списке закладок')),
                ('component_name', models.CharField(max_length=50, unique=True, verbose_name='название закладки')),
                ('component_slug', models.CharField(max_length=50, verbose_name='ссылка закладки')),
                ('component_image', models.ImageField(blank=True, upload_to='uploads/application/icons/shortcut', verbose_name='картинка закладки')),
                ('component_description', models.CharField(blank=True, max_length=100, verbose_name='описание закладки')),
                ('component_Foreign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_application.applicationmodulemodel', verbose_name='модуль')),
            ],
            options={
                'verbose_name': 'Компонент',
                'verbose_name_plural': 'Компоненты',
                'db_table': 'application_component_table',
                'ordering': ('component_Foreign',),
            },
        ),
    ]
