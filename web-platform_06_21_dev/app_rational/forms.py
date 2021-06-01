from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import RationalModel, CategoryRationalModel


# from django.contrib.auth.models import User


class RationalCreateForm(forms.Form):
    """Форма RationalModel, с виджетом ckeditor"""
    rational_structure_from = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_structure_from', 'placeholder': 'имя подразделения',
               'class': 'form-control'}), required=False)
    rational_uid_registrated = forms.IntegerField(label='номер регистрации', widget=forms.NumberInput(
        attrs={'type': 'number', 'name': 'rational_uid_registrated', 'value': '0', 'placeholder': '0',
               'class': 'form-control'}), required=False)
    rational_date_registrated = forms.DateTimeField(label='дата регистрации', widget=forms.DateTimeInput(
        attrs={'type': "datetime-local", 'name': 'rational_date_registrated', 'class': 'form-control', 'required': ''}),
                                                    required=False)
    rational_name = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_name', 'placeholder': 'название статьи', 'class': 'form-control',
               'required': ''}), required=True)
    rational_place_innovation = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_place_innovation', 'placeholder': 'место внедрения',
               'class': 'form-control'}), required=False)
    rational_description = forms.CharField(label="описание", widget=CKEditorUploadingWidget(), required=False)
    rational_addition_file_1 = forms.FileField(label="приложение 1", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_1', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_addition_file_2 = forms.FileField(label="приложение 2", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_2', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_addition_file_3 = forms.FileField(label="приложение 3", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_file_3', 'class': 'form-control'}), required=False,
                                               allow_empty_file=True)
    rational_offering_members_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                        'style="width:1000px"><thead><tr><td><p>Фамилия, имя, ' \
                                        'отчество авторов</p></td><td><p>Место ' \
                                        'работы</p></td><td><p>Должность</p></td><td><p>Доля (%) ' \
                                        'участия*</p></td><td><p>Год ' \
                                        'рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td' \
                                        '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr' \
                                        '><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                        ';</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                        '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td' \
                                        '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr' \
                                        '><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                        ';</td><td>&nbsp;</td></tr></tbody></table> '
    rational_offering_members_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_offering_members_button',
               'name': 'rational_offering_members_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_offering_members_default}))
    rational_offering_members = forms.CharField(label="предложившие участники", widget=CKEditorUploadingWidget(),
                                                required=False)
    rational_conclusion_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                  'style="width:1000px"><thead><tr><td><p>Название Структурного ' \
                                  'подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, ' \
                                  'название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td' \
                                  '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp' \
                                  ';</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td' \
                                  '>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                  '><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                  ';</td></tr></tbody></table> '
    rational_conclusion_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_conclusion_button',
               'name': 'rational_conclusion_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_conclusion_default}))
    rational_conclusion = forms.CharField(label="заключения по предложению", widget=CKEditorUploadingWidget(),
                                          required=False)
    rational_change_documentations_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                             'style="width:1000px"><thead><tr><td><p>Наименование ' \
                                             'документа</p></td><td><p>№ извещения</p></td><td><p>Дата ' \
                                             'изменения</p></td><td><p>Должность и название ' \
                                             'отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td' \
                                             '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr' \
                                             '><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp' \
                                             ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> '
    rational_change_documentations_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_change_documentations_button',
               'name': 'rational_change_documentations_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_change_documentations_default}))
    rational_change_documentations = forms.CharField(label="изменение нормативной и тех. документации",
                                                     widget=CKEditorUploadingWidget(), required=False)
    rational_resolution = forms.CharField(label='', widget=forms.TextInput(
        attrs={'type': "text", 'name': 'rational_resolution', 'placeholder': 'принятое решение',
               'class': 'form-control'}), required=False)
    rational_responsible_members_default = '<table align="left" border="2" cellpadding="2" cellspacing="2" ' \
                                           'style="width:1000px"><thead><tr><td><p>ФИО ' \
                                           'сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки ' \
                                           'выполнения</p></td><td><p>Название подразделения, ' \
                                           'должность</p></td><td><p>Подпись ответственного сотрудника или его ' \
                                           'руководителя</p></td><td><p>Отметка о ' \
                                           'выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp' \
                                           ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp' \
                                           ';</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td' \
                                           '></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td' \
                                           '>&nbsp;</td><td>&nbsp;</td></tr></tbody></table> '
    rational_responsible_members_button = forms.CharField(label="", required=False, widget=forms.TimeInput(
        attrs={'class': 'btn btn-warning w-50', 'type': 'button', 'id': 'rational_responsible_members_button',
               'name': 'rational_responsible_members_button', 'title': 'Вставьте в "Источник"',
               'placeholder': rational_responsible_members_default}))
    rational_responsible_members = forms.CharField(label="ответственные участники", widget=CKEditorUploadingWidget(),
                                                   required=False)
    rational_date_certification = forms.DateTimeField(label='дата получения удостоверения на предложение',
                                                      widget=forms.DateTimeInput(attrs={'type': "datetime-local",
                                                                                        'name': 'rational_date_create',
                                                                                        'class': 'form-control',
                                                                                        'required': ''}),
                                                      required=False)
    rational_category = forms.ModelChoiceField(label="категория", widget=forms.Select(
        attrs={'class': 'form-select form-select-lg mb-3', 'aria-label': '.form-select-lg example', 'required': ''}),
                                               queryset=CategoryRationalModel.objects.order_by('-id'),
                                               empty_label="не выбрано", to_field_name=None, required=False)
    # rational_autor_name = forms.ModelChoiceField(label="имя автора", widget=forms.Select(),
    # queryset=User.objects.get(id=request.user.id), empty_label="не выбрано",  to_field_name=None, required=False)
    # rational_date_create = forms.DateTimeField(label='дата создания', widget=forms.DateTimeInput(attrs={
    # 'type':"datetime-local",'name':'rational_date_create', 'class':'form-control'}), required=False)
    rational_addition_image = forms.ImageField(label="картинка к предложению", widget=forms.ClearableFileInput(
        attrs={'type': "file", 'name': 'rational_addition_image', 'class': 'form-control'}), required=False)

    # rational_status = forms.BooleanField(label='статус', widget=forms.CheckboxInput(attrs={'type':'checkbox',
    # 'name':'rational_status', 'value':'False', 'class':'form-check form-check-input'}), required=False)

    class Meta:
        model = RationalModel
        fields = '__all__'
