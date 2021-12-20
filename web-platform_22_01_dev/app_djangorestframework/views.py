from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from app_admin.models import IdeaModel
from .serializers import UserSerializer, GroupSerializer, IdeaModelSerializer, ArticleSerializer
from .models import Article


# Create your views here.

class ArticleView(APIView):
    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response({"articles": serializer.data})


class IdeaView(APIView):
    def get(self, request):
        return Response({"ideas": IdeaModelSerializer(instance=IdeaModel.objects.all(), many=True).data})


class GetIdeaView(APIView):
    def get(self, request):
        queryset = IdeaModel.objects.all()
        serializer_for_queryset = IdeaModelSerializer(
            instance=queryset,  # Передаём набор записей
            many=True  # Указываем, что на вход подаётся именно набор записей
        )
        return Response({"ideas": serializer_for_queryset.data})


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
