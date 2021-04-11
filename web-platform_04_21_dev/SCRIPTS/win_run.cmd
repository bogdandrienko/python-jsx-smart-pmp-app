@echo OFF

cd ..\

call .\env\Scripts\activate.bat

python manage.py runserver