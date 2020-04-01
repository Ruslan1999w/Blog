from data.models import Post, UserPost, Note, Tag, PostTag, Category
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):  # Сериалайзер для пользователя
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
        fields = ('username', 'email', 'password')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):  # Сериалайзер для комментария
    class Meta:
        model = Note
        fields = ['description', 'date_publish', 'id_auth_user', 'like_count', 'dislike_count']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostTagSerializer(serializers.ModelSerializer):
    id_tag = TagSerializer(many=False, required=True)

    class Meta:
        model = PostTag
        fields = ['id_tag']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id_tag', 'title']


class PostTagSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=False, read_only=True)

    class Meta:
    class Meta:
        model = PostTag
        fields = ['id_tag', 'tags']


class PostSerializer(serializers.ModelSerializer):  # Сериалайзер для поста

    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], description=validated_data['description'],
                                   date_publish=validated_data['date_publish'])
        return post

    posts = NoteSerializer(many=True)
    post_tag = PostTagSerializer(many=True, read_only=True, required=False)
    id_category = CategorySerializer(many=False, required=False, read_only=True)

    class Meta:
        model = Post
        # fields = ('title', 'description', 'date_publish', 'like_count', 'dislike_count', 'posts','post_tag')
        fields = '__all__'


class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = ('id_auth_user', 'id_post')


class ProfileNoteSerializer(serializers.ModelSerializer):
    notes = PostSerializer(many=True)

    class Meta:
        model = Note
        fields = ['description', 'id_auth_user', 'notes']


class RatingPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = ('id_auth_user', 'id_post')
