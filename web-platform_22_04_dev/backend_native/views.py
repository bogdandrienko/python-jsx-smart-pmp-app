from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse

from backend import service as backend_service, models as backend_models

# Create your views here.
from backend.models import UserModel
from backend_native.models import IdeaTestModel, IdeaTestCommentModel, IdeaTestRatingModel


def home(request):
    return HttpResponse("<h1>This is a Home Page</h1>")


def about(request):
    context = {"username": "Bogdan"}
    return render(request, 'about.html', context)


def idea_create(request):
    response = 0
    category = IdeaTestModel.get_all_category()
    if request.method == 'POST':
        author_foreign_key_field = UserModel.objects.get(user_foreign_key_field=request.user)
        name_char_field = request.POST.get("name_char_field")
        category_slug_field = request.POST.get("category_slug_field")
        short_description_char_field = request.POST.get("short_description_char_field")
        full_description_text_field = request.POST.get("full_description_text_field")
        avatar_image_field = request.FILES.get("avatar_image_field")
        addiction_file_field = request.FILES.get("addiction_file_field")
        IdeaTestModel.objects.create(
            author_foreign_key_field=author_foreign_key_field,
            name_char_field=name_char_field,
            category_slug_field=category_slug_field,
            short_description_char_field=short_description_char_field,
            full_description_text_field=full_description_text_field,
            avatar_image_field=avatar_image_field,
            addiction_file_field=addiction_file_field,
            visibility_boolean_field=False,
        )

        response = 1
    context = {
        'response': response,
        'category': category,
    }
    return render(request, 'idea/idea_create.html', context)


def idea_change(request, idea_int):
    response = 0
    idea = IdeaTestModel.objects.get(id=idea_int)
    users = UserModel.objects.all()
    categoryes = IdeaTestModel.get_all_category()
    if request.method == 'POST':
        author_foreign_key_field_id = request.POST.get("author_foreign_key_field_id")
        author_foreign_key_field = UserModel.objects.get(id=author_foreign_key_field_id)
        name_char_field = request.POST.get("name_char_field")
        category_slug_field = request.POST.get("category_slug_field")
        short_description_char_field = request.POST.get("short_description_char_field")
        full_description_text_field = request.POST.get("full_description_text_field")
        avatar_image_field = request.FILES.get("avatar_image_field")
        addiction_file_field = request.FILES.get("addiction_file_field")

        if author_foreign_key_field and author_foreign_key_field != idea.author_foreign_key_field:
            idea.author_foreign_key_field = author_foreign_key_field
        if name_char_field and name_char_field != idea.name_char_field:
            idea.name_char_field = name_char_field
        if category_slug_field and category_slug_field != idea.category_slug_field:
            idea.category_slug_field = category_slug_field
        if short_description_char_field and short_description_char_field != idea.short_description_char_field:
            idea.short_description_char_field = short_description_char_field
        if full_description_text_field and full_description_text_field != idea.full_description_text_field:
            idea.full_description_text_field = full_description_text_field
        if avatar_image_field and avatar_image_field != idea.avatar_image_field:
            idea.avatar_image_field = avatar_image_field
        if addiction_file_field and addiction_file_field != idea.addiction_file_field:
            idea.addiction_file_field = addiction_file_field

        idea.save()
        response = 1
    context = {
        'response': response,
        'idea': idea,
        'users': users,
        'categoryes': categoryes,
    }
    return render(request, 'idea/idea_change.html', context)


class PaginationClass:
    @staticmethod
    def paginate(request, objects, num_page):
        paginator = Paginator(objects, num_page)
        pages = request.GET.get('page')
        try:
            page = paginator.page(pages)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        return page


def idea_list(request, category_slug='All'):
    categoryes = IdeaTestModel.get_all_category()
    num_page = 5
    if category_slug == 'idea_change_visibility':
        ideas = IdeaTestModel.objects.filter(visibility_boolean_field=False)
    elif category_slug.lower() != 'all':
        ideas = IdeaTestModel.objects.filter(category_slug_field=category_slug, visibility_boolean_field=True)
    else:
        ideas = IdeaTestModel.objects.filter(visibility_boolean_field=True)
    if request.method == 'POST':
        search_char_field = request.POST.get("search_char_field")
        if search_char_field:
            ideas = ideas.filter(name_char_field__icontains=search_char_field)
        num_page = 100
    page = PaginationClass.paginate(request=request, objects=ideas, num_page=num_page)
    response = 0
    context = {
        'response': response,
        'page': page,
        'categoryes': categoryes,
    }
    return render(request, 'idea/idea_list.html', context)


def idea_change_visibility(request, idea_int):
    if request.method == 'POST':
        status = request.POST.get("hidden")
        if status == 'true':
            status = True
        elif status == 'false':
            status = False
        data = IdeaTestModel.objects.get(id=idea_int)
        data.visibility_boolean_field = status

        data.save()
    return redirect(reverse('backend_native:django_idea_list', args=()))


def idea_view(request, idea_int):
    idea = IdeaTestModel.objects.get(id=idea_int)
    comments = IdeaTestCommentModel.objects.filter(idea_foreign_key_field=idea)
    page = PaginationClass.paginate(request=request, objects=comments, num_page=5)
    response = 0
    context = {
        'response': response,
        'idea': idea,
        'page': page,
    }
    return render(request, 'idea/idea_view.html', context)


def idea_like(request, idea_int):
    idea = IdeaTestModel.objects.get(id=idea_int)
    author = UserModel.objects.get(user_foreign_key_field=request.user)
    if request.POST['status'] == 'like':
        try:
            IdeaTestRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            ).delete()
        except Exception as error:
            IdeaTestRatingModel.objects.create(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            )
        try:
            IdeaTestRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            ).delete()
        except Exception as error:
            pass
    else:
        try:
            IdeaTestRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            ).delete()
        except Exception as error:
            IdeaTestRatingModel.objects.create(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            )
            IdeaTestCommentModel.objects.create(
                author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
                idea_foreign_key_field=IdeaTestModel.objects.get(id=idea_int),
                text_field=request.POST['text_field']
            )
        try:
            IdeaTestRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            ).delete()
        except Exception as error:
            pass
    return redirect(reverse('backend_native:django_idea_view', args=(idea_int,)))


def idea_comment(request, idea_int):
    if request.method == 'POST':
        IdeaTestCommentModel.objects.create(
            author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
            idea_foreign_key_field=IdeaTestModel.objects.get(id=idea_int),
            text_field=request.POST.get("text_field")
        )
    return redirect(reverse('backend_native:django_idea_view', args=(idea_int,)))


def idea_rating(request):
    idea = IdeaTestModel.objects.order_by('-id')
    authors = []
    for query in idea:
        authors.append(query.author_foreign_key_field)
    authors_dict = {}
    for author in authors:
        authors_dict[author] = authors.count(author)
    user_counts = []
    for author in authors_dict:
        ideas = IdeaTestModel.objects.filter(author_foreign_key_field=author)
        total_rating = 0
        for idea in ideas:
            total_rating += idea.get_ratings()
        user_counts.append(
            {'author': author, 'count': ideas.count(), 'rating': total_rating}
        )
    sorted_by_rating = True
    if request.method == 'POST':
        if request.POST['sorted'] == 'idea':
            sorted_by_rating = True
        if request.POST['sorted'] == 'count':
            sorted_by_rating = False
    if sorted_by_rating:
        page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
    else:
        page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
    page = PaginationClass.paginate(request=request, objects=page, num_page=5)
    response = 0
    context = {
        'response': response,
        'page': page,
        'sorted': sorted_by_rating
    }
    return render(request, 'idea/idea_rating.html', context)
