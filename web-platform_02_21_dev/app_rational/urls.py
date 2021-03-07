from django.urls import path
from . import views


app_name = 'app_rational'
urlpatterns = [
    path('', views.rational_list, name='rational'),
    path('<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('create/', views.rational_create, name='rational_create'),
    path('<int:rational_id>/leave_comment/', views.rational_leave_comment, name='rational_leave_comment'),
    path('<int:rational_id>/increase_rating/', views.rational_increase_rating, name='rational_increase_rating'),
    path('<int:rational_id>/decrease_rating/', views.rational_decrease_rating, name='rational_decrease_rating'),
]
