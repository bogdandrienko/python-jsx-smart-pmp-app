from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from backend import models as backend_models


class ExamplesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.ExamplesModel
        fields = '__all__'


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
                actions.append(action.access_slug_field)
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


class IdeaModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)
    comment_count = serializers.SerializerMethodField(read_only=True)
    total_rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.idea_author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data

    def get_comment_count(self, obj):
        return obj.get_comment_count()

    def get_total_rating(self, obj):
        return obj.get_total_rating()


class RatingIdeaModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.RatingIdeaModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.rating_idea_author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


class CommentIdeaModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.CommentIdeaModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.comment_idea_author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


class VacancyModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = backend_models.VacancyModel
        fields = '__all__'


class ResumeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = backend_models.ResumeModel
        fields = '__all__'
