from django.urls import path
from . import views

urlpatterns = [
    path('category/', views.category, name='category'),
    path('category/<slug:category_slug>', views.category, name='products_by_category'),
    path('category/<slug:category_slug>/<slug:product_slug>', views.product, name='products_detail'),
    path('cart/', views.cart, name='cart'),
]
