from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from articles.models import Post


class PostSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], description=validated_data['description'],
                                   date_publish=validated_data['date_publish'])
        return post

    class Meta:
        model = Post
        fields = ('title', 'description', 'date_publish', 'like_count', 'dislike_count')
