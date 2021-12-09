from django.urls import path
from . import views


app_name = 'app_notification'
urlpatterns = [
    path('', views.notification, name='notification'),
    path('create', views.create, name='create'),
    path('<int:notify_id>/accept', views.accept, name='accept'),
    path('<int:notify_id>/decline', views.decline, name='decline'),
]
