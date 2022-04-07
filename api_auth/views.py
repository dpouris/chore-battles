from rest_framework_simplejwt.views import TokenBlacklistView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from chore_battle.utils import *
from api.models import Score
from api.serializers import UserSerializer
from api.permissions import isOwner

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            tokens = {}
            tokens['refresh'] = response.data.get('refresh')
            tokens['access'] = response.data.get('access')
            response = set_cookie_response(tokens, response)
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if len(username) < 2 or len(password) < 2:
            return Response({'error': 'Please provide both username and password'}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        score = Score.objects.create(user=user)
        score.save()
        user.save()

        tokens = get_user_tokens(user)
        response = set_cookie_response(tokens)
        response.data = {'success': True}
        return response

class LoginView(APIView):
    def post(self,request): 
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None: 
            if user.is_active:
                tokens = get_user_tokens(user)
                response = set_cookie_response(tokens)
                response.data = {'data': tokens['access']}
                return response
            else:
                return Response({"active": False})

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_406_NOT_ACCEPTABLE)

class LogoutView(TokenBlacklistView):
    def finalize_response(self, request, response, *args, **kwargs): 
        response = Response()
        response.delete_cookie('refresh_token')
        response.delete_cookie('access_token')
        return super().finalize_response(request, response, *args, **kwargs)

class AuthenticateView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None: 
            return Response(data= {'success': True}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


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