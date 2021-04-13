import os
import shutil
from os import path
from fnmatch import fnmatch

r = 'C:/folder_name/'
pattern = "*.JPG"

# def main():
#  # создаем дубликат существующего файла
#  if path.exists("guru99.txt"):
#  # получаем путь к файлу в текущем каталоге
#  src = path.realpath("guru99.txt");
 
#  # переименум исходный файл
#  os.rename('guru99.txt','career.guru99.txt') 
 
# if __name__ == "__main__":
#  main()

filenames_temp = []

for path, subdirs, files in os.walk(r):
    for name in files:
        if fnmatch(name, pattern):
            print (path+'/'+name)
            filenames_temp.append(path+'/'+name)

filenames = filenames_temp 


for file in filenames:
    idx = filenames.index(file)

    src=file
    dst=id_generator()+str(idx)+".png"
    os.rename(src,dst)