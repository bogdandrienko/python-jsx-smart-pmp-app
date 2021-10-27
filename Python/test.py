import asyncio
import time
import utils.decorators as decorators
from utils.voice_module_audio import Voice
from multiprocessing import Process, current_process


@decorators.async_measure_time
async def tick():
    Voice.speak('Тик')
    print('Tick')
    await asyncio.sleep(0.5)
    Voice.speak('Так')
    print('Tock')


@decorators.measure_time
def ticker():
    Voice.speak('Тик')
    print('Tick')
    time.sleep(0.5)
    Voice.speak('Так')
    print('Tock')


@decorators.async_measure_time
async def async_main():
    await asyncio.gather(tick(), tick(), tick())


@decorators.measure_time
def sync_main():
    asyncio.gather(ticker(), ticker(), ticker())


@decorators.measure_time
def main(comprehensions: True):
    if comprehensions:
        # List comprehensions usage
        [func() for _ in range(1, 4) for func in [ticker]]
    else:
        # Loop usage
        for func in [ticker]:
            for _ in range(1, 4):
                func()


if __name__ == '__main__':
    # asyncio.run(async_main())
    # sync_main()
    Voice.speak('Запуск')
    main(True)
    Voice.speak('Завершено')


async def custom_sleep():
    # print('SLEEP {}\n'.format(datetime.now()))
    await asyncio.sleep(1)


@decorators.async_measure_time
async def factorial(name, num):
    f = 1
    for i in range(2, num + 1):
        print('Task {}: Compute factorial({})'.format(name, i))
        await custom_sleep()
        f *= i
    print('Task {}: factorial({}) is {}\n'.format(name, num, f))


def fact(name, number):
    return f'Task {name}: Compute factorial({number})'


@decorators.async_measure_time
async def main():
    await asyncio.gather(*[factorial(x, y) for x in 'ABC' for y in range(1, 4)])


def doubler(num):
    result = num * 2
    proc_name = current_process().name
    print('{0} doubled to {1} by: {2}'.format(
        num, result, proc_name))

# if __name__ == '__main__':
#     # start = time.time()
#     # asyncio.run(main())
#     # end = time.time()
#
#     numbers = [5, 10, 15, 20, 25]
#     procs = []
#     proc = Process(target=doubler, args=(5,))
#
#     for index, number in enumerate(numbers):
#         proc = Process(target=doubler, args=(number,))
#         procs.append(proc)
#         proc.start()
#
#     proc = Process(target=doubler, name='Test', args=(2,))
#     proc.start()
#     procs.append(proc)
#
#     for proc in procs:
#         proc.join()









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
