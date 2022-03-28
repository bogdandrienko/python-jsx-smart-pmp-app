from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def home(request):
    return HttpResponse("<h1>This is a Home Page</h1>")


def about(request):
    context = {"username": "Bogdan"}
    return render(request, 'about.html', context)
