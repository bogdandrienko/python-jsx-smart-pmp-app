from django.db import models

# Create your models here.


class TaskModel(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'task'
        verbose_name_plural = 'tasks'

    def __str__(self):
        return self.name