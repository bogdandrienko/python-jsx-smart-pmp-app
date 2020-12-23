from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'navbar/home.html')

def api_react(request):
    return render(request, 'react/api_react.html')

def react(request):
    return render(request, 'react/index.html')
