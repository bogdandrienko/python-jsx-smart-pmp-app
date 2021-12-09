from django.urls import path
from . import views


app_name = 'app_application'
urlpatterns = [
    path('list_module/', views.list_module, name='list_module'),
    path('list_module/<slug:module_slug>/', views.list_component, name='list_component'),
]
