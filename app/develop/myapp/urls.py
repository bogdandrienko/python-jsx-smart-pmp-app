"""myapp URL Configuration

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
from django.urls import path
from polls import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', views.home, name='home'),    
    
    path('personal/', views.personal, name='personal'),    
    path('personal/personal_sub_first', views.personal_sub_first, name='personal_sub_first'), 
    path('personal/personal_sub_second', views.personal_sub_second, name='personal_sub_second'), 

    path('news/', views.news, name='news'),        
    path('human_resources_management_service/', views.human_resources_management_service, name='human_resources_management_service'),
    
    path('project_managment/', views.project_managment, name='project_managment'),
    path('project_managment/project_one/', views.project_one, name='project_one'),
    path('project_managment/project_all/', views.project_all, name='project_all'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
