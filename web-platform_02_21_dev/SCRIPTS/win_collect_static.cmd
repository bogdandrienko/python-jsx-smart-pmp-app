@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip



django-admin collectstatic