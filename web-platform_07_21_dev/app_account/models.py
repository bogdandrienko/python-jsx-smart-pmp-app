from django.db import models
from django.contrib.auth.models import User


class AccountTemplateModel(models.Model):
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
        db_table = 'accounttemplatetable'

    def __str__(self):
        return f'{self.template_name}'


class AccountDataModel(models.Model):
    # Связанное поле
    username = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, editable=True, default=None,
                                 verbose_name='Имя пользователя', blank=True)

    # Основное
    user_iin = models.IntegerField('ИИН пользователя', unique=True, blank=True)
    password = models.SlugField(max_length=64, verbose_name='пароль', blank=True)
    firstname = models.TextField('Имя', blank=True)
    lastname = models.TextField('Фамилия', blank=True)
    patronymic = models.TextField('Отчество', blank=True)
    position = models.TextField('Должность', blank=True)

    # Вторичное
    achievements = models.TextField('Достижения', blank=True)
    biography = models.TextField('Биография', blank=True)
    hobbies = models.TextField('Увлечения', blank=True)
    image_avatar = models.ImageField('Аватарка', upload_to='uploads/account/avatar',
                                     default='uploads/account/avatar/default.jpg', blank=True)

    # Вспомогательное
    mail = models.EmailField('Электронная почта', blank=True)
    date_registered = models.DateTimeField('дата регистрации', auto_now_add=True, blank=True)
    secret_question = models.TextField('Секретный вопрос', blank=True)
    group = models.SlugField(max_length=64, verbose_name='группы', blank=True)
    status = models.BooleanField('статус', default=True, blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Данные аккаунта'
        verbose_name_plural = 'Данные аккаунтов'
        db_table = 'accountdatatable'

    def __str__(self):
        return f'{self.firstname} {self.lastname} {self.patronymic}: {self.username}'
