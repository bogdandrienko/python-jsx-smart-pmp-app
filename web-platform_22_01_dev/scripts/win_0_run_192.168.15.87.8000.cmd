@echo OFF

cd ..\

call .\env\Scripts\activate.bat

python manage.py runserver 192.168.15.87:8000

cmd