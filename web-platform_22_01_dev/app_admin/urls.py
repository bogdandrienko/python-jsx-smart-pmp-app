from django.urls import path

from app_admin.views import examples_forms, example, local, admin_, logging, home, modules, \
    create_modules, account_login, account_logout, account_change_password, account_change_profile, \
    account_recover_password, account_profile, account_notification, account_create_notification, \
    account_delete_or_change_notification, account_create_or_change_accounts, account_export_accounts, \
    account_generate_passwords, account_update_accounts_1c, account_change_groups


urlpatterns = [
    path('examples_forms/', examples_forms, name='examples_forms'),
    path('example/', example, name='example'),
    path('local/', local, name='local'),
    path('admin/', admin_, name='admin'),
    path('logging/', logging, name='logging'),
    path('', home, name=''),
    path('home/', home, name='home'),
    path('create_modules/', create_modules, name='create_modules'),
    path('module_or_component/', modules, name='module_or_component'),
    path('module_or_component/<slug:url_slug>/', modules, name='module_or_component'),
    path('account_login/', account_login, name='account_login'),
    path('account_logout/', account_logout, name='account_logout'),
    path('account_change_password/', account_change_password, name='account_change_password'),
    path('account_change_profile/', account_change_profile, name='account_change_profile'),
    path('account_recover_password/', account_recover_password, name='account_recover_password'),
    path('account_recover_password/<slug:type_slug>/', account_recover_password, name='account_recover_password'),
    path('account_profile/', account_profile, name='account_profile'),
    path('account_profile/<int:user_id>/', account_profile, name='account_profile'),
    path('account_notification/', account_notification, name='account_notification'),
    path('account_notification/<slug:type_slug>/', account_notification, name='account_notification'),
    path('account_create_notification/', account_create_notification, name='account_create_notification'),
    path('account_delete_or_change_notification/<int:notification_id>/', account_delete_or_change_notification,
         name='account_delete_or_change_notification'),
    path('account_create_or_change_accounts/', account_create_or_change_accounts,
         name='account_create_or_change_accounts'),
    path('account_export_accounts/', account_export_accounts, name='account_export_accounts'),
    path('account_generate_passwords/', account_generate_passwords, name='account_generate_passwords'),
    path('account_update_accounts_1c/', account_update_accounts_1c, name='account_update_accounts_1c'),
    path('account_change_groups/', account_change_groups, name='account_change_groups'),
]
