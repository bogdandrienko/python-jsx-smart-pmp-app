from django import template
from ..models import UserModel, GroupModel, ActionModel
from app_admin.utils.service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def account_tag(context, path):
    access = False
    request = context['request']
    try:
        user = UserModel.objects.get(user_one_to_one_field=request.user)
        if user:
            action = ActionModel.objects.get(name_slug_field=path)
            if action:
                groups = GroupModel.objects.filter(
                    user_many_to_many_field=user,
                    path_many_to_many_field=action
                )
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    if access:
        return True
    else:
        return False
    # for group in groups:
    #     try:
    #         pages = [str(x).strip().lower() for x in
    #                  str(group.path_text_field).strip().split(',') if len(x) >= 1]
    #     except Exception as error:
    #         pages = [str(group.path_text_field).strip()]
    #     try:
    #         pages.index(path.strip().lower())
    #         access = True
    #         break
    #     except Exception as error:
    #         pass
    # if access:
    #     return True
    # else:
    #     return False
