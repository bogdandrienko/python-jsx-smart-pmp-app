from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


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
