from django import forms
from .models import MessageModel
# from django.contrib.auth.models import User


class MessageCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    message_name                   = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_name', 'placeholder':'название', 'class':'form-control', 'required':''}), required=False)
    message_slug                   = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text", 'name':'message_slug', 'placeholder':'кому', 'class':'form-control', 'required':''}), required=False)
    message_description            = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_description', 'placeholder':'ссылка', 'class':'form-control', 'required':''}), required=False)


    class Meta:
        model = MessageModel
        fields = '__all__'

    # def __init__(self, data, **kwargs):
    #     pass
