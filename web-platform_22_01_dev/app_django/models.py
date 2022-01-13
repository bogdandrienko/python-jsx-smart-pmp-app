from django.contrib.auth.models import User, Group
from django.core.validators import MinLengthValidator, MaxLengthValidator, MinValueValidator, MaxValueValidator, \
    FileExtensionValidator
from django.db import models
from django.utils import timezone

from app_admin.models import UserModel, GroupModel, ActionModel, LoggingModel


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


class ChatModel(models.Model):
    """
    Ideas Model
    """
    author_char_field = models.CharField(
        db_column='author_char_field_db_column',
        db_index=True,
        db_tablespace='author_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Автор',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=128,
    )
    text_field = models.TextField(
        db_column='text_field_db_column',
        db_index=True,
        db_tablespace='text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(1024), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Полное описание',
        help_text='<small class="text-muted">text_field</small><hr><br>',

        max_length=1024,
    )
    created_datetime_field = models.DateTimeField(
        db_column='created_datetime_field_db_column',
        db_index=True,
        db_tablespace='created_datetime_field_db_tablespace',
        error_messages=False,
        primary_key=False,
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

    class Meta:
        app_label = 'app_django'
        ordering = ('-created_datetime_field',)
        verbose_name = 'Сообщение в общем чате'
        verbose_name_plural = 'Сообщения в общем чате'
        db_table = 'chat_model_table'

    def __str__(self):
        return f'{self.author_char_field} : {self.text_field} : {self.created_datetime_field}'


class ComputerVisionModuleModel(models.Model):
    """
    Класс, содержащий в себе объект настройки модуля для машинного зрения
    """
    name_char_field = models.CharField(
        db_column='name_char_field_db_column',
        db_index=True,
        db_tablespace='name_char_field_db_tablespace',
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
        verbose_name='Имя модуля:',
        help_text='<small class="text-muted">короткое и лаконичное имя для модуля</small><hr><br>',

        max_length=64,
    )
    description_text_field = models.TextField(
        db_column='description_text_field_db_column',
        db_index=True,
        db_tablespace='description_text_field_db_tablespace',
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
        verbose_name='Описание модуля:',
        help_text='<small class="text-muted">описание для модуля</small><hr><br>',

        max_length=1024,
    )
    LIST_DB_VIEW_MODULES_CHOICES = [
        ('16_operation', 'Грохота, 16 операция, 10 отметка'),
        ('26_operation', 'Грохота, 26 операция, 10 отметка'),
        ('36_operation', 'Грохота, 36 операция, 10 отметка'),
    ]
    path_slug_field = models.SlugField(
        db_column='path_slug_field_db_column',
        db_index=True,
        db_tablespace='path_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        choices=LIST_DB_VIEW_MODULES_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(128), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Путь модуля:',
        help_text='<small class="text-muted">полный путь от класса до функции вызова цикла модуля</small><hr><br>',

        max_length=128,
        allow_unicode=False,
    )
    play_boolean_field = models.BooleanField(
        db_column='play_boolean_field_db_column',
        db_index=True,
        db_tablespace='play_boolean_field_db_tablespace',
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
        verbose_name='Запуск работы модуля:',
        help_text='<small class="text-muted">нужно ли запускать модуль каждый тик главного цикла событий'
                  '</small><hr><br>',
    )
    delay_float_field = models.FloatField(
        db_column='delay_float_field_db_column',
        db_index=True,
        db_tablespace='delay_float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(3600), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=3.0,
        verbose_name='Задержка цикла модуля:',
        help_text='<small class="text-muted">время для тика каждого компонента в модуле</small><hr><br>',
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
        default=None,
        verbose_name='datetime_field',
        help_text='<small class="text-muted">дата и время последнего тика модуля</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    duration_float_field = models.FloatField(
        db_column='duration_float_field_db_column',
        db_index=True,
        db_tablespace='duration_float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(3600), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0.0,
        verbose_name='Длительность операции:',
        help_text='<small class="text-muted">длительность последнего тика модуля</small><hr><br>',
    )
    restart_boolean_field = models.BooleanField(
        db_column='restart_boolean_field_db_column',
        db_index=True,
        db_tablespace='restart_boolean_field_db_tablespace',
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
        verbose_name='Рестарт модуля после ошибки:',
        help_text='<small class="text-muted">нужно ли перезапускать модуль после ошибки</small><hr><br>',
    )
    error_text_field = models.TextField(
        db_column='error_text_field_db_column',
        db_index=True,
        db_tablespace='error_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(2048), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Текст исключения-ошибки модуля:',
        help_text='<small class="text-muted">описание исключения и/или ошибки модуля</small><hr><br>',

        max_length=2048,
    )

    class Meta:
        app_label = 'app_django'
        ordering = ('name_char_field', 'path_slug_field')
        verbose_name = 'Computer Vision Module'
        verbose_name_plural = 'Computer Vision Modules'
        db_table = 'computer_vision_module_model_table'

    def __str__(self):
        return f'{self.name_char_field}'

    @staticmethod
    def get_all_modules():
        return ComputerVisionModuleModel.LIST_DB_VIEW_MODULES_CHOICES


class ComputerVisionComponentModel(models.Model):
    """
    Класс, содержащий в себе объект настройки компонента для модуля анализа машинного зрения
    """
    module_foreign_key_field = models.ForeignKey(
        db_column='module_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='module_foreign_key_field_db_tablespace',
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
        verbose_name='Модуль компонента:',
        help_text='<small class="text-muted">связь, к какому модулю относится компонент</small><hr><br>',

        to=ComputerVisionModuleModel,
        on_delete=models.SET_NULL,
    )
    play_boolean_field = models.BooleanField(
        db_column='play_boolean_field_db_column',
        db_index=True,
        db_tablespace='play_boolean_field_db_tablespace',
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
        verbose_name='Запуск работы компонента:',
        help_text='<small class="text-muted">нужно ли делать расчёты каждый тик в этом компоненте</small><hr><br>',
    )
    alias_char_field = models.CharField(
        db_column='alias_char_field_db_column',
        db_index=True,
        db_tablespace='alias_char_field_db_tablespace',
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
        verbose_name='Псевдоним компонента:',
        help_text='<small class="text-muted">псевдоним, используемый для отображения или записи в стороннюю базу'
                  '</small><hr><br>',

        max_length=64,
    )
    protocol_slug_field = models.SlugField(
        db_column='protocol_slug_field_db_column',
        db_index=True,
        db_tablespace='protocol_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(50), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='http://',
        verbose_name='Протокол api источника компонента:',
        help_text='<small class="text-muted">способ соединения с api: "http://" / "rtsp://" / "https://"'
                  '</small><hr><br>',

        max_length=50,
        allow_unicode=False,
    )
    port_integer_field = models.IntegerField(
        db_column='port_integer_field_db_column',
        db_index=True,
        db_tablespace='port_integer_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(9999999), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=80,
        verbose_name='Порт api источника компонента:',
        help_text='<small class="text-muted">порт соединения: "80" / "434"</small><hr><br>',
    )
    genericipaddress_field = models.GenericIPAddressField(
        db_column='genericipaddress_field_db_column',
        db_index=True,
        db_tablespace='genericipaddress_field_db_tablespace',
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
        default=None,
        verbose_name='Ip адрес источника компонента:',
        help_text='<small class="text-muted">ip адрес в формате: "192.168.15.202"<hr><br>',

        protocol='both',
        unpack_ipv4=False,
    )
    login_slug_field = models.SlugField(
        db_column='login_protocol_slug_field_db_column',
        db_index=True,
        db_tablespace='login_protocol_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(50), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='admin',
        verbose_name='Логин источника компонента:',
        help_text='<small class="text-muted">логин от источника компонента: "admin"</small><hr><br>',

        max_length=50,
        allow_unicode=False,
    )
    password_slug_field = models.SlugField(
        db_column='password_protocol_slug_field_db_column',
        db_index=True,
        db_tablespace='password_protocol_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(50), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='q1234567',
        verbose_name='Пароль источника компонента:',
        help_text='<small class="text-muted">пароль от источника компонента: "q1234567"</small><hr><br>',

        max_length=50,
        allow_unicode=False,
    )
    mask_char_field = models.CharField(
        db_column='mask_char_field_db_column',
        db_index=True,
        db_tablespace='mask_char_field_db_tablespace',
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
        verbose_name='Путь к маске компонента:',
        help_text='<small class="text-muted">путь от главной папки к папке с изображением-маской: '
                  '"static/media/data/computer_vision/temp"</small><hr><br>',

        max_length=64,
    )
    bright_level_integer_field = models.IntegerField(
        db_column='bright_level_integer_field_db_column',
        db_index=True,
        db_tablespace='bright_level_integer_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(100), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=100,
        verbose_name='bright_level',
        help_text='<small class="text-muted">bright_level</small><hr><br>',
    )
    in_range_set_from_integer_field = models.IntegerField(
        db_column='in_range_set_from_integer_field_db_column',
        db_index=True,
        db_tablespace='bright_level_integer_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='in_range_set_from',
        help_text='<small class="text-muted">in_range_set_from</small><hr><br>',
    )
    in_range_set_to_integer_field = models.IntegerField(
        db_column='in_range_set_to_integer_field_db_column',
        db_index=True,
        db_tablespace='in_range_set_to_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='in_range_set_to',
        help_text='<small class="text-muted">in_range_set_to</small><hr><br>',
    )
    count_not_zero_integer_field = models.IntegerField(
        db_column='count_not_zero_integer_field_db_column',
        db_index=True,
        db_tablespace='count_not_zero_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='count_not_zero',
        help_text='<small class="text-muted">count_not_zero</small><hr><br>',
    )
    point_1_1_integer_field = models.IntegerField(
        db_column='point_1_1_field_db_column',
        db_index=True,
        db_tablespace='point_1_1_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_1_1',
        help_text='<small class="text-muted">point_1_1</small><hr><br>',
    )
    point_1_2_integer_field = models.IntegerField(
        db_column='point_1_2_field_db_column',
        db_index=True,
        db_tablespace='point_1_2_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_1_2',
        help_text='<small class="text-muted">point_1_2</small><hr><br>',
    )
    point_1_3_integer_field = models.IntegerField(
        db_column='point_1_3_field_db_column',
        db_index=True,
        db_tablespace='point_1_3_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_1_3',
        help_text='<small class="text-muted">point_1_3</small><hr><br>',
    )
    point_2_1_integer_field = models.IntegerField(
        db_column='point_2_1_field_db_column',
        db_index=True,
        db_tablespace='point_2_1_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_2_1',
        help_text='<small class="text-muted">point_2_1</small><hr><br>',
    )
    point_2_2_integer_field = models.IntegerField(
        db_column='point_2_2_field_db_column',
        db_index=True,
        db_tablespace='point_2_2_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_2_2',
        help_text='<small class="text-muted">point_2_2</small><hr><br>',
    )
    point_2_3_integer_field = models.IntegerField(
        db_column='point_2_3_field_db_column',
        db_index=True,
        db_tablespace='point_2_3_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='point_2_3',
        help_text='<small class="text-muted">point_2_3</small><hr><br>',
    )
    alarm_level_integer_field = models.IntegerField(
        db_column='alarm_level_field_db_column',
        db_index=True,
        db_tablespace='alarm_level_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(100), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='alarm_level',
        help_text='<small class="text-muted">alarm_level</small><hr><br>',
    )
    null_level_integer_field = models.IntegerField(
        db_column='null_level_field_db_column',
        db_index=True,
        db_tablespace='null_level_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='null_level',
        help_text='<small class="text-muted">null_level</small><hr><br>',
    )
    correct_coefficient_float_field = models.FloatField(
        db_column='correct_coefficient_float_field_db_column',
        db_index=True,
        db_tablespace='correct_coefficient_float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinValueValidator(0), MaxValueValidator(100), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0.0,
        verbose_name='correct_coefficient_',
        help_text='<small class="text-muted">correct_coefficient_</small><hr><br>',
    )

    class Meta:
        app_label = 'app_django'
        ordering = ('play_boolean_field', 'alias_char_field', 'genericipaddress_field')
        verbose_name = 'Computer Vision Component'
        verbose_name_plural = 'Computer Vision Components'
        db_table = 'computer_vision_component_model_table'

    def __str__(self):
        return f'{self.genericipaddress_field}'
