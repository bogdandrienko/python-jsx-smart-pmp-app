from django.shortcuts import render


# Create your views here.

# home
def home(request):
    """
    Домашняя страница
    """
    try:
        response = 0
        context = {
            'response': response,
        }
    except Exception as error:
        context = {
            'response': -1,
        }

    return render(request, 'components/home.html', context)
