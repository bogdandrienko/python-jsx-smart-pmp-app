from django import template
from ..models import IdeasLikeModel
from django.contrib.auth.models import User
from ..service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def is_liked_tag(context, like_idea):
    request = context['request']
    try:
        is_like = IdeasLikeModel.objects.get(
            like_author=User.objects.get(username=request.user.username),
            like_idea=like_idea,
            like_status=True
        )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        is_like = False
    return is_like


@register.simple_tag(takes_context=True)
def is_disliked_tag(context, like_idea):
    request = context['request']
    try:
        is_dislike = IdeasLikeModel.objects.get(
            like_author=User.objects.get(username=request.user.username),
            like_idea=like_idea,
            like_status=False
        )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        is_dislike = False
    return is_dislike
