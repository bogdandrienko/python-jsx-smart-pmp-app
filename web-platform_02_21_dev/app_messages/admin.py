from django.contrib import admin
from .models import MessageModel


class MessageModelAdmin(admin.ModelAdmin):
    """Настройки 'CommentRationalModel' на панели администратора"""
        # Поля, которые нужно отображать в заголовке, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_display    = ('id', 'message_name', 'message_slug', 'message_description', 'message_addition_file_1', 'message_addition_file_2')
        # Поля, которые нужно отображать при фильтрации, на панели администратора | Не включать массивные поля(Описание, ckeditor...)
    list_filter     = ('id', 'message_name', 'message_slug', 'message_description', 'message_addition_file_1', 'message_addition_file_2')
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
    search_fields   = ['id', 'message_name', 'message_slug', 'message_description', 'message_addition_file_1', 'message_addition_file_2']
        # Поля, которые нужно добавлять связанныеми при создании модели, на панели администратора | Включать только связанные поля для этой модели(ForeignKey...)
    # inlines         = [RationalModelInline]


admin.site.register(MessageModel, MessageModelAdmin)
