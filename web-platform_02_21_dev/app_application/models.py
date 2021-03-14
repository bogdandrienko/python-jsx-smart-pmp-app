from django.db import models


class ApplicationModel(models.Model):
    application_position        = models.IntegerField('позиция в списке приложений', unique=True)
    application_name            = models.CharField('название приложения', max_length=50, unique=True)
    application_slug            = models.CharField('ссылка на приложение', max_length=50, unique=True)
    application_description     = models.TextField('описание в заголовке меню', blank=True)
    application_image           = models.ImageField('картинка в заголовке меню', upload_to='uploads/application/icons', blank=True)


    class Meta:
        ordering                = ('-id', )
        verbose_name            = 'Приложение'
        verbose_name_plural     = 'Приложения'
        db_table                = 'applicationtable'

    def __str__(self):
        return f'{self.application_name}'


class ShortcutApplicationModel(models.Model):
    shortcut_application_position       = models.IntegerField('позиция в списке закладок', unique=True)
    shortcut_application_article        = models.ForeignKey(ApplicationModel, on_delete = models.CASCADE, verbose_name='приложение')
    shortcut_application_name           = models.TextField('название закладки')
    shortcut_application_description    = models.TextField('описание закладки')
    shortcut_application_slug           = models.CharField('ссылка закладки', max_length=50, unique=True)
    shortcut_application_image          = models.ImageField('картинка закладки', upload_to='uploads/application/icons/shortcut', blank=True)


    class Meta:
        ordering                        = ('-id',)
        verbose_name                    = 'Закладка'
        verbose_name_plural             = 'Закладки'
        db_table                        = 'shortcutapplicationtable'

    def __str__(self):
        return f'{self.shortcut_application_article} :: {self.shortcut_application_name}'
