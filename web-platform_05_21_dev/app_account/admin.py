from django.contrib import admin
from .models import AccountTemplateModel


class AccountTemplateModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1', 'template_addition_file_2')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1', 'template_addition_file_2')
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
    search_fields   = ['id', 'template_name', 'template_slug', 'template_description', 'template_addition_file_1', 'template_addition_file_2']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(AccountTemplateModel, AccountTemplateModelAdmin)

admin.site.site_header  = 'Панель управления'        # default: "Django Administration"
admin.site.index_title  = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title   = 'Админка'                  # default: "Django site admin"
