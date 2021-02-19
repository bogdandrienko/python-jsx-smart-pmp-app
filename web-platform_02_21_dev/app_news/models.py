from django.db import models
# Create your models here.

class Article(models.Model):
    article_title = models.CharField('название статьи', max_length=200)
    article_text = models.TextField('текст статьи', blank=True)
    article_pub_date = models.DateTimeField(auto_now_add=True)
    article_image = models.ImageField('картинка статьи', upload_to='news/', blank=True)
    article_rating_positive = models.IntegerField('лайки статьи', default=0, blank=False)
    article_rating_negative = models.IntegerField('дизлайки статьи', default=0, blank=False)
    article_rating_value = models.IntegerField('рейтинг статьи', default=0, blank=False)


    class Meta:
        ordering = ('-id',)
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'


    def __str__(self):
        return self.article_title
    

    def short_text(self):
        return self.article_text[:100]


    def get_article_rating_value(self):
        return self.article_rating_positive - self.article_rating_negative


    def increase(self):
        self.article_rating_positive = self.article_rating_positive + 1


    def decrease(self):
        self.article_rating_negative = self.article_rating_negative + 1


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    author_name = models.CharField('имя автора', max_length=50)
    comment_text = models.TextField('текст комментария', blank=True)


    class Meta:
        ordering = ('-id',)
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'


    def __str__(self):
        return self.author_name
