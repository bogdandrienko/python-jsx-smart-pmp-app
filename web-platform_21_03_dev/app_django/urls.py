"""app_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [
    path('grappelli/', include('grappelli.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('admin/', admin.site.urls),
    path('admin/', views.admin, name='admin'),
    path('', views.home, name=''),
    path('home/', views.home, name='home'),

    path('account/', include('app_account.urls')),
    path('application/', include('app_application.urls')),
    path('notification/', include('app_notification.urls')),
    path('email/', include('app_email.urls')),
    path('contact/', include('app_contact.urls')),
    path('documentation/', include('app_documentation.urls')),
    path('message/', include('app_message.urls')),
    path('weather/', include('app_wheather.urls')),
    path('rational/', include('app_rational.urls')),

    path('ecommerse/', include('app_ecommerse.urls')),
    path('news/', include('app_news.urls')),
    path('react/', include('app_react.urls')),
    path('examples/', include('app_bootstrap_examples.urls')),
    path('movies/', include('app_movies.urls')),

    path('', include('app_rest_framework.urls')),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
