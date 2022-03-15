from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include, re_path
from rest_framework import routers

from backend import views as backend_views


router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=backend_views.UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=backend_views.GroupViewSet, basename='groups')

urlpatterns = [
    ####################################################################################################################
    path('', backend_views.index, name=''),
    path('', backend_views.index, name='index'),
    path('home/', backend_views.index, name='home'),
    ####################################################################################################################
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('api/auth/router/', include(router.urls)),
    path('api/auth/routes/', backend_views.api_auth_routes, name='api_routes'),
    ####################################################################################################################
    path('api/any/user/login/', backend_views.api_any_login_user, name='api_any_login_user'),
    path('api/auth/user/detail/', backend_views.api_auth_user_detail, name='api_auth_user_detail'),
    path('api/auth/user/change/', backend_views.api_auth_user_change, name='api_user_change'),
    path('api/any/user/recover/', backend_views.api_any_user_recover, name='api_any_user_recover'),
    path('api/auth/user/list_all/', backend_views.api_auth_user_list_all, name='api_auth_user_list_all'),
    path('api/auth/user/notification/', backend_views.api_auth_user_notification, name='api_auth_user_notification'),
    ####################################################################################################################
    path('api/auth/admin/change_user_password/', backend_views.api_auth_admin_change_user_password,
         name='api_auth_admin_change_user_password'),
    path('api/auth/admin/create_or_change_users/', backend_views.api_auth_admin_create_or_change_users,
         name='api_auth_admin_create_or_change_users'),
    path('api/auth/admin/export_users/', backend_views.api_auth_admin_export_users,
         name='api_auth_admin_export_users'),
    ####################################################################################################################
    path('api/auth/user/temp_all/', backend_views.api_get_all_users_with_temp_password,
         name='api_get_all_users_with_temp_password'),
    ####################################################################################################################
    path('api/auth/salary/', backend_views.api_auth_salary, name='api_auth_salary'),
    ####################################################################################################################
    path('api/auth/rational/', backend_views.api_auth_rational, name='api_auth_rational'),
    ####################################################################################################################
    path('api/auth/idea/', backend_views.api_auth_idea, name='api_auth_idea'),
    ####################################################################################################################
    path('api/any/vacancy/', backend_views.api_any_vacancy, name='api_any_vacancy'),
    path('api/auth/vacancy/', backend_views.api_auth_vacancy, name='api_auth_vacancy'),
    path('api/any/resume/', backend_views.api_any_resume, name='api_any_resume'),
    path('api/auth/resume/', backend_views.api_auth_resume, name='api_auth_resume'),
    ####################################################################################################################
    path('api/auth/terminal/', backend_views.api_auth_terminal, name='api_auth_terminal'),
    ####################################################################################################################
]

# Redirect from reboot react app
########################################################################################################################
urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]
########################################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
