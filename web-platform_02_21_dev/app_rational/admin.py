from django.contrib import admin
from .models import CategoryRationalModel, CommentRationalModel, LikeRationalModel, RationalModel


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
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'category_name', 'category_slug', 'category_description')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'category_name', 'category_slug', 'category_description')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    fieldsets       = (
                        ('Категория', {'fields': ('category_name',)}),
                        ('Префикс', {'fields': ('category_slug',)}),
                        ('Описание', {'fields': ('category_description',)}),
                    )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'category_name', 'category_slug', 'category_description']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


class CommentRationalAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'comment_article', 'comment_author', 'comment_text', 'comment_date')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'comment_article', 'comment_author', 'comment_text', 'comment_date')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    fieldsets       = (
                        ('Статья', {'fields': ('comment_article',)}),
                        ('Автор', {'fields': ('comment_author',)}),
                        ('Текст', {'fields': ('comment_text',)}),
                    )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'comment_text', 'comment_date']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


class LikeRationalAdmin(admin.ModelAdmin):
    """Настройки 'LikeRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'like_article', 'like_author', 'like_status', 'like_date')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'like_article', 'like_author', 'like_status', 'like_date')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    fieldsets       = (
                        ('Статья', {'fields': ('like_article',)}),
                        ('Автор', {'fields': ('like_author',)}),
                        ('Рейтинг', {'fields': ('like_status',)}),
                    )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'like_status', 'like_date']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


class RationalModelAdmin(admin.ModelAdmin):
    """Настройки 'RationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'rational_structure_from', 'rational_uid_registrated', 'rational_date_registrated', 'rational_name', 'rational_place_innovation', 'rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3', 'rational_resolution', 'rational_date_certification', 'rational_category', 'rational_autor_name', 'rational_date_create', 'rational_addition_image', 'rational_status')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'rational_structure_from', 'rational_uid_registrated', 'rational_date_registrated', 'rational_name', 'rational_place_innovation', 'rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3', 'rational_resolution', 'rational_date_certification', 'rational_category', 'rational_autor_name', 'rational_date_create', 'rational_addition_image', 'rational_status')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    fieldsets       = (
                        ('Даты и время', {'fields': (('rational_date_registrated', 'rational_date_certification'),)}),
                        ('Основное', {'fields': ('rational_structure_from', 'rational_uid_registrated', 'rational_name', 'rational_place_innovation', 'rational_resolution', 'rational_status',)}),
                        ('Массивная информация', {'fields': ('rational_description', 'rational_offering_members', 'rational_conclusion', 'rational_change_documentations', 'rational_responsible_members',)}),
                        ('Вспомогательное', {'fields': (('rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3',), 'rational_addition_image',)}),
                        ('Связанные', {'fields': (('rational_autor_name', 'rational_category'),)}),
                    )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'rational_structure_from', 'rational_uid_registrated', 'rational_date_registrated', 'rational_name', 'rational_place_innovation', 'rational_description', 'rational_addition_file_1', 'rational_addition_file_2', 'rational_addition_file_3', 'rational_offering_members', 'rational_conclusion', 'rational_change_documentations', 'rational_resolution', 'rational_responsible_members', 'rational_date_certification', 'rational_date_create', 'rational_addition_image', 'rational_status']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    inlines         = [CommentRationalInline, LikeRationalInline]


admin.site.register(CategoryRationalModel, CategoryRationalAdmin)
admin.site.register(CommentRationalModel, CommentRationalAdmin)
admin.site.register(LikeRationalModel, LikeRationalAdmin)
admin.site.register(RationalModel, RationalModelAdmin)
