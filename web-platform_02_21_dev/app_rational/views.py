from django.http.response import Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls.base import reverse
from .models import RationalModel, CategoryRationalModel
from .forms import RationalCreateForm
# Create your views here.

def rational_list(request, category_slug=None):
    if request.user.is_authenticated is not True:
        return redirect('login')
    category_page = None
    rational = None
    if category_slug != None:
        category_page = get_object_or_404(CategoryRationalModel, slug=category_slug)
        rational = RationalModel.objects.filter(rational_category=category_page).order_by('-rational_date_registrated')
    else:
        rational = RationalModel.objects.order_by('-rational_date_registrated')
    category = CategoryRationalModel.objects.order_by('-id')
    context = {
        'rational': rational,
        'category': category
    }
    return render(request, 'rational/rational_list.html', context)

def rational_detail(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    try:
        rational = RationalModel.objects.get(id=rational_id)
    except:
        raise Http404('Предложение не найдено')
    comments = rational.commentrationalmodel_set.order_by('-id')[:100]
    context = {
        'rational': rational,
        'comments': comments
    }
    return render(request, 'rational/rational_detail.html', context)

def rational_create(request):
    if request.user.is_authenticated is not True:
        return redirect('login')
    if request.method == 'POST':
        RationalModel.objects.create(
            rational_name = request.POST['rational_name'],
            rational_description = request.POST['rational_description'],
            rational_structure_from = request.POST['rational_structure_from'],
            rational_category = CategoryRationalModel.objects.get(name=request.POST['rational_structure_from']),
            # rational_category = CategoryRationalModel.objects.get(id='1')
            rational_autor_name = request.user.first_name,
            )
        return rational_list(request)
    post_form= RationalCreateForm(request.POST)
    category = CategoryRationalModel.objects.order_by('-id')
    context = {
        'post_form': post_form,
        'category': category
    }
    return render(request, 'rational/rational_create.html', context)

def rational_leave_comment(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    try:
        rational = RationalModel.objects.get(id = rational_id)
    except:
        raise Http404('Статья не найдена')

    rational.commentrationalmodel_set.create(
        # author_name = request.POST['name'],
        author_name = request.user.first_name,
        comment_text = request.POST['text']
        )

    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )

def rational_increase_rating(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    rational = RationalModel.objects.get(id = rational_id)
    rational.increase()
    rational.save()
    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )


def rational_decrease_rating(request, rational_id):
    if request.user.is_authenticated is not True:
        return redirect('login')
    rational = RationalModel.objects.get(id = rational_id)
    rational.decrease()
    rational.save()
    return HttpResponseRedirect( reverse('rational_detail', args = (rational.id,)) )