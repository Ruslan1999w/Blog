from data.models import Post, UserPost, Note, Tag, PostTag, Category, AuthUser, RatingPost
from data.simple_serializer import *


class UserProfileSerializer(serializers.ModelSerializer):  # Личный кабинет пользователя

    auth_user = NoteSerializer(many=True)
    users_rate = RatingPostSerializer(many=True)

    class Meta:
        model = AuthUser
        fields = ['last_login', 'is_superuser', 'username',
                  'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'git_reference',
                  'auth_user', 'users_rate']


class PostSerializer(serializers.ModelSerializer):  # Сериалайзер для поста

    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], description=validated_data['description'],
                                   date_publish=validated_data['date_publish'])
        return post

    notes = NoteSerializer(many=True)
    post_tag = PostTagSerializer(many=True, read_only=True, required=False)
    id_category = CategorySerializer(many=False, required=False, read_only=True)
    post_creator = UserPostSerializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
