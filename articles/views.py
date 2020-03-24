from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes, action
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK

from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from articles.models import Post


class ArticlesViewSet(viewsets.ViewSet):
    @action(methods=['get'], detail=False, permission_classes=[AllowAny])
    def articles(self, request):  # листинг всех статей
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def article_create(self, request):  # создание статьи: пока статья с пользователем не связана, нужно из бд удалить
        serializer = PostSerializer(data=request.data)  # Person и вместо него соединить все с UserAuth
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):   # извлечение статьи по ее id
        queryset = Post.objects.get(id_post=pk)
        serializer = PostSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

