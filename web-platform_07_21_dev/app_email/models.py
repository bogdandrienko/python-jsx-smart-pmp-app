from django.db import models


class EmailModel(models.Model):
    Email_subject          = models.CharField(max_length=100, verbose_name='тема')
    Email_message          = models.CharField(max_length=100, verbose_name='тема')
    Email_email            = models.CharField(max_length=100, verbose_name='тема')
    Email_date             = models.DateTimeField('дата создания', auto_now_add=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Письмо'
        verbose_name_plural = 'Письма'

    def __str__(self):
        return f'{self.Email_email} :: {self.Email_message}'
