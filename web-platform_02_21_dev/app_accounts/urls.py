from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/', views.admin, name='admin'),
    path('accounts/', include('django.contrib.auth.urls')),
]
