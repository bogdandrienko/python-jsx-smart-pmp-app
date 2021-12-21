from rest_framework import serializers
from django.contrib.auth.models import User, Group
from app_djangorestframework.models import TodoModel, DataModel, IdeasModel


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoModel
        fields = '__all__'


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataModel
        fields = '__all__'


class IdeasModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdeasModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
