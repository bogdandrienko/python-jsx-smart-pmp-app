# Generated by Django 4.0.2 on 2022-03-12 12:51

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_remove_ideamodel_moderate_foreign_key_field_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ideacommentmodel',
            options={'ordering': ('-id',), 'verbose_name': 'Комментарий идеи', 'verbose_name_plural': 'Комментарии в банке идей'},
        ),
        migrations.AlterModelOptions(
            name='idearatingmodel',
            options={'ordering': ('-id',), 'verbose_name': 'Рейтинг идеи', 'verbose_name_plural': 'Рейтинги в банке идей'},
        ),
        migrations.RemoveField(
            model_name='ideacommentmodel',
            name='author_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='ideacommentmodel',
            name='idea_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='ideacommentmodel',
            name='text_field',
        ),
        migrations.RemoveField(
            model_name='idearatingmodel',
            name='author_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='idearatingmodel',
            name='idea_foreign_key_field',
        ),
        migrations.RemoveField(
            model_name='idearatingmodel',
            name='status_boolean_field',
        ),
        migrations.AddField(
            model_name='ideacommentmodel',
            name='comment_idea_author_foreign_key_field',
            field=models.ForeignKey(blank=True, db_column='comment_idea_author_foreign_key_field_db_column', db_tablespace='comment_idea_author_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">comment_idea_author_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comment_idea_author_foreign_key_field', to='backend.usermodel', verbose_name='Автор'),
        ),
        migrations.AddField(
            model_name='ideacommentmodel',
            name='comment_idea_foreign_key_field',
            field=models.ForeignKey(blank=True, db_column='comment_idea_foreign_key_field_db_column', db_tablespace='comment_idea_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">comment_idea_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comment_idea_foreign_key_field', to='backend.ideamodel', verbose_name='Идея'),
        ),
        migrations.AddField(
            model_name='ideacommentmodel',
            name='comment_text_field',
            field=models.TextField(blank=True, db_column='comment_text_field_db_column', db_index=True, db_tablespace='comment_text_field_db_tablespace', default='', error_messages=False, help_text='<small class="text-muted">comment_text_field</small><hr><br>', max_length=500, null=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(500)], verbose_name='Комментарий'),
        ),
        migrations.AddField(
            model_name='idearatingmodel',
            name='rating_idea_author_foreign_key_field',
            field=models.ForeignKey(blank=True, db_column='rating_idea_author_foreign_key_field_db_column', db_tablespace='rating_idea_author_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">rating_idea_author_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rating_idea_author_foreign_key_field', to='backend.usermodel', verbose_name='Автор'),
        ),
        migrations.AddField(
            model_name='idearatingmodel',
            name='rating_idea_foreign_key_field',
            field=models.ForeignKey(blank=True, db_column='rating_idea_foreign_key_field_db_column', db_tablespace='rating_idea_foreign_key_field_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">rating_idea_foreign_key_field</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rating_idea_foreign_key_field', to='backend.ideamodel', verbose_name='Идея'),
        ),
        migrations.AddField(
            model_name='idearatingmodel',
            name='rating_integer_field',
            field=models.IntegerField(blank=True, db_column='rating_integer_field_db_column', db_index=True, db_tablespace='rating_integer_field_db_tablespace', default=0, error_messages=False, help_text='<small class="text-muted">rating_integer_field</small><hr><br>', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Оценка'),
        ),
        migrations.AlterField(
            model_name='ideacommentmodel',
            name='datetime_field',
            field=models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">datetime_field</small><hr><br>', null=True, verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='idearatingmodel',
            name='datetime_field',
            field=models.DateTimeField(blank=True, db_column='datetime_field_db_column', db_index=True, db_tablespace='datetime_field_db_tablespace', default=django.utils.timezone.now, error_messages=False, help_text='<small class="text-muted">datetime_field</small><hr><br>', null=True, verbose_name='Дата и время создания'),
        ),
        migrations.AlterModelTable(
            name='ideacommentmodel',
            table='comment_idea_model_table',
        ),
        migrations.AlterModelTable(
            name='idearatingmodel',
            table='rating_idea_model_table',
        ),
    ]