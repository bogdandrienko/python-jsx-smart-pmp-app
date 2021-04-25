import os
from fnmatch import fnmatch

relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
pattern = '*.jpg'
jpg = '.jpg'
old = ''


def input_integer_value(description):
    """
Functions for return whole positive number
    :param description:
    :return:
    """
    while True:
        try:
            value = round(int(input(f'{description}')))
            if value > 0:
                break
        except:
            print('Ошибка, введите ещё раз.')
    return value


identifier = input_integer_value('Введите значение, с которого нужно начинать нумерацию: ')

for path, subdirs, files in os.walk(relative_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                old = name.split('.')[0].strip()
                jpg = '.' + name.split('.')[1].strip()
                new = old + '_' + str(identifier) + jpg
                os.rename(relative_path + name, relative_path + new)
                identifier += 1
                print(new)
            except:
                print(f'{relative_path}{name} error rename to {relative_path}{old + str(identifier) + jpg}')
