@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip

python manage.py makemigrations

python manage.py migrate



set /p file_name= "enter 'file_name' (default- 'requirements.txt') :  "

IF "%file_name%"=="" (set file_name="requirements.txt")

pip install -r %file_name%