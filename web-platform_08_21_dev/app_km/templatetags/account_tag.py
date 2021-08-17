from django import template
from ..models import AccountDataModel

register = template.Library()


@register.simple_tag(takes_context=True)
def account_tag(context, username: str):
    request = context['request']
    try:
        account = AccountDataModel.objects.get(username=username)
    except Exception as e:
        account = False
    return account
