#!/bin/sh

cd ../

pip install --upgrade pip

pip install env



source env/bin/activate

# pip install --upgrade pip
# python3 -m venv djangoenv
# source djangoenv/bin/activate
# python manage.py makemigrations
# python manage.py migrate

# python manage.py runserver 0.0.0.0:8000
# gunicorn --bind 0.0.0.0:8000 djangoproject.wsgi

# sudo nano /etc/systemd/system/gunicorn.socket
# sudo nano /etc/systemd/system/gunicorn.service
# sudo systemctl enable gunicorn.service

# sudo systemctl start gunicorn.socket
# sudo systemctl enable gunicorn.socket
# sudo systemctl status gunicorn.socket

# sudo systemctl daemon-reload
# sudo systemctl restart gunicorn

# sudo nano /etc/nginx/sites-available/myprojectdir
# sudo ln -s /etc/nginx/sites-available/myprojectdir /etc/nginx/sites-enabled

# sudo nginx -t
# sudo systemctl restart nginx



pip install --upgrade pip

pip install django

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



sh