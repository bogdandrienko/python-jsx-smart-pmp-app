from django.shortcuts import render, redirect, get_object_or_404
from .models import ApplicationModuleModel, ApplicationComponentModel


def list_module(request):
    module = ApplicationModuleModel.objects.order_by('module_position')
    context = {
        'module': module,
    }
    return render(request, 'app_application/list_module.html', context)

def list_component(request, module_slug=None):     
    if module_slug != None:
        module = ApplicationModuleModel.objects.get(module_slug=module_slug)
        component = ApplicationComponentModel.objects.filter(component_Foreign=module).order_by('component_position')
    else:
        return redirect('app_application:list_module')
    context = {
        'component': component,
    }
    return render(request, 'app_application/list_component.html', context)
