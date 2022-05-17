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

    re_path(r'^api/user/rating/$', backend_views.api_user_ratings, name='api_user_ratings'),

    # TODO profile #####################################################################################################

    re_path(r'^api/captcha/$', backend_views.api_captcha, name='api_captcha'),
    re_path(r'^api/user/login/$', backend_views.api_user_login, name='api_user_login'),
    re_path(r'^api/user/detail/$', backend_views.api_user_detail, name='api_user_detail'),
    re_path(r'^api/user/password/change/$', backend_views.api_user_password_change, name='api_user_password_change'),

    re_path(r'^api/user/recover/$', backend_views.api_user_recover, name='api_user_recover'),
    re_path(r'^api/user/recover/email/$', backend_views.api_user_recover_email, name='api_user_recover_email'),
    re_path(r'^api/user/recover/password/$', backend_views.api_user_recover_password, name='api_user_recover_password'),

    re_path(r'^api/notification/$', backend_views.api_notification, name='api_notification'),
    re_path(r'^api/notification/(?P<notification_id>\d+)/$', backend_views.api_notification_id,
            name='api_notification_id'),

    re_path(r'^api/user/$', backend_views.api_user, name='api_user'),

    # TODO progress ####################################################################################################

    # GET "read idea list": "http://127.0.0.1:8000/api/idea/?search=all&sort=name&page=1&limit=10/"
    # POST "create idea": "http://127.0.0.1:8000/api/idea/"
    re_path(r'^api/idea/$', backend_views.api_idea, name='api_idea'),

    # GET (read idea) 'http://127.0.0.1:8000/api/idea/1/'
    # POST (action idea) 'http://127.0.0.1:8000/api/idea/1/'
    # PUT (update idea) 'http://127.0.0.1:8000/api/idea/1/'
    # DELETE (delete idea) 'http://127.0.0.1:8000/api/idea/1/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/$', backend_views.api_idea_id, name='api_idea_id'),

    # GET (read idea comment list) 'http://127.0.0.1:8000/api/idea/1/comment/?search=all&sort=name&page=1&limit=10/'
    # POST (create idea comment) 'http://127.0.0.1:8000/api/idea/1/comment/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/comment/$', backend_views.api_idea_comment, name='api_idea_comment'),

    # DELETE (delete idea comment) 'http://127.0.0.1:8000/api/idea/comment/1/'
    re_path(r'^api/idea/comment/(?P<comment_id>\d+)/$', backend_views.api_idea_comment_id, name='api_idea_comment_id'),

    # PUT (update idea rating) 'http://127.0.0.1:8000/api/idea/1/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/rating/$', backend_views.api_idea_rating, name='api_idea_rating'),

    # TODO buh #########################################################################################################

    re_path(r'^api/salary/$', backend_views.api_salary, name='api_salary'),

    # TODO sup #########################################################################################################

    re_path(r'^api/vacation/$', backend_views.api_vacation, name='api_vacation'),

    # TODO moderator ###################################################################################################

    path('api/basic/admin/user_temp/', backend_views.api_basic_admin_user_temp, name='api_basic_admin_user_temp'),

    re_path(r'^api/admin/export/users/$', backend_views.api_admin_export_users, name='api_admin_export_users'),
    re_path(r'^api/admin/create/users/$', backend_views.api_admin_create_users, name='api_admin_create_users'),
    re_path(r'^api/admin/terminal/reboot/$', backend_views.api_admin_terminal_reboot, name='api_admin_terminal_reboot'),
    re_path(r'^api/admin/recover_password/$', backend_views.api_admin_recover_password,
            name='api_admin_recover_password'),

    # TODO develop #####################################################################################################

    path('django/', include('backend_native.urls')),
    path('todo_list/', include('app_todo_list.urls')),
    path('recepies_bank/', include('app_recepies_bank.urls')),

    path('test/', backend_views.test, name='test'),
]

# TODO redirect from reboot react app ##################################################################################

# urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]

# TODO default settings ################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
