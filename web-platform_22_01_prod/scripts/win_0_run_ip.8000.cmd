@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip



python manage.py runserver 0.0.0.0:8000



cmd