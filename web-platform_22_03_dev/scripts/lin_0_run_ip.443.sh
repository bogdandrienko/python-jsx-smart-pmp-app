#!/bin/sh

cd ../

source env/bin/activate



sudo ufw allow 88

python manage.py runserver 0.0.0.0:88
