from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.news, name='news'),
    path('news/news_sub_first', views.news_sub_first, name='news_sub_first'),
    path('news/news_sub_second', views.news_sub_second, name='news_sub_second'),
]
