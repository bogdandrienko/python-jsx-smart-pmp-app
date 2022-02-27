from rest_framework_simplejwt import token_blacklist

from django.contrib import admin

from backend import models as backend_models


class ExamplesModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ExamplesModel' на панели администратора
    """

    # form = ExamplesModelForm

    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = (
        'binary_field',
        'boolean_field',
        'null_boolean_field',
        'char_field',
        'text_field',
        'slug_field',
        'email_field',
        'url_field',
        'genericipaddress_field',
        'integer_field',
        'big_integer_field',
        'positive_integer_field',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image_field',
        'foreign_key_field',
        'one_to_one_field',
    )

    # Поля, которые отображаются как поле "группы" в пользователе, для моделей many_to_many_field
    filter_horizontal = ('many_to_many_field',)

    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = (
        'binary_field',
        'boolean_field',
        'null_boolean_field',
        'char_field',
        'text_field',
        'slug_field',
        'email_field',
        'url_field',
        'genericipaddress_field',
        'integer_field',
        'big_integer_field',
        'positive_integer_field',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image_field',
        'foreign_key_field',
        'one_to_one_field',
        'many_to_many_field',
    )

    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)

    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    fieldsets = (
        ('binary_data', {'fields': (
            'binary_field',
        )}),
        ('boolean_data', {'fields': (
            'boolean_field',
            'null_boolean_field',
        )}),
        ('char_data', {'fields': (
            'char_field',
            'text_field',
            'slug_field',
            'email_field',
            'url_field',
            'genericipaddress_field',
        )}),
        ('numeric_data', {'fields': (
            'integer_field',
            'big_integer_field',
            'positive_integer_field',
            'float_field',
            'decimal_field',
        )}),
        ('datetime_data', {'fields': (
            'datetime_field',
            'date_field',
            'time_field',
            'duration_field',
        )}),
        ('file_data', {'fields': (
            'file_field',
            'image_field',
        )}),
        ('relations_data', {'fields': (
            'foreign_key_field',
            'one_to_one_field',
            'many_to_many_field',
        )}),
    )

    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]

    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = [
        'binary_field',
        'boolean_field',
        'null_boolean_field',
        'char_field',
        'text_field',
        'slug_field',
        'email_field',
        'url_field',
        'genericipaddress_field',
        'integer_field',
        'big_integer_field',
        'positive_integer_field',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image_field',
        'foreign_key_field',
        'one_to_one_field',
        'many_to_many_field',
    ]

    # Поля, которые нужно добавлять связанными при создании модели, на панели администратора
    # inlines         = [ExamplesModelInline]


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


class LoggingModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'LoggingModel' на панели администратора
    """

    list_display = (
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
        'error_text_field',
        'datetime_field'
    )
    list_filter = (
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
        'error_text_field',
        'datetime_field'
    )
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
    search_fields = [
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
        'error_text_field',
        'datetime_field'
    ]


class UserModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'UserModel' на панели администратора
    """

    list_display = (
        'user_foreign_key_field',
        'password_slug_field',
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        'temp_password_boolean_field',
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
        'education_text_field',
        'achievements_text_field',
        'biography_text_field',
        'hobbies_text_field',
        'image_field',
    )
    ####################################################################################################################
    # list_display_links = ('id', 'title')
    # list_editable = ('done',)
    ####################################################################################################################
    list_filter = (
        'user_foreign_key_field',
        'password_slug_field',
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        'temp_password_boolean_field',
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
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
            'temp_password_boolean_field',
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
        'user_foreign_key_field',
        'password_slug_field',
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
        'temp_password_boolean_field',
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
        'personnel_number_slug_field',
        'subdivision_char_field',
        'workshop_service_char_field',
        'department_site_char_field',
        'position_char_field',
        'category_char_field',
        'education_text_field',
        'achievements_text_field',
        'biography_text_field',
        'hobbies_text_field',
        'image_field',
    ]


class ActionModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ActionModel' на панели администратора
    """

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


class GroupModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'GroupModel' на панели администратора
    """

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


class RationalModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'RationalModel' на панели администратора
    """

    list_display = (
        "author_foreign_key_field",
        "number_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "avatar_image_field",
        "name_char_field",
        "place_char_field",
        "short_description_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "user1_char_field",
        "user2_char_field",
        "user3_char_field",
        "user4_char_field",
        "user5_char_field",

        "author_premoderate_char_field",
        "conclusion_premoderate_char_field",
        "comment_premoderate_char_field",
        "author_postmoderate_char_field",
        "conclusion_postmoderate_char_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    )
    list_links = (
        "author_foreign_key_field",
        "number_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "avatar_image_field",
        "name_char_field",
        "place_char_field",
        "short_description_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "user1_char_field",
        "user2_char_field",
        "user3_char_field",
        "user4_char_field",
        "user5_char_field",

        "author_premoderate_char_field",
        "conclusion_premoderate_char_field",
        "comment_premoderate_char_field",
        "author_postmoderate_char_field",
        "conclusion_postmoderate_char_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    )
    list_filter = (
        "author_foreign_key_field",
        "number_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "avatar_image_field",
        "name_char_field",
        "place_char_field",
        "short_description_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "user1_char_field",
        "user2_char_field",
        "user3_char_field",
        "user4_char_field",
        "user5_char_field",

        "author_premoderate_char_field",
        "conclusion_premoderate_char_field",
        "comment_premoderate_char_field",
        "author_postmoderate_char_field",
        "conclusion_postmoderate_char_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author_foreign_key_field",
            "number_char_field",
            "subdivision_char_field",
            "sphere_char_field",
            "category_char_field",
            "avatar_image_field",
            "name_char_field",
            "place_char_field",
            "short_description_char_field",
            "description_text_field",
            "additional_word_file_field",
            "additional_pdf_file_field",
            "additional_excel_file_field",
            "user1_char_field",
            "user2_char_field",
            "user3_char_field",
            "user4_char_field",
            "user5_char_field",
        )}),
        ("Предмодерация", {"fields": (
            "author_premoderate_char_field",
            "conclusion_premoderate_char_field",
            "comment_premoderate_char_field",
        )}),
        ("Постмодерация", {"fields": (
            "author_postmoderate_char_field",
            "conclusion_postmoderate_char_field",
            "comment_postmoderate_char_field",
        )}),
        ("Дополнительные данные", {"fields": (
            "visibility_boolean_field",
            "created_datetime_field",
            "register_datetime_field",
        )}),
    )
    search_fields = [
        "author_foreign_key_field",
        "number_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "avatar_image_field",
        "name_char_field",
        "place_char_field",
        "short_description_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "user1_char_field",
        "user2_char_field",
        "user3_char_field",
        "user4_char_field",
        "user5_char_field",

        "author_premoderate_char_field",
        "conclusion_premoderate_char_field",
        "comment_premoderate_char_field",
        "author_postmoderate_char_field",
        "conclusion_postmoderate_char_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    ]


admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Администрирование'  # default: "Django site admin"

admin.site.register(backend_models.ExamplesModel, ExamplesModelAdmin)
admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)
admin.site.register(backend_models.LoggingModel, LoggingModelAdmin)
admin.site.register(backend_models.UserModel, UserModelAdmin)
admin.site.register(backend_models.ActionModel, ActionModelAdmin)
admin.site.register(backend_models.GroupModel, GroupModelAdmin)
admin.site.register(backend_models.RationalModel, RationalModelAdmin)
