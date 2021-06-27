from django.shortcuts import render

# Create your views here.


def react(request):
    return render(request, 'app_react/index.html')
