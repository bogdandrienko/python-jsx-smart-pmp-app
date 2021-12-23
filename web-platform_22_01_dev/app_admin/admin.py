from django.contrib import admin
from app_admin.models import ExamplesModel, UserModel, GroupModel, LoggingModel, ActionModel, \
    ComputerVisionModuleModel, ComputerVisionComponentModel, ModuleOrComponentModel, IdeaCommentModel, IdeaModel, \
    IdeaRatingModel, NotificationModel, IdeasModel

# admin
admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Админка'  # default: "Django site admin"


# example
class ExamplesModelAdmin(admin.ModelAdmin):
    """Настройки 'Examples Model Admin' на панели администратора"""
    # form = ExamplesModelForm

    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = (
        'binary_field',
        'boolean_field', 'null_boolean_field',
        'char_field', 'text_field', 'slug_field', 'email_field', 'url_field', 'genericipaddress_field',
        'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
        'datetime_field', 'date_field', 'time_field', 'duration_field',
        'file_field', 'image_field',
        'foreign_key_field', 'one_to_one_field',
    )

    # Поля, которые отображаются как поле "группы" в пользователе, для моделей many_to_many_field
    filter_horizontal = ('many_to_many_field',)

    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = (
        'binary_field',
        'boolean_field', 'null_boolean_field',
        'char_field', 'text_field', 'slug_field', 'email_field', 'url_field', 'genericipaddress_field',
        'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
        'datetime_field', 'date_field', 'time_field', 'duration_field',
        'file_field', 'image_field',
        'foreign_key_field', 'one_to_one_field', 'many_to_many_field',
    )

    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)

    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    fieldsets = (
        ('binary_data', {'fields': (
            'binary_field',
        )}),
        ('boolean_data', {'fields': (
            'boolean_field', 'null_boolean_field',
        )}),
        ('char_data', {'fields': (
            'char_field', 'text_field', 'slug_field', 'email_field', 'url_field', 'genericipaddress_field',
        )}),
        ('numeric_data', {'fields': (
            'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
        )}),
        ('datetime_data', {'fields': (
            'datetime_field', 'date_field', 'time_field', 'duration_field',
        )}),
        ('file_data', {'fields': (
            'file_field', 'image_field',
        )}),
        ('relations_data', {'fields': (
            'foreign_key_field', 'one_to_one_field', 'many_to_many_field',
        )}),
    )

    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]

    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = [
        'binary_field',
        'boolean_field', 'null_boolean_field',
        'char_field', 'text_field', 'slug_field', 'email_field', 'url_field', 'genericipaddress_field',
        'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
        'datetime_field', 'date_field', 'time_field', 'duration_field',
        'file_field', 'image_field',
        'foreign_key_field', 'one_to_one_field', 'many_to_many_field',
    ]

    # Поля, которые нужно добавлять связанными при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(ExamplesModel, ExamplesModelAdmin)


# logging
class LoggingModelAdmin(admin.ModelAdmin):
    """Настройки 'Logging Model Admin' на панели администратора"""
    list_display = ('username_slug_field', 'ip_genericipaddress_field', 'request_path_slug_field',
                    'request_method_slug_field', 'error_text_field', 'datetime_field')
    list_filter = ('username_slug_field', 'ip_genericipaddress_field', 'request_path_slug_field',
                   'request_method_slug_field', 'error_text_field', 'datetime_field')
    fieldsets = (
        ('Имя пользователя', {'fields': (
            'username_slug_field',
        )}),
        ('Ip адрес клиента', {'fields': (
            'ip_genericipaddress_field',
        )}),
        ('Действие пользователя', {'fields': (
            'request_path_slug_field',
        )}),
        ('Метод запроса', {'fields': (
            'request_method_slug_field',
        )}),
        ('Текст ошибки и/или исключения', {'fields': (
            'error_text_field',
        )}),
        ('Дата и время записи', {'fields': (
            'datetime_field',
        )}),
    )
    search_fields = ['username_slug_field', 'ip_genericipaddress_field', 'request_path_slug_field',
                     'request_method_slug_field', 'error_text_field', 'datetime_field']


admin.site.register(LoggingModel, LoggingModelAdmin)


# user
class UserModelAdmin(admin.ModelAdmin):
    """Настройки 'User Model Admin' на панели администратора"""
    list_display = (
        # authorization data
        'user_foreign_key_field',
        'password_slug_field',
        # technical data
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        # first data
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        # second data
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
        # personal data
        'education_text_field',
        'achievements_text_field',
        'biography_text_field',
        'hobbies_text_field',
        'image_field',
    )
    list_filter = (
        # authorization data
        'user_foreign_key_field',
        'password_slug_field',
        # technical data
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        # first data
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        # second data
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
        # personal data
        'education_text_field',
        'achievements_text_field',
        'biography_text_field',
        'hobbies_text_field',
        'image_field',
    )
    fieldsets = (
        ('Данные авторизации пользователя', {'fields': (
            'user_foreign_key_field',
            'password_slug_field',
        )}),
        ('Технические данные пользователя', {'fields': (
            'activity_boolean_field',
            'email_field',
            'secret_question_char_field',
            'secret_answer_char_field',
        )}),
        ('Первичные данные пользователя', {'fields': (
            'last_name_char_field',
            'first_name_char_field',
            'patronymic_char_field',
        )}),
        ('Вторичные данные пользователя', {'fields': (
            'personnel_number_slug_field',
            'subdivision_char_field',
            'workshop_service_char_field',
            'department_site_char_field',
            'position_char_field',
            'category_char_field',
        )}),
        ('Личные данные пользователя', {'fields': (
            'education_text_field',
            'achievements_text_field',
            'biography_text_field',
            'hobbies_text_field',
            'image_field',
        )}),
    )
    search_fields = [
        # authorization data
        'user_foreign_key_field',
        'password_slug_field',
        # technical data
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        # first data
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        # second data
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
        # personal data
        'education_text_field',
        'achievements_text_field',
        'biography_text_field',
        'hobbies_text_field',
        'image_field',
    ]


admin.site.register(UserModel, UserModelAdmin)


# action
class ActionModelAdmin(admin.ModelAdmin):
    """Настройки 'Action Model Admin' на панели администратора"""
    list_display = (
        'type_slug_field',
        'name_char_field',
        'name_slug_field',
    )
    list_filter = (
        'type_slug_field',
        'name_char_field',
        'name_slug_field',
    )
    fieldsets = (
        ('Тип', {'fields': (
            'type_slug_field',
        )}),
        ('Имя отображения', {'fields': (
            'name_char_field',
        )}),
        ('Имя валидации', {'fields': (
            'name_slug_field',
        )}),
    )
    search_fields = [
        'type_slug_field',
        'name_char_field',
        'name_slug_field',
    ]


admin.site.register(ActionModel, ActionModelAdmin)


# group
class GroupModelAdmin(admin.ModelAdmin):
    """Настройки 'Group Model Admin' на панели администратора"""
    list_display = (
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
        'position_float_field',
    )
    list_filter = (
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
        'position_float_field',
    )
    filter_horizontal = (
        'user_many_to_many_field',
        'action_many_to_many_field',
    )
    fieldsets = (
        ('Группа', {'fields': (
            'group_foreign_key_field',
        )}),
        ('Имя отображения', {'fields': (
            'name_char_field',
        )}),
        ('Имя валидации', {'fields': (
            'name_slug_field',
        )}),
        ('Пользователи', {'fields': (
            'user_many_to_many_field',
        )}),
        ('Действия', {'fields': (
            'action_many_to_many_field',
        )}),
        ('Позиция в списке', {'fields': (
            'position_float_field',
        )}),
    )
    search_fields = [
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
        'position_float_field',
    ]


admin.site.register(GroupModel, GroupModelAdmin)


# notification
class NotificationModelAdmin(admin.ModelAdmin):
    """
    Настройки 'Notification Model' на панели администратора
    """
    list_display = (
        'user_foreign_key_field',
        'type_slug_field',
        'name_char_field',
        'text_field',
        'created_datetime_field',
        'decision_datetime_field',
    )
    list_filter = (
        'user_foreign_key_field',
        'type_slug_field',
        'name_char_field',
        'text_field',
        'created_datetime_field',
        'decision_datetime_field',
    )
    fieldsets = (
        ('main', {'fields': (
            'user_foreign_key_field',
            'type_slug_field',
            'name_char_field',
            'text_field',
            'created_datetime_field',
            'decision_datetime_field',
        )}),
    )
    search_fields = [
        'user_foreign_key_field',
        'type_slug_field',
        'name_char_field',
        'text_field',
        'created_datetime_field',
        'decision_datetime_field',
    ]


admin.site.register(NotificationModel, NotificationModelAdmin)


# module_or_component
class ModuleOrComponentModelAdmin(admin.ModelAdmin):
    """
    Настройки 'Module Or Component Model Admin' на панели администратора
    """
    list_display = (
        'type_slug_field',
        'name_char_field',
        'previous_path_slug_field',
        'current_path_slug_field',
        'next_path_slug_field',
        'position_float_field',
        # 'image_field',
        # 'text_field',
    )
    list_filter = (
        'type_slug_field',
        'name_char_field',
        'previous_path_slug_field',
        'current_path_slug_field',
        'next_path_slug_field',
        'position_float_field',
        'image_field',
        'text_field',
    )
    fieldsets = (
        ('main', {'fields': (
            'type_slug_field',
            'name_char_field',
            'previous_path_slug_field',
            'current_path_slug_field',
            'next_path_slug_field',
            'position_float_field',
            'image_field',
            'text_field',
        )}),
    )
    search_fields = [
        'type_slug_field',
        'name_char_field',
        'previous_path_slug_field',
        'current_path_slug_field',
        'next_path_slug_field',
        'position_float_field',
        'image_field',
        'text_field',
    ]


admin.site.register(ModuleOrComponentModel, ModuleOrComponentModelAdmin)


#
#
#
#
#
#
#
#
#
#
# idea
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


# extra
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


admin.site.register(IdeasModel, IdeasModelAdmin)
