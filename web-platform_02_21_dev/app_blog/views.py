from django.apps.config import AppConfig
from django.http.response import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Article

from django.urls import reverse


# Create your views here.


def index(request):
    latest_article_list = Article.objects.order_by('-article_pub_date')[:5]

    return render(request, 'blog_list.html', {'latest_article_list': latest_article_list})


def detail(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    latest_comments_list = a.comment_set.order_by('-id')[:10]

    return render(request, 'detail_list.html', {'article': a, 'latest_comments_list': latest_comments_list})


def leave_comment(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    a.comment_set.create(author_name = request.POST['name'], comment_text = request.POST['text'])

    return HttpResponseRedirect( reverse('app_blog:detail', args = (a.id,)) )
    
    
    
    
    