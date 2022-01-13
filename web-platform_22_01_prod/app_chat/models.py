from django.db import models
from django.contrib.auth.models import User


class SmsModel(models.Model):
    sms_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор сообщения')
    sms_description = models.TextField('текст сообщения', blank=True)
    sms_date = models.DateTimeField('дата отправки', auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        db_table = 'smstable'

    def __str__(self):
        return f'{self.sms_author} : {self.sms_date}'
