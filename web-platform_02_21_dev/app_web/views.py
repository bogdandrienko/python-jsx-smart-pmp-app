from django.shortcuts import render
from django.contrib import admin
from .models import Product, Article
from django.http.response import Http404, HttpResponseRedirect
from django.urls import reverse

# Create your views here.


def admin(request):
    return render(request, admin.site.urls)


def home(request):
    return render(request, 'home.html')


def custom(request):
    return render(request, 'components/custom.html')


def project_managment(request):
    return render(request, 'project_managment.html')


def project_managment_sub_first(request):
    Project_managment = Product.objects
    return render(request, 'project_managment_sub_first.html', {'Project_managment': Project_managment})


def project_managment_sub_second(request):
    Project_managment = Product.objects
    return render(request, 'project_managment_sub_second.html', {'Project_managment': Project_managment})





def news_list(request):
    latest_article_list = Article.objects.order_by('-article_pub_date')[:5]

    return render(request, 'news_list.html', {'latest_article_list': latest_article_list})


def news_detail(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    latest_comments_list = a.comment_set.order_by('-id')[:10]

    return render(request, 'news_detail.html', {'article': a, 'latest_comments_list': latest_comments_list})


def leave_comment(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    a.comment_set.create(author_name = request.POST['name'], comment_text = request.POST['text'])

    return HttpResponseRedirect( reverse('news_detail', args = (a.id,)) )
