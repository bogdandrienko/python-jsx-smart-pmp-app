from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import DocumentModel
from .forms import DocumentCreateForm


def documentation(request):
    # Проверка регистрации: если пользователь не вошёл в аккаунт, действия не срабатают, а его переадресует в форму входа
    if request.user.is_authenticated is not True:
        return redirect('app_account:login')
    # Переадресация пользователя на страницу входа

    if request.method == 'POST':
        DocumentModel.objects.create(
            document_name                = request.POST['document_name'],
            document_slug                = request.POST['document_slug'],
            document_description         = request.POST.get('document_description'),
            document_addition_file_1     = request.FILES.get('document_addition_file_1'),
            document_addition_file_2     = request.FILES.get('document_addition_file_2'),
            )
        return redirect('app_documentation:documentation')

    docs = DocumentModel.objects.order_by('-id')

    # Начало пагинатора: передать массив объектов и количество объектов на одной странице, объекты будут списком
    paginator = Paginator(docs, 3)
    page = request.GET.get('page')
    try:
        page = paginator.page(page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    # конец пагинатора, объекты под ключом "'page': page"

    form= DocumentCreateForm(request.POST, request.FILES)
    context = {
        'page': page,
        'form': form,
    }
    return render(request, 'app_documentation/documentation.html', context)
