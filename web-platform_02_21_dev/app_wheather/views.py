from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import City
from .forms import CityForm
import requests


def index(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    appid = '82b797b6ebc625032318e16f1b42c016'
    url = 'https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid=' + appid

    if request.method == 'POST':
        try:
            form = CityForm(request.POST)
            form.save()
        except:
            pass

    form = CityForm()

    cities = City.objects.all()

    all_cities = []



    for city in cities:
        try:
            res = requests.get(url.format(city.name)).json()
            city_info = {
                'city': city.name,
                'temp': res["main"]["temp"],
                'icon': res["weather"][0]["icon"]
            }

            all_cities.append(city_info)
        except:
            pass
    
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

    return render(request, 'app_weather/list.html', context)
