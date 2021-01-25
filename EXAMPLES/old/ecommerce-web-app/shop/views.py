from django.shortcuts import render
from .models import Shop as JSON

# Create your views here.

def home(request):
    Shop = JSON.objects
    return render(request, 'home.html', {'Shop': Shop})

def shop(request):
    return render(request, 'shop.html')

def about(request):
    return render(request, 'about.html')

# def project_managment(request):
#     return render(request, 'navbar/project_managment.html')

# def project_managment_sub_first(request):
#     Project_managment = JSON.objects
#     return render(request, 'project_managment/project_managment_sub_first.html', {'Project_managment': Project_managment})
