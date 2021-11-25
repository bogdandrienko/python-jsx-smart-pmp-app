@echo OFF

pip install --upgrade pip

pip install env

cd ..\

call .\env\Scripts\activate.bat

pip install --upgrade pip

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com

call cmd