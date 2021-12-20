from rest_framework import serializers
from app_admin.models import IdeaModel
from django.contrib.auth.models import User, Group
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
    # title = serializers.CharField(max_length=120)
    # description = serializers.CharField()
    # body = serializers.CharField()


class IdeaModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdeaModel
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
