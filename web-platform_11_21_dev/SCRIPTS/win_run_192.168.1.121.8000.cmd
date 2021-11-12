@echo OFF

cd ..\

call .\env\Scripts\activate.bat

python manage.py runserver 192.168.1.121:8000