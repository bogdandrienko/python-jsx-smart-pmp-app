import os
from fnmatch import fnmatch

relative_path =  os.path.dirname(os.path.abspath('__file__'))+'\\'
pattern = '*.JPG'
jpg = '.JPG'

for path, ubdirs, files in os.walk(relative_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                first_name = name.split('_')[0].strip().split('+')[0].strip()
                second_name = name.split('_')[0].strip().split('+')[1].strip()
                if ord(first_name[0:1:]) == 80:
                    first_name = chr(1056)+first_name[1::]
                if ord(second_name[0:1:]) == 80:
                    second_name = chr(1056)+second_name[1::]
                new = f'{first_name}+{second_name}_{name.split("_")[1].strip()}'
                os.rename(relative_path+name,relative_path+new)
            except:
                try:
                    print(f'{relative_path}{name} error rename to {relative_path}{name+jpg}')
                except:
                    print(name)
