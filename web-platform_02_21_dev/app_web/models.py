from django.db import models

# Create your models here.


class Project_managment(models.Model):
    name = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()

    class Meta:
        ordering = ('name',)
        verbose_name = 'project'
        verbose_name_plural = 'projects'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250, unique=True)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Project_managment, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product/', blank=True)
    stock = models.IntegerField()
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.name


class Article(models.Model):
    article_title = models.CharField('название статьи', max_length=200)
    article_text = models.TextField('текст статьи', blank=True)
    article_pub_date = models.DateTimeField(editable=True, auto_created=True)
    article_image = models.ImageField('картинка статьи', upload_to='news/', blank=True)

    
    article_rating_positive = models.IntegerField('лайки статьи', default=0, blank=False)
    article_rating_negative = models.IntegerField('дизлайки статьи', default=0, blank=False)
    article_rating_value = models.IntegerField('рейтинг статьи', default=0, blank=False)



    class Meta:
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
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return self.author_name


class RatingArticle(models.Model):
    rating_article = models.ForeignKey(Article, on_delete = models.CASCADE)
    rating_name = models.CharField('имя рейтинга', max_length=50)
    rating_value = models.IntegerField('рейтинг')

    class Meta:
        verbose_name = 'Рейтинги'
        verbose_name_plural = 'Рейтинг'

    def __str__(self):
        return self.rating_name

    def get_value(self):
        return self.rating_value

    def increase(self):
        pass

    def decrease(self):
        pass
    