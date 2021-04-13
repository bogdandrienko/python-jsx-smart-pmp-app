import os
import shutil
from os import close, path
from fnmatch import fnmatch

relative = 'E:/WORK/Система контроля и учета доступа/Управление системой контроля и учёта доступа/Импорт в систему/Импорт фотографии/Оригиналы фотографий'
from_1C = 'E:/WORK/Система контроля и учета доступа/Управление системой контроля и учёта доступа/Импорт в систему/Импорт фотографии/из 1С'
good = 'E:/WORK/Система контроля и учета доступа/Управление системой контроля и учёта доступа/Импорт в систему/Импорт фотографии/Отлично'
pattern = '*.JPG'

for path, ubdirs, files in os.walk(relative):
    for first_name in files:
        first = first_name.split('_')[1].split('.')[0].strip()
        if fnmatch(first_name, pattern):
            for path, subdirs, files in os.walk(from_1C):
                for second_name in files:
                    second = second_name.split('_')[1].split('.')[0].strip()
                    try:
                        if (first == second):
                            shutil.move(f'{relative}/{first_name}', f'{good}/{first_name}')
                    except:
                        pass
