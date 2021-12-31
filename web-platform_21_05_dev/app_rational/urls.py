from django.urls import path
from . import views


app_name = 'app_rational'
urlpatterns = [
    path('', views.rational_list, name='rational'),
    path('search/', views.rational_search, name='rational_search'),
    path('<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('create/', views.rational_create, name='rational_create'),
    path('ratings/', views.rational_ratings, name='rational_ratings'),
    path('<int:rational_id>/change/', views.rational_change, name='rational_change'),
    path('<int:rational_id>/leave_comment/', views.rational_leave_comment, name='rational_leave_comment'),
    path('<int:rational_id>/rational_change_rating/', views.rational_change_rating, name='rational_change_rating'),
]