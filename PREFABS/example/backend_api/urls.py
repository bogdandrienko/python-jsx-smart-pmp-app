from django.urls import path
from backend_api import views


urlpatterns = [
    path('api/any/user/', views.api_any_user, name='api_any_user'),
    path('api/auth/user/', views.api_auth_user, name='api_auth_user'),
]
