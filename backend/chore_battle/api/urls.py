from django.urls import path
from .views import ChoreView, LoginView,HistoryView,HistoryDetailView, UserView, CookieTokenRefreshView, LogoutView
from rest_framework import routers

ROUTER = routers.DefaultRouter() #
ROUTER.register(r"chores",ChoreView)

urlpatterns = [
    # path('auth/tokens/', CookieTokenObtainPairView.as_view(), name="login"), 
    path('auth/refresh/', CookieTokenRefreshView.as_view(), name="refresh"),
    path('auth/login/', LoginView.as_view(), name="test-login"),
    path("auth/logout/",LogoutView.as_view(), name="logout"),
    path('history/', HistoryView.as_view(), name="history"),
    path('history/<int:pk>/', HistoryDetailView.as_view(), name="history-detail"),
    path('users/<int:pk>/', UserView.as_view(), name="users"),
]

urlpatterns += ROUTER.urls