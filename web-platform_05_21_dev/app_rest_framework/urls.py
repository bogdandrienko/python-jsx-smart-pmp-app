from rest_framework import routers
from .api import TodoViewSet, DataViewSet


router = routers.DefaultRouter()
router.register('react/api/todo', TodoViewSet, 'todo')
router.register('react/api/data', DataViewSet, 'data')
urlpatterns = router.urls
