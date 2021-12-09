@echo OFF

python -m pip install --upgrade pip

pip install env

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip

pip install -r requirements.txt

call cmd