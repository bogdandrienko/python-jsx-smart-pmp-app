from django.urls import path
from . import views


app_name = 'app_weather'
urlpatterns = [
    path('', views.index, name='weather'),
]