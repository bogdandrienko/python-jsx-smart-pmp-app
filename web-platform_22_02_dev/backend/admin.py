from django.contrib import admin

from backend import models as backend_models

admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Администрирование'  # default: "Django site admin"


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


admin.site.register(backend_models.ExamplesModel, ExamplesModelAdmin)


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


admin.site.register(backend_models.LoggingModel, LoggingModelAdmin)


class ModulesModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ModuleOrComponentModel' на панели администратора
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


admin.site.register(backend_models.ModulesModel, ModulesModelAdmin)


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
    list_filter = (
        'user_foreign_key_field',
        'password_slug_field',
        'activity_boolean_field',
        'email_field',
        'secret_question_char_field',
        'secret_answer_char_field',
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


admin.site.register(backend_models.ActionModel, ActionModelAdmin)


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


admin.site.register(backend_models.GroupModel, GroupModelAdmin)


class NotificationModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'NotificationModel' на панели администратора
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


admin.site.register(backend_models.NotificationModel, NotificationModelAdmin)


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


admin.site.register(backend_models.ChatModel, ChatModelAdmin)


class NoteModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'NoteModel' на панели администратора
    """

    list_display = (
        'user',
        'body',
    )
    list_filter = (
        'user',
        'body',
    )
    fieldsets = (
        ('Text', {'fields': (
            'user', 'body',
        )}),
    )
    search_fields = [
        'user',
        'body',
    ]


admin.site.register(backend_models.NoteModel, NoteModelAdmin)


class TaskModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'TaskModel' на панели администратора
    """

    list_display = (
        'user', 'title', 'decription', 'complete',
    )
    list_filter = (
        'user', 'title', 'decription', 'complete', 'update', 'create',
    )
    fieldsets = (
        ('Text', {'fields': (
            'user', 'title', 'decription', 'complete',
        )}),
    )
    search_fields = [
        'user', 'title', 'decription', 'complete', 'update', 'create',
    ]


admin.site.register(backend_models.TaskModel, TaskModelAdmin)

# class ProductModelAdmin(admin.ModelAdmin):
#     """
#     Настройки отображения, фильтрации и поиска модели:'ProductModel' на панели администратора
#     """
#
#     list_display = (
#         'user', 'name', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock',
#         'createdAt', '_id',
#     )
#     list_filter = (
#         'user', 'name', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock',
#         'createdAt', '_id',
#     )
#     fieldsets = (
#         ('Text', {'fields': (
#             'user', 'name', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock',
#             'createdAt', '_id',
#         )}),
#     )
#     search_fields = [
#         'user', 'name', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock',
#         'createdAt', '_id',
#     ]


admin.site.register(backend_models.ProductModel)
admin.site.register(backend_models.ReviewModel)
admin.site.register(backend_models.OrderModel)
admin.site.register(backend_models.OrderItemModel)
admin.site.register(backend_models.ShippingAddressModel)
