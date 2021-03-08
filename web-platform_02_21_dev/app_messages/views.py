from django.shortcuts import render, redirect
from .models import MessageModel
from .forms import MessageCreateForm

# Create your views here.


def messages(request):
    if request.method == 'POST':
        MessageModel.objects.create(
            message_name                = request.POST['message_name'],
            message_slug                = request.POST['message_slug'],
            message_description         = request.POST.get('message_description'),
            message_addition_file_1     = request.FILES.get('message_addition_file_1'),
            message_addition_file_2     = request.FILES.get('message_addition_file_2'),
            )
        return redirect('app_messages:messages')
    form= MessageCreateForm(request.POST, request.FILES)
    message = MessageModel.objects.order_by('-id')
    context = {
        'form': form,
        'message': message,
    }
    return render(request, 'app_messages/message.html', context)
