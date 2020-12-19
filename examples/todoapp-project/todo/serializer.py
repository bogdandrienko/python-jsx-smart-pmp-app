from django.db.models import fields
from rest_framework import serializers
from rest_framework.utils.field_mapping import ClassLookupDict
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
