from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import ExampleModel, ApplicationModuleModel, ApplicationComponentModel, CategoryRationalModel, \
    CommentRationalModel, \
    LikeRationalModel, RationalModel, AccountTemplateModel, EmailModel, ContactModel, \
    DocumentModel, MessageModel, SmsModel, ArticleModel, CommentModel, CityModel, Profile, LoggingActions, \
    LoggingErrors, IdeasModel, IdeasCommentModel, IdeasLikeModel, IdeasCategoryModel


class ExampleModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('id',
                    'boolean_field',
                    'char_field', 'text_field',
                    'slug_field', 'email_field', 'url_field', 'ipaddress_field',
                    'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
                    'datetime_field', 'date_field', 'time_field', 'duration_field',
                    'file_field', 'image_field',
                    'foreignkey',
                    'binary_field')

    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('id',
                   'boolean_field',
                   'char_field', 'text_field',
                   'slug_field', 'email_field', 'url_field', 'ipaddress_field',
                   'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
                   'datetime_field', 'date_field', 'time_field', 'duration_field',
                   'file_field', 'image_field',
                   'foreignkey',
                   'binary_field')

    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)

    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    fieldsets = (
        ('boolean', {'fields': ('boolean_field',)}),
        ('string', {'fields': ('char_field', 'text_field',)}),
        ('specific string', {'fields': ('slug_field', 'email_field', 'url_field', 'ipaddress_field')}),
        ('integer and float', {'fields': ('integer_field', 'big_integer_field', 'positive_integer_field',
                                          'float_field', 'decimal_field')}),
        ('date and time', {'fields': ('datetime_field', 'date_field', 'time_field', 'duration_field',)}),
        ('file', {'fields': ('file_field', 'image_field')}),
        ('link', {'fields': ('foreignkey',)}),
        ('binary', {'fields': ('binary_field',)}),
    )

    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]

    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = ['id',
                     'boolean_field',
                     'char_field', 'text_field',
                     'slug_field', 'email_field', 'url_field', 'ipaddress_field',
                     'integer_field', 'big_integer_field', 'positive_integer_field', 'float_field', 'decimal_field',
                     'datetime_field', 'date_field', 'time_field', 'duration_field',
                     'file_field', 'image_field',
                     'foreignkey',
                     'binary_field']

    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


class ProfileModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('user', 'first_name', 'last_name', 'patronymic', 'personnel_number', 'email', 'workshop_service',
                    'department_site', 'position', 'category')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('user', 'first_name', 'last_name', 'patronymic', 'personnel_number', 'email', 'workshop_service',
                   'department_site', 'position', 'category')
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
    search_fields = ['user', 'first_name', 'last_name', 'patronymic', 'personnel_number', 'email', 'workshop_service',
                     'department_site', 'position', 'category']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


class LoggingActionsModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('username', 'ip', 'request_path', 'request_method', 'datetime_now')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('username', 'ip', 'request_path', 'request_method', 'datetime_now')
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
    search_fields = ['username', 'ip', 'request_path', 'request_method', 'datetime_now']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


class LoggingErrorsModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = ('username', 'ip', 'request_path', 'request_method', 'datetime_now', 'error')
    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = ('username', 'ip', 'request_path', 'request_method', 'datetime_now', 'error')
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
    search_fields = ['username', 'ip', 'request_path', 'request_method', 'datetime_now', 'error']
    # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора
    # inlines         = [RationalModelInline]


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


# main
admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Админка'  # default: "Django site admin"

# example
admin.site.register(ExampleModel, ExampleModelAdmin)

# profile
admin.site.register(Profile, ProfileModelAdmin)

# logging
admin.site.register(LoggingActions, LoggingActionsModelAdmin)
admin.site.register(LoggingErrors, LoggingErrorsModelAdmin)

# module
admin.site.register(ApplicationModuleModel, ApplicationModuleModelAdmin)
admin.site.register(ApplicationComponentModel, ApplicationComponentModelAdmin)

# ideas
admin.site.register(IdeasModel, BankIdeasModelAdmin)
admin.site.register(IdeasCategoryModel, IdeasCategoryModelAdmin)
admin.site.register(IdeasCommentModel, IdeasCommentModelAdmin)
admin.site.register(IdeasLikeModel, IdeasLikeModelAdmin)

# rational
admin.site.register(CategoryRationalModel, CategoryRationalAdmin)
admin.site.register(CommentRationalModel, CommentRationalAdmin)
admin.site.register(LikeRationalModel, LikeRationalAdmin)
admin.site.register(RationalModel, RationalModelAdmin)

# extra
admin.site.register(AccountTemplateModel, AccountTemplateModelAdmin)
admin.site.register(DocumentModel, DocumentModelAdmin)
admin.site.register(MessageModel, MessageModelAdmin)
admin.site.register(ContactModel, ContactModelAdmin)

admin.site.register(CityModel)
admin.site.register(CommentModel)
admin.site.register(SmsModel)
admin.site.register(EmailModel)
