from django.urls import path
from . import views

urlpatterns = [
    path('project_managment/', views.project_managment, name='project_managment'),
    path('project_managment/project_managment_sub_first/', views.project_managment_sub_first, name='project_managment_sub_first'),
    path('project_managment/project_managment_sub_second/', views.project_managment_sub_second, name='project_managment_sub_second'),
]
