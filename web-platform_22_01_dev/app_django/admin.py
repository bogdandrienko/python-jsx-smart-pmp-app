from django.contrib import admin

from app_django.models import ComputerVisionModuleModel, ComputerVisionComponentModel, IdeaCommentModel, IdeaModel, \
    IdeaRatingModel, ChatModel


class IdeaModelAdmin(admin.ModelAdmin):
    """
    Idea Model Admin
    """
    list_display = (
        'author_foreign_key_field',
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
         {'fields': ('author_foreign_key_field',)}
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


admin.site.register(IdeaModel, IdeaModelAdmin)


class IdeaCommentModelAdmin(admin.ModelAdmin):
    """
    Idea Comment Model Admin
    """
    list_display = (
        'author_foreign_key_field',
        'idea_foreign_key_field',
        'text_field',
        'datetime_field',
    )
    list_filter = (
        'author_foreign_key_field',
        'idea_foreign_key_field',
        # 'text_field',
        'datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author_foreign_key_field',)}
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
        'author_foreign_key_field',
        'idea_foreign_key_field',
        'text_field',
        'datetime_field',
    ]


admin.site.register(IdeaCommentModel, IdeaCommentModelAdmin)


class IdeaRatingModelAdmin(admin.ModelAdmin):
    """
    Idea Rating Model Admin
    """
    list_display = (
        'author_foreign_key_field',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    )
    list_filter = (
        'author_foreign_key_field',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author_foreign_key_field',)}
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
        'author_foreign_key_field',
        'idea_foreign_key_field',
        'status_boolean_field',
        'datetime_field',
    ]


admin.site.register(IdeaRatingModel, IdeaRatingModelAdmin)


class ChatModelAdmin(admin.ModelAdmin):
    """
    Ideas Model Admin
    """
    list_display = (
        'author_char_field',
        'text_field',
        'created_datetime_field',
    )
    list_filter = (
        'author_char_field',
        'text_field',
        'created_datetime_field',
    )
    fieldsets = (
        ('Автор',
         {'fields': ('author_char_field',)}
         ),
        ('Текст',
         {'fields': ('text_field',)}
         ),
        ('Время',
         {'fields': ('created_datetime_field',)}
         ),
    )
    search_fields = [
        'author_char_field',
        'text_field',
        'created_datetime_field',
    ]


admin.site.register(ChatModel, ChatModelAdmin)


class ComputerVisionModuleModelAdmin(admin.ModelAdmin):
    """
    Настройки 'Computer Vision Module Model' на панели администратора
    """
    list_display = (
        'name_char_field',
        'description_text_field',
        'path_slug_field',
        'play_boolean_field',
        'delay_float_field',
        'datetime_field',
        'duration_float_field',
        'restart_boolean_field',
        'error_text_field',
    )
    list_filter = (
        'name_char_field',
        'description_text_field',
        'path_slug_field',
        'play_boolean_field',
        'delay_float_field',
        'datetime_field',
        'duration_float_field',
        'restart_boolean_field',
        'error_text_field',
    )
    fieldsets = (
        ('Наименование, описание и путь', {'fields': (
            'name_char_field', 'description_text_field', 'path_slug_field',
        )}),
        ('Управление', {'fields': (
            'play_boolean_field', 'delay_float_field', 'datetime_field', 'duration_float_field',
        )}),
        ('Действия при ошибках и исключениях', {'fields': (
            'restart_boolean_field', 'error_text_field',
        )}),
    )
    search_fields = [
        'name_char_field',
        'description_text_field',
        'path_slug_field',
        'play_boolean_field',
        'delay_float_field',
        'datetime_field',
        'duration_float_field',
        'restart_boolean_field',
        'error_text_field',
    ]


admin.site.register(ComputerVisionModuleModel, ComputerVisionModuleModelAdmin)


class ComputerVisionComponentModelAdmin(admin.ModelAdmin):
    """
    Настройки 'Computer Vision Component Model' на панели администратора
    """
    list_display = (
        'module_foreign_key_field',
        'play_boolean_field',
        'alias_char_field',
        'protocol_slug_field',
        'port_integer_field',
        'genericipaddress_field',
        'login_slug_field',
        'password_slug_field',
        'mask_char_field',
        'bright_level_integer_field',
        'in_range_set_from_integer_field',
        'in_range_set_to_integer_field',
        'count_not_zero_integer_field',
        'point_1_1_integer_field',
        'point_1_2_integer_field',
        'point_1_3_integer_field',
        'point_2_1_integer_field',
        'point_2_2_integer_field',
        'point_2_3_integer_field',
        'alarm_level_integer_field',
        'null_level_integer_field',
        'correct_coefficient_float_field',
    )
    list_filter = (
        'module_foreign_key_field',
        'play_boolean_field',
        'alias_char_field',
        'protocol_slug_field',
        'port_integer_field',
        'genericipaddress_field',
        'login_slug_field',
        'password_slug_field',
        'mask_char_field',
        'bright_level_integer_field',
        'in_range_set_from_integer_field',
        'in_range_set_to_integer_field',
        'count_not_zero_integer_field',
        'point_1_1_integer_field',
        'point_1_2_integer_field',
        'point_1_3_integer_field',
        'point_2_1_integer_field',
        'point_2_2_integer_field',
        'point_2_3_integer_field',
        'alarm_level_integer_field',
        'null_level_integer_field',
        'correct_coefficient_float_field',
    )
    fieldsets = (
        ('ip', {'fields': (
            'module_foreign_key_field',
            'play_boolean_field',
            'alias_char_field',
            'protocol_slug_field',
            'port_integer_field',
            'genericipaddress_field',
            'login_slug_field',
            'password_slug_field',
            'mask_char_field',
            'bright_level_integer_field',
            'in_range_set_from_integer_field',
            'in_range_set_to_integer_field',
            'count_not_zero_integer_field',
            'point_1_1_integer_field',
            'point_1_2_integer_field',
            'point_1_3_integer_field',
            'point_2_1_integer_field',
            'point_2_2_integer_field',
            'point_2_3_integer_field',
            'alarm_level_integer_field',
            'null_level_integer_field',
            'correct_coefficient_float_field',
        )}),
    )
    search_fields = [
        'module_foreign_key_field',
        'play_boolean_field',
        'alias_char_field',
        'protocol_slug_field',
        'port_integer_field',
        'genericipaddress_field',
        'login_slug_field',
        'password_slug_field',
        'mask_char_field',
        'bright_level_integer_field',
        'in_range_set_from_integer_field',
        'in_range_set_to_integer_field',
        'count_not_zero_integer_field',
        'point_1_1_integer_field',
        'point_1_2_integer_field',
        'point_1_3_integer_field',
        'point_2_1_integer_field',
        'point_2_2_integer_field',
        'point_2_3_integer_field',
        'alarm_level_integer_field',
        'null_level_integer_field',
        'correct_coefficient_float_field',
    ]


admin.site.register(ComputerVisionComponentModel, ComputerVisionComponentModelAdmin)
