@echo OFF

mkdir django

chdir django

pip install --upgrade pip

pip install env

python -m venv djangoenv

call ./djangoenv/Scripts/activate.bat

python -m pip install --upgrade pip



pip install django

django-admin startproject djangoproject .

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



call cmd