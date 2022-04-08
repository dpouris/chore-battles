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

    # Adding the settings expiry adds session cookies and in doing so in mobile browsers the cookies delte after the session ends or if they terminate their browser from recent apps. 
    # This is not optimal because the user has to login each and every time so we hardcode the expiry to :
    #  1 day for refresh and 30 minutes for the access token. 

    # refresh_cookie_life = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] #1 day
    # access_cookie_life = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']  # 1/2 hour
    refresh_cookie_life = 3600 * 24 #1 day
    access_cookie_life = 3600 / 2  # 1/2 hour
    response.set_cookie('access_token', tokens['access'], expires=access_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] )
    response.set_cookie('refresh_token', tokens['refresh'], expires=refresh_cookie_life, httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] )
    return response