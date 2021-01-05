@echo _
@echo _____________________
@echo Make and migrations specific app
@echo _____________________
@echo _

set /p var= "Please Enter 'App_name' to complete makemigrations and migrate :" 

cd %~dp0\..

python manage.py makemigrations %var%
python manage.py migrate %var%