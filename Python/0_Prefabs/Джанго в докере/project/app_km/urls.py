from django.urls import path, include
from . import views

app_name = 'app_km'
urlpatterns = [

    path('admin/', views.admin_, name='admin'),
    path('', views.home, name=''),
    path('home/', views.home, name='home'),

    path('react/', views.react, name='react'),

    path('list_module/', views.list_module, name='list_module'),
    path('list_module/<slug:module_slug>/', views.list_component, name='list_component'),
    path('salary/', views.salary, name='salary'),
    path('view_pdf/', views.view_pdf, name='view_pdf'),
    path('create_pdf/', views.render_pdf_view, name='create_pdf'),
    path('geo/', views.geo, name='geo'),
    path('career/', views.career, name='career'),
    path('rational/', views.rational_list, name='rational'),
    path('search/', views.rational_search, name='rational_search'),
    path('<slug:category_slug>', views.rational_list, name='rational_by_category'),
    path('<int:rational_id>/', views.rational_detail, name='rational_detail'),
    path('create/', views.rational_create, name='rational_create'),
    path('ratings/', views.rational_ratings, name='rational_ratings'),
    path('<int:rational_id>/change/', views.rational_change, name='rational_change'),
    path('<int:rational_id>/leave_comment/', views.rational_leave_comment, name='rational_leave_comment'),
    path('<int:rational_id>/rational_change_rating/', views.rational_change_rating, name='rational_change_rating'),
    path('login/', views.login_account, name='login'),
    path('logout/', views.logout_account, name='logout'),
    path('create_user/', views.create_user, name='create_user'),
    path('create_user_from1c/', views.create_user_from1c, name='create_user_from1c'),
    path('change_user/', views.change_user, name='change_user'),
    path('create_users/', views.create_users, name='create_users'),
    path('export_users/', views.export_users, name='export_users'),
    path('generate_password/', views.generate_password, name='generate_password'),
    path('generate_passwords/', views.generate_passwords, name='generate_passwords'),
    path('profile/<slug:username>', views.view_profile, name='view_profile'),
    path('', include('django.contrib.auth.urls')),
    path('notification/', views.notification, name='notification'),
    path('create', views.create_notification, name='create'),
    path('<int:notify_id>/accept', views.accept, name='accept'),
    path('<int:notify_id>/decline', views.decline, name='decline'),
    path('email/', views.email, name='email'),
    path('send_email/', views.send_email, name='send_email'),
    path('contact/', views.contact, name='contact'),
    path('documentation/', views.documentation, name='documentation'),
    path('message/', views.message, name='message'),
    path('chat/', views.list_sms, name='chat'),
    path('news/', views.news_list, name='news'),
    path('create/', views.news_create, name='news_create'),
    path('news/<int:article_id>/', views.news_detail, name='news_detail'),
    path('news/<int:article_id>/leave_comment/', views.leave_comment, name='leave_comment'),
    path('news/<int:article_id>/increase_rating/', views.increase_rating, name='increase_rating'),
    path('news/<int:article_id>/decrease_rating/', views.decrease_rating, name='decrease_rating'),
    path('weather/', views.weather, name='weather'),

    path('bootstrap/example', views.example, name='example'),
    path('bootstrap/album', views.album, name='example-album'),
    path('bootstrap/blog', views.blog, name='example-blog'),
    path('bootstrap/carousel', views.carousel, name='example-carousel'),
    path('bootstrap/checkout', views.checkout, name='example-checkout'),
    path('bootstrap/cover', views.cover, name='example-cover'),
    path('bootstrap/dashboard', views.dashboard, name='example-dashboard'),
    path('bootstrap/pricing', views.pricing, name='example-pricing'),
    path('bootstrap/product', views.product, name='example-product'),
    path('bootstrap/sign-in', views.sign_in, name='example-sign-in'),
    path('bootstrap/sticky-footer', views.sticky_footer, name='example-sticky-footer'),
    path('bootstrap/sticky-footer-navbar', views.sticky_footer_navbar, name='example-sticky-footer-navbar'),
    path('bootstrap/starter-template', views.starter_template, name='example-starter-template'),
    path('bootstrap/grid', views.grid, name='example-grid'),
    path('bootstrap/cheatsheet', views.cheatsheet, name='example-cheatsheet'),
    path('bootstrap/navbars', views.nav_bars, name='example-nav_bars'),
    path('bootstrap/offcanvas', views.off_canvas, name='example-off_canvas'),
    path('bootstrap/masonry', views.masonry, name='example-masonry'),
    path('bootstrap/navbar-static', views.navbar_static, name='example-navbar-static'),
    path('bootstrap/navbar-fixed', views.navbar_fixed, name='example-navbar-fixed'),
    path('bootstrap/navbar-bottom', views.navbar_bottom, name='example-navbar-bottom'),
]
