from django.db import models


class MessageModel(models.Model):
    message_name               = models.CharField(max_length=50, unique=True, verbose_name='название')
    message_slug               = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    message_description        = models.TextField('описание', blank=True)
    message_addition_file_1    = models.FileField('приложение 1', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)
    message_addition_file_2    = models.FileField('приложение 2', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        db_table            = 'messagetable'

    def __str__(self):
        return f'{self.message_name}'
