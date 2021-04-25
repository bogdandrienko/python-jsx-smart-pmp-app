@echo OFF

call .\env\Scripts\activate.bat

pip install --upgrade pip

pip freeze > requirements.txt