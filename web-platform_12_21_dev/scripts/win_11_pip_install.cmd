@echo OFF

python -m pip install --upgrade pip

pip install env

cd ..\

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip

python manage.py makemigrations

python manage.py migrate

pip install -r requirements.txt

call cmd