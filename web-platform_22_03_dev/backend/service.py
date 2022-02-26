import base64
import datetime
import hashlib
import json
import math
import os
import random
import threading
import time
import httplib2
import pandas
import pyodbc
import openpyxl
from openpyxl.utils import get_column_letter
from fastkml import kml
from typing import Union

from django.conf import settings
from django.contrib.auth.models import User, Group
from django.contrib.staticfiles import finders
from django.core.handlers.wsgi import WSGIRequest
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.utils import timezone

from backend import models as backend_models


class DjangoClass:
    class AuthorizationClass:
        @staticmethod
        def try_to_access(request, access: str):
            DjangoClass.LoggingClass.logging_actions(request=request)
            if str(request.META.get("REMOTE_ADDR")) == '192.168.1.202':
                return 'django_local'
            if access == 'only_logging':
                return False
            if request.user.is_authenticated:
                try:
                    user = User.objects.get(username=request.user.username)
                    user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                    if user.is_superuser:
                        return False
                    if user_model.activity_boolean_field is False:
                        return 'django_account_logout'
                    else:
                        if user_model.email_field and user_model.secret_question_char_field and \
                                user_model.secret_answer_char_field:
                            try:
                                action_model = backend_models.ActionModel.objects.get(name_slug_field=access)
                                if action_model:
                                    groups = backend_models.GroupModel.objects.filter(
                                        user_many_to_many_field=user_model,
                                        action_many_to_many_field=action_model,
                                    )
                                    if groups:
                                        return False
                                    else:
                                        return 'django_home'
                            except Exception as error:
                                print(error)
                                return 'django_home'
                        else:
                            return 'django_account_change_password'
                except Exception as error:
                    print(error)
                    return 'django_home'
            else:
                return 'django_account_login'

    class LoggingClass:
        @staticmethod
        def logging_errors(request, error):
            # for k, v in request.META.items():
            #     print(f'\n{k}: {v}')
            username = request.user.username
            ip = request.META.get("REMOTE_ADDR")
            request_path = request.path
            request_method = request.method
            datetime_now = datetime.datetime.now()
            backend_models.LoggingModel.objects.create(
                username_slug_field=username,
                ip_genericipaddress_field=ip,
                request_path_slug_field=request_path,
                request_method_slug_field=request_method,
                error_text_field=f'error: {error}'
            )
            text = [username, ip, request_path, request_method, datetime_now, error]
            string = ''
            for val in text:
                string = string + f', {val}'
            with open('static/media/admin/logging/logging_errors.txt', 'a') as log:
                log.write(f'\n{string[2:]}\n')

        @staticmethod
        def logging_errors_local(error, function_error):
            datetime_now = datetime.datetime.now()
            backend_models.LoggingModel.objects.create(username='', ip='', request_path=function_error,
                                                       request_method='', error=error)
            text = [function_error, datetime_now, error]
            string = ''
            for val in text:
                string = string + f', {val}'
            with open('static/media/admin/logging/logging_errors.txt', 'a') as log:
                log.write(f'\n{string[2:]}\n')

        @staticmethod
        def logging_actions(request):
            # for k, v in request.META.items():
            #     print(f'\n{k}: {v}')
            username = request.user.username
            ip = request.META.get("REMOTE_ADDR")
            request_path = request.path
            request_method = request.method
            datetime_now = datetime.datetime.now()
            backend_models.LoggingModel.objects.create(
                username_slug_field=username,
                ip_genericipaddress_field=ip,
                request_path_slug_field=request_path,
                request_method_slug_field=request_method,
                error_text_field='successful'
            )
            text = [username, ip, request_path, request_method, datetime_now]
            string = ''
            for val in text:
                string = string + f', {val}'
            with open('static/media/admin/logging/logging_actions.txt', 'a') as log:
                log.write(f'\n{string[2:]}\n')

    class AccountClass:
        @staticmethod
        def create_django_encrypt_password(password: str):
            try:
                user = User.objects.get_or_create(username='sha256')[0]
                user.set_password(password)
                encrypt_password = user.password
                backend_models.UserModel.objects.get(user_foreign_key_field=user).delete()
                user.delete()
                return encrypt_password
            except Exception as error:
                DjangoClass.LoggingClass.logging_errors_local(error=error, function_error='get_sha256_password')
                return False

        @staticmethod
        def create_password_from_chars(chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                                       length=8, need_temp=False):
            password = ''
            for i in range(1, length + 1):
                password += random.choice(chars)
            if need_temp:
                return 'temp_' + password
            else:
                return password

    class RequestClass:
        @staticmethod
        def get_value(request: WSGIRequest, key: str, none_is_error=False, strip=True):
            if none_is_error:
                # If key not have is Exception Error
                value = request.POST[key]
            else:
                # If key not have value is None
                value = request.POST.get(key)
            if strip and value:
                value.strip()
            return value

        @staticmethod
        def get_check(request: WSGIRequest, key: str, none_is_error=False):
            if none_is_error:
                # If key not have is Exception Error
                value = request.POST[key]
            else:
                # If key not have value is None
                value = request.POST.get(key)
            if value is None:
                return False
            else:
                return True

        @staticmethod
        def get_file(request: WSGIRequest, key: str, none_is_error=False):
            if none_is_error:
                # If key not have is Exception Error
                file = request.FILES[key]
            else:
                # If key not have value is None
                file = request.FILES.get(key)
            return file

    class DRFClass:
        @staticmethod
        def request_utils(request):
            try:
                request_method = str(request.method).upper()
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                request_method = None

            try:
                request_action_type = str(request.data["Action-type"]).upper()
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                request_action_type = None

            try:
                request_user = User.objects.get(username=str(request.user.username))
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                request_user = None

            try:
                request_body = request.data["body"]
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                request_body = None

            return [request_method, request_action_type, request_user, request_body]

    class SchedulerClass:
        @staticmethod
        def update_users():
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
            response_, content = h.request(url)
            json_data = json.loads(
                UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash)
            )

            class Worker:
                def __init__(self, date_time_: str, status_: str, username_: str, last_name_: str, first_name_: str,
                             patronymic_: str, personnel_number_: str, subdivision_: str, workshop_service_: str,
                             department_site_: str, position_: str, category_: str):
                    self.date_time_ = date_time_
                    self.status_ = status_
                    self.username_ = username_
                    self.last_name_ = last_name_
                    self.first_name_ = first_name_
                    self.patronymic_ = patronymic_
                    self.personnel_number_ = personnel_number_
                    self.subdivision_ = subdivision_
                    self.workshop_service_ = workshop_service_
                    self.department_site_ = department_site_
                    self.position_ = position_
                    self.category_ = category_

                @staticmethod
                def get_value(dict_: dict, user_, key_: str):
                    try:
                        value = dict_["global_objects"][user_][key_]
                        return value
                    except Exception as error__:
                        print(error__)
                        return ''

            for user in json_data["global_objects"]:
                worker = Worker(
                    date_time_=Worker.get_value(dict_=json_data, user_=user, key_="Период"),
                    status_=Worker.get_value(dict_=json_data, user_=user, key_="Статус"),
                    username_=Worker.get_value(dict_=json_data, user_=user, key_="ИИН"),
                    last_name_=Worker.get_value(dict_=json_data, user_=user, key_="Фамилия"),
                    first_name_=Worker.get_value(dict_=json_data, user_=user, key_="Имя"),
                    patronymic_=Worker.get_value(dict_=json_data, user_=user, key_="Отчество"),
                    personnel_number_=Worker.get_value(dict_=json_data, user_=user, key_="ТабельныйНомер"),
                    subdivision_=Worker.get_value(dict_=json_data, user_=user, key_="Подразделение"),
                    workshop_service_=Worker.get_value(dict_=json_data, user_=user, key_="Цех_Служба"),
                    department_site_=Worker.get_value(dict_=json_data, user_=user, key_="Отдел_Участок"),
                    position_=Worker.get_value(dict_=json_data, user_=user, key_="Должность"),
                    category_=Worker.get_value(dict_=json_data, user_=user, key_="Категория")
                )
                print(worker.username_)
                try:
                    user = User.objects.get(username=worker.username_)
                    user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                except Exception as error_:
                    print(error_)
                    user = User.objects.create(username=worker.username_)
                    password = DjangoClass.AccountClass.create_password_from_chars(
                        length=6, need_temp=True
                    )
                    user.set_password(password)
                    user.save()
                    user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                    user_model.password_slug_field = password
                    user_model.temp_password_boolean_field = True
                    user_model.save()

                try:
                    if user_model.last_name_char_field != worker.last_name_:
                        user_model.last_name_char_field = worker.last_name_
                    if user_model.first_name_char_field != worker.first_name_:
                        user_model.first_name_char_field = worker.first_name_
                    if user_model.patronymic_char_field != worker.patronymic_:
                        user_model.patronymic_char_field = worker.patronymic_
                    if user_model.personnel_number_slug_field != worker.personnel_number_:
                        user_model.personnel_number_slug_field = worker.personnel_number_
                    if user_model.subdivision_char_field != worker.subdivision_:
                        user_model.subdivision_char_field = worker.subdivision_
                    if user_model.workshop_service_char_field != worker.workshop_service_:
                        user_model.workshop_service_char_field = worker.workshop_service_
                    if user_model.department_site_char_field != worker.department_site_:
                        user_model.department_site_char_field = worker.department_site_
                    if user_model.position_char_field != worker.position_:
                        user_model.position_char_field = worker.position_
                    if user_model.category_char_field != worker.category_:
                        user_model.category_char_field = worker.category_
                    user_model.save()
                except Exception as error_:
                    print(error_)

                try:
                    if worker.status_ == 'created':
                        user_model.activity_boolean_field = True
                        user_model.save()
                    elif worker.status_ == 'changed':
                        pass
                    elif worker.status_ == 'disabled':
                        user_model.activity_boolean_field = False
                        user_model.save()
                    else:
                        print('unknown status')
                except Exception as error_:
                    print(error_)
            return json_data

        @staticmethod
        def scheduler(request):

            # create default groups
            ############################################################################################################
            try:
                groups = ["user", "moderator", "superuser"]
                for grp in groups:
                    try:
                        Group.objects.get(name=grp)
                    except Exception as error:
                        group = Group.objects.create(name=grp)
                        group_model = backend_models.GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                        group_model.name_char_field = grp
                        group_model.name_slug_field = grp
                        action_model = backend_models.ActionModel.objects.get_or_create(name_slug_field=grp)[0]
                        group_model.action_many_to_many_field.add(action_model)
                        group_model.save()
            except Exception as error__:
                print(error__)
            ############################################################################################################

            # create superuser 'Web_adm_1c'
            ############################################################################################################
            username_ = 'Web_adm_1c'
            password_ = '159159qqww!'
            try:
                user = User.objects.get(username=username_)
            except Exception as error__:
                print(error__)
                user = User.objects.create(username=username_)
                user.set_password(password_)
                user.is_superuser = True
                user.save()
                user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                user_model.password_slug_field = password_
                user_model.save()
            ############################################################################################################

            # api/update_users/
            ############################################################################################################
            try:
                now = (datetime.datetime.now()).strftime('%Y-%m-%d %H:%M')
                update = True
                for dat in backend_models.LoggingModel.objects.filter(
                        request_path_slug_field='/api/update_users/'
                ):
                    if (dat.datetime_field + datetime.timedelta(hours=24)).strftime('%Y-%m-%d %H:%M') >= now:
                        update = False
                        break
                if update:
                    request.path = '/api/update_users/'
                    DjangoClass.LoggingClass.logging_actions(request=request)
                    threading.Thread(target=DjangoClass.SchedulerClass.update_users, args=(request,)).start()
            except Exception as error:
                print(error)
            ############################################################################################################

            return True

        @staticmethod
        def start_scheduler(request):
            threading.Thread(target=DjangoClass.SchedulerClass.scheduler, args=(request,)).start()


class PaginationClass:
    @staticmethod
    def paginate(request, objects, num_page):
        # Пагинатор: постраничный вывод объектов
        paginator = Paginator(objects, num_page)
        pages = request.GET.get('page')
        try:
            page = paginator.page(pages)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        return page


class EncryptingClass:
    @staticmethod
    def encrypt_text(text: str, hash_chars: str):
        chars = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' + ' _-:' + hash_chars
        chars = set(chars)
        forward_ord_list = []
        for char in chars:
            forward_ord_list.append(ord(char))
        forward_ord_list.sort(reverse=False)
        reverse_ord_list = forward_ord_list.copy()
        reverse_ord_list.sort(reverse=True)
        forward_dictinary = {reverse_ord_list[forward_ord_list.index(x)]: x for x in forward_ord_list}
        return ''.join([chr(forward_dictinary[ord(x)]) for x in text])

    @staticmethod
    def decrypt_text(text: str, hash_chars: str):
        chars = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' + ' _-:' + hash_chars
        chars = set(chars)
        forward_ord_list = []
        for char in chars:
            forward_ord_list.append(ord(char))
        forward_ord_list.sort(reverse=False)
        reverse_ord_list = forward_ord_list.copy()
        reverse_ord_list.sort(reverse=True)
        reverse_dictinary = {forward_ord_list[reverse_ord_list.index(x)]: x for x in reverse_ord_list}
        return ''.join([chr(reverse_dictinary[ord(x)]) for x in text])

    class Example:
        @staticmethod
        def example_encrypt_text():
            value = EncryptingClass.encrypt_text(text='12345', hash_chars='321')
            print(value)

        @staticmethod
        def example_decrypt_text():
            value = EncryptingClass.decrypt_text(text='wvuts', hash_chars='321')
            print(value)


class SQLClass:

    @staticmethod
    def example_cv():
        class SQLClass:
            @staticmethod
            def sql_post_data(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                              rows: list, values: list):
                try:
                    sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                                  password=password)
                    SQLClass.execute_data_query(connection=sql, table=table, rows=rows, values=values)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'a') as log:
                        log.write(f'\n{ex}\n')

            @staticmethod
            def sql_post_now(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                             rows: list, values: list):
                try:
                    sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                                  password=password)
                    SQLClass.execute_now_query(connection=sql, table=table, rows=rows, values=values)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'a') as log:
                        log.write(f'\n{ex}\n')

            @staticmethod
            def pyodbc_connect(ip: str, server: str, port: str, database: str, username: str, password: str):
                conn_str = (
                        r'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:' + ip + '\\' + server + ',' + port +
                        ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password + ';'
                )
                return pyodbc.connect(conn_str)

            @staticmethod
            def pd_read_sql_query(connection, query: str, database: str, table: str):
                return pandas.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

            @staticmethod
            def execute_data_query(connection, table: str, rows: list, values: list):
                cursor = connection.cursor()
                cursor.fast_executemany = True
                _rows = ''
                for x in rows:
                    _rows = f"{_rows}{str(x)}, "
                value = f"INSERT INTO {table} (" + _rows[:-2:] + f") VALUES {tuple(values)}"
                cursor.execute(value)
                connection.commit()

            @staticmethod
            def execute_now_query(connection, table, rows: list, values: list):
                cursor = connection.cursor()
                cursor.fast_executemany = True
                __rows = ''
                for x in rows:
                    __rows = f"{__rows}{str(x)}, "
                value = f"UPDATE {table} SET {rows[1]} = '{values[1]}',{rows[2]} = '{values[2]}' ,{rows[3]} = '{values[3]}' " \
                        f"WHERE {rows[0]} = '{values[0]}'"
                cursor.execute(value)
                connection.commit()

    @staticmethod
    def sql_post_data(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                      rows: list, values: list):
        try:
            sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                          password=password)
            SQLClass.execute_data_query(connection=sql, table=table, rows=rows, values=values)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    @staticmethod
    def sql_post_now(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                     rows: list, values: list):
        try:
            sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                          password=password)
            SQLClass.execute_now_query(connection=sql, table=table, rows=rows, values=values)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    @staticmethod
    def pyodbc_connect(ip: str, server: str, port: str, database: str, username: str, password: str):
        conn_str = (
                r'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:' + ip + '\\' + server + ',' + port +
                ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password + ';'
        )
        return pyodbc.connect(conn_str)

    @staticmethod
    def pd_read_sql_query(connection, query: str, database: str, table: str):
        return pandas.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

    @staticmethod
    def execute_data_query(connection, table: str, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        _rows = ''
        for x in rows:
            _rows = f"{_rows}{str(x)}, "
        value = f"INSERT INTO {table} (" + _rows[:-2:] + f") VALUES {tuple(values)}"
        cursor.execute(value)
        connection.commit()

    @staticmethod
    def execute_now_query(connection, table, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        __rows = ''
        for x in rows:
            __rows = f"{__rows}{str(x)}, "
        value = f"UPDATE {table} SET {rows[1]} = '{values[1]}',{rows[2]} = '{values[2]}' ,{rows[3]} = '{values[3]}' " \
                f"WHERE {rows[0]} = '{values[0]}'"
        cursor.execute(value)
        connection.commit()

    # class SQLclass:
    #     def __init__(self, server, database, username, password, table):
    #         self.server = server
    #         self.database = database
    #         self.username = username
    #         self.password = password
    #         self.table = table
    #         self.cursor = self.pyodbc_connect(server=server, database=database, username=username,
    #                                           password=password).cursor()
    #
    #     @staticmethod
    #     def pyodbc_connect(server, database, username, password):
    #         return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' +
    #                               database + ';UID=' + username + ';PWD=' + password +
    #                               ';Trusted_Connection=yes;')
    #
    #     @staticmethod
    #     def pd_read_sql_query(query: str, database: str, table: str, connection):
    #         return pd.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)
    #
    #     @staticmethod
    #     def execute_query(connection, table, rows: list, values: list):
    #         cursor = connection.cursor()
    #         cursor.fast_executemany = True
    #         __rows = ''
    #         for x in rows:
    #             __rows = f"{__rows}{str(x)}, "
    #         value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
    #         # value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
    #         # value = f"INSERT INTO {table} (id_row, device_row, percent_row, time_row, data_row, extra_row)
    #         # VALUES {tuple(values)}"
    #         cursor.execute(value)
    #         connection.commit()

    # # Server variables
    # _server = 'WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER'
    # _database = 'ruda_db'
    # _username = 'ruda_user'
    # _password = 'ruda_user'
    # _table = 'ruda_table'
    #
    # _date = f'{str(datetime.datetime.now()).split(" ")[0]}'
    # _time = f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}'
    #
    # _rows = ['id_row', 'device_row', 'percent_row', 'time_row', 'data_row', 'extra_row']
    # _values = ['id_row', 'device_row', 'percent_row', f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}',
    #            f'{str(datetime.datetime.now()).split(" ")[0]}', 'extra_row']

    # Read SQL data with Class
    # sql = SQLclass.pyodbc_connect(server=_server, database=_database, username=_username,
    #                               password=_password, table=_table)
    # data = SQLclass.pd_read_sql_query(query='SELECT * FROM', database=_database, table=_table, connection=sql)
    # print(data)
    # print(type(data))
    # for row in data:
    #     print(row)

    # # Read SQL data native
    # connection_native = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + _server + ';DATABASE=' +
    #                                    _database + ';UID=' + _username + ';PWD=' + _password +
    #                                    ';Trusted_Connection=yes;')
    # sql_query_read = pd.read_sql_query(f'SELECT * FROM {_database}.dbo.{_table}', connection_native)
    # print(sql_query_read)
    # print(type(sql_query_read))
    # for row in sql_query_read:
    #     print(row)
    # print(type(row))

    # Write SQL data with Class
    # sql = SQLclass.pyodbc_connect(server=_server, database=_database, username=_username, password=_password)
    # SQLclass.execute_query(connection=sql, table=_table, rows=_rows, values=_values)

    # # Write SQL data native
    # connection_native = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + _server + ';DATABASE=' +
    #                                    _database + ';UID=' + _username + ';PWD=' + _password +
    #                                    ';Trusted_Connection=yes;')
    # cursor = connection_native.cursor()
    # cursor.fast_executemany = True
    # count = cursor.execute(f"""INSERT INTO {_table} (id_row, device_row, percent_row, time_row, data_row, extra_row)
    # VALUES (id_row, device_row, percent_row, '{_time}', '{_date}', extra_row)""").rowcount
    # connection_native.commit()

    def example(self):
        # sql_select_query = f"SELECT * " \
        #                    f"FROM dbtable " \
        #                    f"WHERE CAST(temperature AS FLOAT) >= {temp} AND personid = '6176' OR personid = '25314' OR personid = '931777' OR personid = '5863' " \
        #                    f"ORDER BY date1 DESC, date2 DESC;"
        # sql_select_query = f"SELECT * " \
        #                    f"FROM dbtable " \
        #                    f"WHERE CAST(temperature AS FLOAT) < 37.0 AND date1 BETWEEN '2021-07-25' AND '2021-08-25' " \
        #                    f"ORDER BY date1 DESC, date2 DESC;"
        connect_db = self.pyodbc_connect()
        cursor = connect_db.cursor()
        cursor.fast_executemany = True
        # cursor.execute(sql_select_query)
        data = cursor.fetchall()


class DirPathFolderPathClass:
    @staticmethod
    def create_folder_in_this_dir(folder_name='new_folder', current_path=os.path.dirname(os.path.abspath('__file__'))):
        full_path = current_path + f'\\{folder_name}'
        try:
            os.makedirs(full_path)
        except Exception as error:
            # print(f'directory already yet | {error}')
            pass
        finally:
            return full_path

    @staticmethod
    def get_all_files_in_path(path=os.path.dirname(os.path.abspath('__file__'))):
        files_list = []
        for root, dirs, files in os.walk(path, topdown=True):
            for name in files:
                files_list.append(f"{os.path.join(root, name)}")
        return files_list

    @staticmethod
    def get_all_dirs_in_path(path=os.path.dirname(os.path.abspath('__file__'))):
        directories_list = []
        for root, dirs, files in os.walk(path, topdown=True):
            for name in dirs:
                directories_list.append(f"{os.path.join(root, name)}")
        return directories_list

    class Example:
        @staticmethod
        def example_create_folder_in_this_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder')
            print(path)

        @staticmethod
        def example_create_folder_in_folder_in_this_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder\\new')
            print(path)

        @staticmethod
        def example_create_folder_in_external_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder\\new', current_path='C:\\')
            print(path)

        @staticmethod
        def example_get_all_files_in_path():
            files_list = DirPathFolderPathClass.get_all_files_in_path(
                path=r'C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_12_21_dev\app_admin'
            )
            for file in files_list:
                print(file)

        @staticmethod
        def example_get_all_folders_in_path():
            path_list = DirPathFolderPathClass.get_all_dirs_in_path(
                path=r'C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_12_21_dev\app_admin'
            )
            for path in path_list:
                print(path)


class SalaryClass:
    @staticmethod
    def create_arr_table(title: str, footer: str, json_obj, exclude: list):
        headers = []

        json_obj = dict(json_obj).copy()

        for x in json_obj["Fields"]:
            headers.append(json_obj["Fields"][x])
        del json_obj["Fields"]
        bodies = [["", title]]

        if exclude:
            hours = 0
            days = 0
            sum_ = 0
            for x in json_obj:
                val = [x]
                i = 0
                for y in json_obj[x]:
                    i += 1
                    if i == exclude[0]:
                        hours += json_obj[x][y]
                        continue
                    if i == exclude[1]:
                        days += json_obj[x][y]
                        continue
                    if i == len(json_obj[x]):
                        sum_ += json_obj[x][y]
                    val.append(json_obj[x][y])
                bodies.append(val)
            footers = ["", footer, "", hours, days, round(sum_, 2)]
        else:
            sum_ = 0
            for x in json_obj:
                val = [x]
                i = 0
                for y in json_obj[x]:
                    i += 1
                    if i == len(json_obj[x]):
                        sum_ += json_obj[x][y]
                    val.append(json_obj[x][y])
                bodies.append(val)
            footers = ["", footer, "", round(sum_, 2)]

        return [headers, bodies, footers]

    @staticmethod
    def create_arr_from_json(json_obj, parent_key: str):
        headers = []
        for x in json_obj[parent_key]["Fields"]:
            headers.append(json_obj[parent_key]["Fields"][x])
        del json_obj[parent_key]["Fields"]
        bodies = []
        for x in json_obj[parent_key]:
            val = [x]
            for y in json_obj[parent_key][x]:
                val.append(json_obj[parent_key][x][y])
            bodies.append(val)
        return [parent_key, headers, bodies]


class Xhtml2pdfClass:
    @staticmethod
    def link_callback(uri):
        """
        Convert HTML URIs to absolute system paths so xhtml2pdf can access those
        resources
        """
        result = finders.find(uri)
        s_url = ''
        m_url = ''
        if result:
            if not isinstance(result, (list, tuple)):
                result = [result]
            result = list(os.path.realpath(path) for path in result)
            path = result[0]
        else:
            s_url = settings.STATIC_URL  # Typically /static/
            s_root = settings.STATIC_ROOT  # Typically /home/userX/project_static/
            m_url = settings.MEDIA_URL  # Typically /media/
            m_root = settings.MEDIA_ROOT  # Typically /home/userX/project_static/media/

            if uri.startswith(m_url):
                path = os.path.join(m_root, uri.replace(m_url, ""))
            elif uri.startswith(s_url):
                path = os.path.join(s_root, uri.replace(s_url, ""))
            else:
                return uri
        if not os.path.isfile(path):
            raise Exception(
                'media URI must start with %s or %s' % (s_url, m_url)
            )
        return path


class GeoClass:
    @staticmethod
    def get_hypotenuse(x1: float, y1: float, x2: float, y2: float):
        """"
        Принимает: "пару" точек - их широту и долготу.
        Возвращает: корень из суммы квадратов разностей широты и долготы двух пар точек, ака гипотенузу.
        """
        return math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))

    @staticmethod
    def get_haversine(latitude_1: float, longitude_1: float, latitude_2: float, longitude_2: float):
        """"
        Принимает: "пару" точек - их широту и долготу.
        Возвращает: значение расстояния по гипотенузе двух точек, в метрах, ака формула гаверсинуса.
        """
        delta_latitude = latitude_2 * math.pi / 180 - latitude_1 * math.pi / 180
        delta_longitude = longitude_2 * math.pi / 180 - longitude_1 * math.pi / 180
        a = math.sin(delta_latitude / 2) * math.sin(delta_latitude / 2) + math.cos(latitude_1 * math.pi / 180) * \
            math.cos(latitude_2 * math.pi / 180) * math.sin(delta_longitude / 2) * math.sin(delta_longitude / 2)
        return round(math.atan2(math.sqrt(a), math.sqrt(1 - a)) * 6378.137 * 2 * 1000)

    @staticmethod
    def find_near_point(point_arr: list, point_latitude: float, point_longitude: float):
        """"
        Принимает: массив точек в которых надо искать, где первый элемент это широта, а второй долгоа. Также данные
        точки ближайшие координаты которой надо найти.
        Возвращает: данные точки из массива точек, которая соответствует ближайшему значению целевой точки.
        """
        result = None
        for coord in point_arr:
            if coord[0] <= point_latitude and coord[1] <= point_longitude:
                result = coord
        if result is None:
            result = point_arr[0]
        return result

    @staticmethod
    def get_vector_arr(point_arr):
        """
        Принимает: массив "точек" - первый элемент это имя точки, второй и третий это широта и долгота, а четвёртый
        связи.
        Возвращает: массив "векторов" - первый элемент это имя вектора, второй это расстояние через формулу
        "гаверсинуса".
        """
        # Points = [PointName, latitude, longitude, PointLinks]
        # point1 = ["1", 52.14303, 61.22812, "2"]
        # point2 = ["2", 52.1431, 61.22829, "1|3"]
        # Vectors = [VectorName, length(meters)]
        # vector1 = ["1|2", 12]
        # vector2 = ["2|3", 14]

        vector_arr = []
        for point in point_arr:
            lat1 = point[0]
            lon1 = point[1]
            vector1 = point[2]
            link_arr = point[3].split("|")
            for link in link_arr:
                for point_1 in point_arr:
                    if point_1[2] == link:
                        lat2 = point_1[0]
                        lon2 = point_1[1]
                        vector2 = link
                        length = GeoClass.get_haversine(lat1, lon1, lat2, lon2)
                        vector_arr.append([f"{vector1}|{vector2}", length])
        return vector_arr

    @staticmethod
    def create_cube_object(point: list):
        latitude = point[0]
        longitude = point[1]
        first = [latitude - 0.000002 * 1.62, longitude - 0.000002, 0]
        second = [latitude - 0.000002 * 1.62, longitude + 0.000002, 0]
        third = [latitude + 0.000002 * 1.62, longitude + 0.000002, 0]
        fourth = [latitude + 0.000002 * 1.62, longitude - 0.000002, 0]
        string_object = ''
        for iteration in [first, second, third, fourth, first]:
            num = 1
            for i in iteration:
                if num == 3:
                    string_object += f"{i} "
                else:
                    string_object += f"{i},"
                num += 1
        text_d = '' \
            # f"""<Placemark>
        # 	<name>object</name>
        # 	<Polygon>
        # 		<outerBoundaryIs>
        # 			<LinearRing>
        # 				<coordinates>
        # 					{string_object}
        # 				</coordinates>
        # 			</LinearRing>
        # 		</outerBoundaryIs>
        # 	</Polygon>
        # </Placemark>"""
        return text_d

    @staticmethod
    def create_point_object(point: list):
        latitude = point[0]
        longitude = point[1]
        id_s = point[2]
        # first = [latitude - 0.000002 * 1.62, longitude - 0.000002, 0]
        # second = [latitude - 0.000002 * 1.62, longitude + 0.000002, 0]
        # third = [latitude + 0.000002 * 1.62, longitude + 0.000002, 0]
        # fourth = [latitude + 0.000002 * 1.62, longitude - 0.000002, 0]
        # string_object = ''
        # for iteration in [first, second, third, fourth, first]:
        #     num = 1
        #     for i in iteration:
        #         if num == 3:
        #             string_object += f"{i} "
        #         else:
        #             string_object += f"{i},"
        #         num += 1
        text_d = f"""<Placemark>
                <name>Точка: {id_s}</name>
                <Point>
                    <coordinates>{latitude},{longitude},0</coordinates>
                </Point>
            </Placemark>"""
        return text_d

    @staticmethod
    def generate_xlsx():
        # connection = pg.connect(
        #     host="192.168.1.6",
        #     database="navSections",
        #     port="5432",
        #     user="postgres",
        #     password="nF2ArtXK"
        # )
        # # postgresql_select_query = f"SELECT device, navtime, ROUND(CAST(latitude AS numeric),
        # {request.POST['request_value']}), ROUND(CAST(longitude AS numeric), {request.POST['request_value']}) " \
        # #                           "FROM public.navdata_202108 " \
        # #                           f"WHERE device BETWEEN {request.POST['request_between_first']} AND
        # {request.POST['request_between_last']} AND timezone('UTC', to_timestamp(navtime)) >
        # (CURRENT_TIMESTAMP - INTERVAL '{request.POST['request_hours']} hours') AND flags != 64 " \
        # #                           "ORDER BY device, navtime DESC;"
        # postgresql_select_query = f"SELECT device, navtime, ROUND(CAST(latitude AS numeric),
        # {request.POST['request_value']}), ROUND(CAST(longitude AS numeric), {request.POST['request_value']}) " \
        #                           "FROM public.navdata_202108 " \
        #                           f"WHERE device BETWEEN {request.POST['request_between_first']} AND
        #                           {request.POST['request_between_last']} AND timezone('UTC', to_timestamp(navtime)) >
        #                           (CURRENT_TIMESTAMP - INTERVAL '{request.POST['request_minutes']} minutes') AND
        #                           flags != 64 " \
        #                           "ORDER BY device, navtime DESC;"
        # cursor = connection.cursor()
        # cursor.execute(postgresql_select_query)
        # mobile_records = cursor.fetchall()
        mobile_records = []
        cols = ["устройство", "дата и время", "широта", "долгота", "высота", "скорость", "ds", "направление",
                "флаги ошибок"]
        all_arr = []
        for rows in mobile_records:
            arr = []
            for value in rows:
                id_s = rows.index(value)
                if id_s == 1:
                    arr.append(datetime.datetime.fromtimestamp(int(value - 21600)).strftime('%Y-%m-%d %H:%M:%S'))
                else:
                    arr.append(value)
            all_arr.append(arr)
        wb = openpyxl.Workbook()
        sheet = wb.active
        sheet.title = 'Страница 1'
        for n in cols:
            sheet[f'{get_column_letter(cols.index(n) + 1)}1'] = n
        for n in all_arr:
            for i in n:
                if i:
                    sheet[f'{get_column_letter(n.index(i) + 1)}{all_arr.index(n) + 2}'] = i
                else:
                    sheet[f'{get_column_letter(n.index(i) + 1)}{all_arr.index(n) + 2}'] = '0.0'
        wb.save('static/media/data/geo.xlsx')
        postgresql_select_query = None
        return [cols, all_arr, postgresql_select_query]

    @staticmethod
    def generate_kml():
        # Чтение Excel
        file_xlsx = 'static/media/data/geo_1.xlsx'
        workbook = openpyxl.load_workbook(file_xlsx)
        sheet = workbook.active

        # Чтение из Excel
        final = 0
        for num in range(2, 10000000):
            if ExcelClass.get_sheet_value("A", num, sheet=sheet) is None or '':
                final = num
                break
        array = []
        for num in range(2, final):
            array.append(
                [ExcelClass.get_sheet_value("D", num, sheet=sheet),
                 ExcelClass.get_sheet_value("C", num, sheet=sheet),
                 ExcelClass.get_sheet_value("A", num, sheet=sheet)]
            )

        # Генерация объекта и субъекта
        point_obj = [61.22330, 52.14113, 'БелАЗ']
        point_sub = [61.22891, 52.14334, 'Экскаватор']
        text_x = GeoClass.create_point_object(point_obj)
        text_y = GeoClass.create_point_object(point_sub)

        # Цена рёбер
        count = 0
        for current in array:
            index = array.index(current)
            if index != 0:
                previous = [array[index - 1][0], array[index - 1][1]]
            else:
                previous = [current[0], current[1]]

            count += GeoClass.get_hypotenuse(current[0], current[1], previous[0], previous[1])
        print(round(count, 5))

        # Генерация линий по цветам
        device_arr = []
        previous_device = 0
        text_b = ''
        colors = ['FFFFFFFF', 'FF0000FF', 'FFFF0000', 'FF00FF00', 'FF00FFFF', 'FF0F0F0F', 'FFF0F0F0']
        colors_alias = [': Чё', ': Кр', ': Си', ': Зе', ': Жё', ': Доп1', ': Доп2']
        current_color = colors[0]
        for current in array:
            # index = array.index(current)
            if previous_device is not current[2]:
                device_arr.append(str(current[2]) + colors_alias[len(device_arr) + 1])
                previous_device = current[2]
                current_color = colors[colors.index(current_color) + 1]
            # if index != 0:
            #     previous = [array[index - 1][0], array[index - 1][1]]
            # else:
            #     previous = [current[0], current[1]]
            # text_b += f"""<Placemark>
            #       <Style>
            #         <LineStyle>
            #           <color>{current_color}</color>
            #         </LineStyle>
            #       </Style>
            #       <LineString>
            #         <coordinates>{previous[0]},{previous[1]},0 {current[0]},{current[1]},0 </coordinates>
            #       </LineString>
            #   </Placemark>
            # """
            #
            # # Генерация точек
            # text_b += GeoClass.create_cube_object([current[0], current[1], index])

        # Генерация имени документа из цветов
        dev = ''
        for x in device_arr:
            dev += f"{x} | "

        # Начало kml
        text_a = f"""<?xml version="1.0" encoding="utf-8"?>
          <kml xmlns="http://earth.google.com/kml/2.2">
            <Document>
              <name>{dev}</name>
                """

        # Конец kml
        text_c = R"""</Document>
        </kml>"""

        # Запись в kml
        with open("static/media/data/geo.kml", "w", encoding="utf-8") as file:
            file.write(text_a + text_b + text_x + text_y + text_c)

    @staticmethod
    def generate_way(object_, subject_, point_arr):
        # Генерация общей карты
        text_map = GeoClass.generate_map(point_arr, 'FF0000FF')
        # text_map = ''

        # Генерация объекта и субъекта
        point_obj = [object_[0], object_[1], "ЭКГ"]
        point_sub = [subject_[0], subject_[1], "БелАЗ"]
        text_obj = GeoClass.create_point_object(point_obj)
        text_sub = GeoClass.create_point_object(point_sub)

        path = GeoClass.generate_path(object_, subject_, point_arr)
        # print(path[0])
        # Генерация карты пути
        text_path = GeoClass.generate_map(path[0], 'FFFF0000')

        # Генерация имени документа из цветов
        dev = ''
        for x in [object_[0], subject_[0]]:
            dev += f"{x} | "
        dev += f"{path[1]} meters"
        print(f"{path[1]} meters")

        # Начало kml
        text_title = f"""<?xml version="1.0" encoding="utf-8"?>
          <kml xmlns="http://earth.google.com/kml/2.2">
            <Document>
              <name>{dev}</name>
                """

        # Конец kml
        text_footer = R"""</Document>
        </kml>"""

        # Запись в kml
        try:
            os.remove("static/media/data/geo_1.kml")
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors_local(error=error, function_error='generate_way')
        with open("static/media/data/geo_5.kml", "w", encoding="utf-8") as file:
            file.write(text_title + text_map + text_path + text_obj + text_sub + text_footer)

    @staticmethod
    def generate_path(object_, subject_, point_arr):
        """"
        Генерация пути синего цвета из всех валидных точек и расчёт расстояния.
        """
        # Путь маршрут
        path = []
        # Расстояние пути
        path_distantion = 0

        # Откуда начинаем путь
        from_point = object_
        print(f"from_point: {from_point}")
        # from_point: [61.232109, 52.146845, '38', '37|39']

        # Где завершаем путь
        to_point = subject_
        print(f"to_point: {to_point}")
        # to_point: [61.229219, 52.143999, '12', '11|13']

        # Генерация маршрута
        # От исходной точки идём к её линиям связи, выбираем самую короткую к финальной точке, "наступаем" туда, цикл.
        start_point = from_point
        final_point = to_point

        path.append(from_point)
        while True:
            print('\n*****************')
            print('while', start_point[2], final_point[2])
            links = start_point[3].split("|")
            print(f"links: {links}")
            # links: ['38', '40']

            near_points = []
            for point in point_arr:
                for link in links:
                    if point[2] == link:
                        try:
                            near_points.index(point)
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors_local(error=error, function_error='generate_path')
                            near_points.append(point)
            print(f"near_points: {near_points}")
            # near_points: [[61.232054, 52.146927, '38', '37|39'], [61.232384, 52.147085, '40', '39|41']]

            destinations = []
            for point in near_points:
                destinations.append(GeoClass.get_haversine(point[0], point[1], final_point[0], final_point[1]))
            print(f"destinations: {destinations}")
            # destinations: [[61.232054, 52.146927, '38', '37|39'], [61.232384, 52.147085, '40', '39|41']]

            min_point = min(destinations)
            print(f"min_point: {min_point}")
            # min_point: 367

            if min_point == 0:
                next_point = final_point
                print(f"next_point: {next_point}")
                # next_point: [61.232101, 52.146821, '45', '44|46']

                dist = GeoClass.get_haversine(start_point[0], start_point[1], final_point[0], final_point[1])
                print(f"dist: {dist}")
                # dist: 22

                path_distantion += dist
                path.append(next_point)
                break

            next_point = near_points[destinations.index(min_point)]
            print(f"next_point: {next_point}")
            # next_point: [61.232101, 52.146821, '45', '44|46']

            dist = GeoClass.get_haversine(start_point[0], start_point[1], next_point[0], next_point[1])
            print(f"dist: {dist}")
            # dist: 22

            path_distantion += dist
            start_point = next_point
            path.append(next_point)
            print('*****************\n')
        return [path, path_distantion]

    @staticmethod
    def generate_path_old(object_, subject_, point_arr):
        """"
        Генерация пути синего цвета из всех валидных точек.
        """
        # Генерация маршрута
        # От исходной точки идём к её линиям связи, выбираем самую короткую к финальной точке, "наступаем" туда, цикл.
        path = []
        path_dist = 0
        current_point = subject_
        # subject_: [61.232230610495556, 52.14697472947569, '21', '20|22']
        previous_point = subject_
        for loop in range(len(point_arr)):
            # links: ['20', '22']
            links = current_point[3].split("|")
            near_points = []
            for point in point_arr:
                for link in links:
                    if point[2] == link:
                        # print(point[2])
                        try:
                            near_points.index(point)
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors_local(
                                error=error, function_error='generate_path_old'
                            )
                            near_points.append(point)

            # Первые две линии не брать, а к последней по индексу добавлять ещё одну связь.
            min_dist = 9999
            # print(near_points)
            for point in near_points:
                # object_: [61.2293618582404, 52.143978995225346, '4', '3|5']
                dist = GeoClass.get_haversine(point[0], point[1], object_[0], object_[1])
                # print(f"dist: {dist}")
                if min_dist > dist:
                    min_dist = dist
                    current_point = point
                    path.append(point)
                    distantion = GeoClass.get_haversine(point[0], point[1], previous_point[0], previous_point[1])
                    print(f"prev: {previous_point}   |   curr: {point}     |       deist: {distantion}m")
                    path_dist += distantion
                previous_point = point
        print(path_dist)
        path_dist = 0
        for x in path:
            path_dist += GeoClass.get_haversine(x[0], x[1], object_[0], object_[1])
            print(GeoClass.get_haversine(x[0], x[1], object_[0], object_[1]))
        return [path, path_dist]

    @staticmethod
    def generate_map(point_arr, color):
        """"
        Генерация карты выбранного цвета из всех валидных точек.
        """
        text = ''
        for current in point_arr:
            index = point_arr.index(current)
            if index != 0:
                previous = [point_arr[index - 1][0], point_arr[index - 1][1]]
            else:
                previous = [current[0], current[1]]
            text += f"""<Placemark>
                  <Style>
                    <LineStyle>
                      <color>{color}</color>
                    </LineStyle>
                  </Style>
                  <LineString>
                    <coordinates>{previous[0]},{previous[1]},0 {current[0]},{current[1]},0 </coordinates>
                  </LineString>
              </Placemark>
            """
            # Генерация точек
            text += GeoClass.create_cube_object([current[0], current[1], index])
        return text

    @staticmethod
    def read_kml(val: list):
        """"
        Чтение из kml-файла
        """
        with open("static/media/data/geo.kml", 'rt', encoding="utf-8") as file:
            data = file.read()
        k = kml.KML()
        k.from_string(data)
        features = list(k.features())
        k2 = list(features[0].features())
        arr = []
        for feat in k2:
            string = str(feat.geometry).split('(')[1].split('0.0')[0].split(' ')
            arr.append([float(string[0]), float(string[1])])
        if val is None:
            val = [61.2200083333333, 52.147525]
        val2 = 0
        val3 = 0
        for loop1 in arr:
            # Мы должны найти к какой из точек он ближе(разница двух элементов массива)
            if val[0] > loop1[0]:
                for loop2 in arr:
                    if val[1] > loop2[1]:
                        val2 = loop1[0]
                        val3 = loop1[1]
                        break
        print([val2, val3])
        return [val2, val3]

    @staticmethod
    def create_style():
        # f"""
        # <gx:CascadingStyle kml:id="__managed_style_25130D559F1CA685BFB3">
        # 	<Style>
        # 		<IconStyle>
        # 			<scale>1.2</scale>
        # 			<Icon>
        # 				<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
        # 			</Icon>
        # 			<hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
        # 		</IconStyle>
        # 		<LabelStyle>
        # 		</LabelStyle>
        # 		<LineStyle>
        # 			<color>ff2dc0fb</color>
        # 			<width>6</width>
        # 		</LineStyle>
        # 		<PolyStyle>
        # 			<color>40ffffff</color>
        # 		</PolyStyle>
        # 		<BalloonStyle>
        # 			<displayMode>hide</displayMode>
        # 		</BalloonStyle>
        # 	</Style>
        # </gx:CascadingStyle>
        # <gx:CascadingStyle kml:id="__managed_style_1A4EFD26461CA685BFB3">
        # 	<Style>
        # 		<IconStyle>
        # 			<Icon>
        # 				<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
        # 			</Icon>
        # 			<hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
        # 		</IconStyle>
        # 		<LabelStyle>
        # 		</LabelStyle>
        # 		<LineStyle>
        # 			<color>ff2dc0fb</color>
        # 			<width>4</width>
        # 		</LineStyle>
        # 		<PolyStyle>
        # 			<color>40ffffff</color>
        # 		</PolyStyle>
        # 		<BalloonStyle>
        # 			<displayMode>hide</displayMode>
        # 		</BalloonStyle>
        # 	</Style>
        # </gx:CascadingStyle>
        # <StyleMap id="__managed_style_047C2286A81CA685BFB3">
        # 	<Pair>
        # 		<key>normal</key>
        # 		<styleUrl>#__managed_style_1A4EFD26461CA685BFB3</styleUrl>
        # 	</Pair>
        # 	<Pair>
        # 		<key>highlight</key>
        # 		<styleUrl>#__managed_style_25130D559F1CA685BFB3</styleUrl>
        # 	</Pair>
        # </StyleMap>
        # <Placemark id="0D045F86381CA685BFB2">
        # 	<name>Самосвал</name>
        # 	<LookAt>
        # 		<longitude>61.2344061029136</longitude>
        # 		<latitude>52.17019183209385</latitude>
        # 		<altitude>282.7747547496757</altitude>
        # 		<heading>0</heading>
        # 		<tilt>0</tilt>
        # 		<gx:fovy>35</gx:fovy>
        # 		<range>1198.571236050484</range>
        # 		<altitudeMode>absolute</altitudeMode>
        # 	</LookAt>
        # 	<styleUrl>#__managed_style_047C2286A81CA685BFB3</styleUrl>
        # 	<Point>
        # 		<coordinates>61.23500224897153,52.17263169824412,281.7092496784567</coordinates>
        # 	</Point>
        # </Placemark>
        # <Placemark id="0B4EA6F59B1CA68601E0">
        # 	<name>Экскаватор</name>
        # 	<LookAt>
        # 		<longitude>61.23624067458115</longitude>
        # 		<latitude>52.17416232356366</latitude>
        # 		<altitude>277.5968564918906</altitude>
        # 		<heading>-0.5372217869872089</heading>
        # 		<tilt>53.57834275643886</tilt>
        # 		<gx:fovy>35</gx:fovy>
        # 		<range>2536.120178802812</range>
        # 		<altitudeMode>absolute</altitudeMode>
        # 	</LookAt>
        # 	<styleUrl>#__managed_style_047C2286A81CA685BFB3</styleUrl>
        # 	<Point>
        # 		<coordinates>61.23654046107902,52.16710625511239,297.4562999141254</coordinates>
        # 	</Point>
        # </Placemark>"""
        pass


class UtilsClass:
    @staticmethod
    def create_encrypted_password(_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                                  _length=8):
        password = ''
        for i in range(1, _length + 1):
            password += random.choice(_random_chars)
        return password

    @staticmethod
    def decrypt_text_with_hash(massivsimvolov: str, massivkhesha: str):
        rasshifrovat_tekst = ''
        pozitsiyasimvolakhesha = 0
        dlinakhesha = len(massivkhesha)
        propusk = False
        for num in massivsimvolov:
            if propusk:
                propusk = False
                continue
            nomersimvola = ord(str(num))
            if pozitsiyasimvolakhesha >= dlinakhesha - 1:
                pozitsiyasimvolakhesha = 0
            pozitsiyasimvolakhesha = pozitsiyasimvolakhesha + 1
            simvolkhesha = ord(str(massivkhesha[pozitsiyasimvolakhesha]))
            kod_zashifrovannyy_simvol = nomersimvola - simvolkhesha
            # print(f"nomersimvola:{chr(nomersimvola)}:{nomersimvola}|simvolkhesha:{chr(simvolkhesha)}:{simvolkhesha}")
            zashifrovannyy_simvol = chr(kod_zashifrovannyy_simvol)
            rasshifrovat_tekst = rasshifrovat_tekst + zashifrovannyy_simvol
            if round(simvolkhesha / 2, 0) == simvolkhesha / 2:
                propusk = True
        return rasshifrovat_tekst


class ExcelClass:
    @staticmethod
    def workbook_create():
        workbook = openpyxl.Workbook()
        return workbook

    @staticmethod
    def workbook_load(excel_file: str):
        workbook = openpyxl.load_workbook(excel_file)
        return workbook

    @staticmethod
    def workbook_activate(workbook):
        sheet = workbook.active
        return sheet

    @staticmethod
    def workbook_save(workbook, excel_file: str):
        try:
            os.remove(excel_file)
        except Exception as error:
            pass
        try:
            workbook.save(excel_file)
        except Exception as error:
            print(f'\n ! Please, close the excel_file! \n: {excel_file} | {error}')

    @staticmethod
    def workbook_close(workbook):
        openpyxl.Workbook.close(workbook)

    @staticmethod
    def set_sheet_title(sheet, page_name='page 1'):
        sheet.title = page_name

    @staticmethod
    def get_sheet_value(col: Union[str, int], row: int, sheet):
        if isinstance(col, int):
            col = ExcelClass.get_column_letter(col)
        value = str(sheet[str(col).upper() + str(row)].value)
        if value == 'None' or value is None:
            value = ''
        else:
            value = str(value)
        return value

    @staticmethod
    def set_sheet_value(col: Union[str, int], row: int, value: str, sheet):
        if isinstance(col, int):
            col = ExcelClass.get_column_letter(col)
        if value == 'None' or value is None:
            value = ''
        sheet[str(col) + str(row)] = str(value)

    @staticmethod
    def get_column_letter(num: int):
        return get_column_letter(num)

    @staticmethod
    def get_max_num_rows(sheet):
        return int(sheet.max_row)

    class Example:
        @staticmethod
        def example_read_from_excel_file_col_int():
            excel_file = 'export.xlsx'
            workbook = ExcelClass.workbook_load(excel_file=excel_file)
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            max_num_rows = ExcelClass.get_max_num_rows(sheet=sheet)
            max_num_cols = 10
            global_list = []
            for row in range(1, max_num_rows + 1):
                local_list = []
                for col in range(1, max_num_cols + 1):
                    value = ExcelClass.get_sheet_value(col=col, row=row, sheet=sheet)
                    local_list.append(value)
                global_list.append(local_list)
            for row in global_list:
                print(row)
            ExcelClass.workbook_close(workbook=workbook)

        @staticmethod
        def example_read_from_excel_file_col_char():
            excel_file = 'export.xlsx'
            workbook = ExcelClass.workbook_load(excel_file=excel_file)
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            max_num_rows = ExcelClass.get_max_num_rows(sheet=sheet)
            char_cols = 'ACDF'
            global_list = []
            for row in range(1, max_num_rows + 1):
                local_list = []
                for col in char_cols:
                    value = ExcelClass.get_sheet_value(col=col, row=row, sheet=sheet)
                    local_list.append(value)
                global_list.append(local_list)
            for row in global_list:
                print(row)
            ExcelClass.workbook_close(workbook=workbook)

        @staticmethod
        def example_write_to_excel_file():
            global_list = [
                ['title_1', 'title_2', 'title_3'],
                ['body_1_1', 'body_1_2', 'body_1_3'],
                ['body_2_1', 'body_2_2', 'body_2_3'],
                ['body_3_1', 'body_3_3', 'body_3_3'],
            ]

            excel_file = 'import.xlsx'
            workbook = ExcelClass.workbook_create()
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            for row in global_list:
                for value in row:
                    ExcelClass.set_sheet_value(
                        col=row.index(value) + 1,
                        row=global_list.index(row) + 1,
                        value=value,
                        sheet=sheet
                    )
            ExcelClass.workbook_save(workbook=workbook, excel_file=excel_file)


class DateTimeUtils:
    @staticmethod
    def get_current_datetime():
        return f"{time.strftime('%Y-%m-%d %H:%M:%S')}"

    @staticmethod
    def get_current_date():
        return f"{time.strftime('%Y-%m-%d')}"

    @staticmethod
    def get_current_time():
        return f"{time.strftime('%H:%M:%S')}"

    @staticmethod
    def get_difference_datetime(days=0.0, hours=0.0, minutes=0.0, seconds=0.0):
        value = datetime.datetime.now() + datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
        return value.replace(tzinfo=datetime.timezone.utc)

    class Example:
        @staticmethod
        def example_get_datetime():
            print(DateTimeUtils.get_current_datetime())

        @staticmethod
        def example_get_difference_datetime():
            print(DateTimeUtils.get_difference_datetime(hours=-2))
