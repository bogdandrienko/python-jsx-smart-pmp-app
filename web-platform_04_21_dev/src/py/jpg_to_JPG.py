import os
from fnmatch import fnmatch

relative_path =  os.path.dirname(os.path.abspath('__file__'))+'\\'
pattern = '*.jpg'
jpg = '.JPG'

for path, ubdirs, files in os.walk(relative_path):
    for name in files:
        if fnmatch(name, pattern):
            try:
                old = name.split('.')[0].strip()
                new = old+jpg
                os.rename(relative_path+name,relative_path+new)
                print(new)
            except:
                print(f'{relative_path}{name} error rename to {relative_path}{old+jpg}')
