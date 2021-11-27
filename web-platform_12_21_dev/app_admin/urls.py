from django.urls import path, include
from . import views


urlpatterns = [
    # example
    path('examples_forms/', views.examples_forms, name='examples_forms'),
    path('example/', views.example, name='example'),
    # local
    path('local/', views.local, name='local'),
    # admin
    path('admin/', views.admin_, name='admin'),
    # logging
    path('logging/', views.logging, name='logging'),
    # home
    path('', views.home, name=''),
    path('home/', views.home, name='home'),
    # account
    path('account_login/', views.account_login, name='account_login'),
    path('account_logout/', views.account_logout, name='account_logout'),
    path('account_change_password/', views.account_change_password, name='account_change_password'),
    path('account_recover_password/<slug:type_slug>/', views.account_recover_password, name='account_recover_password'),
    path('account_change_profile/', views.account_change_profile, name='account_change_profile'),
    path('account_profile/<slug:username>/', views.account_profile, name='account_profile'),
    path('account_create_accounts/<slug:quantity_slug>/', views.account_create_or_change_accounts,
         name='account_create_or_change_accounts'),
    path('account_export_accounts/', views.account_export_accounts, name='account_export_accounts'),
    path('account_generate_passwords/', views.account_generate_passwords, name='account_generate_passwords'),
    path('account_update_accounts_1c/', views.account_update_accounts_1c, name='account_update_accounts_1c'),
    path('account_change_groups/', views.account_change_groups, name='account_change_groups'),
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    # module
    path('module/', views.module, name='module'),
    path('component/<slug:module_slug>/', views.component, name='component'),
    # idea
    path('idea_create/', views.idea_create, name='idea_create'),
    path('idea_list/<slug:category_slug>/', views.idea_list, name='idea_list'),
    path('idea_rating/', views.idea_rating, name='idea_rating'),
    path('ideas_view/<int:ideas_int>/', views.ideas_view, name='ideas_view'),
    path('ideas_comment/<int:ideas_int>/', views.ideas_comment, name='ideas_comment'),
    path('idea/like/<int:ideas_int>/', views.ideas_like, name='ideas_like'),
    path('idea/change/<int:ideas_int>/', views.ideas_change, name='ideas_change'),
    # passages
    path('passages_thermometry/', views.passages_thermometry, name='passages_thermometry'),
    path('passages_select/', views.passages_select, name='passages_select'),
    path('passages_update/', views.passages_update, name='passages_update'),
    path('passages_insert/', views.passages_insert, name='passages_insert'),
    path('passages_delete/', views.passages_delete, name='passages_delete'),
    # salary
    path('salary/', views.salary, name='salary'),
    path('salary_pdf/', views.salary_pdf, name='salary_pdf'),
    # career
    path('career/', views.career, name='career'),
    # geo
    path('geo/', views.geo, name='geo'),
    # react
    path('react/', views.react, name='react'),
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    # rational
    path('rational_list/', views.rational_list, name='rational'),
    path('rational_search/', views.rational_search, name='rational_search'),
    path('rational_/<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('rational_/<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('rational_create_rational/', views.create_rational, name='create_rational'),
    path('rational_ratings/', views.rational_ratings, name='rational_ratings'),
    path('rational_change/<int:rational_id>/', views.rational_change, name='rational_change'),
    path('rational_leave_comment/<int:rational_id>/', views.rational_leave_comment, name='rational_leave_comment'),
    path('rational_change_rating/<int:rational_id>/', views.rational_change_rating, name='rational_change_rating'),
    # extra
    path('email/', views.email, name='email'),
    path('send_email/', views.send_email, name='send_email'),
    path('notification/', views.notification, name='notification'),
    path('create_notification', views.create_notification, name='create'),
    path('<int:notify_id>/accept', views.accept, name='accept'),
    path('<int:notify_id>/decline', views.decline, name='decline'),
    path('contact/', views.contact, name='contact'),
    path('documentation/', views.documentation, name='documentation'),
    path('message/', views.message, name='message'),
    path('chat/', views.list_sms, name='chat'),
    path('news/', views.news_list, name='news'),
    path('news_create/', views.news_create, name='news_create'),
    path('news/<int:article_id>/', views.news_detail, name='news_detail'),
    path('news/<int:article_id>/leave_comment/', views.leave_comment, name='leave_comment'),
    path('news/<int:article_id>/increase_rating/', views.increase_rating, name='increase_rating'),
    path('news/<int:article_id>/decrease_rating/', views.decrease_rating, name='decrease_rating'),
    path('weather/', views.weather, name='weather'),
]
