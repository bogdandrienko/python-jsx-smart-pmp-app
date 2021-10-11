from django import template
from ..models import LikeRationalModel
from django.contrib.auth.models import User


register = template.Library()


@register.simple_tag(takes_context=True)
def is_liked_tag(context, like_article):
    request = context['request']
    try:
        is_like = LikeRationalModel.objects.get(like_article=like_article,
                                                like_author=User.objects.get(id=request.user.id), like_status=True)
    except Exception as ex:
        print(ex)
        is_like = False
    return is_like


@register.simple_tag(takes_context=True)
def is_disliked_tag(context, like_article):
    request = context['request']
    try:
        is_dislike = LikeRationalModel.objects.get(like_article=like_article,
                                                   like_author=User.objects.get(id=request.user.id), like_status=False)
    except Exception as ex:
        print(ex)
        is_dislike = False
    return is_dislike
