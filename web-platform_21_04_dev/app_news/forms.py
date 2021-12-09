from django import forms
from .models import Article
from ckeditor.widgets import CKEditorWidget

from ckeditor_uploader.widgets import CKEditorUploadingWidget


class ArticleEditForm(forms.Form):
    """Форма с виджетом ckeditor"""
    article_text = forms.CharField(label="текст статьи", widget=CKEditorUploadingWidget())

    class Meta:
        model = Article
        fields = '__all__'
