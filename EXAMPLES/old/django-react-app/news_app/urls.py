from django.urls import path
from . import views

urlpatterns = [
    path('api/news_app/', views.NewsListCreate.as_view() ),
]
