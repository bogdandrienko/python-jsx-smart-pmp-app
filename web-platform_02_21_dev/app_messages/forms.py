from django import forms
from .models import MessageModel
# from django.contrib.auth.models import User


class MessageCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    message_name                   = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_name', 'placeholder':'message_name', 'class':'form-control'}), required=False)
    message_slug                   = forms.SlugField(label='', widget=forms.EmailInput(attrs={'type':'email', 'name':'message_slug', 'placeholder':'message_slug', 'class':'form-control'}), required=False)
    message_description            = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_description', 'placeholder':'message_description', 'class':'form-control', 'required':''}), required=True)
    message_addition_file_1        = forms.FileField(label="приложение 1", widget=forms.ClearableFileInput(attrs={'type':"file", 'name':'message_addition_file_1', 'class':'form-control'}), required=False, allow_empty_file=True)
    message_addition_file_2        = forms.FileField(label="приложение 2", widget=forms.ClearableFileInput(attrs={'type':"file", 'name':'message_addition_file_2', 'class':'form-control'}), required=False, allow_empty_file=True)
    

    class Meta:
        model = MessageModel
        fields = '__all__'

    # def __init__(self, data, **kwargs):
    #     pass
