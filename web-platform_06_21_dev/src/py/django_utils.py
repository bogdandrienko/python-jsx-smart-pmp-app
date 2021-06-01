import time
from django.shortcuts import redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http.response import Http404, HttpResponseRedirect


class AutorizationClass:
    @staticmethod
    def user_authenticated(request):
        # Проверка регистрации: если пользователь не вошёл в аккаунт его переадресует в форму входа
        if request.user.is_authenticated is not True:
            return redirect('app_account:login')


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
