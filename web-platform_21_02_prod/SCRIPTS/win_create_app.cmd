@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip



set /p app_name= "Please enter the 'app_name':  "

IF "%app_name%"=="" (set app_name="app_name")

django-admin startapp %app_name%

python manage.py makemigrations

python manage.py migrate