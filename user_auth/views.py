from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from pytz import unicode
from rest_framework.decorators import permission_classes, action
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK

from user_auth.serializers import *
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserViewSet(viewsets.ViewSet):  # класс предоставляющий возможности работы с пользователем: листинг всех
    # пользователей, извлечение определенного - по id или login, удаление пользователя

    # @permission_classes((IsAdminUser,))
    @action(methods=['get'], detail=False, permission_classes=[IsAdminUser])
    def users_list(self, request):  # функция вывода всех существующих пользователей
        if permission_classes:
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AuthViewSet(viewsets.ViewSet):  # класс предоставляющий методы авторизации, регистрации и окончания сессии
    # пользователя
    # permission_classes = [AllowAny]

    def create(self, request):  # метод создания пользователя
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                print(token.key)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):  # функция залогинивания, если верификация данных успешна, возвращает токен
        username = request.data["username"]
        password = request.data["password"]
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=HTTP_404_NOT_FOUND)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key},
                        status=HTTP_200_OK)

    @csrf_exempt
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def logout(self, request, pk=None):  # функция разлогинивания, т.е. удаление токена из бд
        # user = authenticate(request.data["username"], password=request.data["password"])
        user_logout = Token.objects.get(key=request.data["token"])
        print(user_logout)
        user_logout.delete()
        return Response(status=HTTP_200_OK)
