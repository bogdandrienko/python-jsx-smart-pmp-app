from django.urls import path, include
from rest_framework import routers
# from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

from app_admin import views as backend_views


router = routers.DefaultRouter()
router.register(prefix=r'users', viewset=backend_views.UserViewSet, basename='users')
router.register(prefix=r'groups', viewset=backend_views.GroupViewSet, basename='groups')
router.register(prefix=r'chat', viewset=backend_views.ChatViewSet, basename='chat')

urlpatterns = [
    # index
    path('', backend_views.index, name=''),
    path('home/', backend_views.home, name='home'),

    # routes
    path('api/', backend_views.routes, name='routes'),
    path('api/router/', include(router.urls)),

    # JWT token
    path('api/users/login/', backend_views.MyTokenObtainPairView.as_view(), name='users-register'),
    path('api/users/register/', backend_views.register_user, name='users-register'),
    path('api/users/', backend_views.get_users, name='users'),
    path('api/users/profile/', backend_views.get_user_profile, name='users-profile'),
    path('api/token/', backend_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # note_api
    path('api/note_api/', backend_views.note_api, name='note_api'),
    path('api/note_api/<str:pk>/', backend_views.note_api, name='note_api'),
    # path('api/note_api/', TemplateView.as_view(template_name='chat_react.html'), name='chat_react'),

    # shop
    path('api/products/', backend_views.get_products, name='products'),
    path('api/products/<str:pk>/', backend_views.get_product, name='product'),

    # salary
    path('api/salary', backend_views.salary_, name='salary_'),

    path('chat_react/', backend_views.chat_react, name='chat_react'),
    path('chat/', backend_views.chat, name='chat'),
    path('react/', backend_views.react, name='react'),
    path('salary/', backend_views.salary, name='salary'),
    path('salary_pdf/', backend_views.salary_pdf, name='salary_pdf'),
    path('career/', backend_views.career, name='career'),
    path('idea_create/', backend_views.idea_create, name='idea_create'),
    path('idea_change/<int:idea_int>/', backend_views.idea_change, name='idea_change'),
    path('idea_list/', backend_views.idea_list, name='idea_list'),
    path('idea_list/<slug:category_slug>/', backend_views.idea_list, name='idea_list'),
    path('idea_change_visibility/<int:idea_int>/', backend_views.idea_change_visibility, name='idea_change_visibility'),
    path('idea_view/<int:idea_int>/', backend_views.idea_view, name='idea_view'),
    path('idea_like/<int:idea_int>/', backend_views.idea_like, name='idea_like'),
    path('idea_comment/<int:idea_int>/', backend_views.idea_comment, name='idea_comment'),
    path('idea_rating/', backend_views.idea_rating, name='idea_rating'),
    path('video_study/', backend_views.video_study, name='video_study'),
    path('geo/', backend_views.geo, name='geo'),
    path('analyse/', backend_views.analyse, name='analyse'),
    path('passages_thermometry/', backend_views.passages_thermometry, name='passages_thermometry'),
    path('passages_select/', backend_views.passages_select, name='passages_select'),
    path('passages_update/', backend_views.passages_update, name='passages_update'),
    path('passages_insert/', backend_views.passages_insert, name='passages_insert'),
    path('passages_delete/', backend_views.passages_delete, name='passages_delete'),


    path('examples_forms/', backend_views.examples_forms, name='examples_forms'),
    path('example/', backend_views.example, name='example'),
    path('local/', backend_views.local, name='local'),
    path('admin/', backend_views.admin_, name='admin'),
    path('logging/', backend_views.logging, name='logging'),
    path('', backend_views.home, name=''),
    path('home/', backend_views.home, name='home'),
    path('create_modules/', backend_views.create_modules, name='create_modules'),
    path('module_or_component/', backend_views.modules, name='module_or_component'),
    path('module_or_component/<slug:url_slug>/', backend_views.modules, name='module_or_component'),
    path('account_login/', backend_views.account_login, name='account_login'),
    path('account_logout/', backend_views.account_logout, name='account_logout'),
    path('account_change_password/', backend_views.account_change_password, name='account_change_password'),
    path('account_change_profile/', backend_views.account_change_profile, name='account_change_profile'),
    path('account_recover_password/', backend_views.account_recover_password, name='account_recover_password'),
    path('account_recover_password/<slug:type_slug>/', backend_views.account_recover_password,
         name='account_recover_password'),
    path('account_profile/', backend_views.account_profile, name='account_profile'),
    path('account_profile/<int:user_id>/', backend_views.account_profile, name='account_profile'),
    path('account_notification/', backend_views.account_notification, name='account_notification'),
    path('account_notification/<slug:type_slug>/', backend_views.account_notification, name='account_notification'),
    path('account_create_notification/', backend_views.account_create_notification, name='account_create_notification'),
    path('account_delete_or_change_notification/<int:notification_id>/',
         backend_views.account_delete_or_change_notification, name='account_delete_or_change_notification'),
    path('account_create_or_change_accounts/', backend_views.account_create_or_change_accounts,
         name='account_create_or_change_accounts'),
    path('account_export_accounts/', backend_views.account_export_accounts, name='account_export_accounts'),
    path('account_generate_passwords/', backend_views.account_generate_passwords, name='account_generate_passwords'),
    path('account_update_accounts_1c/', backend_views.account_update_accounts_1c, name='account_update_accounts_1c'),
    path('account_change_groups/', backend_views.account_change_groups, name='account_change_groups'),
]
