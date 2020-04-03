from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes, action
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK
from data.serializers import *
from data.models import AuthUser
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from data.serializers import *


class UserViewSet(viewsets.ViewSet):  # класс предоставляющий возможности работы с пользователем: листинг всех
    # пользователей, извлечение определенного - по id или login, удаление пользователя
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=False, permission_classes=[IsAdminUser])
    def users_list(self, request):  # функция вывода всех существующих пользователей
        if permission_classes:
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = User.objects.get(id=pk)
        serializer = UserSerializer(queryset, many=False)
        return Response(serializer.data)


class AuthViewSet(viewsets.ViewSet):  # класс предоставляющий методы авторизации, регистрации и окончания сессии
    # пользователя
    permission_classes = [AllowAny]

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

    def destroy(self, request, pk=None):    # Удаление поста пользователя, по id поста
        username = request.data["username"]
        password = request.data["password"]
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=HTTP_404_NOT_FOUND)
        else:
            user_delete = AuthUser.objects.get(id=user.id)
            token_delete = Token.objects.get(key=request.data["Token"])
            token_delete.delete()
            user_delete.delete()
            return Response(status=status.HTTP_200_OK)

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

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def logout(self, request):  # функция разлогинивания, т.е. удаление токена из бд
        user_logout = Token.objects.get(key=request.data["Token"])
        user_logout.delete()
        return Response(status=HTTP_200_OK)

    @action(methods=['get'], detail=False, permission_classes=[IsAuthenticated])  # Личный кабинет пользователя
    def personal_account(self, request):
        queryset = AuthUser.objects.get(id=request.user.id)
        serializer = UserProfileSerializer(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
