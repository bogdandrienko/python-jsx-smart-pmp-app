from .json_data import data_s
from src.py.django_utils import AutorizationClass, PaginationClass, HttpRaiseExceptionClass, LoggingClass
from django.http.response import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User


def salary(request, request_id=0):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        data = None
        user = User.objects.get(id=request.user.id)
        if request.method == 'POST':
            request_id = request.POST['transact_id']

            # Тут мы получаем json ответ от интерфейса 1С
            data = data_s()
            # Тут мы получаем json ответ от интерфейса 1С

        context = {
            'user': user,
            'data': data,
        }
        return render(request, 'app_salary/main.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'salary: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')
