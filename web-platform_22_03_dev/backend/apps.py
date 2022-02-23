from django.apps import AppConfig


class AppAdminConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'  # Имя django-приложения
    verbose_name = 'Панель управления'  # Название в панели управления

    # def ready(self):
    #     import backend.signal
    #     pass
