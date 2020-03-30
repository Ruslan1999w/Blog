from rest_framework.decorators import action
from data.serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from data.models import AuthUser, Post, UserPost, RatingPost


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
            print('ERORRRRRRROROOROROOR')
            post = serializer.save()
            print('ERORRRRRRROROOROROOR')
            print("post number " + str(post.id_post))
            print("user number " + str(request.user.id))
            auth_user = AuthUser.objects.get(id=request.user.id)
            post_id = Post.objects.get(id_post=post.id_post)
            user_post = UserPost.objects.create(id_auth_user=auth_user,
                                                id_post=post_id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):  # извлечение статьи по ее id
        queryset = Post.objects.get(id_post=pk)
        serializer = PostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):  # листинг всех оценок пользователя
        queryset = RatingPost.objects.filter(id_auth_user=request.user.id)
        serializer = RatingPostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):  # создание оценки, не проверяет оставлял ли данный пользователь уже оценку или нет
            user_post = RatingPost.objects.create(id_auth_user=AuthUser.objects.get(id=request.user.id),
                                                  mark=request.data['mark'], id_post=Post.objects.get(id_post=request.data['post_id']))
            return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):  # извлечение статьи по ее id
        queryset = RatingPost.objects.get(id_post=pk)
        serializer = RatingPostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = RatingPost.objects.filter(id_rating_post=pk).update(mark=request.data['mark'])
        return Response(status=status.HTTP_200_OK)