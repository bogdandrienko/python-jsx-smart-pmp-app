@echo OFF

pip install env

cd ..\

python -m venv win_env

call .\win_env\Scripts\activate.bat

pip install --upgrade pip

pip install django

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate
