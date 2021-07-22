from django.urls import path
from . import views


app_name = 'app_salary'
urlpatterns = [
    path('', views.salary, name='salary'),
    path('view_pdf/', views.view_pdf, name='view_pdf'),
    path('create_pdf/', views.render_pdf_view, name='create_pdf'),
    # path('check/<int:request_id>', views.salary, name='salary/check'),
]
