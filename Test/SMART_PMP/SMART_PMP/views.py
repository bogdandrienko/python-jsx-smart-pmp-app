from django.http import HttpResponse
from django.shortcuts import render

def about(request):
    return HttpResponse('This is about page')

def home(request):
    return render(request, 'home.html', {'greeting': 'Hello!'})

def post(request):
    return render(request, 'post.html', {'greeting': 'Hello!'})

def get(request):
    user_text = request.GET['usertext']
    return render(request, 'get.html', {'user_text': user_text})