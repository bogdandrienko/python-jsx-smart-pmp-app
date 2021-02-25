from django.urls import path
from . import views

urlpatterns = [
    path('', views.rational_list, name='rational'),
    path('<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('create/', views.rational_create, name='rational_create'),
]
