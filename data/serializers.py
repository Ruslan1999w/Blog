from rest_framework.validators import UniqueValidator
from data.models import Post, UserPost
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=4)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class PostSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], description=validated_data['description'],
                                   date_publish=validated_data['date_publish'])
        return post

    class Meta:
        model = Post
        fields = ('title', 'description', 'date_publish', 'like_count', 'dislike_count')


class UserPostSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # print("validated_data['id_post']  " + str(validated_data['id_post']))
        # print("validated_data['id_auth_user']  " + str(validated_data['id_auth_user']))
        print(validated_data)

        return "user_post"

    class Meta:
        model = UserPost
        fields = ('id_auth_user', 'id_post')


class RatingPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPost
        fields = ('id_auth_user', 'id_post')
