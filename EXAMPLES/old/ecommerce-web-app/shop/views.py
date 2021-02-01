from django.shortcuts import get_object_or_404, redirect, render
from .models import Category, Product, Cart, CartItem


# Create your views here.


def category(request, category_slug=None):
	category_page = None
	products = None
	if category_slug != None:
		category_page = get_object_or_404(Category, slug=category_slug)
		products = Product.objects.filter(category=category_page, available=True)
	else:
		products = Product.objects.all().filter(available=True)
	return render(request, 'category.html', {'category':category_page, 'products': products})


def product(request, category_slug, product_slug):
	try:
		products = Product.objects.get(category__slug=category_slug, slug=product_slug)
	except Exception as e:
		raise e
	return render(request, 'product.html', {'products': products})


def cart(request):
	return render(request, 'cart.html')


def _cart_id(request):
	cart = request.session.session_key
	if not cart:
		cart = request.session.create
	return cart


def add_cart(request, product_id):
	product = Product.objects.get(id=product_id)
	try:
		cart = Cart.objects.get(cart_id=_cart_id(request))
	except Cart.DoesNotExist:
		cart = Cart.objects.create(cart_id=_cart_id(request))
		cart.save()
	try:
		cart_item = CartItem.objects.get(product=product, cart=cart)
		cart_item.quantity +=1
		cart_item.save()
	except CartItem.DoesNotExist:
		cart_item = CartItem.objects.create(product=product, quantity=1, cart=cart)
		cart_item.save()
	
	return redirect('cart_detail')




