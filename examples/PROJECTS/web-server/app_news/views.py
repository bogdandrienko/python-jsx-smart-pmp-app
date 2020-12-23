from django.shortcuts import render
from .models import Events as JSON

# Create your views here.

def news(request):
    return render(request, 'navbar/news.html')

def news_sub_first(request):
    News = JSON.objects
    return render(request, 'news/news_sub_first.html', {'News': News})

def news_sub_second(request):
    News = JSON.objects
    return render(request, 'news/news_sub_second.html', {'News': News})
