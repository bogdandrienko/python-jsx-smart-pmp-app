from django.contrib.auth.models import User
from app_admin.models import UserModel, NotificationModel, LoggingModel
from app_admin.service import DjangoClass


def user_counter(request):
    try:
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=User.objects.get(id=request.user.id))[0]
        notifications = NotificationModel.objects.filter(
            user_foreign_key_field=user_model,
            status_boolean_field=False,
        ).count()
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        notifications = 0
    try:
        errors = 0
        for log in LoggingModel.objects.all():
            if log.error_text_field != 'successful':
                errors += 1
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        errors = -1
    return dict(notifications=notifications, errors=errors)
