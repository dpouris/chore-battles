from rest_framework import generics, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings

from .serializers import ChoreSerializer, HistorySerializer, UserSerializer, ScoreSerializer
from .permissions import isOwner
from .models import Chore, History, Score

from rest_framework_simplejwt.views import TokenBlacklistView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken


class ChoreView(ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class ScoreView(generics.RetrieveAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer


class HistoryView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HistorySerializer

    def get_queryset(self):
        return History.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HistoryDetailView(generics.RetrieveUpdateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    permission_classes = (isOwner,)

class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

# A function that get a unique pair of tokens for an account
def get_user_tokens(user):
    tokens = RefreshToken.for_user(user)
    return {
        'refresh': str(tokens),
        'access': str(tokens.access_token),
    }

class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            tokens = {}
            tokens['refresh'] = response.data.get('refresh')
            tokens['access'] = response.data.get('access')
            refresh_cookie_life = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] #1 day
            access_cookie_life = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']  # 1/2 hour
            response.set_cookie('refresh_token', tokens['refresh'], expires=refresh_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] )
            response.set_cookie('access_token', tokens['access'], expires=access_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'], samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer

class LoginView(APIView):
    def post(self,request): 
        data = request.data
        username = data.get('username')
        password = data.get('password')
        response = Response()
        refresh_cookie_life = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] #1 day
        access_cookie_life = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']  # 1/2 hour
        user = authenticate(username=username, password=password)

        if user is not None: 
            if user.is_active:
                tokens = get_user_tokens(user)
                response.set_cookie(key='refresh_token', value=tokens['refresh'], httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'], expires=refresh_cookie_life, samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
                response.set_cookie(key='access_token', value=tokens['access'], httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'], expires=access_cookie_life,  samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
                response.data = {'data': tokens['access']}
                return response
            else:
                return Response({"active": False})

        return Response({'error': 'Invalid Credentials'})

class LogoutView(TokenBlacklistView):
    def finalize_response(self, request, response, *args, **kwargs): 
        response = Response()
        response.delete_cookie('refresh_token')
        response.delete_cookie('access_token')
        return super().finalize_response(request, response, *args, **kwargs)

# Alternate way to get access token and set refresh on httponly cookie

# class CookieTokenObtainPairView(TokenObtainPairView):
#   def finalize_response(self, request, response, *args, **kwargs):
#     if response.data.get('refresh'):
#         cookie_max_age = 3600 * 24 * 14 # 14 days
#         response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True )
#         del response.data['refresh']
#     if response.data.get('access'):
#         cookie_max_age = 3600  # 1 hour
#         response.set_cookie('access_token', response.data['access'], max_age=cookie_max_age, httponly=True )
#         del response.data['access']
#     return super().finalize_response(request, response, *args, **kwargs)
