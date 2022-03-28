from django.urls import path
from backend_native import views

urlpatterns = [
    path('', views.idea_list, name=''),
    path('idea_create/', views.idea_create, name='idea_create'),
    path('idea_change/<int:idea_int>/', views.idea_change, name='idea_change'),
    path('idea_list/', views.idea_list, name='idea_list'),
    path('idea_list/<slug:category_slug>/', views.idea_list, name='idea_list'),
    path('idea_change_visibility/<int:idea_int>/', views.idea_change_visibility, name='idea_change_visibility'),
    path('idea_view/<int:idea_int>/', views.idea_view, name='idea_view'),
    path('idea_like/<int:idea_int>/', views.idea_like, name='idea_like'),
    path('idea_comment/<int:idea_int>/', views.idea_comment, name='idea_comment'),
]
