# import base64
# import datetime
# import hashlib
# import json
# import os
# import random
# from django.conf import settings
from django.contrib import admin
from django.shortcuts import render, redirect, get_object_or_404
# from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.models import User, Group
# from django.core.mail import BadHeaderError, send_mail
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from django.http import HttpResponse
# from django.http.response import Http404, HttpResponseRedirect
# from django.template.loader import get_template
# from django.urls import reverse
# from .service import DjangoClass, PaginationClass, SalaryClass, Xhtml2pdfClass, GeoClass, CareerClass, UtilsClass
# from .forms import ExampleForm, RationalForm, NotificationForm, MessageForm, DocumentForm, ContactForm, CityForm, \
#     ArticleForm, SmsForm, GeoForm, BankIdeasForm
# from .utils import ExcelClass, SQLClass, EncryptingClass

# Create your views here.


# admin
# from admin_app.service import DjangoClass


def admin_(request):
    """
    Панель управления
    """

    return render(request, admin.site.urls)


# home
def home(request):
    """
    Домашняя страница
    """

    return render(request, 'components/base.html')
