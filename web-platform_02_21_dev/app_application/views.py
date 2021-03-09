from django.shortcuts import render, redirect, get_object_or_404
from .models import ApplicationModel


def home(request):
    return render(request, 'components/home.html')

def application_list(request):
    application = ApplicationModel.objects.order_by('application_position')
    context = {
        'application': application,
    }
    return render(request, 'app_application/applications_list.html', context)

def applications_detail(request, application_slug=None):
    if request.user.is_authenticated is not True:
        return redirect('login')
    if application_slug != None:
        application = get_object_or_404(ApplicationModel, application_slug=application_slug)
    else:
        return redirect('app_application:application_list')
    context = {
        'LOOP': application,
    }
    return render(request, 'app_application/applications_detail.html', context)
