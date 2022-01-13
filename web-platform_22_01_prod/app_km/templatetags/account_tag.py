from django import template
from django.contrib.auth.models import User
from ..models import GroupModel
from ..service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def account_tag(context, path):
    request = context['request']
    user = User.objects.get(username=request.user.username)
    groups = GroupModel.objects.filter(user_many_to_many_field=user)
    access = False
    for group in groups:
        try:
            pages = [str(x).strip().lower() for x in
                     str(group.path_text_field).strip().split(',') if len(x) >= 1]
        except Exception as error:
            pages = [str(group.path_text_field).strip()]
        try:
            pages.index(path.strip().lower())
            access = True
            break
        except Exception as error:
            pass
    if access:
        return True
    else:
        return False
