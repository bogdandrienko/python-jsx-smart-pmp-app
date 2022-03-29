# TODO django modules ##################################################################################################
from django.contrib import admin
# TODO drf modules #####################################################################################################
from rest_framework_simplejwt import token_blacklist
# TODO custom modules ##################################################################################################
from backend import models as backend_models

# TODO default settings ################################################################################################
admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Администрирование'  # default: "Django site admin"


# TODO example model admin #############################################################################################
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

    # Поля, которые отображаются как ссылки для перехода в детали модели
    list_display_links = (
        'binary_field',
        'boolean_field',
    )

    # Поля, которые можно редактировать прям из общего списка
    list_editable = (
        'text_field',
        'slug_field',
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


admin.site.register(backend_models.ExamplesModel, ExamplesModelAdmin)


# TODO base model admin ################################################################################################
class UserModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'UserModel' на панели администратора
    """

    # list_display = (
    #     'user_foreign_key_field',
    # )
    # list_display_links = (
    #     'user_foreign_key_field',
    # )
    # list_editable = (
    #     'user_foreign_key_field',
    # )
    # list_filter = (
    #     'user_foreign_key_field',
    # )
    # filter_horizontal = (
    #     'user_many_to_many_field',
    # )
    # fieldsets = (
    #     ('Основное', {'fields': (
    #         'user_foreign_key_field',
    #     )}),
    # )
    # search_fields = [
    #     'user_foreign_key_field',
    # ]

    list_display = (
        'user_foreign_key_field',
        'password_char_field',
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
    list_display_links = (
        'user_foreign_key_field',
        'password_char_field',
        'last_name_char_field',
        'first_name_char_field',
        'patronymic_char_field',
    )
    list_editable = (
        'activity_boolean_field',
    )
    list_filter = (
        'user_foreign_key_field',
        'password_char_field',
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
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user_foreign_key_field',
            'password_char_field',
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
        )}),
    )
    search_fields = [
        'user_foreign_key_field',
        'password_char_field',
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


admin.site.register(backend_models.UserModel, UserModelAdmin)


class ActionModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ActionModel' на панели администратора
    """

    list_display = (
        'action_slug_field',
    )
    list_display_links = (
        'action_slug_field',
    )
    list_editable = (
    )
    list_filter = (
        'action_slug_field',
    )
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'action_slug_field',
        )}),
    )
    search_fields = [
        'action_slug_field',
    ]


admin.site.register(backend_models.ActionModel, ActionModelAdmin)


class GroupModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'GroupModel' на панели администратора
    """

    list_display = (
        'name_slug_field',
    )
    list_display_links = (
        'name_slug_field',
    )
    list_editable = (
    )
    list_filter = (
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
    )
    filter_horizontal = (
        'user_many_to_many_field',
        'action_many_to_many_field',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'name_slug_field',
            'user_many_to_many_field',
            'action_many_to_many_field',
        )}),
    )
    search_fields = [
        'name_slug_field',
        'user_many_to_many_field',
        'action_many_to_many_field',
    ]


admin.site.register(backend_models.GroupModel, GroupModelAdmin)


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True


admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)


class SettingsModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'SettingsModel' на панели администратора
    """

    list_display = (
        'type_char_field',
        'char_field',
        'slug_field',
        'text_field',
        'integer_field',
        'float_field',
        'boolean_field',
        'created_datetime_field',
    )
    list_display_links = (
        'type_char_field',
        'char_field',
        'slug_field',
    )
    list_editable = (
        'boolean_field',
    )
    list_filter = (
        'type_char_field',
        'char_field',
        'slug_field',
        'text_field',
        'integer_field',
        'float_field',
        'boolean_field',
        'created_datetime_field',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'type_char_field',
            'char_field',
            'slug_field',
            'text_field',
            'integer_field',
            'float_field',
            'boolean_field',
            'created_datetime_field',
        )}),
    )
    search_fields = [
        'type_char_field',
        'char_field',
        'slug_field',
        'text_field',
        'integer_field',
        'float_field',
        'boolean_field',
        'created_datetime_field',
    ]


admin.site.register(backend_models.SettingsModel, SettingsModelAdmin)


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
        'created_datetime_field'
    )
    list_display_links = (
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
    )
    list_editable = (
    )
    list_filter = (
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
        'error_text_field',
        'created_datetime_field'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'username_slug_field',
            'ip_genericipaddress_field',
            'request_path_slug_field',
            'request_method_slug_field',
            'error_text_field',
            'created_datetime_field',
        )}),
    )
    search_fields = [
        'username_slug_field',
        'ip_genericipaddress_field',
        'request_path_slug_field',
        'request_method_slug_field',
        'error_text_field',
        'created_datetime_field'
    ]


admin.site.register(backend_models.LoggingModel, LoggingModelAdmin)


class NotificationModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'IdeaModel' на панели администратора
    """

    list_display = (
        "author_foreign_key_field",
        "model_foreign_key_field",
        "target_foreign_key_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "visibility_boolean_field",
        "created_datetime_field",
        "hide_datetime_field",
    )
    list_display_links = (
        "author_foreign_key_field",
        "model_foreign_key_field",
        "target_foreign_key_field",
        "name_char_field",
        "place_char_field",
    )
    list_editable = (
        "visibility_boolean_field",
    )
    list_filter = (
        "author_foreign_key_field",
        "model_foreign_key_field",
        "target_foreign_key_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "visibility_boolean_field",
        "created_datetime_field",
        "hide_datetime_field",
    )
    fieldsets = (
        ("Основное", {"fields": (
            "author_foreign_key_field",
            "model_foreign_key_field",
            "target_foreign_key_field",
            "name_char_field",
            "place_char_field",
            "description_text_field",
            "visibility_boolean_field",
            "created_datetime_field",
            "hide_datetime_field",
        )}),
    )
    search_fields = [
        "author_foreign_key_field",
        "model_foreign_key_field",
        "target_foreign_key_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "visibility_boolean_field",
        "created_datetime_field",
        "hide_datetime_field",
    ]


admin.site.register(backend_models.NotificationModel, NotificationModelAdmin)


# TODO custom model admin ##############################################################################################
class IdeaModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'IdeaModel' на панели администратора
    """

    list_display = (
        "author_foreign_key_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",

        "moderate_foreign_key_field",
        "comment_moderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    )
    list_display_links = (
        "author_foreign_key_field",
    )
    list_editable = (
        "status_moderate_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "register_datetime_field",
    )
    list_filter = (
        "author_foreign_key_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",

        "moderate_foreign_key_field",
        "comment_moderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author_foreign_key_field",
            "status_moderate_char_field",
            "subdivision_char_field",
            "sphere_char_field",
            "category_char_field",
            "image_field",
            "name_char_field",
            "place_char_field",
            "description_text_field",
        )}),
        ("Модерация", {"fields": (
            "moderate_foreign_key_field",
            "comment_moderate_char_field",
        )}),
        ("Дополнительные данные", {"fields": (
            "visibility_boolean_field",
            "created_datetime_field",
            "register_datetime_field",
        )}),
    )
    search_fields = [
        "author_foreign_key_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "sphere_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",

        "moderate_foreign_key_field",
        "comment_moderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
        "register_datetime_field",
    ]


admin.site.register(backend_models.IdeaModel, IdeaModelAdmin)


class RatingIdeaModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'RatingIdeaModel' на панели администратора
    """

    list_display = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "rating_integer_field",
    )
    list_display_links = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
    )
    list_editable = (
        "rating_integer_field",
    )
    list_filter = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "rating_integer_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "idea_foreign_key_field",
            "author_foreign_key_field",
            "rating_integer_field",
        )}),
        ("Дополнительные данные", {"fields": (
        )}),
    )
    search_fields = [
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "rating_integer_field",
        "created_datetime_field",
    ]


admin.site.register(backend_models.RatingIdeaModel, RatingIdeaModelAdmin)


class CommentIdeaModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'CommentIdeaModel' на панели администратора
    """

    list_display = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "comment_text_field",
        "created_datetime_field",
    )
    list_display_links = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
    )
    list_editable = (
        "comment_text_field",
    )
    list_filter = (
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "comment_text_field",
        "created_datetime_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "idea_foreign_key_field",
            "author_foreign_key_field",
            "comment_text_field",
        )}),
        ("Дополнительные данные", {"fields": (
            "created_datetime_field",
        )}),
    )
    search_fields = [
        "idea_foreign_key_field",
        "author_foreign_key_field",
        "comment_text_field",
        "created_datetime_field",
    ]


admin.site.register(backend_models.CommentIdeaModel, CommentIdeaModelAdmin)


# TODO test model admin ################################################################################################
class RationalModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'RationalModel' на панели администратора
    """

    list_display = (
        "author_foreign_key_field",
        "number_char_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "author_1_char_field",
        "author_2_char_field",
        "author_3_char_field",
        "author_4_char_field",
        "author_5_char_field",

        "premoderate_foreign_key_field",
        "comment_premoderate_char_field",
        "postmoderate_foreign_key_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
    )
    list_display_links = (
        "author_foreign_key_field",
        "number_char_field",
    )
    list_editable = (
        "status_moderate_char_field",
        "subdivision_char_field",
        "category_char_field",
    )
    list_filter = (
        "author_foreign_key_field",
        "number_char_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "author_1_char_field",
        "author_2_char_field",
        "author_3_char_field",
        "author_4_char_field",
        "author_5_char_field",

        "premoderate_foreign_key_field",
        "comment_premoderate_char_field",
        "postmoderate_foreign_key_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author_foreign_key_field",
            "number_char_field",
            "status_moderate_char_field",
            "subdivision_char_field",
            "category_char_field",
            "image_field",
            "name_char_field",
            "place_char_field",
            "description_text_field",
            "additional_word_file_field",
            "additional_pdf_file_field",
            "additional_excel_file_field",
            "author_1_char_field",
            "author_2_char_field",
            "author_3_char_field",
            "author_4_char_field",
            "author_5_char_field",
        )}),
        ("Предмодерация", {"fields": (
            "premoderate_foreign_key_field",
            "comment_premoderate_char_field",
        )}),
        ("Постмодерация", {"fields": (
            "postmoderate_foreign_key_field",
            "comment_postmoderate_char_field",
        )}),
        ("Дополнительные данные", {"fields": (
            "visibility_boolean_field",
            "created_datetime_field",
        )}),
    )
    search_fields = [
        "author_foreign_key_field",
        "number_char_field",
        "status_moderate_char_field",
        "subdivision_char_field",
        "category_char_field",
        "image_field",
        "name_char_field",
        "place_char_field",
        "description_text_field",
        "additional_word_file_field",
        "additional_pdf_file_field",
        "additional_excel_file_field",
        "author_1_char_field",
        "author_2_char_field",
        "author_3_char_field",
        "author_4_char_field",
        "author_5_char_field",

        "premoderate_foreign_key_field",
        "comment_premoderate_char_field",
        "postmoderate_foreign_key_field",
        "comment_postmoderate_char_field",

        "visibility_boolean_field",
        "created_datetime_field",
    ]


admin.site.register(backend_models.RationalModel, RationalModelAdmin)


class VacancyModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'VacancyModel' на панели администратора
    """

    list_display = (
        "author_foreign_key_field",
        "qualification_char_field",
        "image_field",
        "created_datetime_field",
        "sphere_char_field",
        "education_char_field",
        "rank_char_field",
        "experience_char_field",
        "schedule_char_field",
        "description_text_field",
    )
    list_display_links = (
        "author_foreign_key_field",
    )
    list_editable = (
        "qualification_char_field",
    )
    list_filter = (
        "author_foreign_key_field",
        "qualification_char_field",
        "image_field",
        "created_datetime_field",
        "sphere_char_field",
        "education_char_field",
        "rank_char_field",
        "experience_char_field",
        "schedule_char_field",
        "description_text_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author_foreign_key_field",
            "qualification_char_field",
            "image_field",
            "created_datetime_field",
            "sphere_char_field",
            "education_char_field",
            "rank_char_field",
            "experience_char_field",
            "schedule_char_field",
            "description_text_field",
        )}),
    )
    search_fields = [
        "author_foreign_key_field",
        "qualification_char_field",
        "image_field",
        "created_datetime_field",
        "sphere_char_field",
        "education_char_field",
        "rank_char_field",
        "experience_char_field",
        "schedule_char_field",
        "description_text_field",
    ]


admin.site.register(backend_models.VacancyModel, VacancyModelAdmin)


class ResumeModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ResumeModel' на панели администратора
    """

    list_display = (
        "qualification_char_field",
        "last_name_char_field",
        "first_name_char_field",
        "patronymic_char_field",
        "image_field",
        "birth_datetime_field",
        "education_char_field",
        "experience_char_field",
        "sex_char_field",
    )
    list_display_links = (
        "qualification_char_field",
        "last_name_char_field",
        "first_name_char_field",
    )
    list_editable = (
        "education_char_field",
        "experience_char_field",
        "sex_char_field",
    )
    list_filter = (
        "qualification_char_field",
        "last_name_char_field",
        "first_name_char_field",
        "patronymic_char_field",
        "image_field",
        "birth_datetime_field",
        "education_char_field",
        "experience_char_field",
        "sex_char_field",
        "contact_data_text_field",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "qualification_char_field",
            "last_name_char_field",
            "first_name_char_field",
            "patronymic_char_field",
            "image_field",
            "birth_datetime_field",
            "education_char_field",
            "experience_char_field",
            "sex_char_field",
            "contact_data_text_field",
        )}),
    )
    search_fields = [
        "qualification_char_field",
        "last_name_char_field",
        "first_name_char_field",
        "patronymic_char_field",
        "image_field",
        "birth_datetime_field",
        "education_char_field",
        "experience_char_field",
        "sex_char_field",
        "contact_data_text_field",
    ]


admin.site.register(backend_models.ResumeModel, ResumeModelAdmin)
