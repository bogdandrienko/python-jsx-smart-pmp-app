from django import template
from app_admin.models import IdeaRatingModel, UserModel, IdeaModel

register = template.Library()


@register.simple_tag(takes_context=True)
def is_liked_tag(context, idea):
    request = context['request']
    try:
        is_like = IdeaRatingModel.objects.get(
            author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
            idea_foreign_key_field=IdeaModel.objects.get(id=idea),
            status_boolean_field=True
        )
        is_like = True
    except Exception as error:
        is_like = False
    return is_like


@register.simple_tag(takes_context=True)
def is_disliked_tag(context, idea):
    request = context['request']
    try:
        is_dislike = IdeaRatingModel.objects.get(
            author_foreign_key_field=UserModel.objects.get(user_foreign_key_field=request.user),
            idea_foreign_key_field=IdeaModel.objects.get(id=idea),
            status_boolean_field=False
        )
        is_dislike = True
    except Exception as error:
        is_dislike = False
    return is_dislike
