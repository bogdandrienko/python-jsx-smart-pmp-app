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


# TODO example #########################################################################################################

class ExamplesModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ExamplesModel' на панели администратора
    """

    # form = ExamplesModelForm

    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = (
        'binary_field',
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
        'foreign_key_field',
        'one_to_one_field',
    )

    # Поля, которые отображаются как ссылки для перехода в детали модели
    list_display_links = (
        'binary_field',
        'boolean',
    )

    # Поля, которые можно редактировать прям из общего списка
    list_editable = (
        'text',
        'slug',
    )

    # Поля, которые отображаются как поле "группы" в пользователе, для моделей many_to_many_field
    filter_horizontal = ('many_to_many_field',)

    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = (
        'binary_field',
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
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
            'boolean',
            'null_boolean',
        )}),
        ('char_data', {'fields': (
            'char',
            'text',
            'slug',
            'email',
            'url_field',
            'genericipaddress_field',
        )}),
        ('numeric_data', {'fields': (
            'integer',
            'big_integer',
            'positive_integer',
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
            'image',
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
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
        'foreign_key_field',
        'one_to_one_field',
        'many_to_many_field',
    ]

    # Поля, которые нужно добавлять связанными при создании модели, на панели администратора
    # inlines         = [ExamplesModelInline]


admin.site.register(backend_models.ExamplesModel, ExamplesModelAdmin)


# TODO main ############################################################################################################

# TODO profile #########################################################################################################

class UserModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'UserModel' на панели администратора
    """

    # list_display = (
    #     'user',
    # )
    # list_display_links = (
    #     'user',
    # )
    # list_editable = (
    #     'user',
    # )
    # list_filter = (
    #     'user',
    # )
    # filter_horizontal = (
    #     'users',
    # )
    # fieldsets = (
    #     ('Основное', {'fields': (
    #         'user',
    #     )}),
    # )
    # search_fields = [
    #     'user',
    # ]

    list_display = (
        'user',
        'password',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    )
    list_display_links = (
        'user',
        'password',
        'last_name',
        'first_name',
        'patronymic',
    )
    list_editable = (
        'is_active_account',
    )
    list_filter = (
        'user',
        'password',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    )
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user',
            'password',
            'is_active_account',
            'email',
            'secret_question',
            'secret_answer',
            'is_temp_password',
            'last_name',
            'first_name',
            'patronymic',
            'personnel_number',
            'subdivision',
            'workshop_service',
            'department_site',
            'position',
            'category',
            'education',
            'achievements',
            'biography',
            'hobbies',
            'image',
        )}),
    )
    search_fields = [
        'user',
        'password',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    ]


admin.site.register(backend_models.UserModel, UserModelAdmin)


class TokenModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'LoggingModel' на панели администратора
    """

    list_display = (
        'user',
        'token',
        'created',
        'updated'
    )
    list_display_links = (
        'user',
        'token',
        'created'
    )
    list_editable = (
        'updated',
    )
    list_filter = (
        'user',
        'token',
        'created',
        'updated'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user',
            'token',
            'created',
            'updated'
        )}),
    )
    search_fields = [
        'user',
        'token',
        'created',
        'updated'
    ]


admin.site.register(backend_models.TokenModel, TokenModelAdmin)


class ActionModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ActionModel' на панели администратора
    """

    list_display = (
        'action',
    )
    list_display_links = (
        'action',
    )
    list_editable = (
    )
    list_filter = (
        'action',
    )
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'action',
        )}),
    )
    search_fields = [
        'action',
    ]


admin.site.register(backend_models.ActionModel, ActionModelAdmin)


class GroupModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'GroupModel' на панели администратора
    """

    list_display = (
        'name',
    )
    list_display_links = (
        'name',
    )
    list_editable = (
    )
    list_filter = (
        'name',
        'users',
        'actions',
    )
    filter_horizontal = (
        'users',
        'actions',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'name',
            'users',
            'actions',
        )}),
    )
    search_fields = [
        'name',
        'users',
        'actions',
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
        'type',
        'char',
        'slug',
        'text',
        'integer',
        'float',
        'boolean',
        'created',
    )
    list_display_links = (
        'type',
        'char',
        'slug',
    )
    list_editable = (
        'boolean',
    )
    list_filter = (
        'type',
        'char',
        'slug',
        'text',
        'integer',
        'float',
        'boolean',
        'created',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'type',
            'char',
            'slug',
            'text',
            'integer',
            'float',
            'boolean',
            'created',
        )}),
    )
    search_fields = [
        'type',
        'char',
        'slug',
        'text',
        'integer',
        'float',
        'boolean',
        'created',
    ]


admin.site.register(backend_models.SettingsModel, SettingsModelAdmin)


class LoggingModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'LoggingModel' на панели администратора
    """

    list_display = (
        'username',
        'ip',
        'path',
        'method',
        'error',
        'created'
    )
    list_display_links = (
        'username',
        'ip',
        'path',
        'method',
    )
    list_editable = (
    )
    list_filter = (
        'username',
        'ip',
        'path',
        'method',
        'error',
        'created'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'username',
            'ip',
            'path',
            'method',
            'error',
            'created',
        )}),
    )
    search_fields = [
        'username',
        'ip',
        'path',
        'method',
        'error',
        'created'
    ]


admin.site.register(backend_models.LoggingModel, LoggingModelAdmin)


class NotificationModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'IdeaModel' на панели администратора
    """

    list_display = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    )
    list_display_links = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
    )
    list_editable = (
        "is_visible",
    )
    list_filter = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    )
    fieldsets = (
        ("Основное", {"fields": (
            "author",
            "target_group_model",
            "target_user_model",
            "name",
            "place",
            "description",
            "is_visible",
            "created",
            "updated",
        )}),
    )
    search_fields = [
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    ]


admin.site.register(backend_models.NotificationModel, NotificationModelAdmin)


# TODO progress ########################################################################################################

class IdeaModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'IdeaModel' на панели администратора
    """

    list_display = (
        "author",
        "subdivision",
        "sphere",
        "category",
        "image",
        "name",
        "place",
        "description",
        "moderate_status",
        "moderate_author",
        "moderate_comment",
        "created",
        "updated",
    )
    list_display_links = (
        "author",
    )
    list_editable = (
        "moderate_status",
        "subdivision",
        "sphere",
        "category",
        "updated",
    )
    list_filter = (
        "author",
        "moderate_status",
        "subdivision",
        "sphere",
        "category",
        "image",
        "name",
        "place",
        "description",

        "moderate_author",
        "moderate_comment",

        "created",
        "updated",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author",
            "moderate_status",
            "subdivision",
            "sphere",
            "category",
            "image",
            "name",
            "place",
            "description",
            "moderate_author",
            "moderate_comment",
            "created",
            "updated",
        )}),
    )
    search_fields = [
        "author",
        "moderate_status",
        "subdivision",
        "sphere",
        "category",
        "image",
        "name",
        "place",
        "description",

        "moderate_author",
        "moderate_comment",

        "created",
        "updated",
    ]


admin.site.register(backend_models.IdeaModel, IdeaModelAdmin)


class IdeaRatingModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'RatingIdeaModel' на панели администратора
    """

    list_display = (
        "idea",
        "author",
        "rating",
        "created",
    )
    list_display_links = (
        "idea",
        "author",
    )
    list_editable = (
        "rating",
    )
    list_filter = (
        "idea",
        "author",
        "rating",
        "created",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "idea",
            "author",
            "rating",
        )}),
        ("Дополнительные данные", {"fields": (
            "created",
        )}),
    )
    search_fields = [
        "idea",
        "author",
        "rating",
        "created",
    ]


admin.site.register(backend_models.IdeaRatingModel, IdeaRatingModelAdmin)


class IdeaCommentModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'CommentIdeaModel' на панели администратора
    """

    list_display = (
        "idea",
        "author",
        "comment",
        "created",
    )
    list_display_links = (
        "idea",
        "author",
    )
    list_editable = (
        "comment",
    )
    list_filter = (
        "idea",
        "author",
        "comment",
        "created",
    )
    fieldsets = (
        ("Основное", {"fields": (
            "idea",
            "author",
            "comment",
        )}),
        ("Дополнительные данные", {"fields": (
            "created",
        )}),
    )
    search_fields = [
        "idea",
        "author",
        "comment",
        "created",
    ]


admin.site.register(backend_models.IdeaCommentModel, IdeaCommentModelAdmin)


# TODO buhgalteria #####################################################################################################

# TODO sup #############################################################################################################

# TODO moderator #######################################################################################################

# TODO develop #########################################################################################################

class RationalModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'RationalModel' на панели администратора
    """

    list_display = (
        "author",
        "register_number",
        "moderate_status",
        "subdivision",
        "category",
        "image",
        "name",
        "place",
        "description",
        "additional_word",
        "additional_pdf",
        "additional_excel",
        "author_1",
        "author_1_percent",
        "author_2",
        "author_2_percent",
        "author_3",
        "author_3_percent",
        "author_4",
        "author_4_percent",
        "author_5",
        "author_5_percent",

        "premoderate_author",
        "premoderate_comment",
        "postmoderate_author",
        "postmoderate_comment",

        "created",
        "updated",
    )
    list_display_links = (
        "author",
        "register_number",
    )
    list_editable = (
        "moderate_status",
        "subdivision",
        "category",
    )
    list_filter = (
        "author",
        "register_number",
        "moderate_status",
        "subdivision",
        "category",
        "image",
        "name",
        "place",
        "description",
        "additional_word",
        "additional_pdf",
        "additional_excel",
        "author_1",
        "author_1_percent",
        "author_2",
        "author_2_percent",
        "author_3",
        "author_3_percent",
        "author_4",
        "author_4_percent",
        "author_5",
        "author_5_percent",

        "premoderate_author",
        "premoderate_comment",
        "postmoderate_author",
        "postmoderate_comment",

        "created",
        "updated",
    )
    fieldsets = (
        ("Основная информация", {"fields": (
            "author",
            "register_number",
            "moderate_status",
            "subdivision",
            "category",
            "image",
            "name",
            "place",
            "description",
            "additional_word",
            "additional_pdf",
            "additional_excel",
            "author_1",
            "author_1_percent",
            "author_2",
            "author_2_percent",
            "author_3",
            "author_3_percent",
            "author_4",
            "author_4_percent",
            "author_5",
            "author_5_percent",
        )}),
        ("Предмодерация", {"fields": (
            "premoderate_author",
            "premoderate_comment",
        )}),
        ("Постмодерация", {"fields": (
            "postmoderate_author",
            "postmoderate_comment",
        )}),
        ("Дополнительные данные", {"fields": (
            "created",
            "updated",
        )}),
    )
    search_fields = [
        "author",
        "register_number",
        "moderate_status",
        "subdivision",
        "category",
        "image",
        "name",
        "place",
        "description",
        "additional_word",
        "additional_pdf",
        "additional_excel",
        "author_1",
        "author_1_percent",
        "author_2",
        "author_2_percent",
        "author_3",
        "author_3_percent",
        "author_4",
        "author_4_percent",
        "author_5",
        "author_5_percent",

        "premoderate_author",
        "premoderate_comment",
        "postmoderate_author",
        "postmoderate_comment",

        "created",
        "updated",
    ]


admin.site.register(backend_models.RationalModel, RationalModelAdmin)
