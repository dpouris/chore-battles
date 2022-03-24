from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Chore(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self): 
        return self.name

class History(models.Model):
    id = models.AutoField(primary_key=True)
    log_name = models.CharField(max_length=255, editable=False, blank=True) 
    name = models.ForeignKey(to=Chore, related_name='history', on_delete=models.CASCADE, unique=False)
    date_created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, default=User) 

    def __str__(self): 
        return str(self.id)

    def save(self, *args, **kwargs):
        if not self.log_name:
            self.log_name = self.name.name
        super(History,self).save(*args,**kwargs)

    class Meta: 
        verbose_name_plural = 'History'