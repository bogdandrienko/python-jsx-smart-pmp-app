from django import forms
from .models import RationalModel
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class RationalCreateForm(forms.Form):
    """Форма с виджетом ckeditor"""
    rational_description            = forms.CharField(label="6. описание", widget=CKEditorUploadingWidget(), required=True, initial='12345', empty_value=True) #'<table align="left" border="2" cellpadding="2" cellspacing="2" style="width:1000px"><thead><tr><td><p>ФИО сотрудника</p></td><td><p>Задачи, мероприятия</p></td><td><p>Сроки выполнения</p></td><td><p>Название подразделения, должность</p></td><td><p>Подпись ответственного сотрудника или его руководителя</p></td><td><p>Отметка о выполнении</p></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>')
    rational_offering_members       = forms.CharField(label="9. предложившие участники", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_conclusion             = forms.CharField(label="10. заключения по предложению", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_change_documentations  = forms.CharField(label="11. изменение нормативной и тех. документации", widget=CKEditorUploadingWidget(), empty_value=True)
    rational_responsible_members    = forms.CharField(label="13. ответственные участники", widget=CKEditorUploadingWidget(), empty_value=True)


    class Meta:
        model = RationalModel
        fields = '__all__'
