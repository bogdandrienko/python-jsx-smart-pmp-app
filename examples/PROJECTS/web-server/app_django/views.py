from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'navbar/home.html')

def project_managment(request):
    return render(request, 'navbar/project_managment.html')

def project_one(request):
    # news = News.objects
    # return render(request, 'project_managment/project_one.html', {'news': news})
    return render(request, 'project_managment/project_one.html')

def project_all(request):
    # try:
    #     user_text = request.GET['usertext']
    # except:
    #     user_text = ''
    #     print('except in views(get)')
    # news = News.objects
    # return render(request, 'project_managment/project_all.html', {'user_text': user_text, 'news': news})
    return render(request, 'project_managment/project_all.html')
