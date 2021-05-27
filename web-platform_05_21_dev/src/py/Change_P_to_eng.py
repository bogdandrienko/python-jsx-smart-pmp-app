import os
from fnmatch import fnmatch

relative_path =  os.path.dirname(os.path.abspath('__file__'))+'\\'
pattern = '*.jpg'

for path, ubdirs, files in os.walk(relative_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                first_name = name.split('+')[0].strip()
                second_name = name.split('+')[1].strip()
                if ord(first_name[0:1:]) == 1056 or ord(second_name[0:1:]) == 1056:
                    if ord(first_name[0:1:]) == 1056:
                        first_name = chr(80)+first_name[1::]
                    if ord(second_name[0:1:]) == 1056:
                        second_name = chr(80)+second_name[1::]
                    new = f'{first_name}+{second_name}'
                    os.rename(relative_path+name,relative_path+new)
                    print(new)
            except:
                try:
                    print(f'{relative_path}{name} error rename to {relative_path}{new}')
                except:
                    print(name)
