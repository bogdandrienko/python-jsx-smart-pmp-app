from app_taskmanager.forms import TaskForm
from django.shortcuts import redirect, render
from .models import TaskModel as JSON


# Create your views here.


def view(request):
    tasks = JSON.objects.all
    return render(request, 'view.html', {'tasks': tasks})


def create(request):
    tasks = JSON.objects.order_by('-id')
    error = ''
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('create')
        else:
            error = 'Форма была неверной'
    form = TaskForm()
    context = {
        'form': form,
        'error': error,
        'tasks': tasks
    }
    return render(request, 'create.html', context)

