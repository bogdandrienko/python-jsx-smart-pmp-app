from django.http.response import Http404
from django.shortcuts import render
from .models import RationalModel
from .forms import RationalCreateForm
# Create your views here.


def rational_list(request):
    rational = RationalModel.objects.order_by('-id')
    page_name = 'Все рационализаторские предложения'
    context = {
        'rational': rational,
        'page_name': page_name
    }
    return render(request, 'rational/rational_list.html', context)

def rational_detail(request, rational_id):
    try:
        rational = RationalModel.objects.get(id = rational_id)
    except:
        raise Http404('Предложение не найдено')
    page_name = rational.rational_name
    context = {
        'rational': rational,
        'page_name': page_name
    }
    return render(request, 'rational/rational_detail.html', context)

def rational_create(request):
    if request.method == 'POST':
        RationalModel.objects.create(
            rational_name = request.POST['rational_name'],
            rational_description = request.POST['rational_description'],
            )
        return rational_list(request)
    post_form= RationalCreateForm(request.POST)
    page_name = 'Создать рационализаторское предложение'
    context = {
        'post_form': post_form,
        'page_name': page_name,
    }
    return render(request, 'rational/rational_create.html', context)
