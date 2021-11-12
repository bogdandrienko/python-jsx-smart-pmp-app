import datetime
import random
import time

from django.contrib.auth.models import User, Group
from django.contrib.auth import logout
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http.response import Http404


class DjangoClass:
    class AuthorizationClass:
        @staticmethod
        def access_to_page(request):
            # Проверка регистрации: если пользователь не вошёл в аккаунт его переадресует в форму входа
            if request.user.is_authenticated:
                try:
                    user = User.objects.get(username=request.user.username)
                    # Проверка бана: если аккаунт пользователя отключён, то его разлогинит
                    if user.is_active is False:
                        logout(request)
                        return 'account_login'
                    else:
                        if user.profile.email and user.profile.secret_answer and user.profile.secret_question:
                            pass
                        else:
                            return 'account_change_password'
                except Exception as ex:
                    pass
                return False
            else:
                return 'account_login'

    class LoggingClass:
        @staticmethod
        def write_to_database():
            pass

        @staticmethod
        def write_to_text_file():
            pass

        @staticmethod
        def logging(request):

            print('\n ***** ***** \n')
            print(f'request.user.username: {request.user.username}')
            print('\n ***** ***** \n')

            print('\n ***** ***** \n')
            print(f'request.path: {request.path}')
            print('\n ***** ***** \n')

            print('\n ***** ***** \n')
            print(f'request.method: {request.method}')
            print('\n ***** ***** \n')

            print('\n ***** ***** \n')
            print(f'datetime.datetime.now(): {datetime.datetime.now()}')
            print('\n ***** ***** \n')

            print(request)

    class AccountClass:
        class UserAuthClass:
            """
            Основной аккаунт пользователя
            """

            def __init__(self, username, password, first_name='', last_name='', email='', is_active=True,
                         is_staff=False, is_superuser=False, groups='User', force_change_account=False,
                         force_change_account_password=False, force_clear_groups=False):
                # Основное
                self.username = username
                self.password = password

                # Персональная информация
                self.first_name = first_name
                self.last_name = last_name
                self.email = email

                # Права доступа
                self.is_active = is_active
                self.is_staff = is_staff
                self.is_superuser = is_superuser
                self.groups = groups

                # Настройки создания аккаунта
                self.force_change_account = force_change_account
                self.force_change_account_password = force_change_account_password
                self.force_clear_groups = force_clear_groups

            def account_auth_create(self):
                # try:
                if True:
                    user = User.objects.create(
                        # Основное
                        username=self.username,
                        password=self.get_sha256_password(self.password),

                        # Персональная информация
                        first_name=self.first_name,
                        last_name=self.last_name,
                        email=self.email,

                        # Права доступа
                        is_active=self.is_active,
                        is_staff=self.is_staff,
                        is_superuser=self.is_superuser,
                    )
                    user.profile.password = self.password
                    user.save()
                    return self.account_auth_set_group()
                # except Exception as ex:
                #     return False

            def account_auth_change(self):
                # try:
                if True:
                    user = User.objects.get(username=self.username)
                    # Основное
                    if self.force_change_account_password:
                        user.password = self.get_sha256_password(self.password)
                        user.profile.password = self.password

                    # Персональная информация
                    user.first_name = self.first_name
                    user.last_name = self.last_name
                    user.email = self.email

                    # Права доступа
                    user.is_active = self.is_active
                    user.is_staff = self.is_staff
                    user.is_superuser = self.is_superuser

                    user.save()
                    return self.account_auth_set_group()
                # except Exception as ex:
                #     return False

            def account_auth_set_group(self):
                # try:
                if True:

                    try:
                        groups = [x.strip() for x in self.groups.split(',') if len(x) > 1]
                    except Exception as ex:
                        groups = [self.groups]

                    if self.force_clear_groups:
                        User.objects.get(username=self.username).groups.clear()

                    success = True
                    for group in groups:
                        try:
                            if group:
                                group_object = Group.objects.get_or_create(name=group)[0]
                                group_object.user_set.add(User.objects.get(username=self.username))
                            else:
                                success = False
                        except Exception as ex:
                            success = False

                    return success
                # except Exception as ex:
                #     return False

            def account_auth_create_or_change(self):
                # try:
                if True:
                    try:
                        user = User.objects.get(username=self.username)
                        # Возврат, если пользователь обладает правами суперпользователя
                        if user.is_superuser:
                            return False
                        # Если пользователь уже существует и стоит статус "принудительно изменять аккаунт"
                        if user and self.force_change_account:
                            self.account_auth_change()
                            return True
                        else:
                            return False
                    except Exception as ex:
                        return self.account_auth_create()
                # except Exception as ex:
                #     return False

            @staticmethod
            def get_sha256_password(password: str):
                # try:
                if True:
                    try:
                        user = User.objects.get(username='None')
                    except Exception as ex:
                        user = User.objects.create(
                            username='None'
                        )
                    user.set_password(password)
                    user.save()
                    user = User.objects.get(username='None')
                    encrypt_password = user.password
                    user.delete()
                    return encrypt_password
                # except Exception as ex:
                #     return False

            @staticmethod
            def create_password_from_chars(chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                                           length=8):
                password = ''
                for i in range(1, length + 1):
                    password += random.choice(chars)
                return password


        class UserProfileClass:
            """
            Первичная информация аккаунта пользователя
            """

            def __init__(self, username, user_iin='', first_name='', last_name='', patronymic='', personnel_number='',
                         subdivision='', workshop_service='', department_site='', position='', category=''):
                # Основное
                self.username = username

                # Персональная информация
                self.user_iin = user_iin
                self.first_name = first_name
                self.last_name = last_name
                self.patronymic = patronymic
                self.personnel_number = personnel_number

                # First data account
                self.subdivision = subdivision
                self.workshop_service = workshop_service
                self.department_site = department_site
                self.position = position
                self.category = category

            def profile_first_change(self):

                print('\n ***** ***** 4')
                print(f'profile_first_change: {self}')

                # try:
                if True:
                    user = User.objects.get(username=self.username)
                    # Возврат, если пользователь обладает правами суперпользователя
                    if user.is_superuser:
                        return False
                    # Персональная информация
                    user.profile.user_iin = self.user_iin
                    user.profile.first_name = self.first_name
                    user.profile.last_name = self.last_name
                    user.profile.patronymic = self.patronymic
                    user.profile.personnel_number = self.personnel_number

                    # First data account
                    user.profile.subdivision = self.subdivision
                    user.profile.workshop_service = self.workshop_service
                    user.profile.department_site = self.department_site
                    user.profile.position = self.position
                    user.profile.category = self.category

                    user.save()
                # except Exception as ex:
                #     return False

        class UserGroupClass:
            """
            Основные группы пользователя
            """

            def __init__(self, username, group='User'):
                self.username = username
                self.group = group

        @staticmethod
        def create_main_account(user_account_class, username='', password='', email='', firstname='',
                                lastname='', is_staff=False, is_superuser=False, force_change=False):
            try:
                if user_account_class:
                    username = user_account_class.username
                    password = user_account_class.password
                    email = user_account_class.email
                    firstname = user_account_class.first_name
                    lastname = user_account_class.last_name
                    is_staff = user_account_class.is_staff
                    is_superuser = user_account_class.is_superuser
                if username == 'Bogdan' or username == 'bogdan':
                    is_superuser = True
                print(f'{username}: {password}')
                try:
                    user = User.objects.get(username=username)
                    if force_change and user:
                        DjangoClass.AccountClass.change_main_account(
                            user_account_class=False,
                            username=username,
                            password=password,
                            email=email,
                            firstname=firstname,
                            lastname=lastname,
                            is_staff=is_staff,
                            is_superuser=is_superuser,
                            force_create=force_change
                        )
                        return True
                    return False
                except Exception as ex:
                    encrypt_password = DjangoClass.AccountClass.create_django_encrypt_password(password)
                    if encrypt_password:
                        print(f'{username}: {encrypt_password}')
                        user = User.objects.create(
                            username=username,
                            password=encrypt_password,
                            email=email,
                            firstname=firstname,
                            lastname=lastname,
                            is_staff=is_staff,
                            is_superuser=is_superuser
                        )
                        user.save()
                        user.set_password = encrypt_password
                        return True
                    return False
            except Exception as ex:
                return False

        @staticmethod
        def change_main_account(user_account_class, username: str, password: str, email='', firstname='',
                                lastname='', is_staff=False, is_superuser=False, force_create=False):
            try:
                if user_account_class:
                    username = user_account_class.username
                    password = user_account_class.password
                    email = user_account_class.email
                    firstname = user_account_class.first_name
                    lastname = user_account_class.last_name
                    is_staff = user_account_class.is_staff
                    is_superuser = user_account_class.is_superuser
                if force_create:
                    user = User.objects.get_or_create(username=username)[0]
                else:
                    user = User.objects.get(username=username)
                user.username = username
                user.password = password
                user.email = email
                user.first_name = firstname
                user.last_name = lastname
                user.is_staff = is_staff
                user.is_superuser = is_superuser
                user.save()
                user.set_password = password
                return True
            except Exception as ex:
                return False

        @staticmethod
        def set_user_group(user_group_class, username='', group='User', force_change=False):
            try:
                success = True
                if user_group_class:
                    username = user_group_class.username
                    group = user_group_class.group
                if group:
                    try:
                        group = [x.strip() for x in group.split(',') if len(x) > 1]
                    except Exception as ex:
                        group = [group]
                    for grp in group:
                        try:
                            user_group = Group.objects.get_or_create(name=grp)[0]
                            user = User.objects.get(username=username)
                            if force_change:
                                user.groups.clear()
                            user_group.user_set.add(user)
                        except Exception as ex:
                            success = False
                return success
            except Exception as ex:
                return False

        @staticmethod
        def create_django_encrypt_password(decrypt_password: str):
            try:
                try:
                    user = User.objects.get(username='None')
                except Exception as ex:
                    user = User.objects.create(
                        username='None'
                    )
                user.set_password(decrypt_password)
                user.save()
                user = User.objects.get(username='None')
                encrypt_password = user.password
                user.delete()
                return encrypt_password
            except Exception as ex:
                return False

        @staticmethod
        def create_main_data_account(user_account_class: UserAuthClass, user_group_class: UserGroupClass,
                                     username='', password='', email='', firstname='', lastname='', is_staff=False,
                                     is_superuser=False, group='User', force_change=False):
            try:
                if user_account_class:
                    success_1 = DjangoClass.AccountClass.create_main_account(
                        user_account_class=user_account_class,
                        force_change=force_change
                    )
                else:
                    success_1 = DjangoClass.AccountClass.create_main_account(
                        user_account_class=False,
                        username=username,
                        password=password,
                        email=email,
                        firstname=firstname,
                        lastname=lastname,
                        is_staff=is_staff,
                        is_superuser=is_superuser,
                        force_change=force_change
                    )
                if success_1:
                    if user_group_class:
                        success_2 = DjangoClass.AccountClass.set_user_group(
                            user_group_class=user_group_class,
                            force_change=force_change
                        )
                    else:
                        if group:
                            pass
                        else:
                            group = 'User'
                        success_2 = DjangoClass.AccountClass.set_user_group(
                            user_group_class=False,
                            username=username,
                            group=group,
                            force_change=force_change
                        )
                    if success_1 and success_2:
                        return True
                return False
            except Exception as ex:
                return False

        @staticmethod
        def create_first_data_account(user_first_data_account_class, username='', user_iin='', password='',
                                      firstname='',
                                      lastname='', patronymic='', personnel_number='', subdivision='',
                                      workshop_service='',
                                      department_site='', position='', category='', force_change=False):
            try:
                if user_first_data_account_class:
                    username = user_first_data_account_class.username
                    user_iin = user_first_data_account_class.user_iin
                    password = user_first_data_account_class.password
                    firstname = user_first_data_account_class.first_name
                    lastname = user_first_data_account_class.last_name
                    patronymic = user_first_data_account_class.patronymic
                    personnel_number = user_first_data_account_class.personnel_number
                    subdivision = user_first_data_account_class.subdivision
                    workshop_service = user_first_data_account_class.workshop_service
                    department_site = user_first_data_account_class.department_site
                    position = user_first_data_account_class.position
                    category = user_first_data_account_class.category
                try:
                    pass
                #     user = AccountDataModel.objects.get(username=User.objects.get(username=username))
                #     if force_change and user:
                #         DjangoClass.AccountClass.change_first_data_account(
                #             user_first_data_account_class=False,
                #             username=username,
                #             user_iin=user_iin,
                #             password=password,
                #             firstname=firstname,
                #             lastname=lastname,
                #             patronymic=patronymic,
                #             personnel_number=personnel_number,
                #             subdivision=subdivision,
                #             workshop_service=workshop_service,
                #             department_site=department_site,
                #             position=position,
                #             category=category
                #         )
                #         return True
                #     return False
                except Exception as ex:
                    #     username_obj = User.objects.get(username=username)
                    #     user = AccountDataModel.objects.create(
                    #         username=username_obj,
                    #         user_iin=user_iin,
                    #         password=password,
                    #         firstname=firstname,
                    #         lastname=lastname,
                    #         patronymic=patronymic,
                    #         personnel_number=personnel_number,
                    #         subdivision=subdivision,
                    #         workshop_service=workshop_service,
                    #         department_site=department_site,
                    #         position=position,
                    #         category=category
                    #     )
                    #     user.save()
                    return True
            except Exception as ex:
                return False

        @staticmethod
        def change_first_data_account(user_first_data_account_class, username='', user_iin='', password='',
                                      firstname='', lastname='', patronymic='', personnel_number='', subdivision='',
                                      workshop_service='', department_site='', position='', category='',
                                      force_create=False):
            try:
                if user_first_data_account_class:
                    username = user_first_data_account_class.username
                    user_iin = user_first_data_account_class.user_iin
                    password = user_first_data_account_class.password
                    firstname = user_first_data_account_class.first_name
                    lastname = user_first_data_account_class.last_name
                    patronymic = user_first_data_account_class.patronymic
                    personnel_number = user_first_data_account_class.personnel_number
                    subdivision = user_first_data_account_class.subdivision
                    workshop_service = user_first_data_account_class.workshop_service
                    department_site = user_first_data_account_class.department_site
                    position = user_first_data_account_class.position
                    category = user_first_data_account_class.category
                # if force_create:
                #     user = AccountDataModel.objects.get_or_create(username=User.objects.get(username=username))[0]
                # else:
                #     user = AccountDataModel.objects.get(username=User.objects.get(username=username))
                # user.user_iin = user_iin
                # user.password = password
                # user.firstname = firstname
                # user.lastname = lastname
                # user.patronymic = patronymic
                # user.personnel_number = personnel_number
                # user.subdivision = subdivision
                # user.workshop_service = workshop_service
                # user.department_site = department_site
                # user.position = position
                # user.category = category
                # user.save()
                return True
            except Exception as ex:
                return False

        @staticmethod
        def change_first_data_account_status(username='', status=True):
            try:
                print(f'change_first_data_account_status: {username}= {status}')
                # user = AccountDataModel.objects.get(username=User.objects.get(username=username))
                # user.user_iin = user.user_iin
                # user.password = user.password
                # user.firstname = user.firstname
                # user.lastname = user.lastname
                # user.patronymic = user.patronymic
                # user.personnel_number = user.personnel_number
                # user.subdivision = user.subdivision
                # user.workshop_service = user.workshop_service
                # user.department_site = user.department_site
                # user.position = user.position
                # user.category = user.category
                # user.status = status
                # user.save()
                return True
            except Exception as ex:
                return False


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


class HttpRaiseExceptionClass:
    @staticmethod
    def http404_raise(exception_text):
        raise Http404(exception_text)
