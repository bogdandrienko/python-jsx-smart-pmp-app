@echo OFF

python -m pip install --upgrade pip

pip install env

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip

pip freeze > requirements.txt

call cmd