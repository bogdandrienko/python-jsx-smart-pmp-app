from os import name
from django import forms
from .models import RationalModel
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class RationalCreateForm(forms.Form):
    """Форма с виджетом ckeditor"""
    # rational_name = forms.CharField(label="название статьи")
    rational_description = forms.CharField(label="описание", widget=CKEditorUploadingWidget(), empty_value=True)

    class Meta:
        model = RationalModel
        fields = '__all__'
