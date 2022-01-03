#!/bin/sh

cd ../

sudo apt-get update -y

sudo apt upgrade -y

sudo apt install python3-pip -y

sudo apt-get install python3-venv -y

python3 -m venv env

source env/bin/activate

python -m pip install --upgrade pip



pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com