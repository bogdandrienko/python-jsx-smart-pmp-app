from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.tokens import RefreshToken

# from app_settings import settings as backend_settings
from app_admin import models as backend_models
# from app_admin import serializers as backend_serializers
# from app_admin import forms as backend_forms
# from app_admin import service as backend_service
# from app_admin import utils as backend_utils
# from app_admin import tests as backend_tests


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_name(self, obj):
        name = obj.username
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ChatModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.ChatModel
        fields = '__all__'


class NoteSerializer(ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.NoteModel
        fields = '__all__'

    def get_username(self, obj):
        try:
            username = obj.user.username
        except Exception as error:
            username = 'Удалено'
        return str(username)


class NoteSerializerWithUsername(NoteSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.NoteModel
        fields = ['username']

    def get_username(self, obj):
        return str(obj)


class ProductSerializer(ModelSerializer):
    class Meta:
        model = backend_models.ProductModel
        fields = '__all__'


class ReviewModelSerializer(ModelSerializer):
    class Meta:
        model = backend_models.ReviewModel
        fields = '__all__'


class OrderModelSerializer(ModelSerializer):
    class Meta:
        model = backend_models.OrderModel
        fields = '__all__'


class OrderItemModelSerializer(ModelSerializer):
    class Meta:
        model = backend_models.OrderItemModel
        fields = '__all__'


class ShippingAddressModelSerializer(ModelSerializer):
    class Meta:
        model = backend_models.ShippingAddressModel
        fields = '__all__'
