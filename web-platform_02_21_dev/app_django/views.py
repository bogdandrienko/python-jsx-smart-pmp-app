from django.shortcuts import render
from django.contrib import admin

# Create your views here.


def admin(request):
    return render(request, admin.site.urls)