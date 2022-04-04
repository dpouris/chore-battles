from django.urls import path
from .views import ChoreView, HistoryView, HistoryDetailView, AllUsersView,DetailUserView, AllScoresView, DetailScoreView
from rest_framework import routers

ROUTER = routers.DefaultRouter()
ROUTER.register(r"chores",ChoreView)

urlpatterns = [
    path('history/', HistoryView.as_view(), name="history"),
    path('history/<int:pk>/', HistoryDetailView.as_view(), name="history-detail"),

    path('users/<int:pk>/', DetailUserView.as_view(), name="user-detail"),
    path('users/', AllUsersView.as_view(), name="all-users"),
    path('score/<int:pk>/', DetailScoreView.as_view(), name="score-detail"),
    path('scores/', AllScoresView.as_view(), name="all-scores"),
]

urlpatterns += ROUTER.urls