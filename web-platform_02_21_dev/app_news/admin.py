from django.contrib import admin
from .models import Article, Comment
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
# Register your models here.


class ArticleAdminForm(forms.ModelForm):
    """Форма с виджетом ckeditor"""
    article_text = forms.CharField(label="текст статьи", widget=CKEditorUploadingWidget())

    class Meta:
        model = Article
        fields = '__all__'

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Новости"""
    form = ArticleAdminForm


# admin.site.register(Article)
admin.site.register(Comment)
