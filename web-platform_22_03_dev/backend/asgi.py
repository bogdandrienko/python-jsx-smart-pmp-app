"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

# #################################################################################################TODO download modules
import os
# ###################################################################################################TODO django modules
from django.core.asgi import get_asgi_application
# #################################################################################################TODO default settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_asgi_application()
