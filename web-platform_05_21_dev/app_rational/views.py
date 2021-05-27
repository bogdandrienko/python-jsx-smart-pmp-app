from src.py.django_utils import AutorizationClass, PaginationClass, HttpRaiseExceptionClass, LoggingClass
from django.http.response import Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User
from .models import RationalModel, CategoryRationalModel, LikeRationalModel, CommentRationalModel
from .forms import RationalCreateForm


def rational_list(request, category_slug=None):
    AutorizationClass.user_authenticated(request=request)
    try:
        if category_slug is not None:
            category_page = get_object_or_404(CategoryRationalModel, category_slug=category_slug)
            rational = RationalModel.objects.filter(rational_category=category_page).order_by('-rational_date_registrated')
        else:
            rational = RationalModel.objects.order_by('-rational_date_registrated')
        category = CategoryRationalModel.objects.order_by('-id')
        page = PaginationClass.paginate(request=request, objects=rational, numPage=3)
        context = {
            'page': page,
            'category': category,
        }
        return render(request, 'rational/list.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_list: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_search(request):
    AutorizationClass.user_authenticated(request=request)
    try:
        if request.method == 'POST':
            search = request.POST['search_text']
            rational = RationalModel.objects.filter(rational_name__icontains=search).order_by('-rational_date_registrated')
            context = {
                'page': rational
            }
            return render(request, 'rational/list_search.html', context)
        else:
            return redirect('app_rational:rational')
    except Exception as ex:
        LoggingClass.logging(message=f'rational_search: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_detail(request, rational_id=1):
    AutorizationClass.user_authenticated(request=request)
    try:
        rational = RationalModel.objects.get(id=rational_id)
        user = User.objects.get(id=request.user.id)
        comments = CommentRationalModel.objects.filter(comment_article=rational).order_by('-id')
        # comments = rational.commentrationalmodel_set.order_by('-id')  # равнозначно предыдущему
        blog_is_liked = False
        blog_is_disliked = False
        total_like = LikeRationalModel.objects.filter(like_article=rational, like_status=True).count()
        total_dislike = LikeRationalModel.objects.filter(like_article=rational, like_status=False).count()
        try:
            blog_like = LikeRationalModel.objects.get(like_article=rational, like_author=user, like_status=True)
            blog_is_liked = True
        except:
            try:
                blog_like = LikeRationalModel.objects.get(like_article=rational, like_author=user, like_status=False)
                blog_is_disliked = True
            except:
                pass
        context = {
            'rational': rational,
            'comments': comments,
            'likes': {
                'like': blog_is_liked,
                'dislike': blog_is_disliked,
                'total_like': total_like,
                'total_dislike': total_dislike,
                'total_rating': total_like - total_dislike
            }
        }
        return render(request, 'rational/detail.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_detail: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_create(request):
    AutorizationClass.user_authenticated(request=request)
    try:
        if request.method == 'POST':
            form = RationalCreateForm(request.POST, request.FILES)
            if form.is_valid():
                RationalModel.objects.create(
                    rational_structure_from=request.POST['rational_structure_from'],
                    rational_uid_registrated=request.POST['rational_uid_registrated'],
                    rational_date_registrated=request.POST.get('rational_date_registrated'),
                    rational_name=request.POST['rational_name'],
                    rational_place_innovation=request.POST['rational_place_innovation'],
                    rational_description=request.POST['rational_description'],
                    rational_addition_file_1=request.FILES.get('rational_addition_file_1'),
                    rational_addition_file_2=request.FILES.get('rational_addition_file_2'),
                    rational_addition_file_3=request.FILES.get('rational_addition_file_3'),
                    rational_offering_members=request.POST['rational_offering_members'],
                    rational_conclusion=request.POST['rational_conclusion'],
                    rational_change_documentations=request.POST['rational_change_documentations'],
                    rational_resolution=request.POST['rational_resolution'],
                    rational_responsible_members=request.POST['rational_responsible_members'],
                    rational_date_certification=request.POST.get('rational_date_certification'),
                    rational_category=CategoryRationalModel.objects.get(id=request.POST.get('rational_category')),
                    rational_autor_name=User.objects.get(id=request.user.id),
                    # rational_date_create            = request.POST.get('rational_date_create'),
                    rational_addition_image=request.FILES.get('rational_addition_image'),
                    # rational_status                 = request.POST['rational_status'],
                )
            return redirect('app_rational:rational')
        form = RationalCreateForm(request.POST, request.FILES)
        category = CategoryRationalModel.objects.order_by('-id')
        user = User.objects.get(id=request.user.id).username
        context = {
            'form': form,
            'category': category,
            'user': user,
        }
        return render(request, 'rational/create.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_create: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_change(request, rational_id=None):
    AutorizationClass.user_authenticated(request=request)
    try:
        if request.method == 'POST':
            form = RationalCreateForm(request.POST, request.FILES)
            if form.is_valid():
                object = RationalModel.objects.get(id=rational_id)
                object.rational_structure_from = request.POST['rational_structure_from']
                object.rational_uid_registrated = request.POST['rational_uid_registrated']
                object.rational_date_registrated = request.POST.get('rational_date_registrated')
                object.rational_name = request.POST['rational_name']
                object.rational_place_innovation = request.POST['rational_place_innovation']
                object.rational_description = request.POST['rational_description']
                object.rational_addition_file_1 = request.FILES.get('rational_addition_file_1')
                object.rational_addition_file_2 = request.FILES.get('rational_addition_file_2')
                object.rational_addition_file_3 = request.FILES.get('rational_addition_file_3')
                object.rational_offering_members = request.POST['rational_offering_members']
                object.rational_conclusion = request.POST['rational_conclusion']
                object.rational_change_documentations = request.POST['rational_change_documentations']
                object.rational_resolution = request.POST['rational_resolution']
                object.rational_responsible_members = request.POST['rational_responsible_members']
                object.rational_date_certification = request.POST.get('rational_date_certification')
                object.rational_category = CategoryRationalModel.objects.get(id=request.POST.get('rational_category'))
                object.rational_autor_name = User.objects.get(id=request.user.id)
                # rational_date_create            = request.POST.get('rational_date_create'),
                object.rational_addition_image = request.FILES.get('rational_addition_image')
                # rational_status                 = request.POST['rational_status'],
                object.save()
            return redirect('app_rational:rational')
        form = RationalCreateForm(request.POST, request.FILES)
        category = CategoryRationalModel.objects.order_by('-id')
        context = {
            'form': form,
            'category': category,
            'rational_id': rational_id,
        }
        return render(request, 'rational/change.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_change: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_leave_comment(request, rational_id):
    AutorizationClass.user_authenticated(request=request)
    try:
        rational = RationalModel.objects.get(id=rational_id)
        CommentRationalModel.objects.create(comment_article=rational,
                                            comment_author=User.objects.get(id=request.user.id),
                                            comment_text=request.POST['comment_text'])
        # rational.commentrationalmodel_set.create(comment_author=User.objects.get(id=request.user.id),
        #                                          comment_text=request.POST['comment_text'])  # равнозначно предыдущему
        return HttpResponseRedirect(reverse('app_rational:rational_detail', args=(rational.id,)))
    except Exception as ex:
        LoggingClass.logging(message=f'rational_leave_comment: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_change_rating(request, rational_id):
    AutorizationClass.user_authenticated(request=request)
    try:
        blog = RationalModel.objects.get(id=rational_id)
        user = User.objects.get(id=request.user.id)
        if request.POST['status'] == '+':
            try:
                blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user,
                                                          like_status=True).delete()
            except:
                blog.likerationalmodel_set.create(like_article=blog, like_author=user, like_status=True)
            try:
                blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user,
                                                          like_status=False).delete()
            except:
                pass
        else:
            try:
                blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user,
                                                          like_status=False).delete()
            except:
                blog.likerationalmodel_set.create(like_article=blog, like_author=user, like_status=False)
            try:
                blog_like = LikeRationalModel.objects.get(like_article=blog, like_author=user,
                                                          like_status=True).delete()
            except:
                pass
        return HttpResponseRedirect(reverse('app_rational:rational_detail', args=(blog.id,)))
    except Exception as ex:
        LoggingClass.logging(message=f'rational_change_rating: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')
