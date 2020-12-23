from rest_framework import routers, urlpatterns
from .api import TodoViewSet
from django.contrib import admin
from django.urls import path, include

router = routers.DefaultRouter()
router.register('todo', TodoViewSet, 'todo')


# urlpatterns = router.urls

urlpatterns = [
    path(r'api/', include(router.urls), name='api')
    ]
