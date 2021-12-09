@echo _
@echo ________________
@echo Запуск 'NPM.bat'
@echo ________________
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
@echo _________________
@echo Выбор команды npm
@echo _________________
@echo _
set /p type_command= "Please select type of the - COMMAND: 'exit(0/default) _/_ npm init (1) _/_ npm install(2) _/_ npm run(3)' :  "
IF "%type_command%"=="" GOTO :exit
IF "%type_command%"=="1" GOTO :init_command
IF "%type_command%"=="2" GOTO :install_command
IF "%type_command%"=="3" GOTO :run_command
GOTO :exit


:init_command
@echo _
@echo _________________________
@echo Инициализация проекта npm
@echo _________________________
@echo _
set /p type_init= "Please select type of the - INIT: 'exit(0/default) _/_ simple(1) _/_ advanced(2)' :  "
IF "%type_init%"=="" GOTO :type_command
IF "%type_init%"=="0" GOTO :type_command
IF "%type_init%"=="1" GOTO :simple_init
IF "%type_init%"=="2" GOTO :advanced_init
GOTO :type_command


:simple_init
@echo _
@echo _________________________________
@echo Простая инициализация проекта npm
@echo _________________________________
@echo _
npm init -y
GOTO :exit


:advanced_init
@echo _
@echo _____________________________________
@echo Продвинутая инициализация проекта npm
@echo _____________________________________
@echo _
npm init
GOTO :exit


:install_command
@echo _
@echo _____________________
@echo Установка пакетов npm
@echo _____________________
@echo _
set /p type_install= "Please select type of the - INSTALL: 'exit(0/default) _/_ from package.json(1) _/_ external download(2)' :  "
IF "%type_install%"=="" GOTO :type_command
IF "%type_install%"=="0" GOTO :type_command
IF "%type_install%"=="1" GOTO :package_install
IF "%type_install%"=="2" GOTO :external_install
GOTO :type_command


:package_install
@echo _
@echo ___________________________________
@echo Установка пакетов из 'package.json'
@echo ___________________________________
@echo _
npm install
GOTO :exit


:external_install
@echo _
@echo __________________________________
@echo Ввод внешних пакетов для установки
@echo __________________________________
@echo _
set /p external_install= "Please enter names of - EXTERNAL packages: 'exit(0/default) _/_ ...(->) :  "
IF "%external_install%"=="" GOTO :install_command
IF "%type_install%"=="0" GOTO :install_command

@echo _
@echo ________________________________________________
@echo Выбор настроек для установки внешних компонентов
@echo ________________________________________________
@echo _
set /p external_settings= "Please set settings to install  - EXTERNAL packages: 'exit(0/default) _/_ -g(global); --save(local); --save-dev(developer)(->) :  "
IF "%external_settings%"=="0" GOTO :install_command
npm install %external_install% %external_settings%
GOTO :exit


:run_command
@echo _
@echo ___________________
@echo Запуск скриптов npm
@echo ___________________
@echo _
set /p npm_command= "Please select type of the - INSTALL: 'exit(0/default) _/_ npm run test(1) _/_ npm run dev(2) _/_ npm run build(3)' :  "
IF "%npm_command%"=="" GOTO :type_command
IF "%npm_command%"=="0" GOTO :type_command
IF "%npm_command%"=="1" GOTO :test_command
IF "%npm_command%"=="2" GOTO :dev_command
IF "%npm_command%"=="3" GOTO :build_command
GOTO :type_command


:test_command
@echo _
@echo _________________________
@echo Запуск npm скрипта 'test'
@echo _________________________
@echo _
npm run test
GOTO :exit


:dev_command
@echo _
@echo ________________________
@echo Запуск npm скрипта 'dev'
@echo ________________________
@echo _
npm run dev
GOTO :exit


:build_command
@echo _
@echo __________________________
@echo Запуск npm скрипта 'build'
@echo __________________________
@echo _
npm run build
GOTO :exit


:createsuperuser_command
@echo _
@echo ____________________________________
@echo Регистрация суперпользователя Django
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
IF "%type_migrations%"=="" GOTO :exit
IF "%type_migrations%"=="0" GOTO :exit
IF "%type_migrations%"=="1" GOTO :all_migrations
IF "%type_migrations%"=="2" GOTO :solo_migrations
GOTO :exit


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
