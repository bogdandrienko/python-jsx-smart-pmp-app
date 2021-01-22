pip install env

set /p project_folder= "Please enter the 'project_folder':  "

IF "%project_folder%"=="" GOTO :create_default_folder_name

GOTO :create_folder


:create_default_folder_name

set %project_folder% = "project_folder"


:create_folder

mkdir %project_folder%

chdir %project_folder%

python -m venv env_name

call ./env_name/Scripts/activate.bat

pip install --upgrade pip 

pip install django

set /p project_name= "Please enter the 'project_name':  "

IF "%project_name%"=="" GOTO :create_default_project

GOTO :create_project


:create_default_project

set %project_name% = "project_name"


:create_project

django-admin startproject %project_name% .

set /p app_name= "Please enter the 'app_name':  "

django-admin startapp %app_name%

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser

npm init -y