@echo _
@echo _____________________
@echo Make and migrate all apps
@echo _____________________
@echo _

cd %~dp0\..

python manage.py makemigrations
python manage.py migrate