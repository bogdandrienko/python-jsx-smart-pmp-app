from django.shortcuts import render
from django.contrib import admin
from .models import Product as JSON


# Create your views here.


def admin(request):
    return render(request, admin.site.urls)


def home(request):
    return render(request, 'home.html')


def custom(request):
    return render(request, 'components/custom.html')


def project_managment(request):
    return render(request, 'project_managment.html')


def project_managment_sub_first(request):
    Project_managment = JSON.objects
    return render(request, 'project_managment_sub_first.html', {'Project_managment': Project_managment})


def project_managment_sub_second(request):
    Project_managment = JSON.objects
    return render(request, 'project_managment_sub_second.html', {'Project_managment': Project_managment})
