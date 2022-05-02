from django import template

from backend import models as backend_models
from backend_native import models


register = template.Library()


@register.simple_tag(takes_context=True)
def is_liked_tag(context, idea):
    request = context['request']
    try:
        models.IdeaTestRatingModel.objects.get(
            author=backend_models.UserModel.objects.get(user=request.user),
            idea_foreign_key_field=models.IdeaTestModel.objects.get(id=idea),
            status_boolean_field=True
        )
        is_like = True
    except Exception as error:
        print(error)
        is_like = False
    return is_like


@register.simple_tag(takes_context=True)
def is_disliked_tag(context, idea):
    request = context['request']
    try:
        models.IdeaTestRatingModel.objects.get(
            author=backend_models.UserModel.objects.get(user=request.user),
            idea_foreign_key_field=models.IdeaTestModel.objects.get(id=idea),
            status_boolean_field=False
        )
        is_dislike = True
    except Exception as error:
        print(error)
        is_dislike = False
    return is_dislike
