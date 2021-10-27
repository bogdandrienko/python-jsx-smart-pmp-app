import os
from shutil import move
from fnmatch import fnmatch


def create_dir(dir_name='new folder', current_path=os.path.dirname(os.path.abspath('__file__'))):
    f"""
Create directory with {dir_name} - name in {current_path} - path. And return this full path.
    :param current_path: 
    :param dir_name: 
    :return: Full path with created directory
    """
    full_path = current_path + f'\\{dir_name}'
    try:
        os.makedirs(full_path)
    except:
        print('directory already yet')
    finally:
        return full_path


class Actions:
    def __init__(self, obj_id):
        self.obj_id = obj_id

    @staticmethod
    def action(src, dst):
        move(src, dst)

    @staticmethod
    def equal(file):
        Actions.action(f'{import_folder}\\{file}', f'{equal_folder}\\{file}')

    @staticmethod
    def not_equal(file):
        Actions.action(f'{import_folder}\\{file}', f'{not_equal_folder}\\{file}')

    @staticmethod
    def error(file):
        Actions.action(f'{import_folder}\\{file}', f'{error_folder}\\{file}')


import_folder = create_dir('Для сравнения')
export_folder = create_dir('Из 1С')
equal_folder = create_dir('Есть в базе')
not_equal_folder = create_dir('Нет в базе')
error_folder = create_dir('Ошибка')
pattern = '*.jpg'
formatting = '.jpg'
name_list_export = []
id_list_export = []

for path, subdirs, files in os.walk(export_folder):
    for name in files:
        if fnmatch(name, pattern):
            name_2 = name.split('.')[0].strip()
            try:
                id_2 = name_2.split('_')[1].strip()
            except:
                id_2 = ''
            name_list_export.append(name_2)
            id_list_export.append(id_2)

for path, subdirs, files in os.walk(import_folder):
    for name in files:
        if fnmatch(name, pattern):
            try:
                name_1 = name.split('.')[0].strip()
                id_1 = name_1.split('_')[1].strip()
                if id_1 in id_list_export:
                    if name_1 in name_list_export:
                        Actions.equal(name)
                    else:
                        Actions.error(name)
                else:
                    Actions.not_equal(name)
            except:
                Actions.error(name)
