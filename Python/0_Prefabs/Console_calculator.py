import math
import sys
from colorama import init, Fore, AnsiToWin32

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def mathematics(first_value, argument, second_value):
    result = str('Вы ввели некорректное действие')
    if argument == '*':
        result = int(first_value * second_value)
    if argument == '/':
        if second_value == 0:
            while second_value == 0:
                print('Делитель равен нулю!')
                second_value = int(input("Введите  второе число: "))
        if second_value != 0:
            result = first_value / second_value
        if result > int(result):
            result = float(result)
        if result == int(result):
            result = int(result)
    if argument == '+':
        result = int(first_value + second_value)
    if argument == '-':
        result = int(first_value - second_value)
    if argument == '%':
        result = str(int(first_value * second_value / 100)) + '%'
    if argument == '**':
        result = int(first_value ** second_value)
    if argument == '^':
        result = 'Корень из первого числа:  ' + str(math.sqrt(first_value)) + '     Корень из второго числа:  ' + str(
            math.sqrt(second_value))
    return result


while True:
    print(Fore.YELLOW + '', file=stream)
    a = int(input("Введите первое число: "))
    print(Fore.GREEN + '', file=stream)
    b = str(input("Введите действие: "))
    print(Fore.BLUE + '', file=stream)
    c = int(input("Введите второе число: "))
    print(Fore.RED + '', file=stream)
    print('Ответ: ' + str(mathematics(a, b, c)))
    print(Fore.RESET + '', file=stream)
    if str.lower(str(input("Выйти?(N/n)"))) == "n":
        break
