from django.contrib.auth.models import User, Group

from rest_framework import viewsets, permissions

from app_django.models import ChatModel
from app_django.serializers import UserSerializer, GroupSerializer, ChatModelSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.AllowAny]


class ChatViewSet(viewsets.ModelViewSet):
    queryset = ChatModel.objects.all()
    serializer_class = ChatModelSerializer
    permission_classes = [permissions.AllowAny]
