from django.db import models
from django.contrib.auth.models import User


class NotificationModel(models.Model):
    notification_name           = models.CharField('название', max_length=50)
    notification_slug           = models.CharField('ссылка', max_length=50)
    notification_description    = models.TextField('описание')
    notification_date           = models.DateTimeField('дата и время', auto_now_add=True)
    notification_status         = models.BooleanField('статус', default=True)
    notification_author         = models.ForeignKey(User, on_delete = models.SET_NULL, null=True, editable=True, default=None, verbose_name='имя автора')


    class Meta:
        ordering            = ('-notification_status', '-notification_date',)
        verbose_name        = 'Уведомление'
        verbose_name_plural = 'Уведомления'
        db_table            = 'notificationtable'

    def __str__(self):
        return f'{self.notification_name} :: {self.notification_status} :: {self.notification_date}'
