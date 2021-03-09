from django.urls import path
from . import views


app_name = 'app_application'
urlpatterns = [
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
    path('application_list/', views.application_list, name='application_list'),
    path('application_list/<slug:application_slug>/', views.applications_detail, name='applications_detail'),
]
