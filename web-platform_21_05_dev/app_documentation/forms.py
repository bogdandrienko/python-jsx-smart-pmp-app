from django import forms
from .models import DocumentModel
# from django.contrib.auth.models import User


class DocumentCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    document_name                   = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_name', 'placeholder':'имя', 'class':'form-control', 'required':''}), required=False)
    document_slug                   = forms.SlugField(label='', widget=forms.TextInput(attrs={'type':"text", 'name':'message_slug', 'placeholder':'ссылка', 'class':'form-control', 'required':''}), required=False)
    document_description            = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_description', 'placeholder':'описание', 'class':'form-control', 'required':''}), required=False)
    document_addition_file_1        = forms.FileField(label="приложение 1", widget=forms.ClearableFileInput(attrs={'type':"file", 'name':'message_addition_file_1', 'class':'form-control'}), required=False, allow_empty_file=True)
    document_addition_file_2        = forms.FileField(label="приложение 2", widget=forms.ClearableFileInput(attrs={'type':"file", 'name':'message_addition_file_2', 'class':'form-control'}), required=False, allow_empty_file=True)


    class Meta:
        model = DocumentModel
        fields = '__all__'

    def __str__(self):
        return f'{self.document_name}'

    # def __init__(self, data, **kwargs):
    #     pass
