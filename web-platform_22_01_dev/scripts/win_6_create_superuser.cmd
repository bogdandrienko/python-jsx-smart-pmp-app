@echo OFF

cd ..\

call .\env\Scripts\activate.bat



python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com



call cmd