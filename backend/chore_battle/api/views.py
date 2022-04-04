from rest_framework import generics, permissions
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User

from .serializers import ChoreSerializer, HistorySerializer, UserSerializer, ScoreSerializer
from .permissions import isOwner
from .models import Chore, History, Score


class ChoreView(ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class DetailScoreView(generics.RetrieveUpdateAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class AllScoresView(generics.ListAPIView):
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

    def patch(self, request, *args, **kwargs):
        # Handling score update on completing a chore
        user_score = Score.objects.get(user=request.user)
        user_score.score += int(request.data['points'])
        user_score.save()
        # Deleting the request points from the chore
        del (request.data['points'])
        return self.partial_update(request, *args, **kwargs)

class DetailUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class AllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
