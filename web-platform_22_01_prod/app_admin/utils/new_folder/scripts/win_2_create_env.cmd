@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m env env

call .\env\Scripts\activate.bat

pip install --upgrade pip

call cmd