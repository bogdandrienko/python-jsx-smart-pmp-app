@echo OFF

python -m pip install --upgrade pip

pip install env

python -m venv venv

call .\venv\Scripts\activate.bat

python -m pip install --upgrade pip
