from django.http.response import Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import RationalModel, CategoryRationalModel, LikeRationalModel
from .forms import RationalCreateForm
from django.utils import timezone


def rational_list(request, category_slug=None):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    category_page = None
    rational = None
    try:
        search = request.POST['search_text']
        rational = RationalModel.objects.filter(rational_name__icontains=search)
    except:
        if category_slug != None:
            category_page = get_object_or_404(CategoryRationalModel, category_slug=category_slug)
            rational = RationalModel.objects.filter(rational_category=category_page).order_by('-rational_date_registrated')
    rational = RationalModel.objects.order_by('-rational_date_registrated')
    category = CategoryRationalModel.objects.order_by('-id')

    # Начало пагинатора: передать модель и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(rational, 3)
    page = request.GET.get('page')
    try:
        page = paginator.page(page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    # конец пагинатора, объекты под ключом "'page': page"

    context = {
        'page': page,
        'category': category,
    }
    return render(request, 'rational/list.html', context)

def rational_search(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    search = request.POST['search_text']
    contacts = RationalModel.objects.filter(rational_name__icontains=search)
    rational = RationalModel.objects.order_by('-rational_date_registrated')
    context = {
        'rational': rational,
        'contacts': contacts
    }
    return render(request, 'rational/list_search.html', context)

def rational_detail(request, rational_id):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

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
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    if request.method == 'POST':
        form = RationalCreateForm(request.POST, request.FILES)
        if form.is_valid():
            RationalModel.objects.create(
                rational_structure_from         = request.POST['rational_structure_from'],
                rational_uid_registrated        = request.POST['rational_uid_registrated'],
                rational_date_registrated       = request.POST.get('rational_date_registrated'),
                rational_name                   = request.POST['rational_name'],
                rational_place_innovation       = request.POST['rational_place_innovation'],
                rational_description            = request.POST['rational_description'],
                rational_addition_file_1        = request.FILES.get('rational_addition_file_1'),
                rational_addition_file_2        = request.FILES.get('rational_addition_file_2'),
                rational_addition_file_3        = request.FILES.get('rational_addition_file_3'),
                rational_offering_members       = request.POST['rational_offering_members'],
                rational_conclusion             = request.POST['rational_conclusion'],
                rational_change_documentations  = request.POST['rational_change_documentations'],
                rational_resolution             = request.POST['rational_resolution'],
                rational_responsible_members    = request.POST['rational_responsible_members'],
                rational_date_certification     = request.POST.get('rational_date_certification'),
                rational_category               = CategoryRationalModel.objects.get(id=request.POST.get('rational_category')),
                rational_autor_name             = User.objects.get(id=request.user.id),
                # rational_date_create            = request.POST.get('rational_date_create'),
                rational_addition_image         = request.FILES.get('rational_addition_image'),
                # rational_status                 = request.POST['rational_status'],
                )
        return redirect('app_rational:rational')
    form= RationalCreateForm(request.POST, request.FILES)
    category = CategoryRationalModel.objects.order_by('-id')
    user = User.objects.get(id=request.user.id).username
    context = {
        'form': form,
        'category': category,
        'user': user,
    }
    return render(request, 'rational/create.html', context)

def rational_change(request, rational_id=None):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    if request.method == 'POST':
        form = RationalCreateForm(request.POST, request.FILES)
        if form.is_valid():
            object = RationalModel.objects.get(id=rational_id)
            object.rational_structure_from         = request.POST['rational_structure_from']
            object.rational_uid_registrated        = request.POST['rational_uid_registrated']
            object.rational_date_registrated       = request.POST.get('rational_date_registrated')
            object.rational_name                   = request.POST['rational_name']
            object.rational_place_innovation       = request.POST['rational_place_innovation']
            object.rational_description            = request.POST['rational_description']
            object.rational_addition_file_1        = request.FILES.get('rational_addition_file_1')
            object.rational_addition_file_2        = request.FILES.get('rational_addition_file_2')
            object.rational_addition_file_3        = request.FILES.get('rational_addition_file_3')
            object.rational_offering_members       = request.POST['rational_offering_members']
            object.rational_conclusion             = request.POST['rational_conclusion']
            object.rational_change_documentations  = request.POST['rational_change_documentations']
            object.rational_resolution             = request.POST['rational_resolution']
            object.rational_responsible_members    = request.POST['rational_responsible_members']
            object.rational_date_certification     = request.POST.get('rational_date_certification')
            object.rational_category               = CategoryRationalModel.objects.get(id=request.POST.get('rational_category'))
            object.rational_autor_name             = User.objects.get(id=request.user.id)
            # rational_date_create            = request.POST.get('rational_date_create'),
            object.rational_addition_image         = request.FILES.get('rational_addition_image')
            # rational_status                 = request.POST['rational_status'],
            object.save()
        return redirect('app_rational:rational')
    form= RationalCreateForm(request.POST, request.FILES)
    category = CategoryRationalModel.objects.order_by('-id')
    context = {
        'form': form,
        'category': category,
        'rational_id':rational_id,
    }
    return render(request, 'rational/change.html', context)

def rational_leave_comment(request, rational_id):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    try:
        rational = RationalModel.objects.get(id = rational_id)
    except:
        raise Http404('Статья не найдена')
    rational.commentrationalmodel_set.create(
        comment_author = User.objects.get(id=request.user.id),
        comment_text = request.POST['comment_text']
        )
    return HttpResponseRedirect( reverse('app_rational:rational_detail', args = (rational.id,)) )

def rational_increase_rating(request, rational_id):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

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
    return HttpResponseRedirect( reverse('app_rational:rational_detail', args = (rational.id,)) )

def rational_decrease_rating(request, rational_id):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

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
    return HttpResponseRedirect( reverse('app_rational:rational_detail', args = (rational.id,)) )
