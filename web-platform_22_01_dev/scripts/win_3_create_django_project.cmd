@echo OFF

pip install --upgrade pip

pip install env

mkdir django_project

chdir django_project

python -m venv env

call ./env/Scripts/activate.bat

python -m pip install --upgrade pip



pip install django

django-admin startproject app_settings .

django-admin startapp app_django

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



call cmd