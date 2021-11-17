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
    field = forms.CharField(
        required=True,
        label='Название',
        initial='',
        widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'name', 'placeholder': '', 'class': 'form-control', 'value': '',
                   'required': ''}
        ),
        help_text='help_text',
        error_messages={'required': 'Please enter your name'},
        validators=[MinLengthValidator(0), MaxLengthValidator(16), ],
        localize=False,
        disabled=False,



        min_length=0,
        max_length=16,
    )

    boolean_field = forms.BooleanField(
        widget=forms.CheckboxInput(
            attrs={'type': 'text',
                   'name': 'name',
                   'placeholder': '',
                   'class': 'form-control',
                   'value': '',
                   'required': ''}
        ),
    )

    # name = forms.CharField(
    #     label='Название',
    #     widget=forms.TextInput(
    #         attrs={'type': 'text', 'name': 'name', 'placeholder': '', 'class': 'form-control', 'value': '',
    #                'required': ''}
    #     ),
    #     required=True
    # )

    class Example:
        boolean_field = models.BooleanField(
            db_column='boolean_field',
            db_index=True,
            db_tablespace='boolean_field_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=False,
            help_text='<em>Значение правда или ложь, example: "True" / "False"</em>',
            verbose_name='boolean',
        )

        char_field = models.CharField(
            db_column='char_field',
            db_index=True,
            db_tablespace='char_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(16), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=16,
            help_text='<em>Небольшая срока текста, example: "текст, текст"</em>',
            verbose_name='char',
        )

        text_field = models.TextField(
            db_column='text_field',
            db_index=True,
            db_tablespace='text_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(254), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=254,
            help_text='<em>Много текста, example: "текст, текст..."</em>',
            verbose_name='text',
        )

        slug_field = models.SlugField(
            db_column='slug_field',
            db_index=True,
            db_tablespace='slug_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(64), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=64,
            help_text='<em>Строка текста валидная для ссылок и системных вызовов, example: "success"</em>',
            verbose_name='slug',
        )

        email_field = models.EmailField(
            db_column='email_field',
            db_index=True,
            db_tablespace='email_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(254), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=254,
            help_text='<em>Строка содержащая почту, example: "bogdandrienko@gmail.com"</em>',
            verbose_name='email',
        )

        url_field = models.URLField(
            db_column='url_field',
            db_index=True,
            db_tablespace='url_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(200), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=200,
            help_text='<em>Строка содержащая url-адрес, example: "http://89.218.132.130:8000/"</em>',
            verbose_name='url',
        )

        ipaddress_field = models.GenericIPAddressField(
            db_column='ipaddress_field',
            db_index=True,
            db_tablespace='ipaddress_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(16), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='',
            max_length=16,
            help_text='<em>Строка содержащая ip-адрес, example: "127.0.0.1"</em>',
            verbose_name='ipaddress',

            protocol='both',
            unpack_ipv4=False,
        )

        integer_field = models.IntegerField(
            db_column='integer_field',
            db_index=True,
            db_tablespace='integer_field_tablespace',
            primary_key=False,
            validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=0,
            help_text='<em>Целочисленное значение от -2147483648 до 2147483647, example: "0"</em>',
            verbose_name='integer',
        )

        big_integer_field = models.BigIntegerField(
            db_column='big_integer_field',
            db_index=True,
            db_tablespace='big_integer_field_tablespace',
            primary_key=False,
            validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=0,
            help_text='<em>Большое целочисленное значение от -9223372036854775808 до 9223372036854775807, example: "0"'
                      '</em>',
            verbose_name='big integer',
        )

        positive_integer_field = models.BigIntegerField(
            db_column='positive_integer_field',
            db_index=True,
            db_tablespace='positive_integer_field_tablespace',
            primary_key=False,
            validators=[MinValueValidator(0), MaxValueValidator(1000), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=0,
            help_text='<em>Положительное целочисленное значение от 0 до 2147483647, example: "0"</em>',
            verbose_name='positive integer',
        )

        float_field = models.FloatField(
            db_column='float_field',
            db_index=True,
            db_tablespace='float_field_tablespace',
            primary_key=False,
            validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=0.0,
            help_text='<em>Число с плавающей запятой, example: "0.0"</em>',
            verbose_name='float',
        )

        decimal_field = models.DecimalField(
            db_column='decimal_field',
            db_index=True,
            db_tablespace='decimal_field_tablespace',
            primary_key=False,
            validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=0.0,
            help_text='<em>Нецелочисленное значение, example: "0.000"</em>',
            verbose_name='decimal',

            max_digits=10,
            decimal_places=5,
        )

        datetime_field = models.DateTimeField(
            db_column='datetime_field',
            db_index=True,
            db_tablespace='datetime_field_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=timezone.now,
            help_text='<em>Дата и время, example: "31.12.2021Т23:59:59"</em>',
            verbose_name='datetime',
        )

        date_field = models.DateField(
            db_column='date_field',
            db_index=True,
            db_tablespace='date_field_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=timezone.now,
            help_text='<em>Дата, example: "31.12.2021"</em>',
            verbose_name='date',
        )

        time_field = models.TimeField(
            db_column='time_field',
            db_index=True,
            db_tablespace='time_field_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=timezone.now,
            help_text='<em>Время, example: "23:59:59"</em>',
            verbose_name='time',
        )

        duration_field = models.DurationField(
            db_column='duration_field',
            db_index=True,
            db_tablespace='duration_field_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=timezone.timedelta,
            help_text='<em>Длительность во времени, example: "01:59:59"</em>',
            verbose_name='duration',
        )

        file_field = models.FileField(
            db_column='file_field',
            db_index=True,
            db_tablespace='file_field_tablespace',
            validators=[FileExtensionValidator(['xlsx', 'xls'])],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='uploads/example/example.xlsx',
            help_text='<em>Файл, с расширением указанным в валидаторе, example: "example.xlsx"</em>',
            verbose_name='file',

            upload_to='uploads/example/%Y/%m/%d/',
        )

        image_field = models.FileField(
            db_column='image_field',
            db_index=True,
            db_tablespace='image_field_tablespace',

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default='uploads/example/example.jpg',
            help_text='<em>Файл, с расширением изображения, example: "example.jpg(/png/bpm...)"</em>',
            verbose_name='image',

            upload_to='uploads/example/%Y/%m/%d/',
            # height_field=1920,  # Значение высоты изображения при каждом сохранении объекта
            # width_field=1080,  # Значение ширины изображения при каждом сохранении объекта.
        )

        foreignkey = models.ForeignKey(
            db_column='foreignkey',
            db_index=True,
            db_tablespace='foreignkey_tablespace',
            primary_key=False,

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            default=None,
            help_text='<em>Связь, с каким-либо объектом, example: "to=User.objects.get(username="Bogdan")"</em>',
            verbose_name='foreignkey',

            to=User,  # Model
            on_delete=models.SET_NULL,  # Устанавливает ForeignKey в NULL; возможно только если null равен True.
            # on_delete = models.CASCADE,  # Каскадное удаление.
            # on_delete=models.PROTECT,  # Препятствует удалению связанного объекта вызывая исключение
            # on_delete=models.SET_DEFAULT,  # Устанавливает ForeignKey в значение по умолчанию;
            # on_delete=models.SET(None),  # Устанавливает ForeignKey в значение указанное в SET().
            # on_delete=models.DO_NOTHING,  # Ничего не делать.
            # limit_choices_to=None,  # Ограничивает доступные значения для поля
        )

        binary_field = models.BinaryField(
            db_column='binary_field',
            db_index=True,
            db_tablespace='binary_field_tablespace',
            primary_key=False,
            validators=[MinLengthValidator(0), MaxLengthValidator(100), ],

            unique=False,
            null=True,
            editable=True,
            blank=True,
            auto_created=True,
            max_length=100,
            help_text='<em>Бинарные данные (сохранять без преписки b"), example: "OTcwODAxMzUxMTc5"</em>',
            verbose_name='binary',
        )

    class Meta:
        model = ExampleModel
        # fields = ('password_1', 'password_2', 'email', 'secret_question', 'secret_answer')
        fields = '__all__'


# Account
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
        required=True
    )
    category = forms.ModelChoiceField(
        label='категория', widget=forms.Select(
            attrs={'class': 'form-select form-select-lg mb-3', 'aria-label': '.form-select-lg example', 'required': ''}
        ), queryset=IdeasCategoryModel.objects.order_by('id'),
        empty_label="не выбрано", to_field_name=None, required=True
    )
    short_description = forms.CharField(
        label='короткое описание', widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'short_description', 'placeholder': 'короткое описание',
                   'class': 'form-control',
                   'required': ''}),
        required=True
    )
    long_description = forms.CharField(
        label='длинное описание', widget=forms.Textarea(
            attrs={'type': 'text', 'name': 'long_description', 'placeholder': 'длинное описание',
                   'class': 'form-control',
                   'required': ''}),
        required=True
    )

    image = forms.ImageField(
        label="картинка к идеи", widget=forms.ClearableFileInput(
            attrs={'type': 'file', 'name': 'image', 'class': 'form-control'}),
        required=False, allow_empty_file=True
    )
    document = forms.FileField(
        label="документ к идеи", widget=forms.ClearableFileInput(
            attrs={'type': 'file', 'name': 'document', 'class': 'form-control'}),
        required=False, allow_empty_file=True
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
