from django.shortcuts import get_object_or_404, render
from .models import Category, Product


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