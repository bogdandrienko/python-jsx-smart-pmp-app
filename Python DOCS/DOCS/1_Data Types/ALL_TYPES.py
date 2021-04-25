f"""
Все типы переменных.
"""
#       Variables:
#   Bool:
#     Boolean - логические значения типа правда(1)/ложь(0).
#         bool:   True
#                 False
bool_1 = True
bool_2 = False

#   Float:
#     Float - значения с плавающей запятой:
#         float:  0.1
#                 1.02
#                 10.003
#                 100.0004
float_1 = 1.0
float_2 = 1.4
float_3 = 10.8

#   Integer:
#     Integer - целочисленные значения:
#         int:    1
#                 10
#                 100
integer_1 = 10
integer_2 = 0
integer_3 = -5

#   String:
#     String - строка, массив символьных значений:
#         str: "Hi"
#                 "Hello"
#                 'Help!1!!1'
#                 "How much? - 1000."
string_1 = 'Hi!'
string_2 = '123'
string_3 = 'Me is 123.0'

#   List:
#     List - массив переменных.
#         list:   [1]
#                 [1, 10.5]
#                 ["Hi!", 100, 10.5]
list_value = ["Hi!", 100, 10.5, False]

#   Dict:
#     Dictionary - словарь, массив парных переменных типа ключ-значение.
#         dict:   {"luckyNumber": 666}
#                 {'Name': "Bogdan", "ID": 1}
#                 {'maxLevel': 80, "currentLevel": 79.5}
dict_value = {"maxLevel": 80, "currentLevel": 79.5, "upper": False}

#   Tuple:
#     Tuple - упорядоченная неизменяемая последовательность объектов.
#         tuple:  (1, 10.5, "Bogdan")
#                 ("Id", 12, '100.5')
#                 (100, 'experience', "maximum")
tuple_value = (100, "experience", "maximum", True)

#   Set:
#     Set - неупорядоченная коллекция уникальных объектов.
#         set:    {"hello", 94, 0.5}
#                 {"id", 94, 32.3}
#                 {'exp', 100.5, "12"}
set_value = {"exp", 100.5, "12", True}

print(f'value: {bool_1}| type: {type(bool_1)}')
print(f'value: {string_1}| type: {type(string_1)}')
print(f'value: {list_value}| type: {type(list_value)}')


#   Конвертирование одного типа переменной в другой
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
