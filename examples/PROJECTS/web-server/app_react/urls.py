from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home),
    path('api_react/', views.api_react, name='api_react'),
    path('react/', views.react, name='react')
]
