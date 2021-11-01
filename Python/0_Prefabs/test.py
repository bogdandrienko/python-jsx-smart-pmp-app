import asyncio
import time
from utils import MeasureTimeClass as measureDecorators
from utils import VoiceClass as Voice
from multiprocessing import current_process


@measureDecorators.async_measure_time
async def tick():
    Voice.speak('Тик')
    print('Tick')
    await asyncio.sleep(0.5)
    Voice.speak('Так')
    print('Tock')


@measureDecorators.measure_time
def ticker():
    Voice.speak('Тик')
    print('Tick')
    time.sleep(0.5)
    Voice.speak('Так')
    print('Tock')


@measureDecorators.async_measure_time
async def async_main():
    await asyncio.gather(tick(), tick(), tick())


@measureDecorators.measure_time
def sync_main():
    asyncio.gather(ticker(), ticker(), ticker())


@measureDecorators.measure_time
def main(comprehensions: True):
    if comprehensions:
        # List comprehensions usage
        [func() for _ in range(1, 4) for func in [ticker]]
    else:
        # Loop usage
        for func in [ticker]:
            for _ in range(1, 4):
                func()


async def custom_sleep():
    # print('SLEEP {}\n'.format(datetime.now()))
    await asyncio.sleep(1)


@measureDecorators.async_measure_time
async def factorial(name, num):
    f = 1
    for i in range(2, num + 1):
        print('Task {}: Compute factorial({})'.format(name, i))
        await custom_sleep()
        f *= i
    print('Task {}: factorial({}) is {}\n'.format(name, num, f))


def fact(name, number):
    return f'Task {name}: Compute factorial({number})'


@measureDecorators.async_measure_time
async def main():
    await asyncio.gather(*[factorial(x, y) for x in 'ABC' for y in range(1, 4)])


def doubler(num):
    result = num * 2
    proc_name = current_process().name
    print('{0} doubled to {1} by: {2}'.format(num, result, proc_name))


if __name__ == '__main__':
    # asyncio.run(async_main())
    # sync_main()
    Voice.speak('Запуск')
    main(True)
    Voice.speak('Завершено')
