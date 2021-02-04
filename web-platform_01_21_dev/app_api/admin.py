from app_api.models import Todo
from django.contrib import admin

# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'date', 'done')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title', 'description')
    list_editable = ('done',)
    list_filter = ('done',)

admin.site.register(Todo, TodoAdmin)
