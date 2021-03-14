from django.urls import path
from . import views


app_name = 'app_email'
urlpatterns = [
    path('', views.email, name='email'),
    path('send_email/', views.send_email, name='send_email'),
]
