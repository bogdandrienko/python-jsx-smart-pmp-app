import os
from fnmatch import fnmatch
from shutil import copy as move

path = r"C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_09_21_dev\src"
new_path = r"C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_09_21_dev\new"
pattern = '*.js'

directories_ = []
for root, dirs, files in os.walk(path, topdown=True):
    for name in dirs:
        directories_.append(f"{os.path.join(root, name)}")
print(directories_)
# for dir in directories_:
#     print(dir)
files_ = []
for dir_ in directories_:
    for root, dirs, files in os.walk(dir_, topdown=True):
        for file in files:
            # print(file)
            if fnmatch(file, pattern):
                files_.append(f"{dir_}\\{file}")
            # if fnmatch(file, "*.docx"):
            #     files_.append(f"{dir_}\\{file}")
            # files_.append(file)
print(files_)
# for file in files_:
#     print(file)
for file in files_:
    print(file)
    try:
        file_name = file.split('\\')[len(file.split('\\'))-1]
        print(file_name)
        os.replace(file, f"{new_path}\\{file_name}")
        # move(file, f"{new_path}\\{file_name}")
    except Exception as ex:
        print(ex)
