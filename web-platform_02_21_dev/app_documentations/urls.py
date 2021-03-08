from django.urls import path
from . import views


app_name = 'app_documentations'
urlpatterns = [
    path('', views.docs, name='documentations'),
]
