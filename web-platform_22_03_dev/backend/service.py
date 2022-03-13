import base64
import datetime
import hashlib
import json
import os
import random
import threading
import time
import httplib2
import openpyxl
from openpyxl.utils import get_column_letter
from typing import Union

from django.contrib.auth.models import User, Group
from django.core.handlers.wsgi import WSGIRequest

from backend import models as backend_models


class DjangoClass:
    class TemplateClass:
        @staticmethod
        def request(request, log=False, schedule=False, print_req=False):

            # Logging
            ############################################################################################################
            if log:
                threading.Thread(target=DjangoClass.LoggingClass.action, args=(request,)).start()
            ############################################################################################################

            # Scheduler
            ############################################################################################################
            if schedule:
                threading.Thread(target=DjangoClass.SchedulerClass.scheduler, args=(request,)).start()
            ############################################################################################################

            # Request
            ############################################################################################################
            request_instance = DjangoClass.DRFClass.RequestClass(request=request)
            if print_req:
                print("\n\n")
                print(f"request_path: {request_instance.path}")
                print(f"datetime: {DateTimeUtils.get_current_datetime()}")
                print("\n")
                print(f"request_method: {request_instance.method}")
                print(f"request_action_type: {request_instance.action_type}")
                print(f"request_user: {request_instance.user}")
                print(f"request.data: {request_instance.data}")
                print(f"request_body: {request_instance.body}")
                print("\n\n")
            ############################################################################################################

            return request_instance

    class AuthorizationClass:
        @staticmethod
        def try_to_access(request, access: str):
            DjangoClass.LoggingClass.action(request=request)
            # if str(request.META.get("REMOTE_ADDR")) == '192.168.1.202':
            #     return 'django_local'
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
        def error(request, error, print_error=False):
            if print_error:
                print(f"\nerror: \n{error}\n")
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
        def error_local(error, function_error):
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
        def action(request):
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
                DjangoClass.LoggingClass.error_local(error=error, function_error='get_sha256_password')
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
        class RequestClass:
            def __init__(self, request):
                # print("request.scheme: ", request.scheme)
                # print("request.body: ", request.body)
                # print("request.path: ", request.path)
                # print("request.path_info: ", request.path_info)
                # print("request.method: ", request.method)
                # print("request.encoding: ", request.encoding)
                # print("request.content_type: ", request.content_type)
                # print("request.GET: ", request.GET)
                # print("request.POST: ", request.POST)
                # print("request.COOKIES: ", request.COOKIES)
                # print("request.FILES: ", request.FILES)
                # print("request.META: ", request.META)
                # print("request.META: ", request.META)
                # for key, value in request.META.items():
                #     print(f"{key}: {value}")
                # print("request.META.HTTP_HOST : ", request.META.get("HTTP_HOST"))
                # print("request.META.REMOTE_ADDR: ", request.META.get("REMOTE_ADDR"))
                # print("request.META.HTTP_REFERER: ", request.META.get("HTTP_REFERER"))
                try:
                    self.request = request
                except Exception as error:
                    self.request = None
                try:
                    self.path = str(request.path)
                except Exception as error:
                    self.path = ""
                try:
                    self.ip = str(request.META.get("REMOTE_ADDR"))
                except Exception as error:
                    self.ip = ""
                try:
                    self.method = str(request.method).upper()
                except Exception as error:
                    self.method = "GET"
                try:
                    self.action_type = str(request.data["Action-type"]).upper()
                except Exception as error:
                    self.action_type = ""
                try:
                    self.user = User.objects.get(username=str(request.user.username))
                except Exception as error:
                    self.user = None
                try:
                    self.user_model = \
                        backend_models.UserModel.objects.get(user_foreign_key_field=self.user)
                except Exception as error:
                    self.user_model = None
                try:
                    self.data = request.data
                except Exception as error:
                    self.data = None
                try:
                    self.body = request.data["body"]
                except Exception as error:
                    self.body = None

            def get_value(self, key: str, except_error=False, strip=False):
                try:
                    if self.data[key] == "null":
                        return None
                    elif self.data[key] == "true":
                        return True
                    elif self.data[key] == "false":
                        return False
                    else:
                        if strip:
                            return str(self.data[key]).strip()
                        else:
                            return self.data[key]
                except Exception as error:
                    if except_error:
                        DjangoClass.LoggingClass.error(request=self.request, error=error, print_error=True)
                    else:
                        return None

        @staticmethod
        def request_utils(request):
            try:
                request_method = str(request.method).upper()
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.error(request=request, error=error)
                request_method = None

            try:
                request_action_type = str(request.data["Action-type"]).upper()
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.error(request=request, error=error)
                request_action_type = None

            try:
                request_user = User.objects.get(username=str(request.user.username))
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.error(request=request, error=error)
                request_user = None

            try:
                request_body = request.data["body"]
            except Exception as error:
                print(error)
                DjangoClass.LoggingClass.error(request=request, error=error)
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
                # base
                groups = ["user", "moderator", "superuser"]
                # rational
                groups += ["rational_admin", "rational_moderator_tech_pre_atp", "rational_moderator_tech_pre_gtk",
                           "rational_moderator_tech_pre_ok", "rational_moderator_tech_pre_uprav",
                           "rational_moderator_tech_pre_energouprav", "rational_moderator_tech_post",
                           "rational_moderator_no_tech_post"]
                # idea
                groups += ["idea_moderator"]
                # tests
                groups += ["moderator_vacancy"]
                for grp in groups:
                    group = Group.objects.get_or_create(name=grp)[0]
                    group_model = backend_models.GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                    group_model.user_many_to_many_field.add(
                        backend_models.UserModel.objects.get(
                            user_foreign_key_field=User.objects.get(username="Bogdan")
                        )
                    )
                    group_model.name_slug_field = grp
                    action_model = backend_models.ActionModel.objects.get_or_create(access_slug_field=grp)[0]
                    group_model.action_many_to_many_field.add(action_model)
                    group_model.save()

                    # try:
                    #     group = Group.objects.get(name=grp)
                    #     group_model = backend_models.GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                    #     group_model.user_many_to_many_field.add(
                    #         backend_models.UserModel.objects.get(
                    #             user_foreign_key_field=User.objects.get(username="Bogdan")
                    #         )
                    #     )
                    # except Exception as error:
                    #     group = Group.objects.create(name=grp)
                    #     group_model = backend_models.GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                    #     group_model.name_char_field = grp
                    #     group_model.name_slug_field = grp
                    #     action_model = backend_models.ActionModel.objects.get_or_create(access_slug_field=grp)[0]
                    #     group_model.action_many_to_many_field.add(action_model)
                    #     group_model.save()

            except Exception as error__:
                print(error__)
            ############################################################################################################

            # create default superuser
            ############################################################################################################
            username_ = 'Bogdan'
            password_ = '31284bogdan'
            try:
                user = User.objects.get(username=username_)
            except Exception as error__:
                print(error__)
                user = User.objects.create(username=username_)
                user.set_password(password_)
                user.is_staff = True
                user.is_superuser = True
                user.save()
            user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
            user_model.password_slug_field = password_
            user_model.save()
            try:
                groups = ["user", "moderator", "superuser"]
                for grp in groups:
                    try:
                        group = Group.objects.get(name=grp)
                        group_model = backend_models.GroupModel.objects.get_or_create(group_foreign_key_field=group)[0]
                        group_model.user_many_to_many_field.add(user_model)
                    except Exception as error:
                        pass
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
                user.is_staff = True
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
                    DjangoClass.LoggingClass.action(request=request)
                    threading.Thread(target=DjangoClass.SchedulerClass.update_users, args=()).start()
            except Exception as error:
                print(error)
            ############################################################################################################

            return True


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
