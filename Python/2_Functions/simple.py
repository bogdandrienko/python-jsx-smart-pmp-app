import datetime


def func_alarm(text):
    print(text)


func_alarm('30 years')


def func_today():
    return datetime.datetime.now()


print(func_today())
