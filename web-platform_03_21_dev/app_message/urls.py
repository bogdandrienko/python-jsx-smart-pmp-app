from django.urls import path
from . import views


app_name = 'app_message'
urlpatterns = [
    path('', views.message, name='message'),
]
