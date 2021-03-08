from django.shortcuts import render
from .models import DocumentModel

# Create your views here.


def docs(request):
    docs = DocumentModel.objects.order_by('-id')
    context = {
        'docs': docs,
    }
    return render(request, 'app_documentations/documentations.html', context)
