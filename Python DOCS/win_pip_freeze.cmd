@echo OFF

call .\venv\Scripts\activate.bat

pip install --upgrade pip

pip freeze > requirements.txt