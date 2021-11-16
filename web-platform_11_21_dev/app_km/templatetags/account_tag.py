from django import template
from django.contrib.auth.models import User
from app_km.service import DjangoClass

register = template.Library()


@register.simple_tag(takes_context=True)
def account_tag(context, username):
    request = context['request']
    try:
        account = User.objects.get(username=username)
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        account = False
    return account
