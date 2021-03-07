# Generated by Django 3.1.6 on 2021-03-07 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email_subject', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_message', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_email', models.CharField(max_length=100, verbose_name='тема')),
                ('Email_date', models.DateTimeField(auto_now_add=True, verbose_name='дата создания')),
            ],
            options={
                'verbose_name': 'Письмо',
                'verbose_name_plural': 'Письма',
                'ordering': ('-id',),
            },
        ),
    ]
