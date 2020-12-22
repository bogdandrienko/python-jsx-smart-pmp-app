from django.shortcuts import render

# Create your views here.

def project_managment(request):
    return render(request, 'navbar/project_managment.html')

def project_managment_sub_first(request):
    return render(request, 'project_managment/project_managment_sub_first.html')

def project_managment_sub_second(request):
    return render(request, 'project_managment/project_managment_sub_second.html')
