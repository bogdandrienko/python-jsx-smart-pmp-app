@echo OFF

python -m pip install --upgrade pip

pip install env

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip

call cmd