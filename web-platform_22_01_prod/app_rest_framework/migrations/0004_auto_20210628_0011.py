# Generated by Django 3.2.4 on 2021-06-27 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_rest_framework', '0003_auto_20210411_0841'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='todo',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]