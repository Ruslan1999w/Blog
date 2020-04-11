from rest_framework.validators import UniqueValidator
from data.models import Post, UserPost, Note, Tag, PostTag, Category, AuthUser, RatingPost, Image
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class PostCreater(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['id', 'username']


class UserSerializer(serializers.ModelSerializer):  # Сериалайзер для пользователя
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=AuthUser.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=AuthUser.objects.all())]
    )
    password = serializers.CharField(min_length=4)

    def create(self, validated_data):
        user = AuthUser.objects.create_user(validated_data['username'], validated_data['email'],
                                            validated_data['password'])
        return user

    class Meta:
        model = AuthUser
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PostForNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'rate', 'description', 'id_post')


class NoteSerializer(serializers.ModelSerializer):  # Сериалайзер для комментария
    id_post = PostForNoteSerializer(many=False, required=False)

    class Meta:
        model = Note
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
    id_auth_user = PostCreater(many=False)

    class Meta:
        model = UserPost
        fields = ['id_auth_user']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['path_to_image']


class SimplePostSerializer(serializers.ModelSerializer):  # Сериалайзер для поста

    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], description=validated_data['description'],
                                   date_publish=validated_data['date_publish'],
                                   id_category=validated_data['id_category'])
        return post

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title')
        instance.description = validated_data.get('description')
        instance.save()
        return instance

    class Meta:
        model = Post
        fields = '__all__'


class RatingPostSerializer(serializers.ModelSerializer):
    id_post = PostForNoteSerializer(many=False, required=True)

    def update(self, instance, validated_data):
        instance.mark = validated_data.get('mark')
        instance.save()
        return instance

    class Meta:
        model = RatingPost
        fields = '__all__'
