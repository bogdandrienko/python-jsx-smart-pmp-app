import time
import random
from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http.response import Http404, HttpResponseRedirect
from django.contrib.auth.models import User

class AutorizationClass:
    @staticmethod
    def user_authenticated(request):
        # Проверка регистрации: если пользователь не вошёл в аккаунт его переадресует в форму входа
        if request.user.is_authenticated is not True:
            return 'app_account:login'
        return None


class PaginationClass:
    @staticmethod
    def paginate(request, objects, numPage):
        # Пагинатор: постраничный вывод объектов
        paginator = Paginator(objects, numPage)
        pages = request.GET.get('page')
        try:
            page = paginator.page(pages)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        return page


class HttpRaiseExceptionClass:
    @staticmethod
    def http404_raise(exceptionText):
        raise Http404(exceptionText)


class LoggingClass:
    @staticmethod
    def logging(message, file_name='log.txt', type_write='a'):
        print(f'{TimeUtils.get_current_time()} : {message}\n')
        with open(file_name, type_write) as log:
            log.write(f'{TimeUtils.get_current_time()} : {message}\n')


class TimeUtils:
    @staticmethod
    def get_current_time():
        return f"{time.strftime('%X')}"


def create_account(_login, _not_encrypted_password, _email, _name, _surname, _is_staff):
    try:
        user = User.objects.create(
            username=_login,
            password=_not_encrypted_password,
            email=_email,
            first_name=_name,
            last_name=_surname,
            is_staff=_is_staff,
        )
        user.save()
        user.set_password = str(create_encrypted_password(_not_encrypted_password=_not_encrypted_password))
    except Exception as ex:
        print(ex)


def create_encrypted_password(_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', _length=8):
    password = ''
    for i in range(1, _length + 1):
        password += random.choice(_random_chars)
    return password
