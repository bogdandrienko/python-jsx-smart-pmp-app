"""django_project URL Configuration

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
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# from django.contrib.staticfiles.views import serve
# from django.views.static import serve as media_serve
# from django.conf import settings



urlpatterns = [
    path('', include('app_django.urls')),

    path('', include('app_api.urls')),
    # path('', include('app_news.urls')),
    path('', include('app_personal.urls')),
    path('', include('app_project_managment.urls')),
    path('', include('app_react.urls')),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

# if not settings.DEBUG:
#     urlpatterns.append(path('static/<path:path>', serve,
#                                                         {'insecure':True}))
#     urlpatterns.append(path('media/<path:path>', media_serve,
#                             {'document_root':settings.МEDIA_ROOT}))
