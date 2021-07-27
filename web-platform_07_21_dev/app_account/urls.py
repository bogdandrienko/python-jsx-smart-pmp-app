from django.urls import path, include
from . import views

app_name = 'app_account'
urlpatterns = [
    path('login/', views.login_account, name='login'),
    path('logout/', views.logout_account, name='logout'),
    path('get_user/', views.get_user, name='get_user'),
    path('create_user/', views.create_user, name='create_user'),
    path('change_user/', views.change_user, name='change_user'),
    path('create_users/', views.create_users, name='create_users'),
    path('export_users/', views.export_users, name='export_users'),
    path('generate_password/', views.generate_password, name='generate_password'),
    path('generate_passwords/', views.generate_passwords, name='generate_passwords'),
    path('profile/<slug:username>', views.view_profile, name='view_profile'),
    path('', include('django.contrib.auth.urls')),
]
