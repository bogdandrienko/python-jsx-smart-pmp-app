from django import template
from django.contrib.auth.models import User, Group
from app_admin.models import UserModel, GroupModel, ActionModel
from app_admin.service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def access_tag(context, path):
    access = False
    request = context['request']
    try:
        user = User.objects.get(username=request.user.username)
        if user.is_superuser:
            access = True
            path = False
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
        pass
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    if access:
        return True
    else:
        return False
