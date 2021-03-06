from django.shortcuts import render, redirect
from django.core.mail import BadHeaderError, send_mail
from .models import EmailModel


def email(request):
    if request.user.is_authenticated is not True:
        return redirect('login')
    mails = EmailModel.objects.order_by('-id')
    context = {
        'mails': mails
    }
    return render(request, 'app_email/list.html', context)

def send_email(request):
    if request.user.is_authenticated is not True:
        return redirect('login')
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
    return redirect('email')
