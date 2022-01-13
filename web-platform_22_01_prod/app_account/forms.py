from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator, MinLengthValidator, \
    MaxLengthValidator


class CreateUserForm(UserCreationForm):
    username = forms.IntegerField(label='Имя пользователя', required=True,
                                  help_text='Внимание, вводите свой	табельный номер!')
    first_name = forms.CharField(label='Имя', max_length=100, required=False)
    last_name = forms.CharField(label='Фамилия', max_length=100, required=False)
    email = forms.EmailField(label='Адрес электронной почты', max_length=100, required=False,
                             help_text='вид: bogdandrienko@gmail.com')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password1', 'password2', 'email')


class ChangeUserForm(UserCreationForm):
    first_name = forms.CharField(label='Имя', max_length=100, required=False,
                                 widget=forms.TextInput(
                                                   attrs={'name': 'username',
                                                          'class': 'form-control'}),)
    last_name = forms.CharField(label='Фамилия', max_length=100, required=False)
    email = forms.EmailField(label='Адрес электронной почты', max_length=100, required=False,
                             help_text='вид: bogdandrienko@gmail.com')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password1', 'password2', 'email')


class CreateUsersForm(forms.Form):
    """Форма загрузки из эксель файла"""
    document_addition_file_1 = forms.FileField(label="Добавьте excel-файл (.xlsx/.xls)",
                                               widget=forms.ClearableFileInput(
                                                   attrs={'type': 'file', 'name': 'document_addition_file_1',
                                                          'class': 'form-control'}),
                                               validators=[FileExtensionValidator(['.xlsx', '.xls'])], required=True,
                                               allow_empty_file=False)


class GeneratePasswordsForm(forms.Form):
    """Форма генерации паролей"""
    passwords_chars = forms.SlugField(
        label='Разрешённые символы', min_length=8, max_length=64,
        widget=forms.TextInput(
            attrs={'type': 'text', 'name': 'passwords_chars',
                   'value': 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                   'placeholder': 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
                   'class': 'form-control',
                   'required': ''}), validators=[MinLengthValidator(8), MaxLengthValidator(64), ], required=False)
    passwords_quantity = forms.IntegerField(label='Количество паролей?',
                                            widget=forms.NumberInput(
                                                attrs={'type': 'number', 'name': 'passwords_quantity', 'value': '1',
                                                       'placeholder': '1',
                                                       'class': 'form-control', 'min': '1', 'max': '3000'}),
                                            validators=[MinValueValidator(1), MaxValueValidator(3000), ], required=True)
    passwords_length = forms.IntegerField(label='Количество символов?',
                                          widget=forms.NumberInput(
                                              attrs={'type': 'number', 'name': 'passwords_length', 'value': '8',
                                                     'placeholder': '8',
                                                     'class': 'form-control', 'min': '8', 'max': '24'}),
                                          validators=[MinValueValidator(8), MaxValueValidator(24), ], required=True)
