from django.shortcuts import render
from .models import News
from .serializers import NewsSerializer
from rest_framework import generics

# Create your views here.

class NewsListCreate(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


def home(request):
    return render(request, 'navbar/home.html')


def personal(request):
    return render(request, 'navbar/personal.html')

def personal_sub_first(request):
    return render(request, 'personal/personal_sub_first.html')

def personal_sub_second(request):
    return render(request, 'personal/personal_sub_second.html')


def news(request):
    return render(request, 'navbar/news.html')

def human_resources_management_service(request):
    return render(request, 'navbar/human_resources_management_service.html')


def project_managment(request):
    return render(request, 'navbar/project_managment.html')

def project_one(request):
    news = News.objects
    return render(request, 'project_managment/project_one.html', {'news': news})

def project_all(request):
    try:
        user_text = request.GET['usertext']
    except:
        user_text = ''
        print('except in views(get)')
    news = News.objects
    return render(request, 'project_managment/project_all.html', {'user_text': user_text, 'news': news})
