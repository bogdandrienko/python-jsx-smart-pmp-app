@echo OFF

cd ..\

call .\env\Scripts\activate.bat

python manage.py runserver 192.168.0.109:8000