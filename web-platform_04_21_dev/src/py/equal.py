import os
import shutil
from os import close, path
from fnmatch import fnmatch

relative = r'E:\WORK\Система контроля и учета доступа\Управление системой контроля и учёта доступа\Импорт в систему\Импорт фотографии\3. Оригиналы фотографий\Нет в базе комбината'
from_1C = r'E:\WORK\Система контроля и учета доступа\Управление системой контроля и учёта доступа\Импорт в систему\Импорт фотографии\1. Из базы 1С выгруженное'
good = r'E:\WORK\Система контроля и учета доступа\Управление системой контроля и учёта доступа\Импорт в систему\Импорт фотографии\3. Оригиналы фотографий\Нет в базе комбината\Есть в базе'
pattern = '*.JPG'

for path, ubdirs, files in os.walk(relative):
    for first_name in files:
        if fnmatch(first_name, pattern):
            for path, subdirs, files in os.walk(from_1C):
                for second_name in files:
                    try:
                        first = first_name.split('.')[0].strip()
                        second = second_name.split('.')[0].strip().split('_')[0].strip()
                        if (first == second):
                            shutil.copy(f'{relative}/{first_name}', f'{good}/{first_name}')
                        else:
                            print(first+'not equal'+second)
                    except:
                        pass
