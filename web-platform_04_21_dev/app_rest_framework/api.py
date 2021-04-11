from .models import Todo, Data
from rest_framework import viewsets, permissions
from .serializers import TodoSerializer, DataSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TodoSerializer


class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DataSerializer
