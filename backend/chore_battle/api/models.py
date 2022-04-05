from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Chore(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    points = models.IntegerField(default=0)
    
    def __str__(self): 
        return self.name

class History(models.Model):
    id = models.AutoField(primary_key=True)
    log_name = models.CharField(max_length=255, editable=False, blank=True) 
    name = models.ForeignKey(to=Chore, related_name='history', on_delete=models.CASCADE, unique=False)
    date_created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, default=User, related_name="history") 
    points = models.IntegerField(default=0, editable=False)

    def __str__(self): 
        return str(self.id)

    def save(self, *args, **kwargs):
        if not self.log_name:
            self.log_name = self.name.name
        self.points = self.name.points
        super(History,self).save(*args,**kwargs)

    class Meta: 
        verbose_name_plural = 'History'
        ordering = ['-date_created']

class Score(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name="score", default=User, primary_key=True)
    score = models.IntegerField(default=0, editable=False)

    def __str__(self): 
        return "%s's score: %s" % (self.user.username, self.score)

    def save(self, *args, **kwargs):
        if self.score == 0: 
            completed_user_chores = self.user.history.filter(completed=True)
            self.score = sum([chore.points for chore in completed_user_chores])
        return super(Score,self).save(*args, **kwargs)

    class Meta: 
        ordering = ['-score']
        verbose_name_plural = 'Score'
    