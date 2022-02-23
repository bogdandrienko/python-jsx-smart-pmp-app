from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from backend import models as backend_models


class UserSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)
    group_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_user_model(self, obj):
        user = User.objects.get(username=obj.username)
        user_model = backend_models.UserModel.objects.get(user_foreign_key_field=user)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data

    def get_group_model(self, obj):
        user = User.objects.get(username=obj.username)
        user_model = backend_models.UserModel.objects.get(user_foreign_key_field=user)
        group_model = backend_models.GroupModel.objects.filter(user_many_to_many_field=user_model)
        actions = []
        for group in group_model:
            action_model = group.action_many_to_many_field.all()
            for action in action_model:
                actions.append(action.name_slug_field)
        if len(actions) < 1:
            actions = ['']
        return actions


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['token', 'id', 'username']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.UserModel
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class GroupModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.GroupModel
        fields = '__all__'


class IdeaModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


class RationalModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.RationalModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


########################################################################################################################

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


# Todo serializer
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.Todo
        fields = '__all__'


# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.Category
        fields = '__all__'
