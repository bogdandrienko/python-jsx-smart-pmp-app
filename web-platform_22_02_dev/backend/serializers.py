from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from backend import models as backend_models


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = obj.user_model
        if not user_model:
            user_model = {}
        return user_model


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.UserModel
        fields = '__all__'


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class GroupModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.GroupModel
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
