from django.shortcuts import render

# Create your views here.

def news(request):
    return render(request, 'navbar/news.html')

def news_sub_first(request):
    return render(request, 'news/news_sub_first.html')

def news_sub_second(request):
    return render(request, 'news/news_sub_second.html')
