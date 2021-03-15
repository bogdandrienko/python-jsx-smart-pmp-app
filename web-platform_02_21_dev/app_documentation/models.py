from django.db import models


class DocumentModel(models.Model):
    document_name               = models.CharField(max_length=50, unique=True, verbose_name='название')
    document_slug               = models.SlugField(max_length=50, unique=True, verbose_name='ссылка')
    document_description        = models.TextField('описание', blank=True)
    document_addition_file_1    = models.FileField('приложение 1', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)
    document_addition_file_2    = models.FileField('приложение 2', upload_to='uploads/documents/%d_%m_%Y/%H_%M_%S', blank=True, null=True)


    class Meta:
        ordering            = ('-id', )
        verbose_name        = 'Документ'
        verbose_name_plural = 'Документы'
        db_table            = 'documenttable'

    def __str__(self):
        return f'{self.document_name}'
