from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from app_djangorestframework.serializers import UserSerializer, GroupSerializer, IdeasModelSerializer, TodoSerializer, \
    DataSerializer
from app_djangorestframework.models import TodoModel, DataModel, IdeasModel


# Create your views here.


class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoModel.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.AllowAny]


class DataViewSet(viewsets.ModelViewSet):
    queryset = DataModel.objects.all()
    serializer_class = DataSerializer
    permission_classes = [permissions.AllowAny]


class IdeasViewSet(viewsets.ModelViewSet):
    queryset = IdeasModel.objects.all()
    serializer_class = IdeasModelSerializer
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.AllowAny]
