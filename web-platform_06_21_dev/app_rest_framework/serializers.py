from rest_framework import serializers
from .models import Todo, Data


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'
