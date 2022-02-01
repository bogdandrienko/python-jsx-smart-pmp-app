from django.apps import AppConfig


class AppAdminConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_admin'  # Имя django-приложения
    verbose_name = 'Панель управления'  # Название в панели управления

    # def ready(self):
    #     import app_admin.signal
    #     pass
