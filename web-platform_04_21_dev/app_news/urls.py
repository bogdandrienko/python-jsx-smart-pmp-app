from django.urls import path
from . import views

urlpatterns = [
    path('', views.news_list, name='news'),
    path('create/', views.news_create, name='news_create'),
    path('<int:article_id>/', views.news_detail, name='news_detail'),
    path('<int:article_id>/leave_comment/', views.leave_comment, name='leave_comment'),
    path('<int:article_id>/increase_rating/', views.increase_rating, name='increase_rating'),
    path('<int:article_id>/decrease_rating/', views.decrease_rating, name='decrease_rating'),
]
