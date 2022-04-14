# TODO django modules ##################################################################################################

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include, re_path

# TODO drf modules #####################################################################################################

from rest_framework import routers

# TODO custom modules ##################################################################################################

from backend import views as backend_views

# TODO rest_framework DefaultRouter ####################################################################################

router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=backend_views.UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=backend_views.GroupViewSet, basename='groups')

# TODO base urls #######################################################################################################

urlpatterns = [

    # TODO admin #######################################################################################################

    path('admin/', admin.site.urls),

    # TODO routers #####################################################################################################

    path('api/', include('rest_framework.urls')),
    path('api/auth/router/', include(router.urls)),
    path('api/auth/routes/', backend_views.api_auth_routes, name='api_auth_routes'),

    # TODO main ########################################################################################################

    path('', backend_views.index, name=''),
    path('', backend_views.index, name='index'),
    path('home/', backend_views.index, name='home'),
    path('api/auth/ratings_list/', backend_views.api_auth_ratings_list, name='api_auth_ratings_list'),

    # TODO profile #####################################################################################################

    path('api/any/user/', backend_views.api_any_user, name='api_any_user'),
    path('api/auth/user/', backend_views.api_auth_user, name='api_auth_user'),

    # TODO progress ####################################################################################################

    path('api/auth/idea/', backend_views.api_auth_idea, name='api_auth_idea'),

    # TODO buhgalteria #################################################################################################

    path('api/auth/salary/', backend_views.api_auth_salary, name='api_auth_salary'),

    # TODO sup #########################################################################################################

    path('api/auth/vacation/', backend_views.api_auth_vacation, name='api_auth_vacation'),

    # TODO moderator ###################################################################################################

    path('api/basic/admin/user_temp/', backend_views.api_basic_admin_user_temp, name='api_basic_admin_user_temp'),
    path('api/auth/admin/terminal_reboot/', backend_views.api_auth_admin_terminal_reboot,
         name='api_auth_admin_terminal_reboot'),
    path('api/auth/admin/check_user/', backend_views.api_auth_admin_check_user, name='api_auth_admin_check_user'),
    path('api/auth/admin/change_user_password/', backend_views.api_auth_admin_change_user_password,
         name='api_auth_admin_change_user_password'),
    path('api/auth/admin/change_user_activity/', backend_views.api_auth_admin_change_user_activity,
         name='api_auth_admin_change_user_activity'),
    path('api/auth/admin/create_or_change_users/', backend_views.api_auth_admin_create_or_change_users,
         name='api_auth_admin_create_or_change_users'),
    path('api/auth/admin/export_users/', backend_views.api_auth_admin_export_users, name='api_auth_admin_export_users'),

    # TODO develop #####################################################################################################

    path('api/auth/rational/', backend_views.api_auth_rational, name='api_auth_rational'),

    path('django/', include('backend_native.urls')),
    path('test/', backend_views.test, name='test'),

    path('api/any/post/', backend_views.api_any_post, name='api_any_post'),  # re_path(r'^api/any/post/$'
    path('api/any/post/<int:post_id>/', backend_views.api_any_post_id, name='api_any_post_id'),
    path('api/any/post/<int:post_id>/comments/', backend_views.api_any_post_id_comments,
         name='api_any_post_id_comments'),
]

# TODO redirect from reboot react app ##################################################################################

urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]

# TODO default settings ################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
