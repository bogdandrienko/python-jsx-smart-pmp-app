# Generated by Django 3.2.4 on 2021-06-27 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_rational', '0002_auto_20210623_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoryrationalmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='commentrationalmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='likerationalmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='rationalmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
