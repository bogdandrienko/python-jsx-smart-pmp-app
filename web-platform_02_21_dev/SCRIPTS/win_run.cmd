@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip



set /p ip_port_name= "enter 'IP:PORT' (default- 127.0.0.1:8000) :  "

IF "%ip_port_name%"=="" (set ip_port_name="127.0.0.1:8000")

python manage.py runserver %ip_port_name%