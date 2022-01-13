from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import NotificationModel
from .forms import NotificationCreateForm
from django.contrib.auth.models import User


def notification(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа
    form= NotificationCreateForm(request.POST, request.FILES)
    pages = NotificationModel.objects.order_by('-id')
    # Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(pages, 10)
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
    return render(request, 'app_notification/notification.html', context)

def create(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа
    if request.method == 'POST':
        NotificationModel.objects.create(
        notification_name           = request.POST['notification_name'],
        notification_slug           = request.POST['notification_slug'],
        notification_description    = request.POST['notification_description'],
        notification_author         = User.objects.get(id=request.user.id),
        )
    return redirect('app_notification:notification')

def accept(request, notify_id):
    try:
        rational = NotificationModel.objects.get(id=notify_id)
    except:
        pass
    rational.notification_status = True
    rational.save()
    return redirect('app_notification:notification')

def decline(request, notify_id):
    try:
        rational = NotificationModel.objects.get(id=notify_id)
    except:
        pass
    rational.notification_status = False
    rational.save()
    return redirect('app_notification:notification')
