from django.urls import path
from .views import LoginView, RegisterView, CookieTokenRefreshView, LogoutView, AuthenticateView

urlpatterns = [
    path('refresh/', CookieTokenRefreshView.as_view(), name="refresh"),
    path('login/', LoginView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path("logout/",LogoutView.as_view(), name="logout"),
    path("authenticate/",AuthenticateView.as_view(), name="authenticate"),
]