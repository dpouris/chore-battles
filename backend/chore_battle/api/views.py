from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import ChoreSerializer, HistorySerializer, UserSerializer
from .models import Chore, History
from .permissions import isOwner

class ChoreView(ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class HistoryView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = HistorySerializer

    def get_queryset(self):
        return History.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HistoryDetailView(generics.RetrieveUpdateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    permission_classes = (isOwner,)

class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]