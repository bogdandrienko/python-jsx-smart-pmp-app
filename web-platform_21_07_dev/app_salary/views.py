from .json_data import data_s
from src.py.django_utils import AutorizationClass, PaginationClass, HttpRaiseExceptionClass, LoggingClass
from django.http.response import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from django.contrib.auth.models import User
import os
import io
import psycopg2 as pg
import datetime
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import get_template, render_to_string
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders


def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    result = finders.find(uri)
    if result:
        if not isinstance(result, (list, tuple)):
            result = [result]
        result = list(os.path.realpath(path) for path in result)
        path = result[0]
    else:
        sUrl = settings.STATIC_URL  # Typically /static/
        sRoot = settings.STATIC_ROOT  # Typically /home/userX/project_static/
        mUrl = settings.MEDIA_URL  # Typically /media/
        mRoot = settings.MEDIA_ROOT  # Typically /home/userX/project_static/media/

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception(
            'media URI must start with %s or %s' % (sUrl, mUrl)
        )
    return path


def view_pdf(request):
    data = None
    if request.method == 'POST':
        data = data_s(month=request.POST['transact_id'])
    context = {
        'data': data,
    }
    return render(request, 'app_salary/pdf.html', context)


def render_pdf_view(request):
    template_path = 'app_salary/pdf.html'
    data = data_s()
    # data = None
    context = {
        'data': data,
        'STATIC_ROOT': settings.STATIC_ROOT,
    }
    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
        html, dest=response, encoding='utf-8', link_callback=link_callback)
    # template = render_to_string(template_path, context)
    # pdf = pisa.pisaDocument(io.BytesIO(template.encode('UTF-8')), response,
    #                         encoding='utf-8',
    #                         link_callback=link_callback)
    # pdf = pisa.pisaDocument(io.StringIO(html), response, encoding='UTF-8')
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


def salary(request, request_id=0):
    if AutorizationClass.user_authenticated(request=request):
        return redirect(AutorizationClass.user_authenticated(request=request))
    try:
        data = None
        user = User.objects.get(id=request.user.id)
        if request.method == 'POST':
            # request_id = request.POST['transact_id']

            # Тут мы получаем json ответ от интерфейса 1С
            data = data_s(month=request.POST['transact_id'])
            # Тут мы получаем json ответ от интерфейса 1С
        context = {
            'user': user,
            'data': data,
        }
        return render(request, 'app_salary/main.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'salary: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')


def geo(request):
    try:
        data = None
        user = User.objects.get(id=request.user.id)
        if request.method == 'POST':
            connection = pg.connect(
                host="192.168.1.6",
                database="navSections",
                port="5432",
                user="postgres",
                password="nF2ArtXK"
            )
            postgreSQL_select_Query = "SELECT * FROM public.navdata_202108 " \
                                      "ORDER BY navtime DESC, device DESC LIMIT 100;"
            # "ORDER BY navtime DESC, device DESC LIMIT 100"
            # "ORDER BY device ASC, navtime DESC LIMIT 100"
            # "WHERE flags = 0 " \
            cursor = connection.cursor()
            cursor.execute(postgreSQL_select_Query)
            mobile_records = cursor.fetchall()
            cols = ["устройство", "дата и время", "широта", "долгота", "высота", "скорость", "ds", "направление",
                    "флаги ошибок"]
            all_arr = []
            for rows in mobile_records:
                arr = []
                for value in rows:
                    id_s = rows.index(value)
                    # print(f"{cols[id_s]}: {value}")
                    if id_s == 1:
                        arr.append(datetime.datetime.fromtimestamp(int(value - 21600)).strftime('%Y-%m-%d %H:%M:%S'))
                    else:
                        arr.append(value)
                all_arr.append(arr)
            data = [cols, all_arr]
        context = {
            'user': user,
            'data': data,
        }
        return render(request, 'app_salary/geo.html', context)
    except Exception as ex:
        LoggingClass.logging(message=f'geo: {ex}')
        HttpRaiseExceptionClass.http404_raise(exceptionText='Страница не найдена ;(')