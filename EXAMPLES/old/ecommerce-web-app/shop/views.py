from django.shortcuts import render
from django.http import HttpResponse
from .models import Shop as JSON

# Create your views here.

def home(request):
    return HttpResponse('<h1>HOME</h1>')

def shop(request):
    return HttpResponse('<h1>SHOP</h1>')

# def project_managment_sub_first(request):
#     Project_managment = JSON.objects
#     return render(request, 'project_managment/project_managment_sub_first.html', {'Project_managment': Project_managment})
