from django.db import models
from ckeditor.fields import RichTextField
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
    rational_category           = models.ForeignKey(CategoryRationalModel, on_delete=models.CASCADE)
    rational_structure_from     = models.CharField('имя подразделения', max_length=50, blank=True)
    rational_id_registrated     = models.PositiveSmallIntegerField('номер регистрации', blank=True, default=0)
    rational_date_registrated   = models.DateTimeField('дата регистрации', auto_now_add=True, blank=True)
    rational_name               = models.CharField('название статьи', max_length=100, blank=False)
    rational_place_innovation   = models.CharField('место внедрения', max_length=200, blank=True)
    rational_description        = RichTextField('описание', blank=True)

    rational_addition_file_1    = models.FileField('приложение к предложению', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_addition_file_2    = models.FileField('приложение 2 к предложению', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)
    rational_addition_image     = models.ImageField('картинка к предложению', upload_to='uploads/rational/%d_%m_%Y/%H_%M_%S', blank=True)


    class Meta:
        ordering                = ('-id',)
        verbose_name            = 'Рационализаторское предложение'
        verbose_name_plural     = 'Рационализаторские предложения'

    def __str__(self):
        return self.rational_name
