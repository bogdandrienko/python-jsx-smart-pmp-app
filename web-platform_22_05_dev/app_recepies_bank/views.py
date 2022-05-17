from django.shortcuts import render
from . import models


# Create your views here.


def read(request, recipe_id=None):
    # recipe = models.Todo.objects.get(id=recipe_id)

    recipe = {
        "title": "Самый вкусный борщ",
        "description": "Это блюдо — изюминка украинской кухни, которую знают, наверное, во всем мире. Несмотря на "
                       "убеждение о том, что у каждой хозяйки свой неповторимый борщ, я хочу поделиться с вами "
                       "вариантом, который наверняка станет вашим любимым. Сам процесс нельзя назвать сложным, "
                       "так что даже молодые и неопытные кулинары могут смело попробовать свои силы. Запоминайте!",
        "author": "Марина Золотцева",
        "category": "Украинская",
        "ingredients": "Картофель  — 4 Штуки Луковица  — 1 Штука Морковь  — 1 Штука Свекла  — 3 Штуки Капуста  — "
                       "1/3-1/2 Штуки Чеснок  — 2-3 Зубчиков",
    }

    context = {
        "recipe": recipe
    }
    return render(request, 'app_recepies_bank/pages/recipe_detail.html', context)
