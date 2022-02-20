@echo OFF

cd ..\

call .\venv\Scripts\activate.bat



python manage.py makemigrations

python manage.py migrate



call cmd