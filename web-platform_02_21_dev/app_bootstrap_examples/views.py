from django.shortcuts import render

# Create your views here.


def examples(request):
    return render(request, 'examples/examples.html')


def album(request):
    return render(request, 'examples/album.html')


def blog(request):
    return render(request, 'examples/blog.html')


def carousel(request):
    return render(request, 'examples/carousel.html')


def checkout(request):
    return render(request, 'examples/checkout.html')


def cover(request):
    return render(request, 'examples/cover.html')


def dashboard(request):
    return render(request, 'examples/dashboard.html')


def pricing(request):
    return render(request, 'examples/pricing.html')


def product(request):
    return render(request, 'examples/product.html')


def sign_in(request):
    return render(request, 'examples/sign-in.html')


def sticky_footer(request):
    return render(request, 'examples/sticky-footer.html')


def sticky_footer_navbar(request):
    return render(request, 'examples/sticky-footer-navbar.html')


def starter_template(request):
    return render(request, 'examples/starter-template.html')


def grid(request):
    return render(request, 'examples/grid.html')


def cheatsheet(request):
    return render(request, 'examples/cheatsheet.html')


def navbars(request):
    return render(request, 'examples/navbars.html')


def offcanvas(request):
    return render(request, 'examples/offcanvas.html')


def masonry(request):
    return render(request, 'examples/masonry.html')


def navbar_static(request):
    return render(request, 'examples/navbar-static.html')


def navbar_fixed(request):
    return render(request, 'examples/navbar-fixed.html')


def navbar_bottom(request):
    return render(request, 'examples/navbar-bottom.html')
