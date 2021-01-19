# № Импорты
# from utilities import type_variable

# # Инициализация переменной
# var = 11.0

# # Вывод значения и типа переменной на экран
# type_variable.print_variable_and_type_variable(var)
#
# # Конвертирование и присвоение нового значения переменной в несуществующий формат
# var = type_variable.convert_variable(var, 'привет')
#
# # Конвертирование и присвоение нового значения переменной
# var = type_variable.convert_variable(var, 'int')
#
# # Вывод значения и типа переменной на экран
# type_variable.print_variable_and_type_variable(var)

# # Импорты
# import time
# import sys
# from colorama import init, Fore, AnsiToWin32
# init(wrap=False)
# stream = AnsiToWin32(sys.stderr).stream
#
#
# # Отрисовка
# def render(sec, minute, hour):
#     print(Fore.GREEN + str(hour), Fore.WHITE + ":", Fore.BLUE + str(minute), Fore.WHITE + ":",
#           Fore.RED + str(sec), file=stream)
#     # print(str(hour)+' : '+str(minute)+' : '+str(sec))
#
#
# # Тик
# def tick(sec,  multiplayer_seconds):
#     sec = sec + int(multiplayer_seconds)
#     return sec
#
#
# # ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
# seconds = float(0)
# minutes = float(0)
# hours = float(0)
#
# # ЦИКЛ
# while True:
#     seconds = tick(seconds, 1)
#     if seconds > 59:
#         seconds = float(0)
#         minutes = minutes + int(1)
#         if minutes > 59:
#             minutes = float(0)
#             hours = hours + int(1)
#             if hours > 24:
#                 hours = float(0)
#                 minutes = float(0)
#                 seconds = float(0)
#     render(int(seconds), int(minutes), int(hours))
#     time.sleep(1.0)


# # Классы
#
# class Car:
#
#     wheels_number = 4
#
#     def __init__(self, name, color, year, is_crashed):
#         self.name = name
#         self.color = color
#         self.year = year
#         self.is_crashed = is_crashed
#
#
# mazda_car = Car(name="Mazda CX7", color="red", year=2017, is_crashed=True)
#
# print(mazda_car.name, mazda_car.is_crashed, mazda_car.wheels_number)
#
# bmw_car = Car(name="Mazda", color="black", year=2019, is_crashed=False)
#
# print(bmw_car.name, bmw_car.is_crashed, bmw_car.wheels_number)
#
# print(Car.wheels_number * 3)
#

# class Car:
#
#     wheels_number = 4
#
#     def __init__(self, name, color, year, is_crashed):
#         self.name = name
#         self.color = color
#         self.year = year
#         self.is_crashed = is_crashed
#
#     def drive(self, city):
#         print(self.name + ' is driving to ' + city)
#
#     def change_color(self, new_color):
#         self.color = new_color
#
#
# opel_car = Car('Opel Tigra', 'grey', 1995, True)
# print(opel_car.name, opel_car.color, opel_car.year, opel_car.wheels_number, opel_car.is_crashed)
#
# opel_car.drive('Paris')
# print(opel_car.drive)
#
# opel_car.change_color('green')
# print(opel_car.name, opel_car.color, opel_car.year, opel_car.wheels_number, opel_car.is_crashed)
#
#
# class Circle:
#
#     pi = 3.14
#
#     def __init__(self, radius=1):
#         self.radius = radius
#         self.circle_reference = 2 * self.pi * self.radius
#
#     def get_area(self):
#         return self.pi * (self.radius ** 2)
#
#     def get_circle_reference(self):
#         return 2 * self.pi * self.radius
#
#
# circle_1 = Circle(4)
#
# print(circle_1.get_area())
# print(circle_1.circle_reference)
# print(circle_1.get_circle_reference())
#
# def i_am_a_loop(value, multiplayer):
#     while value > multiplayer:
#         value = value - multiplayer
#     return value
# print(i_am_a_loop(29, 3))
