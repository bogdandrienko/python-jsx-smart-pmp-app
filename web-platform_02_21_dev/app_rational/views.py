from django.http.response import Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import RationalModel, CategoryRationalModel, LikeRationalModel
from .forms import RationalCreateForm


def rational_list(request, category_slug=None):
    if request.user.is_authenticated is not True:
        return redirect('login')
    category_page = None
    rational = None
    try:
        search = request.POST['search_text']
        rational = RationalModel.objects.filter(rational_name__icontains=search)
    except:
        if category_slug != None:
            category_page = get_object_or_404(CategoryRationalModel, category_slug=category_slug)
            rational = RationalModel.objects.filter(rational_category=category_page).order_by('-rational_date_registrated')
        else:
            rational = RationalModel.objects.order_by('-rational_date_registrated')
    paginator = Paginator(rational, 6)
    category = CategoryRationalModel.objects.order_by('-id')
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        contacts = paginator.page(1)
    except EmptyPage:
        contacts = paginator.page(paginator.num_pages)
    rational = RationalModel.objects.order_by('-rational_date_registrated')
    context = {
        'rational': rational,
        'category': category,
        'contacts': contacts
    }
    return render(request, 'rational/list.html', context)

def rational_detail(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    try:
        rational = RationalModel.objects.get(id=rational_id)
    except:
        raise Http404('Предложение не найдено')
    comments = rational.commentrationalmodel_set.order_by('-id')
    like_article = RationalModel.objects.get(id=rational_id)
    like_author = User.objects.get(id=request.user.id)
    try:
        blog_like = LikeRationalModel.objects.get(like_article=like_article, like_author=like_author, like_status=True)
        blog_is_like = True
    except:
        blog_is_like = False
    try:
        blog_like = LikeRationalModel.objects.get(like_article=like_article, like_author=like_author, like_status=False)
        blog_is_dislike = True
    except:
        blog_is_dislike = False
    like_count = LikeRationalModel.objects.filter(like_article=like_article, like_status=True).count()
    dislike_count = LikeRationalModel.objects.filter(like_article=like_article, like_status=False).count()
    likes = {
        'like': blog_is_like,
        'dislike': blog_is_dislike,
        'total_like': like_count,
        'total_dislike': dislike_count, 
        'total_rating': like_count - dislike_count
    }
    context = {
        'rational': rational,
        'comments': comments,
        'likes': likes
    }
    return render(request, 'rational/detail.html', context)

def rational_create(request):
    if request.user.is_authenticated is not True:
        return redirect('login')
    if request.method == 'POST':
        RationalModel.objects.create(
            rational_name = request.POST['rational_name'],
            rational_description = request.POST['rational_description'],
            rational_category = CategoryRationalModel.objects.get(category_name=request.POST['category_name']),
            rational_autor_name = User.objects.get(id=request.user.id)
            )
        return redirect('rational')
    post_form= RationalCreateForm(request.POST)
    category = CategoryRationalModel.objects.order_by('-id')
    context = {
        'post_form': post_form,
        'category': category
    }
    return render(request, 'rational/create.html', context)

def rational_leave_comment(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    try:
        rational = RationalModel.objects.get(id = rational_id)
    except:
        raise Http404('Статья не найдена')
    rational.commentrationalmodel_set.create(
        comment_author = User.objects.get(id=request.user.id),
        comment_text = request.POST['comment_text']
        )
    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )

def rational_increase_rating(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    blog = RationalModel.objects.get(id=rational_id)
    user = User.objects.get(id=request.user.id)
    try:
        blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user, like_status=True)
        blog_like.delete()
    except:
        blog.likerationalmodel_set.create(
            like_article = blog,
            like_author = user,
            like_status = True
            )
    try:
        blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user, like_status=False)
        blog_like.delete()
    except:
        pass
    rational = RationalModel.objects.get(id = rational_id)
    rational.save()
    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )

def rational_decrease_rating(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    blog = RationalModel.objects.get(id=rational_id)
    user = User.objects.get(id=request.user.id)
    try:
        blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user, like_status=False)
        blog_like.delete()
    except:
        blog.likerationalmodel_set.create(
            like_article = blog,
            like_author = user,
            like_status = False
            )
    try:
        blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user, like_status=True)
        blog_like.delete()
    except:
        pass
    rational = RationalModel.objects.get(id = rational_id)
    rational.save()
    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )
