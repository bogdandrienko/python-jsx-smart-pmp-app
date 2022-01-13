import datetime
from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator

from .models import ExamplesModel


# Examples
class ExamplesModelForm(forms.Form):
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
        model = ExamplesModel
        # fields = ('username', 'password_1', 'password_2', 'email')
        fields = '__all__'


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
# extra
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
