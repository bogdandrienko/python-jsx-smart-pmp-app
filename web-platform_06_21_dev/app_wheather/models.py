from django.db import models


class City(models.Model):
    name = models.CharField('город', max_length=30, unique=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

    def __str__(self):
        return self.name

