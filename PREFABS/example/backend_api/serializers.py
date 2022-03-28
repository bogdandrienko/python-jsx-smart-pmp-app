# ###################################################################################################TODO django modules
from django.contrib.auth.models import User, Group
# ######################################################################################################TODO drf modules
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
