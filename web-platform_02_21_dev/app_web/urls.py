from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('home/', views.home, name='home'),


    path('custom/', views.custom, name='custom'),
]
