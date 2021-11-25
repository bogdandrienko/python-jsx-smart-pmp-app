from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator, MinLengthValidator, MaxLengthValidator, \
    FileExtensionValidator, DecimalValidator, ValidationError, RegexValidator, URLValidator, EmailValidator
from ckeditor.fields import RichTextField

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from django.db import models
from ckeditor.fields import RichTextField

class Post(models.Model):
    content = RichTextField()
# from .manager import CustomUserManager
#
#
# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(_('email address'), unique=True)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     date_joined = models.DateTimeField(default=timezone.now)
#
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []
#
#     objects = CustomUserManager()
#
#     def __str__(self):
#         return self.email


# Examples
class ExamplesModel(models.Model):
    """
    Модель с максимумом вариаций параметров и полей
    """

    # Константа (не обязательно), которая содержит кортеж для параметра 'choices'
    LIST_DB_VIEW_CHOICES = [
        ('db_save_value_1', 'view_value_1'),
        ('db_save_value_2', 'view_value_2'),
        ('db_save_value_3', 'view_value_3')
    ]
    binary_field = models.BinaryField(
        db_column='binary_field_db_column',
        db_index=True,
        db_tablespace='binary_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(1), MaxLengthValidator(1024), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='binary_field',
        help_text='<small class="text-muted">Бинарные данные (сохранять без преписки b"), example: '
                  '"OTcwODAxMzUxMTc5"</small><hr><br>',

        max_length=1024,
    )
    boolean_field = models.BooleanField(
        db_column='boolean_field_db_column',
        db_index=True,
        db_tablespace='boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='boolean_field',
        help_text='<small class="text-muted">Значение правда или ложь, example: "True" / '
                  '"False"</small><hr><br>',
    )
    null_boolean_field = models.BooleanField(
        db_column='null_boolean_field_db_column',
        db_index=True,
        db_tablespace='null_boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='null_boolean_field',
        help_text='<small class="text-muted">Значение правда, ложь или неизвестно, example: "True" / '
                  '"False / Неизвестно"</small><hr><br>',
    )
    char_field = models.CharField(
        db_column='char_field_db_column',
        db_index=True,
        db_tablespace='char_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='char_field',
        help_text='<small class="text-muted">Небольшая срока текста, example: "текст, текст"</small><hr><br>',

        max_length=64,
        # db_collation='char_field_db_collation'
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
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='text_field',
        help_text='<small class="text-muted">Много текста, example: "текст, текст..."</small><hr><br>',

        max_length=512,
        # db_collation='text_field_db_collation'
    )
    slug_field = models.SlugField(
        db_column='slug_field_db_column',
        db_index=True,
        db_tablespace='slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(50), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='slug_field',
        help_text='<small class="text-muted">Строка текста валидная для ссылок и системных вызовов, '
                  'example: "success"</small><hr><br>',

        max_length=50,
        allow_unicode=False,
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
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(1), MaxLengthValidator(254), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='email_field',
        help_text='<small class="text-muted">Строка содержащая почту, example: '
                  '"bogdandrienko@gmail.com"</small><hr><br>',

        max_length=254,
    )
    url_field = models.URLField(
        db_column='url_field_db_column',
        db_index=True,
        db_tablespace='url_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(200), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='url_field',
        help_text='<small class="text-muted">Строка содержащая url-адрес, example: '
                  '"http://89.218.132.130:8000/"</small><hr><br>',

        max_length=200,
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
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='genericipaddress_field',
        help_text='<small class="text-muted">Строка содержащая ip-адрес, example: '
                  '"127.0.0.1"</small><hr><br>',

        protocol='both',
        unpack_ipv4=False,
    )
    integer_field = models.IntegerField(
        db_column='integer_field_db_column',
        db_index=True,
        db_tablespace='integer_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinValueValidator(-2147483648), MaxValueValidator(2147483647), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='integer_field',
        help_text='<small class="text-muted">Целочисленное значение от -2147483648 до 2147483647, example: '
                  '"0"</small><hr><br>',
    )
    big_integer_field = models.BigIntegerField(
        db_column='big_integer_field_db_column',
        db_index=True,
        db_tablespace='big_integer_field_tablespace',
        primary_key=False,
        validators=[MinValueValidator(-9223372036854775808), MaxValueValidator(9223372036854775807), ],
        unique=False,
        null=True,
        editable=True,
        blank=True,
        auto_created=True,
        default=0,
        verbose_name='big integer',
        help_text='<small class="text-muted">Большое целочисленное значение от -9223372036854775808 до '
                  '9223372036854775807, example: "0"</small><hr><br>',
    )
    positive_integer_field = models.PositiveIntegerField(
        db_column='positive_integer_field_db_column',
        db_index=True,
        db_tablespace='positive_integer_field_tablespace',
        primary_key=False,
        validators=[MinValueValidator(0), MaxValueValidator(2147483647), ],
        unique=False,
        null=True,
        editable=True,
        blank=True,
        auto_created=True,
        default=0,
        verbose_name='positive_integer_field',
        help_text='<small class="text-muted">Положительное целочисленное значение от 0 до 2147483647, '
                  'example: "0"</small><hr><br>',
    )
    float_field = models.FloatField(
        db_column='float_field_db_column',
        db_index=True,
        db_tablespace='float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0.0,
        verbose_name='float_field',
        help_text='<small class="text-muted">Число с плавающей запятой, example: "0.0"</small><hr><br>',
    )
    decimal_field = models.DecimalField(
        db_column='decimal_field_db_column',
        db_index=True,
        db_tablespace='decimal_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0.0,
        verbose_name='decimal_field',
        help_text='<small class="text-muted">Нецелочисленное значение, example: "0.000"</small><hr><br>',

        max_digits=10,
        decimal_places=5,
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
        verbose_name='datetime_field',
        help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    date_field = models.DateField(
        db_column='date_field_db_column',
        db_index=True,
        db_tablespace='date_field_db_tablespace',
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
        verbose_name='date_field',
        help_text='<small class="text-muted">Дата, example: "31.12.2021"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    time_field = models.TimeField(
        db_column='time_field_db_column',
        db_index=True,
        db_tablespace='time_field_db_tablespace',
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
        verbose_name='time_field',
        help_text='<small class="text-muted">Время, example: "23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    duration_field = models.DurationField(
        db_column='duration_field_db_column',
        db_index=True,
        db_tablespace='duration_field_db_tablespace',
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
        default=timezone.timedelta(minutes=20),
        verbose_name='duration_field',
        help_text='<small class="text-muted">Длительность во времени, example: "2:59:59"</small><hr><br>',
    )
    file_field = models.FileField(
        db_column='file_field_db_column',
        db_index=True,
        db_tablespace='file_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[FileExtensionValidator(['xlsx', 'xls'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='file_field',
        help_text='<small class="text-muted">Файл, с расширением указанным в валидаторе, example: '
                  '"example.xlsx"</small><hr><br>',

        upload_to='uploads/example/%Y/%m/%d/',
        max_length=100,
    )
    image_field = models.ImageField(
        db_column='image_field_db_column',
        db_index=True,
        db_tablespace='image_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[FileExtensionValidator(['jpg', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='uploads/example/example.jpg',
        verbose_name='file_field',
        help_text='<small class="text-muted">>Файл, с расширением изображения, example: "example.jpg('
                  '/png/bpm...)"</small><hr><br>',

        upload_to='uploads/example/example.jpg',
        max_length=100,
        # height_field=1920,  # Значение высоты изображения при каждом сохранении объекта
        # width_field=1080,  # Значение ширины изображения при каждом сохранении объекта.
    )
    foreign_key_field = models.ForeignKey(
        db_column='foreign_key_field_db_column',
        db_index=True,
        db_tablespace='foreign_key_field_db_tablespace',
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
        default=None,
        verbose_name='foreign_key_field',
        help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get'
                  '(username="Bogdan")"</small><hr><br>',

        to=User,
        on_delete=models.CASCADE,
        # limit_choices_to={'is_staff': True},
        # related_name='foreign_key_field',
        # related_query_name='foreign_key_field',
        # to_field='foreign_key_field',
        # db_constraint=True,
        # swappable=True,
    )
    one_to_one_field = models.OneToOneField(
        db_column='one_to_one_field_db_column',
        db_index=True,
        db_tablespace='one_to_one_field_db_tablespace',
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
        default=None,
        verbose_name='one_to_one_field',
        help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get'
                  '(username="Bogdan")"</small><hr><br>',

        to=User,
        on_delete=models.CASCADE,
        related_name='one_to_one_field',
        # related_query_name='foreignkey_field',
        # limit_choices_to={'is_staff': True},
        # db_constraint=True,
        # swappable=True,
    )
    many_to_many_field = models.ManyToManyField(
        db_column='many_to_many_field_db_column',
        db_index=True,
        db_tablespace='many_to_many_field_db_tablespace',
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
        default=None,
        verbose_name='many_to_many_field',
        help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get'
                  '(username="Bogdan")"</small><hr><br>',

        to=User,
        related_name='many_to_many_field',
        # related_query_name='foreignkey_field',
        # limit_choices_to={'is_staff': True},
        # symmetrical=True,
        # through=User,
        # through_fields=('group', 'person'),
        # db_constraint=True,
        # swappable=True,
    )

    class FieldsClass:
        class ExtraClass:
            # Константа (не обязательно), которая содержит кортеж для параметра 'choices'
            LIST_DB_VIEW_CHOICES = [
                ('db_save_value_1', 'view_value_1'),
                ('db_save_value_2', 'view_value_2'),
                ('db_save_value_3', 'view_value_3')
            ]
            fields = models.Field(
                db_column='name_field_db_column',
                db_index=True,
                db_tablespace='name_field_db_tablespace',
                error_messages=False,
                primary_key=False,
                unique_for_date=False,
                unique_for_month=False,
                unique_for_year=False,
                # choices=LIST_DB_VIEW_CHOICES,
                validators=[MinValueValidator(8), MaxValueValidator(12), ],
                unique=False,
                editable=True,
                blank=True,
                null=True,
                default=None,
                verbose_name='',
                help_text='<small class="text-muted">подсказка, с поддержкой HTML</small><hr><br>',
            )
            # extra fields
            field = models.Field(
                db_column='name_field_db_column',
                # The name of the database column to use for this field. If this isn’t given, Django will use the
                # field’s name.

                db_index=True,
                # If True, a database index will be created for this field.

                db_tablespace='name_field_db_tablespace',
                # The name of the database tablespace to use for this field’s index, if this field is indexed. The
                # default is the project’s DEFAULT_INDEX_TABLESPACE setting, if set, or the db_tablespace of the
                # model, if any. If the backend doesn’t support tablespaces for indexes, this option is ignored.

                error_messages=False,
                # The error_messages argument lets you override the default messages that the field will raise.
                # Pass in a dictionary with keys matching the error messages you want to override.
                # Error message keys include null, blank, invalid, invalid_choice, unique, and unique_for_date.
                # Additional error message keys are specified for each field in the Field types section below.
                # These error messages often don’t propagate to forms.

                primary_key=False,
                # If True, this field is the primary key for the model.
                # If you don’t specify primary_key=True for any field in your model, Django will automatically add a
                # field to hold the primary key, so you don’t need to set primary_key=True on any of your fields unless
                # you want to override the default primary-key behavior. The type of auto-created primary key fields
                # can be specified per app in AppConfig.default_auto_field or globally in the DEFAULT_AUTO_FIELD
                # setting. For more, see Automatic primary key fields.
                # primary_key=True implies null=False and unique=True. Only one primary key is allowed on an object.
                # The primary key field is read-only. If you change the value of the primary key on an existing object
                # and then save it, a new object will be created alongside the old one.

                unique_for_date=False,
                # Set this to the name of a DateField or DateTimeField to require that this field be unique for
                # the value of the date field.
                # For example, if you have a field title that has unique_for_date="pub_date", then Django wouldn’t allow
                # the entry of two records with the same title and pub_date.
                # Note that if you set this to point to a DateTimeField, only the date portion of the field will be
                # considered. Besides, when USE_TZ is True, the check will be performed in the current time zone at the
                # time the object gets saved.
                # This is enforced by Model.validate_unique() during model validation but not at the database level. If
                # any unique_for_date constraint involves fields that are not part of a ModelForm (for example, if
                # one of the fields is listed in exclude or has editable=False), Model.validate_unique() will skip
                # validation for that particular constraint.

                unique_for_month=False,
                # Like unique_for_date, but requires the field to be unique with respect to the month.

                unique_for_year=False,
                # Like unique_for_date and unique_for_month.

                choices=LIST_DB_VIEW_CHOICES,
                # A sequence consisting itself of iterables of exactly two items (e.g. [(A, B), (A, B) ...]) to use as
                # choices for this field. If choices are given, they’re enforced by model validation and the default
                # form widget will be a select box with these choices instead of the standard text field.
                # The first element in each tuple is the actual value to be set on the model, and the second element is
                # the human-readable name.

                validators=[MinValueValidator(8), MaxValueValidator(12), ],
                # A list of validators to run for this field. See the validators documentation for more information.

                unique=False,
                # If True, this field must be unique throughout the table.
                # This is enforced at the database level and by model validation. If you try to save a model with a
                # duplicate value in a unique field, a django.db.IntegrityError will be raised by the model’s save()
                # method.

                editable=True,
                # If False, the field will not be displayed in the admin or any other ModelForm. They are also skipped
                # during model validation. Default is True.

                blank=False,
                # If True, the field is allowed to be blank. Default is False.
                # Note that this is different than null. null is purely database-related, whereas blank is validation-
                # related. If a field has blank=True, form validation will allow entry of an empty value. If a field has
                # blank=False, the field will be required.

                null=False,
                # If True, Django will store empty values as NULL in the database. Default is False.
                # Avoid using null on string-based fields such as CharField and TextField. If a string-based field has
                # null=True, that means it has two possible values for “no data”: NULL, and the empty string. In most
                # cases, it’s redundant to have two possible values for “no data;” the Django convention is to use the
                # empty string, not NULL. One exception is when a CharField has both unique=True and blank=True set. In
                # this situation, null=True is required to avoid unique constraint violations when saving multiple
                # objects with blank values.
                # For both string-based and non-string-based fields, you will also need to set blank=True if you wish to
                # permit empty values in forms, as the null parameter only affects database storage (see blank).

                default=None,
                # The default value for the field. This can be a value or a callable object. If callable it will be
                # called every time a new object is created.
                # The default can’t be a mutable object (model instance, list, set, etc.), as a reference to the same
                # instance of that object would be used as the default value in all new model instances. Instead, wrap
                # the desired default in a callable.

                verbose_name='',
                # A human-readable name for the field. If the verbose name isn’t given, Django will automatically create
                # it using the field’s attribute name, converting underscores to spaces.

                help_text='<small class="text-muted underline">подсказка, с поддержкой HTML</small><hr><br>',
                # Extra “help” text to be displayed with the form widget. It’s useful for documentation even if your
                # field isn’t used on a form.
                # Note that this value is not HTML-escaped in automatically-generated forms. This lets you include HTML
                # in help_text if you so desire. For example: help_text="Please use the following format:
                # <em>YYYY-MM-DD</em>."
            )

        #
        class AutoFieldClass:
            # An IntegerField that automatically increments according to available IDs. You usually won’t need to use
            # this directly; a primary key field will automatically be added to your model if you don’t specify
            # otherwise.
            auto_field = models.AutoField()

        class BigAutoFieldClass:
            # A 64-bit integer, much like an AutoField except that it is guaranteed to fit numbers from 1 to
            # 9223372036854775807.
            big_auto_field = models.BigAutoField()

        class SmallAutoFieldClass:
            # A 64-bit integer, much like an IntegerField except that it is guaranteed to fit numbers from
            # -9223372036854775808 to 9223372036854775807. The default form widget for this field is a NumberInput.
            small_auto_field = models.SmallAutoField()

        #
        class BinaryFieldClass:

            def __init__(self):
                # Default
                self.max_length = None

            # A field to store raw binary data. It can be assigned bytes, bytearray, or memoryview. By default,
            # BinaryField sets editable to False, in which case it can’t be included in a ModelForm. BinaryField
            # has one extra optional argument: BinaryField.max_length¶.
            binary_field = models.BinaryField(
                # validators=[MinLengthValidator(1), MaxLengthValidator(64), ],

                max_length=None,
                # The maximum length (in bytes) of the field. The maximum length is enforced in Django’s validation
                # using MaxLengthValidator.
            )

        #
        class BooleanFieldClass:

            def __init__(self):
                # Default
                self.null = False

            # A true/false field. The default form widget for this field is CheckboxInput, or NullBooleanSelect
            # if null=True. The default value of BooleanField is None when Field.default isn’t defined.
            boolean_field = models.BooleanField()

        class NullBooleanFieldClass:

            def __init__(self):
                # Default
                self.null = True

            # DEPRECATED # Поле хранящее значение true/false/None
            nullboolean_field = models.NullBooleanField()

        #
        class CharFieldClass:

            def __init__(self):
                # Default
                self.max_length = None

            # A string field, for small- to large-sized strings. For large amounts of text, use TextField. The
            # default form widget for this field is a TextInput. CharField has two extra arguments:
            # CharField.max_length¶ and CharField.db_collation¶.
            char_field = models.CharField(
                # validators=[MinLengthValidator(1), MaxLengthValidator(64), ],
                max_length=None,
                # Required. The maximum length (in characters) of the field. The max_length is enforced at the
                # database level and in Django’s validation using MaxLengthValidator.

                db_collation='char_field_1_db_collation'
                # Optional. The database collation name of the field.
            )

        class TextFieldClass:
            # A large text field. The default form widget for this field is a Textarea. If you specify a max_length
            # attribute, it will be reflected in the Textarea widget of the auto-generated form field. However it
            # is not enforced at the model or database level. Use a CharField for that.
            text_field = models.TextField(
                # validators=[MinLengthValidator(1), MaxLengthValidator(64), ],
                max_length=None,
                # Required. The maximum length (in characters) of the field. The max_length is enforced at the
                # database level and in Django’s validation using MaxLengthValidator.

                db_collation='char_field_1_db_collation'
                # Optional. The database collation name of the field.
            )

        class SlugFieldClass:

            def __init__(self):
                # Default
                self.max_length = 50

            # A slug is a short label for something, containing only letters, numbers, underscores or hyphens.
            # They’re generally used in URLs. Like a CharField, you can specify max_length (read the note about
            # database portability and max_length in that section, too). If max_length is not specified, Django
            # will use a default length of 50. Implies setting Field.db_index to True. It is often useful to
            # automatically prepopulate a SlugField based on the value of some other value. You can do this
            # automatically in the admin using prepopulated_fields.
            slug_field = models.SlugField(
                validators=[MinLengthValidator(1), MaxLengthValidator(50), ],
                max_length=50,
                # Required. The maximum length (in characters) of the field. The max_length is enforced at the
                # database level and in Django’s validation using MaxLengthValidator.

                allow_unicode=False,
                # If True, the field accepts Unicode letters in addition to ASCII letters. Defaults to False.
            )

        class EmailFieldClass:

            def __init__(self):
                # Default
                self.max_length = 254

            # A string field, for small- to large-sized strings. For large amounts of text, use TextField. The
            # default form widget for this field is a TextInput. CharField has two extra arguments:
            # CharField.max_length¶ and CharField.db_collation¶.
            email_field = models.EmailField(
                validators=[MinLengthValidator(1), MaxLengthValidator(254), ],
                max_length=254,
                # Required. The maximum length (in characters) of the field. The max_length is enforced at the
                # database level and in Django’s validation using MaxLengthValidator.
            )

        class URLFieldClass:

            def __init__(self):
                # Default
                self.max_length = 200

            # A CharField for a URL, validated by URLValidator. The default form widget for this field is a URLInput.
            # Like all CharField subclasses, URLField takes the optional max_length argument. If you don’t specify
            # max_length, a default of 200 is used.
            url_field = models.URLField(
                validators=[MinLengthValidator(1), MaxLengthValidator(200), ],
                max_length=200,
                # Required. The maximum length (in characters) of the field. The max_length is enforced at the
                # database level and in Django’s validation using MaxLengthValidator.
            )

        class UUIDFieldClass:
            # A field for storing universally unique identifiers. Uses Python’s UUID class. When used on
            # PostgreSQL, this stores in a uuid datatype, otherwise in a char(32).
            # Universally unique identifiers are a good alternative to AutoField for primary_key. The database
            # will not generate the UUID for you, so it is recommended to use default:
            uuid_field = models.UUIDField()

        class GenericIPAddressFieldClass:

            def __init__(self):
                # Default
                self.protocol = 'both'
                self.unpack_ipv4 = False

            # An IPv4 or IPv6 address, in string format (e.g. 192.0.2.30 or 2a02:42fe::4). The default form widget
            # for this field is a TextInput. The IPv6 address normalization follows RFC 4291#section-2.2 section
            # 2.2, including using the IPv4 format suggested in paragraph 3 of that section, like ::ffff:192.0.2.0.
            # For example, 2001:0::0:01 would be normalized to 2001::1, and ::ffff:0a0a:0a0a to ::ffff:10.10.10.10.
            # All characters are converted to lowercase.
            genericipaddress_field = models.GenericIPAddressField(
                protocol='both',
                # Limits valid inputs to the specified protocol. Accepted values are 'both' (default), 'IPv4'
                # or 'IPv6'. Matching is case insensitive.

                unpack_ipv4=False,
                # Unpacks IPv4 mapped addresses like ::ffff:192.0.2.1. If this option is enabled that address
                # would be unpacked to 192.0.2.1. Default is disabled. Can only be used when protocol is set to 'both'.
            )

        class JSONFieldClass:

            def __init__(self):
                # Default
                self.encoder = None
                self.decoder = None

            # A field for storing JSON encoded data. In Python the data is represented in its Python native
            # format: dictionaries, lists, strings, numbers, booleans and None.
            json_field = models.JSONField(
                encoder=None,
                # An optional json.JSONEncoder subclass to serialize data types not supported by the standard
                # JSON serializer (e.g. datetime.datetime or UUID). For example, you can use the DjangoJSONEncoder
                # class. Defaults to json.JSONEncoder.

                decoder=None,
                # An optional json.JSONDecoder subclass to deserialize the value retrieved from the database.
                # The value will be in the format chosen by the custom encoder (most often a string). Your
                # deserialization may need to account for the fact that you can’t be certain of the input type.
                # For example, you run the risk of returning a datetime that was actually a string that just
                # happened to be in the same format chosen for datetimes. Defaults to json.JSONDecoder.
            )

        #
        class IntegerFieldClass:
            # An integer. Values from -2147483648 to 2147483647 are safe in all databases supported by Django.
            # It uses MinValueValidator and MaxValueValidator to validate the input based on the values that the
            # default database supports. The default form widget for this field is a NumberInput when localize is
            # False or TextInput otherwise.
            integer_field = models.IntegerField(
                validators=[MinValueValidator(-2147483648), MaxValueValidator(2147483647), ],
            )

        class SmallIntegerFieldClass:
            # Like an IntegerField, but only allows values under a certain (database-dependent) point. Values from
            # -32768 to 32767 are safe in all databases supported by Django.
            smallinteger_field = models.SmallIntegerField(
                validators=[MinValueValidator(-32768), MaxValueValidator(32767), ],
            )

        class BigIntegerFieldClass:
            # An integer. Values from -9223372036854775808 to 9223372036854775807 are safe in all databases supported
            # by Django. It uses MinValueValidator and MaxValueValidator to validate the input based on the values
            # that the default database supports. The default form widget for this field is a NumberInput when
            # localize is False or TextInput otherwise.
            integer_field = models.BigIntegerField(
                validators=[MinValueValidator(-9223372036854775808), MaxValueValidator(9223372036854775807), ],
            )

        class PositiveIntegerFieldClass:
            # Like an IntegerField, but must be either positive or zero (0). Values from 0 to 2147483647 are safe
            # in all databases supported by Django. The value 0 is accepted for backward compatibility reasons.
            positiveinteger_field = models.PositiveIntegerField(
                validators=[MinValueValidator(0), MaxValueValidator(2147483647), ],
            )

        class PositiveSmallIntegerFieldClass:
            # Like a PositiveIntegerField, but only allows values under a certain (database-dependent) point.
            # Values from 0 to 32767 are safe in all databases supported by Django
            positivesmallinteger_field = models.PositiveSmallIntegerField(
                validators=[MinValueValidator(0), MaxValueValidator(32767), ],
            )

        class PositiveBigIntegerFieldClass:
            # Like a PositiveIntegerField, but only allows values under a certain (database-dependent) point.
            # Values from 0 to 9223372036854775807 are safe in all databases supported by Django.
            positivebiginteger_field = models.PositiveBigIntegerField(
                validators=[MinValueValidator(0), MaxValueValidator(9223372036854775807), ],
            )

        class FloatFieldClass:
            # A floating-point number represented in Python by a float instance. The default form widget for this
            # field is a NumberInput when localize is False or TextInput otherwise.
            float_field = models.FloatField()

        class DecimalFieldClass:

            def __init__(self):
                # Default
                self.max_digits = None
                self.decimal_places = None

            # A fixed-precision decimal number, represented in Python by a Decimal instance. It validates the
            # input using DecimalValidator. Has two required arguments max_digits and decimal_places.
            decimal_field = models.DecimalField(
                validators=[DecimalValidator(max_digits=1, decimal_places=2),
                            DecimalValidator(max_digits=5, decimal_places=10), ],

                max_digits=None,
                # The maximum number of digits allowed in the number. Note that this number must be greater than
                # or equal to decimal_places.

                decimal_places=None,
                # The number of decimal places to store with the number.
            )

        #
        class DateTimeFieldClass:

            def __init__(self):
                # Default
                self.auto_now = False
                self.auto_now_add = False

            # A date and time, represented in Python by a datetime.datetime instance. Takes the same extra arguments
            # as DateField.
            # The default form widget for this field is a single DateTimeInput. The admin uses two separate TextInput
            # widgets with JavaScript shortcuts.
            datetime_field = models.DateTimeField(
                auto_now=False,
                # Automatically set the field to now every time the object is saved. Useful for “last-modified”
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override.
                # The field is only automatically updated when calling Model.save(). The field isn’t updated when
                # making updates to other fields in other ways such as QuerySet.update(), though you can specify
                # a custom value for the field in an update like that.

                auto_now_add=False,
                # Automatically set the field to now when the object is first created. Useful for creation of
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override. So even if you set a value for this field when creating the object, it will be
                # ignored. If you want to be able to modify this field, set the following instead of auto_now_add=True:
                # For DateField: default=date.today - from datetime.date.today()
                # For DateTimeField: default=timezone.now - from django.utils.timezone.now()
                # The default form widget for this field is a DateInput. The admin adds a JavaScript calendar,
                # and a shortcut for “Today”. Includes an additional invalid_date error message key.
                # The options auto_now_add, auto_now, and default are mutually exclusive. Any combination of these
                # options will result in an error.
            )

        class DateFieldClass:

            def __init__(self):
                # Default
                self.auto_now = False
                self.auto_now_add = False

            # A date, represented in Python by a datetime.date instance. Has a few extra, optional arguments:
            date_field = models.DateField(
                auto_now=False,
                # Automatically set the field to now every time the object is saved. Useful for “last-modified”
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override.
                # The field is only automatically updated when calling Model.save(). The field isn’t updated when
                # making updates to other fields in other ways such as QuerySet.update(), though you can specify
                # a custom value for the field in an update like that.

                auto_now_add=False,
                # Automatically set the field to now when the object is first created. Useful for creation of
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override. So even if you set a value for this field when creating the object, it will be
                # ignored. If you want to be able to modify this field, set the following instead of auto_now_add=True:
                # For DateField: default=date.today - from datetime.date.today()
                # For DateTimeField: default=timezone.now - from django.utils.timezone.now()
                # The default form widget for this field is a DateInput. The admin adds a JavaScript calendar,
                # and a shortcut for “Today”. Includes an additional invalid_date error message key.
                # The options auto_now_add, auto_now, and default are mutually exclusive. Any combination of these
                # options will result in an error.
            )

        class TimeFieldClass:

            def __init__(self):
                # Default
                self.auto_now = False
                self.auto_now_add = False

            # A time, represented in Python by a datetime.time instance. Accepts the same auto-population options as
            # DateField. The default form widget for this field is a TimeInput. The admin adds some JavaScript
            # shortcuts.
            time_field = models.TimeField(
                auto_now=False,
                # Automatically set the field to now every time the object is saved. Useful for “last-modified”
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override.
                # The field is only automatically updated when calling Model.save(). The field isn’t updated when
                # making updates to other fields in other ways such as QuerySet.update(), though you can specify
                # a custom value for the field in an update like that.

                auto_now_add=False,
                # Automatically set the field to now when the object is first created. Useful for creation of
                # timestamps. Note that the current date is always used; it’s not just a default value that you
                # can override. So even if you set a value for this field when creating the object, it will be
                # ignored. If you want to be able to modify this field, set the following instead of auto_now_add=True:
                # For DateField: default=date.today - from datetime.date.today()
                # For DateTimeField: default=timezone.now - from django.utils.timezone.now()
                # The default form widget for this field is a DateInput. The admin adds a JavaScript calendar,
                # and a shortcut for “Today”. Includes an additional invalid_date error message key.
                # The options auto_now_add, auto_now, and default are mutually exclusive. Any combination of these
                # options will result in an error.
            )

        class DurationFieldClass:
            # A field for storing periods of time - modeled in Python by timedelta. When used on PostgreSQL, the
            # data type used is an interval and on Oracle the data type is INTERVAL DAY(9) TO SECOND(6).
            # Otherwise a bigint of microseconds is used.
            duration_field = models.DurationField()

        #
        class FileFieldClass:
            # A file-upload field. Has two optional arguments: upload_to and max_length.
            file_field = models.FileField(
                upload_to='',
                # This attribute provides a way of setting the upload directory and file name, and can be set in two
                # ways. In both cases, the value is passed to the Storage.save() method.
                # If you specify a string value or a Path, it may contain strftime() formatting, which will be
                # replaced by the date/time of the file upload (so that uploaded files don’t fill up the given
                # directory).# file will be saved to MEDIA_ROOT/uploads/2015/01/30 upload = models.FileField(
                # upload_to='uploads/%Y/%m/%d/')

                max_length=100,
            )

        class ImageFieldClass:

            def __init__(self):
                # Default
                self.upload_to = None
                self.height_field = None
                self.width_field = None
                self.max_length = 100

            # Inherits all attributes and methods from FileField, but also validates that the uploaded object is a
            # valid image. In addition to the special attributes that are available for FileField, an ImageField
            # also has height and width attributes. To facilitate querying on those attributes, ImageField has
            # two extra optional arguments
            image_field = models.ImageField(
                upload_to='',
                # This attribute provides a way of setting the upload directory and file name, and can be set in two
                # ways. In both cases, the value is passed to the Storage.save() method.
                # If you specify a string value or a Path, it may contain strftime() formatting, which will be
                # replaced by the date/time of the file upload (so that uploaded files don’t fill up the given
                # directory).# file will be saved to MEDIA_ROOT/uploads/2015/01/30 upload = models.FileField(
                # upload_to='uploads/%Y/%m/%d/')

                height_field=None,
                # Name of a model field which will be auto-populated with the height of the image each time the
                # model instance is saved.

                width_field=None,
                # Name of a model field which will be auto-populated with the width of the image each time the
                # model instance is saved.

                max_length=100,
            )

        class FilePathFieldClass:

            def __init__(self):
                # Default
                self.path = ''
                self.match = None
                self.recursive = False
                self.allow_files = True
                self.allow_folders = False
                self.max_length = 100

            # A CharField whose choices are limited to the filenames in a certain directory on the filesystem.
            # Has some special arguments, of which the first is required:
            filepath_field = models.FilePathField(
                path='',
                # Required. The absolute filesystem path to a directory from which this FilePathField should
                # get its choices. Example: "/home/images". path may also be a callable, such as a function to
                # dynamically set the path at runtime.

                match=None,
                recursive=False,
                allow_files=True,
                allow_folders=False,
                max_length=100,
            )

        #
        class ForeignKeyClass:

            def __init__(self):
                # Default
                self.to = User
                self.on_delete = models.CASCADE

            # A many-to-one relationship. Requires two positional arguments: the class to which the model is
            # related and the on_delete option. To create a recursive relationship – an object that has a
            # many-to-one relationship with itself – use models.ForeignKey('self', on_delete=models.CASCADE).
            # If you need to create a relationship on a model that has not yet been defined, you can use the name
            # of the model, rather than the model object itself:
            foreignkey_field = models.ForeignKey(
                to=User,
                # Relationships defined this way on abstract models are resolved when the model is subclassed
                # as a concrete model and are not relative to the abstract model’s app_label

                on_delete=models.CASCADE,
                # When an object referenced by a ForeignKey is deleted, Django will emulate the behavior of
                # the SQL constraint specified by the on_delete argument. For example, if you have a nullable
                # ForeignKey and you want it to be set null when the referenced object is deleted:

                # on_delete=models.CASCADE,
                # Cascade deletes. Django emulates the behavior of the SQL constraint ON DELETE CASCADE and
                # also deletes the object containing the ForeignKey.
                # Model.delete() isn’t called on related models, but the pre_delete and post_delete signals
                # are sent for all deleted objects.

                # on_delete=models.PROTECT,
                # Prevent deletion of the referenced object by raising ProtectedError, a subclass of
                # django.db.IntegrityError.

                # on_delete=models.RESTRICT,
                # Prevent deletion of the referenced object by raising RestrictedError (a subclass of
                # django.db.IntegrityError). Unlike PROTECT, deletion of the referenced object is allowed
                # if it also references a different object that is being deleted in the same operation,
                # but via a CASCADE relationship.

                # on_delete=models.SET_NULL,
                # Set the ForeignKey null; this is only possible if null is True.

                # on_delete=models.SET_DEFAULT,
                # Set the ForeignKey to its default value; a default for the ForeignKey must be set.

                # on_delete=models.SET(),
                # Set the ForeignKey to the value passed to SET(), or if a callable is passed in, the result of
                # calling it. In most cases, passing a callable will be necessary to avoid executing queries at
                # the time your models.py is imported:

                # on_delete=models.DO_NOTHING,
                # Take no action. If your database backend enforces referential integrity, this will cause an
                # IntegrityError unless you manually add an SQL ON DELETE constraint to the database field.

                limit_choices_to={'is_staff': True},
                # Sets a limit to the available choices for this field when this field is rendered using a
                # ModelForm or the admin (by default, all objects in the queryset are available to choose).
                # Either a dictionary, a Q object, or a callable returning a dictionary or Q object can be used.

                related_name='foreignkey_field',
                # The name to use for the relation from the related object back to this one. It’s also the default
                # value for related_query_name (the name to use for the reverse filter name from the target model).
                # See the related objects documentation for a full explanation and example. Note that you must set
                # this value when defining relations on abstract models; and when you do so some special syntax
                # is available.
                # If you’d prefer Django not to create a backwards relation, set related_name to '+' or end it with
                # '+'. For example, this will ensure that the User model won’t have a backwards relation to this model:

                related_query_name='foreignkey_field',
                # The name to use for the reverse filter name from the target model. It defaults to the value
                # of related_name or default_related_name if set, otherwise it defaults to the name of the model:

                to_field='foreignkey_field',
                # The field on the related object that the relation is to. By default, Django uses the primary
                # key of the related object. If you reference a different field, that field must have unique=True.

                db_constraint=True,
                # Controls whether or not a constraint should be created in the database for this foreign key.
                # The default is True, and that’s almost certainly what you want; setting this to False can
                # be very bad for data integrity. That said, here are some scenarios where you might want to do this:

                swappable=True,
                # Controls the migration framework’s reaction if this ForeignKey is pointing at a swappable model.
                # If it is True - the default - then if the ForeignKey is pointing at a model which matches the
                # current value of settings.AUTH_USER_MODEL (or another swappable model setting) the relationship
                # will be stored in the migration using a reference to the setting, not to the model directly.
                # You only want to override this to be False if you are sure your model should always point towards
                # the swapped-in model - for example, if it is a profile model designed specifically for your custom
                # user model.
                # Setting it to False does not mean you can reference a swappable model even if it is swapped out -
                # False means that the migrations made with this ForeignKey will always reference the exact model you
                # specify (so it will fail hard if the user tries to run with a User model you don’t support,
                # for example).
                # If in doubt, leave it to its default of True.
            )

        class OneToOneFieldClass:

            def __init__(self):
                # Default
                self.to = User
                self.on_delete = models.CASCADE
                self.parent_link = False

            # A one-to-one relationship. Conceptually, this is similar to a ForeignKey with unique=True, but
            # the “reverse” side of the relation will directly return a single object.
            # This is most useful as the primary key of a model which “extends” another model in some way;
            # Multi-table inheritance is implemented by adding an implicit one-to-one relation from the child
            # model to the parent model, for example.
            # One positional argument is required: the class to which the model will be related. This works
            # exactly the same as it does for ForeignKey, including all the options regarding recursive and
            # lazy relationships.
            # If you do not specify the related_name argument for the OneToOneField, Django will use the
            # lowercase name of the current model as default value.
            onetoone_field = models.OneToOneField(
                to=User,
                # Relationships defined this way on abstract models are resolved when the model is subclassed
                # as a concrete model and are not relative to the abstract model’s app_label

                on_delete=models.CASCADE,
                # When an object referenced by a ForeignKey is deleted, Django will emulate the behavior of
                # the SQL constraint specified by the on_delete argument. For example, if you have a nullable
                # ForeignKey and you want it to be set null when the referenced object is deleted:

                # on_delete=models.CASCADE,
                # Cascade deletes. Django emulates the behavior of the SQL constraint ON DELETE CASCADE and
                # also deletes the object containing the ForeignKey.
                # Model.delete() isn’t called on related models, but the pre_delete and post_delete signals
                # are sent for all deleted objects.

                # on_delete=models.PROTECT,
                # Prevent deletion of the referenced object by raising ProtectedError, a subclass of
                # django.db.IntegrityError.

                # on_delete=models.RESTRICT,
                # Prevent deletion of the referenced object by raising RestrictedError (a subclass of
                # django.db.IntegrityError). Unlike PROTECT, deletion of the referenced object is allowed
                # if it also references a different object that is being deleted in the same operation,
                # but via a CASCADE relationship.

                # on_delete=models.SET_NULL,
                # Set the ForeignKey null; this is only possible if null is True.

                # on_delete=models.SET_DEFAULT,
                # Set the ForeignKey to its default value; a default for the ForeignKey must be set.

                # on_delete=models.SET(),
                # Set the ForeignKey to the value passed to SET(), or if a callable is passed in, the result of
                # calling it. In most cases, passing a callable will be necessary to avoid executing queries at
                # the time your models.py is imported:

                # on_delete=models.DO_NOTHING,
                # Take no action. If your database backend enforces referential integrity, this will cause an
                # IntegrityError unless you manually add an SQL ON DELETE constraint to the database field.

                related_name='foreignkey_field',
                # The name to use for the relation from the related object back to this one. It’s also the default
                # value for related_query_name (the name to use for the reverse filter name from the target model).
                # See the related objects documentation for a full explanation and example. Note that you must set
                # this value when defining relations on abstract models; and when you do so some special syntax
                # is available.
                # If you’d prefer Django not to create a backwards relation, set related_name to '+' or end it with
                # '+'. For example, this will ensure that the User model won’t have a backwards relation to this model:

                related_query_name='foreignkey_field',
                # The name to use for the reverse filter name from the target model. It defaults to the value
                # of related_name or default_related_name if set, otherwise it defaults to the name of the model:

                limit_choices_to={'is_staff': True},
                # Sets a limit to the available choices for this field when this field is rendered using a
                # ModelForm or the admin (by default, all objects in the queryset are available to choose).
                # Either a dictionary, a Q object, or a callable returning a dictionary or Q object can be used.

                # symmetrical=True,
                # Only used in the definition of ManyToManyFields on self. Consider the following model:
                # models.ManyToManyField("self") When Django processes this model, it identifies that it has a
                # ManyToManyField on itself, and as a result, it doesn’t add a person_set attribute to the Person
                # class. Instead, the ManyToManyField is assumed to be symmetrical – that is, if I am your friend,
                # then you are my friend.
                # If you do not want symmetry in many-to-many relationships with self, set symmetrical to False.
                # This will force Django to add the descriptor for the reverse relationship, allowing ManyToManyField
                # relationships to be non-symmetrical.

                # through=User,
                # Django will automatically generate a table to manage many-to-many relationships. However,
                # if you want to manually specify the intermediary table, you can use the through option to
                # specify the Django model that represents the intermediate table that you want to use.
                #
                # The most common use for this option is when you want to associate extra data with a many-to-many
                # relationship.

                # through_fields=('group', 'person'),
                # Only used when a custom intermediary model is specified. Django will normally determine which
                # fields of the intermediary model to use in order to establish a many-to-many relationship
                # automatically. However, consider the following models:

                # db_table='foreignkey_field',
                # The name of the table to create for storing the many-to-many data. If this is not provided,
                # Django will assume a default name based upon the names of: the table for the model defining
                # the relationship and the name of the field itself.

                db_constraint=True,
                # Controls whether or not a constraint should be created in the database for this foreign key.
                # The default is True, and that’s almost certainly what you want; setting this to False can
                # be very bad for data integrity. That said, here are some scenarios where you might want to do this:

                swappable=True,
                # Controls the migration framework’s reaction if this ForeignKey is pointing at a swappable model.
                # If it is True - the default - then if the ForeignKey is pointing at a model which matches the
                # current value of settings.AUTH_USER_MODEL (or another swappable model setting) the relationship
                # will be stored in the migration using a reference to the setting, not to the model directly.
                # You only want to override this to be False if you are sure your model should always point towards
                # the swapped-in model - for example, if it is a profile model designed specifically for your custom
                # user model.
                # Setting it to False does not mean you can reference a swappable model even if it is swapped out -
                # False means that the migrations made with this ForeignKey will always reference the exact model you
                # specify (so it will fail hard if the user tries to run with a User model you don’t support,
                # for example).
                # If in doubt, leave it to its default of True.
            )

        class ManyToManyFieldClass:

            def __init__(self):
                # Default
                self.to = User

            # A many-to-many relationship. Requires a positional argument: the class to which the model is related,
            # which works exactly the same as it does for ForeignKey, including recursive and lazy relationships.
            # Related objects can be added, removed, or created with the field’s RelatedManager.
            # Behind the scenes, Django creates an intermediary join table to represent the many-to-many relationship.
            # By default, this table name is generated using the name of the many-to-many field and the name of the
            # table for the model that contains it. Since some databases don’t support table names above a certain
            # length, these table names will be automatically truncated and a uniqueness hash will be used, e.g.
            # author_books_9cdf. You can manually provide the name of the join table using the db_table option.
            manytomany_field = models.ManyToManyField(
                to=User,
                # Relationships defined this way on abstract models are resolved when the model is subclassed
                # as a concrete model and are not relative to the abstract model’s app_label

                related_name='foreignkey_field',
                # The name to use for the relation from the related object back to this one. It’s also the default
                # value for related_query_name (the name to use for the reverse filter name from the target model).
                # See the related objects documentation for a full explanation and example. Note that you must set
                # this value when defining relations on abstract models; and when you do so some special syntax
                # is available.
                # If you’d prefer Django not to create a backwards relation, set related_name to '+' or end it with
                # '+'. For example, this will ensure that the User model won’t have a backwards relation to this model:

                related_query_name='foreignkey_field',
                # The name to use for the reverse filter name from the target model. It defaults to the value
                # of related_name or default_related_name if set, otherwise it defaults to the name of the model:

                limit_choices_to={'is_staff': True},
                # Sets a limit to the available choices for this field when this field is rendered using a
                # ModelForm or the admin (by default, all objects in the queryset are available to choose).
                # Either a dictionary, a Q object, or a callable returning a dictionary or Q object can be used.

                symmetrical=True,
                # Only used in the definition of ManyToManyFields on self. Consider the following model:
                # models.ManyToManyField("self") When Django processes this model, it identifies that it has a
                # ManyToManyField on itself, and as a result, it doesn’t add a person_set attribute to the Person
                # class. Instead, the ManyToManyField is assumed to be symmetrical – that is, if I am your friend,
                # then you are my friend.
                # If you do not want symmetry in many-to-many relationships with self, set symmetrical to False.
                # This will force Django to add the descriptor for the reverse relationship, allowing ManyToManyField
                # relationships to be non-symmetrical.

                through=User,
                # Django will automatically generate a table to manage many-to-many relationships. However,
                # if you want to manually specify the intermediary table, you can use the through option to
                # specify the Django model that represents the intermediate table that you want to use.
                #
                # The most common use for this option is when you want to associate extra data with a many-to-many
                # relationship.

                through_fields=('group', 'person'),
                # Only used when a custom intermediary model is specified. Django will normally determine which
                # fields of the intermediary model to use in order to establish a many-to-many relationship
                # automatically. However, consider the following models:

                # db_table='foreignkey_field',
                # The name of the table to create for storing the many-to-many data. If this is not provided,
                # Django will assume a default name based upon the names of: the table for the model defining
                # the relationship and the name of the field itself.

                db_constraint=True,
                # Controls whether or not a constraint should be created in the database for this foreign key.
                # The default is True, and that’s almost certainly what you want; setting this to False can
                # be very bad for data integrity. That said, here are some scenarios where you might want to do this:

                swappable=True,
                # Controls the migration framework’s reaction if this ForeignKey is pointing at a swappable model.
                # If it is True - the default - then if the ForeignKey is pointing at a model which matches the
                # current value of settings.AUTH_USER_MODEL (or another swappable model setting) the relationship
                # will be stored in the migration using a reference to the setting, not to the model directly.
                # You only want to override this to be False if you are sure your model should always point towards
                # the swapped-in model - for example, if it is a profile model designed specifically for your custom
                # user model.
                # Setting it to False does not mean you can reference a swappable model even if it is swapped out -
                # False means that the migrations made with this ForeignKey will always reference the exact model you
                # specify (so it will fail hard if the user tries to run with a User model you don’t support,
                # for example).
                # If in doubt, leave it to its default of True.
            )

    class Meta:
        app_label = 'auth'
        ordering = ('-id',)
        verbose_name = 'Шаблон'
        verbose_name_plural = '0_Шаблоны'
        db_table = 'example_table'

    def __str__(self):
        return str(self.id)

    def get_id(self):
        return self.id


# Logging
class LoggingModel(models.Model):
    """
    Logging Model
    """

    username_slug_field = models.SlugField(
        db_column='username_slug_field_db_column',
        db_index=True,
        db_tablespace='username_slug_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(12), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя пользователя',
        help_text='<small class="text-muted">Тут отображается идентификатор пользователя, например: </small><hr><br>',

        max_length=12,
        allow_unicode=False,
    )
    ip_genericipaddress_field = models.GenericIPAddressField(
        db_column='ip_genericipaddress_field_field_db_column',
        db_index=True,
        db_tablespace='ip_genericipaddress_field_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(12), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Ip адрес клиента',
        help_text='<small class="text-muted">Строка содержащая ip-адрес, example: '
                  '"127.0.0.1"</small><hr><br>',

        protocol='both',
        unpack_ipv4=False,
    )
    request_path_slug_field = models.SlugField(
        db_column='request_path_slug_field_field_db_column',
        db_index=True,
        db_tablespace='request_path_slug_field_field_db_tablespace',
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
        verbose_name='Действие пользователя',
        help_text='<small class="text-muted">Строка содержащая путь обращения, example: '
                  '"https://.../home/"</small><hr><br>',

        max_length=128,
        allow_unicode=False,
    )
    request_method_slug_field = models.SlugField(
        db_column='request_method_slug_field_field_db_column',
        db_index=True,
        db_tablespace='request_method_slug_field_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(4), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Метод запроса',
        help_text='<small class="text-muted">GET: просмотр страницы, POST: отправка данных из формы</small><hr><br>',

        max_length=4,
        allow_unicode=False,
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
        validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="error: ",
        verbose_name='Текст ошибки и/или исключения',
        help_text='<small class="text-muted">Много текста, example: "текст, текст..."</small><hr><br>',

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
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время записи',
        help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'auth'
        ordering = ('-datetime_field',)
        verbose_name = 'Лог'
        verbose_name_plural = '1_Логи'
        db_table = 'logging_model_table'

    def __str__(self):
        if self.username_slug_field:
            try:
                username = User.objects.get(username=self.username_slug_field).profile.last_name
            except Exception as error:
                username = ''
        else:
            username = ''
        return f'{self.datetime_field} {username} {self.request_path_slug_field}'


# User
class UserModel(models.Model):
    """
    Account Profile Model
    """
    # authorization data
    user_one_to_one_field = models.OneToOneField(
        db_column='user_one_to_one_field_db_column',
        db_index=True,
        db_tablespace='user_one_to_one_field_db_tablespace',
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
        default=None,
        verbose_name='Пользователь',
        help_text='<small class="text-muted">Связь, с пользователем, которому принадлежит профиль, example: '
                  '"to=User.objects.get(username="Bogdan")"</small><hr><br>',

        to=User,
        on_delete=models.CASCADE,
        related_name='user_one_to_one_field',
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
    # technical data
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
    # first data
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
    # second data
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
    # personal data
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
        default='data/account/default_avatar.jpg',
        verbose_name='Изображение профиля пользователя',
        help_text='<small class="text-muted">image_field_db_column</small><hr><br>',

        upload_to='uploads/account/avatar',
        max_length=100,
    )

    class Meta:
        app_label = 'auth'
        ordering = ('user_one_to_one_field',)
        verbose_name = 'Аккаунт'
        verbose_name_plural = '3_Аккаунты'
        db_table = 'account_table'

    def __str__(self):
        if self.activity_boolean_field:
            activity = 'Активен'
        else:
            activity = 'Неактивен'
        return f'{self.last_name_char_field} | {self.first_name_char_field} | {self.patronymic_char_field} | ' \
               f'{self.user_one_to_one_field} | {activity}'

    def get_id(self):
        return self.id

    def get_iin(self):
        return int(self.user_one_to_one_field.username)


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    # Создание при создании пользователя
    if created:
        UserModel.objects.create(user_one_to_one_field=instance)
    # Сохранение при сохранении пользователя
    else:
        instance.user_one_to_one_field.save()


# Action
class ActionModel(models.Model):
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
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя действия для отображения',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=32,
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
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя действия для валидации и ссылок',
        help_text='<small class="text-muted underline">латинница, нижний регистр, без пробелов, например: '
                  '"moderator_oupibp"</small><hr><br>',

        max_length=32,
        allow_unicode=False,
    )

    class Meta:
        app_label = 'auth'
        ordering = ('name_char_field', 'name_slug_field')
        verbose_name = 'Действия'
        verbose_name_plural = '5_Действия'
        db_table = 'actions_model_table'

    def __str__(self):
        return f'{self.name_char_field}'

    def get_id(self):
        return self.id


# Group
class GroupModel(models.Model):
    # authorization data
    group_one_to_one_field = models.OneToOneField(
        db_column='group_one_to_one_field_db_column',
        db_index=True,
        db_tablespace='group_one_to_one_field_db_tablespace',
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
        default=None,
        verbose_name='Группа',
        help_text='<small class="text-muted">Связь, с пользователем, которому принадлежит профиль, example: '
                  '"to=User.objects.get(username="Bogdan")"</small><hr><br>',

        to=Group,
        on_delete=models.CASCADE,
        related_name='group_one_to_one_field',
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
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для отображения',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=32,
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
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для валидации и ссылок',
        help_text='<small class="text-muted underline">латинница, нижний регистр, без пробелов, например: '
                  '"moderator_oupibp"</small><hr><br>',

        max_length=32,
        allow_unicode=False,
    )
    path_text_field = models.TextField(
        db_column='path_text_field_db_column',
        db_index=True,
        db_tablespace='path_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя путей для доступа',
        help_text='<small class="text-muted underline">через запятую нужно перечислить имена путей для доступа, '
                  'латинница, любой регистр, например: "login, admin, home"</small><hr><br>',

        max_length=256,
        # db_collation='text_field_db_collation'
    )
    path_many_to_many_field = models.ManyToManyField(
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
        related_name='path_many_to_many_field',
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

    class Meta:
        app_label = 'auth'
        ordering = ('name_char_field', 'name_slug_field')
        verbose_name = 'Группа'
        verbose_name_plural = '4_Группы'
        db_table = 'groups_model_table'

    def __str__(self):
        return f'{self.name_char_field}'

    def get_id(self):
        return self.id


@receiver(post_save, sender=Group)
def create_group(sender, instance, created, **kwargs):
    # Создание при создании пользователя
    if created:
        GroupModel.objects.create(group_one_to_one_field=instance)
    # Сохранение при сохранении пользователя
    else:
        instance.group_one_to_one_field.save()


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
# Application
class ApplicationModuleModel(models.Model):
    """
    Application Module Model
    """
    module_position = models.IntegerField('позиция', blank=False)
    module_name = models.CharField('название', max_length=50, unique=True)
    module_slug = models.CharField('ссылка', max_length=50, blank=False)
    module_image = models.ImageField('картинка', upload_to='uploads/application/module', blank=True)
    module_description = models.CharField('описание', max_length=100, blank=True)

    class Meta:
        ordering = ('module_position',)
        verbose_name = 'Модуль'
        verbose_name_plural = 'Модули'
        db_table = 'application_module_table'

    def __str__(self):
        return f'{self.module_name} :: {self.module_position}'


class ApplicationComponentModel(models.Model):
    """
    Application Component Model
    """
    component_Foreign = models.ForeignKey(ApplicationModuleModel, on_delete=models.CASCADE, verbose_name='модуль',
                                          blank=False)
    component_position = models.IntegerField('позиция в списке закладок', blank=False)
    component_name = models.CharField('название закладки', max_length=50, unique=True)
    component_slug = models.CharField('ссылка закладки', max_length=50, blank=False)
    component_image = models.ImageField('картинка закладки', upload_to='uploads/application/component', blank=True)
    component_description = models.CharField('описание закладки', max_length=100, blank=True)

    class Meta:
        ordering = ('component_Foreign', 'component_position')
        verbose_name = 'Компонент'
        verbose_name_plural = 'Компоненты'
        db_table = 'application_component_table'

    def __str__(self):
        return f'{self.component_Foreign} :: {self.component_position} :: {self.component_name}'


# Ideas
class IdeasCategoryModel(models.Model):
    """
    Ideas Category Model
    """
    category_name = models.CharField(max_length=50, unique=True, verbose_name='название')
    category_slug = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    category_description = models.TextField('описание', blank=True)
    category_image = models.ImageField('картинка', upload_to='uploads/rational/category', blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Категория в банке идей'
        verbose_name_plural = 'Категории в банке идей'
        db_table = 'ideas_category_table'

    def __str__(self):
        return f'{self.category_name}'


class IdeasModel(models.Model):
    """
    Bank Ideas Model
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Пользователь', blank=True)
    name = models.CharField(verbose_name='Название', max_length=50, blank=True)
    category = models.ForeignKey(IdeasCategoryModel, on_delete=models.SET_NULL, null=True, editable=True,
                                 default=None, verbose_name='Категория', blank=True)
    short_description = models.CharField(verbose_name='Короткое описание', max_length=50, blank=True)
    long_description = models.TextField(verbose_name='Длинное описание', blank=True)

    image = models.ImageField(verbose_name='Картинка к идеи', upload_to='uploads/bankidea/%d_%m_%Y', null=True,
                              blank=True)
    document = models.FileField(verbose_name='Документ к идеи', upload_to='uploads/bankidea/%d_%m_%Y', null=True,
                                blank=True)
    status = models.BooleanField(verbose_name='Статус отображения', default=False, blank=True)
    datetime_register = models.DateTimeField(verbose_name='Дата регистрации', auto_created=True, null=True,
                                             editable=True, blank=True)
    datetime_created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Идею'
        verbose_name_plural = 'Банк идей'
        db_table = 'ideas_table'

    def __str__(self):
        return f'{self.name} : {self.name} : {self.category}'

    def get_total_comment_value(self):
        return IdeasCommentModel.objects.filter(comment_idea=self.id).count()

    def get_like_count(self):
        return IdeasLikeModel.objects.filter(like_idea=self, like_status=True).count()

    def get_dislike_count(self):
        return IdeasLikeModel.objects.filter(like_idea=self, like_status=False).count()

    def get_total_rating_value(self):
        return IdeasLikeModel.objects.filter(like_idea=self, like_status=True).count() + \
               IdeasLikeModel.objects.filter(like_idea=self, like_status=False).count()

    def get_total_rating(self):
        return IdeasLikeModel.objects.filter(like_idea=self, like_status=True).count() - \
               IdeasLikeModel.objects.filter(like_idea=self, like_status=False).count()


class IdeasCommentModel(models.Model):
    """
    Ideas Comment Model
    """
    comment_author = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Пользователь', null=True,
                                       blank=True)
    comment_idea = models.ForeignKey(IdeasModel, on_delete=models.SET_NULL, verbose_name='Идея', null=True,
                                     blank=True)
    comment_text = models.TextField(verbose_name='Текст комментария')
    comment_date = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Комментарий в банке идей'
        verbose_name_plural = 'Комментарии в банке идей'
        db_table = 'ideas_comment_table'

    def __str__(self):
        return f'{self.comment_author} :: {self.comment_idea} :: {self.comment_text[:10]}... :: {self.comment_date}'


class IdeasLikeModel(models.Model):
    """
    Ideas Like Model
    """
    like_author = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Пользователь', null=True, blank=True)
    like_idea = models.ForeignKey(IdeasModel, on_delete=models.SET_NULL, verbose_name='Идея', null=True,
                                  blank=True)
    like_status = models.BooleanField(verbose_name='Лайк/дизлайк', default=False, blank=True)
    like_date = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Лайк в банке идей'
        verbose_name_plural = 'Лайки в банке идей'
        db_table = 'ideas_like_table'

    def __str__(self):
        return f'{self.like_author} :: {self.like_idea} :: {self.like_status} :: {self.like_date}'


# Projects
class ProjectsModel(models.Model):
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
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для отображения',
        help_text='<small class="text-muted underline">кириллица, любой регистр, можно с пробелами, например: '
                  '"Модератор отдела ОУПиБП"</small><hr><br>',

        max_length=32,
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
        validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя группы для валидации и ссылок',
        help_text='<small class="text-muted underline">латинница, нижний регистр, без пробелов, например: '
                  '"moderator_oupibp"</small><hr><br>',

        max_length=32,
        allow_unicode=False,
    )
    path_text_field = models.TextField(
        db_column='path_text_field_db_column',
        db_index=True,
        db_tablespace='path_text_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinLengthValidator(0), MaxLengthValidator(256), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя путей для доступа',
        help_text='<small class="text-muted underline">через запятую нужно перечислить имена путей для доступа, '
                  'латинница, любой регистр, например: "login, admin, home"</small><hr><br>',

        max_length=256,
        # db_collation='text_field_db_collation'
    )
    path_many_to_many_field = models.ManyToManyField(
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
        related_name='projects_model_path_many_to_many_field',
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
        related_name='projects_model_user_many_to_many_field',
    )
    boolean_field = models.BooleanField(
        db_column='boolean_field_db_column',
        db_index=True,
        db_tablespace='boolean_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='boolean_field',
        help_text='<small class="text-muted">Значение правда или ложь, example: "True" / '
                  '"False"</small><hr><br>',
    )
    integer_field = models.IntegerField(
        db_column='integer_field_db_column',
        db_index=True,
        db_tablespace='integer_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinValueValidator(-2147483648), MaxValueValidator(2147483647), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0,
        verbose_name='integer_field',
        help_text='<small class="text-muted">Целочисленное значение от -2147483648 до 2147483647, example: '
                  '"0"</small><hr><br>',
    )
    float_field = models.FloatField(
        db_column='float_field_db_column',
        db_index=True,
        db_tablespace='float_field_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[MinValueValidator(-1000), MaxValueValidator(1000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=0.0,
        verbose_name='float_field',
        help_text='<small class="text-muted">Число с плавающей запятой, example: "0.0"</small><hr><br>',
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
        verbose_name='datetime_field',
        help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    file_field = models.FileField(
        db_column='file_field_db_column',
        db_index=True,
        db_tablespace='file_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[FileExtensionValidator(['xlsx', 'xls'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='file_field',
        help_text='<small class="text-muted">Файл, с расширением указанным в валидаторе, example: '
                  '"example.xlsx"</small><hr><br>',

        upload_to='uploads/example/%Y/%m/%d/',
        max_length=100,
    )
    image_field = models.ImageField(
        db_column='image_field_db_column',
        db_index=True,
        db_tablespace='image_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        # choices=LIST_DB_VIEW_CHOICES,
        validators=[FileExtensionValidator(['jpg'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='uploads/example/example.jpg',
        verbose_name='file_field',
        help_text='<small class="text-muted">>Файл, с расширением изображения, example: "example.jpg('
                  '/png/bpm...)"</small><hr><br>',

        upload_to='uploads/example/example.jpg',
        max_length=100,
        # height_field=1920,  # Значение высоты изображения при каждом сохранении объекта
        # width_field=1080,  # Значение ширины изображения при каждом сохранении объекта.
    )
    foreign_key_field = models.ForeignKey(
        db_column='foreign_key_field_db_column',
        db_index=True,
        db_tablespace='foreign_key_field_db_tablespace',
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
        default=None,
        verbose_name='foreign_key_field',
        help_text='<small class="text-muted">Связь, с каким-либо объектом, example: "to=User.objects.get'
                  '(username="Bogdan")"</small><hr><br>',

        to=User,
        on_delete=models.CASCADE,
        # limit_choices_to={'is_staff': True},
        # related_name='foreign_key_field',
        # related_query_name='foreign_key_field',
        # to_field='foreign_key_field',
        # db_constraint=True,
        # swappable=True,
    )

    class Meta:
        app_label = 'auth'
        ordering = ('name_char_field', 'name_slug_field')
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        db_table = 'projects_model_table'

    def __str__(self):
        return f'{self.name_char_field}'

    def get_id(self):
        return self.id


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
# Rational
class CategoryRationalModel(models.Model):
    """
    Category Rational Model
    """
    category_name = models.CharField(max_length=50, unique=True, verbose_name='название')
    category_slug = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    category_description = models.TextField('описание', blank=True)
    category_image = models.ImageField('картинка', upload_to='uploads/rational/category', blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        db_table = 'category_rational_table'

    def __str__(self):
        return f'{self.category_name}'


class RationalModel(models.Model):
    """
    Rational Model
    """
    rational_structure_from = models.CharField('имя подразделения', max_length=50, blank=True)
    rational_uid_registered = models.IntegerField('номер регистрации', default=0, blank=True)
    rational_date_registered = models.DateTimeField('дата регистрации', editable=True, auto_created=True,
                                                    default=timezone.now, blank=True, )
    rational_name = models.CharField('название статьи', max_length=50)
    rational_place_innovation = models.CharField('место внедрения', max_length=100, blank=True)
    rational_description = RichTextField('описание', blank=True)
    rational_addition_file_1 = models.FileField('приложение 1', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)
    rational_addition_file_2 = models.FileField('приложение 2', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)
    rational_addition_file_3 = models.FileField('приложение 3', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)
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
    rational_offering_members = RichTextField('предложившие участники', default=rational_offering_members_default,
                                              blank=True)
    rational_conclusion_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                  'style="width:1000px"><thead><tr><td><p>Название Структурного ' \
                                  'подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, ' \
                                  'название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td' \
                                  '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp' \
                                  ';</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td' \
                                  '>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                  '><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                  ';</td></tr></tbody></table> '
    rational_conclusion = RichTextField('заключения по предложению', default=rational_conclusion_default, blank=True)
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
    rational_change_documentations = RichTextField('изменение нормативной и тех. документации',
                                                   default=rational_change_documentations_default, blank=True)
    rational_resolution = models.CharField('принятое решение', max_length=200, blank=True)
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
    rational_responsible_members = RichTextField('ответственные участники',
                                                 default=rational_responsible_members_default, blank=True)
    rational_date_certification = models.DateTimeField('дата получения удостоверения на предложение', editable=True,
                                                       auto_created=True, default=timezone.now, blank=True)

    rational_category = models.ForeignKey(CategoryRationalModel, on_delete=models.SET_NULL, null=True, editable=True,
                                          default=None, verbose_name='Категория', blank=True)
    rational_author_name = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, editable=True, default=None,
                                             verbose_name='имя автора', blank=True)
    rational_date_create = models.DateTimeField('дата создания', auto_now_add=True, blank=True)
    rational_addition_image = models.ImageField('картинка к предложению',
                                                upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_status = models.BooleanField('статус', default=False, blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Рационализаторское предложение'
        verbose_name_plural = 'Рационализаторские предложения'
        db_table = 'rational_table'

    def __str__(self):
        return f'{self.rational_name} :: {self.rational_uid_registered} :: {self.rational_category} :: ' \
               f'{self.rational_author_name}'

    def get_total_comment_value(self):
        return CommentRationalModel.objects.filter(comment_article=self.id).count()

    def get_like_count(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=True).count()

    def get_dislike_count(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=False).count()

    def get_total_rating_value(self):
        return LikeRationalModel.objects.filter(like_article=self,
                                                like_status=True).count() + LikeRationalModel.objects.filter(
            like_article=self, like_status=False).count()

    def get_total_rating(self):
        return LikeRationalModel.objects.filter(like_article=self,
                                                like_status=True).count() - LikeRationalModel.objects.filter(
            like_article=self, like_status=False).count()


class CommentRationalModel(models.Model):
    """
    Comment Rational Model
    """
    comment_article = models.ForeignKey(RationalModel, on_delete=models.CASCADE, verbose_name='предложение')
    comment_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор')
    comment_text = models.TextField('текст')
    comment_date = models.DateTimeField('дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        db_table = 'comment_rational_table'

    def __str__(self):
        return f'{self.comment_author} :: {self.comment_article} :: {self.comment_date}'


class LikeRationalModel(models.Model):
    """
    Like Rational Model
    """
    like_article = models.ForeignKey(RationalModel, on_delete=models.CASCADE, verbose_name='предложение')
    like_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор')
    like_status = models.BooleanField('лайк/дизлайк', default=False)
    like_date = models.DateTimeField('дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Лайк'
        verbose_name_plural = 'Лайки'
        db_table = 'like_rational_table'

    def __str__(self):
        return f'{self.like_author} :: {self.like_article} :: {self.like_status} :: {self.like_date}'


# Extra
class ArticleModel(models.Model):
    """
    Article Model
    """
    article_title = models.CharField('название статьи', max_length=200)
    article_text = models.TextField('текст статьи', blank=True)
    article_pub_date = models.DateTimeField(auto_now_add=True)
    article_image = models.ImageField('картинка статьи', upload_to='app_news/', blank=True)
    article_rating_positive = models.IntegerField('лайки статьи', default=0, blank=False)
    article_rating_negative = models.IntegerField('дизлайки статьи', default=0, blank=False)
    article_rating_value = models.IntegerField('рейтинг статьи', default=0, blank=False)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'
        db_table = 'article_table'

    def __str__(self):
        return self.article_title

    def short_text(self):
        return f"{self.article_text[:100]}"

    def get_article_rating_value(self):
        return self.article_rating_positive - self.article_rating_negative

    def get_total_rating_value(self):
        return self.article_rating_positive + self.article_rating_negative

    def increase(self):
        self.article_rating_positive = self.article_rating_positive + 1

    def decrease(self):
        self.article_rating_negative = self.article_rating_negative + 1


class CommentModel(models.Model):
    """
    Comment Model
    """
    article = models.ForeignKey(ArticleModel, on_delete=models.CASCADE)
    author_name = models.CharField('имя автора', max_length=50)
    comment_text = models.TextField('текст комментария', blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        db_table = 'comment_table'

    def __str__(self):
        return f"{self.article} : {self.author_name}"


class SmsModel(models.Model):
    """
    Sms Model
    """
    sms_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор сообщения')
    sms_description = models.TextField('текст сообщения', blank=True)
    sms_date = models.DateTimeField('дата отправки', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Смс'
        verbose_name_plural = 'Смс'
        db_table = 'sms_table'

    def __str__(self):
        return f'{self.sms_author} : {self.sms_date}'


class MessageModel(models.Model):
    """
    Message Model
    """
    message_name = models.CharField('название', max_length=50, blank=False)
    message_slug = models.CharField('кому', max_length=50, blank=False)
    message_description = models.TextField('текст', blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        db_table = 'message_table'

    def __str__(self):
        return f'{self.message_name} : {self.message_slug}'


class DocumentModel(models.Model):
    """
    Document Model
    """
    document_name = models.CharField(max_length=50, unique=True, verbose_name='название')
    document_slug = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    document_description = models.TextField('описание', blank=True)
    document_addition_file_1 = models.FileField('приложение 1', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)
    document_addition_file_2 = models.FileField('приложение 2', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Документ'
        verbose_name_plural = 'Документы'
        db_table = 'document_table'

    def __str__(self):
        return f'{self.document_name} : {self.document_slug}'


class ContactModel(models.Model):
    """
    Contact Model
    """
    contact_name = models.CharField(max_length=50, unique=True, verbose_name='название')
    contact_slug = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    contact_description = models.TextField('описание', blank=True)
    contact_image = models.ImageField('картинка', upload_to='uploads/contact', blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Контакт'
        verbose_name_plural = 'Контакты'
        db_table = 'contact_table'

    def __str__(self):
        return f'{self.contact_name}'


class EmailModel(models.Model):
    """
    Email Model
    """
    Email_subject = models.CharField(max_length=100, verbose_name='тема')
    Email_message = models.CharField(max_length=100, verbose_name='тема')
    Email_email = models.CharField(max_length=100, verbose_name='тема')
    Email_date = models.DateTimeField('дата создания', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Письмо'
        verbose_name_plural = 'Письма'
        db_table = 'email_table'

    def __str__(self):
        return f'{self.Email_email} :: {self.Email_message}'


class NotificationModel(models.Model):
    """
    Notification Model
    """
    notification_name = models.CharField('название', max_length=50)
    notification_slug = models.CharField('ссылка', max_length=50)
    notification_description = models.TextField('описание')
    notification_date = models.DateTimeField('дата и время', auto_now_add=True)
    notification_status = models.BooleanField('статус', default=True)
    notification_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, editable=True, default=None,
                                            verbose_name='имя автора')

    class Meta:
        ordering = ('-notification_status', '-notification_date',)
        verbose_name = 'Уведомление'
        verbose_name_plural = 'Уведомления'
        db_table = 'notification_table'

    def __str__(self):
        return f'{self.notification_name} :: {self.notification_status} :: {self.notification_date}'


class AccountTemplateModel(models.Model):
    """
    Account Template Model
    """
    template_name = models.CharField(max_length=50, unique=True, verbose_name='название')
    template_slug = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    template_description = models.TextField('описание', blank=True)
    template_addition_file_1 = models.FileField('приложение 1', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)
    template_addition_file_2 = models.FileField('приложение 2', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S',
                                                blank=True, null=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Шаблон'
        verbose_name_plural = 'Шаблоны'
        db_table = 'account_template_table'

    def __str__(self):
        return f'{self.template_name}'


class CityModel(models.Model):
    """
    City Model
    """
    name = models.CharField('город', max_length=30, unique=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Город'
        verbose_name_plural = 'Города'
        db_table = 'city_table'

    def __str__(self):
        return f"{self.name}"
