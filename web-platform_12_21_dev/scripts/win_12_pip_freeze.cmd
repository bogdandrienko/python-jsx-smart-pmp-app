@echo OFF

pip install --upgrade pip

pip install env

cd ..\

call .\env\Scripts\activate.bat

pip install --upgrade pip

pip freeze > requirements.txt

call cmd