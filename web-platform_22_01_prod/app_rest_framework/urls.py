from rest_framework import routers
from .api import TodoViewSet, DataViewSet


router = routers.DefaultRouter()
router.register('app_react/api/todo', TodoViewSet, 'todo')
router.register('app_react/api/data', DataViewSet, 'data')
urlpatterns = router.urls
