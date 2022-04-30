@echo OFF

cd ..\

rmdir /Q /S static

mkdir static

call .\env\Scripts\activate.bat



python manage.py collectstatic --noinput

rmdir /Q /S react\production\static

rmdir /Q /S react\test\static

call cmd