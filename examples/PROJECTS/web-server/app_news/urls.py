from django.urls import path
from . import views

urlpatterns = [
    path('personal/', views.personal_sub_first, name='personal_sub_first'),
    path('personal/', views.personal_sub_second, name='personal_sub_second'),
]
