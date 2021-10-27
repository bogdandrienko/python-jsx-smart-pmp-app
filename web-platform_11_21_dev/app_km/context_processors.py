from .models import NotificationModel


def notification_counter(request):
    if request.user.is_authenticated is not True:
        return dict(notification=0)
    try:
        notification = NotificationModel.objects.filter(notification_status=True).count()
    except NotificationModel.DoesNotExist:
        notification = 0
    return dict(notification=notification)
