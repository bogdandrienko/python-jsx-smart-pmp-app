from django.urls import path, include
from . import views


app_name = 'app_account'
urlpatterns = [
    path('create/', views.create_account, name='create'),
    path('login/', views.login_account, name='login'),
    path('logout/', views.logout_account, name='logout'),
    path('', include('django.contrib.auth.urls')),
]
