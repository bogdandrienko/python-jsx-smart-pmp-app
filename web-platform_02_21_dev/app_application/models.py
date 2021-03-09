from django.db import models


class ApplicationModel(models.Model):
    application_position        = models.IntegerField('позиция в списке приложений', unique=True)
    application_name            = models.CharField('название приложения', max_length=50, unique=True)
    application_slug            = models.SlugField('ссылка на приложение', max_length=50, unique=True)
    application_description     = models.TextField('описание в заголовке меню', blank=True)
    application_image           = models.ImageField('картинка в заголовке меню', upload_to='uploads/application/icons', blank=True)

    class Meta:
        ordering                = ('-id', )
        verbose_name            = 'Приложение'
        verbose_name_plural     = 'Приложения'
        db_table                = 'applicationtable'

    def __str__(self):
        return f'{self.application_name}'
