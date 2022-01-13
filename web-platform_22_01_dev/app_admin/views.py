from django.contrib import admin
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User, Group
from django.core.mail import send_mail
from django.shortcuts import render, redirect

import base64
import datetime
import hashlib
import json
import os
from email import message
import httplib2

from app_admin.forms import ExamplesModelForm
from app_admin.models import LoggingModel, ModulesModel, ActionModel, NotificationModel, UserModel, GroupModel
from app_admin.service import DjangoClass, UtilsClass, PaginationClass
from app_admin.utils import ExcelClass, EncryptingClass, DateTimeUtils


def example(request):
    """
    Страница с примерами разных frontend элементов
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='example')
    if page:
        return redirect(page)

    try:
        response = 0
        data = [
            ['Заголовок_1', 'Заголовок_2', 'Заголовок_3'],
            [
                ['Тело_1_1', 'Тело_1_2'],
                ['Тело_2_1', 'Тело_2_2'],
                ['Тело_3_1', 'Тело_3_2'],
            ]
        ]
        if request.method == 'POST':
            response = 1
        context = {
            'response': response,
            'data': data,
            'form_1': ExamplesModelForm,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
            'form_1': None,
        }

    return render(request, 'app_admin/example.html', context)


def examples_forms(request):
    """
    Страница с примерами разных frontend форм
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='examples_forms')
    if page:
        return redirect(page)

    try:
        response = 0
        data = None
        if request.method == 'POST':
            response = 1
            data = [
                ['Заголовок_1', 'Заголовок_2', 'Заголовок_3'],
                [
                    ['Тело_1_1', 'Тело_1_2'],
                    ['Тело_2_1', 'Тело_2_2'],
                    ['Тело_3_1', 'Тело_3_2'],
                ]
            ]
        context = {
            'response': response,
            'data': data,
            'form_1': ExamplesModelForm,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
            'form_1': ExamplesModelForm,
        }

    return render(request, 'app_admin/examples.html', context)


def local(request):
    """
    Перенаправляет пользователей внутренней сети (192.168.1.202) на локальный адрес - ускорение работы
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    return redirect('http://192.168.1.68:8000/')


def admin_(request):
    """
    Панель управления
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    return render(request, admin.site.urls)


def logging(request):
    """
    Страница показа логов системы
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='logging')
    if page:
        return redirect(page)

    try:
        response = 0
        data = None
        if request.method == 'POST':
            try:
                start = DjangoClass.RequestClass.get_check(request, 'checkbox_start')
                start_datetime = datetime.datetime.strptime(
                    DjangoClass.RequestClass.get_value(request, 'datetime_start', strip=False),
                    '%Y-%m-%dT%H:%M'
                ).replace(tzinfo=datetime.timezone.utc)
                end = DjangoClass.RequestClass.get_check(request, 'checkbox_end')
                end_datetime = datetime.datetime.strptime(
                    DjangoClass.RequestClass.get_value(request, 'datetime_end', strip=False),
                    '%Y-%m-%dT%H:%M'
                ).replace(tzinfo=datetime.timezone.utc)
                logs = LoggingModel.objects.all()
                if DjangoClass.RequestClass.get_value(request, 'username_slug_field'):
                    logs = logs.filter(username_slug_field=DjangoClass.RequestClass.get_value(
                        request, 'username_slug_field')
                    )
                if DjangoClass.RequestClass.get_value(request, 'ip_genericipaddress_field'):
                    logs = logs.filter(ip_genericipaddress_field=DjangoClass.RequestClass.get_value(
                        request, 'ip_genericipaddress_field')
                    )
                if DjangoClass.RequestClass.get_value(request, 'request_path_slug_field'):
                    logs = logs.filter(request_path_slug_field=DjangoClass.RequestClass.get_value(
                        request, 'request_path_slug_field')
                    )
                if DjangoClass.RequestClass.get_value(request, 'request_method_slug_field'):
                    logs = logs.filter(request_method_slug_field=DjangoClass.RequestClass.get_value(
                        request, 'request_method_slug_field')
                    )
                if DjangoClass.RequestClass.get_value(request, 'error_text_field'):
                    logs = logs.filter(error_text_field=DjangoClass.RequestClass.get_value(
                        request, 'error_text_field')
                    )
                titles = ['username_slug_field', 'ip_genericipaddress_field', 'request_path_slug_field',
                          'request_method_slug_field', 'error_text_field', 'datetime_field']
                body = []
                for log in logs:
                    if start and end and \
                            start_datetime <= (log.datetime_field + datetime.timedelta(hours=6)) <= end_datetime:
                        body.append(
                            [log.username_slug_field,
                             log.ip_genericipaddress_field,
                             log.request_path_slug_field,
                             log.request_method_slug_field,
                             log.error_text_field,
                             log.datetime_field]
                        )
                    elif start and end is False and \
                            start_datetime <= (log.datetime_field + datetime.timedelta(hours=6)):
                        body.append(
                            [log.username_slug_field,
                             log.ip_genericipaddress_field,
                             log.request_path_slug_field,
                             log.request_method_slug_field,
                             log.error_text_field,
                             log.datetime_field]
                        )
                    elif end and start is False and \
                            (log.datetime_field + datetime.timedelta(hours=6)) <= end_datetime:
                        body.append(
                            [log.username_slug_field,
                             log.ip_genericipaddress_field,
                             log.request_path_slug_field,
                             log.request_method_slug_field,
                             log.error_text_field,
                             log.datetime_field]
                        )
                    elif start is False and end is False:
                        body.append(
                            [log.username_slug_field,
                             log.ip_genericipaddress_field,
                             log.request_path_slug_field,
                             log.request_method_slug_field,
                             log.error_text_field,
                             log.datetime_field]
                        )
                data = [titles, body]
                workbook = ExcelClass.workbook_create()
                sheet = ExcelClass.workbook_activate(workbook)
                for title in titles:
                    ExcelClass.set_sheet_value(
                        col=titles.index(title) + 1,
                        row=1,
                        value=title,
                        sheet=sheet
                    )
                for row in body:
                    for value in row:
                        ExcelClass.set_sheet_value(
                            col=row.index(value) + 1,
                            row=body.index(row) + 2,
                            value=value,
                            sheet=sheet
                        )
                ExcelClass.workbook_save(workbook=workbook, excel_file='static/media/data/logging/logging.xlsx')
                response = 1
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                response = -1
        context = {
            'response': response,
            'data': data,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
        }

    return render(request, 'account/account_logging.html', context)


def home(request):
    """
    Домашняя страница
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    return render(request, 'app_admin/home.html')


def create_modules(request):
    """
    Страница для создания действий, групп и модулей веб-платформы
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='moderator')
    if page:
        return redirect(page)

    try:
        response = 0
        if request.method == 'POST':
            response = 1
            actions = DjangoClass.RequestClass.get_file(request, "excel_file_actions")
            groups = DjangoClass.RequestClass.get_file(request, "excel_file_groups")
            modules = DjangoClass.RequestClass.get_file(request, "excel_file_modules")
            if actions:
                workbook = ExcelClass.workbook_load(excel_file=actions)
                sheet = ExcelClass.workbook_activate(workbook=workbook)
                dictionary = {x[1]: x[0] for x in ActionModel.LIST_DB_VIEW_CHOICES}
                for row in range(2, ExcelClass.get_max_num_rows(sheet) + 1):
                    try:
                        action = ActionModel.objects.get_or_create(
                            name_slug_field=ExcelClass.get_sheet_value('C', row, sheet)
                        )[0]
                        action.type_slug_field = dictionary[str(ExcelClass.get_sheet_value('A', row, sheet)).strip()]
                        action.name_char_field = ExcelClass.get_sheet_value('B', row, sheet)
                        action.save()
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                ExcelClass.workbook_close(workbook=workbook)
            if groups:
                workbook = ExcelClass.workbook_load(excel_file=groups)
                sheet = ExcelClass.workbook_activate(workbook=workbook)
                for row in range(2, ExcelClass.get_max_num_rows(sheet) + 1):
                    try:
                        name_char_field = ExcelClass.get_sheet_value('A', row, sheet)
                        name_slug_field = ExcelClass.get_sheet_value('B', row, sheet)
                        action_many_to_many_field = ExcelClass.get_sheet_value('D', row, sheet)
                        user_many_to_many_field = ExcelClass.get_sheet_value('E', row, sheet)
                        position_float_field = ExcelClass.get_sheet_value('C', row, sheet)
                        if len(name_slug_field.strip()) <= 0:
                            continue
                        try:
                            position_float_field = int(position_float_field)
                        except Exception as error:
                            position_float_field = 1
                        group = Group.objects.get_or_create(name=name_slug_field.strip().lower())[0]
                        group_model = GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                        if group_model.name_char_field != name_char_field:
                            group_model.name_char_field = name_char_field
                        if group_model.name_slug_field != name_slug_field:
                            group_model.name_slug_field = name_slug_field
                        if group_model.position_float_field != position_float_field:
                            group_model.position_float_field = position_float_field
                        actions = [str(x).strip() for x in action_many_to_many_field.strip().split(',')]
                        for action in actions:
                            try:
                                group_model.action_many_to_many_field.add(
                                    ActionModel.objects.get(name_slug_field=action)
                                )
                            except Exception as error:
                                pass
                        users = [str(x).strip() for x in user_many_to_many_field.strip().split(',')]
                        for user in users:
                            try:
                                group_model.user_many_to_many_field.add(
                                    UserModel.objects.get(user_foreign_key_field=User.objects.get(username=user))
                                )
                            except Exception as error:
                                pass
                        group_model.save()
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                ExcelClass.workbook_close(workbook=workbook)
            if modules:
                workbook = ExcelClass.workbook_load(excel_file=modules)
                sheet = ExcelClass.workbook_activate(workbook=workbook)
                dictionary = {x[1]: x[0] for x in ModulesModel.LIST_DB_VIEW_CHOICES}
                for row in range(2, ExcelClass.get_max_num_rows(sheet) + 1):
                    try:
                        module = ModulesModel.objects.get_or_create(
                            next_path_slug_field=ExcelClass.get_sheet_value('E', row, sheet)
                        )[0]
                        module.type_slug_field = dictionary[str(ExcelClass.get_sheet_value('A', row, sheet)).strip()]
                        module.name_char_field = ExcelClass.get_sheet_value('B', row, sheet)
                        module.previous_path_slug_field = ExcelClass.get_sheet_value('C', row, sheet)
                        module.current_path_slug_field = ExcelClass.get_sheet_value('D', row, sheet)
                        module.position_float_field = ExcelClass.get_sheet_value('F', row, sheet)
                        module.text_field = ExcelClass.get_sheet_value('G', row, sheet)
                        module.save()
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                ExcelClass.workbook_close(workbook=workbook)

        context = {
            'response': response,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'modules': None,
        }

    return render(request, 'app_admin/create_modules.html', context)


def modules(request, url_slug='module_modules'):
    """
    Страница отображающая модули, секции или компоненты веб-платформы
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='user')
    if page:
        return redirect(page)

    try:
        modules = ModulesModel.objects.filter(current_path_slug_field=url_slug)
        response = 0
        context = {
            'response': response,
            'modules': modules,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'modules': None,
        }

    return render(request, 'app_admin/modules.html', context)


def account_login(request):
    """
    Страница логина пользователей
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    try:
        response = 0
        access_count = None
        if request.method == 'POST':
            try:
                now = (datetime.datetime.now() - datetime.timedelta(hours=1)).strftime('%Y-%m-%d %H:%M')
                access_count = 0
                for dat in LoggingModel.objects.filter(
                        username_slug_field=request.user.username,
                        ip_genericipaddress_field=request.META.get("REMOTE_ADDR"),
                        request_path_slug_field='/account_login/',
                        request_method_slug_field='POST',
                        error_text_field='successful'
                ):
                    if (dat.datetime_field + datetime.timedelta(hours=6)).strftime('%Y-%m-%d %H:%M') >= now:
                        access_count += 1
                user = authenticate(
                    username=DjangoClass.RequestClass.get_value(request, "username"),
                    password=DjangoClass.RequestClass.get_value(request, "password")
                )
                if user and access_count <= 10:
                    login(request, user)
                    response = 1
                else:
                    response = -1
            except Exception as error:
                response = -1
        context = {
            'response': response,
            'access_count': access_count,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'access_count': None,
        }

    return render(request, 'account/account_login.html', context)


def account_logout(request):
    """
    Ссылка на выход из аккаунта и перенаправление не страницу входа
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    try:
        logout(request)
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect('account_login')


def account_change_password(request):
    """
    Страница смены пароля пользователей
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    try:
        response = 0
        user = User.objects.get(username=request.user.username)
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
        if request.method == 'POST':
            try:
                # User password data
                password_1 = DjangoClass.RequestClass.get_value(request, "password_1")
                password_2 = DjangoClass.RequestClass.get_value(request, "password_2")
                email = DjangoClass.RequestClass.get_value(request, "email")
                secret_question = DjangoClass.RequestClass.get_value(request, "secret_question")
                secret_answer = DjangoClass.RequestClass.get_value(request, "secret_answer")
                if password_1 == password_2 and len(password_1) >= 8 and password_1 != user_model.password_slug_field:
                    user_model.password_slug_field = password_1
                    user.password = password_1
                    user.set_password(password_1)
                # Third data account
                if email and email != user_model.email_field:
                    user_model.email_field = email
                if secret_question and secret_question != user_model.secret_question_char_field:
                    user_model.secret_question_char_field = secret_question
                if secret_answer and secret_answer != user_model.secret_answer_char_field:
                    user_model.secret_answer_char_field = secret_answer
                user.save()
                user_model.save()
                response = 1
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                response = -1
        context = {
            'response': response,
            'user': user,
            'user_model': user_model,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'user': None,
            'user_model': None,
        }

    return render(request, 'account/account_change_password.html', context)


def account_change_profile(request):
    """
    Страница изменения профиля пользователя
    """
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_change_profile')
    if page:
        return redirect(page)

    try:
        response = 0
        user = User.objects.get(username=request.user.username)
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
        if request.method == 'POST':
            try:
                education = DjangoClass.RequestClass.get_value(request, "education")
                achievements = DjangoClass.RequestClass.get_value(request, "achievements")
                biography = DjangoClass.RequestClass.get_value(request, "biography")
                hobbies = DjangoClass.RequestClass.get_value(request, "hobbies")
                image_avatar = DjangoClass.RequestClass.get_file(request, "image_avatar")
                # Second data account
                if education and education != user_model.education_text_field:
                    user_model.education_text_field = education
                if achievements and achievements != user_model.achievements_text_field:
                    user_model.achievements_text_field = achievements
                if biography and biography != user_model.biography_text_field:
                    user_model.biography_text_field = biography
                if hobbies and hobbies != user_model.hobbies_text_field:
                    user_model.hobbies_text_field = hobbies
                if image_avatar and image_avatar != user_model.image_field:
                    user_model.image_field = image_avatar
                user.save()
                user_model.save()
                response = 1
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                response = -1
        context = {
            'response': response,
            'user': user,
            'user_model': user_model,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'user': None,
            'user_model': None,
        }

    return render(request, 'account/account_change_profile.html', context)


def account_recover_password(request, type_slug='iin'):
    """
    Страница восстановления пароля пользователей
    """

    # logging
    DjangoClass.LoggingClass.logging_actions(request=request)

    try:
        response = 0
        data = None
        user = None
        user_model = None
        access_count = None
        if request.method == 'POST':
            try:
                user = User.objects.get(username=DjangoClass.RequestClass.get_value(request, "username"))
                user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
            except Exception as error:
                pass
            if type_slug.lower() == 'iin':
                try:
                    if user:
                        response = 1
                    now = (datetime.datetime.now() - datetime.timedelta(hours=1)).strftime('%Y-%m-%d %H:%M')
                    access_count = 0
                    for dat in LoggingModel.objects.filter(
                            username_slug_field=request.user.username,
                            ip_genericipaddress_field=request.META.get("REMOTE_ADDR"),
                            request_path_slug_field='/account_login/',
                            request_method_slug_field='POST',
                            error_text_field='successful'
                    ):
                        if (dat.datetime_field + datetime.timedelta(hours=6)).strftime('%Y-%m-%d %H:%M') >= now:
                            access_count += 1
                    if access_count > 10:
                        response = -1
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            elif type_slug.lower() == 'secret_answer':
                try:
                    secret_answer = DjangoClass.RequestClass.get_value(request, "secret_answer")
                    password_1 = DjangoClass.RequestClass.get_value(request, "password_1")
                    password_2 = DjangoClass.RequestClass.get_value(request, "password_2")
                    if user.profile.secret_answer.lower() == secret_answer.lower() and password_1 == password_2:
                        user.profile.password = password_1
                        user.set_password(password_1)
                        user.save()
                        response = 2
                    else:
                        response = -2
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            elif type_slug.lower() == 'email':
                try:
                    password = user_model.password_slug_field
                    email_ = user_model.email_field
                    email__ = DjangoClass.RequestClass.get_value(request, "email")
                    if password and email_ and email_ == email__:
                        subject = 'Восстановление пароля от веб платформы'
                        encrypt_message = EncryptingClass.encrypt_text(
                            text=f'_{password}_{datetime.datetime.now().strftime("%Y-%m-%dT%H:%M")}_',
                            hash_chars=f'_{password}_{datetime.datetime.now().strftime("%Y-%m-%dT%H:%M")}_'
                        )
                        message_s = f'{user_model.first_name_char_field} {user_model.last_name_char_field}, ' \
                                    f'перейдите по ссылке: http://192.168.1.68:80/account_recover_password/ , ' \
                                    f'введите иин и затем в окне почты введите код (без кавычек): "{encrypt_message}"'
                        # from_email = 'eevee.cycle@yandex.ru'
                        from_email = 'webapp@km.kz'
                        to_email = email_
                        if subject and message and to_email:
                            send_mail(subject, message_s, from_email, [to_email, ''], fail_silently=False)
                            response = 2
                        else:
                            response = -2
                    else:
                        response = -2
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            elif type_slug.lower() == 'recover':
                try:
                    encrypt_text = DjangoClass.RequestClass.get_value(request, "recover")
                    decrypt_text = EncryptingClass.decrypt_text(
                        text=encrypt_text,
                        hash_chars=f'_{user_model.password_slug_field}_'
                                   f'{datetime.datetime.now().strftime("%Y-%m-%dT%H:%M")}_'
                    )
                    if decrypt_text.split('_')[2] >= \
                            (datetime.datetime.now() - datetime.timedelta(hours=1)).strftime('%Y-%m-%d %H:%M') and \
                            decrypt_text.split('_')[1] == user_model.password_slug_field:
                        login(request, user)
                        user_model.secret_question_char_field = ''
                        user_model.secret_answer_char_field = ''
                        user_model.save()
                        response = 2
                    else:
                        response = -2
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': response,
            'data': data,
            'access_count': access_count,
            'user': user,
            'user_model': user_model,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
            'access_count': None,
            'user': None,
            'user_model': None,
        }

    return render(request, 'account/account_recover_password.html', context)


def account_profile(request, user_id=0):
    """
    Страница профиля пользователя
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_profile')
    if page:
        return redirect(page)

    try:
        if user_id <= 0:
            user = request.user
        else:
            user = User.objects.get(id=user_id)
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
        response = 1
        context = {
            'response': response,
            'user': user,
            'user_model': user_model,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'user': None,
            'user_model': None,
        }

    return render(request, 'account/account_profile.html', context)


def account_notification(request, type_slug='All'):
    """
    Страница уведомлений пользователя
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_notification')
    if page:
        return redirect(page)

    try:
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=User.objects.get(id=request.user.id))[0]
        if type_slug.lower() != 'all':
            notifications = NotificationModel.objects.filter(
                user_foreign_key_field=user_model,
                type_slug_field=type_slug,
            ).order_by('status_boolean_field', '-created_datetime_field')
        else:
            notifications = NotificationModel.objects.filter(
                user_foreign_key_field=user_model,
            ).order_by('status_boolean_field', '-created_datetime_field')
        types = NotificationModel.get_all_types()
        try:
            page = PaginationClass.paginate(request=request, objects=notifications, num_page=100)
            response = 0
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            response = -1

        context = {
            'response': response,
            'page': page,
            'types': types,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'page': None,
            'types': None,
        }

    return render(request, 'account/account_notifications.html', context)


def account_create_notification(request):
    """
    Страница создания уведомления пользователя
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_create_notification')
    if page:
        return redirect(page)

    # try:
    if True:
        if request.method == 'POST':
            type_slug_field = DjangoClass.RequestClass.get_value(request, "type_slug_field")
            name_char_field = DjangoClass.RequestClass.get_value(request, "name_char_field")
            text_field = DjangoClass.RequestClass.get_value(request, "text_field")
            superusers = User.objects.filter(is_superuser=True)
            for superuser in superusers:
                user_model = UserModel.objects.get_or_create(user_foreign_key_field=superuser)[0]
                NotificationModel.objects.create(
                    user_foreign_key_field=user_model,
                    type_slug_field=type_slug_field,
                    name_char_field=name_char_field,
                    text_field=text_field
                )
    # except Exception as error:
    #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect('home')


def account_delete_or_change_notification(request, notification_id: int):
    """
    Страница создания уведомления пользователя
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_delete_or_change_notification')
    if page:
        return redirect(page)

    # try:
    if True:
        if request.method == 'POST':

            type_action = DjangoClass.RequestClass.get_value(request, "type_action")
            notification = NotificationModel.objects.get(id=notification_id)
            if type_action == 'change':
                status = DjangoClass.RequestClass.get_value(request, "hidden")
                if status == 'true':
                    status = True
                elif status == 'false':
                    status = False
                notification.status_boolean_field = status
                notification.decision_datetime_field = DateTimeUtils.get_current_datetime()
                notification.save()
            elif type_action == 'delete':
                notification.delete()
    # except Exception as error:
    #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect('account_notification')


def account_create_or_change_accounts(request):
    """
    Страница создания или изменения пользователей
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_create_or_change_accounts')
    if page:
        return redirect(page)

    try:
        response = 0
        if request.method == 'POST':
            excel_file = request.FILES.get('excel_file')
            if excel_file:
                try:
                    workbook = ExcelClass.workbook_load(excel_file=excel_file)
                    sheet = ExcelClass.workbook_activate(workbook=workbook)
                    for row in range(2, ExcelClass.get_max_num_rows(sheet) + 1):
                        try:
                            # authorization data
                            username = ExcelClass.get_sheet_value('J', row, sheet)
                            password = ExcelClass.get_sheet_value('K', row, sheet)
                            # technical data
                            is_active = ExcelClass.get_sheet_value('L', row, sheet)
                            if is_active.lower() == 'true':
                                is_active = True
                            else:
                                is_active = False
                            is_staff = ExcelClass.get_sheet_value('M', row, sheet)
                            if is_staff.lower() == 'true':
                                is_staff = True
                            else:
                                is_staff = False
                            is_superuser = ExcelClass.get_sheet_value('N', row, sheet)
                            if is_superuser.lower() == 'true':
                                is_superuser = True
                            else:
                                is_superuser = False
                            groups = ExcelClass.get_sheet_value('O', row, sheet)
                            email_ = ExcelClass.get_sheet_value('P', row, sheet)
                            secret_question = ExcelClass.get_sheet_value('Q', row, sheet)
                            secret_answer = ExcelClass.get_sheet_value('R', row, sheet)
                            # first data
                            last_name = ExcelClass.get_sheet_value('D', row, sheet)
                            first_name = ExcelClass.get_sheet_value('E', row, sheet)
                            patronymic = ExcelClass.get_sheet_value('F', row, sheet)
                            # second data
                            personnel_number = ExcelClass.get_sheet_value('G', row, sheet)
                            subdivision = ExcelClass.get_sheet_value('A', row, sheet)
                            workshop_service = ExcelClass.get_sheet_value('B', row, sheet)
                            department_site = ExcelClass.get_sheet_value('C', row, sheet)
                            position = ExcelClass.get_sheet_value('H', row, sheet)
                            category = ExcelClass.get_sheet_value('I', row, sheet)
                            # utils
                            force_change_account = DjangoClass.RequestClass.get_check(request, 'force_change_account')
                            force_change_password = DjangoClass.RequestClass.get_check(request, 'force_change_password')
                            force_clear_groups = DjangoClass.RequestClass.get_check(request, 'force_clear_groups')
                            if len(username) < 1:
                                continue
                            # Пользователь уже существует: изменение
                            try:
                                user = User.objects.get(username=username)
                                # Возврат, если пользователь обладает правами суперпользователя или его нельзя изменять
                                if user.is_superuser or force_change_account is False:
                                    continue
                                new_account = False
                            # Пользователь не существует: создание
                            except Exception as error:
                                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                user = User.objects.create(
                                    # authorization data
                                    username=username,
                                    password=DjangoClass.AccountClass.create_django_encrypt_password(password),
                                    # technical data
                                    is_active=True,
                                    is_staff=is_staff,
                                    is_superuser=is_superuser,
                                )
                                new_account = True
                            user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                            # authorization data
                            if new_account:
                                user_model.password_slug_field = password
                            else:
                                if force_change_password:
                                    user.password = DjangoClass.AccountClass.create_django_encrypt_password(
                                        password
                                    )
                                    user.save()
                                    user_model.password_slug_field = password
                            # technical data
                            user_model.activity_boolean_field = is_active
                            user_model.email_field = email_
                            user_model.secret_question_char_field = secret_question
                            user_model.secret_answer_char_field = secret_answer
                            # first data
                            user_model.last_name_char_field = last_name
                            user_model.first_name_char_field = first_name
                            user_model.patronymic_char_field = patronymic
                            # second data
                            user_model.personnel_number_slug_field = personnel_number
                            user_model.subdivision_char_field = subdivision
                            user_model.workshop_service_char_field = workshop_service
                            user_model.department_site_char_field = department_site
                            user_model.position_char_field = position
                            user_model.category_char_field = category
                            # save
                            user_model.save()
                            # update data
                            user_model = UserModel.objects.get_or_create(
                                user_foreign_key_field=User.objects.get(username=username)
                            )[0]
                            if force_clear_groups:
                                for group in GroupModel.objects.filter(user_many_to_many_field=user_model):
                                    group.user_many_to_many_field.remove(user_model)
                            response = 1
                            groups = [group.strip() for group in str(groups).lower().strip().split(',')]
                            for group in groups:
                                if len(group) > 0:
                                    group_object = Group.objects.get_or_create(name=group)[0]
                                    try:
                                        group_model = GroupModel.objects.get(
                                            group_foreign_key_field=group_object
                                        )
                                    except Exception as error:
                                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                        group_model = GroupModel.objects.create(
                                            group_foreign_key_field=group_object,
                                            name_char_field=group,
                                            name_slug_field=group,
                                        )
                                    group_model.user_many_to_many_field.add(user_model)
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                            response = -1
                    ExcelClass.workbook_close(workbook=workbook)
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                    response = -1
        context = {
            'response': response,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
        }

    return render(request, 'account/account_create_accounts.html', context)


def account_export_accounts(request):
    """
    Страница экспорта пользователей
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_export_accounts')
    if page:
        return redirect(page)

    try:
        response = 0
        data = None
        if request.method == 'POST':
            try:
                workbook = ExcelClass.workbook_create()
                sheet = ExcelClass.workbook_activate(workbook)
                user_objects = User.objects.all().order_by('-id')
                titles = ['Подразделение', 'Цех/Служба', 'Отдел/Участок', 'Фамилия', 'Имя', 'Отчество',
                          'Табельный номер', 'Должность', 'Категория работника', 'Имя пользователя',
                          'Пароль аккаунта', 'Активность аккаунта', 'Доступ к панели управления',
                          'Права суперпользователя', 'Группы доступа', 'Электронная почта', 'Секретный вопрос',
                          'Секретный ответ']
                for title in titles:
                    ExcelClass.set_sheet_value(
                        col=titles.index(title) + 1,
                        row=1,
                        value=title,
                        sheet=sheet
                    )
                index = 1
                body = []
                response = 1
                for user_object in user_objects:
                    try:
                        if User.objects.get(username=user_object.username).is_superuser:
                            continue
                        index += 1
                        sub_body = []
                        # authorization data
                        username = user_object.username
                        user_model = UserModel.objects.get_or_create(user_foreign_key_field=user_object)[0]
                        ExcelClass.set_sheet_value('J', index, username, sheet)

                        password = user_model.password_slug_field
                        ExcelClass.set_sheet_value('K', index, password, sheet)

                        # technical data
                        is_active = user_model.activity_boolean_field
                        if is_active:
                            is_active = 'true'
                        else:
                            is_active = 'false'
                        ExcelClass.set_sheet_value('L', index, is_active, sheet)

                        is_staff = user_object.is_staff
                        if is_staff:
                            is_staff = 'true'
                        else:
                            is_staff = 'false'
                        ExcelClass.set_sheet_value('M', index, is_staff, sheet)

                        is_superuser = user_object.is_superuser
                        if is_superuser:
                            is_superuser = 'true'
                        else:
                            is_superuser = 'false'
                        ExcelClass.set_sheet_value('N', index, is_superuser, sheet)

                        group_string = ''
                        groups = GroupModel.objects.filter(user_many_to_many_field=user_model)
                        if groups:
                            for group in groups:
                                group_string += f", {group}"
                            groups = group_string[2:]
                        else:
                            groups = ''
                        ExcelClass.set_sheet_value('P', index, groups, sheet)

                        _email = user_model.email_field
                        ExcelClass.set_sheet_value('O', index, _email, sheet)

                        secret_question = user_model.secret_question_char_field
                        ExcelClass.set_sheet_value('Q', index, secret_question, sheet)

                        secret_answer = user_model.secret_answer_char_field
                        ExcelClass.set_sheet_value('R', index, secret_answer, sheet)

                        # first data
                        last_name = user_model.last_name_char_field
                        ExcelClass.set_sheet_value('D', index, last_name, sheet)

                        first_name = user_model.first_name_char_field
                        ExcelClass.set_sheet_value('E', index, first_name, sheet)

                        patronymic = user_model.patronymic_char_field
                        ExcelClass.set_sheet_value('F', index, patronymic, sheet)
                        # second data

                        personnel_number = user_model.personnel_number_slug_field
                        ExcelClass.set_sheet_value('G', index, personnel_number, sheet)

                        subdivision = user_model.subdivision_char_field
                        ExcelClass.set_sheet_value('A', index, subdivision, sheet)

                        workshop_service = user_model.workshop_service_char_field
                        ExcelClass.set_sheet_value('B', index, workshop_service, sheet)

                        department_site = user_model.department_site_char_field
                        ExcelClass.set_sheet_value('C', index, department_site, sheet)

                        position = user_model.position_char_field
                        ExcelClass.set_sheet_value('H', index, position, sheet)

                        category = user_model.category_char_field
                        ExcelClass.set_sheet_value('I', index, category, sheet)

                        sub_body.append(subdivision)
                        sub_body.append(workshop_service)
                        sub_body.append(department_site)
                        sub_body.append(last_name)
                        sub_body.append(first_name)
                        sub_body.append(patronymic)
                        sub_body.append(personnel_number)
                        sub_body.append(position)
                        sub_body.append(category)
                        sub_body.append(username)
                        sub_body.append(password)
                        sub_body.append(is_active)
                        sub_body.append(is_staff)
                        sub_body.append(is_superuser)
                        sub_body.append(groups)
                        sub_body.append(_email)
                        sub_body.append(secret_question)
                        sub_body.append(secret_answer)
                        body.append(sub_body)
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                        response = -1
                    data = [titles, body]
                ExcelClass.workbook_save(workbook=workbook, excel_file='static/media/admin/account/export_users.xlsx')
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                response = -1
        context = {
            'response': response,
            'data': data,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
        }

    return render(request, 'account/account_export_accounts.html', context)


def account_generate_passwords(request):
    """
    Страница генерации паролей для аккаунтов пользователей
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_generate_passwords')
    if page:
        return redirect(page)

    try:
        response = 0
        data = None
        if request.method == 'POST':
            try:
                passwords_chars = DjangoClass.RequestClass.get_value(request, "passwords_chars")
                passwords_quantity = DjangoClass.RequestClass.get_value(request, "passwords_quantity")
                passwords_length = DjangoClass.RequestClass.get_value(request, "passwords_length")
                workbook = ExcelClass.workbook_create()
                sheet = ExcelClass.workbook_activate(workbook=workbook)
                titles = ['Пароль']
                for title in titles:
                    ExcelClass.set_sheet_value(
                        col=titles.index(title) + 1,
                        row=1,
                        value=title,
                        sheet=sheet
                    )
                body = []
                for n in range(2, int(passwords_quantity) + 2):
                    password = DjangoClass.AccountClass.create_password_from_chars(
                        chars=passwords_chars,
                        length=int(passwords_length)
                    )
                    sheet[f'A{n}'] = password
                    body.append([password])
                ExcelClass.workbook_save(
                    workbook=workbook, excel_file='static/media/admin/account/generate_passwords.xlsx'
                )
                ExcelClass.workbook_close(workbook=workbook)
                data = [titles, body]
                response = 1
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                response = -1
        context = {
            'response': response,
            'data': data,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'data': None,
        }

    return render(request, 'account/account_generate_passwords.html', context)


def account_update_accounts_1c(request):
    """
    Страница обновления аккаунтов пользователей из системы 1С
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_update_accounts_1c')
    if page:
        return redirect(page)

    # try:
    if True:
        response = 0
        data = None
        if request.method == 'POST':
            # try:
            if True:
                key = UtilsClass.create_encrypted_password(
                    _random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                    _length=10
                )
                hash_key_obj = hashlib.sha256()
                hash_key_obj.update(key.encode('utf-8'))
                key_hash = str(hash_key_obj.hexdigest().strip().upper())
                key_hash_base64 = base64.b64encode(str(key_hash).encode()).decode()
                date = datetime.datetime.now().strftime("%Y%m%d")
                date_base64 = base64.b64encode(str(date).encode()).decode()
                url = f'http://192.168.1.10/KM_1C/hs/iden/change/{date_base64}_{key_hash_base64}'
                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
                h = httplib2.Http(relative_path + "\\static\\media\\data\\temp\\get_users")
                _login = 'Web_adm_1c'
                password = '159159qqww!'
                h.add_credentials(_login, password)
                try:
                    response_, content = h.request(url)
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                    content = None
                json_data = None
                success_web_read = False
                if content:
                    success = True
                    error_word_list = ['Ошибка', 'ошибка',
                                       'Error', 'error', 'Failed', 'failed']
                    for error_word in error_word_list:
                        if str(content.decode()).find(error_word) >= 0:
                            success = False
                    if success:
                        json_data = json.loads(UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash))
                        with open("static/media/admin/account/accounts.json", "w", encoding="utf-8") as file:
                            json.dump(UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash), file)
                        success_web_read = True
                if success_web_read is False:
                    print('read temp file')
                    with open("static/media/admin/account/accounts_temp.json", "r", encoding="utf-8") as file:
                        json_data = json.load(file)
                # Генерация объектов для создания аккаунтов
                titles_1c = ['Период', 'Статус', 'ИИН', 'Фамилия', 'Имя', 'Отчество', 'ТабельныйНомер', 'Подразделение',
                             'Цех_Служба', 'Отдел_Участок', 'Должность', 'Категория']
                for user in json_data["global_objects"]:
                    try:
                        # authorization data
                        username = json_data["global_objects"][user]["ИИН"]
                        password = DjangoClass.AccountClass.create_password_from_chars(length=8)
                        # technical data
                        if json_data["global_objects"][user]["Статус"] == 'created' or \
                                json_data["global_objects"][user]["Статус"] == 'changed':
                            is_active = True
                        else:
                            is_active = False
                        # first data
                        last_name = json_data["global_objects"][user]["Фамилия"]
                        first_name = json_data["global_objects"][user]["Имя"]
                        patronymic = json_data["global_objects"][user]["Отчество"]
                        # second data
                        personnel_number = json_data["global_objects"][user]["ТабельныйНомер"]
                        subdivision = json_data["global_objects"][user]["Подразделение"]
                        workshop_service = json_data["global_objects"][user]["Цех_Служба"]
                        department_site = json_data["global_objects"][user]["Отдел_Участок"]
                        position = json_data["global_objects"][user]["Должность"]
                        category = json_data["global_objects"][user]["Категория"]
                        # Пользователь уже существует: изменение
                        try:
                            user = User.objects.get(username=username)
                            new_account = False
                        # Пользователь не существует: создание
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                            user = User.objects.create(
                                # authorization data
                                username=username,
                                password=DjangoClass.AccountClass.create_django_encrypt_password(password=password),
                                # technical data
                                is_active=True,
                                is_staff=False,
                                is_superuser=False,
                            )
                            new_account = True
                        user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                        # authorization data
                        if new_account:
                            user_model.password_slug_field = password
                        # technical data
                        user_model.activity_boolean_field = is_active
                        if new_account:
                            user_model.email_field = ''
                            user_model.secret_question_char_field = ''
                            user_model.secret_answer_char_field = ''
                        # first data
                        user_model.last_name_char_field = last_name
                        user_model.first_name_char_field = first_name
                        user_model.patronymic_char_field = patronymic
                        # second data
                        user_model.personnel_number_slug_field = personnel_number
                        user_model.subdivision_char_field = subdivision
                        user_model.workshop_service_char_field = workshop_service
                        user_model.department_site_char_field = department_site
                        user_model.position_char_field = position
                        user_model.category_char_field = category
                        # save
                        user_model.save()
                        # update data
                        user_model = UserModel.objects.get_or_create(
                            user_foreign_key_field=User.objects.get(username=username)
                        )[0]
                        groups = ['user']
                        for group in groups:
                            if len(group) > 0:
                                group_object = Group.objects.get_or_create(name=group)[0]
                                try:
                                    group_model = GroupModel.objects.get(
                                        group_foreign_key_field=group_object
                                    )
                                except Exception as error:
                                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                    group_model = GroupModel.objects.create(
                                        group_foreign_key_field=group_object,
                                        name_char_field=group,
                                        name_slug_field=group,
                                    )
                                group_model.user_many_to_many_field.add(user_model)
                        response = 1
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                        response = -1

                # Генерация ответа для отрисовки в таблицу на странице
                titles = ['Период', 'Статус', 'ИИН', 'Фамилия', 'Имя', 'Отчество', 'Табельный', 'Подразделение',
                          'Цех/Служба', 'Отдел/Участок', 'Должность', 'Категория']
                bodies = []
                for user in json_data["global_objects"]:
                    user_object = []
                    for key in titles_1c:
                        value = str(json_data["global_objects"][user][key]).strip()
                        user_object.append(value)
                    bodies.append(user_object)
                data = [titles, bodies]
            # except Exception as error:
            #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': response,
            'data': data,
        }
    # except Exception as error:
    #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    #     context = {
    #         'response': -1,
    #         'data': None,
    #     }

    return render(request, 'account/account_update_accounts_1c.html', context)


def account_change_groups(request):
    """
    Страница создания пользователей
    """

    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='account_change_groups')
    if page:
        return redirect(page)

    # try:
    if True:
        response = 0
        if request.method == 'POST':
            type_select = DjangoClass.RequestClass.get_value(request, 'type_select')

            group_name_char_field = DjangoClass.RequestClass.get_value(request, 'group_name_char_field')
            group_name_slug_field = DjangoClass.RequestClass.get_value(request, 'group_name_slug_field')
            action_name_char_field = DjangoClass.RequestClass.get_value(request, 'action_name_char_field')
            action_name_slug_field = DjangoClass.RequestClass.get_value(request, 'action_name_slug_field')

            group = DjangoClass.RequestClass.get_value(request, 'group')
            action = DjangoClass.RequestClass.get_value(request, 'action')
            username = DjangoClass.RequestClass.get_value(request, 'username')
            if group_name_char_field and group_name_slug_field and action_name_char_field and action_name_slug_field:
                action_model = ActionModel.objects.get_or_create(
                    name_char_field=action_name_char_field,
                    name_slug_field=action_name_slug_field,
                )[0]
                group = Group.objects.get_or_create(name=group_name_slug_field)[0]
                group_model = GroupModel.objects.get_or_create(
                    group_foreign_key_field=group,
                    name_slug_field=group_name_slug_field,
                )[0]
                if type_select == 'add':
                    group_model.action_many_to_many_field.add(action_model)
                elif type_select == 'remove':
                    group_model.action_many_to_many_field.remove(action_model)
                group_model.save()
            elif action:
                group = Group.objects.get_or_create(name=group)[0]
                group_model = GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                action_model = ActionModel.objects.get_or_create(name_slug_field=action)[0]
                if type_select == 'add':
                    group_model.action_many_to_many_field.add(action_model)
                elif type_select == 'remove':
                    group_model.action_many_to_many_field.remove(action_model)
                group_model.save()
            elif username:
                group = Group.objects.get_or_create(name=group)[0]
                group_model = GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                user_model = UserModel.objects.get_or_create(
                    user_foreign_key_field=User.objects.get_or_create(username=username)[0]
                )[0]
                if type_select == 'add':
                    group_model.user_many_to_many_field.add(user_model)
                elif type_select == 'remove':
                    group_model.user_many_to_many_field.remove(user_model)
                group_model.save()
            response = 1
        actions = ActionModel.objects.all()
        groups = GroupModel.objects.all()
        users = UserModel.objects.all()
        context = {
            'response': response,
            'actions': actions,
            'groups': groups,
            'users': users,
        }
    # except Exception as error:
    #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    #     context = {
    #         'response': -1,
    #         'actions': None,
    #         'groups': None,
    #         'users': None,
    #     }

    return render(request, 'account/account_change_groups.html', context)
