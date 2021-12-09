from django.urls import path
from . import views


# app_name = 'app_chat'
urlpatterns = [
    path('', views.list_sms, name='chat'),
]
