@echo OFF

pip install --upgrade pip

pip install env

python -m venv venv

call .\venv\Scripts\activate.bat

pip install --upgrade pip
