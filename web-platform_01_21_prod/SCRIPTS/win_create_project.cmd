@echo OFF

pip install env

set /p project_folder= "Please enter the 'project_folder':  "

IF "%project_folder%"=="" (set project_folder="project_folder")

mkdir %project_folder%

chdir %project_folder%

python -m venv win_env

call ./win_env/Scripts/activate.bat

pip install --upgrade pip 

pip install django

set /p project_name= "Please enter the 'project_name':  "

IF "%project_name%"=="" (set project_name="project_name")

django-admin startproject %project_name% .

set /p app_name= "Please enter the 'app_name':  "

IF "%app_name%"=="" (set app_name="app_name")

django-admin startapp %app_name%

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser

npm init -y