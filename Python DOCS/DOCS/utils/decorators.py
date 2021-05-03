import time
from functools import wraps


def measure_time(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f'Executed {func} in {elapsed:0.4f} seconds')
        return result

    return wrap


def async_measure_time(func):
    @wraps(func)
    async def wrap(*args, **kwargs):
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f'Executed {func} in {elapsed:0.4f} seconds')
        return result

    return wrap
