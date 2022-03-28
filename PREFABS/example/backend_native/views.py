from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render, redirect
from django.urls import reverse

from backend_native.models import UserModel, IdeaModel, IdeaRatingModel, IdeaCommentModel


# Create your views here.


class PaginationClass:
    @staticmethod
    def paginate(request, objects, num_page):
        # Пагинатор: постраничный вывод объектов
        paginator = Paginator(objects, num_page)
        pages = request.GET.get('page')
        try:
            page = paginator.page(pages)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        return page


def idea_create(request):
    response = 0
    category = IdeaModel.get_all_category()
    if request.method == 'POST':
        author_foreign_key_field = UserModel.objects.get(user_foreign_key_field=request.user)
        name_char_field = request.POST.get("name_char_field")
        category_slug_field = request.POST.get("category_slug_field")
        short_description_char_field = request.POST.get("short_description_char_field")
        full_description_text_field = request.POST.get("full_description_text_field")
        avatar_image_field = request.FILES.get("avatar_image_field")
        addiction_file_field = request.FILES.get("addiction_file_field")
        IdeaModel.objects.create(
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
    idea = IdeaModel.objects.get(id=idea_int)
    users = UserModel.objects.all()
    categoryes = IdeaModel.get_all_category()
    if request.method == 'POST':
        author_foreign_key_field = UserModel.objects.get(id=request.POST.get("author_foreign_key_field_id"))
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


def idea_list(request, category_slug='All'):
    categoryes = IdeaModel.get_all_category()
    num_page = 5
    if category_slug == 'idea_change_visibility':
        ideas = IdeaModel.objects.filter(visibility_boolean_field=False)
    elif category_slug.lower() != 'all':
        ideas = IdeaModel.objects.filter(category_slug_field=category_slug, visibility_boolean_field=True)
    else:
        ideas = IdeaModel.objects.filter(visibility_boolean_field=True)
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
        data = IdeaModel.objects.get(id=idea_int)
        data.visibility_boolean_field = status

        data.save()
    return redirect(reverse('idea_list', args=()))


def idea_view(request, idea_int):
    idea = IdeaModel.objects.get(id=idea_int)
    comments = IdeaCommentModel.objects.filter(idea_foreign_key_field=idea)
    page = PaginationClass.paginate(request=request, objects=comments, num_page=5)
    response = 0
    context = {
        'response': response,
        'idea': idea,
        'page': page,
    }
    return render(request, 'idea/idea_view.html', context)


def idea_like(request, idea_int):
    idea = IdeaModel.objects.get(id=idea_int)
    author = UserModel.objects.get(user_foreign_key_field=request.user)
    if request.POST['status'] == 'like':
        try:
            IdeaRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            ).delete()
        except Exception as error:
            IdeaRatingModel.objects.create(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            )
        try:
            IdeaRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            ).delete()
        except Exception as error:
            pass
    else:
        try:
            IdeaRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            ).delete()
        except Exception as error:
            IdeaRatingModel.objects.create(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=False
            )
            IdeaCommentModel.objects.create(
                author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
                idea_foreign_key_field=IdeaModel.objects.get(id=idea_int),
                text_field=request.POST['text_field']
            )
        try:
            IdeaRatingModel.objects.get(
                author_foreign_key_field=author,
                idea_foreign_key_field=idea,
                status_boolean_field=True
            ).delete()
        except Exception as error:
            pass
    return redirect(reverse('idea_view', args=(idea_int,)))


def idea_comment(request, idea_int):
    if request.method == 'POST':
        IdeaCommentModel.objects.create(
            author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
            idea_foreign_key_field=IdeaModel.objects.get(id=idea_int),
            text_field=request.POST.get("text_field")
        )
    return redirect(reverse('idea_view', args=(idea_int,)))


def idea_rating(request):
    idea = IdeaModel.objects.order_by('-id')
    authors = []
    for query in idea:
        authors.append(query.author_foreign_key_field)
    authors_dict = {}
    for author in authors:
        authors_dict[author] = authors.count(author)
    user_counts = []
    for author in authors_dict:
        ideas = IdeaModel.objects.filter(author_foreign_key_field=author)
        total_rating = 0
        for idea in ideas:
            total_rating += idea.get_total_rating()
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
