"""app_settings URL Configuration

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
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    # example
    path('examples_forms/', views.examples_forms, name='examples_forms'),
    path('example/', views.example, name='example'),
    # local
    path('local/', views.local, name='local'),
    # admin
    path('admin/', views.admin_, name='admin'),
    # logging
    path('logging/', views.logging, name='logging'),
    # home
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
    # account
    path('account_login/', views.account_login, name='account_login'),
    path('account_logout/', views.account_logout, name='account_logout'),
    path('account_change_password/', views.account_change_password, name='account_change_password'),
    path('account_change_profile/', views.account_change_profile, name='account_change_profile'),
    path('account_recover_password/<slug:type_slug>/', views.account_recover_password, name='account_recover_password'),
    path('account_profile/<int:user_id>/', views.account_profile, name='account_profile'),

    path('account_create_accounts/<slug:quantity_slug>/', views.account_create_or_change_accounts,
         name='account_create_or_change_accounts'),
    path('account_export_accounts/', views.account_export_accounts, name='account_export_accounts'),
    path('account_generate_passwords/', views.account_generate_passwords, name='account_generate_passwords'),
    path('account_update_accounts_1c/', views.account_update_accounts_1c, name='account_update_accounts_1c'),
    path('account_change_groups/', views.account_change_groups, name='account_change_groups'),
]
