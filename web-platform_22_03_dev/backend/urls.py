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


# TODO default routers #################################################################################################
router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=backend_views.UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=backend_views.GroupViewSet, basename='groups')

# TODO base urls #######################################################################################################
urlpatterns = [
    # TODO resume ######################################################################################################
    path('django/', include('backend_native.urls')),
    # TODO index #######################################################################################################
    path('', backend_views.index, name=''),
    path('', backend_views.index, name='index'),
    path('home/', backend_views.index, name='home'),
    # TODO admin #######################################################################################################
    path('admin/', admin.site.urls),
    # TODO routers #####################################################################################################
    path('api/', include('rest_framework.urls')),
    path('api/auth/router/', include(router.urls)),
    path('api/auth/routes/', backend_views.api_auth_routes, name='api_auth_routes'),
    # TODO base urls ###################################################################################################
    path('api/any/user/', backend_views.api_any_user, name='api_any_user'),
    path('api/auth/user/', backend_views.api_auth_user, name='api_auth_user'),
    # TODO admin #######################################################################################################
    path('api/auth/admin/', backend_views.api_auth_admin, name='api_auth_admin'),
    path('api/basic/admin/user_temp/', backend_views.api_basic_admin_user_temp, name='api_basic_admin_user_temp'),
    # TODO custom urls #################################################################################################
    path('api/auth/salary/', backend_views.api_auth_salary, name='api_auth_salary'),
    path('api/auth/vacation/', backend_views.api_auth_vacation, name='api_auth_vacation'),
    path('api/auth/idea/', backend_views.api_auth_idea, name='api_auth_idea'),
    # TODO test urls ###################################################################################################
    path('api/auth/rational/', backend_views.api_auth_rational, name='api_auth_rational'),
    path('api/any/vacancy/', backend_views.api_any_vacancy, name='api_any_vacancy'),
    path('api/auth/vacancy/', backend_views.api_auth_vacancy, name='api_auth_vacancy'),
    path('api/any/resume/', backend_views.api_any_resume, name='api_any_resume'),
    path('api/auth/resume/', backend_views.api_auth_resume, name='api_auth_resume'),
]

# TODO redirect from reboot react app ##################################################################################
urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]
# TODO default settings ################################################################################################
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
