from django.db import models


class ContactModel(models.Model):
    contact_name           = models.CharField(max_length=50, unique=True, verbose_name='название')
    contact_slug           = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    contact_description    = models.TextField('описание', blank=True)
    contact_image          = models.ImageField('картинка', upload_to='uploads/contact', blank=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Контакт'
        verbose_name_plural = 'Контакты'
        db_table            = 'contacttable'

    def __str__(self):
        return f'{self.contact_name}'
