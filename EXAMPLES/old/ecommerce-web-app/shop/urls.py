from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
]
