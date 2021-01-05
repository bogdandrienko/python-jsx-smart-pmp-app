@echo _
@echo _____
@echo Make and migrations specific app
@echo _____
@echo _

call %~dp0\0_console_ru_activate.bat

call %~dp0\1_cd_input.bat

call %~dp0\2_python_activate_env.bat

call %~dp0\8_python_manage_py_migrate_solo.bat