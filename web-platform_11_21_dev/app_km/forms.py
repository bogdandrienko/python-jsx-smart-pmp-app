import datetime
from django.utils import timezone
from django.db import models
from django import forms
from django.forms import ModelForm, TextInput
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator, MinLengthValidator, \
    MaxLengthValidator
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import ExampleModel, Profile, RationalModel, CategoryRationalModel, NotificationModel, ContactModel, \
    DocumentModel, \
    MessageModel, SmsModel, ArticleModel, CityModel, IdeasModel, IdeasCategoryModel


# Example
class ExampleForm(forms.Form):
    """
    Форма с максимумом вариаций разных параметров и полей
    """

    text = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='text',  # Заголовок поля
        help_text='<small class="text-muted underline">text</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='text',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.TextInput(
            attrs={
                'type': 'text',  # HTML тип поля
                'name': 'text',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'text',  # Данные, которые видны при удалении всей информации
                'value': 'text',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '10',
                'maxlength': '20',
            }
        ),
    )

    much_text = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='much_text',  # Заголовок поля
        help_text='<small class="text-muted underline">much_text</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='much_text',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.Textarea(
            attrs={
                'type': 'text',  # HTML тип поля
                'name': 'much_text',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'much_text',  # Данные, которые видны при удалении всей информации
                'value': 'much_text',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '10',
                'maxlength': '200',
            }
        ),
    )

    password_text = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='password_text',  # Заголовок поля
        help_text='<small class="text-muted underline">password_text</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='password_text',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.PasswordInput(
            attrs={
                'type': 'password',  # HTML тип поля
                'name': 'password_text',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'password_text',  # Данные, которые видны при удалении всей информации
                'value': 'password_text',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '10',
                'maxlength': '20',
            }
        ),
    )

    email = forms.EmailField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='email',  # Заголовок поля
        help_text='<small class="text-muted underline">andrienko.1997@list.ru</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='bogdandrienko@gmail.com',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.EmailInput(
            attrs={
                'type': 'email',  # HTML тип поля
                'name': 'email',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'andrienko.1997@list.ru',  # Данные, которые видны при удалении всей информации
                'value': 'bogdandrienko@gmail.com',  # Начальное значение поля (Второстепенное по приориту после
                # "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            }
        ),
    )

    url = forms.URLField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='url',  # Заголовок поля
        help_text='<small class="text-muted underline">http://127.0.0.1:8000/example/</small><br>',
        # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='http://127.0.0.1:8000/example/',
        # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.URLInput(
            attrs={
                'type': 'url',  # HTML тип поля
                'name': 'url',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'http://127.0.0.1:8000/example/',  # Данные, которые видны при удалении всей информации
                'value': 'http://127.0.0.1:8000/example/',
                # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            }
        ),
    )

    number = forms.IntegerField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='number',  # Заголовок поля
        help_text='<small class="text-muted underline">number</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=0,  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.TextInput(
            attrs={
                'type': 'number',  # HTML тип поля
                'name': 'number',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': '0',  # Данные, которые видны при удалении всей информации
                'value': '0',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'min': '10',
                'max': '20',
            }
        ),
    )

    hidden = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='hidden',  # Заголовок поля
        help_text='<small class="text-muted underline">hidden</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='hidden',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.HiddenInput(
            attrs={
                'type': 'hidden',  # HTML тип поля
                'name': 'hidden',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'hidden',  # Данные, которые видны при удалении всей информации
                'value': 'hidden',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            }
        ),
    )

    datetime_ = forms.DateTimeField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='datetime',  # Заголовок поля
        help_text='<small class="text-muted underline">2021-11-18T10:27</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=datetime.datetime.now().strftime('%Y-%m-%dT%H:%M'),  # Начальное значение поля (Имеет приоритет
        # перед "widget.attrs.value")
        widget=forms.DateTimeInput(
            attrs={
                'type': 'datetime-local',  # HTML тип поля
                'name': 'datetime',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': datetime.datetime.now().strftime('%Y-%m-%dT%H:%M'),  # Данные, которые видны при
                # удалении всей информации
                'value': datetime.datetime.now().strftime('%Y-%m-%dT%H:%M'),  # Начальное значение поля (
                # Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'min': "2021-07-30T01:00",
                'max': "2023-12-31T22:59",
                'format': '%Y-%m-%dT%H:%M:%S',
            }
        ),
    )

    date = forms.DateField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='date',  # Заголовок поля
        help_text='<small class="text-muted underline">2021-11-18</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=datetime.datetime.now().strftime('%Y-%m-%d'),  # Начальное значение поля (Имеет приоритет
        # перед "widget.attrs.value")
        widget=forms.DateInput(
            attrs={
                'type': 'date',  # HTML тип поля
                'name': 'date',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': datetime.datetime.now().strftime('%Y-%m-%d'),  # Данные, которые видны при
                # удалении всей информации
                'value': datetime.datetime.now().strftime('%Y-%m-%d'),  # Начальное значение поля (
                # Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'min': "2021-07-30",
                'max': "2023-12-31",
                'format': '%Y-%m-%d',
            }
        ),
    )

    time = forms.TimeField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='time',  # Заголовок поля
        help_text='<small class="text-muted underline">10:27</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=datetime.datetime.now().strftime('%H:%M'),  # Начальное значение поля (Имеет приоритет
        # перед "widget.attrs.value")
        widget=forms.TimeInput(
            attrs={
                'type': 'time',  # HTML тип поля
                'name': 'time',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': datetime.datetime.now().strftime('%H:%M'),  # Данные, которые видны при
                # удалении всей информации
                'value': datetime.datetime.now().strftime('%H:%M'),  # Начальное значение поля (
                # Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'min': "01:00",
                'max': "22:59",
                'format': '%H:%M:%S',
            }
        ),
    )

    checkbox = forms.BooleanField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='text',  # Заголовок поля
        help_text='<small class="text-muted underline">checkbox</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=True,  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.CheckboxInput(
            attrs={
                'type': 'checkbox',  # HTML тип поля
                'name': 'checkbox',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'checkbox',  # Данные, которые видны при удалении всей информации
                'value': 'checkbox',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-check-input',  # HTML / css / bootstrap классы
            }
        ),
    )

    checkbox_null = forms.NullBooleanField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='checkbox_null',  # Заголовок поля
        help_text='<small class="text-muted underline">checkbox_null</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial=None,  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.NullBooleanSelect(
            attrs={
                'type': 'checkbox',  # HTML тип поля
                'name': 'checkbox_null',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'checkbox_null',  # Данные, которые видны при удалении всей информации
                'value': 'checkbox_null',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            }
        ),
    )

    MONTH_CHOICES = (
        ('JANUARY', "January"),
        ('FEBRUARY', "February"),
        ('MARCH', "March"),
        ('DECEMBER', "December"),
    )
    select = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='text',  # Заголовок поля
        help_text='<small class="text-muted underline">checkbox</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='MARCH',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.Select(
            attrs={
                'type': 'select',  # HTML тип поля
                'name': 'select',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'MARCH',  # Данные, которые видны при удалении всей информации
                'value': 'MARCH',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            },
            choices=MONTH_CHOICES,
        ),
    )

    selectmultiple = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='selectmultiple',  # Заголовок поля
        help_text='<small class="text-muted underline">selectmultiple</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='MARCH',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.SelectMultiple(
            attrs={
                'type': 'select',  # HTML тип поля
                'name': 'selectmultiple',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'MARCH',  # Данные, которые видны при удалении всей информации
                'value': 'MARCH',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            },
            choices=MONTH_CHOICES,
        ),
    )

    radioselect = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='radioselect',  # Заголовок поля
        help_text='<small class="text-muted underline">radioselect</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='MARCH',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.RadioSelect(
            attrs={
                'type': 'radio',  # HTML тип поля
                'name': 'radioselect',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'MARCH',  # Данные, которые видны при удалении всей информации
                'value': 'MARCH',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': '',  # HTML / css / bootstrap классы
            },
            choices=MONTH_CHOICES,
        ),
    )

    checkboxselectmultiple = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='checkboxselectmultiple',  # Заголовок поля
        help_text='<small class="text-muted underline">checkboxselectmultiple</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='MARCH',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.CheckboxSelectMultiple(
            attrs={
                'type': 'checkbox',  # HTML тип поля
                'name': 'checkboxselectmultiple',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'MARCH',  # Данные, которые видны при удалении всей информации
                'value': 'MARCH',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': '',  # HTML / css / bootstrap классы
            },
            choices=MONTH_CHOICES,
        ),
    )

    file_input = forms.CharField(
        required=False,
        widget=forms.FileInput(
            attrs={'type': 'file',
                   'name': 'file_input',
                   'class': '',
                   'placeholder': 'file_input'},
        ),
    )

    file = forms.FileField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='file',  # Заголовок поля
        help_text='<small class="text-muted underline">file</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='file',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.FileInput(
            attrs={
                'type': 'file',  # HTML тип поля
                'name': 'file',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'file',  # Данные, которые видны при удалении всей информации
                'value': 'file',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'accept': '.xlsx, .xls, .csv',  # 'image/*' 'text/*' 'text/plain' '.xlsx, .xls, .csv'
            }
        ),
    )

    clearablefile = forms.FileField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='file',  # Заголовок поля
        help_text='<small class="text-muted underline">clearablefile</small><br>',  # Вспомогательный текст
        # для поля (Можно передавать html теги)
        initial='',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.ClearableFileInput(
            attrs={
                'type': 'file',  # HTML тип поля
                'name': 'clearablefile',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'clearablefile',  # Данные, которые видны при удалении всей информации
                'value': 'clearablefile',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'accept': 'image/*',  # 'image/*' 'text/*' 'text/plain' '.xlsx, .xls, .csv'
            }
        ),
    )

    class Example:
        text_input = forms.CharField(
            required=False,
            widget=forms.TextInput(
                attrs={'type': 'text',
                       'name': 'text_input',
                       'class': '',
                       'placeholder': 'text_input'}
            ),
        )

        number_input = forms.IntegerField(
            required=False,
            widget=forms.NumberInput(
                attrs={'type': 'number',
                       'name': 'number_input',
                       'class': '',
                       'placeholder': 'number_input'}
            ),
        )

        email_input = forms.EmailField(
            required=False,
            widget=forms.EmailInput(
                attrs={'type': 'email',
                       'name': 'email_input',
                       'class': '',
                       'placeholder': 'email_input'}
            ),
        )

        url_input = forms.URLField(
            required=False,
            widget=forms.URLInput(
                attrs={'type': 'url',
                       'name': 'url_input',
                       'class': '',
                       'placeholder': 'url_input'}
            ),
        )

        password_input = forms.CharField(
            required=False,
            widget=forms.PasswordInput(
                attrs={'type': 'password',
                       'name': 'password_input',
                       'class': '',
                       'placeholder': 'password_input'}
            ),
        )

        hidden_input = forms.CharField(
            required=False,
            widget=forms.HiddenInput(
                attrs={'type': 'hidden',
                       'name': 'hidden_input',
                       'class': '',
                       'placeholder': 'hidden_input'}
            ),
        )

        datetime_input = forms.DateTimeField(
            required=False,
            widget=forms.DateTimeInput(
                attrs={'type': 'datetime-local',
                       'name': 'datetime_input',
                       'class': '',
                       'placeholder': 'datetime_input',
                       'format': '%Y-%m-%d %H:%M:%S'}
            ),
        )

        date_input = forms.DateField(
            required=False,
            widget=forms.DateInput(
                attrs={'type': 'datetime-local',
                       'name': 'date_input',
                       'class': '',
                       'placeholder': 'date_input',
                       'format': '%Y-%m-%d %H:%M:%S'}
            ),
        )

        time_input = forms.TimeField(
            required=False,
            widget=forms.TimeInput(
                attrs={'type': 'datetime-local',
                       'name': 'time_input',
                       'class': '',
                       'placeholder': 'time_input',
                       'format': '%Y-%m-%d %H:%M:%S'}
            ),
        )

        textarea_input = forms.CharField(
            required=False,
            widget=forms.Textarea(
                attrs={'type': 'text',
                       'name': 'textarea_input',
                       'class': '',
                       'placeholder': 'textarea_input'}
            ),
        )

        checkbox_input = forms.BooleanField(
            required=False,
            widget=forms.CheckboxInput(
                attrs={'type': 'checkbox',
                       'name': 'checkbox_input',
                       'class': '',
                       'placeholder': 'checkbox_input'}
            ),
        )

        MONTH_CHOICES = (
            ('JANUARY', "January"),
            ('FEBRUARY', "February"),
            ('MARCH', "March"),
            ('DECEMBER', "December"),
        )
        select_input = forms.CharField(
            required=False,
            widget=forms.Select(
                attrs={'type': 'select',
                       'name': 'select_input',
                       'class': '',
                       'placeholder': 'select_input'},
                choices=MONTH_CHOICES,
            ),
        )

        nullbooleanselect_input = forms.NullBooleanField(
            required=False,
            widget=forms.NullBooleanSelect(
                attrs={'type': 'checkbox',
                       'name': 'nullbooleanselect_input',
                       'class': '',
                       'placeholder': 'nullbooleanselect_input'},
            ),
        )

        selectmultiple_input = forms.CharField(
            required=False,
            widget=forms.SelectMultiple(
                attrs={'type': 'select',
                       'name': 'selectmultiple_input',
                       'class': '',
                       'placeholder': 'selectmultiple_input'},
                choices=MONTH_CHOICES,
            ),
        )

        radioselect_input = forms.CharField(
            required=False,
            widget=forms.RadioSelect(
                attrs={'type': 'radio',
                       'name': 'radioselect_input',
                       'class': '',
                       'placeholder': 'radioselect_input'},
                choices=MONTH_CHOICES,
            ),
        )

        checkboxselectmultiple_input = forms.CharField(
            required=False,
            widget=forms.CheckboxSelectMultiple(
                attrs={'type': 'checkbox',
                       'name': 'checkboxselectmultiple_input',
                       'class': '',
                       'placeholder': 'checkboxselectmultiple_input'},
                choices=MONTH_CHOICES,
            ),
        )

        file_input = forms.FileField(
            required=False,
            widget=forms.FileInput(
                attrs={'type': 'file',
                       'name': 'file_input',
                       'class': '',
                       'placeholder': 'file_input'},
            ),
        )

        clearablefileinput_input = forms.FileField(
            required=False,
            widget=forms.ClearableFileInput(
                attrs={'type': 'file',
                       'name': 'clearablefileinput_input',
                       'class': 'form-control',
                       'accept': 'image/*',
                       'placeholder': 'clearablefileinput_input'},
            ),
        )

    class Meta:
        model = ExampleModel
        # fields = ('username', 'password_1', 'password_2', 'email')
        fields = '__all__'


# Account
class CreateUserCustomForm(forms.Form):
    """
    Create User Custom Form
    """

    username = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='Имя пользователя:',  # Заголовок поля
        help_text='<small class="text-muted">введите выше идентификатор пользователя: 12 знаков</small><br><br><br>',
        # Вспомогательный текст для поля (Можно передавать html теги)
        # initial='',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.TextInput(
            attrs={
                'type': 'text',  # HTML тип поля
                'name': 'username',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': 'введите в этом поле имя пользователя',  # Данные, которые видны при удалении всей
                # информации
                'value': '{{ request.user.username }}',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '12',
                'maxlength': '12',
            }
        ),
    )
    password_1 = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='Введите желаемый пароль',  # Заголовок поля
        help_text='<small class="text-muted">введите выше пароль для входа: от 8 до 16 символов</small><br><br><br>',  #
        # Вспомогательный текст для поля (Можно передавать html теги)
        initial='',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.PasswordInput(
            attrs={
                'type': 'password',  # HTML тип поля
                'name': 'password_1',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': '',  # Данные, которые видны при удалении всей информации
                'value': '',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '8',
                'maxlength': '16',
            }
        ),
    )
    password_2 = forms.CharField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='Повторите введённый пароль',  # Заголовок поля
        help_text='<small class="text-muted">повторите выше пароль для входа: от 8 до 16 символов</small><br><br><br>',  #
        # Вспомогательный текст для поля (Можно передавать html теги)
        initial='',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.PasswordInput(
            attrs={
                'type': 'password',  # HTML тип поля
                'name': 'password_2',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                'placeholder': '',  # Данные, которые видны при удалении всей информации
                'value': '',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы

                'minlength': '8',
                'maxlength': '16',
            }
        ),
    )

    class Meta:
        model = User
        # fields = ('username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'is_active', 'is_staff',
        # 'groups', 'patronymic', 'personnel_number', 'subdivision', 'workshop_service', 'department_site', 'position',
        # 'category')
        fields = '__all__'


class CreateUserForm(UserCreationForm):
    """
    Форма создания одиночного пользователя
    """
    username = forms.CharField(label='ИИН пользователя', min_length=12, max_length=12, required=True,
                               help_text='Внимание, вводите ИИН!',
                               widget=forms.TextInput(attrs={'type': 'text', 'name': 'username', 'value': '',
                                                             'placeholder': '', 'class': 'form-control',
                                                             'required': ''}),
                               validators=[MinLengthValidator(12), MaxLengthValidator(12), ])
    first_name = forms.CharField(label='Имя', max_length=50, required=False)
    last_name = forms.CharField(label='Фамилия', max_length=50, required=False)
    email = forms.EmailField(label='Адрес электронной почты', max_length=100, required=False,
                             help_text='пример: bogdandrienko@gmail.com')
    is_active = forms.BooleanField(label='Активность аккаунта', required=False, initial=True,
                                   widget=forms.CheckboxInput(attrs={'type': 'checkbox',
                                                                     'name': 'rational_status', 'value': 'True',
                                                                     'class': 'form-check form-check-input'}),
                                   help_text='Уберите галочку, если нужно заблокировать аккаунт')
    is_staff = forms.BooleanField(label='Доступ к панели модерации', required=False,
                                  help_text='Поставьте галочку, если нужно разрешить доступ')
    groups = forms.CharField(label='Группы пользователя', required=False,
                             help_text='В качестве разделителя используйте запятую, пример: "User, Moderator"')
    patronymic = forms.CharField(label='Отчество', required=False)
    personnel_number = forms.CharField(label='Табельный номер', required=False)
    subdivision = forms.CharField(label='Подразделение', required=False)
    workshop_service = forms.CharField(label='Цех/Служба', required=False)
    department_site = forms.CharField(label='Отдел/Участок', required=False)
    position = forms.CharField(label='Должность', required=False)
    category = forms.CharField(label='Категория', required=False)

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'is_active', 'is_staff',
                  'groups', 'patronymic', 'personnel_number', 'subdivision', 'workshop_service', 'department_site',
                  'position', 'category')


class ChangePasswordForm(forms.Form):
    """
    Change Password Form
    """
    # Main data account
    password_1 = forms.CharField(
        label='Новый пароль:',
        widget=forms.PasswordInput(
            attrs={'type': 'password', 'name': 'password_1', 'placeholder': '', 'class': 'form-control', 'value': '',
                   'required': ''}
        ),
        min_length=8,
        max_length=16,
        validators=[MinLengthValidator(8), MaxLengthValidator(16), ],
        required=True
    )
    password_2 = forms.CharField(
        label='Повторите новый пароль:',
        widget=forms.PasswordInput(
            attrs={'type': 'password', 'name': 'password_2', 'placeholder': '', 'class': 'form-control', 'value': '',
                   'required': ''}
        ),
        min_length=8,
        max_length=16,
        validators=[MinLengthValidator(8), MaxLengthValidator(16), ],
        required=True
    )
    # Third data account
    email = forms.EmailField(
        label='Электронная почта', required=True,
        help_text='Электронная почта, на которую будут приходить вспомогательные сообщения.',
        widget=forms.TextInput(attrs={'type': 'email', 'name': 'email', 'value': '', 'placeholder': '',
                                      'class': 'form-control', 'required': ''})
    )
    secret_question = forms.CharField(
        label='Секретный вопрос', min_length=1, max_length=50, required=True,
        help_text='Вопрос, на который надо будет ответить при восстановлении пароля.',
        widget=forms.TextInput(attrs={'type': 'text', 'name': 'secret_question', 'value': '', 'placeholder': '',
                                      'class': 'form-control', 'required': ''}),
        validators=[MinLengthValidator(1), MaxLengthValidator(50), ]
    )
    secret_answer = forms.CharField(
        label='Секретный ответ', min_length=1, max_length=50, required=True,
        help_text='Ответ на вопрос, который будет необходим при восстановлении пароля.',
        widget=forms.TextInput(attrs={'type': 'text', 'name': 'secret_answer', 'value': '', 'placeholder': '',
                                      'class': 'form-control', 'required': ''}),
        validators=[MinLengthValidator(1), MaxLengthValidator(50), ]
    )

    class Meta:
        model = Profile
        fields = ('password_1', 'password_2', 'email', 'secret_question', 'secret_answer')


class ChangeUserForm(forms.Form):
    """
    Change User Form
    """
    # Second data account
    education = forms.CharField(
        label='Образование', min_length=0, max_length=300, required=False,
        help_text='В качестве разделителя на абзацы используйте символ "|", если хотите не заменять данные, '
                  'оставьте поле пустым.',
        widget=forms.Textarea(attrs={'type': 'text', 'name': 'education', 'value': '', 'placeholder': '',
                                     'class': 'form-control'}),
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ]
    )
    achievements = forms.CharField(
        label='Достижения', min_length=0, max_length=300, required=False,
        help_text='В качестве разделителя на абзацы используйте символ "|", если хотите не заменять данные, '
                  'оставьте поле пустым.',
        widget=forms.Textarea(attrs={'type': 'text', 'name': 'achievements', 'value': '', 'placeholder': '',
                                     'class': 'form-control'}),
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ]
    )
    biography = forms.CharField(
        label='Биография', min_length=0, max_length=300, required=False,
        help_text='В качестве разделителя на абзацы используйте символ "|", если хотите не изменять данные, '
                  'оставьте поле пустым.',
        widget=forms.Textarea(attrs={'type': 'text', 'name': 'biography', 'value': '', 'placeholder': '',
                                     'class': 'form-control'}),
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ]
    )
    hobbies = forms.CharField(
        label='Хобби', min_length=0, max_length=300, required=False,
        help_text='В качестве разделителя на абзацы используйте символ "|", если хотите не заменять данные, '
                  'оставьте поле пустым.',
        widget=forms.Textarea(attrs={'type': 'text', 'name': 'hobbies', 'value': '', 'placeholder': '',
                                     'class': 'form-control'}),
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ]
    )
    image_avatar = forms.ImageField(label="Аватарка профиля", widget=forms.ClearableFileInput(
        attrs={'type': 'file', 'name': 'image_avatar',
               'class': 'form-control'}), required=False)

    class Meta:
        model = Profile
        fields = '__all__'


class CreateUsersForm(forms.Form):
    """
    Create Users Form
    """
    document_addition_file_1 = forms.FileField(label="Добавьте excel-файл (.xlsx/.xls)",
                                               widget=forms.ClearableFileInput(
                                                   attrs={'type': 'file', 'name': 'document_addition_file_1',
                                                          'class': 'form-control'}),
                                               validators=[FileExtensionValidator(['.xlsx', '.xls'])], required=True,
                                               allow_empty_file=False)


class GeneratePasswordsForm(forms.Form):
    """
    Generate Passwords Form
    """
    passwords_chars = forms.SlugField(
        label='Разрешённые символы', min_length=8, max_length=64,
        widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'passwords_chars',
                   'value': 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                   'placeholder': 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                   'class': 'form-control',
                   'required': ''}), validators=[MinLengthValidator(8), MaxLengthValidator(64), ], required=False)
    passwords_quantity = forms.IntegerField(label='Количество паролей?',
                                            widget=forms.NumberInput(
                                                attrs={'type': 'number', 'name': 'passwords_quantity', 'value': '1',
                                                       'placeholder': '1',
                                                       'class': 'form-control', 'min': '1', 'max': '3000'}),
                                            validators=[MinValueValidator(1), MaxValueValidator(3000), ], required=True)
    passwords_length = forms.IntegerField(label='Количество символов?',
                                          widget=forms.NumberInput(
                                              attrs={'type': 'number', 'name': 'passwords_length', 'value': '8',
                                                     'placeholder': '8',
                                                     'class': 'form-control', 'min': '8', 'max': '24'}),
                                          validators=[MinValueValidator(8), MaxValueValidator(24), ], required=True)


# upgrade
class BankIdeasForm(forms.Form):
    """
    Bank Ideas Form
    """
    name = forms.CharField(
        label='название', widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'name', 'placeholder': 'название', 'class': 'form-control', 'required': ''}),
        required=True,
        help_text='<small class="text-muted underline">Введите желаемое название проекта</small><br>',
    )
    # CATEGORY_CHOICES = (
    #     ('1', "В процессе"),
    #     ('2', "Экология"),
    #     ('3', "Индустриализация"),
    #     ('4', "Инновации"),
    # )
    # category = forms.SlugField(
    #     disabled=False,  # Отключено ли поле в форме
    #     localize=False,  # Локализовать ли контент принудительно
    #     required=True,  # Требовать ли наличие данных в поле
    #     label='категория',  # Заголовок поля
    #     help_text='<small class="text-muted underline">Выберите одну из всплывающих категорий</small><br>',
    #     # для поля (Можно передавать html теги)
    #     initial='4',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
    #     widget=forms.Select(
    #         attrs={
    #             'type': 'select',  # HTML тип поля
    #             'name': 'category',  # HTML имя поля
    #             'required': '',  # Требовать ли наличие данных в поле
    #             'placeholder': '4',  # Данные, которые видны при удалении всей информации
    #             'value': '4',  # Начальное значение поля (Второстепенное по приориту после "initial")
    #             'class': 'form-control',  # HTML / css / bootstrap классы
    #         },
    #         choices=CATEGORY_CHOICES,
    #     ),
    # )
    category = forms.ModelChoiceField(
        disabled=False,  # Отключено ли поле в форме
        localize=False,  # Локализовать ли контент принудительно
        required=True,  # Требовать ли наличие данных в поле
        label='категория',  # Заголовок поля
        help_text='<small class="text-muted underline">Выберите одну из всплывающих категорий</small><br>',
        # для поля (Можно передавать html теги)
        # initial='',  # Начальное значение поля (Имеет приоритет перед "widget.attrs.value")
        widget=forms.Select(
            attrs={
                'type': 'select',  # HTML тип поля
                'name': 'category',  # HTML имя поля
                'required': '',  # Требовать ли наличие данных в поле
                # 'placeholder': '',  # Данные, которые видны при удалении всей информации
                # 'value': '',  # Начальное значение поля (Второстепенное по приориту после "initial")
                'class': 'form-control',  # HTML / css / bootstrap классы
            },
        ),
        queryset=IdeasCategoryModel.objects.order_by('id'),
        empty_label="не выбрано",
    )

    # category = forms.ModelChoiceField(
    #     to_field_name=None,
    #     required=True,
    #     label='категория',
    #     help_text='<small class="text-muted underline">Выберите одну всплывающих из категорий</small><br>',
    #     widget=forms.Select(
    #         attrs={
    #             'class': 'form-select form-select-lg mb-3',
    #             'aria-label': '.form-select-lg example',
    #             'required': ''
    #         }
    #     ),
    #     empty_label="не выбрано",
    #     queryset=IdeasCategoryModel.objects.order_by('id'),
    # )

    short_description = forms.CharField(
        label='короткое описание', widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'short_description', 'placeholder': 'короткое описание',
                   'class': 'form-control',
                   'required': ''}),
        required=True,
        help_text='<small class="text-muted underline">Введите короткое описание проекта</small><br>',
    )
    long_description = forms.CharField(
        label='длинное описание', widget=forms.Textarea(
            attrs={'type': 'text', 'name': 'long_description', 'placeholder': 'длинное описание',
                   'class': 'form-control',
                   'required': ''}),
        required=True,
        help_text='<small class="text-muted underline">Введите длинное описание проекта</small><br>',
    )

    image = forms.ImageField(
        label="Аватарка к идеи", widget=forms.ClearableFileInput(
            attrs={'type': 'file', 'name': 'image', 'class': 'form-control'}),
        required=False, allow_empty_file=True,
        help_text='<small class="text-muted underline">Аватарка для проекта</small>><br>',
    )
    document = forms.FileField(
        label="документ к идеи", widget=forms.ClearableFileInput(
            attrs={'type': 'file', 'name': 'document', 'class': 'form-control'}),
        required=False, allow_empty_file=True,
        help_text='<small class="text-muted underline">Документ, прикрепляемый к проекту</small><br>',
    )

    class Meta:
        model = IdeasModel
        fields = '__all__'


# Rational
class RationalForm(forms.Form):
    """
    Rational Create Form
    """
    rational_structure_from = models.CharField('имя подразделения', max_length=50, blank=True)
    rational_uid_registered = forms.IntegerField(label='номер регистрации', widget=forms.NumberInput(
        attrs={'type': 'number', 'name': 'rational_uid_registered', 'value': '0', 'placeholder': '0',
               'class': 'form-control'}), required=False)
    rational_date_registered = forms.DateTimeField(label='дата регистрации', widget=forms.DateTimeInput(
        attrs={'type': "datetime-local", 'name': 'rational_date_registered', 'class': 'form-control', 'required': ''}),
                                                   required=False)
    rational_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_name', 'placeholder': 'название статьи', 'class': 'form-control',
               'required': ''}), required=True)
    rational_place_innovation = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_place_innovation', 'placeholder': 'место внедрения',
               'class': 'form-control'}), required=False)
    rational_description = forms.CharField(label="описание", widget=CKEditorUploadingWidget(), required=False)
    rational_addition_file_1 = forms.FileField(label="приложение 1", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_1', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_addition_file_2 = forms.FileField(label="приложение 2", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_2', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_addition_file_3 = forms.FileField(label="приложение 3", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_3', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_offering_members_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                        'style="width:1000px"><thead><tr><td><p>Фамилия, имя, ' \
                                        'отчество авторов</p></td><td><p>Место ' \
                                        'работы</p></td><td><p>Должность</p></td><td><p>Доля (%) ' \
                                        'участия*</p></td><td><p>Год ' \
                                        'рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td' \
                                        '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr' \
                                        '><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                        ';</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                        '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td' \
                                        '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr' \
                                        '><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                        ';</td><td>&nbsp;</td></tr></tbody></table> '
    rational_offering_members_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_offering_members_button',
               'name': 'rational_offering_members_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_offering_members_default}))
    rational_offering_members = forms.CharField(label="предложившие участники", widget=CKEditorUploadingWidget(),
                                                required=False)
    rational_conclusion_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                  'style="width:1000px"><thead><tr><td><p>Название Структурного ' \
                                  'подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, ' \
                                  'название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td' \
                                  '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp' \
                                  ';</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td' \
                                  '>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                  '><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                  ';</td></tr></tbody></table> '
    rational_conclusion_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_conclusion_button',
               'name': 'rational_conclusion_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_conclusion_default}))
    rational_conclusion = forms.CharField(label="заключения по предложению", widget=CKEditorUploadingWidget(),
                                          required=False)
    rational_change_documentations_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                             'style="width:1000px"><thead><tr><td><p>Наименование ' \
                                             'документа</p></td><td><p>№ извещения</p></td><td><p>Дата ' \
                                             'изменения</p></td><td><p>Должность и название ' \
                                             'отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td' \
                                             '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr' \
                                             '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> '
    rational_change_documentations_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_change_documentations_button',
               'name': 'rational_change_documentations_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_change_documentations_default}))
    rational_change_documentations = forms.CharField(label="изменение нормативной и тех. документации",
                                                     widget=CKEditorUploadingWidget(), required=False)
    rational_resolution = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_resolution', 'placeholder': 'принятое решение',
               'class': 'form-control'}), required=False)
    rational_responsible_members_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                           'style="width:1000px"><thead><tr><td><p>ФИО ' \
                                           'сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки ' \
                                           'выполнения</p></td><td><p>Название подразделения, ' \
                                           'должность</p></td><td><p>Подпись ответственного сотрудника или его ' \
                                           'руководителя</p></td><td><p>Отметка о ' \
                                           'выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                           ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp' \
                                           ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                           '></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> '
    rational_responsible_members_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_responsible_members_button',
               'name': 'rational_responsible_members_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_responsible_members_default}))
    rational_responsible_members = forms.CharField(label="ответственные участники", widget=CKEditorUploadingWidget(),
                                                   required=False)
    rational_date_certification = forms.DateTimeField(label='дата получения удостоверения на предложение',
                                                      widget=forms.DateTimeInput(attrs={'type': "datetime-local",
                                                                                        'name': 'rational_date_create',
                                                                                        'class': 'form-control',
                                                                                        'required': ''}),
                                                      required=False)
    rational_category = forms.ModelChoiceField(label="категория", widget=forms.Select(
        attrs={'class': 'form-select form-select-lg mb-3', 'aria-label': '.form-select-lg example', 'required': ''}),
                                               queryset=CategoryRationalModel.objects.order_by('-id'),
                                               empty_label="не выбрано", to_field_name=None, required=False)
    # rational_author_name = forms.ModelChoiceField(label="имя автора", widget=forms.Select(),
    # queryset=User.objects.get(id=request.user.id), empty_label="не выбрано",  to_field_name=None, required=False)
    # rational_date_create = forms.DateTimeField(label='дата создания', widget=forms.DateTimeInput(attrs={
    # 'type':"datetime-local",'name':'rational_date_create', 'class':'form-control'}), required=False)
    rational_addition_image = forms.ImageField(label="картинка к предложению", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_image', 'class': 'form-control'}), required=False)

    # rational_status = forms.BooleanField(label='статус', widget=forms.CheckboxInput(attrs={'type':'checkbox',
    # 'name':'rational_status', 'value':'False', 'class':'form-check form-check-input'}), required=False)

    class Meta:
        model = RationalModel
        fields = '__all__'


# Extra
class CityForm(ModelForm):
    """
    City Form
    """

    class Meta:
        model = CityModel
        fields = ['name']
        widgets = {'name': TextInput(attrs={
            'class': 'form-control',
            'name': 'city',
            'id': 'city',
            'placeholder': 'Введите город'
        })}


class ArticleForm(forms.Form):
    """
    Article Form
    """
    article_text = forms.CharField(label="текст статьи", widget=CKEditorUploadingWidget())

    class Meta:
        model = ArticleModel
        fields = '__all__'


class SmsForm(forms.Form):
    """
    Sms Form
    """
    sms_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор сообщения')
    sms_description = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={'type': "text", 'name': 'sms_description', 'placeholder': 'текст сообщения',
                                      'class': 'form-control'}), required=False
    )
    sms_date = models.DateTimeField('дата отправки', auto_now_add=True)

    class Meta:
        model = SmsModel
        fields = '__all__'


class MessageForm(forms.Form):
    """
    Message Form
    """
    """Форма RationalModel, с виджетом ckeditor"""
    message_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_name', 'placeholder': 'название', 'class': 'form-control',
               'required': ''}), required=False)
    message_slug = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_slug', 'placeholder': 'кому', 'class': 'form-control', 'required': ''}),
                                   required=False)
    message_description = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_description', 'placeholder': 'ссылка', 'class': 'form-control',
               'required': ''}), required=False)

    class Meta:
        model = MessageModel
        fields = '__all__'


class DocumentForm(forms.Form):
    """
    Document Form
    """
    """Форма RationalModel, с виджетом ckeditor"""
    document_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_name', 'placeholder': 'имя', 'class': 'form-control', 'required': ''}),
                                    required=False)
    document_slug = forms.SlugField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_slug', 'placeholder': 'ссылка', 'class': 'form-control',
               'required': ''}), required=False)
    document_description = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_description', 'placeholder': 'описание', 'class': 'form-control',
               'required': ''}), required=False)
    document_addition_file_1 = forms.FileField(label="приложение 1", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'message_addition_file_1', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    document_addition_file_2 = forms.FileField(label="приложение 2", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'message_addition_file_2', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)

    class Meta:
        model = DocumentModel
        fields = '__all__'


class ContactForm(forms.Form):
    """
    Contact Form
    """
    contact_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_name', 'placeholder': 'имя', 'class': 'form-control', 'required': ''}),
                                   required=False)
    contact_slug = forms.SlugField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_slug', 'placeholder': 'ссылка', 'class': 'form-control',
               'required': ''}), required=False)
    contact_description = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'message_description', 'placeholder': 'описание', 'class': 'form-control',
               'required': ''}), required=False)
    contact_image = forms.ImageField(label="картинка к контакту", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_image', 'class': 'form-control'}), required=False)

    class Meta:
        model = ContactModel
        fields = '__all__'


class NotificationForm(forms.Form):
    """
    Notification Form
    """
    """Форма RationalModel, с виджетом ckeditor"""
    notification_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'notification_name', 'placeholder': 'название', 'class': 'form-control',
               'required': ''}), required=False)
    notification_slug = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'notification_slug', 'placeholder': 'ссылка', 'class': 'form-control',
               'required': ''}), required=False)
    notification_description = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'notification_description', 'placeholder': 'описание', 'class': 'form-control',
               'required': ''}), required=False)

    # notification_date           = forms.DateTimeField(label='', widget=forms.DateTimeInput(attrs={
    # 'type':"datetime-local",'name':'notification_date', 'class':'form-control', 'required':''}), required=False)
    # notification_status         = forms.BooleanField(label='', widget=forms.CheckboxInput(attrs={'type':'checkbox',
    # 'name':'notification_status', 'value':'False', 'class':'form-check form-check-input'}), required=False)
    # notification_author         =

    class Meta:
        model = NotificationModel
        fields = '__all__'


class GeoForm(forms.Form):
    """
    Geo Form
    """
    # request_name = forms.CharField(label='', widget=forms.TextInput(
    #     attrs={'type': "text", 'name': 'request_name', 'placeholder': 'get_xlsx', 'value': 'get_xlsx', 'class':
    #         'd-none', 'required': ''}), required=False)
    request_value = forms.IntegerField(label='Разряд округления широты и долготы:',
                                       widget=forms.NumberInput(
                                           attrs={'type': 'number', 'name': 'request_value', 'value': '5',
                                                  'placeholder': '5', 'class': 'form-control', 'min': '1',
                                                  'max': '10'}),
                                       validators=[MinValueValidator(1), MaxValueValidator(10), ], required=True)
    request_minutes = forms.IntegerField(label='Количество затрагиваемых минут от текущего момента(длительный запрос):',
                                         widget=forms.NumberInput(
                                             attrs={'type': 'number', 'name': 'request_minutes',
                                                    'value': '10', 'placeholder': '10', 'class': 'form-control',
                                                    'min': '1', 'max': '3600'}),
                                         validators=[MinValueValidator(1), MaxValueValidator(3600), ],
                                         required=True)
    request_between_first = forms.IntegerField(label='Начало диапазона устройств(включительно):',
                                               widget=forms.NumberInput(
                                                   attrs={'type': 'number', 'name': 'request_between_first',
                                                          'value': '6', 'placeholder': '6', 'class': 'form-control',
                                                          'min': '1', 'max': '300'}),
                                               validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                               required=True)
    request_between_last = forms.IntegerField(label='Конец диапазона устройств(включительно)(не более 5 одновременно):',
                                              widget=forms.NumberInput(
                                                  attrs={'type': 'number', 'name': 'request_between_last', 'value': '6',
                                                         'placeholder': '6', 'class': 'form-control', 'min': '1',
                                                         'max': '300'}),
                                              validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                              required=True)

    count_points = forms.IntegerField(label='Количество точек:',
                                      widget=forms.NumberInput(
                                          attrs={'type': 'number', 'name': 'count_points', 'value': '150',
                                                 'placeholder': '150', 'class': 'form-control', 'min': '1',
                                                 'max': '500'}),
                                      validators=[MinValueValidator(1), MaxValueValidator(500), ], required=True)
    correct_rad = forms.IntegerField(label='Коррекция искривления:',
                                     widget=forms.NumberInput(
                                         attrs={'type': 'number', 'name': 'correct_rad', 'value': '2',
                                                'placeholder': '2', 'class': 'form-control', 'min': '0',
                                                'max': '7'}),
                                     validators=[MinValueValidator(0), MaxValueValidator(7), ], required=True)
    rounded_val = forms.IntegerField(label='Разряд округления:',
                                     widget=forms.NumberInput(
                                         attrs={'type': 'number', 'name': 'rounded_val', 'value': '5',
                                                'placeholder': '5', 'class': 'form-control', 'min': '5',
                                                'max': '8'}),
                                     validators=[MinValueValidator(5), MaxValueValidator(8), ], required=True)
