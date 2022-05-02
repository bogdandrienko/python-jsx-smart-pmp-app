from django.contrib.auth.models import User

from backend import models as backend_models, utils as backend_service


def user_counter(request):
    try:
        user_model = backend_models.UserModel.objects.get_or_create(user=User.objects.get(id=request.user.id))[0]
        notifications = backend_models.NotificationModel.objects.filter(
            author=user_model,
            is_visible=False,
        ).count()
    except Exception as error:
        backend_service.DjangoClass.LoggingClass.error(request=request, error=error)
        notifications = 0
    try:
        errors = 0
        for log in backend_models.LoggingModel.objects.all():
            if log.error != 'successful':
                errors += 1
    except Exception as error:
        backend_service.DjangoClass.LoggingClass.error(request=request, error=error)
        errors = -1

    return dict(notifications=backend_models.UserModel.objects.all().count(), errors=12)
