from django.apps import AppConfig


class AppAdminConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_admin'  # Имя django-приложения
    verbose_name = 'Суперпользователь'  # Название в панели управления
