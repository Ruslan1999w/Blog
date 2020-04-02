from rest_framework.validators import UniqueValidator
from data.models import Post, UserPost, Note, Tag, PostTag, Category, AuthUser, RatingPost, Image
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
        model = AuthUser
        fields = ['last_login', 'is_superuser', 'username',
                  'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'git_reference', 'password']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):  # Сериалайзер для комментария
    id_post = CategorySerializer(many=False)

    class Meta:
        model = Note
        fields = '__all__'


class RatingPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingPost
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostTagSerializer(serializers.ModelSerializer):
    id_tag = TagSerializer(many=False, required=True)

    class Meta:
        model = PostTag
        fields = ['id_tag']


class UserPostSerializer(serializers.ModelSerializer):
    id_auth_user = UserSerializer(many=False)

    class Meta:
        model = UserPost
        fields = ['id_auth_user']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['path_to_image']
