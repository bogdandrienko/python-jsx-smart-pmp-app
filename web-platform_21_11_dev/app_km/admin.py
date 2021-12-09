from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import ExamplesModel, ApplicationModuleModel, ApplicationComponentModel, CategoryRationalModel, \
    CommentRationalModel, ActionModel, GroupModel, LikeRationalModel, RationalModel, AccountTemplateModel, EmailModel, \
    ContactModel, DocumentModel, MessageModel, SmsModel, ArticleModel, CommentModel, CityModel, UserModel, \
    LoggingModel, IdeasModel, IdeasCommentModel, IdeasLikeModel, IdeasCategoryModel, ProjectsModel
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from django.contrib.auth.models import User, Group
from django.contrib import admin
# from .forms import CustomUserCreationForm, CustomUserChangeForm
# from .models import CustomUser

# admin
admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Админка'  # default: "Django site admin"
from django import forms
from django.contrib import admin
from ckeditor.widgets import CKEditorWidget

from .models import Post

class PostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = Post
        fields = '__all__'

class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm

admin.site.register(Post, PostAdmin)

# class CustomUserAdmin(UserAdmin):
#     add_form = CustomUserCreationForm
#     form = CustomUserChangeForm
#     model = CustomUser
#     list_display = ('email', 'is_staff', 'is_active',)
#     list_filter = ('email', 'is_staff', 'is_active',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
#          ),
#     )
#     search_fields = ('email',)
#     ordering = ('email',)


# admin.site.register(CustomUser, CustomUserAdmin)


# Example
class ExamplesModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""

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


# # User
# class UserModelAdmin(admin.ModelAdmin):
#     """Настройки 'CommentRationalModel' на панели администратора"""
#     list_display = (
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     )
#     list_filter = (
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     )
#     fieldsets = (
#         ('Данные авторизации пользователя', {'fields': (
#             'user_one_to_one_field',
#             'password_slug_field',
#         )}),
#         ('Технические данные пользователя', {'fields': (
#             'activity_boolean_field',
#             'email_field',
#             'secret_question_char_field',
#             'secret_answer_char_field',
#         )}),
#         ('Первичные данные пользователя', {'fields': (
#             'last_name_char_field',
#             'first_name_char_field',
#             'patronymic_char_field',
#         )}),
#         ('Вторичные данные пользователя', {'fields': (
#             'personnel_number_slug_field',
#             'subdivision_char_field',
#             'workshop_service_char_field',
#             'department_site_char_field',
#             'position_char_field',
#             'category_char_field',
#         )}),
#         ('Личные данные пользователя', {'fields': (
#             'education_text_field',
#             'achievements_text_field',
#             'biography_text_field',
#             'hobbies_text_field',
#             'image_field',
#         )}),
#     )
#     search_fields = [
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     ]
#
#
# # Добавление вертикального поля для стандартного пользователя
# class UserModelAdminInline(admin.StackedInline):
#     model = UserModel
#     list_display = (
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     )
#     list_filter = (
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     )
#     fieldsets = (
#         ('Данные авторизации пользователя', {'fields': (
#             'user_one_to_one_field',
#             'password_slug_field',
#         )}),
#         ('Технические данные пользователя', {'fields': (
#             'activity_boolean_field',
#             'email_field',
#             'secret_question_char_field',
#             'secret_answer_char_field',
#         )}),
#         ('Первичные данные пользователя', {'fields': (
#             'last_name_char_field',
#             'first_name_char_field',
#             'patronymic_char_field',
#         )}),
#         ('Вторичные данные пользователя', {'fields': (
#             'personnel_number_slug_field',
#             'subdivision_char_field',
#             'workshop_service_char_field',
#             'department_site_char_field',
#             'position_char_field',
#             'category_char_field',
#         )}),
#         ('Личные данные пользователя', {'fields': (
#             'education_text_field',
#             'achievements_text_field',
#             'biography_text_field',
#             'hobbies_text_field',
#             'image_field',
#         )}),
#     )
#     search_fields = [
#         # authorization data
#         'user_one_to_one_field',
#         'password_slug_field',
#         # technical data
#         'activity_boolean_field',
#         'email_field',
#         'secret_question_char_field',
#         'secret_answer_char_field',
#         # first data
#         'last_name_char_field',
#         'first_name_char_field',
#         'patronymic_char_field',
#         # second data
#         'personnel_number_slug_field',
#         'subdivision_char_field',
#         'workshop_service_char_field',
#         'department_site_char_field',
#         'position_char_field',
#         'category_char_field',
#         # personal data
#         'education_text_field',
#         'achievements_text_field',
#         'biography_text_field',
#         'hobbies_text_field',
#         'image_field',
#     ]
#
#
# # Переопределение встроенной админ-панели пользователей
# class UserModelUserAdmin(UserAdmin):
#     save_on_top = True
#     # exclude = ['groups']
#     inlines = [UserModelAdminInline]
#
#
# # Регистрация в админ-панели собственной расширенной модели пользователей
# admin.site.register(UserModel, UserModelAdmin)
# # Отключение регистрации встроенной админ-панели пользователей
# admin.site.unregister(User)
# # Регистрация в админ-панели расширения для встроенных пользователей
# admin.site.register(User, UserModelUserAdmin)


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
    list_display = ('name_char_field', 'name_slug_field', 'path_text_field', 'group_one_to_one_field')
    list_filter = ('name_char_field', 'name_slug_field', 'path_text_field', 'path_many_to_many_field',
                   'user_many_to_many_field', 'group_one_to_one_field')
    filter_horizontal = ('path_many_to_many_field', 'user_many_to_many_field')
    fieldsets = (
        ('Имя отображения', {'fields': ('name_char_field',)}),
        ('Имя валидации', {'fields': ('name_slug_field',)}),
        ('Имя пути', {'fields': ('path_text_field',)}),
        ('Пользователи', {'fields': ('user_many_to_many_field', 'path_many_to_many_field', 'group_one_to_one_field')}),
    )
    search_fields = ['name_char_field', 'name_slug_field', 'path_text_field', 'user_many_to_many_field',
                     'path_many_to_many_field', 'group_one_to_one_field']


# Добавление вертикального поля для стандартных групп
class GroupModelAdminInline(admin.StackedInline):
    model = GroupModel
    list_display = ('name_char_field', 'name_slug_field', 'path_text_field', 'group_one_to_one_field')
    list_filter = ('name_char_field', 'name_slug_field', 'path_text_field', 'path_many_to_many_field',
                   'user_many_to_many_field', 'group_one_to_one_field')
    filter_horizontal = ('path_many_to_many_field', 'user_many_to_many_field')
    fieldsets = (
        ('Имя отображения', {'fields': ('name_char_field',)}),
        ('Имя валидации', {'fields': ('name_slug_field',)}),
        ('Имя пути', {'fields': ('path_text_field',)}),
        ('Пользователи', {'fields': ('user_many_to_many_field', 'path_many_to_many_field', 'group_one_to_one_field')}),
    )
    search_fields = ['name_char_field', 'name_slug_field', 'path_text_field', 'user_many_to_many_field',
                     'path_many_to_many_field', 'group_one_to_one_field']


# Переопределение встроенной админ-панели групп
class GroupModelGroupAdmin(GroupAdmin):
    save_on_top = True
    inlines = [GroupModelAdminInline]


# Регистрация в админ-панели собственной расширенной модели групп
admin.site.register(GroupModel, GroupModelAdmin)
# Отключение регистрации встроенной админ-панели группы доступа
admin.site.unregister(Group)
# Регистрация в админ-панели расширения для встроенных групп
admin.site.register(Group, GroupModelGroupAdmin)


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
class ApplicationModuleModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


class ApplicationComponentModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = (
        'id', 'component_Foreign', 'component_position', 'component_name', 'component_slug', 'component_image',
        'component_description')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = (
        'id', 'component_Foreign', 'component_position', 'component_name', 'component_slug', 'component_image',
        'component_description')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'component_Foreign', 'component_position', 'component_name', 'component_slug',
                     'component_image', 'component_description']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


# module
admin.site.register(ApplicationModuleModel, ApplicationModuleModelAdmin)
admin.site.register(ApplicationComponentModel, ApplicationComponentModelAdmin)


# ideas
class BankIdeasModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('user', 'name', 'category', 'short_description', 'long_description', 'image', 'document', 'status',
                    'datetime_register', 'datetime_created')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('user', 'name', 'category', 'short_description', 'long_description', 'image', 'document', 'status',
                   'datetime_register', 'datetime_created')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['user', 'name', 'category', 'short_description', 'long_description', 'image', 'document', 'status',
                     'datetime_register', 'datetime_created']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(IdeasModel, BankIdeasModelAdmin)


class IdeasCategoryModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('category_name', 'category_slug', 'category_description', 'category_image')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('category_name', 'category_slug', 'category_description', 'category_image')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['category_name', 'category_slug', 'category_description', 'category_image']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(IdeasCategoryModel, IdeasCategoryModelAdmin)


class IdeasCommentModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('comment_author', 'comment_idea', 'comment_text', 'comment_date')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('comment_author', 'comment_idea', 'comment_text', 'comment_date')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['comment_author', 'comment_idea', 'comment_text', 'comment_date']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(IdeasCommentModel, IdeasCommentModelAdmin)


class IdeasLikeModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('like_author', 'like_idea', 'like_status', 'like_date')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('like_author', 'like_idea', 'like_status', 'like_date')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['like_author', 'like_idea', 'like_status', 'like_date']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(IdeasLikeModel, IdeasLikeModelAdmin)


class ProjectsModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    list_display = ('name_char_field', 'name_slug_field', 'path_text_field',
                    'boolean_field', 'integer_field', 'float_field', 'datetime_field', 'file_field', 'image_field',
                    'foreign_key_field')
    list_filter = ('name_char_field', 'name_slug_field', 'path_text_field', 'path_many_to_many_field',
                   'user_many_to_many_field',
                   'boolean_field', 'integer_field', 'float_field', 'datetime_field', 'file_field', 'image_field',
                   'foreign_key_field')
    filter_horizontal = ('path_many_to_many_field', 'user_many_to_many_field')
    fieldsets = (
        ('Имя отображения', {'fields': ('name_char_field',)}),
        ('Имя валидации', {'fields': ('name_slug_field',)}),
        ('Имя пути', {'fields': ('path_text_field',)}),
        ('Пользователи', {'fields': ('user_many_to_many_field', 'path_many_to_many_field')}),
        ('Другое',
         {'fields': ('boolean_field', 'integer_field', 'float_field', 'datetime_field', 'file_field', 'image_field',
                     'foreign_key_field')}),
    )
    search_fields = ['name_char_field', 'name_slug_field', 'path_text_field', 'path_many_to_many_field',
                     'user_many_to_many_field',
                     'boolean_field', 'integer_field', 'float_field', 'datetime_field', 'file_field', 'image_field',
                     'foreign_key_field']


admin.site.register(ProjectsModel, ProjectsModelAdmin)


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
class CategoryRationalInline(admin.StackedInline):
    model = CategoryRationalModel
    extra = 1


class CommentRationalInline(admin.TabularInline):
    model = CommentRationalModel
    extra = 1


class LikeRationalInline(admin.TabularInline):
    model = LikeRationalModel
    extra = 1


class RationalModelInline(admin.StackedInline):
    model = RationalModel
    extra = 1


class CategoryRationalAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля.
    list_display = ('id', 'category_name', 'category_slug', 'category_description')
    # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля.
    list_filter = ('id', 'category_name', 'category_slug', 'category_description')
    # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку,
    # либо 'fieldsets')
    # fields          = ('id',) Поля, которые нужно отображать сгруппированно при создании модели,
    # на панели администратора | Использовать либо эту настройку, либо 'fields')
    fieldsets = (
        ('Категория', {'fields': ('category_name',)}),
        ('Префикс', {'fields': ('category_slug',)}),
        ('Описание', {'fields': ('category_description',)}),
    )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'category_name', 'category_slug', 'category_description']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только
    # связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(CategoryRationalModel, CategoryRationalAdmin)


class CommentRationalAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля.
    list_display = ('id', 'comment_article', 'comment_author', 'comment_text', 'comment_date')
    # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля.
    list_filter = ('id', 'comment_article', 'comment_author', 'comment_text', 'comment_date')
    # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку,
    # либо 'fieldsets')
    # fields          = ('id',) Поля, которые нужно отображать сгруппированно при создании модели,
    # на панели администратора | Использовать либо эту настройку, либо 'fields')
    fieldsets = (
        ('Статья', {'fields': ('comment_article',)}),
        ('Автор', {'fields': ('comment_author',)}),
        ('Текст', {'fields': ('comment_text',)}),
    )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'comment_text', 'comment_date']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только
    # связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(CommentRationalModel, CommentRationalAdmin)


class LikeRationalAdmin(admin.ModelAdmin):
    """Настройки 'LikeRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля.
    list_display = ('id', 'like_article', 'like_author', 'like_status', 'like_date')
    # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля.
    list_filter = ('id', 'like_article', 'like_author', 'like_status', 'like_date')
    # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку,
    # либо 'fieldsets')
    # fields          = ('id',) Поля, которые нужно отображать сгруппированно при создании модели,
    # на панели администратора | Использовать либо эту настройку, либо 'fields')
    fieldsets = (
        ('Статья', {'fields': ('like_article',)}),
        ('Автор', {'fields': ('like_author',)}),
        ('Рейтинг', {'fields': ('like_status',)}),
    )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'like_status', 'like_date']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только
    # связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(LikeRationalModel, LikeRationalAdmin)


class RationalModelAdmin(admin.ModelAdmin):
    """Настройки 'RationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля.
    list_display = (
        'id', 'rational_structure_from', 'rational_uid_registered', 'rational_date_registered', 'rational_name',
        'rational_place_innovation', 'rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3',
        'rational_resolution', 'rational_date_certification', 'rational_category', 'rational_author_name',
        'rational_date_create', 'rational_addition_image', 'rational_status'
    )
    # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля.
    list_filter = (
        'id', 'rational_structure_from', 'rational_uid_registered', 'rational_date_registered', 'rational_name',
        'rational_place_innovation', 'rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3',
        'rational_resolution', 'rational_date_certification', 'rational_category', 'rational_author_name',
        'rational_date_create', 'rational_addition_image', 'rational_status'
    )
    # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку,
    # либо 'fieldsets')
    # fields          = ('id',) Поля, которые нужно отображать сгруппированно при создании модели,
    # на панели администратора | Использовать либо эту настройку, либо 'fields')
    fieldsets = (
        ('Даты и время', {'fields': (('rational_date_registered', 'rational_date_certification'),)}),
        ('Основное', {'fields': (
            'rational_structure_from', 'rational_uid_registered', 'rational_name', 'rational_place_innovation',
            'rational_resolution', 'rational_status',)}),
        ('Массивная информация', {'fields': (
            'rational_description', 'rational_offering_members', 'rational_conclusion',
            'rational_change_documentations',
            'rational_responsible_members',)}),
        ('Вспомогательное', {'fields': (
            ('rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3',),
            'rational_addition_image',)}),
        ('Связанные', {'fields': (('rational_author_name', 'rational_category'),)}),
    )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'rational_structure_from', 'rational_uid_registered', 'rational_date_registered',
                     'rational_name', 'rational_place_innovation', 'rational_description', 'rational_addition_file_1',
                     'rational_addition_file_2', 'rational_addition_file_3', 'rational_offering_members',
                     'rational_conclusion', 'rational_change_documentations', 'rational_resolution',
                     'rational_responsible_members', 'rational_date_certification', 'rational_date_create',
                     'rational_addition_image', 'rational_status']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только
    # связанные поля для этой модели(ForeignKey...)
    inlines = [CommentRationalInline, LikeRationalInline]


admin.site.register(RationalModel, RationalModelAdmin)


class ArticleAdminForm(forms.ModelForm):
    """Форма с виджетом ckeditor"""
    article_text = forms.CharField(label="текст статьи", widget=CKEditorUploadingWidget())

    class Meta:
        model = ArticleModel
        fields = '__all__'


@admin.register(ArticleModel)
class ArticleAdmin(admin.ModelAdmin):
    """Новости"""
    form = ArticleAdminForm


class MessageModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id', 'message_name', 'message_slug', 'message_description')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id', 'message_name', 'message_slug', 'message_description')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'message_name', 'message_slug', 'message_description']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(MessageModel, MessageModelAdmin)


class DocumentModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id', 'document_name', 'document_slug', 'document_description', 'document_addition_file_1',
                    'document_addition_file_2')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id', 'document_name', 'document_slug', 'document_description', 'document_addition_file_1',
                   'document_addition_file_2')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'document_name', 'document_slug', 'document_description', 'document_addition_file_1',
                     'document_addition_file_2']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(DocumentModel, DocumentModelAdmin)


class ContactModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id', 'contact_name', 'contact_slug', 'contact_description', 'contact_image')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id', 'contact_name', 'contact_slug', 'contact_description', 'contact_image')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администраторао
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'contact_name', 'contact_slug', 'contact_description', 'contact_image']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(ContactModel, ContactModelAdmin)


class AccountTemplateModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1',
                    'template_addition_file_2')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1',
                   'template_addition_file_2')
    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)
    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
    # Поля, которые не нужно отображать при создании модели, на панели администратора
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1',
                     'template_addition_file_2']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


admin.site.register(AccountTemplateModel, AccountTemplateModelAdmin)


class AccountDataModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание,
    # ckeditor...)
    list_display = ('id', 'user_iin', 'firstname', 'lastname', 'patronymic', 'personnel_number', 'subdivision',
                    'workshop_service', 'department_site', 'position', 'category', 'mail', 'date_registered', 'group',
                    'status')
    # 'position', 'achievements',
    # 'biography', 'hobbies', 'mail', 'date_registered', 'secret_question'
    # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание,
    # ckeditor...)
    list_filter = ('id', 'user_iin', 'firstname', 'lastname', 'patronymic', 'position', 'mail', 'date_registered',
                   'group', 'status')
    # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку,
    # либо 'fieldsets')
    # fields          = ('id',)

    # Поля, которые нужно отображать сгруппированно при создании модели, на панели
    # администратора | Использовать либо эту настройку, либо 'fields')
    fieldsets = (
        ('Связанное поле', {'fields': ('username',)}),
        ('Основное', {'fields': ('user_iin', 'password', 'firstname', 'lastname', 'patronymic', 'personnel_number',
                                 'subdivision', 'workshop_service', 'department_site', 'position', 'category',)}),
        ('Вторичное', {'fields': ('education', 'achievements', 'biography', 'hobbies', 'image_avatar',)}),
        ('Вспомогательное', {'fields': ('mail', 'secret_question', 'group', 'status',)}),
    )

    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]
    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id', 'user_iin', 'firstname', 'lastname', 'patronymic', 'position', 'mail', 'date_registered',
                     'group', 'status']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только
    # связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(CityModel)
admin.site.register(CommentModel)
admin.site.register(SmsModel)
admin.site.register(EmailModel)
