from django.urls import path
from . import views


app_name = 'app_wheather'
urlpatterns = [
    path('', views.index, name='wheather'),
]