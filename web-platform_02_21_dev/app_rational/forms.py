from django import forms
# from django.forms.widgets import Textarea
# from django.db import models
from .models import RationalModel
# from ckeditor.fields import RichTextField, RichTextUploadingField
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class RationalCreateForm(forms.Form):
    """Форма с виджетом ckeditor"""
    # rel_1 = model.
    # rel_2 = RichTextField('9. предложившие участники', default='<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Фамилия, имя, отчество авторов</p></td><td><p>Место работы</p></td><td><p>Должность</p></td><td><p>Доля (%) участия*</p></td><td><p>Год рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>', blank=True)
    # rel = forms.CharField(widget=Textarea(attrs={'class':'form-control', 'placeholder':'123'}), label="6. описание", empty_value='1234', required=True, initial='{"adminuser":"3"}', help_text='12345', label_suffix='123', error_messages={'required': 'Please enter your name'}, )
    rational_description            = forms.CharField(label="6. описание", max_length=10000, validators=[], strip=True,
                                           widget=CKEditorUploadingWidget(attrs={
                                           'data-field': 'abc_description',
                                           "class": "form-control abc_description",
                                           'placeholder': 'ABC Description'}), empty_value='1234', required=True, initial={"adminuser":"3"}, help_text='12345', label_suffix='123', error_messages={'required': 'Please enter your name'}, ) 
    # bool = forms.BooleanField(label="6. описание", required=True, initial='{"adminuser":"3"}', help_text='12345', label_suffix='123', error_messages={'required': 'Please enter your name'},)
    # rational_offering_members       = forms.CharField(label="9. предложившие участники", widget=CKEditorUploadingWidget(), empty_value=True)
    # rational_conclusion             = forms.CharField(label="10. заключения по предложению", widget=CKEditorUploadingWidget(), empty_value=True)
    # rational_change_documentations  = forms.CharField(label="11. изменение нормативной и тех. документации", widget=CKEditorUploadingWidget(), empty_value=True)
    # rational_responsible_members    = forms.CharField(label="13. ответственные участники", widget=CKEditorUploadingWidget(), empty_value=True)


    class Meta:
        model = RationalModel
        fields = '__all__'

    def __init__(self, data, **kwargs):
        initial = kwargs.get('initial', {})
        data = {**initial, **data}
        super().__init__(data, **kwargs)
        # self.rational_description.prepare_value = '123'

    def individual():
        return '12345'

#'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>')