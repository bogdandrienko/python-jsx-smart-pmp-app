from django import forms
from .models import SmsModel
from django.db import models
from django.contrib.auth.models import User


class SmsCreateForm(forms.Form):
    sms_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='автор сообщения')
    sms_description = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={'type': "text", 'name': 'sms_description', 'placeholder': 'текст сообщения',
                                      'class': 'form-control'}), required=False
    )
    sms_date = models.DateTimeField('дата отправки', auto_now_add=True)

    class Meta:
        model = SmsModel
        fields = '__all__'

    def __str__(self):
        return f'{self.document_name}'
