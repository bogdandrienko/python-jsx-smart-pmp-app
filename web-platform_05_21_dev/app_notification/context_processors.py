from .models import NotificationModel


def notification_counter(request):
    try:
        notification = NotificationModel.objects.filter(notification_status=True).count()
    except NotificationModel.DoesNotExist:
        notification = 0
    return dict(notification=notification)
