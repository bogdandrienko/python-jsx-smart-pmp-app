from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse
from django.utils import timezone

from . import models


# Create your views here.


def index(request):
    return HttpResponse("<h1>This is a Index Page</h1>")


def home(request):
    context = {

    }
    return render(request, 'app_todo_list/pages/home.html', context)


def create(request):
    if request.method == 'POST':
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        models.Todo.objects.create(
            title=title,
            description=description,
            is_completed=False,
        )
        return redirect(reverse('app_name_todo_list:read_list', args=()))
    context = {
    }
    return render(request, 'app_todo_list/pages/todo_create.html', context)


def read(request, todo_id=None):
    todo = models.Todo.objects.get(id=todo_id)
    context = {
        "todo": todo
    }
    return render(request, 'app_todo_list/pages/todo_detail.html', context)


def read_list(request):
    is_detail_view = request.GET.get("is_detail_view", True)
    if is_detail_view == "False":
        is_detail_view = False
    elif is_detail_view == "True":
        is_detail_view = True
    todo_list = models.Todo.objects.all()

    def paginate(objects, num_page):
        paginator = Paginator(objects, num_page)
        pages = request.GET.get('page')
        try:
            page = paginator.page(pages)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        return page

    page = paginate(objects=todo_list, num_page=4)

    context = {
        # "todo_list": todo_list,
        "page": page,
        "is_detail_view": is_detail_view
    }
    return render(request, 'app_todo_list/pages/todo_list.html', context)


def update(request, todo_id=None):
    if request.method == 'POST':
        todo = models.Todo.objects.get(id=todo_id)
        is_completed = request.POST.get("is_completed", "")
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        if is_completed:
            if is_completed == "False":
                todo.is_completed = False
            elif is_completed == "True":
                todo.is_completed = True
        if title and title != todo.title:
            todo.title = title
        if description and description != todo.description:
            todo.description = description
        todo.updated = timezone.now()
        todo.save()
        return redirect(reverse('app_name_todo_list:read_list', args=()))
    todo = models.Todo.objects.get(id=todo_id)
    context = {
        "todo": todo
    }
    return render(request, 'app_todo_list/pages/todo_change.html', context)


def delete(request, todo_id=None):
    models.Todo.objects.get(id=todo_id).delete()
    return redirect(reverse('app_name_todo_list:read_list', args=()))
