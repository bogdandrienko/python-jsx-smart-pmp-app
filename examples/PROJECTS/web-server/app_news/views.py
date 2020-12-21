from django.shortcuts import render

# Create your views here.

def personal_sub_first(request):
    return render(request, 'personal/personal_sub_first.html')

def personal_sub_second(request):
    return render(request, 'personal/personal_sub_second.html')
