@echo OFF

python -m pip install --upgrade pip

call .\env\Scripts\activate.bat

python -m pip install --upgrade pip

pip install auto-py-to-exe

auto-py-to-exe