# TODO django modules ##################################################################################################
from django.contrib.auth.models import User, Group
# TODO drf modules #####################################################################################################
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
# TODO custom modules ##################################################################################################
from backend import models as backend_models


# TODO example model serializer ########################################################################################
class ExamplesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.ExamplesModel
        fields = '__all__'


# TODO base model serializer ###########################################################################################
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
                actions.append(action.action_slug_field)
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


class NotificationModelSerializer(serializers.ModelSerializer):
    author_foreign_key_field = serializers.SerializerMethodField(read_only=True)
    model_foreign_key_field = serializers.SerializerMethodField(read_only=True)
    target_foreign_key_field = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.NotificationModel
        fields = '__all__'

    def get_author_foreign_key_field(self, obj):
        try:
            user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
            user_model_serializer = UserModelSerializer(instance=user_model, many=False)
            if not user_model_serializer.data:
                user_model_serializer = {'data': None}
            return user_model_serializer.data
        except Exception as error:
            return None

    def get_model_foreign_key_field(self, obj):
        try:
            group_model = backend_models.GroupModel.objects.get(id=obj.model_foreign_key_field.id)
            group_model_serializer = GroupModelSerializer(instance=group_model, many=False)
            if not group_model_serializer.data:
                group_model_serializer = {'data': None}
            return group_model_serializer.data
        except Exception as error:
            return None

    def get_target_foreign_key_field(self, obj):
        try:
            user_model = backend_models.UserModel.objects.get(id=obj.target_foreign_key_field.id)
            user_model_serializer = UserModelSerializer(instance=user_model, many=False)
            if not user_model_serializer.data:
                user_model_serializer = {'data': None}
            return user_model_serializer.data
        except Exception as error:
            return None


# TODO custom model serializer #########################################################################################
class IdeaModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False).data
        if not user_model_serializer:
            response = None
        else:
            response = user_model_serializer
        return response

    def get_comments(self, obj):
        objects = backend_models.IdeaCommentModel.objects.filter(
            idea_foreign_key_field=backend_models.IdeaModel.objects.get(id=obj.id)
        )
        if objects.count() <= 0:
            response = {"count": 0, "comments": []}
        else:
            serialized_objects = IdeaCommentModelSerializer(instance=objects, many=True).data
            response = {"comments": serialized_objects, "count": objects.count()}
        return response

    def get_ratings(self, obj):
        objects = backend_models.IdeaRatingModel.objects.filter(
            idea_foreign_key_field=backend_models.IdeaModel.objects.get(id=obj.id)
        )
        if objects.count() <= 0:
            response = {"ratings": [], "count": 0, "rate": 0}
        else:
            rate = 0
            for i in objects:
                rate += i.rating_integer_field
            rate = round(rate / objects.count(), 2)
            serialized_objects = IdeaRatingModelSerializer(instance=objects, many=True).data
            response = {"ratings": serialized_objects, "count": objects.count(), "rate": rate}
        return response


class IdeaRatingModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaRatingModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


class IdeaCommentModelSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaCommentModel
        fields = '__all__'

    def get_user_model(self, obj):
        user_model = backend_models.UserModel.objects.get(id=obj.author_foreign_key_field.id)
        user_model_serializer = UserModelSerializer(instance=user_model, many=False)
        if not user_model_serializer.data:
            user_model_serializer = {'data': None}
        return user_model_serializer.data


# TODO test model serializer ###########################################################################################
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


class VacancyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.VacancyModel
        fields = '__all__'


class ResumeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.ResumeModel
        fields = '__all__'
