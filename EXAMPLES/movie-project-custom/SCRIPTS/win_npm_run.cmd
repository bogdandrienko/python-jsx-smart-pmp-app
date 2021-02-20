@echo OFF

pip install --upgrade pip

pip install env

cd ..\

python -m venv env

call .\env\Scripts\activate.bat

pip install --upgrade pip



set /p script_name= "Please enter the 'script_name' (default - 'dev'):  "

IF "%script_name%"=="" (set script_name="dev")

npm run %script_name%