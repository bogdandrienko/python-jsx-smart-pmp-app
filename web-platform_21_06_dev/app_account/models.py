from django.db import models


class AccountTemplateModel(models.Model):
    template_name               = models.CharField(max_length=50, unique=True, verbose_name='название')
    template_slug               = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    template_description        = models.TextField('описание', blank=True)
    template_addition_file_1    = models.FileField('приложение 1', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)
    template_addition_file_2    = models.FileField('приложение 2', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Шаблон'
        verbose_name_plural = 'Шаблоны'
        db_table            = 'accounttemplatetable'

    def __str__(self):
        return f'{self.template_name}'
