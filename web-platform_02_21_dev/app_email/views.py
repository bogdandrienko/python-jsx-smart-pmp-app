from app_django.settings import HEROKU
from django.conf import settings
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
                if not HEROKU:
                # Включить для DEVELOPMENT, отключить для PRODUCTION
                    send_mail(subject, message, 'bogdandrienko@gmail.com', [to_email,''])

                EmailModel.objects.create(
                    Email_subject       = request.POST['subject'],
                    Email_message       = request.POST['message'],
                    Email_email         = request.POST['to_email'],
                )
                
            except BadHeaderError:
                return redirect('home')
    return redirect('email')
