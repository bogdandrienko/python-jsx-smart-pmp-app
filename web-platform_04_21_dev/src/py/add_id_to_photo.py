import os
import shutil
from os import close, path
from fnmatch import fnmatch

old_path = 'C:\\Users\\bogdan\\Desktop\\Нет в базе комбината\\Готово\\'
new_path = 'C:\\Users\\bogdan\\Desktop\\Нет в базе комбината\\Готово\\'
pattern = '*.JPG'
jpg = '.JPG'
name = ''
identificator = 110000001

for path, ubdirs, files in os.walk(old_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                identificator += 1
                old = name.split('.')[0].strip()
                new = old+'_'+str(identificator)+jpg

                os.rename(old_path+name,old_path+new)
                # shutil.copy(f'{old_path}{name}', f'{new_path}{new}')
                print(new)
            except:
                print(f'{old_path}{name} error rename to {old_path}{old+identificator+jpg}')
