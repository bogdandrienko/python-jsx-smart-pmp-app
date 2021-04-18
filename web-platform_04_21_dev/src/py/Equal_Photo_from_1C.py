import os
from shutil import move as copy
from fnmatch import fnmatch

relative_path =  os.path.dirname(os.path.abspath('__file__'))

try:
    export_file = relative_path+'\\'+'из 1С'
except:
    export_file = relative_path+'\\'+str(input(f'Введите название папки с фотографиями для сравнения: '))

try:
    equal_file = os.makedirs(relative_path+r'\Есть в базе')
except:
    equal_file = relative_path+r'\Есть в базе'

try:
    not_equal_file = os.makedirs(relative_path+r'\Нет в базе')
except:
    not_equal_file = relative_path+r'\Нет в базе'

try:
    error_file = os.makedirs(relative_path+r'\Ошибка')
except:
    error_file = relative_path+r'\Ошибка'

pattern = '*.JPG'

name_s = []
id_s = []

for path, subdirs, files in os.walk(export_file):
    for first_name in files:
        if fnmatch(first_name, pattern):
            name_s.append(first_name.split('.')[0].strip())
            id_s.append(first_name.split('_')[1].split('.')[0].strip())

for path, subdirs, files in os.walk(relative_path):
    for second_name in files:
        if fnmatch(second_name, pattern):
            try:
                
                if second_name.split('.')[0].strip() == name_s[id_s.index(second_name.split('_')[1].split('.')[0].strip())]:
                    copy(f'{relative_path}\\{second_name}', f'{equal_file}\\{second_name}')
                else:
                    copy(f'{relative_path}\\{second_name}', f'{error_file}\\{second_name}')
            except:
                try:
                    copy(f'{relative_path}\\{second_name}', f'{not_equal_file}\\{second_name}')
                except:
                    pass
