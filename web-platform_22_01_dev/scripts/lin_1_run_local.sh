#!/bin/sh

cd ../

sudo apt-get update -y

sudo apt upgrade -y

sudo apt install python3-pip -y

sudo apt-get install python3-venv -y

python3 -m venv env

source env/bin/activate

python -m pip install --upgrade pip



python manage.py runserver 127.0.0.1:8000