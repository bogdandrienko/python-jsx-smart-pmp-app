from django.db import models


class MessageModel(models.Model):
    message_name               = models.CharField('название', max_length=50, blank=False)
    message_slug               = models.CharField('кому', max_length=50, blank=False)
    message_description        = models.TextField('текст', blank=True)
   

    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        db_table            = 'messagetable'

    def __str__(self):
        return f'{self.message_name}'
