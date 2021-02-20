from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'components/home.html')


def custom(request):
    return render(request, 'components/custom.html')
