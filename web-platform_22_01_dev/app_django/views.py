import base64
import hashlib
import json
import os
import random

import bs4
import httplib2
import requests
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import get_template
from django.urls import reverse
from xhtml2pdf import pisa

from app_admin.models import UserModel
from app_admin.service import DjangoClass, UtilsClass, PaginationClass, SalaryClass, Xhtml2pdfClass, GeoClass
from app_admin.utils import SQLClass, DirPathFolderPathClass, DateTimeUtils
from app_django.forms import GeoForm
from app_django.models import IdeaModel, IdeaCommentModel, IdeaRatingModel, ChatModel
from app_settings import settings


def idea_create(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_create')
    if page:
        return redirect(page)

    try:
        response = 0
        category = IdeaModel.get_all_category()
        if request.method == 'POST':
            author_foreign_key_field = UserModel.objects.get(user_foreign_key_field=request.user)
            name_char_field = DjangoClass.RequestClass.get_value(request, "name_char_field")
            category_slug_field = DjangoClass.RequestClass.get_value(request, "category_slug_field")
            short_description_char_field = DjangoClass.RequestClass.get_value(request, "short_description_char_field")
            full_description_text_field = DjangoClass.RequestClass.get_value(request, "full_description_text_field")
            avatar_image_field = DjangoClass.RequestClass.get_file(request, "avatar_image_field")
            addiction_file_field = DjangoClass.RequestClass.get_file(request, "addiction_file_field")
            IdeaModel.objects.create(
                author_foreign_key_field=author_foreign_key_field,
                name_char_field=name_char_field,
                category_slug_field=category_slug_field,
                short_description_char_field=short_description_char_field,
                full_description_text_field=full_description_text_field,
                avatar_image_field=avatar_image_field,
                addiction_file_field=addiction_file_field,
                visibility_boolean_field=False,
            )
            response = 1
        context = {
            'response': response,
            'category': category,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'category': None,
        }

    return render(request, 'idea/idea_create.html', context)


def idea_change(request, idea_int):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_change')
    if page:
        return redirect(page)

    try:
        response = 0
        idea = IdeaModel.objects.get(id=idea_int)
        users = UserModel.objects.all()
        categoryes = IdeaModel.get_all_category()
        if request.method == 'POST':
            author_foreign_key_field_id = DjangoClass.RequestClass.get_value(request, "author_foreign_key_field_id")
            author_foreign_key_field = UserModel.objects.get(id=author_foreign_key_field_id)
            name_char_field = DjangoClass.RequestClass.get_value(request, "name_char_field")
            category_slug_field = DjangoClass.RequestClass.get_value(request, "category_slug_field")
            short_description_char_field = DjangoClass.RequestClass.get_value(request, "short_description_char_field")
            full_description_text_field = DjangoClass.RequestClass.get_value(request, "full_description_text_field")
            avatar_image_field = DjangoClass.RequestClass.get_file(request, "avatar_image_field")
            addiction_file_field = DjangoClass.RequestClass.get_file(request, "addiction_file_field")

            if author_foreign_key_field and author_foreign_key_field != idea.author_foreign_key_field:
                idea.author_foreign_key_field = author_foreign_key_field
            if name_char_field and name_char_field != idea.name_char_field:
                idea.name_char_field = name_char_field
            if category_slug_field and category_slug_field != idea.category_slug_field:
                idea.category_slug_field = category_slug_field
            if short_description_char_field and short_description_char_field != idea.short_description_char_field:
                idea.short_description_char_field = short_description_char_field
            if full_description_text_field and full_description_text_field != idea.full_description_text_field:
                idea.full_description_text_field = full_description_text_field
            if avatar_image_field and avatar_image_field != idea.avatar_image_field:
                idea.avatar_image_field = avatar_image_field
            if addiction_file_field and addiction_file_field != idea.addiction_file_field:
                idea.addiction_file_field = addiction_file_field

            idea.save()
            response = 1
        context = {
            'response': response,
            'idea': idea,
            'users': users,
            'categoryes': categoryes,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'idea': None,
            'users': None,
            'categoryes': None,
        }

    return render(request, 'idea/idea_change.html', context)


def idea_list(request, category_slug='All'):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_list')
    if page:
        return redirect(page)

    try:
        categoryes = IdeaModel.get_all_category()
        num_page = 5
        if category_slug == 'idea_change_visibility':
            ideas = IdeaModel.objects.filter(visibility_boolean_field=False)
        elif category_slug.lower() != 'all':
            ideas = IdeaModel.objects.filter(category_slug_field=category_slug, visibility_boolean_field=True)
        else:
            ideas = IdeaModel.objects.filter(visibility_boolean_field=True)
        if request.method == 'POST':
            search_char_field = DjangoClass.RequestClass.get_value(request, "search_char_field")
            if search_char_field:
                ideas = ideas.filter(name_char_field__icontains=search_char_field)
            num_page = 100
        page = PaginationClass.paginate(request=request, objects=ideas, num_page=num_page)
        response = 0
        context = {
            'response': response,
            'page': page,
            'categoryes': categoryes,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'page': None,
            'categoryes': None
        }

    return render(request, 'idea/idea_list.html', context)


def idea_change_visibility(request, idea_int):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_change_visibility')
    if page:
        return redirect(page)

    try:
        if request.method == 'POST':
            status = DjangoClass.RequestClass.get_value(request, "hidden")
            if status == 'true':
                status = True
            elif status == 'false':
                status = False
            data = IdeaModel.objects.get(id=idea_int)
            data.visibility_boolean_field = status

            data.save()
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect(reverse('idea_list', args=()))


def idea_view(request, idea_int):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_view')
    if page:
        return redirect(page)

    try:
        idea = IdeaModel.objects.get(id=idea_int)
        comments = IdeaCommentModel.objects.filter(idea_foreign_key_field=idea)
        try:
            page = PaginationClass.paginate(request=request, objects=comments, num_page=5)
            response = 0
        except Exception as error:
            response = -1
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': response,
            'idea': idea,
            'page': page,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'idea': None,
            'page': None,
        }

    return render(request, 'idea/idea_view.html', context)


def idea_like(request, idea_int):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_like')
    if page:
        return redirect(page)

    try:
        idea = IdeaModel.objects.get(id=idea_int)
        author = UserModel.objects.get(user_foreign_key_field=request.user)
        if request.POST['status'] == 'like':
            try:
                IdeaRatingModel.objects.get(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=True
                ).delete()
            except Exception as error:
                IdeaRatingModel.objects.create(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=True
                )
            try:
                IdeaRatingModel.objects.get(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=False
                ).delete()
            except Exception as error:
                pass
        else:
            try:
                IdeaRatingModel.objects.get(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=False
                ).delete()
            except Exception as error:
                IdeaRatingModel.objects.create(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=False
                )
                IdeaCommentModel.objects.create(
                    author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
                    idea_foreign_key_field=IdeaModel.objects.get(id=idea_int),
                    text_field=request.POST['text_field']
                )
            try:
                IdeaRatingModel.objects.get(
                    author_foreign_key_field=author,
                    idea_foreign_key_field=idea,
                    status_boolean_field=True
                ).delete()
            except Exception as error:
                pass
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect(reverse('idea_view', args=(idea_int,)))


def idea_comment(request, idea_int):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_comment')
    if page:
        return redirect(page)

    try:
        if request.method == 'POST':
            IdeaCommentModel.objects.create(
                author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
                idea_foreign_key_field=IdeaModel.objects.get(id=idea_int),
                text_field=DjangoClass.RequestClass.get_value(request, "text_field")
            )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)

    return redirect(reverse('idea_view', args=(idea_int,)))


def idea_rating(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='idea_rating')
    if page:
        return redirect(page)

    try:
        idea = IdeaModel.objects.order_by('-id')
        authors = []
        for query in idea:
            authors.append(query.author_foreign_key_field)
        authors_dict = {}
        for author in authors:
            authors_dict[author] = authors.count(author)
        user_counts = []
        for author in authors_dict:
            ideas = IdeaModel.objects.filter(author_foreign_key_field=author)
            total_rating = 0
            for idea in ideas:
                total_rating += idea.get_total_rating()
            user_counts.append(
                {'author': author, 'count': ideas.count(), 'rating': total_rating}
            )
        sorted_by_rating = True
        if request.method == 'POST':
            if request.POST['sorted'] == 'idea':
                sorted_by_rating = True
            if request.POST['sorted'] == 'count':
                sorted_by_rating = False
        if sorted_by_rating:
            page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
        else:
            page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
        page = PaginationClass.paginate(request=request, objects=page, num_page=5)
        response = 0
        context = {
            'response': response,
            'page': page,
            'sorted': sorted_by_rating
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'page': None,
            'sorted': None
        }

    return render(request, 'idea/idea_rating.html', context)


def salary(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='salary')
    if page:
        return redirect(page)

    try:
        date = [int(x) for x in str(DateTimeUtils.get_current_date()).split('-')]
        year = date[0]
        month = date[1] - 1
        day = date[2]
        if day < 10:
            month -= 1
        if month == 0:
            month = 12
            year -= 1
        elif month < 0:
            month = 11
            year -= 1
        months = []
        months_list = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                       'Ноябрь', 'Декабрь']
        for month_list in months_list:
            index = months_list.index(month_list) + 1
            if index == month:
                months.append([index, month_list, True])
            else:
                months.append([index, month_list, False])
        years = []
        years_list = [2021, 2022, 2023, 2024, 2025]
        for year_list in years_list:
            index = years_list.index(year) + 1
            if index == month:
                years.append([year_list, True])
            else:
                years.append([year_list, False])
        data = None
        response = 0
        if request.method == 'POST':
            key = UtilsClass.create_encrypted_password(
                _random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                _length=10
            )
            hash_key_obj = hashlib.sha256()
            hash_key_obj.update(key.encode('utf-8'))
            key_hash = str(hash_key_obj.hexdigest().strip().upper())
            key_hash_base64 = base64.b64encode(str(key_hash).encode()).decode()
            iin = request.user.username
            if str(request.user.username).lower() == 'bogdan':
                iin = 970801351179
            iin_base64 = base64.b64encode(str(iin).encode()).decode()
            month = DjangoClass.RequestClass.get_value(request, "month")
            if int(month) < 10:
                month = f'0{month}'
            year = DjangoClass.RequestClass.get_value(request, "year")
            date_base64 = base64.b64encode(f'{year}{month}'.encode()).decode()
            # url = f'http://192.168.1.158/Tanya_perenos/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
            url = f'http://192.168.1.10/KM_1C/hs/zp/rl/{iin_base64}_{key_hash_base64}/{date_base64}'
            relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
            h = httplib2.Http(
                relative_path + "\\static\\media\\data\\temp\\get_salary_data")
            _login = 'Web_adm_1c'
            password = '159159qqww!'
            h.add_credentials(_login, password)
            response, content = h.request(url)
            if content:
                message = UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash)
                success = True
                error_word_list = ['Ошибка', 'ошибка', 'Error', 'error', 'Failed', 'failed']
                for error_word in error_word_list:
                    if message.find(error_word) >= 0:
                        success = False
                if message.find('send') == 0:
                    data = message.split('send')[1].strip()
                    success = False
            else:
                success = False
            if success:
                json_data = json.loads(UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash))
                with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
                    encode_data = json.dumps(json_data, ensure_ascii=False)
                    json.dump(encode_data, file, ensure_ascii=False)

                # Временное чтение файла для отладки без доступа к 1С
                # with open("static/media/data/zarplata_temp.json", "r", encoding="utf-8") as file:
                #     json_data = json.load(file)

                try:
                    json_data["global_objects"]["3.Доходы в натуральной форме"]
                except Exception as error:
                    json_data["global_objects"]["3.Доходы в натуральной форме"] = {
                        "Fields": {
                            "1": "Вид",
                            "2": "Период",
                            "3": "Сумма"
                        },
                    }
                new_data = dict(json_data).copy()
                del (new_data["global_objects"])
                new_arr = []
                for key, value in new_data.items():
                    if key == 'Долг за организацией на начало месяца' or key == 'Долг за организацией на конец месяца':
                        continue
                    new_arr.append([key, value])
                data = {
                    "Table_0_1": new_arr[:len(new_arr) // 2],
                    "Table_0_2": new_arr[len(new_arr) // 2:],
                    "Table_1": SalaryClass.create_arr_table(
                        title="1.Начислено",
                        footer="Всего начислено",
                        json_obj=json_data["global_objects"]["1.Начислено"],
                        exclude=[5, 6]
                    ),
                    "Table_2": SalaryClass.create_arr_table(
                        title="2.Удержано",
                        footer="Всего удержано",
                        json_obj=json_data["global_objects"]["2.Удержано"],
                        exclude=[]
                    ),
                    "Table_3": SalaryClass.create_arr_table(
                        title="3.Доходы в натуральной форме",
                        footer="Всего натуральных доходов",
                        json_obj=json_data["global_objects"]["3.Доходы в натуральной форме"],
                        exclude=[]
                    ),
                    "Table_4": SalaryClass.create_arr_table(
                        title="4.Выплачено",
                        footer="Всего выплат",
                        json_obj=json_data["global_objects"]["4.Выплачено"],
                        exclude=[]
                    ),
                    "Table_5": SalaryClass.create_arr_table(
                        title="5.Налоговые вычеты",
                        footer="Всего вычеты",
                        json_obj=json_data["global_objects"]["5.Налоговые вычеты"],
                        exclude=[]
                    ),
                    "Down": {
                        "first": [
                            "Долг за организацией на начало месяца",
                            json_data["Долг за организацией на начало месяца"]
                        ],
                        "last": ["Долг за организацией на конец месяца",
                                 json_data["Долг за организацией на конец месяца"]],
                    },
                    "Final": [
                        ["Период", json_data["Период"]],
                        ["Долг за организацией на конец месяца", json_data["Долг за организацией на конец месяца"]],
                    ],
                }
                response = 1
            else:
                response = -1
        context = {
            'response': response,
            'months': months,
            'years': years,
            'data': data,
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'response': -1,
            'months': None,
            'years': None,
            'data': None,
        }
    return render(request, 'salary/salary.html', context)


def career(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='career')
    if page:
        return redirect(page)

    try:
        data = None
        response = 0
        if request.method == 'POST':
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:45.0) Gecko/20100101 Firefox/45.0'
            }
            vacancies_urls = []
            url = 'https://www.km-open.online/property'
            r = requests.get(url, headers=headers)
            soup = bs4.BeautifulSoup(r.content.decode("utf-8"), features="lxml")
            list_objs = soup.find_all('div', {"class": "collection-item w-dyn-item"})
            for list_obj in list_objs:
                vacancies_urls.append(url.split('/property')[0] + str(list_obj).split('href="')[1].split('"')[0])
            vacancies_title = []
            for list_obj in list_objs:
                vacancies_title.append(str(list_obj).split('class="heading-12">')[1].split('</h5>')[0])
            vacancies_data = []
            for title in vacancies_title:
                vacancies_data.append([title, vacancies_urls[vacancies_title.index(title)]])
            data = [["Вакансия"], vacancies_data]
            response = 1
        context = {
            'data': data,
            'response': response
        }
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {
            'data': None,
            'response': None,
        }

    return render(request, 'hr/career.html', context)


def video_study(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='video_study')
    if page:
        return redirect(page)

    try:
        context = {}
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        context = {}

    return render(request, 'news/video_study.html', context)


def chat(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='chat')
    if page:
        return redirect(page)

    try:
        if request.method == 'POST':
            text = DjangoClass.RequestClass.get_value(request, "text")
            try:
                user = User.objects.get(username=request.user.username)
                user_model = UserModel.objects.get_or_create(user_foreign_key_field=user)[0]
                usr = f'{user_model.last_name_char_field} {user_model.first_name_char_field}'
                if len(usr.strip()) <= 1:
                    usr = 'Не заполнено'
            except Exception as error:
                usr = 'скрыто'

            ChatModel.objects.create(
                author_char_field=usr,
                text_field=text
            )
        context = {}
        return render(request, 'chat/chat.html', context)
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)


def geo(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='geo')
    if page:
        return redirect(page)

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

            # point1 = [61.22812, 52.14303, "1", "2"]
            # point2 = [61.22829, 52.1431, "2", "1|3"]
            # point3 = [61.22862, 52.14323, "3", "2|4"]
            # point4 = [61.22878, 52.14329, "4", "3|5"]
            # point5 = [61.22892201, 52.14332617, "5", "4|6"]
            # point_arr = [point1, point2, point3, point4, point5]

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
            subject_ = GeoClass.find_near_point(points_arr, 61.27, 52.147)
            print(subject_)
            object_ = GeoClass.find_near_point(points_arr, 61.24, 52.144)
            print(object_)

            # Vectors = [VectorName, length(meters)]
            # vector_arr = GeoClass.get_vector_arr(points_arr)
            # print(vector_arr)

            # print(points_arr)

            # New KML Object
            GeoClass.generate_way(object_, subject_, points_arr)

            print('end')
        context = {
            'data': data,
            'form': form,
        }
        return render(request, 'extra/geo.html', context)
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)


def analyse(request):
    """
    Машинное зрение
    """
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='analyse')
    if page:
        return redirect(page)

    # response = requests.get(url='http://127.0.0.1/drf/users/2/', timeout=3)
    # print(response.text)

    login_ = 'Bogdan'
    password = '31284bogdan'
    h = httplib2.Http(DirPathFolderPathClass.create_folder_in_this_dir(folder_name='static/media/temp'))
    h.add_credentials(login_, password)
    response, content = h.request('http://127.0.0.1/drf/ideas/')
    print(response)
    print(content.decode())

    # try:
    #     with ThreadPoolExecutor() as executor:
    #         executor.submit(ComputerVisionClass.EventLoopClass.loop_modules_global, tick_delay=0.1)
    # except Exception as error:
    #     DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    #     print(f'\nanalyse | error : {error}\n')
    #     with ThreadPoolExecutor() as executor:
    #         executor.submit(ComputerVisionClass.EventLoopClass.loop_modules_global, tick_delay=0.2)

    return redirect(to='home')


def salary_pdf(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='salary')
    if page:
        return redirect(page)

    # try:
    if True:
        template_path = 'salary/salary_pdf.html'
        key = UtilsClass.create_encrypted_password(
            _random_chars='abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', _length=10
        )
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
        _login = 'Web_adm_1c'
        password = '159159qqww!'
        h.add_credentials(_login, password)
        try:
            response, content = h.request(url)
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            content = None
        success_web_read = False
        if content:

            print('\n ***************** \n')
            print(f"content: {content}")

            print('\n ***************** \n')
            print(f"content_utf: {content.decode()}")

            content_decrypt = UtilsClass.decrypt_text_with_hash(
                content.decode(encoding='UTF-8', errors='strict')[1:], key_hash
            )
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
                    json_data = json.loads(UtilsClass.decrypt_text_with_hash(content.decode()[1:], key_hash))
                    with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
                        encode_data = json.dumps(json_data, ensure_ascii=False)
                        json.dump(encode_data, file, ensure_ascii=False)
                    success_web_read = True
                except Exception as error:
                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        if success_web_read is False:
            print('read temp file')
            with open("static/media/data/zarplata_temp.json", "r", encoding="utf-8") as file:
                json_data = json.load(file)

        print('\n ***************** \n')
        print(f"json_data: {json_data}")
        print('\n ***************** \n')

        try:
            json_data["global_objects"]["3.Доходы в натуральной форме"]
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
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
            "Table_1": SalaryClass.create_arr_table(
                title="1.Начислено", footer="Всего начислено", json_obj=json_data["global_objects"]["1.Начислено"],
                exclude=[5, 6]
            ),
            "Table_2": SalaryClass.create_arr_table(
                title="2.Удержано", footer="Всего удержано", json_obj=json_data["global_objects"]["2.Удержано"],
                exclude=[]
            ),
            "Table_3": SalaryClass.create_arr_table(
                title="3.Доходы в натуральной форме", footer="Всего натуральных доходов",
                json_obj=json_data["global_objects"]["3.Доходы в натуральной форме"], exclude=[
                ]
            ),
            "Table_4": SalaryClass.create_arr_table(
                title="4.Выплачено", footer="Всего выплат", json_obj=json_data["global_objects"]["4.Выплачено"],
                exclude=[]
            ),
            "Table_5": SalaryClass.create_arr_table(
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
        pisa_status = pisa.CreatePDF(html, dest=response, encoding='utf-8', link_callback=Xhtml2pdfClass.link_callback)
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


def passages_thermometry(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='passages_thermometry')
    if page:
        return redirect(page)

    data = None
    if request.method == 'POST':
        date_start = DjangoClass.RequestClass.get_value(request, 'date_start').split('T')[0]
        date_end = DjangoClass.RequestClass.get_value(request, 'date_end').split('T')[0]
        check = DjangoClass.RequestClass.get_check(request, 'check')
        personid = DjangoClass.RequestClass.get_value(request, 'personid')
        connect_db = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                             database="thirdpartydb", username="sa", password="skud12345678")
        cursor = connect_db.cursor()
        cursor.fast_executemany = True
        try:
            if check:
                sql_select_query = f"SELECT * " \
                                   f"FROM dbtable " \
                                   f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' AND personid = '{personid}' " \
                                   f"AND CAST(temperature AS FLOAT) >= 37.0 " \
                                   f"ORDER BY date1 DESC, date2 DESC;"
            else:
                sql_select_query = f"SELECT * " \
                                   f"FROM dbtable " \
                                   f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' " \
                                   f"AND CAST(temperature AS FLOAT) >= 37.0 " \
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
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                            try:
                                value = str(val).split(" ")
                                try:
                                    name = value[0].encode('1251').decode('utf-8')
                                except Exception as error:
                                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                    name = "И" + \
                                           value[0][2:].encode('1251').decode('utf-8')
                                try:
                                    surname = value[1].encode(
                                        '1251').decode('utf-8')
                                except Exception as error:
                                    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                    surname = "И" + \
                                              value[1][2:].encode('1251').decode('utf-8')
                                string = name + " " + surname
                                val = string
                            except Exception as error:
                                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                    value_index += 1
                    local_bodies.append(val)
                bodies.append(local_bodies)
            headers = ["табельный", "доступ", "дата", "время", "данные", "точка", "номер карты", "температура",
                       "маска", "алкотест"]
            data = [headers, bodies]
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    context = {
        'data': data,
    }
    return render(request, 'skud/passages_thermometry.html', context)


def passages_select(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='passages_select')
    if page:
        return redirect(page)

    data = None
    if request.method == 'POST':
        personid = str(request.POST['personid'])
        connect_db = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                             database="thirdpartydb", username="sa", password="skud12345678")
        cursor = connect_db.cursor()
        cursor.fast_executemany = True
        try:
            # check = request.POST['check']
            date = str(request.POST['date']).split('T')[0]
            time = str(request.POST['date']).split('T')[1]
            sql_select_query = f"SELECT * " \
                               f"FROM dbtable " \
                               f"WHERE date1 = '{date}' AND date2 BETWEEN '{time}:00' AND '{time}:59' " \
                               f"AND personid = '{personid}' " \
                               f"ORDER BY date1 DESC, date2 DESC;"
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
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
                    except Exception as error:
                        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                        try:
                            value = str(val).split(" ")
                            try:
                                name = value[0].encode('1251').decode('utf-8')
                            except Exception as error:
                                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                name = "И" + \
                                       value[0][2:].encode('1251').decode('utf-8')
                            try:
                                surname = value[1].encode(
                                    '1251').decode('utf-8')
                            except Exception as error:
                                DjangoClass.LoggingClass.logging_errors(request=request, error=error)
                                surname = "И" + \
                                          value[1][2:].encode('1251').decode('utf-8')
                            string = name + " " + surname
                            val = string
                        except Exception as error:
                            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
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
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='passages_update')
    if page:
        return redirect(page)

    data = None
    if request.method == 'POST':
        personid_old = request.POST['personid_old']
        date_old = str(request.POST['datetime_old']).split('T')[0]
        time_old = str(request.POST['datetime_old']).split('T')[1]
        date_new = str(request.POST['datetime_new']).split('T')[0]
        time_new = str(request.POST['datetime_new']).split('T')[1] + ':00'
        accessdateandtime_new = date_new + 'T' + time_new
        connect_db = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                             database="thirdpartydb", username="sa", password="skud12345678")
        cursor = connect_db.cursor()
        cursor.fast_executemany = True
        value = f"UPDATE dbtable SET accessdateandtime = '{accessdateandtime_new}', date1 = '{date_new}', " \
                f"date2 = '{time_new}' " \
                f"WHERE date1 = '{date_old}' AND date2 BETWEEN '{time_old}:00' AND '{time_old}:59' " \
                f"AND personid = '{personid_old}' "
        cursor.execute(value)
        connect_db.commit()
    context = {
        'data': data,
    }
    return render(request, 'skud/passages_update.html', context)


def passages_insert(request):
    # access and logging
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='passages_insert')
    if page:
        return redirect(page)

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
            connect_db = SQLClass.pyodbc_connect(
                ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434", database="thirdpartydb", username="sa",
                password="skud12345678"
            )
            cursor = connect_db.cursor()
            cursor.fast_executemany = True
            sql_select_query = f'SELECT TOP (1) personname ' \
                               f'FROM dbtable ' \
                               f'WHERE personid = \'{personid}\' ' \
                               f'ORDER BY date1 DESC, date2 DESC;'
            cursor.execute(sql_select_query)
            personname_all = cursor.fetchall()
            personname = personname_all[0][0]
        except Exception as error:
            DjangoClass.LoggingClass.logging_errors(request=request, error=error)
            personname = 'None'
        connection = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                             database="thirdpartydb", username="sa", password="skud12345678")
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
    page = DjangoClass.AuthorizationClass.try_to_access(request=request, access='passages_delete')
    if page:
        return redirect(page)

    data = None
    if request.method == 'POST':
        personid = str(request.POST['personid'])
        date = str(request.POST['datetime']).split('T')[0]
        time = str(request.POST['datetime']).split('T')[1]
        connect_db = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                             database="thirdpartydb", username="sa", password="skud12345678")
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
