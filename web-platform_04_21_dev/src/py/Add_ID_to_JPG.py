import os
from fnmatch import fnmatch

relative_path =  os.path.dirname(os.path.abspath('__file__'))+'\\'
pattern = '*.JPG'
jpg = '.JPG'

def input_integer_value(description):
    while True:
        try:
            value = round(int(input(f'{description}')))
            if value > 0:
                break
        except:
            print('Ошибка, введите ещё раз.')
    return value

identificator = input_integer_value('Введите значение, с которого нужно начинать нумерацию: ')

for path, ubdirs, files in os.walk(relative_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                old = name.split('.')[0].strip()
                new = old+'_'+str(identificator)+jpg
                os.rename(relative_path+name,relative_path+new)
                identificator += 1
                print(new)
            except:
                print(f'{relative_path}{name} error rename to {relative_path}{old+str(identificator)+jpg}')
