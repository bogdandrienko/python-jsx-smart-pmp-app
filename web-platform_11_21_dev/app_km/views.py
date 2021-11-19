import base64
import datetime
import hashlib
import json
import os
import random
import httplib2
import openpyxl
import requests
from django.conf import settings
from django.contrib import admin
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User, Group
from django.core.mail import BadHeaderError, send_mail
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.http.response import Http404, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import get_template
from django.urls import reverse
from xhtml2pdf import pisa
from .service import DjangoClass, PaginationClass, HttpRaiseExceptionClass
from .models import ExampleModel, RationalModel, CategoryRationalModel, LikeRationalModel, CommentRationalModel, \
	ApplicationModuleModel, ApplicationComponentModel, NotificationModel, EmailModel, ContactModel, \
	DocumentModel, MessageModel, CityModel, ArticleModel, SmsModel, IdeasModel, IdeasCategoryModel, \
	IdeasLikeModel, IdeasCommentModel
from .forms import ExampleForm, CreateUserForm, ChangeUserForm, CreateUsersForm, GeneratePasswordsForm, RationalForm, \
	NotificationForm, MessageForm, DocumentForm, ContactForm, CityForm, ArticleForm, \
	SmsForm, GeoForm, ChangePasswordForm, BankIdeasForm, CreateUserCustomForm
from .utils import ExcelClass, LoggingClass, create_encrypted_password, link_callback, get_career, \
	find_near_point, get_vector_arr, generate_way, pyodbc_connect, decrypt_text_with_hash, create_arr_table


#  main
# local
def local(request):
	# logging
	DjangoClass.AuthorizationClass.access_to_page(
		request=request, logging=True)
	return redirect('http://192.168.1.68:8000/')


# admin
def admin_(request):
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request, logging=False))
	return render(request, admin.site.urls)


# home
def home(request):
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request, logging=False))
	return render(request, 'components/home.html')


# example
def example(request):
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request, logging=False))

	# try:
	if True:
		result = False
		data = False
		if request.method == 'POST':
			result = True
			data = [
				['Заголовок_1', 'Заголовок_2'],
				[
					['Тело_1_1', 'Тело_1_2'],
					['Тело_2_1', 'Тело_2_2'],
					['Тело_3_1', 'Тело_3_2'],
				]
			]
		context = {
			'result': result,
			'data': data,
			'form_1': ExampleForm,
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     # HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')
	#     context = {
	#         'result': False,
	#         'data' : False,
	#         'form_1': False,
	#     }
	return render(request, 'components/example.html', context)


#  account
# no check access (recursive)
def account_login(request):
	# logging
	DjangoClass.AuthorizationClass.access_to_page(
		request=request, logging=True)

	try:
		result = 0
		if request.method == 'POST':
			try:
				user = authenticate(
					username=DjangoClass.RequestClass.get_value(
						request, "username"),
					password=DjangoClass.RequestClass.get_value(
						request, "password")
				)
				if user:
					login(request, user)
					result = 1
				else:
					result = -1
			except Exception as error:
				result = -1
				DjangoClass.LoggingClass.logging_errors(
					request=request, error=error)
		context = {
			'result': result
		}
	except Exception as error:
		DjangoClass.LoggingClass.logging_errors(request=request, error=error)
		context = {
			'result': 0
		}
	return render(request, 'account/account_login.html', context)


def account_change_password(request):
	# logging
	DjangoClass.AuthorizationClass.access_to_page(
		request=request, logging=True)

	# try:
	if True:
		result = False
		if request.method == 'POST':
			user = User.objects.get(username=request.user.username)
			# User password data
			password_1 = DjangoClass.RequestClass.get_value(
				request, "password_1")
			password_2 = DjangoClass.RequestClass.get_value(
				request, "password_2")
			if password_1 == password_2 != '':
				user.profile.password = password_1
				user.password = password_1
				user.set_password(password_1)
			# Third data account
			if DjangoClass.RequestClass.get_value(request, "email"):
				user.profile.email = DjangoClass.RequestClass.get_value(
					request, "email")
			if DjangoClass.RequestClass.get_value(request, "secret_question"):
				user.profile.secret_question = DjangoClass.RequestClass.get_value(
					request, "secret_question")
			if DjangoClass.RequestClass.get_value(request, "secret_answer"):
				user.profile.secret_answer = DjangoClass.RequestClass.get_value(
					request, "secret_answer")
			user.save()
			result = True
		context = {
			'form_1': ChangePasswordForm,
			'result': result
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'form_1': False,
	#         'result': False
	#     }
	return render(request, 'account/account_change_password.html', context)


def account_recover_password(request, type_slug):
	# logging
	DjangoClass.AuthorizationClass.access_to_page(
		request=request, logging=True)

	# try:
	if True:
		form_1 = True
		result = False
		data = None
		if request.method == 'POST':
			user = User.objects.get(
				username=DjangoClass.RequestClass.get_value(request, "username"))
			if type_slug.lower() == 'none':
				try:
					form_1 = False
					data = user
				except Exception as error:
					DjangoClass.LoggingClass.logging_errors(
						request=request, error=error)
			elif type_slug.lower() == 'secret_answer':
				try:
					secret_answer = DjangoClass.RequestClass.get_value(
						request, "secret_answer")
					password1 = DjangoClass.RequestClass.get_value(
						request, "password1")
					password2 = DjangoClass.RequestClass.get_value(
						request, "password2")
					if user.profile.secret_answer.lower() == secret_answer.lower() and password1 == password2:
						user.profile.password = password1
						user.set_password(password1)
						user.save()
						result = True
				except Exception as error:
					DjangoClass.LoggingClass.logging_errors(
						request=request, error=error)
			elif type_slug.lower() == 'email':
				try:
					password = user.profile.password
					email = user.profile.email
					if password and email:
						subject = 'восстановление пароля от веб платформы'
						message_s = password
						from_email = 'eevee.cycle@yandex.ru'
						to_email = email
						if subject and message and to_email:
							try:
								send_mail(subject, message_s, from_email, [
									to_email, ''], fail_silently=False)
								result = True
							except Exception as error:
								DjangoClass.LoggingClass.logging_errors(
									request=request, error=error)
				except Exception as error:
					DjangoClass.LoggingClass.logging_errors(
						request=request, error=error)
		context = {
			'form_1': form_1,
			'result': result,
			'data': data
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'form_1': False,
	#         'result': False
	#         'data': False
	#     }
	return render(request, 'account/account_recover_password.html', context)


# All access
def account_logout(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request, logging=False))

	try:
		logout(request)
		return redirect('account_login')
	except Exception as error:
		DjangoClass.LoggingClass.logging_errors(request=request, error=error)
		redirect('account_login')


# User access
def account_change_profile(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		result_form = False
		if request.method == 'POST':
			user = User.objects.get(username=request.user.username)
			# Second data account
			if DjangoClass.RequestClass.get_value(request, "education"):
				user.profile.education = DjangoClass.RequestClass.get_value(
					request, "education")
			if DjangoClass.RequestClass.get_value(request, "achievements"):
				user.profile.achievements = DjangoClass.RequestClass.get_value(
					request, "achievements")
			if DjangoClass.RequestClass.get_value(request, "biography"):
				user.profile.biography = DjangoClass.RequestClass.get_value(
					request, "biography")
			if DjangoClass.RequestClass.get_file(request, 'image_avatar'):
				user.profile.image_avatar = DjangoClass.RequestClass.get_file(
					request, 'image_avatar')
			user.save()
			result_form = True
		context = {
			'form_1': ChangeUserForm,
			'result_form': result_form
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'form_1': False,
	#         'result_form': False
	#     }
	return render(request, 'account/account_change_profile.html', context)


def account_profile(request, username=None):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = None
		if request.method == 'POST':
			pass
		if username:
			data = User.objects.get(username=username)
		else:
			data = User.objects.get(username=request.user.username)
		context = {
			'data': data
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'account/account_profile.html', context)


# Superuser access
def account_create_accounts(request, quantity=1):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		result = False
		if request.method == 'POST':
			try:
				force_change_1 = request.POST['check_1']
				force_change_1 = True
			except Exception as ex:
				force_change_1 = False
			try:
				force_change_2 = request.POST['check_2']
				force_change_2 = True
				print(force_change_2)
			except Exception as ex:
				force_change_2 = False
			if force_change_1 or force_change_2:
				force_change = True
			else:
				force_change = False
			user_objects = []
			# Проверка количества создания аккаунтов
			if quantity > 1:
				# Создание массива объектов аккаунтов из excel-шаблона
				# try:
				if True:
					excel_file = request.FILES.get('document_addition_file_1')
					if excel_file:
						workbook = ExcelClass.workbook_load(excel_file)
						sheet = ExcelClass.workbook_activate(workbook)
						max_num_rows = ExcelClass.get_max_num_rows(sheet)
						for num in range(2, max_num_rows + 1):
							username = ExcelClass.get_sheet_value(
								'A', num, sheet)
							password = ExcelClass.get_sheet_value(
								'B', num, sheet)
							email = ExcelClass.get_sheet_value('C', num, sheet)
							first_name = ExcelClass.get_sheet_value(
								'D', num, sheet)
							last_name = ExcelClass.get_sheet_value(
								'E', num, sheet)
							is_active = ExcelClass.get_sheet_value(
								'F', num, sheet).lower()
							if is_active == 'true':
								is_active = True
							else:
								is_active = False
							is_staff = ExcelClass.get_sheet_value(
								'G', num, sheet).lower()
							if is_staff == 'true':
								is_staff = True
							else:
								is_staff = False
							groups = ExcelClass.get_sheet_value(
								'H', num, sheet)
							patronymic = ExcelClass.get_sheet_value(
								'I', num, sheet)
							personnel_number = ExcelClass.get_sheet_value(
								'J', num, sheet)
							subdivision = ExcelClass.get_sheet_value(
								'K', num, sheet)
							workshop_service = ExcelClass.get_sheet_value(
								'L', num, sheet)
							department_site = ExcelClass.get_sheet_value(
								'M', num, sheet)
							position = ExcelClass.get_sheet_value(
								'N', num, sheet)
							category = ExcelClass.get_sheet_value(
								'O', num, sheet)
							if username and password:
								account_auth_obj = DjangoClass.AccountClass.UserAuthClass(
									# Основное
									username=username,
									password=password,

									# Персональная информация
									first_name=first_name,
									last_name=last_name,
									email=email,

									# Права доступа
									is_active=is_active,
									is_staff=is_staff,
									is_superuser=False,
									groups=groups,

									# Настройки создания аккаунта
									force_change_account=force_change,
									force_change_account_password=force_change,
									force_clear_groups=force_change
								)
								account_profile_first_obj = DjangoClass.AccountClass.UserProfileClass(
									# Основное
									username=username,

									# Персональная информация
									user_iin=username,
									first_name=first_name,
									last_name=last_name,
									patronymic=patronymic,
									personnel_number=personnel_number,

									# First data account
									subdivision=subdivision,
									workshop_service=workshop_service,
									department_site=department_site,
									position=position,
									category=category,
								)
								user_objects.append(
									[account_auth_obj, account_profile_first_obj])
				# except Exception as error:
				#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
			else:
				# Создание массива объектов аккаунтов из одиночной формы
				# try:
				if True:
					username = DjangoClass.RequestClass.get_value(
						request, 'username')
					print('\n ***** ***** \n')
					print(f'username: {username}')
					# user model
					password_1 = DjangoClass.RequestClass.get_value(
						request, 'password_1')
					print('\n ***** ***** \n')
					print(f'password_1: {password_1}')

					password_2 = DjangoClass.RequestClass.get_value(
						request, 'password_2')
					print('\n ***** ***** \n')
					print(f'password_2: {password_2}')

					if password_1 == password_2:
						first_name = DjangoClass.RequestClass.get_value(
							request, 'first_name')
						print('\n ***** ***** \n')
						print(f'first_name: {first_name}')

						last_name = DjangoClass.RequestClass.get_value(
							request, 'last_name')
						print('\n ***** ***** \n')
						print(f'last_name: {last_name}')

						email = DjangoClass.RequestClass.get_value(
							request, 'email')
						print('\n ***** ***** \n')
						print(f'email: {email}')

						is_active = DjangoClass.RequestClass.get_check(
							request, 'is_active')
						print('\n ***** ***** \n')
						print(f'is_active: {is_active}')

						is_staff = DjangoClass.RequestClass.get_check(
							request, 'is_staff')
						print('\n ***** ***** \n')
						print(f'is_staff: {is_staff}')

						groups = DjangoClass.RequestClass.get_value(
							request, 'groups')
						print('\n ***** ***** \n')
						print(f'groups: {groups}')

						# profile model
						patronymic = DjangoClass.RequestClass.get_value(
							request, 'patronymic')
						print('\n ***** ***** \n')
						print(f'patronymic: {patronymic}')

						personnel_number = DjangoClass.RequestClass.get_value(
							request, 'personnel_number')
						print('\n ***** ***** \n')
						print(f'personnel_number: {personnel_number}')

						subdivision = DjangoClass.RequestClass.get_value(
							request, 'subdivision')
						print('\n ***** ***** \n')
						print(f'subdivision: {subdivision}')

						workshop_service = DjangoClass.RequestClass.get_value(
							request, 'workshop_service')
						print('\n ***** ***** \n')
						print(f'workshop_service: {workshop_service}')

						department_site = DjangoClass.RequestClass.get_value(
							request, 'department_site')
						print('\n ***** ***** \n')
						print(f'department_site: {department_site}')

						position = DjangoClass.RequestClass.get_value(
							request, 'position')
						print('\n ***** ***** \n')
						print(f'position: {position}')

						category = DjangoClass.RequestClass.get_value(
							request, 'category')
						print('\n ***** ***** \n')
						print(f'category: {category}')

						# utils
						is_edit = DjangoClass.RequestClass.get_check(
							request, 'is_edit')
						print('\n ***** ***** \n')
						print(f'is_edit: {is_edit}')

						account_auth_obj = DjangoClass.AccountClass.UserAuthClass(
							# Основное
							username=username,
							password=password_1,

							# Персональная информация
							first_name=first_name,
							last_name=last_name,
							email=email,

							# Права доступа
							is_active=is_active,
							is_staff=is_staff,
							is_superuser=False,
							groups=groups,

							# Настройки создания аккаунта
							force_change_account=is_edit,
							force_change_account_password=is_edit,
							force_clear_groups=is_edit
						)
						account_profile_first_obj = DjangoClass.AccountClass.UserProfileClass(
							# Основное
							username=username,

							# Персональная информация
							user_iin=username,
							first_name=first_name,
							last_name=last_name,
							patronymic=patronymic,
							personnel_number=personnel_number,

							# First data account
							subdivision=subdivision,
							workshop_service=workshop_service,
							department_site=department_site,
							position=position,
							category=category,
						)
						user_objects.append(
							[account_auth_obj, account_profile_first_obj])
				# except Exception as error:
				#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
			# Создание аккаунтов и доп данных для аккаунтов
			success = True
			for user_object in user_objects:
				# try:
				if True:
					account_auth_obj = user_object[0].account_auth_create_or_change(
					)
					account_profile_first_obj = user_object[1].profile_first_change(
					)
					if account_auth_obj is False or account_profile_first_obj is False:
						success = False
				# except Exception as error:
				#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
				#     success = False
			result = success
		groups = Group.objects.all()
		context = {
			'form_1': CreateUserForm,
			'form_3': CreateUserCustomForm,
			'form_2': CreateUsersForm,
			'result': result,
			'groups': groups,
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'form_1': False,
	#         'form_2': False,
	#         'result': False
	#     }
	return render(request, 'account/account_create_accounts.html', context)


def account_export_accounts(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = None
		if request.method == 'POST':
			workbook = ExcelClass.workbook_create()
			sheet = ExcelClass.workbook_activate(workbook)
			user_objects = User.objects.all().order_by('id')
			titles = ['Имя пользователя', 'Пароль', 'Почта', 'Имя', 'Фамилия', 'Активность', 'Доступ к модерации',
					  'Группы', 'Отчество', 'Табельный номер', 'Подразделение', 'Цех/Служба', 'Отдел/Участок',
					  'Должность', 'Категория']
			for char in 'ABCDEFGHIJKLMNO':
				ExcelClass.set_sheet_value(
					col=char, row=1, value=titles['ABCDEFGHIJKLMNO'.index(char)], sheet=sheet)
			index = 1
			for user_object in user_objects:
				if User.objects.get(username=user_object.username).is_superuser:
					continue
				try:
					index += 1
					ExcelClass.set_sheet_value(
						col='A', row=index, value=user_object.username, sheet=sheet)
					ExcelClass.set_sheet_value(
						col='B', row=index, value=user_object.profile.password, sheet=sheet)
					ExcelClass.set_sheet_value(
						col='C', row=index, value=user_object.email, sheet=sheet)
					ExcelClass.set_sheet_value(
						col='D', row=index, value=user_object.profile.first_name, sheet=sheet)
					ExcelClass.set_sheet_value(
						col='E', row=index, value=user_object.profile.last_name, sheet=sheet)

					if user_object.is_active:
						ExcelClass.set_sheet_value(
							col='F', row=index, value='true', sheet=sheet)
					else:
						ExcelClass.set_sheet_value(
							col='F', row=index, value='false', sheet=sheet)

					if user_object.is_staff:
						ExcelClass.set_sheet_value(
							col='G', row=index, value='true', sheet=sheet)
					else:
						ExcelClass.set_sheet_value(
							col='G', row=index, value='false', sheet=sheet)

					groups = Group.objects.filter(user=user_object)
					group_list = ''
					for group in groups:
						if len(str(group.name)) > 1:
							group_list += f", {group.name}"

					ExcelClass.set_sheet_value(
						col='H', row=index, value=group_list[2:], sheet=sheet)
					ExcelClass.set_sheet_value(
						col='I', row=index, value=user_object.profile.patronymic, sheet=sheet)
					ExcelClass.set_sheet_value(col='J', row=index, value=user_object.profile.personnel_number,
											   sheet=sheet)
					ExcelClass.set_sheet_value(
						col='K', row=index, value=user_object.profile.subdivision, sheet=sheet)
					ExcelClass.set_sheet_value(col='L', row=index, value=user_object.profile.workshop_service,
											   sheet=sheet)
					ExcelClass.set_sheet_value(col='M', row=index, value=user_object.profile.department_site,
											   sheet=sheet)
					ExcelClass.set_sheet_value(
						col='N', row=index, value=user_object.profile.position, sheet=sheet)
					ExcelClass.set_sheet_value(
						col='O', row=index, value=user_object.profile.category, sheet=sheet)
				except Exception as ex:
					pass
			body = []
			for user_object in user_objects:
				if User.objects.get(username=user_object.username).is_superuser:
					continue

				if user_object.is_active:
					is_active = True
				else:
					is_active = False

				if user_object.is_staff:
					is_staff = True
				else:
					is_staff = False

				groups = Group.objects.filter(user=user_object)
				group_list = ''
				for group in groups:
					if len(str(group.name)) > 1:
						group_list += f", {group.name}"

				body.append([user_object.username, user_object.profile.password, user_object.email,
							 user_object.profile.first_name, user_object.profile.last_name, is_active, is_staff,
							 group_list[2:], user_object.profile.patronymic, user_object.profile.personnel_number,
							 user_object.profile.subdivision, user_object.profile.workshop_service,
							 user_object.profile.department_site, user_object.profile.position,
							 user_object.profile.category])
				data = [titles, body]
			ExcelClass.workbook_save(
				workbook=workbook, filename='static/media/data/account/export_users.xlsx')
			result = True
		else:
			result = False
		context = {
			'data': data,
			'result': result
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False,
	#         'result': False
	#     }
	return render(request, 'account/account_export_accounts.html', context)


def account_generate_passwords(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		result = None
		data = None
		if request.method == 'POST':
			passwords_quantity = int(request.POST['passwords_quantity'])
			passwords_chars = str(request.POST['passwords_chars'])
			passwords_length = int(request.POST['passwords_length'])
			wb = openpyxl.Workbook()
			sheet = wb.active
			titles = ['Пароль', 'Зашифрованный Пароль']
			for char in 'AB':
				sheet[f'{char}1'] = titles['AB'.index(char)]
			body = []
			for n in range(2, passwords_quantity + 2):
				password = create_encrypted_password(
					_random_chars=passwords_chars, _length=passwords_length)
				encrypt_password = DjangoClass.AccountClass.create_django_encrypt_password(
					password)
				sheet[f'A{n}'] = password
				sheet[f'B{n}'] = encrypt_password
				body.append([password, encrypt_password])
			wb.save('static/media/data/account/generate_passwords.xlsx')
			data = [titles, body]
			result = True
		context = {
			'data': data,
			'form_1': GeneratePasswordsForm,
			'result': result
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False,
	#         'form_1': False,
	#         'result': False
	#     }
	return render(request, 'account/account_generate_passwords.html', context)


def account_update_accounts_1c(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = None
		form_1 = None
		result = None
		if request.method == 'POST':
			key = create_encrypted_password(
				_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
				_length=10)
			hash_key_obj = hashlib.sha256()
			hash_key_obj.update(key.encode('utf-8'))
			key_hash = str(hash_key_obj.hexdigest().strip().upper())
			key_hash_base64 = base64.b64encode(str(key_hash).encode()).decode()
			date = datetime.datetime.now().strftime("%Y%m%d")
			date_base64 = base64.b64encode(str(date).encode()).decode()
			url = f'http://192.168.1.10/KM_1C/hs/iden/change/{date_base64}_{key_hash_base64}'
			relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
			h = httplib2.Http(
				relative_path + "\\static\\media\\data\\temp\\get_users")
			login = 'Web_adm_1c'
			password = '159159qqww!'
			h.add_credentials(login, password)
			try:
				response, content = h.request(url)
			except Exception as error:
				DjangoClass.LoggingClass.logging_errors(
					request=request, error=error)
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
					# try:
					if True:
						json_data = json.loads(decrypt_text_with_hash(
							content.decode()[1:], key_hash))
						with open("static/media/data/accounts.json", "w", encoding="utf-8") as file:
							json.dump(decrypt_text_with_hash(
								content.decode()[1:], key_hash), file)
						success_web_read = True
					# except Exception as error:
					#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
			if success_web_read is False:
				print('read temp file')
				with open("static/media/data/accounts_temp.json", "r", encoding="utf-8") as file:
					json_data = json.load(file)

			# Генерация объектов для создания аккаунтов
			titles_1c = ['Период', 'Статус', 'ИИН', 'Фамилия', 'Имя', 'Отчество', 'ТабельныйНомер', 'Подразделение',
						 'Цех_Служба', 'Отдел_Участок', 'Должность', 'Категория']
			user_objects = []
			for user in json_data["global_objects"]:
				username = json_data["global_objects"][user]["ИИН"]
				# status = json_data["global_objects"][user]["ИИН"]
				password = create_encrypted_password(_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
													 _length=10)
				email = ''
				first_name = json_data["global_objects"][user]["Имя"]
				last_name = json_data["global_objects"][user]["Фамилия"]

				if json_data["global_objects"][user]["Статус"] == 'created' or \
						json_data["global_objects"][user]["Статус"] == 'changed':
					is_active = True
				else:
					is_active = False
				is_staff = False
				groups = 'User'
				patronymic = json_data["global_objects"][user]["Отчество"]
				personnel_number = json_data["global_objects"][user]["ТабельныйНомер"]
				subdivision = json_data["global_objects"][user]["Подразделение"]
				workshop_service = json_data["global_objects"][user]["Цех_Служба"]
				department_site = json_data["global_objects"][user]["Отдел_Участок"]
				position = json_data["global_objects"][user]["Должность"]
				category = json_data["global_objects"][user]["Категория"]
				account_auth_obj = DjangoClass.AccountClass.UserAuthClass(
					# Основное
					username=username,
					password=password,

					# Персональная информация
					first_name=first_name,
					last_name=last_name,
					email=email,

					# Права доступа
					is_active=is_active,
					is_staff=is_staff,
					is_superuser=False,
					groups=groups,

					# Настройки создания аккаунта
					force_change_account=True,
					force_change_account_password=False,
					force_clear_groups=False
				)
				account_profile_first_obj = DjangoClass.AccountClass.UserProfileClass(
					# Основное
					username=username,

					# Персональная информация
					user_iin=username,
					first_name=first_name,
					last_name=last_name,
					patronymic=patronymic,
					personnel_number=personnel_number,

					# First data account
					subdivision=subdivision,
					workshop_service=workshop_service,
					department_site=department_site,
					position=position,
					category=category,
				)
				user_objects.append(
					[account_auth_obj, account_profile_first_obj])

			# Создание аккаунтов и доп данных для аккаунтов
			result = True
			for user_object in user_objects:
				# try:
				if True:
					account_auth_obj = user_object[0].account_auth_create_or_change(
					)
					account_profile_first_obj = user_object[1].profile_first_change(
					)
					if account_auth_obj is False or account_profile_first_obj is False:
						result = False
				# except Exception as error:
				#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
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
		context = {
			'data': data,
			'form_1': form_1,
			'result': result
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False,
	#         'form_1': False,
	#         'result': False
	#     }
	return render(request, 'account/account_update_accounts_1c.html', context)


#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# application
def list_module(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = ApplicationModuleModel.objects.order_by('module_position')
		context = {
			'data': data,
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'app_km/list_module.html', context)


def list_component(request, module_slug=None):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		if module_slug is not None:
			module = ApplicationModuleModel.objects.get(
				module_slug=module_slug)
			data = ApplicationComponentModel.objects.filter(
				component_Foreign=module).order_by('component_position')
		else:
			return redirect('list_module')
		context = {
			'data': data,
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'app_km/list_component.html', context)


#
#
#
#
#
#
#
#
#
#
#  ideas
# All access
def ideas_create(request):  # create idea
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		result_form = False
		if request.method == 'POST':
			IdeasModel.objects.create(
				user=User.objects.get(username=request.user.username),
				name=DjangoClass.RequestClass.get_value(request, "name"),
				category=IdeasCategoryModel.objects.get(
					id=DjangoClass.RequestClass.get_value(request, "category")),
				short_description=DjangoClass.RequestClass.get_value(
					request, "short_description"),
				long_description=DjangoClass.RequestClass.get_value(
					request, "long_description"),
				image=DjangoClass.RequestClass.get_file(request, "image"),
				document=DjangoClass.RequestClass.get_file(request, "document")
			)
			result_form = True
		context = {
			'form_1': BankIdeasForm,
			'result_form': result_form
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'form_1': False,
	#         'result_form': False
	#     }
	return render(request, 'ideas/ideas_create.html', context)


def ideas_list(request, category_slug='All'):  # list ideas
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		if request.method == 'POST':
			ideas = IdeasModel.objects.filter(
				name__icontains=DjangoClass.RequestClass.get_value(
					request, "search_text")
			).order_by('-id')
		else:
			if category_slug.lower() == 'all':
				ideas = IdeasModel.objects.filter(status=True).order_by('-id')
			else:
				ideas = IdeasModel.objects.filter(
					status=True,
					category=IdeasCategoryModel.objects.get(
						category_slug=category_slug)
				)

		page = PaginationClass.paginate(
			request=request, objects=ideas, num_page=2)
		category = IdeasCategoryModel.objects.order_by('id')
		context = {
			'page': page,
			'category': category
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'page': False,
	#         'category': False
	#     }
	return render(request, 'ideas/ideas_list.html', context)


def ideas_rating(request):  # ratings by posts ideas
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		idea = IdeasModel.objects.order_by('-id')
		authors = []
		for query in idea:
			authors.append(query.user)
		users_dict = {}
		for author in authors:
			users_dict[author] = authors.count(author)
		user_counts = []
		for blog_s in users_dict:
			rationals = IdeasModel.objects.filter(user=blog_s)
			total_rating = 0
			for rating in rationals:
				total_like = IdeasLikeModel.objects.filter(
					like_idea=rating, like_status=True).count()
				total_dislike = IdeasLikeModel.objects.filter(
					like_idea=rating, like_status=False).count()
				total_rating += total_like - total_dislike
			user_counts.append(
				{'user': blog_s, 'count': users_dict[blog_s], 'rating': total_rating})
		sorted_by_rating = True
		if request.method == 'POST':
			if request.POST['sorted'] == 'rating':
				sorted_by_rating = True
			if request.POST['sorted'] == 'count':
				sorted_by_rating = False
		if sorted_by_rating:
			page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
		else:
			page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
		context = {
			'page': page,
			'sorted': sorted_by_rating
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'ideas/ideas_ratings.html', context)


def ideas_view(request, ideas_int=0):  # view idea
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = IdeasModel.objects.get(id=ideas_int)
		comments = IdeasCommentModel.objects.filter(
			comment_idea=data).order_by('-id')
		context = {
			'data': data,
			'comments': comments
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'ideas/ideas_view.html', context)


# User access
def ideas_comment(request, ideas_int=0):  # comment
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		if request.method == 'POST':
			IdeasCommentModel.objects.create(comment_author=User.objects.get(id=request.user.id),
											 comment_idea=IdeasModel.objects.get(
				id=ideas_int),
				comment_text=request.POST['comment_text'])
		else:
			pass
		# except Exception as error:
		#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
		#     context = {
		#         'data': False
		#     }
		return redirect(reverse('ideas_view', args=(ideas_int,)))


def ideas_like(request, ideas_int=0):  # likes
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		idea = IdeasModel.objects.get(id=ideas_int)
		user = User.objects.get(id=request.user.id)
		if request.POST['status'] == 'like':
			IdeasLikeModel.objects.get_or_create(
				like_author=user, like_idea=idea, like_status=True)
			try:
				IdeasLikeModel.objects.get(
					like_author=user, like_idea=idea, like_status=False).delete()
			except Exception as ex:
				pass
		else:
			IdeasLikeModel.objects.get_or_create(
				like_author=user, like_idea=idea, like_status=False)
			try:
				IdeasLikeModel.objects.get(
					like_author=user, like_idea=idea, like_status=True).delete()
			except Exception as ex:
				pass
		# except Exception as error:
		#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
		#     context = {
		#         'data': False
		#     }
		return redirect(reverse('ideas_view', args=(idea.id,)))


# Moderator access
def ideas_change(request, ideas_int=0):  # change idea
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='All'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = IdeasModel.objects.get(id=ideas_int)
		result_form = False
		if request.method == 'POST':

			if request.POST["name"]:
				data.name = request.POST["name"]
			if request.POST["category"]:
				data.category = IdeasCategoryModel.objects.get(
					id=request.POST["category"])
			if request.POST["short_description"]:
				data.short_description = request.POST["short_description"]
			if request.POST["long_description"]:
				data.long_description = request.POST["long_description"]
			if request.FILES["image"]:
				data.image = request.FILES["image"]
			if request.FILES["document"]:
				data.document = request.FILES["document"]

			data.save()
			result_form = True
		context = {
			'form_1': BankIdeasForm,
			'data': data,
			'result_form': result_form
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False
	#     }
	return render(request, 'ideas/ideas_change.html', context)


#
#
#
#
#
#
#
#
#
#
# salary
def salary(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		data = None
		result_form = False
		if request.method == 'POST':
			key = create_encrypted_password(
				_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
				_length=10)
			print('\n ***************** \n')
			print(f"key: {key}")
			hash_key_obj = hashlib.sha256()
			hash_key_obj.update(key.encode('utf-8'))
			key_hash = str(hash_key_obj.hexdigest().strip().upper())
			print('\n ***************** \n')
			print(f"key_hash: {key_hash}")
			key_hash_base64 = base64.b64encode(str(key_hash).encode()).decode()
			print('\n ***************** \n')
			print(f"key_hash_base64: {key_hash_base64}")

			iin = request.user.username
			if str(request.user.username).lower() == 'bogdan':
				iin = 970801351179
			print('\n ***************** \n')
			print(f"iin: {iin}")
			iin_base64 = base64.b64encode(str(iin).encode()).decode()
			print('\n ***************** \n')
			print(f"iin_base64: {iin_base64}")
			print('\n ***************** \n')

			month = request.POST["month"]
			if int(month) < 10:
				month = f'0{month}'
			year = str(request.POST["year"])
			date = f'{year}{month}'
			print(f"date: {date}")
			date_base64 = base64.b64encode(str(date).encode()).decode()
			print('\n ***************** \n')
			print(f"date_base64: {date_base64}")

			# url = f'http://192.168.1.158/Tanya_perenos/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
			url = f'http://192.168.1.10/KM_1C/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
			print('\n ***************** \n')
			print(f"url: {url}")

			relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
			h = httplib2.Http(
				relative_path + "\\static\\media\\data\\temp\\get_salary_data")
			login = 'Web_adm_1c'
			password = '159159qqww!'
			h.add_credentials(login, password)
			try:
				response, content = h.request(url)
			except Exception as error:
				DjangoClass.LoggingClass.logging_errors(
					request=request, error=error)
				content = None
			success_web_read = False
			if content:

				print('\n ***************** \n')
				print(f"content: {content}")

				print('\n ***************** \n')
				print(f"content_utf: {content.decode()}")

				content_decrypt = decrypt_text_with_hash(content.decode(encoding='UTF-8', errors='strict')[1:],
														 key_hash)
				print('\n ***************** \n')
				print(f"content_decrypt: {content_decrypt}")

				success = True
				error_word_list = ['Ошибка', 'ошибка',
								   'Error', 'error', 'Failed', 'failed']
				for error_word in error_word_list:
					if str(content.decode()).find(error_word) >= 0:
						success = False
				if success:
					try:
						json_data = json.loads(decrypt_text_with_hash(
							content.decode()[1:], key_hash))
						with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
							encode_data = json.dumps(
								json_data, ensure_ascii=False)
							json.dump(encode_data, file, ensure_ascii=False)
						success_web_read = True
					except Exception as ex:
						pass
			if success_web_read is False:
				print('read temp file')
				with open("static/media/data/zarplata_temp.json", "r", encoding="utf-8") as file:
					json_data = json.load(file)

			print('\n ***************** \n')
			print(f"json_data: {json_data}")
			print('\n ***************** \n')

			try:
				json_data["global_objects"]["3.Доходы в натуральной форме"]
			except Exception as ex:
				json_data["global_objects"]["3.Доходы в натуральной форме"] = {
					"Fields": {
						"1": "Вид",
						"2": "Период",
						"3": "Дни",
						"4": "Часы",
						"5": "Сумма",
						"6": "ВсегоДни",
						"7": "ВсегоЧасы"
					},
				}

			data = {
				"Table_1": create_arr_table(
					title="1.Начислено", footer="Всего начислено", json_obj=json_data["global_objects"]["1.Начислено"],
					exclude=[5, 6]
				),
				"Table_2": create_arr_table(
					title="2.Удержано", footer="Всего удержано", json_obj=json_data["global_objects"]["2.Удержано"],
					exclude=[]
				),
				"Table_3": create_arr_table(
					title="3.Доходы в натуральной форме", footer="Всего натуральных доходов",
					json_obj=json_data["global_objects"]["3.Доходы в натуральной форме"], exclude=[
					]
				),
				"Table_4": create_arr_table(
					title="4.Выплачено", footer="Всего выплат", json_obj=json_data["global_objects"]["4.Выплачено"],
					exclude=[]
				),
				"Table_5": create_arr_table(
					title="5.Налоговые вычеты", footer="Всего вычеты",
					json_obj=json_data["global_objects"]["5.Налоговые вычеты"],
					exclude=[]
				),
				"Down": {
					"first": ["Долг за организацией на начало месяца",
							  json_data["Долг за организацией на начало месяца"]],
					"last": ["Долг за организацией на конец месяца", json_data["Долг за организацией на конец месяца"]],
				},
			}
			result_form = True
		context = {
			'data': data,
			'result_form': result_form
		}
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     context = {
	#         'data': False,
	#         'result_form': False
	#     }
	return render(request, 'app_km/salary.html', context)


def render_pdf_view(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	# try:
	if True:
		template_path = 'app_km/pdf.html'
		key = create_encrypted_password(_random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
										_length=10)
		print('\n ***************** \n')
		print(f"key: {key}")
		hash_key_obj = hashlib.sha256()
		hash_key_obj.update(key.encode('utf-8'))
		key_hash = str(hash_key_obj.hexdigest().strip().upper())
		print('\n ***************** \n')
		print(f"key_hash: {key_hash}")
		key_hash_base64 = base64.b64encode(str(key_hash).encode()).decode()
		print('\n ***************** \n')
		print(f"key_hash_base64: {key_hash_base64}")

		iin = request.user.username
		if str(request.user.username).lower() == 'bogdan':
			iin = 970801351179
		print('\n ***************** \n')
		print(f"iin: {iin}")
		iin_base64 = base64.b64encode(str(iin).encode()).decode()
		print('\n ***************** \n')
		print(f"iin_base64: {iin_base64}")
		print('\n ***************** \n')

		month = 10
		if int(month) < 10:
			month = f'0{month}'
		year = 2021
		date = f'{year}{month}'
		print(f"date: {date}")
		date_base64 = base64.b64encode(str(date).encode()).decode()
		print('\n ***************** \n')
		print(f"date_base64: {date_base64}")

		# url = f'http://192.168.1.158/Tanya_perenos/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
		url = f'http://192.168.1.10/KM_1C/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
		print('\n ***************** \n')
		print(f"url: {url}")

		relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
		h = httplib2.Http(
			relative_path + "\\static\\media\\data\\temp\\get_salary_data")
		login = 'Web_adm_1c'
		password = '159159qqww!'
		h.add_credentials(login, password)
		try:
			response, content = h.request(url)
		except Exception as error:
			DjangoClass.LoggingClass.logging_errors(
				request=request, error=error)
			content = None
		success_web_read = False
		if content:

			print('\n ***************** \n')
			print(f"content: {content}")

			print('\n ***************** \n')
			print(f"content_utf: {content.decode()}")

			content_decrypt = decrypt_text_with_hash(content.decode(
				encoding='UTF-8', errors='strict')[1:], key_hash)
			print('\n ***************** \n')
			print(f"content_decrypt: {content_decrypt}")

			success = True
			error_word_list = ['Ошибка', 'ошибка',
							   'Error', 'error', 'Failed', 'failed']
			for error_word in error_word_list:
				if str(content.decode()).find(error_word) >= 0:
					success = False
			if success:
				try:
					json_data = json.loads(decrypt_text_with_hash(
						content.decode()[1:], key_hash))
					with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
						encode_data = json.dumps(json_data, ensure_ascii=False)
						json.dump(encode_data, file, ensure_ascii=False)
					success_web_read = True
				except Exception as ex:
					pass
		if success_web_read is False:
			print('read temp file')
			with open("static/media/data/zarplata_temp.json", "r", encoding="utf-8") as file:
				json_data = json.load(file)

		print('\n ***************** \n')
		print(f"json_data: {json_data}")
		print('\n ***************** \n')

		try:
			json_data["global_objects"]["3.Доходы в натуральной форме"]
		except Exception as ex:
			json_data["global_objects"]["3.Доходы в натуральной форме"] = {
				"Fields": {
					"1": "Вид",
					"2": "Период",
					"3": "Дни",
					"4": "Часы",
					"5": "Сумма",
					"6": "ВсегоДни",
					"7": "ВсегоЧасы"
				},
			}

		data = {
			"Table_1": create_arr_table(
				title="1.Начислено", footer="Всего начислено", json_obj=json_data["global_objects"]["1.Начислено"],
				exclude=[5, 6]
			),
			"Table_2": create_arr_table(
				title="2.Удержано", footer="Всего удержано", json_obj=json_data["global_objects"]["2.Удержано"],
				exclude=[]
			),
			"Table_3": create_arr_table(
				title="3.Доходы в натуральной форме", footer="Всего натуральных доходов",
				json_obj=json_data["global_objects"]["3.Доходы в натуральной форме"], exclude=[
				]
			),
			"Table_4": create_arr_table(
				title="4.Выплачено", footer="Всего выплат", json_obj=json_data["global_objects"]["4.Выплачено"],
				exclude=[]
			),
			"Table_5": create_arr_table(
				title="5.Налоговые вычеты", footer="Всего вычеты",
				json_obj=json_data["global_objects"]["5.Налоговые вычеты"],
				exclude=[]
			),
			"Down": {
				"first": ["Долг за организацией на начало месяца", json_data["Долг за организацией на начало месяца"]],
				"last": ["Долг за организацией на конец месяца", json_data["Долг за организацией на конец месяца"]],
			},
		}
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
		# if error then show some funny view
		if pisa_status.err:
			return HttpResponse('We had some errors <pre>' + html + '</pre>')
	# except Exception as error:
	#     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
	#     response = None
	return response


# extra
def passages_thermometry(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	data = None
	if request.method == 'POST':
		personid = str(request.POST['personid'])
		date_start = str(request.POST['date_start']).split('T')[0]
		date_end = str(request.POST['date_end']).split('T')[0]
		connect_db = pyodbc_connect()
		cursor = connect_db.cursor()
		cursor.fast_executemany = True
		try:
			check = request.POST['check']
			sql_select_query = f"SELECT * " \
				f"FROM dbtable " \
				f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' AND personid = '{personid}' AND CAST(temperature AS FLOAT) >= 37.0 " \
				f"ORDER BY date1 DESC, date2 DESC;"
		except Exception as ex:
			sql_select_query = f"SELECT * " \
				f"FROM dbtable " \
				f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' AND CAST(temperature AS FLOAT) >= 37.0 " \
				f"ORDER BY date1 DESC, date2 DESC;"
		cursor.execute(sql_select_query)
		data = cursor.fetchall()
		bodies = []
		for row in data:
			local_bodies = []
			value_index = 0
			for val in row:
				if value_index == 4:
					try:
						val = val.encode('1251').decode('utf-8')
					except Exception as ex_1:
						try:
							value = str(val).split(" ")
							try:
								name = value[0].encode('1251').decode('utf-8')
							except Exception as ex:
								name = "И" + \
									value[0][2:].encode('1251').decode('utf-8')
							try:
								surname = value[1].encode(
									'1251').decode('utf-8')
							except Exception as ex:
								surname = "И" + \
									value[1][2:].encode('1251').decode('utf-8')
							string = name + " " + surname
							val = string
						except Exception as ex_2:
							pass
				value_index += 1
				local_bodies.append(val)
			bodies.append(local_bodies)
		headers = ["табельный", "доступ", "дата", "время", "данные",
				   "точка", "номер карты", "температура", "маска"]
		data = [headers, bodies]
	context = {
		'data': data,
	}
	return render(request, 'skud/passages_thermometry.html', context)


def passages_select(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	data = None
	if request.method == 'POST':
		personid = str(request.POST['personid'])
		connect_db = pyodbc_connect()
		cursor = connect_db.cursor()
		cursor.fast_executemany = True
		try:
			check = request.POST['check']
			date = str(request.POST['date']).split('T')[0]
			time = str(request.POST['date']).split('T')[1]
			sql_select_query = f"SELECT * " \
				f"FROM dbtable " \
				f"WHERE date1 = '{date}' AND date2 BETWEEN '{time}:00' AND '{time}:59' AND personid = '{personid}' " \
				f"ORDER BY date1 DESC, date2 DESC;"
		except Exception as ex:
			sql_select_query = f"SELECT * " \
				f"FROM dbtable " \
				f"WHERE date1 BETWEEN '2021-07-30' AND '2023-12-31' AND personid = '{personid}' " \
				f"ORDER BY date1 DESC, date2 DESC;"
		cursor.execute(sql_select_query)
		data = cursor.fetchall()
		bodies = []
		for row in data:
			local_bodies = []
			value_index = 0
			for val in row:
				if value_index == 4:
					try:
						val = val.encode('1251').decode('utf-8')
					except Exception as ex_1:
						try:
							value = str(val).split(" ")
							try:
								name = value[0].encode('1251').decode('utf-8')
							except Exception as ex:
								name = "И" + \
									value[0][2:].encode('1251').decode('utf-8')
							try:
								surname = value[1].encode(
									'1251').decode('utf-8')
							except Exception as ex:
								surname = "И" + \
									value[1][2:].encode('1251').decode('utf-8')
							string = name + " " + surname
							val = string
						except Exception as ex_2:
							pass
				value_index += 1
				local_bodies.append(val)
			bodies.append(local_bodies)
		headers = ["табельный", "доступ", "дата", "время", "данные",
				   "точка", "номер карты", "температура", "маска"]
		data = [headers, bodies]
	context = {
		'data': data,
	}
	return render(request, 'skud/passages_select.html', context)


def passages_update(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	data = None
	if request.method == 'POST':
		personid_old = request.POST['personid_old']
		date_old = str(request.POST['datetime_old']).split('T')[0]
		time_old = str(request.POST['datetime_old']).split('T')[1]
		date_new = str(request.POST['datetime_new']).split('T')[0]
		time_new = str(request.POST['datetime_new']).split('T')[1] + ':00'
		accessdateandtime_new = date_new + 'T' + time_new
		connect_db = pyodbc_connect()
		cursor = connect_db.cursor()
		cursor.fast_executemany = True
		value = f"UPDATE dbtable SET accessdateandtime = '{accessdateandtime_new}', date1 = '{date_new}', date2 = '{time_new}' " \
				f"WHERE date1 = '{date_old}' AND date2 BETWEEN '{time_old}:00' AND '{time_old}:59' AND personid = '{personid_old}' "
		cursor.execute(value)
		connect_db.commit()
	context = {
		'data': data,
	}
	return render(request, 'skud/passages_update.html', context)


def passages_insert(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	data = None
	if request.method == 'POST':
		personid = request.POST['personid']
		date = str(request.POST['datetime']).split('T')[0]
		time = str(request.POST['datetime']).split('T')[1] + ':00'
		accessdateandtime = date + 'T' + time
		devicename = str(request.POST['devicename'])
		cardno = str(request.POST['cardno'])
		temperature = str(request.POST['temperature'])
		if temperature == '0':
			temperature = ''
		mask = str(request.POST['mask'])
		try:
			connect_db = pyodbc_connect()
			cursor = connect_db.cursor()
			cursor.fast_executemany = True
			sql_select_query = f"SELECT TOP (1) personname " \
				f"FROM dbtable " \
				f"WHERE personid = '{personid}' " \
				f"ORDER BY date1 DESC, date2 DESC;"
			cursor.execute(sql_select_query)
			personname_all = cursor.fetchall()
			personname = personname_all[0][0]
		except Exception as ex:
			personname = 'None'
		connection = pyodbc_connect()
		cursor = connection.cursor()
		cursor.fast_executemany = True
		rows = ['personid', 'accessdateandtime', 'date1', 'date2', 'personname', 'devicename', 'cardno',
				'temperature', 'mask']
		values = [personid, accessdateandtime, date, time,
				  personname, devicename, cardno, temperature, mask]
		_rows = ''
		for x in rows:
			_rows = f"{_rows}{str(x)}, "
		value = f"INSERT INTO dbtable (" + \
				_rows[:-2:] + f") VALUES {tuple(values)}"
		cursor.execute(value)
		connection.commit()
	context = {
		'data': data,
	}
	return render(request, 'skud/passages_insert.html', context)


def passages_delete(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	data = None
	if request.method == 'POST':
		personid = str(request.POST['personid'])
		date = str(request.POST['datetime']).split('T')[0]
		time = str(request.POST['datetime']).split('T')[1]
		connect_db = pyodbc_connect()
		cursor = connect_db.cursor()
		cursor.fast_executemany = True
		value = f"DELETE FROM dbtable " \
				f"WHERE date1 = '{date}' AND date2 BETWEEN '{time}:00' AND '{time}:59' AND personid = '{personid}' "
		cursor.execute(value)
		connect_db.commit()
	context = {
		'data': data,
	}
	return render(request, 'skud/passages_delete.html', context)


#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# rational
def rational_list(request, category_slug=None):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		if category_slug is not None:
			category_page = get_object_or_404(
				CategoryRationalModel, category_slug=category_slug)
			rational = RationalModel.objects.filter(rational_category=category_page).order_by(
				'-rational_date_registered')
		else:
			rational = RationalModel.objects.order_by(
				'-rational_date_registered')
		category = CategoryRationalModel.objects.order_by('-id')
		page = PaginationClass.paginate(
			request=request, objects=rational, num_page=3)
		context = {
			'page': page,
			'category': category,
		}
		return render(request, 'rational/list_rational.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'rational_list: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def rational_search(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='User'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		if request.method == 'POST':
			search = request.POST['search_text']
			rational = RationalModel.objects.filter(rational_name__icontains=search).order_by(
				'-rational_date_registered')
			context = {
				'page': rational
			}
			return render(request, 'rational/list_search.html', context)
		else:
			return redirect('rational')
	except Exception as ex:
		LoggingClass.logging(message=f'rational_search: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def rational_detail(request, rational_id=1):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		rational = RationalModel.objects.get(id=rational_id)
		user = User.objects.get(id=request.user.id)
		comments = CommentRationalModel.objects.filter(
			comment_article=rational).order_by('-id')
		# comments = rational.comment_rational_model_set.order_by('-id')  # равнозначно предыдущему
		blog_is_liked = False
		blog_is_disliked = False
		total_like = LikeRationalModel.objects.filter(
			like_article=rational, like_status=True).count()
		total_dislike = LikeRationalModel.objects.filter(
			like_article=rational, like_status=False).count()
		try:
			LikeRationalModel.objects.get(
				like_article=rational, like_author=user, like_status=True)
			blog_is_liked = True
		except Exception as ex:
			print(ex)
			try:
				LikeRationalModel.objects.get(
					like_article=rational, like_author=user, like_status=False)
				blog_is_disliked = True
			except Exception as ex:
				print(ex)
		context = {
			'rational': rational,
			'comments': comments,
			'likes': {
				'like': blog_is_liked,
				'dislike': blog_is_disliked,
				'total_like': total_like,
				'total_dislike': total_dislike,
				'total_rating': total_like - total_dislike
			}
		}
		return render(request, 'rational/detail_rational.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'rational_detail: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def create_rational(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		if request.method == 'POST':
			form = RationalForm(request.POST, request.FILES)
			if form.is_valid():
				RationalModel.objects.create(
					rational_structure_from=request.POST['rational_structure_from'],
					rational_uid_registrated=request.POST['rational_uid_registered'],
					rational_date_registrated=request.POST.get(
						'rational_date_registered'),
					rational_name=request.POST['rational_name'],
					rational_place_innovation=request.POST['rational_place_innovation'],
					rational_description=request.POST['rational_description'],
					rational_addition_file_1=request.FILES.get(
						'rational_addition_file_1'),
					rational_addition_file_2=request.FILES.get(
						'rational_addition_file_2'),
					rational_addition_file_3=request.FILES.get(
						'rational_addition_file_3'),
					rational_offering_members=request.POST['rational_offering_members'],
					rational_conclusion=request.POST['rational_conclusion'],
					rational_change_documentations=request.POST['rational_change_documentations'],
					rational_resolution=request.POST['rational_resolution'],
					rational_responsible_members=request.POST['rational_responsible_members'],
					rational_date_certification=request.POST.get(
						'rational_date_certification'),
					rational_category=CategoryRationalModel.objects.get(
						id=request.POST.get('rational_category')),
					rational_author_name=User.objects.get(id=request.user.id),
					# rational_date_create            = request.POST.get('rational_date_create'),
					rational_addition_image=request.FILES.get(
						'rational_addition_image'),
					# rational_status                 = request.POST['rational_status'],
				)
			return redirect('rational')
		form = RationalForm(request.POST, request.FILES)
		category = CategoryRationalModel.objects.order_by('-id')
		user = User.objects.get(id=request.user.id).username
		context = {
			'form': form,
			'category': category,
			'user': user,
		}
		return render(request, 'rational/create_rational.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'rational_create: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ; (')


def rational_change(request, rational_id=None):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		if request.method == 'POST':
			form = RationalForm(request.POST, request.FILES)
			if form.is_valid():
				_object = RationalModel.objects.get(id=rational_id)
				_object.rational_structure_from = request.POST['rational_structure_from']
				_object.rational_uid_registered = request.POST['rational_uid_registered']
				_object.rational_date_registered = request.POST.get(
					'rational_date_registered')
				_object.rational_name = request.POST['rational_name']
				_object.rational_place_innovation = request.POST['rational_place_innovation']
				_object.rational_description = request.POST['rational_description']
				_object.rational_addition_file_1 = request.FILES.get(
					'rational_addition_file_1')
				_object.rational_addition_file_2 = request.FILES.get(
					'rational_addition_file_2')
				_object.rational_addition_file_3 = request.FILES.get(
					'rational_addition_file_3')
				_object.rational_offering_members = request.POST['rational_offering_members']
				_object.rational_conclusion = request.POST['rational_conclusion']
				_object.rational_change_documentations = request.POST['rational_change_documentations']
				_object.rational_resolution = request.POST['rational_resolution']
				_object.rational_responsible_members = request.POST['rational_responsible_members']
				_object.rational_date_certification = request.POST.get(
					'rational_date_certification')
				_object.rational_category = CategoryRationalModel.objects.get(
					id=request.POST.get('rational_category'))
				_object.rational_author_name = User.objects.get(
					id=request.user.id)
				# rational_date_create            = request.POST.get('rational_date_create'),
				_object.rational_addition_image = request.FILES.get(
					'rational_addition_image')
				# rational_status                 = request.POST['rational_status'],
				_object.save()
			return redirect('rational')
		form = RationalForm(request.POST, request.FILES)
		category = CategoryRationalModel.objects.order_by('-id')
		context = {
			'form': form,
			'category': category,
			'rational_id': rational_id,
		}
		return render(request, 'rational/change_rational.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'rational_change: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def rational_leave_comment(request, rational_id):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		rational = RationalModel.objects.get(id=rational_id)
		CommentRationalModel.objects.create(comment_article=rational,
											comment_author=User.objects.get(
												id=request.user.id),
											comment_text=request.POST['comment_text'])
		# rational.comment_rational_model_set.create(comment_author=User.objects.get(id=request.user.id),
		#                                          comment_text=request.POST['comment_text'])  # равнозначно предыдущему
		return HttpResponseRedirect(reverse('rational_detail', args=(rational.id,)))
	except Exception as ex:
		LoggingClass.logging(message=f'rational_leave_comment: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def rational_change_rating(request, rational_id):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		blog_ = RationalModel.objects.get(id=rational_id)
		user = User.objects.get(id=request.user.id)
		if request.POST['status'] == '+':
			try:
				LikeRationalModel.objects.get(
					like_article=blog_, like_author=user, like_status=True).delete()
			except Exception as ex:
				print(ex)
				blog_.likerationalmodel_set.create(
					like_article=blog_, like_author=user, like_status=True)
			try:
				LikeRationalModel.objects.get(
					like_article=blog_, like_author=user, like_status=False).delete()
			except Exception as ex:
				print(ex)
		else:
			try:
				LikeRationalModel.objects.get(
					like_article=blog_, like_author=user, like_status=False).delete()
			except Exception as ex:
				print(ex)
				blog_.likerationalmodel_set.create(
					like_article=blog_, like_author=user, like_status=False)
			try:
				LikeRationalModel.objects.get(
					like_article=blog_, like_author=user, like_status=True).delete()
			except Exception as ex:
				print(ex)
		return HttpResponseRedirect(reverse('rational_detail', args=(blog_.id,)))
	except Exception as ex:
		LoggingClass.logging(message=f'rational_change_rating: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def rational_ratings(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='Superuser'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		rational = RationalModel.objects.order_by('-id')
		authors = []
		for query in rational:
			authors.append(query.rational_author_name)
		user_count = {}
		for author in authors:
			user_count[author] = authors.count(author)
		user_counts = []
		for blog_s in user_count:
			rationals = RationalModel.objects.filter(
				rational_author_name=blog_s)
			total_rating = 0
			for rating in rationals:
				total_like = LikeRationalModel.objects.filter(
					like_article=rating, like_status=True).count()
				total_dislike = LikeRationalModel.objects.filter(
					like_article=rating, like_status=False).count()
				total_rating += total_like - total_dislike
			user_counts.append(
				{'user': blog_s, 'count': user_count[blog_s], 'rating': total_rating})
		sorted_by_rating = True
		if request.method == 'POST':
			if request.POST['sorted'] == 'rating':
				sorted_by_rating = True
			if request.POST['sorted'] == 'count':
				sorted_by_rating = False
		if sorted_by_rating:
			page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
		else:
			page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
		context = {
			'page': page,
			'sorted': sorted_by_rating
		}
		return render(request, 'rational/ratings_rational.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'rational_change_rating: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


# Human Resources
def career(request):
	# access and logging
	if DjangoClass.AuthorizationClass.access_to_page(request=request, logging=True, available='User'):
		return redirect(DjangoClass.AuthorizationClass.access_to_page(request=request))

	try:
		data = None
		if request.method == 'POST':
			data = get_career()
		context = {
			'data': data,
		}
		return render(request, 'app_km/career.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'career: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


def geo(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	try:
		data = None
		form = GeoForm()
		if request.method == 'POST':
			print('begin')

			# data = generate_xlsx(request)
			# print('generate_xlsx successfully')

			# generate_kml()
			# print('generate_kml successfully')

			# Points = [PointName, latitude, longitude, PointLinks]

			point1 = [61.22812, 52.14303, "1", "2"]
			point2 = [61.22829, 52.1431, "2", "1|3"]
			point3 = [61.22862, 52.14323, "3", "2|4"]
			point4 = [61.22878, 52.14329, "4", "3|5"]
			point5 = [61.22892201, 52.14332617, "5", "4|6"]
			point5 = [61.23, 52.14332617, "6", "5|7"]
			point5 = [61.24, 52.14332617, "7", "9|10"]
			point5 = [61.25, 52.14332617, "8", "11|12"]
			point5 = [61.26, 52.14332617, "9", "6|4"]
			point_arr = [point1, point2, point3, point4, point5]

			# Получение значений из формы
			count_points = int(request.POST['count_points'])
			correct_rad = int(request.POST['correct_rad'])
			rounded_val = int(request.POST['rounded_val'])

			points_arr = []
			val = 0
			for num in range(1, count_points):
				x = 61.22812
				y = 52.14303
				val += random.random() / 10000 * 2
				var = [round(x + val, rounded_val), round(y + val - random.random() / 10000 * correct_rad, rounded_val),
					   str(num), str(f"{num - 1}|{num + 1}")]
				points_arr.append(var)

			# Near Point
			subject_ = find_near_point(points_arr, 61.27, 52.147)
			print(subject_)
			object_ = find_near_point(points_arr, 61.24, 52.144)
			print(object_)

			# Vectors = [VectorName, length(meters)]
			vector_arr = get_vector_arr(points_arr)
			# print(vector_arr)

			# print(points_arr)

			# New KML Object
			generate_way(object_, subject_, points_arr)

			print('end')
		context = {
			'data': data,
			'form': form,
		}
		return render(request, 'app_km/geo.html', context)
	except Exception as ex:
		LoggingClass.logging(message=f'geo: {ex}')
		HttpRaiseExceptionClass.http404_raise('Страница не найдена ;(')


#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
def email(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	mails = EmailModel.objects.order_by('-id')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(mails, 10)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"

	context = {
		'page': page
	}
	return render(request, 'app_km/email.html', context)


def send_email(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		subject = request.POST.get('subject', '')
		message_s = request.POST.get('message', '')
		to_email = request.POST.get('to_email', '')
		if subject and message and to_email:
			try:
				send_mail(subject, message_s, 'eevee.cycle@yandex.ru',
						  [to_email, ''], fail_silently=False)
				EmailModel.objects.create(
					Email_subject=subject,
					Email_message=message_s,
					Email_email=to_email
				)
			except BadHeaderError:
				return redirect('home')
	return redirect('email')


def notification(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	form = NotificationForm(request.POST, request.FILES)
	pages = NotificationModel.objects.order_by('-id')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(pages, 10)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	context = {
		'page': page,
		'form': form,
	}
	return render(request, 'app_km/notification.html', context)


def create_notification(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		NotificationModel.objects.create(
			notification_name=request.POST['notification_name'],
			notification_slug=request.POST['notification_slug'],
			notification_description=request.POST['notification_description'],
			notification_author=User.objects.get(id=request.user.id),
		)
	return redirect('notification')


def accept(request, notify_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	try:
		rational = NotificationModel.objects.get(id=notify_id)
		rational.notification_status = True
		rational.save()
	except Exception as ex:
		print(ex)
	return redirect('notification')


def decline(request, notify_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	try:
		rational = NotificationModel.objects.get(id=notify_id)
		rational.notification_status = False
		rational.save()
	except Exception as ex:
		print(ex)
	return redirect('notification')


def documentation(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		DocumentModel.objects.create(
			document_name=request.POST['document_name'],
			document_slug=request.POST['document_slug'],
			document_description=request.POST.get('document_description'),
			document_addition_file_1=request.FILES.get(
				'document_addition_file_1'),
			document_addition_file_2=request.FILES.get(
				'document_addition_file_2'),
		)
		return redirect('documentation')
	docs = DocumentModel.objects.order_by('-id')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(docs, 3)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	form = DocumentForm(request.POST, request.FILES)
	context = {
		'page': page,
		'form': form,
	}
	return render(request, 'app_km/documentation.html', context)


def contact(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		ContactModel.objects.create(
			contact_name=request.POST['contact_name'],
			contact_slug=request.POST['contact_slug'],
			contact_description=request.POST.get('contact_description'),
			contact_image=request.FILES.get('contact_image'),
		)
		return redirect('contact')
	contacts = ContactModel.objects.order_by('-id')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(contacts, 3)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	form = ContactForm(request.POST, request.FILES)
	context = {
		'page': page,
		'form': form,
	}
	return render(request, 'app_km/contact.html', context)


def list_sms(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		SmsModel.objects.create(
			sms_author=User.objects.get(id=request.user.id),
			sms_description=request.POST['sms_description'],
			# sms_date=request.POST.get('contact_description'),
		)
		return redirect('chat')
	contacts = SmsModel.objects.order_by('-sms_date')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(contacts, 3)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	form = SmsForm(request.POST, request.FILES)
	context = {
		'page': page,
		'form': form,
	}
	return render(request, 'app_km/message.html', context)


def message(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		MessageModel.objects.create(
			message_name=request.POST['message_name'],
			message_slug=request.POST['message_slug'],
			message_description=request.POST.get('message_description'),
		)
		return redirect('message')
	form = MessageForm(request.POST, request.FILES)
	message_s = MessageModel.objects.order_by('-id')
	# Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(message_s, 3)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	context = {
		'page': page,
		'form': form,
	}
	return render(request, 'app_km/message.html', context)


def weather(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	appid = '82b797b6ebc625032318e16f1b42c016'
	url = 'https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid=' + appid
	if request.method == 'POST':
		try:
			form = CityForm(request.POST)
			form.save()
		except Exception as ex:
			print(ex)
	form = CityForm()
	cities = CityModel.objects.all()
	all_cities = []
	for city in cities:
		try:
			res = requests.get(url.format(city.name)).json()
			print(res)
			city_info = {
				'city': city.name,
				'temp': res["main"]["temp"],
				'icon': res["weather"][0]["icon"]
			}
			all_cities.append(city_info)
		except Exception as ex:
			print(ex)
	# Начало пагинатора: передать модель и количество объектов на одной странице, объекты будут списком
	paginator = Paginator(all_cities, 3)
	page = request.GET.get('page')
	try:
		page = paginator.page(page)
	except PageNotAnInteger:
		page = paginator.page(1)
	except EmptyPage:
		page = paginator.page(paginator.num_pages)
	# конец пагинатора, объекты под ключом "'page': page"
	context = {
		'form': form,
		'page': page,
	}
	return render(request, 'app_km/weather_list.html', context)


def news_list(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	latest_article_list = ArticleModel.objects.order_by(
		'-article_pub_date')[:10]
	return render(request, 'app_km/news_list.html', {'latest_article_list': latest_article_list})


def news_create(request):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	if request.method == 'POST':
		ArticleModel.objects.create(
			article_title=request.POST['article_title'],
			article_text=request.POST['article_text']
		)
		latest_article_list = ArticleModel.objects.order_by(
			'-article_pub_date')[:10]
		return render(request, 'app_km/news_list.html', {'latest_article_list': latest_article_list})
	post_form = ArticleForm(request.POST)
	return render(request, 'app_km/news_create.html', {'post_form': post_form})


def news_detail(request, article_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	try:
		a = ArticleModel.objects.get(id=article_id)
	except Exception as ex:
		print(ex)
		raise Http404('Статья не найдена')
	latest_comments_list = a.comment_set.order_by('-id')[:10]
	return render(request, 'app_km/news_detail.html', {'article': a, 'latest_comments_list': latest_comments_list})


def leave_comment(request, article_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	try:
		a = ArticleModel.objects.get(id=article_id)
	except Exception as ex:
		print(ex)
		raise Http404('Статья не найдена')
	a.comment_set.create(
		author_name=request.POST['name'], comment_text=request.POST['text'])
	return HttpResponseRedirect(reverse('news_detail', args=(a.id,)))


def increase_rating(request, article_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	a = ArticleModel.objects.get(id=article_id)
	a.increase()
	a.save()
	return HttpResponseRedirect(reverse('news_detail', args=(a.id,)))


def decrease_rating(request, article_id):
	DjangoClass.AuthorizationClass.access_to_page(request=request)
	a = ArticleModel.objects.get(id=article_id)
	a.decrease()
	a.save()
	return HttpResponseRedirect(reverse('news_detail', args=(a.id,)))


# react
def react(request):
	return render(request, 'app_km/react.html')


#  bootstrap
def bootstrap_example(request):
	return render(request, 'bootstrap/example.html')


def album(request):
	return render(request, 'bootstrap/album.html')


def blog(request):
	return render(request, 'bootstrap/blog.html')


def carousel(request):
	return render(request, 'bootstrap/carousel.html')


def checkout(request):
	return render(request, 'bootstrap/checkout.html')


def cover(request):
	return render(request, 'bootstrap/cover.html')


def dashboard(request):
	return render(request, 'bootstrap/dashboard.html')


def pricing(request):
	return render(request, 'bootstrap/pricing.html')


def product(request):
	return render(request, 'bootstrap/product.html')


def sign_in(request):
	return render(request, 'bootstrap/sign-in.html')


def sticky_footer(request):
	return render(request, 'bootstrap/sticky-footer.html')


def sticky_footer_navbar(request):
	return render(request, 'bootstrap/sticky-footer-navbar.html')


def starter_template(request):
	return render(request, 'bootstrap/starter-template.html')


def grid(request):
	return render(request, 'bootstrap/grid.html')


def cheatsheet(request):
	return render(request, 'bootstrap/cheatsheet.html')


def nav_bars(request):
	return render(request, 'bootstrap/nav_bars.html')


def off_canvas(request):
	return render(request, 'bootstrap/off_canvas.html')


def masonry(request):
	return render(request, 'bootstrap/masonry.html')


def navbar_static(request):
	return render(request, 'bootstrap/navbar-static.html')


def navbar_fixed(request):
	return render(request, 'bootstrap/navbar-fixed.html')


def navbar_bottom(request):
	return render(request, 'bootstrap/navbar-bottom.html')