# TODO django modules ##################################################################################################

from django.contrib.auth.models import User, Group

# TODO drf modules #####################################################################################################

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# TODO custom modules ##################################################################################################

from backend import models as backend_models


# TODO example #########################################################################################################

class ExamplesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.ExamplesModel
        fields = '__all__'


# TODO main ############################################################################################################

# TODO profile #########################################################################################################

class UserSerializer(serializers.ModelSerializer):
    user_model = serializers.SerializerMethodField(read_only=True)
    group_model = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_user_model(self, obj):
        try:
            user = User.objects.get(username=obj.username)
            user_model = backend_models.UserModel.objects.get(user=user)
            user_serializer = UserModelSerializer(instance=user_model, many=False).data
            return user_serializer
        except Exception as error:
            return None

    def get_group_model(self, obj):
        try:
            user = User.objects.get(username=obj.username)
            user_model = backend_models.UserModel.objects.get(user=user)
            group_model = backend_models.GroupModel.objects.filter(users=user_model)
            actions = []
            for group in group_model:
                action_model = group.actions.all()
                for action in action_model:
                    actions.append(action.action)
            if len(actions) < 1:
                actions = ['']
            return actions
        except Exception as error:
            return ['']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['token', 'id', 'username']

    def get_token(self, obj):
        try:
            token = RefreshToken.for_user(obj)
            return str(token.access_token)
        except Exception as error:
            return None


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


class LoggingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = backend_models.LoggingModel
        fields = '__all__'


class NotificationModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    group_model = serializers.SerializerMethodField(read_only=True)
    target_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.NotificationModel
        fields = '__all__'

    def get_author(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author.id)
            author_serializer = UserModelSerializer(instance=author, many=False)
            if not author_serializer.data:
                author_serializer = {'data': None}
            return author_serializer.data
        except Exception as error:
            return None

    def get_group_model(self, obj):
        try:
            group_model = backend_models.GroupModel.objects.get(id=obj.group_model.id)
            group_model_serializer = GroupModelSerializer(instance=group_model, many=False)
            if not group_model_serializer.data:
                group_model_serializer = {'data': None}
            return group_model_serializer.data
        except Exception as error:
            return None

    def get_target_user(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.target_user.id)
            author_serializer = UserModelSerializer(instance=author, many=False)
            if not author_serializer.data:
                author_serializer = {'data': None}
            return author_serializer.data
        except Exception as error:
            return None


# TODO buhgalteria #####################################################################################################

# TODO sup #############################################################################################################

# TODO moderator #######################################################################################################

# TODO progress ########################################################################################################

class IdeaModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaModel
        fields = '__all__'

    def get_author(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author.id)
            return UserModelSerializer(instance=author, many=False).data
        except Exception as error:
            return None

    def get_comments(self, obj):
        try:
            objects = backend_models.IdeaCommentModel.objects.filter(
                idea=backend_models.IdeaModel.objects.get(id=obj.id)
            )
            return {"count": objects.count()}
        except Exception as error:
            return {"count": 0}

    def get_ratings(self, obj):
        try:
            objects = backend_models.IdeaRatingModel.objects.filter(
                idea=backend_models.IdeaModel.objects.get(id=obj.id)
            )
            if objects.count() <= 0:
                response = {"count": 0, "total_rate": 0}
            else:
                rate = 0
                for i in objects:
                    rate += i.rating
                response = {
                    "count": objects.count(),
                    "total_rate": round(rate / objects.count(), 2),
                }
            return response
        except Exception as error:
            return {"count": 0, "total_rate": 0}


class IdeaRatingModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaRatingModel
        fields = '__all__'

    def get_author(self, obj):
        author = backend_models.UserModel.objects.get(id=obj.author.id)
        author_serializer = UserModelSerializer(instance=author, many=False)
        if not author_serializer.data:
            author_serializer = {'data': None}
        return author_serializer.data


class IdeaCommentModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.IdeaCommentModel
        fields = '__all__'

    def get_author(self, obj):
        author = backend_models.UserModel.objects.get(id=obj.author.id)
        author_serializer = UserModelSerializer(instance=author, many=False)
        if not author_serializer.data:
            author_serializer = {'data': None}
        return author_serializer.data


# TODO develop #########################################################################################################

class RationalModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    author_1 = serializers.SerializerMethodField(read_only=True)
    author_2 = serializers.SerializerMethodField(read_only=True)
    author_3 = serializers.SerializerMethodField(read_only=True)
    author_4 = serializers.SerializerMethodField(read_only=True)
    author_5 = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = backend_models.RationalModel
        fields = '__all__'

    def get_author(self, obj):
        author = backend_models.UserModel.objects.get(id=obj.author.id)
        author_serializer = UserModelSerializer(instance=author, many=False)
        if not author_serializer.data:
            author_serializer = {'data': None}
        return author_serializer.data

    def get_author_1(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author_1.id)
            author_serializer = UserModelSerializer(instance=author, many=False).data
            if not author_serializer:
                response = None
            else:
                response = author_serializer
            return response
        except Exception as error:
            return None

    def get_author_2(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author_2.id)
            author_serializer = UserModelSerializer(instance=author, many=False).data
            if not author_serializer:
                response = None
            else:
                response = author_serializer
            return response
        except Exception as error:
            return None

    def get_author_3(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author_3.id)
            author_serializer = UserModelSerializer(instance=author, many=False).data
            if not author_serializer:
                response = None
            else:
                response = author_serializer
            return response
        except Exception as error:
            return None

    def get_author_4(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author_4.id)
            author_serializer = UserModelSerializer(instance=author, many=False).data
            if not author_serializer:
                response = None
            else:
                response = author_serializer
            return response
        except Exception as error:
            return None

    def get_author_5(self, obj):
        try:
            author = backend_models.UserModel.objects.get(id=obj.author_5.id)
            author_serializer = UserModelSerializer(instance=author, many=False).data
            if not author_serializer:
                response = None
            else:
                response = author_serializer
            return response
        except Exception as error:
            return None
