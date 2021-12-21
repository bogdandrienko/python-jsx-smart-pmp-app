from django.contrib import admin
from app_djangorestframework.models import TodoModel, DataModel, IdeasModel


class IdeasModelAdmin(admin.ModelAdmin):
    """
    Idea Model Admin
    """
    list_display = (
        'author_foreign_key_field',
        'author_char_field',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'visibility_boolean_field',
        'created_datetime_field',
        'register_datetime_field',
    )
    list_filter = (
        'author_foreign_key_field',
        'author_char_field',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'visibility_boolean_field',
        'created_datetime_field',
        'register_datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author_foreign_key_field', 'author_char_field',)}
         ),
        ('Имя и категория',
         {'fields': ('name_char_field', 'category_slug_field',)}
         ),
        ('Описание',
         {'fields': ('short_description_char_field', 'full_description_text_field',)}
         ),
        ('Приложения',
         {'fields': ('avatar_image_field', 'addiction_file_field',)}
         ),
        ('Отображение',
         {'fields': ('visibility_boolean_field',)}
         ),
        ('Дата и время',
         {'fields': ('created_datetime_field', 'register_datetime_field',)}
         ),
    )
    search_fields = [
        'author_foreign_key_field',
        'author_char_field',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'visibility_boolean_field',
        'created_datetime_field',
        'register_datetime_field',
    ]


# Register your models here.
admin.site.register(TodoModel)
admin.site.register(DataModel)
admin.site.register(IdeasModel, IdeasModelAdmin)
