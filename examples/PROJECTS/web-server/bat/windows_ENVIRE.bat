@echo _
@echo _____
@echo Start 'DJANGO.bat'
@echo _____
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

@echo _
@echo __________________
@echo Вызов окна консоли
@echo __________________
@echo _
cd %~dp0\..
call cmd
