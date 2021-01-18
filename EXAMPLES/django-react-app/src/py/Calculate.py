#Импорты
import sys, math
from colorama import init, Fore, AnsiToWin32
init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream
#Функция расчёта
def mathematic(firstValue, argument, secondValue):
    result = str('Вы ввели некорректное действие')
    if argument=='*':
        result = int(firstValue * secondValue)
    if argument=='/':
        if secondValue == 0:
            while secondValue == 0:
                print('Делитель равен нулю!')
                secondValue = int(input("Введите  второе число: "))           
        if secondValue != 0:
            result = firstValue / secondValue
        if result > int(result):
            result = float(result)
        if result == int(result):
            result = int(result)
    if argument=='+':
        result = int(firstValue + secondValue)
    if argument=='-':
        result = int(firstValue - secondValue)
    if argument=='%':
        result = str(int(firstValue * secondValue / 100)) + '%'
    if argument=='**':
        result = int(firstValue ** secondValue)
    if argument=='^':
        result = 'Корень из первого числа:  ' + str(math.sqrt(firstValue)) + '     Корень из второго числа:  ' + str(math.sqrt(secondValue))
    return result
#Цикл
while True:
    print(Fore.YELLOW + '', file=stream)
    a = int(input("Введите первое число: "))
    print(Fore.GREEN + '', file=stream)
    b = str(input("Введите действие: "))
    print(Fore.BLUE + '', file=stream)
    c = int(input("Введите второе число: "))
    print(Fore.RED + '', file=stream)
    print('Ответ: ' + str(mathematic(a, b, c)))
    print(Fore.RESET + '', file=stream)
    if str.lower(str(input("Выйти?(N/n)"))) == "n":
        break