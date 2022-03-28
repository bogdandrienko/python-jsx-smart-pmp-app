@echo OFF

cd ..\

call .\env\Scripts\activate.bat



pip install django

pip install pillow

pip install lxml

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



call cmd