@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip




pip install django

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser