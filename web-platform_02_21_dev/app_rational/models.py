from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.conf import settings


class CategoryRationalModel(models.Model):
    category_name           = models.CharField(max_length=50, unique=True, verbose_name='название')
    category_slug           = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    category_description    = models.TextField('описание', blank=True)
    category_image          = models.ImageField('картинка', upload_to='uploads/rational/category', blank=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Категория'
        verbose_name_plural = 'Категории'
        db_table            = 'categoryrationaltable'

    def __str__(self):
        return f'{self.category_name}'


class RationalModel(models.Model):
    rational_structure_from         = models.CharField('имя подразделения', max_length=50, blank=True)
    rational_id_registrated         = models.IntegerField('номер регистрации', default=0, blank=True)
    rational_date_registrated       = models.DateTimeField('дата регистрации', editable=True, auto_created=True, default=timezone.now, blank=True)
    rational_name                   = models.CharField('название статьи', max_length=50)
    rational_place_innovation       = models.CharField('место внедрения', max_length=100, blank=True)
    rational_description            = RichTextField('описание', blank=True)
    rational_addition_file_1        = models.FileField('приложение 1', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_addition_file_2        = models.FileField('приложение 2', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_addition_file_3        = models.FileField('приложение 3', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_offering_members       = RichTextField('предложившие участники', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Фамилия, имя, отчество авторов</p></td><td><p>Место работы</p></td><td><p>Должность</p></td><td><p>Доля (%) участия*</p></td><td><p>Год рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_conclusion             = RichTextField('заключения по предложению', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Название Структурного подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_change_documentations  = RichTextField('изменение нормативной и тех. документации', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Наименование документа</p></td><td><p>№ извещения</p></td><td><p>Дата изменения</p></td><td><p>Должность и название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_resolution             = models.CharField('принятое решение', max_length=200, blank=True)
    rational_responsible_members    = RichTextField('ответственные участники', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_date_certification     = models.DateTimeField('дата получения удостоверения на предложение', editable=True, auto_created=True, default=timezone.now, blank=True)

    rational_category               = models.ForeignKey(CategoryRationalModel, on_delete = models.SET_NULL, null=True, editable=True, default=None, verbose_name='Категория', blank=True)
    rational_autor_name             = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.SET_NULL, null=True, editable=True, default=None, verbose_name='имя автора', blank=True)
    rational_date_create            = models.DateTimeField('дата создания',auto_now_add=True, blank=True)
    rational_addition_image         = models.ImageField('картинка к предложению', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_status                 = models.BooleanField('статус', default=True, blank=True)


    class Meta:
        ordering                    = ('-id',)
        verbose_name                = 'Рационализаторское предложение'
        verbose_name_plural         = 'Рационализаторские предложения'
        db_table                    = 'rationaltable'

    def __str__(self):
        return f'{self.rational_name} :: {self.rational_id_registrated} :: {self.rational_category} :: {self.rational_autor_name}' 
        
    def get_total_comment_value(self):
        return CommentRationalModel.objects.filter(comment_article=self.id).count()
    
    def get_like_count(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=True).count()

    def get_dislike_count(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=False).count()
    
    def get_total_rating_value(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=True).count() + LikeRationalModel.objects.filter(like_article=self, like_status=False).count()

    def get_total_rating(self):
        return LikeRationalModel.objects.filter(like_article=self, like_status=True).count() - LikeRationalModel.objects.filter(like_article=self, like_status=False).count()


class CommentRationalModel(models.Model):
    comment_article         = models.ForeignKey(RationalModel, on_delete = models.CASCADE, verbose_name='предложение')
    comment_author          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.SET_NULL, null=True, verbose_name='автор')
    comment_text            = models.TextField('текст')
    comment_date            = models.DateTimeField('дата создания', auto_now_add=True)


    class Meta:
        ordering            = ('-id',)
        verbose_name        = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        db_table            = 'commentrationaltable'

    def __str__(self):
        return f'{self.comment_author} :: {self.comment_article} :: {self.comment_date}'


class LikeRationalModel(models.Model):
    like_article            = models.ForeignKey(RationalModel, on_delete = models.CASCADE, verbose_name='предложение')
    like_author             = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.SET_NULL, null=True, verbose_name='автор')
    like_status             = models.BooleanField('лайк/дизлайк', default=False)
    like_date               = models.DateTimeField('дата создания', auto_now_add=True)


    class Meta:
        ordering            = ('-id',)
        verbose_name        = 'Лайк'
        verbose_name_plural = 'Лайки'
        db_table            = 'likerationaltable'

    def __str__(self):
        return f'{self.like_author} :: {self.like_article} :: {self.like_status} :: {self.like_date}'
