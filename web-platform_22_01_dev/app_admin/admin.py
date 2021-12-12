from django.contrib import admin
from .models import ExamplesModel, UserModel, GroupModel, LoggingModel, ActionModel, ComputerVisionModuleModel, \
    ComputerVisionComponentModel, ModuleOrComponentModel

# admin
admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Админка'  # default: "Django site admin"


class ExamplesModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
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


# Регистрация в админ-панели шаблонов
admin.site.register(ExamplesModel, ExamplesModelAdmin)


# Logging
class LoggingModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
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


# Регистрация в админ-панели логирования
admin.site.register(LoggingModel, LoggingModelAdmin)


# User
class UserModelAdmin(admin.ModelAdmin):
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


# Регистрация в админ-панели собственной расширенной модели пользователей
admin.site.register(UserModel, UserModelAdmin)


class ActionModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    list_display = ('name_char_field', 'name_slug_field')
    list_filter = ('name_char_field', 'name_slug_field')
    fieldsets = (
        ('Имя отображения', {'fields': ('name_char_field',)}),
        ('Имя валидации', {'fields': ('name_slug_field',)}),
    )
    search_fields = ['name_char_field', 'name_slug_field']


# Регистрация в админ-панели
admin.site.register(ActionModel, ActionModelAdmin)


# Group
class GroupModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    list_display = (
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
    )
    list_filter = (
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
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
    )
    search_fields = [
        'group_foreign_key_field',
        'name_char_field',
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
    ]


# Регистрация в админ-панели собственной расширенной модели групп
admin.site.register(GroupModel, GroupModelAdmin)


class ComputerVisionModuleModelAdmin(admin.ModelAdmin):
    """
    Настройки 'ComputerVisionModuleModel' на панели администратора
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


# Регистрация в админ-панели шаблонов
admin.site.register(ComputerVisionModuleModel, ComputerVisionModuleModelAdmin)


class ComputerVisionComponentModelAdmin(admin.ModelAdmin):
    """
    Настройки 'ComputerVisionComponentModel' на панели администратора
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


# Регистрация в админ-панели шаблонов
admin.site.register(ComputerVisionComponentModel, ComputerVisionComponentModelAdmin)


class ApplicationModuleOrComponentModelAdmin(admin.ModelAdmin):
    """
    Настройки 'ComputerVisionComponentModel' на панели администратора
    """

    list_display = (
        'name_char_field',
        'type_slug_field',
        'position_float_field',
        'return_slug_field',
        'parent_slug_field',
        'url_slug_field',
        'image_field',
        'text_field',
    )

    list_filter = (
        'name_char_field',
        'type_slug_field',
        'position_float_field',
        'return_slug_field',
        'parent_slug_field',
        'url_slug_field',
        'image_field',
        'text_field',
    )

    fieldsets = (
        ('main', {'fields': (
            'name_char_field',
            'type_slug_field',
            'position_float_field',
            'return_slug_field',
            'parent_slug_field',
            'url_slug_field',
            'image_field',
            'text_field',
        )}),
    )

    search_fields = [
        'name_char_field',
        'type_slug_field',
        'position_float_field',
        'return_slug_field',
        'parent_slug_field',
        'url_slug_field',
        'image_field',
        'text_field',
    ]


# Регистрация в админ-панели шаблонов
admin.site.register(ModuleOrComponentModel, ApplicationModuleOrComponentModelAdmin)
