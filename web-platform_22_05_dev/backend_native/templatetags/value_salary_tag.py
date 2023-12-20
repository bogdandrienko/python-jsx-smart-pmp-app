from django import template

from backend import utils as backend_service


register = template.Library()


@register.simple_tag(takes_context=True)
def value_salary_tag(context, value):
    try:
        if isinstance(value, str):
            return value
        # string = str(value)
        # res = re.sub(r'\d(?=(?:\d{3})+(?!\d))', r'\g<0>,', string)
        # print(res)
        # return res
        if len(f'{value:.2f}') < 10:
            return f'{value:.2f}'[:-6] + ' ' + f'{value:.2f}'[-6:]
        else:
            return f'{value:.2f}'[:-9] + ' ' + f'{value:.2f}'[-9:-6] + ' ' + f'{value:.2f}'[-6:]
    except Exception as error:
        backend_service.DjangoClass.LoggingClass.error(request=context['requst'], error=error)
        return value