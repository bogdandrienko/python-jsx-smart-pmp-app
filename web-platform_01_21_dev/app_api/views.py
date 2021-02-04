from django.shortcuts import render

# Create your views here.


def api_react(request):
    return render(request, 'react/api_react.html')