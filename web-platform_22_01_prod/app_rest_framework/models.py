from django.db import models

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=300, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    done = models.BooleanField(default=False)


    class Meta:
        ordering = ('id',)
        verbose_name = 'Задачи'
        verbose_name_plural = 'Задача'

    def __str__(self):
        return self.title


class Data(models.Model):
    data_title = models.CharField(max_length=150)
    data_description = models.CharField(max_length=300, blank=True)
    data_date = models.DateTimeField(auto_now_add=True)
    data_done = models.BooleanField(default=False)


    class Meta:
        ordering = ('id',)
        verbose_name = 'Информация'
        verbose_name_plural = 'Информация'

    def __str__(self):
        return self.data_title
