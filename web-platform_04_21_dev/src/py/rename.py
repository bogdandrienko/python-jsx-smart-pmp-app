import os
import shutil
from os import close, path
from fnmatch import fnmatch

r = 'E:\WORK\Система контроля и учета доступа\Управление системой контроля и учёта доступа\Импорт в систему\Импорт фотографии\Оригиналы фотографий'
pattern = "*.JPG"
filenames_old = []
filenames_new = []
filenames_err = []
first_name = ''
second_name = ''
identificator = 0
jpg = '.JPG'

text = open('text.txt', 'w')
for path, subdirs, files in os.walk(r):
    for name in files:  
        try:
            if fnmatch(name, pattern):
                    first_name = name.split('+')[0].strip()
                    second_name = name.split('+')[1].split('_')[0].strip()
                    identificator = name.split('_')[1].split('.')[0].strip()
                    jpg = '.JPG'
                    # print(first_name, second_name, identificator)
                    try:
                        os.rename(name,f'{first_name.capitalize()}+{second_name.capitalize()}_{identificator}{jpg}')
                    except:
                        text.write(name + '\n')
        except:
            text.write(name + '\n')
# print(filenames_err) 
text.close()