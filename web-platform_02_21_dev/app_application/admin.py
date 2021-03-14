from django.contrib import admin
from .models import ApplicationModuleModel, ApplicationComponentModel


class ApplicationModuleModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'module_position', 'module_name', 'module_slug', 'module_image', 'module_description']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


class ApplicationComponentModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'component_Foreign', 'component_position', 'component_name', 'component_slug', 'component_image', 'component_description')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'component_Foreign', 'component_position', 'component_name', 'component_slug', 'component_image', 'component_description')
        # Поля, которые нужно отображать при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fieldsets')  
    # fields          = ('id',)
        # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора | Использовать либо эту настройку, либо 'fields')  
    # fieldsets       = (
    #                     ('Категория', {'fields': ('category_name',)}),
    #                     ('Префикс', {'fields': ('category_slug',)}),
    #                     ('Описание', {'fields': ('category_description',)}),
    #                 )
        # Поля, которые не нужно отображать при создании модели, на панели администратора |  
    # exclude         = ['id',]
        # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields   = ['id', 'component_Foreign', 'component_position', 'component_name', 'component_slug', 'component_image', 'component_description']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(ApplicationModuleModel, ApplicationModuleModelAdmin)
admin.site.register(ApplicationComponentModel, ApplicationComponentModelAdmin)
