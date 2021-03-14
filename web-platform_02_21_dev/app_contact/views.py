from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import ContactModel
from .forms import ContactCreateForm


def contact(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа
 
    if request.method == 'POST':
        ContactModel.objects.create(
        contact_name            = request.POST['contact_name'],
        contact_slug            = request.POST['contact_slug'],
        contact_description     = request.POST.get('contact_description'),
        contact_image           = request.FILES.get('contact_image'),
        )
        return redirect('app_contact:contact')

    contacts = ContactModel.objects.order_by('-id')

    # Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(contacts, 3)
    page = request.GET.get('page')
    try:
        page = paginator.page(page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    # конец пагинатора, объекты под ключом "'page': page"

    form = ContactCreateForm(request.POST, request.FILES)
    context = {
        'page': page,
        'form': form,
    }
    return render(request, 'app_contact/contact.html', context)
