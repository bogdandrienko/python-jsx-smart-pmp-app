from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
    path('about/', views.about, name='about'),
]
