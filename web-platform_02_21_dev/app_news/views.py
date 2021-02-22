from django.shortcuts import render
from .models import Article
from django.http.response import Http404, HttpResponseRedirect
from django.urls import reverse
from .forms import ArticleEditForm
# Create your views here.


def news_list(request):
    latest_article_list = Article.objects.order_by('-article_pub_date')[:10]

    return render(request, 'news/news_list.html', {'latest_article_list': latest_article_list})


def news_create(request):

    if request.method == 'POST':
        Article.objects.create(
            article_title = request.POST['article_title'], 
            article_text = request.POST['article_text']
            )
        latest_article_list = Article.objects.order_by('-article_pub_date')[:10]

        return render(request, 'news/news_list.html', {'latest_article_list': latest_article_list})

    post_form= ArticleEditForm(request.POST)

    # context = {
    #     "post_form" : post_form,
    # }

    return render(request, 'news/news_create.html', {'post_form': post_form})


def news_detail(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    latest_comments_list = a.comment_set.order_by('-id')[:10]

    return render(request, 'news/news_detail.html', {'article': a, 'latest_comments_list': latest_comments_list})


def leave_comment(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404('Статья не найдена')

    a.comment_set.create(author_name = request.POST['name'], comment_text = request.POST['text'])

    return HttpResponseRedirect( reverse('news_detail', args = (a.id,)) )


def increase_rating(request, article_id):
    a = Article.objects.get(id = article_id)
    a.increase()
    a.save()
    return HttpResponseRedirect( reverse('news_detail', args = (a.id,)) )


def decrease_rating(request, article_id):
    a = Article.objects.get(id = article_id)
    a.decrease()
    a.save()
    return HttpResponseRedirect( reverse('news_detail', args = (a.id,)) )
