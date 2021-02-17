from django.contrib import admin
from .models import Project_managment, Product, Article, Comment
# Register your models here.

admin.site.register(Project_managment)
admin.site.register(Product)

admin.site.register(Article)
admin.site.register(Comment)
