import time



def mathem(value_1=10, value_2=30, action="+"):
    # if value_1 > value_2:
    #     print("Первое больше второго")
    # elif value_1 < value_2:
    #     print("Первое меньше второго")
    # elif value_1 == value_2:
    #     print("Первое равно второму")
    # else:
    #     print("Вы ввели некорректное действие")

    if action == "+":
        return value_1 + value_2
    elif action == "-":
        return value_1 - value_2
    elif action == "*":
        return value_1 * value_2
    elif action == "/":
        return value_1 / value_2
    else:
        print("Вы ввели некорректное действие")


# console_value_1 = input("Введите первое число: ")
# console_value_2 = int(input("Введите второе число: "))
# actions_1 = input("Введите действие (+ - * /): ")
#
# result = mathem(int(console_value_1), console_value_2, actions_1)
#
# print(result)

# array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# array = range(1, 123456)
#
# for x in array:
#     if x % 3 == 0:
#         print("Это число чётное")
#     elif x % 3 == 1:
#         print("Это число нечётное")
#     print(x)

integer_value_uauaua = 15
loop = True

# while integer_value_uauaua < 100:
#     integer_value_uauaua = integer_value_uauaua + 1
#     print(integer_value_uauaua)

# while loop:
#     integer_value_uauaua -= 1
#     if integer_value_uauaua == 10:
#         print("наша остановка господа")
#         break
#     if integer_value_uauaua % 2 == 1:
#         print(integer_value_uauaua)

# while loop:
#     integer_value_uauaua -= 1
#     if integer_value_uauaua == 1:
#         print("наша остановка господа")
#         break
#     if integer_value_uauaua == 9:
#         continue
#     if integer_value_uauaua == 7:
#         continue
#     if integer_value_uauaua % 2 == 1:
#         print(integer_value_uauaua)

timer_sec = 0
timer_min = 0
timer_hour = 0

multiplay = 1000

while loop:
    timer_sec += 1
    time.sleep(1 / multiplay)
    print(f"секунды: {timer_sec}")
    if timer_sec >= 59:
        timer_min += 1 * multiplay
        timer_sec = 0
        print(f"минуты: {timer_min}")
        if timer_min >= 59:
            timer_hour += 1
            timer_min = 0
            print(f"часы: {timer_hour}")
            if timer_hour >= 23:
                timer_sec = 0
                timer_min = 0
                timer_hour = 0
