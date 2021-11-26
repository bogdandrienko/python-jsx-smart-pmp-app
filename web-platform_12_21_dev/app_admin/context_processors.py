from django.contrib.auth.models import User


def user_counter(request):
    if request.user.is_authenticated is not True:
        return dict(notification=0)
    try:
        notification = User.objects.all().count()
    except User.DoesNotExist:
        notification = 0
    return dict(notification=notification)
