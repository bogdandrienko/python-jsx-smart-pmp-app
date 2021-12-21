from django.core.validators import MinLengthValidator, MaxLengthValidator, FileExtensionValidator
from django.db import models
from django.utils import timezone


# Create your models here.
from app_admin.models import UserModel


class TodoModel(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=300, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    done = models.BooleanField(default=False)

    class Meta:
        ordering = ('id',)
        verbose_name = 'Задачи'
        verbose_name_plural = 'Задача'

    def __str__(self):
        return self.title


class DataModel(models.Model):
    data_title = models.CharField(max_length=150)
    data_description = models.CharField(max_length=300, blank=True)
    data_date = models.DateTimeField(auto_now_add=True)
    data_done = models.BooleanField(default=False)

    class Meta:
        ordering = ('id',)
        verbose_name = 'Информация'
        verbose_name_plural = 'Информация'

    def __str__(self):
        return self.data_title


class IdeasModel(models.Model):
    """
    Ideas Model
    """
    author_foreign_key_field = models.ForeignKey(
        db_column='author_foreign_key_field_db_column',
        db_index=True,
        db_tablespace='author_foreign_key_field_db_tablespace',
        error_messages=False,
        primary_key=False,
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
    author_char_field = models.CharField(
        db_column='author_char_field_db_column',
        db_index=True,
        db_tablespace='author_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Автор',
        help_text='<small class="text-muted">author_char_field</small><hr><br>',

        max_length=32,
    )
    name_char_field = models.CharField(
        db_column='name_char_field_db_column',
        db_index=True,
        db_tablespace='name_char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
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
        # app_label = 'app_admin'
        ordering = ('-id',)
        verbose_name = 'Идея'
        verbose_name_plural = '0_Идеи'
        db_table = 'ideas_model_table'

    def __str__(self):
        return f'{self.name_char_field} : {self.category_slug_field} : {self.author_char_field}'

    @staticmethod
    def get_all_category():
        return IdeasModel.LIST_DB_VIEW_CHOICES

    def get_category(self):
        dict_key_val = dict(self.LIST_DB_VIEW_CHOICES)
        return [self.category_slug_field, dict_key_val[self.category_slug_field]]
