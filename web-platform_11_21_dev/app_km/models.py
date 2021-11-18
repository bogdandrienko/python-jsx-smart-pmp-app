from datetime import datetime
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator, MinLengthValidator, MaxLengthValidator, \
    FileExtensionValidator


class ExampleModel(models.Model):
    """
    Модель с максимумом вариаций параметров и полей
    """

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
        help_text='<small class="text-muted underline">Значение правда или ложь, example: "True" / "False"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Небольшая срока текста, example: "текст, текст"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Много текста, example: "текст, текст..."</small><hr><br>',
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
        help_text='<small class="text-muted underline">Строка текста валидная для ссылок и системных вызовов, '
                  'example: "success"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Строка содержащая почту, example: '
                  '"bogdandrienko@gmail.com"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Строка содержащая url-адрес, example: '
                  '"http://89.218.132.130:8000/"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Строка содержащая ip-адрес, example: '
                  '"127.0.0.1"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Целочисленное значение от -2147483648 до 2147483647, example: '
                  '"0"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Большое целочисленное значение от -9223372036854775808 до '
                  '9223372036854775807, example: "0"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Положительное целочисленное значение от 0 до 2147483647, '
                  'example: "0"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Число с плавающей запятой, example: "0.0"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Нецелочисленное значение, example: "0.000"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Дата, example: "31.12.2021"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Время, example: "23:59:59"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Длительность во времени, example: "01:59:59"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Файл, с расширением указанным в валидаторе, example: '
                  '"example.xlsx"</small><hr><br>',
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
        help_text='<small class="text-muted underline">>Файл, с расширением изображения, example: "example.jpg('
                  '/png/bpm...)"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Связь, с каким-либо объектом, example: "to=User.objects.get('
                  'username="Bogdan")"</small><hr><br>',
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
        help_text='<small class="text-muted underline">Бинарные данные (сохранять без преписки b"), example: '
                  '"OTcwODAxMzUxMTc5"</small><hr><br>',
        verbose_name='binary',
    )

    class Example:
        # Константа (не обязательно), которая содержит кортеж для параметра 'choices'
        LIST_KEY_VALUE_CHOICES = [
            ('db_value_1', 'view_value_1'),
            ('db_value_2', 'view_value_2')
        ]
        name = models.CharField(
            null=False,
            # При True Django сохранит пустое значение как NULL в базе данных. Значение по умолчанию – False.

            blank=True,  # При True поле может быть пустым. Значение по умолчанию – False. (для проверки данных)

            choices=LIST_KEY_VALUE_CHOICES,  # Первый элемент каждого кортежа – это значение, которое будет сохранено в
            # базе данных. Второй элемент – название, которое будет отображаться для пользователей.

            db_column='name',  # Имя колонки в базе данных для хранения данных этого поля. Если этот параметр не указан,
            # Django будет использовать название поля.

            db_index=True,  # При True для поля будет создан индекс в базе данных.

            db_tablespace='name_tablespace',
            # Имя «tablespace» базы данных используемое для индекса поля, если поле имеет индекс. По-умолчанию
            # используется значение настройки DEFAULT_INDEX_TABLESPACE проекта, если оно указано, иначе db_tablespace
            # модели. Если база данных не поддерживает «tablespace» для индексов, этот параметр будет проигнорирован.

            default='',  # Значение по умолчанию для поля. Это может быть значение или вызываемый(callable) объект.
            # Если это вызываемый объект, он будет вызван при создании нового объекта.

            editable=True,  # При False, поле не будет отображаться в админке или любой другой ModelForm для модели.
            # Такие поля также пропускаются при валидации модели. Значение по умолчанию – True.

            help_text='',  # Подсказка, отображаемая под полем в интерфейсе администратора. Это полезно для описания
            # поля, даже если модель не используется в форме. Заметим, что, при отображении в форме, HTML-символы не
            # экранируются. Это позволяет использовать HTML в help_text если вам необходимо. Например: help_text="Please
            # use the following format: <em>YYYY-MM-DD</em>."

            primary_key=False,  # При True это поле будет первичным ключом. Если вы не укажите primary_key=True для
            # какого-либо поля в модели, Django самостоятельно добавит AutoField для хранения первичного ключа,
            # вы не обязаны указывать primary_key=True, если не хотите переопределить первичный ключ по умолчанию.

            unique=False,  # При True значение поля должно быть уникальным. Этот параметр учитывается при сохранении в
            # базу данных и при проверке данных в модели.

            # unique_for_date,  # Этот параметр должен быть равен названию DateField или DateTimeField поля,
            # для которого значение должно быть уникальным. Например, если модель имеет поле title с
            # unique_for_date="pub_date", тогда Django позволит сохранять записи только с уникальной комбинацией
            # title и pub_date.

            verbose_name='Название',
            # Отображаемое имя поля. Если параметр не указан, Django самостоятельно создаст его
            # используя имя атрибута поля, заменяя подчеркивание на пробелы.

            validators=[MinLengthValidator(8), MaxLengthValidator(12), ],  # Список проверок(«валидаторов») выполняемых
            # для этого поля.

            max_length=50,
        )

        # A field to store raw binary data
        binary_field = models.BinaryField(
            max_length=None
        )

        # Поле хранящее значение true/false
        boolean_field = models.BooleanField()

        char_field = models.CharField(
            max_length=None,
            # The maximum length (in characters) of the field. The max_length is enforced at the database
            # level and in Django’s validation using MaxLengthValidator.
            validators=[MinLengthValidator(8), MaxLengthValidator(12), ]
        )

        # Дата, представленная в виде объекта datetime.date Python. Принимает несколько дополнительных параметров:
        date_field = models.DateField(
            auto_now=False,
            # Значение поля будет автоматически установлено в текущую дату при каждом сохранении объекта.
            # Полезно для хранения времени последнего изменения. Заметим, что текущее время будет использовано всегда;
            # это не просто значение по умолчанию, которое вы можете переопределить.

            auto_now_add=False,  # Значение поля будет автоматически установлено в текущую дату при создании(первом
            # сохранении) объекта. Полезно для хранения времени создания. Заметим, что текущее время будет использовано
            # всегда; это не просто значение по-умолчанию, которое вы можете переопределить. По этому, даже если вы
            # укажите значение для этого поля, оно будет проигнорировано. Если вы хотите изменять значения этого поля,
            # используйте следующее вместо auto_now_add=True:

            auto_created=False,  # Значение поля будет автоматически установлено в текущую дату
        )

        # Дата и время, представленные объектом datetime.datetime Python. Принимает аналогичные параметры что и
        # DateField.
        DateTimeField = models.DateTimeField(
            auto_now=False,
            # Значение поля будет автоматически установлено в текущую дату при каждом сохранении объекта.
            # Полезно для хранения времени последнего изменения. Заметим, что текущее время будет использовано всегда;
            # это не просто значение по умолчанию, которое вы можете переопределить.

            auto_now_add=False,  # Значение поля будет автоматически установлено в текущую дату при создании(первом
            # сохранении) объекта. Полезно для хранения времени создания. Заметим, что текущее время будет использовано
            # всегда; это не просто значение по-умолчанию, которое вы можете переопределить. По этому, даже если вы
            # укажите значение для этого поля, оно будет проигнорировано. Если вы хотите изменять значения этого поля,
            # используйте следующее вместо auto_now_add=True:

            auto_created=False,  # Значение поля будет автоматически установлено в текущую дату и время
        )

        # A fixed-precision decimal number, represented in Python by a Decimal instance. It validates the input using
        # DecimalValidator.
        DecimalField = models.DecimalField(
            max_digits=None,
            # Максимальное количество цифр в числе. Заметим, что это число должно быть больше или равно
            # decimal_places.

            decimal_places=None,  # Количество знаков после запятой.

            # validators=None,  # DecimalValidator
        )

        # Поля для хранения периодов времени - используется объект Python timedelta. Для PostgreSQL используется тип
        # interval, а в Oracle – INTERVAL DAY(9) TO SECOND(6). Иначе используется bigint, в котором хранится количество
        # микросекунд.
        duration_field = models.DurationField()

        # A CharField that checks that the value is a valid email address using EmailValidator.
        email_field = models.EmailField(
            max_length=254,
        )

        # Поле для загрузки файла.
        file_field = models.FileField(
            upload_to='uploads/%Y/%m/%d/',
            # Этот атрибут позволяет указать каталог и название файла при его сохранении.
            # Его можно использовать двумя способами.
            # file will be uploaded to MEDIA_ROOT/uploads
            # upload = models.FileField(upload_to='uploads/')
            # file will be saved to MEDIA_ROOT/uploads/2015/01/30
            # upload = models.FileField(upload_to='uploads/%Y/%m/%d/')

            max_length=100,
        )

        # Число с плавающей точкой представленное объектом float.
        float_field = models.FloatField()

        # Наследует все атрибуты и методы поля FileField, но также проверяет является ли загруженный файл изображением.
        image_field = models.ImageField(
            height_field=1920,  # Имя поля, которому автоматически будет присвоено значение высоты изображения при
            # каждом сохранении объекта

            width_field=1080  # Имя поля, которому автоматически будет присвоено значение ширины изображения при каждом
            # сохранении объекта.
        )

        # An integer. Values from -2147483648 to 2147483647 are safe in all databases supported by Django.
        integer_field = models.IntegerField()

        # Адрес IPv4 или IPv6 в виде строки (например, 192.0.2.30 или 2a02:42fe::4). Форма использует виджет TextInput.
        ipaddress_field = models.GenericIPAddressField(
            protocol='both',  # Определяет формат IP адреса. Принимает значение 'both' (по умолчанию), 'IPv4' или
            # 'IPv6'. Значение не чувствительно регистру.

            unpack_ipv4=False,  # Преобразует адрес IPv4. Если эта опция установлена, адрес ::ffff::192.0.2.1 будет
            # преобразован в 192.0.2.1. По-умолчанию отключена. Может быть использовано, если protocol установлен в
            # 'both'.
        )

        # Как и поле IntegerField, но значение должно быть больше или равно нулю (0). Можно использовать значение от
        # 0 до 2147483647. Значение 0 принимается для обратной совместимости.
        positiveinteger_field = models.PositiveIntegerField()

        # «Slug» – это короткое название-метка, которое содержит только буквы, числа, подчеркивание или дефис. В
        # основном используются в URL.
        slug_field = models.SlugField(
            max_length=50,  #
        )

        # Большое текстовое поле. Форма использует виджет Textarea.
        text_field = models.TextField()

        # Время, представленное объектом datetime.time Python. Принимает те же аргументы, что и DateField.
        time_field = models.TimeField(
            auto_now=False,  #
            auto_now_add=False,  #
        )

        # A CharField for a URL, validated by URLValidator.
        url_field = models.URLField(
            max_length=200,
        )

        # Django предоставляет набор полей для определения связей между моделями.
        foreignkey = models.ForeignKey(
            to=User,  # Link model
            on_delete=models.CASCADE,  # Каскадное удаление. Django эмулирует поведение SQL правила ON DELETE CASCADE и
            # так же удаляет объекты, связанные через ForeignKey.

            # on_delete=models.PROTECT,  # Препятствует удалению связанного объекта вызывая исключение

            # on_delete=models.SET_NULL,  # Устанавливает ForeignKey в NULL; возможно только если null равен True.

            # on_delete=models.SET_DEFAULT,  # Устанавливает ForeignKey в значение по умолчанию; значение по-умолчанию
            # должно быть указано для ForeignKey.

            # on_delete=models.SET(None),  # Устанавливает ForeignKey в значение указанное в SET(). Если указан
            # выполняемый объект, результат его выполнения.

            # on_delete=models.DO_NOTHING,  # Ничего не делать. Если используемый тип базы данных следит за
            # целостностью связей, будет вызвано исключение IntegrityError, за исключением, когда вы самостоятельно
            # добавите SQL правило ON DELETE для поля таблицы.

            limit_choices_to=None,  # Ограничивает доступные значения для поля при создании ModelForm или в админке (по
            # умолчанию можно выбрать любой объект связанной модели). Можно передать словарь, объект Q или функцию,
            # которая возвращает словарь или объект Q.
        )

    class Meta:
        app_label = 'auth'
        ordering = ('-id',)
        verbose_name = 'Шаблон'
        verbose_name_plural = 'Шаблоны'
        db_table = 'example_table'

    def __str__(self):
        return str(self.id)

    def get_id(self):
        return self.id


class Profile(models.Model):
    """
    Account Profile Model
    """
    # Link field
    user = models.OneToOneField(User, verbose_name='Пользователь', on_delete=models.CASCADE, blank=True)

    # First data account
    user_iin = models.IntegerField(verbose_name='ИИН пользователя', null=True, blank=True)
    password = models.SlugField(verbose_name='Пароль', null=True, blank=True)
    first_name = models.TextField(verbose_name='Имя', null=True, blank=True)
    last_name = models.TextField(verbose_name='Фамилия', null=True, blank=True)
    patronymic = models.TextField(verbose_name='Отчество', null=True, blank=True)
    personnel_number = models.TextField(verbose_name='Табельный номер', null=True, blank=True)
    subdivision = models.TextField(verbose_name='Подразделение', null=True, blank=True)
    workshop_service = models.TextField(verbose_name='Цех/Служба', null=True, blank=True)
    department_site = models.TextField(verbose_name='Отдел/Участок', null=True, blank=True)
    position = models.TextField(verbose_name='Должность', null=True, blank=True)
    category = models.TextField(verbose_name='Категория', null=True, blank=True)

    # Second data account
    education = models.TextField(verbose_name='Образование', null=True, blank=True)
    achievements = models.TextField(verbose_name='Достижения', null=True, blank=True)
    biography = models.TextField(verbose_name='Биография', null=True, blank=True)
    hobbies = models.TextField(verbose_name='Увлечения', null=True, blank=True)
    image_avatar = models.ImageField(verbose_name='Аватарка', upload_to='uploads/account/avatar',
                                     default='uploads/account/avatar/default.jpg', null=True, blank=True)

    # Third data account
    email = models.EmailField(verbose_name='Электронная почта', null=True, blank=True)
    date_registered = models.DateTimeField(verbose_name='дата регистрации', auto_now_add=True, null=True, blank=True)
    secret_question = models.TextField(verbose_name='Секретный вопрос', max_length=50, null=True, blank=True)
    secret_answer = models.TextField(verbose_name='Секретный ответ', max_length=50, null=True, blank=True)
    group = models.SlugField(verbose_name='группы', null=True, blank=True)
    status = models.BooleanField(verbose_name='статус', default=True, null=True, blank=True)

    class Meta:
        app_label = 'auth'
        ordering = ('last_name',)
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'
        db_table = 'profile_table'

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.patronymic}: {self.user}'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class LoggingActions(models.Model):
    """
    Logging Actions Model
    """

    username = models.SlugField(verbose_name='Имя пользователя', max_length=12, null=True)
    ip = models.SlugField(verbose_name='Ip адрес клиента', max_length=50, null=True)
    request_path = models.SlugField(verbose_name='Действие', max_length=30, null=True)
    request_method = models.SlugField(verbose_name='Метод', max_length=5, null=True)
    datetime_now = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        app_label = 'auth'
        ordering = ('-datetime_now',)
        verbose_name = 'Лог'
        verbose_name_plural = 'Логи'
        db_table = 'logging_actions_table'

    def __str__(self):
        return f'{self.datetime_now} {self.username} {self.request_path}'


class LoggingErrors(models.Model):
    """
    Logging Errors Model
    """

    username = models.SlugField(verbose_name='Имя пользователя', max_length=12, null=True)
    ip = models.SlugField(verbose_name='Ip адрес клиента', max_length=10, null=True)
    request_path = models.SlugField(verbose_name='Действие', max_length=30, null=True)
    request_method = models.SlugField(verbose_name='Метод', max_length=5, null=True)
    error = models.TextField(verbose_name='Ошибка', null=True)
    datetime_now = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        app_label = 'auth'
        ordering = ('-datetime_now',)
        verbose_name = 'Ошибка'
        verbose_name_plural = 'Ошибки'
        db_table = 'logging_errors_table'

    def __str__(self):
        return f'{self.datetime_now} {self.username} {self.request_path}'


# # Account
# class AccountDataModel(models.Model):
#     """
#     Account Data Model
#     """
#     # Foreign key
#     username = models.ForeignKey(User, on_delete=models.CASCADE, null=True, editable=True, default=None,
#                                  verbose_name='Имя пользователя', blank=True)
#
#     # First data account
#     user_iin = models.IntegerField('ИИН пользователя', unique=True, blank=True)
#     password = models.SlugField(max_length=64, verbose_name='пароль', blank=True)
#     firstname = models.TextField('Имя', blank=True)
#     lastname = models.TextField('Фамилия', blank=True)
#     patronymic = models.TextField('Отчество', blank=True)
#     personnel_number = models.TextField('Табельный номер', blank=True)
#     subdivision = models.TextField('Подразделение', blank=True)
#     workshop_service = models.TextField('Цех/Служба', blank=True)
#     department_site = models.TextField('Отдел/Участок', blank=True)
#     position = models.TextField('Должность', blank=True)
#     category = models.TextField('Категория', blank=True)
#
#     # Second data account
#     education = models.TextField('Образование', blank=True)
#     achievements = models.TextField('Достижения', blank=True)
#     biography = models.TextField('Биография', blank=True)
#     hobbies = models.TextField('Увлечения', blank=True)
#     image_avatar = models.ImageField('Аватарка', upload_to='uploads/account/avatar',
#                                      default='uploads/account/avatar/default.jpg', blank=True)
#
#     # Вспомогательное
#     mail = models.EmailField('Электронная почта', blank=True)
#     date_registered = models.DateTimeField('дата регистрации', auto_now_add=True, blank=True)
#     secret_question = models.TextField('Секретный вопрос', blank=True)
#     group = models.SlugField(max_length=64, verbose_name='группы', blank=True)
#     status = models.BooleanField('статус', default=True, blank=True)
#
#     class Meta:
#         ordering = ('-id',)
#         verbose_name = 'Пользователь'
#         verbose_name_plural = 'Пользователи'
#         db_table = 'account_data_table'
#
#     def __str__(self):
#         return f'{self.firstname} {self.lastname} {self.patronymic}: {self.username}'


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


# Upgrade
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
