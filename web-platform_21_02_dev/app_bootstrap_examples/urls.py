from django.urls import path
from . import views

urlpatterns = [
    path('', views.examples, name='examples'),
    
    path('album', views.album, name='example-album'),
    path('blog', views.blog, name='example-blog'),
    path('carousel', views.carousel, name='example-carousel'),
    path('checkout', views.checkout, name='example-checkout'),
    path('cover', views.cover, name='example-cover'),
    path('dashboard', views.dashboard, name='example-dashboard'),
    path('pricing', views.pricing, name='example-pricing'),
    path('product', views.product, name='example-product'),
    path('sign-in', views.sign_in, name='example-sign-in'),
    path('sticky-footer', views.sticky_footer, name='example-sticky-footer'),
    path('sticky-footer-navbar', views.sticky_footer_navbar, name='example-sticky-footer-navbar'),


    path('starter-template', views.starter_template, name='example-starter-template'),
    path('grid', views.grid, name='example-grid'),
    path('cheatsheet', views.cheatsheet, name='example-cheatsheet'),
    path('navbars', views.navbars, name='example-navbars'),
    path('offcanvas', views.offcanvas, name='example-offcanvas'),
    path('masonry', views.masonry, name='example-masonry'),
    path('navbar-static', views.navbar_static, name='example-navbar-static'),
    path('navbar-fixed', views.navbar_fixed, name='example-navbar-fixed'),
    path('navbar-bottom', views.navbar_bottom, name='example-navbar-bottom'),
]
