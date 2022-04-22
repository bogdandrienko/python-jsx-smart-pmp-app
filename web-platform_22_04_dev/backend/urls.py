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

    path('api/any/user/login/', backend_views.api_any_user_login, name='api_any_user_login'),
    path('api/auth/user/detail/', backend_views.api_auth_user_detail, name='api_auth_user_detail'),
    path('api/auth/user/change/', backend_views.api_auth_user_change, name='api_auth_user_change'),
    path('api/auth/user/change_password/', backend_views.api_auth_user_change_password,
         name='api_auth_user_change_password'),

    path('api/any/user/recover/find/', backend_views.api_any_user_recover_find, name='api_any_user_recover_find'),
    path('api/any/user/recover/check_answer/', backend_views.api_any_user_recover_check_answer,
         name='api_any_user_recover_check_answer'),
    path('api/any/user/recover/send_email/', backend_views.api_any_user_recover_send_email,
         name='api_any_user_recover_send_email'),
    path('api/any/user/recover/check_email/', backend_views.api_any_user_recover_check_email,
         name='api_any_user_recover_check_email'),
    path('api/any/user/recover/change_password/', backend_views.api_any_user_recover_change_password,
         name='api_any_user_recover_change_password'),

    path('api/auth/user/notification/', backend_views.api_auth_user_notification, name='api_auth_user_notification'),
    path('api/auth/user/notification/<int:notification_id>/', backend_views.api_auth_user_notification,
         name='api_auth_user_notification'),
    path('api/auth/user/notification/<int:notification_id>/delete/', backend_views.api_auth_user_notification_id_delete,
         name='api_auth_user_notification_id_delete'),

    path('api/auth/user/list_all/', backend_views.api_auth_user_list_all, name='api_auth_user_list_all'),

    # TODO progress ####################################################################################################

    path('api/auth/idea/', backend_views.api_auth_idea, name='api_auth_idea'),

    # TODO buhgalteria #################################################################################################

    path('api/auth/user/salary/', backend_views.api_auth_user_salary, name='api_auth_user_salary'),

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
    path('api/auth/rational/<int:rational_id>/', backend_views.api_auth_rational, name='api_auth_rational'),

    path('django/', include('backend_native.urls')),
    path('test/', backend_views.test, name='test'),

    re_path(r'^api/products/$', backend_views.product_list),
    re_path(r'^api/products/(?P<pk>\d+)/$', backend_views.product_detail),  # r'^products/(?P<pk>[0-9]+)/$'
    path('api/any/post/', backend_views.api_any_post, name='api_any_post'),  # re_path(r'^api/any/post/$'
    path('api/any/post/<int:post_id>/', backend_views.api_any_post_id, name='api_any_post_id'),
    path('api/any/post/<int:post_id>/comments/', backend_views.api_any_post_id_comments,
         name='api_any_post_id_comments'),

    re_path(r'^api/user/$', backend_views.api_user, name='api_user'),

    # GET "read list post": "http://127.0.0.1:8000/api/post/?search=all&sort=name&page=1&limit=10/"
    # POST "create post": "http://127.0.0.1:8000/api/post/"
    re_path(r'^api/idea/$', backend_views.api_idea, name='api_idea'),

    # GET (read single post) 'http://127.0.0.1:8000/api/post/1/'
    # POST (action post) 'http://127.0.0.1:8000/api/post/1/'
    # PUT (update post) 'http://127.0.0.1:8000/api/post/1/'
    # DELETE (delete post) 'http://127.0.0.1:8000/api/post/1/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/$', backend_views.api_idea_id, name='api_idea_id'),

    # GET (read list comment post) 'http://127.0.0.1:8000/api/post/1/comment/?search=all&sort=name&page=1&limit=10/'
    # POST (create comment post) 'http://127.0.0.1:8000/api/post/1/comment/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/comment/$', backend_views.api_idea_comment, name='api_idea_comment'),
    # GET (read list comment post) 'http://127.0.0.1:8000/api/post/1/comment/?search=all&sort=name&page=1&limit=10/'
    # POST (create comment post) 'http://127.0.0.1:8000/api/post/1/comment/'
    re_path(r'^api/idea/(?P<idea_id>\d+)/rating/$', backend_views.api_idea_rating, name='api_idea_rating'),

    # GET (read single comment post) 'http://127.0.0.1:8000/api/post/1/comment/1/'
    # POST (action comment post) 'http://127.0.0.1:8000/api/post/1/comment/1/'
    # PUT (update comment post) 'http://127.0.0.1:8000/api/post/1/comment/1/'
    # DELETE (delete comment post) 'http://127.0.0.1:8000/api/post/1/comment/1/'
    # re_path(r'^api_new/post/(?P<idea_id>\d+)/comment/(?P<comment_id>\d+)/$', backend_views.api_post_comment_id,
    #         name='api_post_comment_id'),

    re_path(r'^api/post/$', backend_views.api_post, name='api_post'),

    re_path(r'^api/post/(?P<post_id>\d+)/$', backend_views.api_post_id, name='api_post_id'),
]

# TODO redirect from reboot react app ##################################################################################

urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]

# TODO default settings ################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
