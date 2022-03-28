from django.contrib.auth.models import User

from backend import models as backend_models, service as backend_service


def user_counter(request):
    try:
        user_model = backend_models.UserModel.objects.get_or_create(user_foreign_key_field=User.objects.get(id=request.user.id))[0]
        notifications = backend_models.NotificationModel.objects.filter(
            user_foreign_key_field=user_model,
            status_boolean_field=False,
        ).count()
    except Exception as error:
        backend_service.DjangoClass.LoggingClass.error(request=request, error=error)
        notifications = 0
    try:
        errors = 0
        for log in backend_models.LoggingModel.objects.all():
            if log.error_text_field != 'successful':
                errors += 1
    except Exception as error:
        backend_service.DjangoClass.LoggingClass.error(request=request, error=error)
        errors = -1
    return dict(notifications=notifications, errors=errors)
