@echo _
@echo _____
@echo START
@echo _____
@echo _

call %~dp0\bat\0_console_ru_activate.bat

call %~dp0\bat\1_cd_input.bat

call %~dp0\bat\2_python_activate_env.bat

call %~dp0\bat\7_python_manage_py_migrate.bat

