from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include, re_path
from rest_framework import routers
# from django.views.generic import TemplateView, RedirectView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

from backend import views as backend_views


router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=backend_views.UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=backend_views.GroupViewSet, basename='groups')
router.register(prefix=r'chat', viewset=backend_views.ChatViewSet, basename='chat')

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
    path('api/', include('rest_framework.urls')),
    path('api/routes/', backend_views.routes, name='api_routes'),

    # rest_framework routers.DefaultRouter()
    path('api/router/', include(router.urls)),

    # JWT token
    path('api/tokens/routes/', backend_views.routes, name='api_token_routes'),
    path('api/tokens/token/', backend_views.MyTokenObtainPairView.as_view(), name='api_token'),
    # path('api/tokens/token/', TokenObtainPairView.as_view(), name='api_token_obtain_pair'),
    path('api/tokens/token/refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
    path('api/tokens/token/verify/', TokenVerifyView.as_view(), name='api_token_verify'),

    # api authentication
    path('api/users/routes/', backend_views.routes, name='api_users_routes'),
    path('api/users/login/', backend_views.MyTokenObtainPairView.as_view(), name='api_users_login'),
    path('api/users/profile/', backend_views.get_user_profile, name='api_users_profile'),
    path('api/users/change_profile/', backend_views.change_user_profile, name='api_users_change_profile'),
    path('api/users/recover_password/', backend_views.recover_user_password, name='api_users_recover_password'),
    path('api/users/all/', backend_views.get_users, name='api_users_all'),
    # path('api/users/register/', backend_views.register_user, name='api_users_register'),

    # salary
    path('api/salary', backend_views.salary, name='api_salary'),

    #################################################################

    # note_api
    path('api/note_api/', backend_views.note_api, name='api_note_api'),
    path('api/note_api/<str:pk>/', backend_views.note_api, name='api_note_api'),
    # path('api/note_api/', TemplateView.as_view(template_name='chat_react.html'), name='api_chat_react'),

    # shop
    path('api/productsTest/', backend_views.get_products, name='api_products'),
    path('api/productsTest/<str:pk>/', backend_views.get_product, name='api_product'),

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
    path('django/salary_pdf/', backend_views.salary_pdf_, name='django_salary_pdf'),
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
    path('django/account_generate_passwords/', backend_views.account_generate_passwords,
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

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
