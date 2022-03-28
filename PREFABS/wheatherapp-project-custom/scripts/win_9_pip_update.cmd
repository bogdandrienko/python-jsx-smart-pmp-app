@echo OFF

cd ..\

pip install --upgrade pip

pip install env

python -m venv env

call .\env\Scripts\activate.bat



python -m pip install --upgrade pip



call cmd