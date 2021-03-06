from rest_framework.decorators import action
from data.serializers import *
from data.simple_serializer import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from data.models import AuthUser, Post, Note


class NotesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):  # Создание комментария
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            auth_user = AuthUser.objects.get(id=request.user.id)
            post_id = Post.objects.get(id_post=request.data['id_post'])
            Note.objects.create(id_post=post_id,
                                id_auth_user=auth_user,
                                description=request.data['description'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])  # Создание статьи
    def comments_list(self, request, pk=None):  # листинг всех комментов под постом
        queryset = Note.objects.filter(id_post=pk)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):  # Извлечение комментария пользователя по его id
        queryset = Note.objects.filter(id_auth_user=request.user.id)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):  # Изменение коммента
        queryset = Note.objects.get(id_note=request.data['id_note'])
        queryset.description = request.data['description']
        queryset.save()
        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):  # Удаление комментария по его id
        queryset = Note.objects.get(id_note=pk)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)
