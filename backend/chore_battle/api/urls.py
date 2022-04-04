from django.urls import path
from .views import ChoreView, LoginView, RegisterView, HistoryView, HistoryDetailView, AllUsersView,DetailUserView, CookieTokenRefreshView, LogoutView, AllScoresView, DetailScoreView
from rest_framework import routers

ROUTER = routers.DefaultRouter()
ROUTER.register(r"chores",ChoreView)

urlpatterns = [
    path('auth/refresh/', CookieTokenRefreshView.as_view(), name="refresh"),
    path('auth/login/', LoginView.as_view(), name="login"),
    path('auth/register/', RegisterView.as_view(), name="register"),
    path("auth/logout/",LogoutView.as_view(), name="logout"),

    path('history/', HistoryView.as_view(), name="history"),
    path('history/<int:pk>/', HistoryDetailView.as_view(), name="history-detail"),

    path('users/<int:pk>/', DetailUserView.as_view(), name="user-detail"),
    path('users/', AllUsersView.as_view(), name="all-users"),
    path('score/<int:pk>/', DetailScoreView.as_view(), name="score-detail"),
    path('scores/', AllScoresView.as_view(), name="all-scores"),
]

urlpatterns += ROUTER.urls