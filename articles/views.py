from rest_framework.decorators import action
from data.simple_serializer import *
from data.serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from data.models import AuthUser, Post, UserPost, RatingPost, PostTag, Tag, Image


class ArticlesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):  # листинг всех статей
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])  # Создание статьи
    def article_create(self, request):  # создание статьи
        serializer = SimplePostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            auth_user = AuthUser.objects.get(id=request.user.id)
            post_id = Post.objects.get(id_post=post.id_post)
            user_post = UserPost.objects.create(id_auth_user=auth_user,
                                                id_post=post_id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])  # Создание статьи
    def image_adding(self, request, pk=None):  # создание статьи
        Image.objects.create(id_post=Post.objects.get(id_post=pk), path_to_image=request.data['image'])
        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):  # извлечение статьи по ее id
        queryset = Post.objects.get(id_post=pk)
        serializer = PostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):    # Обновление статьи
        article = Post.objects.get(id_post=pk)
        serializer = SimplePostSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):    # Удаление поста пользователя, по id поста
        article = Post.objects.get(id_post=pk)
        user_post = UserPost.objects.get(id_post=pk)
        if request.user.id == user_post.id_auth_user.id:
            article.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class RateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):  # листинг всех оценок пользователя
        queryset = RatingPost.objects.filter(id_auth_user=request.user.id)
        serializer = RatingPostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):  # создание оценки, не проверяет оставлял ли данный пользователь уже оценку или нет
        user_post = RatingPost.objects.create(id_auth_user=AuthUser.objects.get(id=request.user.id),
                                              mark=request.data['mark'],
                                              id_post=Post.objects.get(id_post=request.data['post_id']))
        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):  # извлечение оценки по id поста
        queryset = RatingPost.objects.get(id_post=pk)
        serializer = RatingPostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):  # обновление оценки по id статьи
        rate = RatingPost.objects.filter(id_post=pk, id_auth_user=request.user.id)
        serializer = RatingPostSerializer(rate[0], request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


