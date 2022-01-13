#!/bin/sh

cd ../

source env/bin/activate



sudo ufw allow 8000

python manage.py runserver 0.0.0.0:8000