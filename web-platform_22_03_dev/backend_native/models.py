from django.contrib.auth.models import User, Group
from django.core.validators import MinLengthValidator, MaxLengthValidator, MinValueValidator, MaxValueValidator, \
    FileExtensionValidator
from django.db import models
from django.utils import timezone

from backend.models import UserModel, GroupModel, ActionModel, LoggingModel


class IdeaTestModel(models.Model):
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
        app_label = 'backend_native'
        ordering = ('-id',)
        verbose_name = 'Идея'
        verbose_name_plural = '0_Идеи'
        db_table = 'idea_test_model_table'

    def __str__(self):
        return f'{self.name_char_field} : {self.category_slug_field} : {self.author_foreign_key_field}'

    @staticmethod
    def get_all_category():
        return IdeaTestModel.LIST_DB_VIEW_CHOICES

    def get_category(self):
        dict_key_val = dict(self.LIST_DB_VIEW_CHOICES)
        return [self.category_slug_field, dict_key_val[self.category_slug_field]]

    def get_total_comment_value(self):
        return IdeaTestCommentModel.objects.filter(idea_foreign_key_field=self.id).count()

    def get_like_count(self):
        return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count()

    def get_dislike_count(self):
        return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()

    def get_total_rating_value(self):
        return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() + \
               IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()

    def get_total_rating(self):
        return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() - \
               IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()


class IdeaTestCommentModel(models.Model):
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

        to=IdeaTestModel,
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
        app_label = 'backend_native'
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = '1_Идеи_Комментарии'
        db_table = 'idea_test_comment_model_table'

    def __str__(self):
        return f'{self.author_foreign_key_field} :: {self.idea_foreign_key_field} :: {self.text_field[:10]}... ' \
               f':: {self.datetime_field}'


class IdeaTestRatingModel(models.Model):
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

        to=IdeaTestModel,
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
        app_label = 'backend_native'
        ordering = ('-id',)
        verbose_name = 'Рейтинг'
        verbose_name_plural = '1_Идеи_Рейтинги'
        db_table = 'idea_test_rating_model_table'

    def __str__(self):
        return f'{self.author_foreign_key_field} :: {self.idea_foreign_key_field} :: {self.status_boolean_field} ' \
               f':: {self.datetime_field}'