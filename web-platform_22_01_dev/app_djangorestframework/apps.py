from django.apps import AppConfig


class AppDjangorestframeworkConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_djangorestframework'
    # Название в панели управления
    verbose_name = 'Django Rest Framework: api'
