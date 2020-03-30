from django.shortcuts import render
from rest_framework.decorators import action
from data.serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from data.models import AuthUser, Post, Note
# Create your views here.



class NotesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])
    def note_create(self, request):
        print(request.data)
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            auth_user = AuthUser.objects.get(id=request.user.id)
            post_id = Post.objects.get(id_post=request.data['id_post'])
            Note.objects.create(id_post=post_id,
                                id_auth_user=auth_user,
                                description=request.data['description'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):  # листинг всех комментов под постом
        queryset = Note.objects.filter(id_post=request.data['id_post'])
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, permission_classes=[IsAuthenticated])
    def return_profile_notes(self, request):
        queryset = Note.objects.filter(id_auth_user=request.user.id)
        print(queryset)
        serializer = ProfileNoteSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def update_note(self, request): #Изменение коммента
        queryset = Note.objects.get(id_note=request.data['id_note'])
        queryset.description = request.data['description']
        queryset.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def delete_note(self, request):
        queryset = Note.objects.get(id_note=request.data['id_note'])
        queryset.delete()
        return Response(status=status.HTTP_200_OK)
