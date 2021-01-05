set /p var= Please enter 'yes':

IF "%var%"=="yes" GOTO :case_1

@echo you NOT say 'yes' :(
GOTO :default

:case_1
@echo you say 'yes' :)

:default
set /p var= 