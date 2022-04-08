from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.response import Response

from django.conf import settings
from django.contrib.auth.models import User

# A function that get a unique pair of tokens for an account
def get_user_tokens(user: User) -> dict:
    tokens = RefreshToken.for_user(user)
    return {
        'refresh': str(tokens),
        'access': str(tokens.access_token),
    }

def set_cookie_response(tokens:dict = {"access": '', "refresh": ''}, response:Response = None) -> Response:
    if response is None:
        response = Response()
    # refresh_cookie_life = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] #1 day
    # access_cookie_life = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']  # 1/2 hour
    refresh_cookie_life = 1000 * 3600 * 24 #1 day
    access_cookie_life = 1000 * 60 * 30  # 1/2 hour
    response.set_cookie('access_token', tokens['access'], expires=access_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] )
    response.set_cookie('refresh_token', tokens['refresh'], expires=refresh_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] )
    return response