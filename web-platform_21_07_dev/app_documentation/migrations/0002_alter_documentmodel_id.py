# Generated by Django 3.2.4 on 2021-06-27 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_documentation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]