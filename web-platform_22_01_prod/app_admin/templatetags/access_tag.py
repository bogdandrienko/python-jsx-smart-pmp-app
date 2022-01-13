from django import template
from django.contrib.auth.models import User
from app_admin.models import UserModel, GroupModel, ActionModel
from app_admin.service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def access_tag(context, path):
    access = False
    request = context['request']
    if request.user.is_authenticated is False:
        return False
    try:
        user = User.objects.get(username=request.user.username)
        if user.is_superuser:
            return True
        user = UserModel.objects.get(user_foreign_key_field=request.user)
        if user and path:
            action = ActionModel.objects.get(name_slug_field=path)
            if action:
                groups = GroupModel.objects.filter(
                    user_many_to_many_field=user,
                    action_many_to_many_field=action
                )
                if groups:
                    access = True
    except Exception as error:
        pass
    if access:
        return True
    else:
        return False
