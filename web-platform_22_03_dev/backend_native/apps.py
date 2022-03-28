from django.apps import AppConfig


class BackendNativeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend_native'
    verbose_name = 'Нативные джанго модели'  # Название в панели управления

