"""backend_settings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path
from . import views

app_name = 'app_recepies_bank'
urlpatterns = [
    # path('index/', views.index, name='index'),
    # path('', views.home, name=''),
    # path('home/', views.home, name='home'),
    #
    # path('todo/create/', views.create, name='create'),
    path('recipe/<int:recipe_id>/', views.read, name='read'),
    # path('todo/list/', views.read_list, name='read_list'),
    # path('todo/<int:todo_id>/update/', views.update, name='update'),
    # re_path(r'^todo/(?P<todo_id>\d+)/delete/$', views.delete, name='delete'),
]
