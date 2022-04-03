@echo OFF

mkdir django_project

chdir django_project

pip install --upgrade pip

pip install env

python -m venv env

call ./env/Scripts/activate.bat

python -m pip install --upgrade pip



pip install django

django-admin startproject backend_settings .

django-admin startapp backend

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



call cmd