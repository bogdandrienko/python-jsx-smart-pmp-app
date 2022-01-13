from src.py.django_utils import AutorizationClass, PaginationClass, HttpRaiseExceptionClass, LoggingClass
from django.http.response import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User
from .models import RationalModel, CategoryRationalModel, LikeRationalModel, CommentRationalModel
from .forms import RationalCreateForm


def rational_list(request, category_slug=None):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        if category_slug is not None:
            category_page = get_object_or_404(CategoryRationalModel, category_slug=category_slug)
            rational = RationalModel.objects.filter(rational_category=category_page).order_by(
                '-rational_date_registrated')
        else:
            rational = RationalModel.objects.order_by('-rational_date_registrated')
        category = CategoryRationalModel.objects.order_by('-id')
        page = PaginationClass.paginate(request=request, objects=rational, numPage=3)
        context = {
            'page': page,
            'category': category,
        }
        return render(request, 'app_rational/list.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_list: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_search(request):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        if request.method == 'POST':
            search = request.POST['search_text']
            rational = RationalModel.objects.filter(rational_name__icontains=search).order_by(
                '-rational_date_registrated')
            context = {
                'page': rational
            }
            return render(request, 'app_rational/list_search.html', context)
        else:
            return redirect('app_rational:rational')
    except Exception as ex:
        LoggingClass.logging(message=f'rational_search: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_detail(request, rational_id=1):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
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
        return render(request, 'app_rational/detail.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_detail: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_create(request):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
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
        return render(request, 'app_rational/create.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_create: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ; (')


def rational_change(request, rational_id=None):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        if request.method == 'POST':
            form = RationalCreateForm(request.POST, request.FILES)
            if form.is_valid():
                _object = RationalModel.objects.get(id=rational_id)
                _object.rational_structure_from = request.POST['rational_structure_from']
                _object.rational_uid_registrated = request.POST['rational_uid_registrated']
                _object.rational_date_registrated = request.POST.get('rational_date_registrated')
                _object.rational_name = request.POST['rational_name']
                _object.rational_place_innovation = request.POST['rational_place_innovation']
                _object.rational_description = request.POST['rational_description']
                _object.rational_addition_file_1 = request.FILES.get('rational_addition_file_1')
                _object.rational_addition_file_2 = request.FILES.get('rational_addition_file_2')
                _object.rational_addition_file_3 = request.FILES.get('rational_addition_file_3')
                _object.rational_offering_members = request.POST['rational_offering_members']
                _object.rational_conclusion = request.POST['rational_conclusion']
                _object.rational_change_documentations = request.POST['rational_change_documentations']
                _object.rational_resolution = request.POST['rational_resolution']
                _object.rational_responsible_members = request.POST['rational_responsible_members']
                _object.rational_date_certification = request.POST.get('rational_date_certification')
                _object.rational_category = CategoryRationalModel.objects.get(id=request.POST.get('rational_category'))
                _object.rational_autor_name = User.objects.get(id=request.user.id)
                # rational_date_create            = request.POST.get('rational_date_create'),
                _object.rational_addition_image = request.FILES.get('rational_addition_image')
                # rational_status                 = request.POST['rational_status'],
                _object.save()
            return redirect('app_rational:rational')
        form = RationalCreateForm(request.POST, request.FILES)
        category = CategoryRationalModel.objects.order_by('-id')
        context = {
            'form': form,
            'category': category,
            'rational_id': rational_id,
        }
        return render(request, 'app_rational/change.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_change: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def rational_leave_comment(request, rational_id):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
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
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
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


def rational_ratings(request):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        rational = RationalModel.objects.order_by('-id')
        authors = []
        for query in rational:
            authors.append(query.rational_autor_name)
        user_count = {}
        for author in authors:
            user_count[author] = authors.count(author)
        user_counts = []
        for blog in user_count:
            rationals = RationalModel.objects.filter(rational_autor_name=blog)
            total_rating = 0
            for rating in rationals:
                total_like = LikeRationalModel.objects.filter(like_article=rating, like_status=True).count()
                total_dislike = LikeRationalModel.objects.filter(like_article=rating, like_status=False).count()
                total_rating += total_like - total_dislike
            user_counts.append({'user': blog, 'count': user_count[blog], 'rating': total_rating})
        sorted_by_rating = True
        if request.method == 'POST':
            if request.POST['sorted'] == 'rating':
                sorted_by_rating = True
            if request.POST['sorted'] == 'count':
                sorted_by_rating = False
        if sorted_by_rating:
            page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
        else:
            page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
        context = {
            'page': page,
            'sorted': sorted_by_rating
        }
        return render(request, 'app_rational/ratings.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'rational_change_rating: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')
