from django.http.response import Http404
from django.shortcuts import render, get_object_or_404
from .models import RationalModel, CategoryRationalModel
from .forms import RationalCreateForm
# Create your views here.

def rational_list(request, category_slug=None):
    category_page = None
    rational = None
    if category_slug != None:
        category_page = get_object_or_404(CategoryRationalModel, slug=category_slug)
        rational = RationalModel.objects.filter(rational_category=category_page)
    else:
        rational = RationalModel.objects.order_by('-id')
    category = CategoryRationalModel.objects.order_by('-id')
    context = {
        'rational': rational,
        'category': category
    }
    return render(request, 'rational/rational_list.html', context)

def rational_detail(request, rational_id):
    try:
        rational = RationalModel.objects.get(id=rational_id)
    except:
        raise Http404('Предложение не найдено')
    context = {
        'rational': rational,
    }
    return render(request, 'rational/rational_detail.html', context)

def rational_create(request):
    if request.method == 'POST':
        RationalModel.objects.create(
            rational_name = request.POST['rational_name'],
            rational_description = request.POST['rational_description'],
            rational_category = CategoryRationalModel.objects.get(slug='declared')
            )
        return rational_list(request)
    post_form= RationalCreateForm(request.POST)
    page_name = 'Создать рационализаторское предложение'
    context = {
        'post_form': post_form,
        'page_name': page_name,
    }
    return render(request, 'rational/rational_create.html', context)
