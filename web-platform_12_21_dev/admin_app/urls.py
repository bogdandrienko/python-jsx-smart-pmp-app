from django.urls import path, include
from . import views


urlpatterns = [
    # auth
    path('', include('django.contrib.auth.urls')),
    # admin
    path('admin/', views.admin_, name='admin'),
    # home
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
]
