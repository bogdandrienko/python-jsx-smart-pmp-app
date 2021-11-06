@echo OFF

call .\env\Scripts\activate.bat

pip freeze > requirements.txt