from rest_framework import serializers
from .models import Chore, History
from django.contrib.auth.models import User

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Chore 
        fields = ['url', 'id', 'name',]

class HistorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = History 
        fields = ['id','name','log_name', 'date_created', 'completed', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['username', 'email']