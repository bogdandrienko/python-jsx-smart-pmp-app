from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('home/', views.home, name='home'),


    path('custom/', views.custom, name='custom'),


    path('news/', views.news_list, name='news_list'),
    path('news/<int:article_id>/', views.news_detail, name='news_detail'),
    path('news/<int:article_id>/leave_comment/', views.leave_comment, name='leave_comment'),
    path('news/<int:article_id>/increase_rating/', views.increase_rating, name='increase_rating'),
    path('news/<int:article_id>/decrease_rating/', views.decrease_rating, name='decrease_rating'),

    

    path('project_managment/', views.project_managment, name='project_managment'),
    path('project_managment/project_managment_sub_first/', views.project_managment_sub_first, name='project_managment_sub_first'),
    path('project_managment/project_managment_sub_second/', views.project_managment_sub_second, name='project_managment_sub_second'),
]
