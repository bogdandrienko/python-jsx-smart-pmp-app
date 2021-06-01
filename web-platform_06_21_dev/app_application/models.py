from django.db import models


class ApplicationModuleModel(models.Model):
    module_position        = models.IntegerField   ('позиция', blank=False)
    module_name            = models.CharField      ('название', max_length=50, unique=True)
    module_slug            = models.CharField      ('ссылка', max_length=50, blank=False)
    module_image           = models.ImageField     ('картинка', upload_to='uploads/application/module', blank=True)
    module_description     = models.CharField      ('описание', max_length=100, blank=True)


    class Meta:
        ordering            = ('module_position', )
        verbose_name        = 'Модуль'
        verbose_name_plural = 'Модули'
        db_table            = 'application_module_table'

    def __str__(self):
        return f'{self.module_name} :: {self.module_position}'


class ApplicationComponentModel(models.Model):
    component_Foreign        = models.ForeignKey     (ApplicationModuleModel, on_delete = models.CASCADE, verbose_name='модуль', blank=False)
    component_position       = models.IntegerField   ('позиция в списке закладок', blank=False)
    component_name           = models.CharField      ('название закладки', max_length=50, unique=True)
    component_slug           = models.CharField      ('ссылка закладки', max_length=50, blank=False)
    component_image          = models.ImageField     ('картинка закладки', upload_to='uploads/application/component', blank=True)
    component_description    = models.CharField      ('описание закладки', max_length=100, blank=True)


    class Meta:
        ordering                        = ('component_Foreign', 'component_position')
        verbose_name                    = 'Компонент'
        verbose_name_plural             = 'Компоненты'
        db_table                        = 'application_component_table'

    def __str__(self):
        return f'{self.component_Foreign} :: {self.component_position} :: {self.component_name} :: {self.component_slug}'
