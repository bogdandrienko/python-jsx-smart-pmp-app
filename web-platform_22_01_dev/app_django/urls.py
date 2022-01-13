from django.urls import path, include
from . import views
from app_django.api import UserViewSet, GroupViewSet, ChatViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=GroupViewSet, basename='groups')
router.register(prefix=r'chat', viewset=ChatViewSet, basename='chat')

urlpatterns = [
    path('drf/', include(router.urls)),
    path('chat/', views.chat, name='chat'),
    path('salary/', views.salary, name='salary'),
    path('salary_pdf/', views.salary_pdf, name='salary_pdf'),
    path('career/', views.career, name='career'),
    path('idea_create/', views.idea_create, name='idea_create'),
    path('idea_change/<int:idea_int>/', views.idea_change, name='idea_change'),
    path('idea_list/', views.idea_list, name='idea_list'),
    path('idea_list/<slug:category_slug>/', views.idea_list, name='idea_list'),
    path('idea_change_visibility/<int:idea_int>/', views.idea_change_visibility, name='idea_change_visibility'),
    path('idea_view/<int:idea_int>/', views.idea_view, name='idea_view'),
    path('idea_like/<int:idea_int>/', views.idea_like, name='idea_like'),
    path('idea_comment/<int:idea_int>/', views.idea_comment, name='idea_comment'),
    path('idea_rating/', views.idea_rating, name='idea_rating'),
    path('video_study/', views.video_study, name='video_study'),
    path('geo/', views.geo, name='geo'),
    path('analyse/', views.analyse, name='analyse'),
    path('passages_thermometry/', views.passages_thermometry, name='passages_thermometry'),
    path('passages_select/', views.passages_select, name='passages_select'),
    path('passages_update/', views.passages_update, name='passages_update'),
    path('passages_insert/', views.passages_insert, name='passages_insert'),
    path('passages_delete/', views.passages_delete, name='passages_delete'),
]
