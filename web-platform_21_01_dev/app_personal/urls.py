from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('personal/', views.personal, name='personal'),
    path('personal/personal_sub_first', views.personal_sub_first, name='personal_sub_first'),
    path('personal/personal_sub_second', views.personal_sub_second, name='personal_sub_second'),
]
