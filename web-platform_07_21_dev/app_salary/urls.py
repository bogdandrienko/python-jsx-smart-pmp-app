from django.urls import path
from . import views


app_name = 'app_salary'
urlpatterns = [
    path('', views.salary, name='salary'),
    path('check/<int:request_id>', views.salary, name='salary/check'),
]
