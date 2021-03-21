from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


class SignUpForm(UserCreationForm):
    first_name 	= forms.CharField(label='Имя', max_length=100, required=False)
    last_name 	= forms.CharField(label='Фамилия', max_length=100, required=False)
    username 	= forms.IntegerField(label='Имя пользователя', required=True, help_text='Внимание, вводите свой	табельный номер!')
    email 		= forms.EmailField(label='Адрес электронной почты', max_length=100, required=False, help_text='вид: bogdandrienko@gmail.com')


    class Meta:
        model 	= User
        fields 	= ('first_name', 'last_name', 'username', 'password1', 'password2', 'email')


class SignUpManyForm(forms.Form):
    """Форма загрузки из эксель файла"""
    document_addition_file_1    = forms.FileField(label="выберите excel-файл (.xlsx/.xls)", widget=forms.ClearableFileInput(attrs={'type':"file", 'name':'message_addition_file_1', 'class':'form-control'}), validators=[FileExtensionValidator(['.xlsx', '.xls'])], required=False, allow_empty_file=True)
