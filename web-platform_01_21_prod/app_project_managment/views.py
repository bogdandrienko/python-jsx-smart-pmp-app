from django.shortcuts import render
from .models import Product as JSON

# Create your views here.

def project_managment(request):
    return render(request, 'navbar/project_managment.html')

def project_managment_sub_first(request):
    Project_managment = JSON.objects
    return render(request, 'project_managment/project_managment_sub_first.html', {'Project_managment': Project_managment})

def project_managment_sub_second(request):
    Project_managment = JSON.objects
    return render(request, 'project_managment/project_managment_sub_second.html', {'Project_managment': Project_managment})
