# Проверка на тип переменной:
def check_type_of_variable(variable):
    return type(variable)


# Конвертирование одного типа переменной в другой
def convert_variable(variable, new_type):
    if new_type == 'bool':
        return bool(variable)
    if new_type == 'float':
        return float(variable)
    if new_type == 'int':
        return int(variable)
    if new_type == 'str':
        return str(variable)
    if new_type == 'list':
        return list(variable)
    if new_type == 'dict':
        return dict(variable)
    if new_type == 'tuple':
        return tuple(variable)
    if new_type == 'set':
        return set(variable)
    else:
        print('Error: "' + str(new_type) + '" - not correct Parameter' +
              ' / Parameter = new_type / Function = convert_variable')

    return variable


def print_variable_and_type_variable(variable):
    print(str(variable) + " - " + str(check_type_of_variable(variable)))

########################################################################################################################
# # Импорт данного файла в проект
# from utilities import type_variable
#
# # Инициализация переменной
# var = 11.0
#
# # Вывод значения и типа переменной на экран
# print_variable_and_type_variable(var)
#
# # Конвертирование и присвоение нового значения переменной в несуществующий формат
# var = convert_variable(var, 'привет')
#
# # Конвертирование и присвоение нового значения переменной
# var = convert_variable(var, 'int')
#
# # Вывод значения и типа переменной на экран
# print_variable_and_type_variable(var)
