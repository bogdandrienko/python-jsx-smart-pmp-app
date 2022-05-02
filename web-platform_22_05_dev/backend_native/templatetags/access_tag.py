from django import template
from django.contrib.auth.models import User

from backend import models as backend_models


register = template.Library()


@register.simple_tag(takes_context=True)
def access_tag(context, path):
    return True
    access = False
    request = context['request']
    if request.user.is_authenticated is False:
        return False
    try:
        user = User.objects.get(username=request.user.username)
        if user.is_superuser:
            return True
        user = backend_models.UserModel.objects.get(user=request.user)
        if user and path:
            action = backend_models.ActionModel.objects.get(name_slug_field=path)
            if action:
                groups = backend_models.GroupModel.objects.filter(
                    user_many_to_many_field=user,
                    action_many_to_many_field=action
                )
                if groups:
                    access = True
    except Exception as error:
        print(error)
        pass
    if access:
        return True
    else:
        return False
