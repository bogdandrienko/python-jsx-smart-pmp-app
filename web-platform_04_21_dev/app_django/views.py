from django.shortcuts import render
from django.contrib import admin


def admin(request):
    return render(request, admin.site.urls)

def home(request):
    return render(request, 'components/home.html')
