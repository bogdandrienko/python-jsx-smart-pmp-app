from django.contrib.auth.models import Group, User
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from backend_api import serializers


# Create your views here.

@api_view(http_method_names=["GET", "POST", "PUT", "DELETE"])
@authentication_classes([BasicAuthentication])
def api_auth_routes(request):
    """
    routes django-rest-framework
    """

    try:

        # Methods
        if request.method == "GET":
            try:
                _routes = [
                    {
                        'Endpoints': '$BASEPATH$/router/',
                        'methods': 'GET, HEAD, OPTIONS',
                        'descriptions': 'default router for rest_framework ViewSet',
                        'helps': '''$BASEPATH$/router/''',
                        'code': '''from rest_framework import routers\n
                        router = routers.DefaultRouter()\n
                        router.register(prefix=r'users', viewset=views.UserViewSet, basename='users')'''
                    },
                    {
                        'name': '''JWT token''',
                        'endpoint': '''$BASEPATH$/tokens/''',
                        'method': '''...''',
                        'body': '''...''',
                        'descriptions': '''All endpoints for "JWT token" with django-rest_framework api''',
                        'helps': '''$BASEPATH$/tokens/''',
                        'code': '''...'''
                    },
                    {
                        'name': '''get token''',
                        'endpoint': '''$BASEPATH$/token/''',
                        'method': '''...''',
                        'body': '''...''',
                        'descriptions': '''All actions for "note" with django-rest_framework api''',
                        'helps': '''...''',
                        'code': '''...'''
                    },
                    {
                        'name': '''refresh token''',
                        'endpoint': '''$BASEPATH$/token/refresh/''',
                        'method': '''...''',
                        'body': '''...''',
                        'descriptions': '''refresh token with django-rest_framework api''',
                        'helps': '''-''',
                        'code': '''...'''
                    },
                    {
                        'name': '''verify token''',
                        'endpoint': '''$BASEPATH$/token/verify/''',
                        'method': '''...''',
                        'body': '''...''',
                        'descriptions': '''verify token with django-rest_framework api''',
                        'helps': '''-''',
                        'code': '''...'''
                    },
                    {
                        'name': '''note_api''',
                        'endpoint': '''$BASEPATH$/note_api/ && $BASEPATH$/note_api/<id>/''',
                        'method': '''...''',
                        'body': '''...''',
                        'descriptions': '''All actions for "note" with django-rest_framework api''',
                        'helps': '''$BASEPATH$/note_api/-1/''',
                        'code': '''...'''
                    },
                ]
                return Response({"response": _routes})
            except Exception as error:
                return Response({"error": "Произошла ошибка!"})
        else:
            return Response({"error": "This method not allowed for this endpoint."})
    except Exception as error:
        print(error)
        return render(request, "backend/404.html")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.AllowAny]


@api_view(http_method_names=["GET", "POST", "PUT", "DELETE"])
@permission_classes([AllowAny])
def api_any_user(request):
    """
    any user django-rest-framework
    """

    try:
        # Methods
        if request.method == "POST":
            try:
                superuser = {"username": "admin", "password": "password"}

                return Response({"response": superuser})
            except Exception as error:
                return Response({"error": "Произошла ошибка!"})
        else:
            return Response({"error": "This method not allowed for this endpoint."})
    except Exception as error:
        return render(request, "backend/404.html")


@api_view(http_method_names=["GET", "POST", "PUT", "DELETE"])
@authentication_classes([BasicAuthentication])
def api_auth_user(request):
    """
    auth user django-rest-framework
    """

    try:
        # Methods
        if request.method == "POST":
            try:
                superuser = {"username": "admin", "password": "password"}

                return Response({"response": superuser})
            except Exception as error:
                return Response({"error": "Произошла ошибка!"})
        else:
            return Response({"error": "This method not allowed for this endpoint."})
    except Exception as error:
        return render(request, "backend/404.html")
