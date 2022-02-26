@echo OFF

cd ..\

call .\env\Scripts\activate.bat



python manage.py runserver 127.0.0.1:8001



cmd