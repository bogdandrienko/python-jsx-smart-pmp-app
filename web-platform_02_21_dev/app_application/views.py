from django.shortcuts import render, redirect, get_object_or_404
from .models import ApplicationModuleModel, ApplicationComponentModel


def list_module(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    module = ApplicationModuleModel.objects.order_by('module_position')
    context = {
        'module': module,
    }
    return render(request, 'app_application/list_module.html', context)

def list_component(request, module_slug=None):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа
     
    if module_slug != None:
        module = ApplicationModuleModel.objects.get(module_slug=module_slug)
        component = ApplicationComponentModel.objects.filter(component_Foreign=module).order_by('component_position')
    else:
        return redirect('app_application:list_module')
    context = {
        'component': component,
    }
    return render(request, 'app_application/list_component.html', context)
