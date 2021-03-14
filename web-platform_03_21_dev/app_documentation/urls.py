from django.urls import path
from . import views


app_name = 'app_documentation'
urlpatterns = [
    path('', views.documentation, name='documentation'),
]
