from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator


class GeoForm(forms.Form):
    """
    Geo Form
    """

    # request_name = forms.CharField(label='', widget=forms.TextInput(
    #     attrs={'type': "text", 'name': 'request_name', 'placeholder': 'get_xlsx', 'value': 'get_xlsx', 'class':
    #         'd-none', 'required': ''}), required=False)
    request_value = forms.IntegerField(label='Разряд округления широты и долготы:',
                                       widget=forms.NumberInput(
                                           attrs={'type': 'number', 'name': 'request_value', 'value': '5',
                                                  'placeholder': '5', 'class': 'form-control', 'min': '1',
                                                  'max': '10'}),
                                       validators=[MinValueValidator(1), MaxValueValidator(10), ], required=True)
    request_minutes = forms.IntegerField(label='Количество затрагиваемых минут от текущего момента(длительный запрос):',
                                         widget=forms.NumberInput(
                                             attrs={'type': 'number', 'name': 'request_minutes',
                                                    'value': '10', 'placeholder': '10', 'class': 'form-control',
                                                    'min': '1', 'max': '3600'}),
                                         validators=[MinValueValidator(1), MaxValueValidator(3600), ],
                                         required=True)
    request_between_first = forms.IntegerField(label='Начало диапазона устройств(включительно):',
                                               widget=forms.NumberInput(
                                                   attrs={'type': 'number', 'name': 'request_between_first',
                                                          'value': '6', 'placeholder': '6', 'class': 'form-control',
                                                          'min': '1', 'max': '300'}),
                                               validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                               required=True)
    request_between_last = forms.IntegerField(label='Конец диапазона устройств(включительно)(не более 5 одновременно):',
                                              widget=forms.NumberInput(
                                                  attrs={'type': 'number', 'name': 'request_between_last', 'value': '6',
                                                         'placeholder': '6', 'class': 'form-control', 'min': '1',
                                                         'max': '300'}),
                                              validators=[MinValueValidator(1), MaxValueValidator(300), ],
                                              required=True)

    count_points = forms.IntegerField(label='Количество точек:',
                                      widget=forms.NumberInput(
                                          attrs={'type': 'number', 'name': 'count_points', 'value': '150',
                                                 'placeholder': '150', 'class': 'form-control', 'min': '1',
                                                 'max': '500'}),
                                      validators=[MinValueValidator(1), MaxValueValidator(500), ], required=True)
    correct_rad = forms.IntegerField(label='Коррекция искривления:',
                                     widget=forms.NumberInput(
                                         attrs={'type': 'number', 'name': 'correct_rad', 'value': '2',
                                                'placeholder': '2', 'class': 'form-control', 'min': '0',
                                                'max': '7'}),
                                     validators=[MinValueValidator(0), MaxValueValidator(7), ], required=True)
    rounded_val = forms.IntegerField(label='Разряд округления:',
                                     widget=forms.NumberInput(
                                         attrs={'type': 'number', 'name': 'rounded_val', 'value': '5',
                                                'placeholder': '5', 'class': 'form-control', 'min': '5',
                                                'max': '8'}),
                                     validators=[MinValueValidator(5), MaxValueValidator(8), ], required=True)
