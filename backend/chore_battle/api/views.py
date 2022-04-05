from rest_framework import generics, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from django.contrib.auth.models import User

from .serializers import ChoreSerializer, HistorySerializer, UserSerializer, ScoreSerializer
from .permissions import isOwner, isUser
from .models import Chore, History, Score

class ChoreView(ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class AllScoresView(generics.ListAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [isOwner]

class DetailScoreView(generics.RetrieveUpdateAPIView):
    serializer_class = ScoreSerializer
    permission_classes = [isOwner]

    def get_queryset(self):
        return Score.objects.filter(user=self.request.user)

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

class AllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class DetailUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [isUser]

    def patch(self, request, *args, **kwargs):
        # set new user password
        data = request.data
        if data["type"]:
            request.user.set_password(data["password"])
            request.user.save()
            return Response({"success": True})
        else:
            user = User.objects.get(pk=kwargs['pk'])
            user.set_password(request.data['password'])
            user.save()
            return self.partial_update(request, *args, **kwargs)