from rest_framework import serializers
from django.contrib.auth.models import User, Group
from app_django.models import ChatModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ChatModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatModel
        fields = '__all__'
