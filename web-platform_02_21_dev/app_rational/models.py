from django.db import models
from ckeditor.fields import RichTextField
from django.utils import timezone
from django.conf import settings
# Create your models here.


class CategoryRationalModel(models.Model):
    name            = models.CharField(max_length=50, unique=True, blank=False)
    slug            = models.SlugField(max_length=50, unique=True, blank=False)
    description     = models.TextField(blank=True)
    image           = models.ImageField(upload_to='uploads/rational/category', blank=True)


    class Meta:
        ordering                = ('-id', )
        verbose_name            = 'Категория'
        verbose_name_plural     = 'Категории'

    def __str__(self):
        return self.name


class RationalModel(models.Model):
    rational_structure_from         = models.CharField('1. имя подразделения', max_length=50, blank=True)
    rational_id_registrated         = models.IntegerField('2. номер регистрации', default=0, blank=True)
    rational_date_registrated       = models.DateTimeField('3. дата регистрации', editable=True, auto_created=True, default=timezone.now, blank=True)
    rational_name                   = models.CharField('4. название статьи', max_length=100, blank=False)
    rational_place_innovation       = models.CharField('5. место внедрения', max_length=200, blank=True)
    rational_description            = RichTextField('6. описание', default='', blank=True)
    rational_addition_file_1        = models.FileField('7. приложение 1', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_addition_file_2        = models.FileField('8. приложение 2', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_offering_members       = RichTextField('9. предложившие участники', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Фамилия, имя, отчество авторов</p></td><td><p>Место работы</p></td><td><p>Должность</p></td><td><p>Доля (%) участия*</p></td><td><p>Год рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_conclusion             = RichTextField('10. заключения по предложению', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Название Структурного подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_change_documentations  = RichTextField('11. изменение нормативной и тех. документации', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Наименование документа</p></td><td><p>№ извещения</p></td><td><p>Дата изменения</p></td><td><p>Должность и название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_resolution             = models.CharField('12. принятое решение', max_length=100, blank=True)
    rational_responsible_members    = RichTextField('13. ответственные участники', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    rational_date_certification     = models.DateTimeField('14. дата получения удостоверения на предложение', editable=True, auto_created=True, default=timezone.now, blank=True)

    rational_category               = models.ForeignKey(CategoryRationalModel, on_delete=models.CASCADE, verbose_name='15. Категория')
    rational_autor_name             = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.SET_NULL, verbose_name='16. имя автора', null=True, editable=True, default=None, blank=True)
    rational_date_create            = models.DateTimeField('17. дата создания', editable=True, auto_created=True, default=timezone.now, blank=True)
    rational_addition_image         = models.ImageField('18. картинка к предложению', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_status                 = models.BooleanField('19. статус', default=True, blank=True)


    class Meta:
        ordering                = ('-id',)
        verbose_name            = 'Рационализаторское предложение'
        verbose_name_plural     = 'Рационализаторские предложения'

    def __str__(self):
        return f'{self.rational_name} :: {self.rational_id_registrated} :: {self.rational_category} :: {self.rational_autor_name}' 
        
    def get_total_comment_value(self):
        return CommentRationalModel.objects.filter(article=self.id).count()
    
    def get_like_count(self):
        return LikeRationalModel.objects.filter(blog_post=self, like=True).count()

    def get_dislike_count(self):
        return LikeRationalModel.objects.filter(blog_post=self, like=False).count()
    
    def get_total_rating_value(self):
        return LikeRationalModel.objects.filter(blog_post=self, like=True).count() + LikeRationalModel.objects.filter(blog_post=self, like=False).count()

    def get_total_rating(self):
        return LikeRationalModel.objects.filter(blog_post=self, like=True).count() - LikeRationalModel.objects.filter(blog_post=self, like=False).count()


class CommentRationalModel(models.Model):
    article = models.ForeignKey(RationalModel, on_delete = models.CASCADE)
    author_name = models.CharField('имя автора', max_length=50)
    comment_text = models.TextField('текст комментария', blank=True)


    class Meta:
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return self.author_name


class LikeRationalModel(models.Model):
    blog_post = models.ForeignKey(RationalModel, on_delete = models.CASCADE, null=True, verbose_name='к какому предложению')
    liked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null=True, verbose_name='кто поставил лайк')
    like = models.BooleanField('Лайк', default=False)
    created = models.DateTimeField('дата создания', auto_now_add=True)


    class Meta:
        ordering = ('-id',)
        verbose_name = 'Лайки'
        verbose_name_plural = 'Лайк'

    def __str__(self):
        return f'{self.liked_by}: {self.blog_post} |{self.like}'
