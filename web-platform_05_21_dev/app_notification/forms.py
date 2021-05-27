from django import forms
from .models import NotificationModel


class NotificationCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    notification_name           = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'notification_name', 'placeholder':'название', 'class':'form-control', 'required':''}), required=False)
    notification_slug           = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text", 'name':'notification_slug', 'placeholder':'ссылка', 'class':'form-control', 'required':''}), required=False)
    notification_description    = forms.CharField(label='', widget=forms.TextInput(attrs={'type':"text",'name':'notification_description', 'placeholder':'описание', 'class':'form-control', 'required':''}), required=False)
    # notification_date           = forms.DateTimeField(label='', widget=forms.DateTimeInput(attrs={'type':"datetime-local",'name':'notification_date', 'class':'form-control', 'required':''}), required=False)
    # notification_status         = forms.BooleanField(label='', widget=forms.CheckboxInput(attrs={'type':'checkbox','name':'notification_status', 'value':'False', 'class':'form-check form-check-input'}), required=False)
    # notification_author         =

    class Meta:
        model = NotificationModel
        fields = '__all__'
