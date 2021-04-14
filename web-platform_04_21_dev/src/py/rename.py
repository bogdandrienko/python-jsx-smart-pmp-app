import os
import shutil
from os import close, path
from fnmatch import fnmatch

r = 'C:\\Users\\bogdan\\Desktop\\new\\'
r = 'E:\\WORK\\Система контроля и учета доступа\\Управление системой контроля и учёта доступа\\Импорт в систему\\Импорт фотографии\\3. Оригиналы фотографий\\Нет в базе комбината\\'
pattern = '*.JPG'
jpg = '.JPG'
filenames_old = []
filenames_new = []
filenames_err = []
first_name = ''
second_name = ''
identificator = 0

# text = open('text.txt', 'w')
# for path, subdirs, files in os.walk(r):
#     print(files)
#     for name in files:
#         # print(name)
#         # try:
#             if fnmatch(name, pattern):
#                     first_name = name.split('+')[0].strip()
#                     second_name = name.split('+')[1].split('.')[0].strip()
#                     # identificator = name.split('_')[1].split('.')[0].strip()
#                     # print(first_name + '+' + second_name)
#                     # try:
#                     os.rename(name,f'{first_name.capitalize()}+{second_name.capitalize()}{jpg}')
                    # print(f'{first_name.capitalize()}+{second_name.capitalize()}{jpg} + GOOD')
                    # except:
                    # text.write(f'first_name + '+' + second_name' + '  in_error' + '\n')
        # except:
            # text.write(name + '\n' + '  out_error')
# print(filenames_err)
# for path, subdirs, files in os.walk(r):
#     photos = files
#     for name in photos:
#         if fnmatch(name, pattern):
#             try:
#                 os.rename(r+name,r+f'{name.split("+")[0].strip().capitalize()}+{name.split("+")[1].split(".")[0].strip().capitalize()}{jpg}')
#             except:
#                 pass
# text.close()
