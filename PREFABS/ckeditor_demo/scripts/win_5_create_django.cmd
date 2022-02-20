@echo OFF

python -m pip install --upgrade pip

pip install env

cd ..\

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip



pip install django

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser --username Bogdan --email bogdandrienko@gmail.com

call cmd