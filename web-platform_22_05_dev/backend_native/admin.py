from django.contrib import admin

# Register your models here.
from backend_native.models import IdeaTestCommentModel, IdeaTestModel, IdeaTestRatingModel


class IdeaModelAdmin(admin.ModelAdmin):
    """
    Idea Model Admin
    """
    list_display = (
        'author',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'is_visible',
        'created_datetime_field',
        'register_datetime_field',
    )
    list_filter = (
        'author',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'is_visible',
        'created_datetime_field',
        'register_datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author',)}
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
         {'fields': ('is_visible',)}
         ),
        ('Дата и время',
         {'fields': ('created_datetime_field', 'register_datetime_field',)}
         ),
    )
    search_fields = [
        'author',
        'name_char_field',
        'category_slug_field',
        'short_description_char_field',
        'full_description_text_field',
        'avatar_image_field',
        'addiction_file_field',
        'is_visible',
        'created_datetime_field',
        'register_datetime_field',
    ]


admin.site.register(IdeaTestModel, IdeaModelAdmin)


class IdeaCommentModelAdmin(admin.ModelAdmin):
    """
    Idea Comment Model Admin
    """
    list_display = (
        'author',
        'idea_foreign_key_field',
        'text_field',
        'datetime_field',
    )
    list_filter = (
        'author',
        'idea_foreign_key_field',
        # 'text_field',
        'datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author',)}
         ),
        ('Идея',
         {'fields': ('idea_foreign_key_field',)}
         ),
        ('Комментарий',
         {'fields': ('text_field',)}
         ),
        ('Дата',
         {'fields': ('datetime_field',)}
         ),
    )
    search_fields = [
        'author',
        'idea_foreign_key_field',
        'text_field',
        'datetime_field',
    ]


admin.site.register(IdeaTestCommentModel, IdeaCommentModelAdmin)


class IdeaRatingModelAdmin(admin.ModelAdmin):
    """
    Idea Rating Model Admin
    """
    list_display = (
        'author',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    )
    list_filter = (
        'author',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author',)}
         ),
        ('Идея',
         {'fields': ('idea_foreign_key_field',)}
         ),
        ('Статус',
         {'fields': ('status_boolean_field',)}
         ),
        ('Дата',
         {'fields': ('datetime_field',)}
         ),
    )
    search_fields = [
        'author',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    ]


admin.site.register(IdeaTestRatingModel, IdeaRatingModelAdmin)
