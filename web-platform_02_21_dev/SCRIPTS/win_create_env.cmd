@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv win_env

call .\win_env\Scripts\activate.bat

pip install --upgrade pip

pip install django Pillow

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser