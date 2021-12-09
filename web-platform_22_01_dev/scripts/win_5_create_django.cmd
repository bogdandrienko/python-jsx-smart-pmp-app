@echo OFF

pip install --upgrade pip


cd ..\

call .\env\Scripts\activate.bat

pip install --upgrade pip

pip install django

pip install Pillow

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com

call cmd