# Generated by Django 3.1.4 on 2020-12-28 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_project_managment', '0002_auto_20201228_2252'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, to='app_project_managment.project_managment'),
            preserve_default=False,
        ),
    ]
