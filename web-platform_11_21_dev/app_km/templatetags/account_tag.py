from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def account_tag(context, username: str):
    request = context['request']
    try:
        account = None
        # account = AccountDataModel.objects.get(username=username)
    except Exception as e:
        account = False
    return account
