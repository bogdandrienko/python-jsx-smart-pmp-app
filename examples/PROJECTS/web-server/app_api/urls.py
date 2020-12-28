from rest_framework import routers, urlpatterns
from .api import TodoViewSet
from django.contrib import admin
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register('todo', TodoViewSet, 'todo')


# urlpatterns = router.urls

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home),
    path('api/', include(router.urls)),
    path('api_react/', views.api_react, name='api_react'),
    ]
