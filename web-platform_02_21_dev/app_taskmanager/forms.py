from .models import TaskModel
from django.forms import ModelForm, TextInput, Textarea, fields, models, widgets


class TaskForm(ModelForm):
    class Meta:
        model = TaskModel
        fields = ["name", "description"]
        widgets = {
            "name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Введите название'
            }),
            "description": Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Введите описание'
            }),
            }

    
