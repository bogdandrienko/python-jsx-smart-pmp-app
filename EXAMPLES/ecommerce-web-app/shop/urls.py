from django.urls import path
from . import views

urlpatterns = [
    path('category/', views.category, name='category'),
    path('category/<slug:category_slug>', views.category, name='products_by_category'),
    path('category/<slug:category_slug>/<slug:product_slug>', views.product, name='products_detail'),
    path('cart/', views.cart_detail, name='cart_detail'),
    path('cart/add/<int:product_id>', views.add_cart, name='add_cart'),
    path('cart/remove/<int:product_id>', views.cart_remove, name='cart_remove'),
    path('cart/remove_product/<int:product_id>', views.cart_remove_product, name='cart_remove_product'),
    path('account/create/', views.signUpView, name='signup'),
]
