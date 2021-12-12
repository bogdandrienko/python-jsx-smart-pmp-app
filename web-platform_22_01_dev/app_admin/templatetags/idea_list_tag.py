from django import template
from app_admin.models import IdeaRatingModel, UserModel
from app_admin.service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def is_liked_tag(context, idea):
    request = context['request']
    try:
        is_like = IdeaRatingModel.objects.get_or_create(
            author_foreign_key_field=UserModel.objects.get(user_one_to_one_field=request.user),
            idea_foreign_key_field=idea,
            status_boolean_field=True
        )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        is_like = False
    return is_like


@register.simple_tag(takes_context=True)
def is_disliked_tag(context, idea):
    request = context['request']
    try:
        is_dislike = IdeaRatingModel.objects.get_or_create(
            author_foreign_key_field=UserModel.objects.get(user_one_to_one_field=request.user),
            idea_foreign_key_field=idea,
            status_boolean_field=False
        )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        is_dislike = False
    return is_dislike
