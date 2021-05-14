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
