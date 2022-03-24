from django.urls import path
from .views import ChoreView, HistoryView,HistoryDetailView, UserView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView

ROUTER = routers.DefaultRouter() #
ROUTER.register(r"chores",ChoreView)

urlpatterns = [
    path('auth/tokens/', TokenObtainPairView.as_view(), name="login"), 
    path('auth/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path("auth/logout/",TokenBlacklistView.as_view(), name="logout"),
    path('history/', HistoryView.as_view(), name="history"),
    path('history/<int:pk>/', HistoryDetailView.as_view(), name="history-detail"),
    path('users/<int:pk>/', UserView.as_view(), name="users"),
]

urlpatterns += ROUTER.urls