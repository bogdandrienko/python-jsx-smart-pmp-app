from django.shortcuts import render
from .models import ContactsModel

# Create your views here.


def contacts(request):
    contacts = ContactsModel.objects.order_by('-id')
    context = {
        'contacts': contacts,
    }
    return render(request, 'app_contacts/contacts.html', context)
