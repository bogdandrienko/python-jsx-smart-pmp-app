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
