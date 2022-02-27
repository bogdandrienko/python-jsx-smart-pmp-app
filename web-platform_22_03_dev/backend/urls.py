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
    # react SPA (single page applications)
    ####################################################################################################################
    path('', backend_views.index, name=''),
    path('', backend_views.index, name='index'),
    path('home/', backend_views.index, name='home'),
    ####################################################################################################################

    # django default admin
    ####################################################################################################################
    path('admin/', admin.site.urls),
    ####################################################################################################################

    # rest_framework routes
    ####################################################################################################################
    path('api/', include('rest_framework.urls')),
    path('api/routes/', backend_views.routes, name='api_routes'),
    ####################################################################################################################

    # rest_framework routers.DefaultRouter
    ####################################################################################################################
    path('api/router/', include(router.urls)),
    ####################################################################################################################

    # api user
    ####################################################################################################################
    path('api/users/routes/', backend_views.routes, name='api_users_routes'),
    path('api/user/login/', backend_views.api_login_user, name='api_user_login'),
    path('api/user/detail/', backend_views.api_user_detail, name='api_user_detail'),
    path('api/user/change/', backend_views.api_user_change, name='api_user_change'),
    path('api/user/recover/', backend_views.api_user_recover, name='api_user_recover'),
    ####################################################################################################################

    # admin
    ####################################################################################################################
    path('api/admin/change_user_password/', backend_views.api_admin_change_user_password,
         name='api_admin_change_user_password'),
    path('api/admin/create_or_change_users/', backend_views.api_admin_create_or_change_users,
         name='api_admin_create_or_change_users'),
    path('api/admin/export_users/', backend_views.api_admin_export_users,
         name='api_admin_export_users'),
    ####################################################################################################################

    # 1c api
    ####################################################################################################################
    path('api/user/temp_all/', backend_views.api_get_all_users_with_temp_password,
         name='api_get_all_users_with_temp_password'),
    ####################################################################################################################

    # salary
    ####################################################################################################################
    path('api/salary/', backend_views.api_salary, name='api_salary'),
    ####################################################################################################################

    # rational
    ####################################################################################################################
    path('api/rational/', backend_views.api_rational, name='api_rational'),
    ####################################################################################################################
]

# Redirect from reboot react app
########################################################################################################################
urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]
########################################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
