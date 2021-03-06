from django import forms
from django.forms import widgets
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import RationalModel


class RationalCreateForm(forms.Form):
    """Форма с виджетом ckeditor"""
    rational_description                    = forms.CharField(label="6. описание", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_offering_members_button        = forms.CharField(label="", empty_value=True, widget=forms.TimeInput(attrs={'class':'btn btn-warning w-50', 'type':'button', 'id':'rational_offering_members_button', 'name':'rational_offering_members_button', 'title':'Вставьте в "Источник"',
        'placeholder':'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Фамилия, имя, отчество авторов</p></td><td><p>Место работы</p></td><td><p>Должность</p></td><td><p>Доля (%) участия*</p></td><td><p>Год рождения</p></td><td><p>Подпись**</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>'}))
    rational_offering_members               = forms.CharField(label="9. предложившие участники", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_conclusion_button              = forms.CharField(label="", empty_value=True, widget=forms.TimeInput(attrs={'class':'btn btn-warning w-50', 'type':'button','id':'rational_conclusion_button', 'name':'rational_conclusion_button', 'title':'Вставьте в "Источник"', 
        'placeholder':'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Название Структурного подразделения</p></td><td><p>Заключение</p></td><td><p>Должность, название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>'}))    
    rational_conclusion                     = forms.CharField(label="10. заключения по предложению", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_change_documentations_button   = forms.CharField(label="", empty_value=True, widget=forms.TimeInput(attrs={'class':'btn btn-warning w-50', 'type':'button', 'id':'rational_change_documentations_button', 'name':'rational_change_documentations_button', 'title':'Вставьте в "Источник"',
        'placeholder':'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>Наименование документа</p></td><td><p>№ извещения</p></td><td><p>Дата изменения</p></td><td><p>Должность и название отдела</p></td><td><p>Подпись</p></td></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>'}))
    rational_change_documentations          = forms.CharField(label="11. изменение нормативной и тех. документации", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_responsible_members_button     = forms.CharField(label="", empty_value=True, widget=forms.TimeInput(attrs={'class':'btn btn-warning w-50', 'type':'button', 'id':'rational_responsible_members_button', 'name':'rational_responsible_members_button', 'title':'Вставьте в "Источник"',
        'placeholder':'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>'}))
    rational_responsible_members            = forms.CharField(label="13. ответственные участники", widget=CKEditorUploadingWidget(), empty_value=True)


    class Meta:
        model = RationalModel
        fields = '__all__'

    # def __init__(self, data, **kwargs):
    #     pass
