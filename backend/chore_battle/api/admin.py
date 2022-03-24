from django.contrib import admin
from .models import Chore, History

# Register your models here.
class ChoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', )

class HistoryAdmin(admin.ModelAdmin):
    list_display = ('log_name','date_created','user', 'completed')
    
admin.site.register(Chore, ChoreAdmin)
admin.site.register(History, HistoryAdmin)
