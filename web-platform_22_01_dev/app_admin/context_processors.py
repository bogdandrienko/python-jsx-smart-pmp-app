from django.contrib.auth.models import User
from app_admin.models import UserModel, NotificationModel
from app_admin.service import DjangoClass


def user_counter(request):
    try:
        user_model = UserModel.objects.get_or_create(user_foreign_key_field=User.objects.get(id=request.user.id))[0]
        notification = NotificationModel.objects.filter(
            user_foreign_key_field=user_model,
            status_boolean_field=False,
        ).count()
    except Exception as error:
        DjangoClass.LoggingClass.logging_errors(request=request, error=error)
        notification = 0
    return dict(notification=notification)
