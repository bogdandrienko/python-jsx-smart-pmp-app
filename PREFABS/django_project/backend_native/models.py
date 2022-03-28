from django.contrib.auth.models import User, Group
from django.core.validators import FileExtensionValidator, MinLengthValidator, MaxLengthValidator, MinValueValidator, \
    MaxValueValidator
from django.db import models


# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class UserModel(models.Model):
    """
    Модель, которая содержит расширение для стандартной модели пользователя веб-платформы
    """

    user_foreign_key_field = models.ForeignKey(
        db_column='user_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='user_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Пользователь:',
        help_text='<small class="text-muted">Связь, с каким-либо пользователем, example: "to=User.objects.get'
                  '(username="Bogdan")"</small><hr><br>',

        to=User,
        on_delete=models.SET_NULL,
    )
    password_slug_field = models.SlugField(
        db_column='password_slug_field_db_column',
        db_index=True,
        db_tablespace='password_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(8), MaxLengthValidator(16), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Пароль от аккаунта пользователя',
        help_text='<small class="text-muted">password_slug_field</small><hr><br>',

        max_length=16,
        allow_unicode=False,
    )
    activity_boolean_field = models.BooleanField(
        db_column='activity_boolean_field_db_column',
        db_index=True,
        db_tablespace='activity_boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=True,
        verbose_name='Активность аккаунта пользователя',
        help_text='<small class="text-muted">activity_boolean_field</small><hr><br>',
    )
    email_field = models.EmailField(
        db_column='email_field_db_column',
        db_index=True,
        db_tablespace='email_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(1), MaxLengthValidator(254), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='email_field',
        help_text='<small class="text-muted">Строка содержащая почту, example: "bogdandrienko@gmail.com"'
                  '</small><hr><br>',

        max_length=254,
    )
    secret_question_char_field = models.CharField(
        db_column='secret_question_char_field_db_column',
        db_index=True,
        db_tablespace='secret_question_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Секретный вопрос',
        help_text='<small class="text-muted">secret_question_char_field</small><hr><br>',

        max_length=32,
    )
    secret_answer_char_field = models.CharField(
        db_column='secret_answer_char_field_db_column',
        db_index=True,
        db_tablespace='secret_answer_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(16), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Секретный ответ',
        help_text='<small class="text-muted">secret_answer_char_field</small><hr><br>',

        max_length=16,
    )
    last_name_char_field = models.CharField(
        db_column='last_name_char_field_db_column',
        db_index=True,
        db_tablespace='last_name_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Фамилия',
        help_text='<small class="text-muted">last_name_char_field</small><hr><br>',

        max_length=32,
    )
    first_name_char_field = models.CharField(
        db_column='first_char_field_db_column',
        db_index=True,
        db_tablespace='first_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя',
        help_text='<small class="text-muted">first_char_field</small><hr><br>',

        max_length=32,
    )
    patronymic_char_field = models.CharField(
        db_column='patronymic_char_field_db_column',
        db_index=True,
        db_tablespace='patronymic_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Отчество',
        help_text='<small class="text-muted">patronymic_char_field</small><hr><br>',

        max_length=32,
    )
    personnel_number_slug_field = models.SlugField(
        db_column='personnel_number_slug_field_db_column',
        db_index=True,
        db_tablespace='personnel_number_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Табельный номер',
        help_text='<small class="text-muted">personnel_number_slug_field</small><hr><br>',

        max_length=32,
        allow_unicode=False,
    )
    subdivision_char_field = models.CharField(
        db_column='subdivision_char_field_db_column',
        db_index=True,
        db_tablespace='subdivision_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Подразделение',
        help_text='<small class="text-muted">subdivision_char_field</small><hr><br>',

        max_length=64,
    )
    workshop_service_char_field = models.CharField(
        db_column='workshop_service_char_field_db_column',
        db_index=True,
        db_tablespace='workshop_service_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Цех/Служба',
        help_text='<small class="text-muted">workshop_service_char_field</small><hr><br>',

        max_length=64,
    )
    department_site_char_field = models.CharField(
        db_column='department_site_char_field_db_column',
        db_index=True,
        db_tablespace='department_site_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Отдел/Участок',
        help_text='<small class="text-muted">department_site_char_field</small><hr><br>',

        max_length=64,
    )
    position_char_field = models.CharField(
        db_column='position_char_field_db_column',
        db_index=True,
        db_tablespace='position_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Должность',
        help_text='<small class="text-muted">position_char_field</small><hr><br>',

        max_length=64,
    )
    category_char_field = models.CharField(
        db_column='category_char_field_db_column',
        db_index=True,
        db_tablespace='category_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Категория',
        help_text='<small class="text-muted">category_char_field</small><hr><br>',

        max_length=64,
    )
    education_text_field = models.TextField(
        db_column='education_text_field_db_column',
        db_index=True,
        db_tablespace='education_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Образование',
        help_text='<small class="text-muted">education_text_field</small><hr><br>',

        max_length=512,
    )
    achievements_text_field = models.TextField(
        db_column='achievements_text_field_db_column',
        db_index=True,
        db_tablespace='achievements_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Достижения',
        help_text='<small class="text-muted">achievements_text_field</small><hr><br>',

        max_length=512,
    )
    biography_text_field = models.TextField(
        db_column='biography_text_field_db_column',
        db_index=True,
        db_tablespace='biography_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Биография',
        help_text='<small class="text-muted">biography_text_field</small><hr><br>',

        max_length=512,
    )
    hobbies_text_field = models.TextField(
        db_column='hobbies_text_field_db_column',
        db_index=True,
        db_tablespace='hobbies_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Увлечения',
        help_text='<small class="text-muted">hobbies_text_field</small><hr><br>',

        max_length=512,
    )
    image_field = models.ImageField(
        db_column='image_field_db_column',
        db_index=True,
        db_tablespace='image_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[FileExtensionValidator(['jpg', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='admin/account/default_avatar.jpg',
        verbose_name='Изображение профиля пользователя',
        help_text='<small class="text-muted">image_field_db_column</small><hr><br>',

        upload_to='uploads/admin/account/avatar',
        max_length=100,
    )

    class Meta:
        app_label = 'app_admin'
        ordering = ('last_name_char_field', 'first_name_char_field', 'patronymic_char_field',)
        verbose_name = 'Пользователь расширенный'
        verbose_name_plural = 'Пользователи расширение'
        db_table = 'user_extend_admin_model_table'

    def __str__(self):
        if self.activity_boolean_field:
            activity = 'Активен'
        else:
            activity = 'Неактивен'
        return f'{self.last_name_char_field} | {self.first_name_char_field} | {self.patronymic_char_field} | ' \
               f'{activity} | {self.personnel_number_slug_field} | {self.position_char_field} | {self.id}'

    def get_id(self):
        return self.id

    def get_iin(self):
        return int(self.user_foreign_key_field.username)


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    # Создание при создании родительской модели
    if created:
        try:
            UserModel.objects.get_or_create(user_foreign_key_field=instance)
        except Exception as error:
            error = f'error = {error}'


class ActionModel(models.Model):
    """
    Модель, которая содержит объект для валидации и проверки на доступ действия веб-платформы
    """

    LIST_DB_VIEW_CHOICES = [
        ('0_main', 'Основное'),
        ('1_module', 'Модуль'),
        ('2_section', 'Секция'),
        ('3_component', 'Компонент'),
        ('4_utils', 'Вспомогательное'),
    ]
    type_slug_field = models.SlugField(
        db_column='type_slug_field_db_column',
        db_index=True,
        db_tablespace='type_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Тип:',
        help_text='<small class="text-muted">Строка текста валидная для ссылок и системных вызовов, '
                  'example: "success"</small><hr><br>',

        max_length=128,
        allow_unicode=False,
    )
    name_char_field = models.CharField(
        db_column='name_char_field_db_column',
        db_index=True,
        db_tablespace='name_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя действия для отображения',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=128,
    )
    name_slug_field = models.SlugField(
        db_column='name_slug_field_db_column',
        db_index=True,
        db_tablespace='name_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя действия для валидации и ссылок',
        help_text='<small class="text-muted underline">латинница, нижний регистр, без пробелов, например: '
                  '"moderator_oupibp"</small><hr><br>',

        max_length=128,
        allow_unicode=False,
    )

    class Meta:
        app_label = 'app_admin'
        ordering = ('type_slug_field', 'name_char_field')
        verbose_name = 'Действия'
        verbose_name_plural = 'Действия'
        db_table = 'actions_admin_model_table'

    def __str__(self):
        try:
            dictionary = {x[0]: x[1] for x in self.LIST_DB_VIEW_CHOICES}
            type_slug = dictionary[self.type_slug_field]
        except Exception as error:
            type_slug = '_'
        return f'{type_slug} | {self.name_char_field} | {self.name_slug_field}'

    def get_id(self):
        return self.id


class GroupModel(models.Model):
    """
    Модель, которая содержит расширение для стандартной модели групп пользователей веб-платформы
    """

    # authorization data
    group_foreign_key_field = models.ForeignKey(
        db_column='group_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='group_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Группа:',
        help_text='<small class="text-muted">Связь, с какой-либо группой, example: "to=Group.objects.get'
                  '(name="User")"</small><hr><br>',

        to=Group,
        on_delete=models.SET_NULL,
    )
    name_char_field = models.CharField(
        db_column='name_char_field_db_column',
        db_index=True,
        db_tablespace='name_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для отображения',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=128,
    )
    name_slug_field = models.SlugField(
        db_column='name_slug_field_db_column',
        db_index=True,
        db_tablespace='name_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для валидации и ссылок',
        help_text='<small class="text-muted underline">латинница, нижний регистр, без пробелов, например: '
                  '"moderator_oupibp"</small><hr><br>',

        max_length=128,
        allow_unicode=False,
    )
    user_many_to_many_field = models.ManyToManyField(
        db_column='user_many_to_many_field_db_column',
        db_index=True,
        db_tablespace='user_many_to_many_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        default=None,
        verbose_name='Пользователи группы',
        help_text='<small class="text-muted underline">Связь, с каким-либо пользователем, example: '
                  '"to=User.objects.get(username="Bogdan")"</small><hr><br>',

        to=UserModel,
        related_name='user_many_to_many_field',
    )
    action_many_to_many_field = models.ManyToManyField(
        db_column='path_many_to_many_field_db_column',
        db_index=True,
        db_tablespace='path_many_to_many_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        default=None,
        verbose_name='Разрешённые действия группы',
        help_text='<small class="text-muted underline">Связь, с каким-либо пользователем, example: '
                  '"to=User.objects.get(username="Bogdan")"</small><hr><br>',

        to=ActionModel,
        related_name='action_many_to_many_field',
    )
    position_float_field = models.FloatField(
        db_column='position_float_field_db_column',
        db_index=True,
        db_tablespace='position_float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=1.0,
        verbose_name='Позиция в админ-панели:',
        help_text='<small class="text-muted">Число с плавающей запятой, example: "0.0"</small><hr><br>',
    )

    class Meta:
        app_label = 'app_admin'
        ordering = ('position_float_field', 'name_char_field', 'name_slug_field')
        verbose_name = 'Группа расширенная'
        verbose_name_plural = 'Группы расширение'
        db_table = 'group_extend_admin_model_table'

    def __str__(self):
        return f'{self.name_char_field}'

    def get_id(self):
        return self.id


class IdeaModel(models.Model):
    """
    Idea Model
    """
    author_foreign_key_field = models.ForeignKey(
        db_column='author_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='author_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Автор',
        help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>',

        to=UserModel,
        on_delete=models.SET_NULL,
    )
    name_char_field = models.CharField(
        db_column='name_char_field_db_column',
        db_index=True,
        db_tablespace='name_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Название',
        help_text='<small class="text-muted">name_char_field</small><hr><br>',

        max_length=32,
    )
    LIST_DB_VIEW_CHOICES = [
        ('innovation', 'Инновации'),
        ('optimization', 'Оптимизации'),
        ('industry', 'Индустрия 4.0'),
        ('other', 'Другое'),
    ]
    category_slug_field = models.SlugField(
        db_column='category_slug_field_db_column',
        db_index=True,
        db_tablespace='category_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(16), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Категория',
        help_text='<small class="text-muted">category_slug_field</small><hr><br>',

        max_length=16,
        allow_unicode=False,
    )
    short_description_char_field = models.CharField(
        db_column='short_description_char_field_db_column',
        db_index=True,
        db_tablespace='short_description_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Краткое описание',
        help_text='<small class="text-muted">short_description_char_field</small><hr><br>',

        max_length=64,
    )
    full_description_text_field = models.TextField(
        db_column='full_description_text_field_db_column',
        db_index=True,
        db_tablespace='full_description_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(1024), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Полное описание',
        help_text='<small class="text-muted">full_description_text_field</small><hr><br>',

        max_length=1024,
    )
    avatar_image_field = models.ImageField(
        db_column='avatar_image_field_db_column',
        db_index=True,
        db_tablespace='avatar_image_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[FileExtensionValidator(['jpg', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='uploads/idea/default_avatar.jpg',
        verbose_name='Аватарка-заставка для идеи',
        help_text='<small class="text-muted">>avatar_image_field</small><hr><br>',

        upload_to='uploads/idea/avatar/',
        max_length=100,
    )
    addiction_file_field = models.FileField(
        db_column='addiction_file_field_db_column',
        db_index=True,
        db_tablespace='addiction_file_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[FileExtensionValidator(['xlsx', 'xls', 'docx', 'doc', 'pdf'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Файл-приложение',
        help_text='<small class="text-muted">addiction_file_field</small><hr><br>',

        upload_to='uploads/idea/files/',
        max_length=100,
    )
    visibility_boolean_field = models.BooleanField(
        db_column='visibility_boolean_field_db_column',
        db_index=True,
        db_tablespace='visibility_boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='Видимость идеи в общем списке',
        help_text='<small class="text-muted">visibility_boolean_field</small><hr><br>',
    )
    created_datetime_field = models.DateTimeField(
        db_column='created_datetime_field_db_column',
        db_index=True,
        db_tablespace='created_datetime_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата создания',
        help_text='<small class="text-muted">created_datetime_field</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    register_datetime_field = models.DateTimeField(
        db_column='register_datetime_field_db_column',
        db_index=True,
        db_tablespace='register_datetime_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата регистрации',
        help_text='<small class="text-muted">register_datetime_field</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'app_django'
        ordering = ('-id',)
        verbose_name = 'Идея'
        verbose_name_plural = '0_Идеи'
        db_table = 'idea_model_table'

    def __str__(self):
        return f'{self.name_char_field} : {self.category_slug_field} : {self.author_foreign_key_field}'

    @staticmethod
    def get_all_category():
        return IdeaModel.LIST_DB_VIEW_CHOICES

    def get_category(self):
        dict_key_val = dict(self.LIST_DB_VIEW_CHOICES)
        return [self.category_slug_field, dict_key_val[self.category_slug_field]]

    def get_total_comment_value(self):
        return IdeaCommentModel.objects.filter(idea_foreign_key_field=self.id).count()

    def get_like_count(self):
        return IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count()

    def get_dislike_count(self):
        return IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()

    def get_total_rating_value(self):
        return IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() + \
               IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()

    def get_total_rating(self):
        return IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() - \
               IdeaRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()


class IdeaCommentModel(models.Model):
    """
    Ideas Comment Model
    """
    author_foreign_key_field = models.ForeignKey(
        db_column='author_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='author_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Автор',
        help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>',

        to=UserModel,
        on_delete=models.SET_NULL,
    )
    idea_foreign_key_field = models.ForeignKey(
        db_column='idea_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='idea_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Идея',
        help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>',

        to=IdeaModel,
        on_delete=models.SET_NULL,
    )
    text_field = models.TextField(
        db_column='text_field_db_column',
        db_index=True,
        db_tablespace='text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Комментарий',
        help_text='<small class="text-muted">text_field</small><hr><br>',

        max_length=512,
    )
    datetime_field = models.DateTimeField(
        db_column='datetime_field_db_column',
        db_index=True,
        db_tablespace='datetime_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        # validators=[MinValueValidator(8), MaxValueValidator(12), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата создания',
        help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'app_django'
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = '1_Идеи_Комментарии'
        db_table = 'idea_comment_model_table'

    def __str__(self):
        return f'{self.author_foreign_key_field} :: {self.idea_foreign_key_field} :: {self.text_field[:10]}... ' \
               f':: {self.datetime_field}'


class IdeaRatingModel(models.Model):
    """
    Idea Rating Model
    """
    author_foreign_key_field = models.ForeignKey(
        db_column='author_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='author_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Автор',
        help_text='<small class="text-muted">author_foreign_key_field</small><hr><br>',

        to=UserModel,
        on_delete=models.SET_NULL,
    )
    idea_foreign_key_field = models.ForeignKey(
        db_column='idea_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='idea_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Идея',
        help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>',

        to=IdeaModel,
        on_delete=models.SET_NULL,
    )
    status_boolean_field = models.BooleanField(
        db_column='status_boolean_field_db_column',
        db_index=True,
        db_tablespace='status_boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=True,
        verbose_name='Лайк / дизлайк',
        help_text='<small class="text-muted">status_boolean_field</small><hr><br>',
    )
    datetime_field = models.DateTimeField(
        db_column='datetime_field_db_column',
        db_index=True,
        db_tablespace='datetime_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата создания',
        help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'app_django'
        ordering = ('-id',)
        verbose_name = 'Рейтинг'
        verbose_name_plural = '1_Идеи_Рейтинги'
        db_table = 'idea_rating_model_table'

    def __str__(self):
        return f'{self.author_foreign_key_field} :: {self.idea_foreign_key_field} :: {self.status_boolean_field} ' \
               f':: {self.datetime_field}'
