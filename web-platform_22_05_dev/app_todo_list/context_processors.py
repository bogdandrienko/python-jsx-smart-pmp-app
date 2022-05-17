from . import models


def todo_counter(request):
    try:
        count = models.Todo.objects.all().count()
    except Exception as error:
        count = 0
        print(f"context_processors.py todo_counter {error}")

    return dict(todo_count=count)
