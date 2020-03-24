from rest_framework.decorators import action

from data.serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from data.models import AuthUser, Post, UserPost


class ArticlesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):  # листинг всех статей
        print(request.user.id)
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])
    def article_create(self, request):  # создание статьи
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            print("post number " + str(post.id_post))
            print("user number " + str(request.user.id))
            validated_data = {'id_auth_user': request.user.id, 'id_post': post.id_post, 'req_user': request.user, 'req_post':post}
            auth_user = AuthUser.objects.get(id=request.user.id)
            post_id = Post.objects.get(id_post=post.id_post)
            user_post = UserPost.objects.create(id_auth_user=auth_user,
                                                id_post=post_id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):   # извлечение статьи по ее id
        queryset = Post.objects.get(id_post=pk)
        serializer = PostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

