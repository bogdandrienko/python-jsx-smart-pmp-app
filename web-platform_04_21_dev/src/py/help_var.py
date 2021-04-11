# Переменные:
#
#     Boolean - логические значения типа правда(1)/ложь(0).
#         bool:   True
#                 False
#
#     Float - значения с плавающей запятой:
#         float:  0.1
#                 1.02
#                 10.003
#                 100.0004
#
#     Integer - целочисленные значения:
#         int:    1
#                 10
#                 100
#
#     String - строка, массив символьных значений:
#         str: "Hi"
#                 "Hello"
#                 'Help!1!!1'
#                 "How much? - 1000."
#
#     List - массив переменных.
#         list:   [1]
#                 [1, 10.5]
#                 ["Hi!", 100, 10.5]
#
#     Dictionary - словарь, массив парных переменных типа ключ-значение.
#         dict:   {"luckyNumber": 666}
#                 {'Name': "Bogdan", "ID": 1}
#                 {'maxLevel': 80, "currentLevel": 79.5}
#
#     Tuple - упорядоченная неизменяемая последовательность объектов.
#         tuple:  (1, 10.5, "Bogdan")
#                 ("Id", 12, '100.5')
#                 (100, 'experience', "maximum")
#
#     Set - неупорядоченная коллекция уникальных объектов.
#         set:    {"hello", 94, 0.5}
#                 {"id", 94, 32.3}
#                 {'exp', 100.5, "12"}
#
#
# # Проверка на тип переменной:
# def check_type_of_variable(variable):
#     return type(variable)
#
#
# # Конвертирование одного типа переменной в другой
# def convert_variable(variable, new_type):
#     if new_type == 'bool':
#         return bool(variable)
#     if new_type == 'float':
#         return float(variable)
#     if new_type == 'int':
#         return int(variable)
#     if new_type == 'str':
#         return str(variable)
#     if new_type == 'list':
#         return list(variable)
#     if new_type == 'dict':
#         return dict(variable)
#     if new_type == 'tuple':
#         return tuple(variable)
#     if new_type == 'set':
#         return set(variable)
#     else:
#         print('Error: "' + str(new_type) + '" - not correct Parameter' +
#               ' / Parameter = new_type / Function = convert_variable')
#
#     return variable
#
#
# def print_variable_and_type_variable(variable):
#     print(str(variable) + " - " + str(check_type_of_variable(variable)))
#
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
