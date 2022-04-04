from rest_framework import serializers
from .models import Chore, History, Score
from django.contrib.auth.models import User

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Chore 
        fields = ['url', 'id', 'name',]

class HistorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = History 
        fields = ['id','name','log_name', 'date_created', 'completed', 'user', 'points']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','username', 'email', 'score']
        

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = [ 'user', 'score']
