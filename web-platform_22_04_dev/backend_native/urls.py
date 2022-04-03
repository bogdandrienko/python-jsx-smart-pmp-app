"""backend_settings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend_native import views

app_name = 'backend_native'
urlpatterns = [
    path('', views.home, name=''),
    path('home/', views.home, name='django_home'),

    path('idea_create/', views.idea_create, name='django_idea_create'),
    path('idea_change/<int:idea_int>/', views.idea_change, name='django_idea_change'),
    path('idea_list/', views.idea_list, name='django_idea_list'),
    path('idea_list/<slug:category_slug>/', views.idea_list, name='django_idea_list'),
    path('idea_change_visibility/<int:idea_int>/', views.idea_change_visibility, name='django_idea_change_visibility'),
    path('idea_view/<int:idea_int>/', views.idea_view, name='django_idea_view'),
    path('idea_like/<int:idea_int>/', views.idea_like, name='django_idea_like'),
    path('idea_comment/<int:idea_int>/', views.idea_comment, name='django_idea_comment'),
    path('idea_rating/', views.idea_rating, name='django_idea_rating'),
]
