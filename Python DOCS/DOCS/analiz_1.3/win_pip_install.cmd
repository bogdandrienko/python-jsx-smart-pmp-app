@echo OFF

python -m pip install --upgrade pip

call .\venv\Scripts\activate.bat

python -m pip install --upgrade pip

pip install -r requirements.txt