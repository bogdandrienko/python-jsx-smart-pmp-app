from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    return render(request, 'home.html')

def post(request):
    return render(request, 'post.html')

def get(request):
    user_text = request.GET['usertext']
    return render(request, 'get.html', {'user_text': user_text})