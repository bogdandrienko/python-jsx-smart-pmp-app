from django.urls import path
from . import views


app_name = 'app_messages'
urlpatterns = [
    path('', views.messages, name='messages'),
]
