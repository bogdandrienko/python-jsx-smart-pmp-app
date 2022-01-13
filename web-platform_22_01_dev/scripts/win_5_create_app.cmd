@echo OFF

cd ..\

call .\env\Scripts\activate.bat



set /p app_name= "Please enter the 'app_name':  "

IF "%app_name%"=="" (set app_name="app_name")

django-admin startapp %app_name%

python manage.py makemigrations

python manage.py migrate



call cmd