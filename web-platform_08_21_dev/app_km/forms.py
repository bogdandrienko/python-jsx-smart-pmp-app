from django.db import models
from django import forms
from django.forms import ModelForm, TextInput
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator, MinLengthValidator, \
    MaxLengthValidator
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import RationalModel, CategoryRationalModel, NotificationModel, ContactModel, DocumentModel, \
    MessageModel, SmsModel, ArticleModel, CityModel


# Account
class CreateUserForm(UserCreationForm):
    """
    Create User Form
    """
    username = forms.IntegerField(label='Имя пользователя', required=True,
                                  help_text='Внимание, вводите свой	табельный номер!')
    first_name = forms.CharField(label='Имя', max_length=100, required=False)
    last_name = forms.CharField(label='Фамилия', max_length=100, required=False)
    email = forms.EmailField(label='Адрес электронной почты', max_length=100, required=False,
                             help_text='вид: bogdandrienko@gmail.com')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password1', 'password2', 'email')


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


class ChangeUserForm(UserCreationForm):
    """
    Change User Form
    """
    first_name = forms.CharField(label='Имя', max_length=100, required=False,
                                 widget=forms.TextInput(
                                     attrs={'name': 'username',
                                            'class': 'form-control'}), )
    last_name = forms.CharField(label='Фамилия', max_length=100, required=False)
    email = forms.EmailField(label='Адрес электронной почты', max_length=100, required=False,
                             help_text='вид: bogdandrienko@gmail.com')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password1', 'password2', 'email')


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


# Rational
class RationalForm(forms.Form):
    """
    Rational Create Form
    """
    rational_structure_from = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_structure_from', 'placeholder': 'имя подразделения',
               'class': 'form-control'}), required=False)
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
    #     attrs={'type': "text", 'name': 'request_name', 'placeholder': 'get_xlsx', 'value': 'get_xlsx', 'class': 'd-none',
    #            'required': ''}), required=False)
    request_value = forms.IntegerField(label='Разряд округления широты и долготы:',
                                       widget=forms.NumberInput(
                                           attrs={'type': 'number', 'name': 'request_value', 'value': '4',
                                                  'placeholder': '4', 'class': 'form-control', 'min': '1',
                                                  'max': '10'}),
                                       validators=[MinValueValidator(1), MaxValueValidator(10), ], required=True)
    request_hours = forms.IntegerField(label='Количество затрагиваемых часов от текущего момента:',
                                       widget=forms.NumberInput(
                                           attrs={'type': 'number', 'name': 'request_hours',
                                                  'value': '1', 'placeholder': '1', 'class': 'form-control',
                                                  'min': '1', 'max': '96'}),
                                       validators=[MinValueValidator(1), MaxValueValidator(96), ],
                                       required=True)
    request_between_first = forms.IntegerField(label='Начало диапазона устройств:',
                                               widget=forms.NumberInput(
                                                   attrs={'type': 'number', 'name': 'request_between_first',
                                                          'value': '1', 'placeholder': '1', 'class': 'form-control',
                                                          'min': '1', 'max': '300'}),
                                               validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                               required=True)
    request_between_last = forms.IntegerField(label='Конец диапазона устройств',
                                              widget=forms.NumberInput(
                                                  attrs={'type': 'number', 'name': 'request_between_last', 'value': '5',
                                                         'placeholder': '5', 'class': 'form-control', 'min': '1',
                                                         'max': '300'}),
                                              validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                              required=True)
