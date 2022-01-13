from django.shortcuts import render


def example(request):
    return render(request, 'app_bootstrap_examples/example.html')

def album(request):
    return render(request, 'app_bootstrap_examples/album.html')

def blog(request):
    return render(request, 'app_bootstrap_examples/blog.html')

def carousel(request):
    return render(request, 'app_bootstrap_examples/carousel.html')

def checkout(request):
    return render(request, 'app_bootstrap_examples/checkout.html')

def cover(request):
    return render(request, 'app_bootstrap_examples/cover.html')

def dashboard(request):
    return render(request, 'app_bootstrap_examples/dashboard.html')

def pricing(request):
    return render(request, 'app_bootstrap_examples/pricing.html')

def product(request):
    return render(request, 'app_bootstrap_examples/product.html')

def sign_in(request):
    return render(request, 'app_bootstrap_examples/sign-in.html')

def sticky_footer(request):
    return render(request, 'app_bootstrap_examples/sticky-footer.html')

def sticky_footer_navbar(request):
    return render(request, 'app_bootstrap_examples/sticky-footer-navbar.html')

def starter_template(request):
    return render(request, 'app_bootstrap_examples/starter-template.html')

def grid(request):
    return render(request, 'app_bootstrap_examples/grid.html')

def cheatsheet(request):
    return render(request, 'app_bootstrap_examples/cheatsheet.html')

def navbars(request):
    return render(request, 'app_bootstrap_examples/navbars.html')

def offcanvas(request):
    return render(request, 'app_bootstrap_examples/offcanvas.html')

def masonry(request):
    return render(request, 'app_bootstrap_examples/masonry.html')

def navbar_static(request):
    return render(request, 'app_bootstrap_examples/navbar-static.html')

def navbar_fixed(request):
    return render(request, 'app_bootstrap_examples/navbar-fixed.html')

def navbar_bottom(request):
    return render(request, 'app_bootstrap_examples/navbar-bottom.html')
