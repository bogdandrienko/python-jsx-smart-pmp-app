from django.urls import path, include
from . import views


urlpatterns = [

    # Main
    path('', include('django.contrib.auth.urls')),
    # path(r'^ckeditor/', include('ckeditor_uploader.urls')),
    path('admin/', views.admin_, name='admin'),
    path('', views.home, name=''),
    path('home/', views.home, name='home'),


    # Account
    path('account_login/', views.account_login, name='account_login'),
    path('account_logout/', views.account_logout, name='account_logout'),
    path('account_create_accounts/<int:quantity>/', views.account_create_accounts, name='account_create_accounts'),
    path('account_export_accounts/', views.account_export_accounts, name='account_export_accounts'),

    path('account_generate_passwords/', views.account_generate_passwords, name='account_generate_passwords'),

    path('account_update_accounts_1c/', views.account_update_accounts_1c, name='account_update_accounts_1c'),
    path('account_change_password/', views.account_change_password, name='account_change_password'),
    path('account_change_profile/', views.account_change_profile, name='account_change_profile'),
    path('account_profile/<slug:username>/', views.account_profile, name='account_profile'),





    path('list_module/', views.list_module, name='list_module'),
    path('list_module/<slug:module_slug>/', views.list_component, name='list_component'),



    path('salary/', views.salary, name='salary'),
    path('create_pdf/', views.render_pdf_view, name='create_pdf'),



    path('passages_thermometry/', views.passages_thermometry, name='passages_thermometry'),
    path('passages_select/', views.passages_select, name='passages_select'),
    path('passages_update/', views.passages_update, name='passages_update'),
    path('passages_insert/', views.passages_insert, name='passages_insert'),
    path('passages_delete/', views.passages_delete, name='passages_delete'),



    path('rational/', views.rational_list, name='rational'),
    path('search/', views.rational_search, name='rational_search'),
    path('<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('create_rational/', views.create_rational, name='create_rational'),
    path('ratings/', views.rational_ratings, name='rational_ratings'),
    path('<int:rational_id>/change/', views.rational_change, name='rational_change'),
    path('<int:rational_id>/leave_comment/', views.rational_leave_comment, name='rational_leave_comment'),
    path('<int:rational_id>/rational_change_rating/', views.rational_change_rating, name='rational_change_rating'),



    path('geo/', views.geo, name='geo'),
    path('career/', views.career, name='career'),

    path('react/', views.react, name='react'),
    path('notification/', views.notification, name='notification'),
    path('create_notification', views.create_notification, name='create'),
    path('<int:notify_id>/accept', views.accept, name='accept'),
    path('<int:notify_id>/decline', views.decline, name='decline'),
    path('email/', views.email, name='email'),
    path('send_email/', views.send_email, name='send_email'),
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

    # bootstrap
    path('bootstrap/example', views.example, name='example'),
    path('bootstrap/album', views.album, name='example_album'),
    path('bootstrap/blog', views.blog, name='example_blog'),
    path('bootstrap/carousel', views.carousel, name='example_carousel'),
    path('bootstrap/checkout', views.checkout, name='example_checkout'),
    path('bootstrap/cover', views.cover, name='example_cover'),
    path('bootstrap/dashboard', views.dashboard, name='example_dashboard'),
    path('bootstrap/pricing', views.pricing, name='example_pricing'),
    path('bootstrap/product', views.product, name='example_product'),
    path('bootstrap/sign-in', views.sign_in, name='example_sign_in'),
    path('bootstrap/sticky-footer', views.sticky_footer, name='example_sticky_footer'),
    path('bootstrap/sticky-footer-navbar', views.sticky_footer_navbar, name='example_sticky_footer_navbar'),
    path('bootstrap/starter-template', views.starter_template, name='example_starter_template'),
    path('bootstrap/grid', views.grid, name='example_grid'),
    path('bootstrap/cheatsheet', views.cheatsheet, name='example_cheatsheet'),
    path('bootstrap/navbars', views.nav_bars, name='example_navbars'),
    path('bootstrap/offcanvas', views.off_canvas, name='example_offcanvas'),
    path('bootstrap/masonry', views.masonry, name='example_masonry'),
    path('bootstrap/navbar-static', views.navbar_static, name='example_navbar_static'),
    path('bootstrap/navbar-fixed', views.navbar_fixed, name='example_navbar_fixed'),
    path('bootstrap/navbar-bottom', views.navbar_bottom, name='example_navbar_bottom'),
]
