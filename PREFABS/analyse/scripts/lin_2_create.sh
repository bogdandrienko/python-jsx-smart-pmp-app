#!/bin/sh

cd ../

pip install --upgrade pip

pip install env

source env/bin/activate

pip install --upgrade pip



pip install django

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



sh