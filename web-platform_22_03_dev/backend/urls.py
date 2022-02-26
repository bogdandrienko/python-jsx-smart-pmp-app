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
router.register(prefix=r'chat', viewset=backend_views.ChatViewSet, basename='chat')

router.register('api/todo', backend_views.TodoViewSet, 'todo')
router.register('api/categories', backend_views.CategoryViewSet, 'categories')

urlpatterns = [
    # react SPA (single page applications)
    ####################################################################################################################
    # home page
    path('', backend_views.index, name=''),
    path('', backend_views.index, name='index'),
    path('home/', backend_views.index, name='home'),
    ####################################################################################################################

    # django default admin
    ####################################################################################################################
    # admin page
    path('admin/', admin.site.urls),
    path('admin/', backend_views.admin_, name='admin'),
    ####################################################################################################################

    # django rest_framework
    ####################################################################################################################

    # rest_framework routes
    #################################################################
    path('api/', include('rest_framework.urls')),
    path('api/routes/', backend_views.routes, name='api_routes'),
    #################################################################

    # rest_framework routers.DefaultRouter
    #################################################################
    path('api/router/', include(router.urls)),
    #################################################################

    # 1c api
    #################################################################
    path('api/user/temp_all/', backend_views.api_get_all_users_with_temp_password,
         name='api_get_all_users_with_temp_password'),
    path('api/user/update_1c/', backend_views.api_update_users_from_1c, name='api_update_users_from_1c'),
    #################################################################

    # api user
    #################################################################
    path('api/users/routes/', backend_views.routes, name='api_users_routes'),
    path('api/user/login/', backend_views.api_login_user, name='api_user_login'),
    path('api/user/profile/', backend_views.api_user_profile, name='api_user_profile'),
    path('api/user/change_profile/', backend_views.api_user_change_profile, name='api_user_change_profile'),
    path('api/user/recover_password/', backend_views.api_user_recover_password, name='api_user_recover_password'),
    path('api/user/change_password/', backend_views.api_user_change_password, name='api_user_change_password'),
    path('api/user/all/', backend_views.api_user_all_, name='api_user_all'),
    #################################################################

    # admin
    #################################################################
    path('api/admin/change_user_password/', backend_views.api_admin_change_user_password,
         name='api_admin_change_user_password'),
    path('api/admin/create_or_change_users/', backend_views.api_admin_create_or_change_users,
         name='api_admin_create_or_change_users'),
    path('api/admin/export_users/', backend_views.api_admin_export_users,
         name='api_admin_export_users'),
    #################################################################

    # salary
    #################################################################
    path('api/salary/', backend_views.api_salary, name='api_salary'),
    #################################################################

    # rational
    #################################################################
    path('api/rational/', backend_views.api_rational, name='api_rational'),
    #################################################################

    # django templates
    ####################################################################################################################
    # django page
    path('django/', backend_views.home, name='django_home'),
    # local redirect page
    path('django/local/', backend_views.local, name='django_local'),
    path('django/logging/', backend_views.logging, name='django_logging'),
    path('django/chat_react/', backend_views.chat_react, name='django_chat_react'),
    path('django/chat/', backend_views.chat, name='django_chat'),
    path('django/react/', backend_views.react, name='django_react'),
    path('django/salary/', backend_views.salary_, name='django_salary'),
    path('django/career/', backend_views.career, name='django_career'),
    path('django/idea_create/', backend_views.idea_create, name='django_idea_create'),
    path('django/idea_change/<int:idea_int>/', backend_views.idea_change, name='django_idea_change'),
    path('django/idea_list/', backend_views.idea_list, name='django_idea_list'),
    path('django/idea_list/<slug:category_slug>/', backend_views.idea_list, name='django_idea_list'),
    path('django/idea_change_visibility/<int:idea_int>/', backend_views.idea_change_visibility,
         name='django_idea_change_visibility'),
    path('django/idea_view/<int:idea_int>/', backend_views.idea_view, name='django_idea_view'),
    path('django/idea_like/<int:idea_int>/', backend_views.idea_like, name='django_idea_like'),
    path('django/idea_comment/<int:idea_int>/', backend_views.idea_comment, name='django_idea_comment'),
    path('django/idea_rating/', backend_views.idea_rating, name='django_idea_rating'),
    path('django/video_study/', backend_views.video_study, name='django_video_study'),
    path('django/geo/', backend_views.geo, name='django_geo'),
    path('django/analyse/', backend_views.analyse, name='django_analyse'),
    path('django/passages_thermometry/', backend_views.passages_thermometry, name='django_passages_thermometry'),
    path('django/passages_select/', backend_views.passages_select, name='django_passages_select'),
    path('django/passages_update/', backend_views.passages_update, name='django_passages_update'),
    path('django/passages_insert/', backend_views.passages_insert, name='django_passages_insert'),
    path('django/passages_delete/', backend_views.passages_delete, name='django_passages_delete'),

    path('django/examples_forms/', backend_views.examples_forms, name='django_examples_forms'),
    path('django/example/', backend_views.example, name='django_example'),
    path('django/create_modules/', backend_views.create_modules, name='django_create_modules'),
    path('django/module_or_component/', backend_views.modules, name='django_module_or_component'),
    path('django/module_or_component/<slug:url_slug>/', backend_views.modules, name='django_module_or_component'),
    path('django/account_login/', backend_views.account_login, name='django_account_login'),
    path('django/account_logout/', backend_views.account_logout, name='django_account_logout'),
    path('django/account_change_password/', backend_views.account_change_password,
         name='django_account_change_password'),
    path('django/account_change_profile/', backend_views.account_change_profile, name='django_account_change_profile'),
    path('account_recover_password/', backend_views.account_recover_password, name='django_account_recover_password'),
    path('django/account_recover_password/<slug:type_slug>/', backend_views.account_recover_password,
         name='django_account_recover_password'),
    path('django/account_profile/', backend_views.account_profile, name='django_account_profile'),
    path('django/account_profile/<int:user_id>/', backend_views.account_profile, name='django_account_profile'),
    path('django/account_notification/', backend_views.account_notification, name='django_account_notification'),
    path('django/account_notification/<slug:type_slug>/', backend_views.account_notification,
         name='django_account_notification'),
    path('django/account_create_notification/', backend_views.account_create_notification,
         name='django_account_create_notification'),
    path('django/account_delete_or_change_notification/<int:notification_id>/',
         backend_views.account_delete_or_change_notification, name='django_account_delete_or_change_notification'),
    path('django/account_create_or_change_accounts/', backend_views.account_create_or_change_accounts,
         name='django_account_create_or_change_accounts'),
    path('django/account_export_accounts/', backend_views.account_export_accounts,
         name='django_account_export_accounts'),
    path('django/django_account_generate_passwords/', backend_views.django_account_generate_passwords,
         name='django_account_generate_passwords'),
    path('django/account_update_accounts_1c/', backend_views.account_update_accounts_1c,
         name='django_account_update_accounts_1c'),
    path('django/account_change_groups/', backend_views.account_change_groups, name='django_account_change_groups'),
    ####################################################################################################################
]

# Redirect from reboot react app
########################################################################################################################
urlpatterns += [re_path(r'^.*$', lambda request: redirect('', permanent=False), name='redirect')]
########################################################################################################################

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
