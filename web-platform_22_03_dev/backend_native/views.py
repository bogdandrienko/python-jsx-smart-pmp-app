from django.shortcuts import render
from django.http import HttpResponse
from backend import service as backend_service, models as backend_models


# Create your views here.

def home(request):
    return HttpResponse("<h1>This is a Home Page</h1>")


def idea(request, category_slug='All'):
    ideas = backend_models.IdeaModel.objects.all()
    num_page = 5
    page = backend_service.DjangoClass.PaginationClass.paginate(request=request, objects=ideas, num_page=num_page)
    context = {
        "username": "Bogdan",
        'page': page
    }
    return render(request, 'idea/idea_list.html', context)


def about(request):
    context = {"username": "Bogdan"}
    return render(request, 'about.html', context)
