from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import BadHeaderError, send_mail
from .models import EmailModel


def email(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    mails = EmailModel.objects.order_by('-id')

    # Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(mails, 10)
    page = request.GET.get('page')
    try:
        page = paginator.page(page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    # конец пагинатора, объекты под ключом "'page': page"

    context = {
        'page': page
    }
    return render(request, 'app_email/email.html', context)

def send_email(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    if request.method == 'POST':
        subject     = request.POST.get('subject', '')
        message     = request.POST.get('message', '')
        to_email    = request.POST.get('to_email', '')
        if subject and message and to_email:
            try:
                send_mail(subject, message, 'eevee.cycle@yandex.ru', [to_email, ''], fail_silently=False)
                EmailModel.objects.create(
                    Email_subject       = subject,
                    Email_message       = message,
                    Email_email         = to_email
                )
            except BadHeaderError:
                return redirect('home')
    return redirect('app_email:email')
