@echo _
@echo ___________________
@echo Запуск 'DJANGO.bat'
@echo ___________________
@echo _

chcp 65001
@echo _
@echo _______________________________________________________
@echo Изменение кодировки консоли на поддержку русского языка
@echo _______________________________________________________
@echo _

@echo _
@echo _________________________________________
@echo Подъём пути на уровень выше, чем bat-файл
@echo _________________________________________
@echo _
cd %~dp0\..

@echo _
@echo ________________________________
@echo Активация виртуального окружения
@echo ________________________________
@echo _
call %~dp0..\env\Scripts\activate.bat


:type_command
@echo _
@echo ____________________
@echo Выбор команды django
@echo ____________________
@echo _
set /p type_command= "Please select type of the - COMMAND: 'exit(0/default) _/_ run django server(1) _/_ migrate(2) _/_ create superuser(3)' :  "
IF "%type_command%"=="" GOTO :exit
IF "%type_command%"=="1" GOTO :runserver_command
IF "%type_command%"=="2" GOTO :migrations_command
IF "%type_command%"=="3" GOTO :createsuperuser_command
GOTO :exit


:runserver_command
@echo _
@echo _____________________
@echo Запуск сервера django
@echo _____________________
@echo _
cd %~dp0\..
python manage.py runserver
GOTO :exit


:createsuperuser_command
@echo _
@echo ____________________________________
@echo Регистрация суперпользователя django
@echo ____________________________________
@echo _
cd %~dp0\..
python manage.py createsuperuser
GOTO :exit


:migrations_command
@echo _
@echo _____________________________
@echo Выбор типа миграции в проекте
@echo _____________________________
@echo _
set /p type_migrations= "Please select type of the - MAKEMIGRATIONS + MIGRATE: 'exit(0/default) _/_ all apps migrations(1) _/_ specific app migrations(2)' :  "
IF "%type_migrations%"=="" GOTO :type_command
IF "%type_migrations%"=="0" GOTO :type_command
IF "%type_migrations%"=="1" GOTO :all_migrations
IF "%type_migrations%"=="2" GOTO :solo_migrations
GOTO :type_command


:all_migrations
@echo _
@echo ______________________________________
@echo Миграция для всех приложений в проекте
@echo ______________________________________
@echo _
cd %~dp0\..
python manage.py makemigrations
python manage.py migrate
GOTO :exit


:solo_migrations
@echo _
@echo ______________________________________________
@echo Миграция для специфичного приложения в проекте
@echo ______________________________________________
@echo _
set /p var= "Please Enter 'App_name' to complete makemigrations and migrate' :  "
cd %~dp0\..
python manage.py makemigrations %var%
python manage.py migrate %var%
GOTO :exit


:exit
@echo _
@echo _____
@echo Выход
@echo _____
@echo _
