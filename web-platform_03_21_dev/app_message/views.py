from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import MessageModel
from .forms import MessageCreateForm

# Create your views here.


def message(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    if request.method == 'POST':
        MessageModel.objects.create(
        message_name                = request.POST['message_name'],
        message_slug                = request.POST['message_slug'],
        message_description         = request.POST.get('message_description'),
        )
        return redirect('app_message:message')
        
    form= MessageCreateForm(request.POST, request.FILES)
    message = MessageModel.objects.order_by('-id')

    # Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(message, 3)
    page = request.GET.get('page')
    try:
        page = paginator.page(page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    # конец пагинатора, объекты под ключом "'page': page"

    context = {
        'page': page,
        'form': form,
    }
    return render(request, 'app_message/message.html', context)
