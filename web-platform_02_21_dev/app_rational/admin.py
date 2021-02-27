from django.contrib import admin
from .models import RationalModel, CategoryRationalModel, CommentRationalModel, LikeRationalModel

admin.site.register(RationalModel)
admin.site.register(CategoryRationalModel)
admin.site.register(CommentRationalModel)
admin.site.register(LikeRationalModel)
