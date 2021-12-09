from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/', views.admin, name='admin'),


    path('', views.home, name=''),
    path('home/', views.home, name='home'),


    path('custom/', views.custom, name='custom'),


    path('project_managment/', views.project_managment, name='project_managment'),
    path('project_managment/project_managment_sub_first/', views.project_managment_sub_first, name='project_managment_sub_first'),
    path('project_managment/project_managment_sub_second/', views.project_managment_sub_second, name='project_managment_sub_second'),
]
