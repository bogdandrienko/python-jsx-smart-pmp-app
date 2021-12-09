from django import forms
from .models import ContactModel
# from django.contrib.auth.models import User


class ContactCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    contact_name            = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_name', 'placeholder':'имя', 'class':'form-control', 'required':''}), required=False)
    contact_slug            = forms.SlugField(label='', widget=forms.TextInput(attrs={'type':"text", 'name':'message_slug', 'placeholder':'ссылка', 'class':'form-control', 'required':''}), required=False)
    contact_description     = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'message_description', 'placeholder':'описание', 'class':'form-control', 'required':''}), required=False)
    contact_image           = forms.ImageField(label="картинка к контакту", widget=forms.ClearableFileInput(attrs={'type':"file",'name':'rational_addition_image', 'class':'form-control'}), required=False)


    class Meta:
        model = ContactModel
        fields = '__all__'

    def __str__(self):
        return f'{self.document_name}'

    # def __init__(self, data, **kwargs):
    #     pass
