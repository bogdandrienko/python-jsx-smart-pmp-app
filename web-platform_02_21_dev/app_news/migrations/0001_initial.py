# Generated by Django 3.1.6 on 2021-02-21 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_title', models.CharField(max_length=200, verbose_name='название статьи')),
                ('article_text', models.TextField(blank=True, verbose_name='текст статьи')),
                ('article_pub_date', models.DateTimeField(auto_now_add=True)),
                ('article_image', models.ImageField(blank=True, upload_to='news/', verbose_name='картинка статьи')),
                ('article_rating_positive', models.IntegerField(default=0, verbose_name='лайки статьи')),
                ('article_rating_negative', models.IntegerField(default=0, verbose_name='дизлайки статьи')),
                ('article_rating_value', models.IntegerField(default=0, verbose_name='рейтинг статьи')),
            ],
            options={
                'verbose_name': 'Статья',
                'verbose_name_plural': 'Статьи',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author_name', models.CharField(max_length=50, verbose_name='имя автора')),
                ('comment_text', models.TextField(blank=True, verbose_name='текст комментария')),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_news.article')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'ordering': ('-id',),
            },
        ),
    ]
