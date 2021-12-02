import os
import shutil
import sys
import time
from fnmatch import fnmatch
from multiprocessing import freeze_support
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from shutil import move, copy
import threading
import concurrent.futures
import asyncio
from time import sleep

import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui
import cv2
import openpyxl
import requests
from openpyxl.utils import get_column_letter
from skimage import io

from app_admin.utils.utils import ExcelClass, DirFolderPathClass


# Синхронная функция
def get_url(page_url, timeout=2):
    try:
        response = requests.get(url=page_url, timeout=timeout)
        page_status = "unknown"
        if response.status_code == 200:
            page_status = "exists"
        elif response.status_code == 404:
            page_status = "does not exist"

        return page_url + " - " + page_status
    except Exception as error:
        return page_url + " - " + f'error: {error}'

# UI
class AppContainerClass:
    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.widget = None

    def create_ui(self, title, width, height, icon):
        self.widget = MainWidgetClass(title, width, height, icon)
        return self.widget

    @staticmethod
    def create_qlable(text: str, _parent, background=False):
        _widget = QtWidgets.QLabel(text)
        if background:
            _widget.setAutoFillBackground(True)
            _widget.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qpushbutton(_parent, _connect_func, _text='set'):
        _widget = QtWidgets.QPushButton(_text)
        _parent.addWidget(_widget)
        _widget.clicked.connect(_connect_func)
        return _widget

    @staticmethod
    def create_qcheckbox(_parent, _text='check?', default=False):
        _widget = QtWidgets.QCheckBox(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qcombobox(_parent, _text: list, default=None):
        _widget = QtWidgets.QComboBox()
        _widget.addItems([x for x in _text])
        _widget.setCurrentText(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qradiobutton(_parent, _text: str, default=False):
        _widget = QtWidgets.QRadioButton(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget


class MainWidgetClass(QtWidgets.QWidget):
    def __init__(self, title="приложение", width=640, height=480, icon="icon.ico"):
        super().__init__()

        self.pause = False

        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))
        self.resolution_debug = []
        self.v_layout_m = QtWidgets.QVBoxLayout(self)

        # MANAGEMENT
        self.h_layout_g_management = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_management)
        self.g_management_set = AppContainerClass.create_qlable(
            'УПРАВЛЕНИЕ',
            self.h_layout_g_management,
            background=True
        )
        self.h_layout_management_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_management_1)
        self.play_QPushButton = AppContainerClass.create_qpushbutton(
            self.h_layout_management_1,
            self.play_btn_func,
            'play'
        )
        self.stop_QPushButton = AppContainerClass.create_qpushbutton(
            self.h_layout_management_1,
            self.stop_btn_func,
            'stop'
        )
        self.quit_QPushButton = AppContainerClass.create_qpushbutton(
            self.h_layout_management_1,
            self.quit_btn_func,
            'quit'
        )

    def quit_btn_func(self):
        try:
            print('quit')
            self.pause = True
            sys.exit(app_container.app.exec())
        except Exception as error:
            print(error)

    def stop_btn_func(self):
        try:
            print('pause')
            self.pause = True
        except Exception as error:
            print(error)

    def play_btn_func(self):
        try:
            print('play')
            self.pause = False

            # Поиск в папке с фото совпадений по табельному номеру(+ФИ) из выгруженного файла из базы 1с
            def find_personal_number_in_1c(max_workers=1):
                print(f'max_workers={max_workers}')

                if self.pause is False:
                    # Создание папок, если их не существовало
                    import_folder = DirFolderPathClass.create_folder_in_this_dir('Исходные фото')
                    equal_folder = DirFolderPathClass.create_folder_in_this_dir('Есть в базе')
                    not_equal_folder = DirFolderPathClass.create_folder_in_this_dir('Нет в базе')
                    correct_folder = DirFolderPathClass.create_folder_in_this_dir('Корректировка фамилии или имени')
                    error_format_folder = DirFolderPathClass.create_folder_in_this_dir('Неверный формат файла')
                    error_folder = DirFolderPathClass.create_folder_in_this_dir('Ошибка')

                    # файл для чтения
                    export_excel_file = 'export.xlsx'
                    # колонки для чтения в матрицу 'Табельный|Имя|Фамилия'
                    export_col_person = '954'

                    # расширения распознаваемых файлов
                    pattern = '*.jpg'

                    # чтение и создание классов эксель
                    workbook = ExcelClass.workbook_load(file=export_excel_file)
                    sheet = ExcelClass.workbook_activate(workbook=workbook)
                    max_rows = ExcelClass.get_max_num_rows(sheet=sheet)

                    export_person_rows = []
                    workers_full_name_all = []
                    for row in range(1, max_rows + 1):
                        export_person_row = []
                        if self.pause is False:
                            for col in export_col_person:
                                value = ExcelClass.get_sheet_value(
                                    col=int(col),
                                    row=row,
                                    sheet=sheet
                                )
                                export_person_row.append(value)
                            export_person_rows.append(export_person_row[0])
                            workers_full_name_all.append(
                                f'{export_person_row[1]}+{export_person_row[2]}_{export_person_row[0]}')
                    ExcelClass.workbook_close(workbook=workbook)
                    print(export_person_rows)

                    for path, subdirs, files in os.walk(import_folder):
                        for name in files:
                            if fnmatch(name, pattern) and self.pause is False:
                                try:
                                    name_1 = name.split('.')[0].strip()
                                    id_1 = name_1.split('_')[1].strip()
                                    if id_1 in export_person_rows:
                                        if name_1 in workers_full_name_all:
                                            move(f'{import_folder}\\{name}', f'{equal_folder}\\{name}')
                                        else:
                                            move(f'{import_folder}\\{name}', f'{correct_folder}\\{name}')
                                    else:
                                        move(f'{import_folder}\\{name}', f'{not_equal_folder}\\{name}')
                                except Exception as error:
                                    move(f'{import_folder}\\{name}', f'{error_folder}\\{name}')
                                print(name)
                            else:
                                move(f'{import_folder}\\{name}', f'{error_format_folder}\\{name}')

                    print('complete')

            # Смена табельных на фото на ИИН
            def change_id_from_foto_to_iin(max_workers=1):
                print(f'max_workers={max_workers}')

                # export_cols_from_1c = '9754'
                # Создание папок, если их не существовало
                # pattern = '*.jpg'
                # formatting = '.jpg'
                # cols = [get_column_letter(int(x)) for x in export_cols_from_1c]
                # workers_id_all = []
                # global_workers_list = []
                #
                # workbook = openpyxl.load_workbook(export_file)
                # sheet = workbook.active
                # for num in range(2, 800):
                #     local_workers_list = []
                #     for x in cols:
                #         value = get_sheet_value(x, num, sheet=sheet)
                #         if value == 'None' or value is None or value == '':
                #             value = ''
                #         if cols.index(x) == 0:
                #             try:
                #                 full_name = value.split(' ')
                #                 print(full_name)
                #                 name = full_name[0]
                #                 surname = full_name[1]
                #                 lastname = full_name[2]
                #                 local_workers_list.append(name)
                #                 local_workers_list.append(surname)
                #                 local_workers_list.append(lastname)
                #             except Exception as ex:
                #                 local_workers_list.append(value)
                #         else:
                #             local_workers_list.append(value)
                #     workers_id_all.append(local_workers_list)
                # workbook.close()
                # print(workers_id_all)
                #
                # for path, subdirs, files in os.walk(import_folder):
                #     for name in files:
                #         if fnmatch(name, pattern):
                #             try:
                #                 firstname = name.split('+')[0].strip()
                #                 surname = name.split('+')[1].strip().split('.')[0].strip()
                #                 for num in workers_id_all:
                #                     if firstname == num[1] and surname == num[0]:
                #                         Actions.action(f'{import_folder}\\{name}',
                #                                        f'{equal_folder}\\{firstname + "+" +
                #                                        surname + "_" + num[3] + ".jpg"}')
                #                     else:
                #                         pass
                #             except Exception as ex:
                #                 print(name, ex)

                print('complete')

            def change_iin_to_id(max_workers=1):
                print(f'max_workers={max_workers}')

                # pattern = '*.jpg'
                # formatting = '.jpg'
                # cols = [get_column_letter(int(x)) for x in export_cols_from_1c]
                # workers_id_all = []
                # global_workers_list = []
                #
                # workbook = openpyxl.load_workbook(export_file)
                # sheet = workbook.active
                # for num in range(1, 5000):
                #     local_workers_list = []
                #     for x in cols:
                #         value = get_sheet_value(x, num, sheet=sheet)
                #         if value == 'None' or value is None or value == '':
                #             value = ''
                #         local_workers_list.append(value)
                #     workers_id_all.append(local_workers_list)
                # workbook.close()
                # # print(workers_id_all)
                #
                # for path, subdirs, files in os.walk(import_folder):
                #     for name in files:
                #         if fnmatch(name, pattern):
                #             try:
                #                 name_start = name.split('_')[0].strip()
                #                 name_end = name.split('.')[1].strip()
                #                 id_ = name.split('.')[0].strip().split('_')[1].strip()
                #                 for num in workers_id_all:
                #                     if id_ == num[0]:
                #                         Actions.action(f'{import_folder}\\{name}',
                #                                        f'{equal_folder}\\{name_start + "_" +
                #                                        num[1] + "." + name_end}')
                #                     else:
                #                         pass
                #             except Exception as ex:
                #                 print(name, ex)

                print('complete')

            def add_id_to_foto(max_workers=1):
                print(f'max_workers={max_workers}')

                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
                pattern = '*.jpg'
                jpg = '.jpg'
                old = ''

                def input_integer_value(description):
                    """
                Functions for return whole positive number
                    :param description:
                    :return:
                    """
                    while True:
                        try:
                            value = round(int(input(f'{description}')))
                            if value > 0:
                                break
                        except:
                            print('Ошибка, введите ещё раз.')
                    return value

                identifier = input_integer_value('Введите значение, с которого нужно начинать нумерацию: ')

                for path, subdirs, files in os.walk(relative_path):
                    for name in files:
                        if fnmatch(name, pattern):
                            try:
                                old = name.split('.')[0].strip()
                                jpg = '.' + name.split('.')[1].strip()
                                new = old + '_' + str(identifier) + jpg
                                os.rename(relative_path + name, relative_path + new)
                                identifier += 1
                                print(new)
                            except:
                                print(f'{relative_path}{name} error rename to '
                                      f'{relative_path}{old + str(identifier) + jpg}')

                print('complete')

            def equal_external(max_workers=1):
                print(f'max_workers={max_workers}')

                def get_sheet_value(column, row, _sheet):
                    return str(_sheet[str(column) + str(row)].value)

                def set_sheet_value(column, row, value):
                    sheet[f'{column}{row}'] = str(value)

                file_1c = 'Export_1.xlsx'
                workers_id_1c = []
                id_1c = 3

                workbook = openpyxl.load_workbook(file_1c)
                sheet = workbook.active
                for num in range(1, 350):
                    stringes = get_sheet_value(get_column_letter(int(id_1c)), num, _sheet=sheet).split(' ')
                    try:
                        string = f"{stringes[0]} {stringes[1]}"
                        workers_id_1c.append(string)
                    except:
                        workers_id_1c.append(f"None None")
                workbook.close()

                # print(workers_id_1c)

                file_skud = 'import.xlsx'
                workers_id_skud = []
                id_skud = 2

                workbook = openpyxl.load_workbook(file_skud)
                sheet = workbook.active
                for num in range(1, 350):
                    string = f"{get_sheet_value(get_column_letter(int(id_skud)), num, _sheet=sheet)} " \
                             f"{get_sheet_value(get_column_letter(int(id_skud) - 1), num, _sheet=sheet)}"
                    workers_id_skud.append(string)
                workbook.close()

                # print(workers_id_skud)
                workbook = openpyxl.load_workbook(file_skud)
                sheet = workbook.active

                for x in workers_id_skud:
                    for y in workers_id_1c:
                        print(workers_id_skud.index(x))
                        if x == y and x is not None:
                            set_sheet_value(column=get_column_letter(int(18)), row=workers_id_skud.index(x) + 1,
                                            value='МСС')
                workbook.save('Import_1.xlsx')

            def equal_foto_from_1c(max_workers=1):
                print(f'max_workers={max_workers}')

                import_folder = DirFolderPathClass.create_folder_in_this_dir('Для сравнения')
                export_folder = DirFolderPathClass.create_folder_in_this_dir('Из 1С')
                equal_folder = DirFolderPathClass.create_folder_in_this_dir('Есть в базе')
                not_equal_folder = DirFolderPathClass.create_folder_in_this_dir('Нет в базе')
                error_folder = DirFolderPathClass.create_folder_in_this_dir('Ошибка')
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
                                        move(f'{import_folder}\\{name}', f'{equal_folder}\\{name}')
                                    else:
                                        move(f'{import_folder}\\{name}', f'{equal_folder}\\{name}')
                                else:
                                    move(f'{import_folder}\\{name}', f'{not_equal_folder}\\{name}')
                            except Exception as error:
                                move(f'{import_folder}\\{name}', f'{error_folder}\\{name}')
                            print(name)

            def equal_system(max_workers=1):
                print(f'max_workers={max_workers}')

                def get_sheet_value(column, row, _sheet):
                    return str(_sheet[str(column) + str(row)].value)

                def set_sheet_value(column, row, value):
                    sheet[f'{column}{row}'] = str(value)

                file_1c = 'export.xlsx'
                workers_id_1c = []
                id_1c = 9

                workbook = openpyxl.load_workbook(file_1c)
                sheet = workbook.active
                for num in range(1, 3000):
                    workers_id_1c.append(get_sheet_value(get_column_letter(int(id_1c)), num, _sheet=sheet))
                workbook.close()

                file_skud = 'import.xlsx'
                workers_id_skud = []
                id_skud = 3

                workbook = openpyxl.load_workbook(file_skud)
                sheet = workbook.active
                for num in range(1, 3000):
                    workers_id_skud.append(get_sheet_value(get_column_letter(int(id_skud)), num, _sheet=sheet))
                workbook.close()

                workbook = openpyxl.load_workbook(file_1c)
                sheet = workbook.active

                for x in workers_id_1c:
                    for y in workers_id_skud:
                        if x == y and x is not None:
                            set_sheet_value(column=get_column_letter(int(8)), row=workers_id_1c.index(x) + 1, value='+')
                workbook.save('export.xlsx')

            def jpeg_to_jpg(max_workers=1):
                print(f'max_workers={max_workers}')

                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
                pattern = '*.jpeg'
                jpg = '.jpg'
                new = ''

                for path, subdirs, files in os.walk(relative_path):
                    for name in files:
                        if fnmatch(name, pattern):
                            try:
                                new = name.split('.')[0].strip() + jpg
                                if name.split('.')[1].strip() == 'jpeg':
                                    os.rename(relative_path + name, relative_path + new)
                                    print(new)
                            except:
                                print(f'{relative_path}{name} error rename to {relative_path}{new}')

            def remove_id_from_jpg(max_workers=1):
                print(f'max_workers={max_workers}')

                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
                pattern = '*.jpg'
                jpg = '.jpg'
                old = ''

                for path, subdirs, files in os.walk(relative_path):
                    for name in files:
                        if fnmatch(name, pattern):
                            try:
                                old = name.split('.')[0].split('_')[0].strip()
                                new = old + jpg
                                os.rename(relative_path + name, relative_path + new)
                                print(new)
                            except:
                                try:
                                    print(f"{relative_path}{name} error rename to {relative_path}{old + jpg}")
                                except:
                                    print(name)

            def rename_foto_in_folders(max_workers=1):
                print(f'max_workers={max_workers}')

                source = r'Boom\New'
                dest = ''
                # source_path = os.path.dirname(os.path.abspath('__file__')) + r"\ВЗРЫВ\2020г"
                source_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + source
                # dest_path = os.path.dirname(os.path.abspath('__file__')) + r"\Boom\new"
                dest_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + dest
                try:
                    # create_dir(r'Boom\new')
                    DirFolderPathClass.create_folder_in_this_dir(dest)
                except:
                    pass

                pattern = '*.jpg'
                directories_ = []
                for root, dirs, files in os.walk(source_path, topdown=True):
                    for name in dirs:
                        directories_.append(f"{os.path.join(root, name)}")
                files_ = []
                for dir_ in directories_:
                    for root, dirs, files in os.walk(dir_, topdown=True):
                        for file in files:
                            if fnmatch(file, pattern):
                                files_.append(f"{dir_}\\{file}")
                for file in files_:
                    index_file = files_.index(file) + 1
                    try:
                        sub_sub_dir = file.split('\\')[len(file.split('\\')) - 3].split('Взрыв ')[1]
                        subdir = file.split('\\')[len(file.split('\\')) - 2]
                        file_name = file.split('\\')[len(file.split('\\')) - 1]
                        print(file_name)
                        ext = file_name[:-4]
                        shutil.copyfile(file, f"{dest_path}\\{sub_sub_dir}_{subdir}_{ext}___{index_file}.jpg")
                    except Exception as ex:
                        print(ex)
                # Тут уже лежат в папке файлы с нужными именами

            def export_to_import(max_workers=1):
                print(f'max_workers={max_workers}')

                class Worker:
                    """
                    Класс, который содержит в себе работника, со значениями по строке
                    """

                    def __init__(self, a_1='', b_1='', c_1='', d_1='', e_1='', f_1='', g_1='', h_1='', m_1=''):
                        # Подразделение
                        self.A_1 = a_1
                        # Цех или Служба
                        self.B_1 = b_1
                        # Отдел или участок
                        self.C_1 = c_1
                        # Фамилия
                        self.D_1 = d_1
                        # Имя
                        self.E_1 = e_1
                        # Отчество
                        self.F_1 = f_1
                        # Табельный №
                        self.G_1 = g_1
                        # Категория
                        self.H_1 = h_1
                        # Пол
                        self.M_1 = m_1

                    def print_worker(self):
                        print(
                            f'{self.A_1}+{self.B_1}+{self.C_1}+{self.D_1}+{self.E_1}+{self.F_1}+{self.G_1}+{self.H_1}+{self.M_1}')

                    def get_worker_value(self, index):
                        value_ = list(
                            (self.A_1, self.B_1, self.C_1, self.D_1, self.E_1, self.F_1, self.G_1, self.H_1, self.M_1))
                        return value_[index]

                    def get_worker_id(self):
                        return self.G_1

                def get_sheet_value(column, row, sheet):
                    return str(sheet[str(column) + str(row)].value)

                def set_sheet_value(column, row, value_, sheet):
                    if value_:
                        sheet[str(column) + str(row)] = value_
                    else:
                        sheet[str(column) + str(row)] = ''

                export_file = 'Export.xlxs'
                import_file = 'Import.xlxs'
                exporting = 'ABCDEFINY'
                importing = 'RSTBAUCV'

                def whiles(_export_file=export_file, _import_file=import_file, _exporting=exporting,
                           _importing=importing):
                    print('start')

                    relative_path = os.path.dirname(os.path.abspath('__file__'))
                    _export_file = relative_path + '\\' + _export_file
                    _import_file = relative_path + '\\' + _import_file

                    min_export_value = 1
                    max_export_value = 5000
                    min_import_value = 14
                    max_import_value = 5000
                    workers_from_1c = []

                    workbook = openpyxl.load_workbook(_export_file)
                    sheet = workbook.active
                    workbook.close()

                    for num in range(min_export_value, max_export_value):
                        worker_list = []
                        for x in _exporting:
                            value = get_sheet_value(x, num, sheet)
                            if value == 'None' or value is None or value == '':
                                value = ''
                            worker_list.append(value)
                        worker_id = Worker(*worker_list)
                        workers_from_1c.append(worker_id)

                    workbook = openpyxl.load_workbook(_import_file)
                    sheet = workbook.active

                    workers_from_db = []

                    for num in range(min_import_value, max_import_value):
                        workers_from_db.append(get_sheet_value(get_column_letter(3), num, sheet))

                    for worker_from_1C in workers_from_1c:
                        for worker_from_DB in workers_from_db:
                            if worker_from_1C.get_worker_id() == worker_from_DB:
                                for x in _importing:
                                    try:
                                        set_sheet_value(x, workers_from_db.index(worker_from_DB) + 14,
                                                        worker_from_1C.get_worker_value(_importing.index(x)), sheet)
                                    except:
                                        pass

                    workbook.save(_import_file)
                    workbook.close()

                    print('end')

                thread_result = threading.Thread(target=whiles)
                thread_result.start()

            # ОТРЕФАКТОРЕНО:

            # Находит и обрезает лица, добавляет края + сжимает фото
            def find_face(max_workers=1):
                print('start')
                print(f'max_workers={max_workers}')

                # Создание папок для исходящих и входящих изображений
                input_folder = DirFolderPathClass.create_folder_in_this_dir('input')
                output_folder = DirFolderPathClass.create_folder_in_this_dir('output')

                # Выбор формата изображений для обработки
                pattern = '*.jpg'

                # Функция для обрезки фото по именам
                def loop_crop_img(file_name='input.jpg'):
                    try:
                        if self.pause is False:
                            if fnmatch(file_name, pattern):
                                # Чтение изображения в память
                                src_img = io.imread(input_folder + '\\' + file_name)

                                # Коррекция краёв изображения
                                correct_field = 1000

                                # Размеры исходного изображения
                                image_height = 9248
                                image_width = 6944

                                # Загрузка алгоритма классификатора для поиска лиц
                                haar_face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

                                # Значение, добавляемое по краям изображения
                                width_addiction = 1000
                                height_addiction = 1500

                                # Качество сжатия изображения
                                quality = 50

                                # Получение значения от исходного числа и % от него
                                def get_percent(value, side):
                                    return side * value // 100

                                # Установка обрезки краёв и обрезка
                                crop_top = (image_height - 8000) // 2
                                crop_down = (image_height - 8000) // 2
                                crop_left = (image_width - 6000) // 2
                                crop_right = (image_width - 6000) // 2
                                src_img = src_img[crop_top:image_height - crop_down, crop_left:image_width - crop_right]

                                # Предобработка изображения и поиск лиц алгоритмом
                                gray_img = cv2.cvtColor(src_img, cv2.COLOR_BGR2GRAY)
                                detect_faces = haar_face_cascade.detectMultiScale(gray_img)

                                # Очистка некорректно найдённых лиц на изображении
                                correct_faces = []
                                for (x, y, w, h) in detect_faces:
                                    if x > correct_field and y > correct_field and w > correct_field and h > correct_field:
                                        correct_faces.append([x, y, w, h])

                                # Формирование финального результата
                                output = None
                                for (x, y, w, h) in correct_faces:
                                    height_1 = int(y - int(height_addiction))
                                    height_2 = int(y + h + int(height_addiction))
                                    width_1 = int(x - int(width_addiction))
                                    width_2 = int(x + w + int(width_addiction))
                                    output = src_img[height_1:height_2, width_1:width_2]

                                # Удаление исходного фото
                                try:
                                    os.remove(input_folder + '\\' + file_name)
                                except Exception as error:
                                    pass

                                # Сохранение результата
                                io.imsave(output_folder + '\\' + file_name, output, quality=quality)

                                # Вывод имени обработанного фото
                                print(file_name)
                    except Exception as error:
                        print(f'{file_name}: {error}')

                # Запуск многопоточности
                with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
                    for path, subdirs, files in os.walk(input_folder):
                        if self.pause is False:
                            for file in files:
                                executor.submit(loop_crop_img, file_name=file)
                print('end')

            # Сравнивает массив фото с excel-файлом выгруженным из системы 1С
            def equal_foto(func_name='equal_foto'):
                start_time = time.time()
                print('start')
                print(f'func_name={func_name}')

                # Выбор excel-файла для загрузки данных из 1с
                export_file_from_1c = 'export.xlsx'
                # Выбор столбцов с данными в excel-файле
                export_cols_from_1c = '549'

                # Создание папок для исходящих и входящих изображений
                input_folder = DirFolderPathClass.create_folder_in_this_dir('input')
                equal_folder = DirFolderPathClass.create_folder_in_this_dir('output\\Есть в базе')
                not_equal_folder = DirFolderPathClass.create_folder_in_this_dir('output\\Нет в базе')
                error_format_folder = DirFolderPathClass.create_folder_in_this_dir('output\\Неверный формат фото')
                error_id_folder = DirFolderPathClass.create_folder_in_this_dir('output\\Нет идентификатора')
                error_folder = DirFolderPathClass.create_folder_in_this_dir('output\\Ошибка')

                # Выбор формата изображений для обработки
                pattern = '*.jpg'

                # Загрузка в память excel-файла
                workbook = ExcelClass.workbook_load(file=export_file_from_1c)
                sheet = ExcelClass.workbook_activate(workbook=workbook)
                max_num_rows = ExcelClass.get_max_num_rows(sheet=sheet)

                # Создание и наполнение матрицы с данными по людям из 1с
                global_workers_list = []
                # Создание и наполнение массива с идентификаторами с КМ
                global_workers_id_list = []
                for num in range(1, max_num_rows + 1):
                    if self.pause is False:
                        # Создание и наполнение массива с данными по одного человеку
                        local_workers_list = []
                        for x in export_cols_from_1c:
                            local_workers_list.append(ExcelClass.get_sheet_value(col=int(x), row=num, sheet=sheet))
                        if local_workers_list[2]:
                            global_workers_list.append(local_workers_list)
                            global_workers_id_list.append(local_workers_list[2])
                ExcelClass.workbook_close(workbook)
                # Вывод на экран матрицы с данными и её длины
                print(global_workers_list)
                print(len(global_workers_list))

                # Функция для сравнения фото по именам и данным из excel-файла
                def loop_equal_foto(file_name: str):
                    message = ''
                    if self.pause is False:
                        # Проверка на формат изображения
                        if fnmatch(file_name, pattern):
                            try:
                                # Получение полного имени файла
                                full_foto_name = file_name.split('.')[0].strip()
                                try:
                                    # Получение идентификатора из имени файла
                                    id_foto = full_foto_name.split('_')[1].strip()
                                    for worker in global_workers_list:
                                        # Проверка, есть ли идентификатор в массиве с идентификаторами с 1с
                                        if worker[2] in global_workers_id_list:
                                            # Копирование файла, если его имя полностью совпадает с матрицей
                                            if full_foto_name == f'{worker[0]}+{worker[1]}_{worker[2]}':
                                                copy(f'{input_folder}\\{file_name}', f'{equal_folder}\\{file_name}')
                                                # Вывод на экран сообщения и имени файла
                                                message = f"соответветствует: {file_name}\n"
                                            # Копирование файла и замена имени, если его идентификатор совпадает
                                            elif id_foto == worker[2]:
                                                copy(f'{input_folder}\\{file_name}',
                                                     f'{equal_folder}\\{worker[0]}+{worker[1]}_{worker[2]}.jpg')
                                                # Вывод на экран сообщения и имени файла
                                                message = f"соответветствует с корректировкой: {file_name}\n"
                                        # Копирование файла, если его нет в массиве с идентификаторами с 1с
                                        else:
                                            copy(f'{input_folder}\\{file_name}', f'{not_equal_folder}\\{file_name}')
                                            # Вывод на экран сообщения и имени файла
                                            message = f"не соответветствует: {file_name}\n"
                                # Копирование файла, если у него нет идентификатора
                                except Exception as error:
                                    copy(f'{input_folder}\\{file_name}', f'{error_id_folder}\\{file_name}')
                                    # Вывод на экран сообщения и имени файла
                                    message = f"нет идентификатора: {file_name}\n"
                            except Exception as error:
                                copy(f'{input_folder}\\{file_name}', f'{error_folder}\\{file_name}')
                                # Вывод на экран сообщения и имени файла
                                message = f"ошибка: {file_name}\n"
                        # Если изображение не того формата, копирование его в выбранную папку
                        else:
                            try:
                                copy(f'{input_folder}\\{file_name}', f'{error_format_folder}\\{file_name}')
                                # Вывод на экран сообщения и имени файла
                                message = f"ошибка формата изображения: {file_name}\n"
                            except Exception as error:
                                copy(f'{input_folder}\\{file_name}', f'{error_folder}\\{file_name}')
                                # Вывод на экран сообщения и имени файла
                                message = f"ошибка: {file_name}\n"
                        # Удаление исходного файла
                        try:
                            os.remove(f'{input_folder}\\{file_name}')
                        except Exception as error:
                            pass

                        return message

                # Менеджер контекста для многопотока под ThreadPoolExecutor
                # with ProcessPoolExecutor() as executor:
                #     futures = []
                #     # Цикл для прохода по ссылкам
                #     for path, subdirs, files in os.walk(input_folder):
                #         for name in files:
                #             if self.pause is False:
                #                 futures.append(executor.submit(loop_equal_foto, file_name=name))
                #             for future in concurrent.futures.as_completed(futures):
                #                 print(future.result())

                for path, subdirs, files in os.walk(input_folder):
                    for name in files:
                        if self.pause is False:
                            # loop_equal_foto(file_name=name)
                            threading.Thread(target=loop_equal_foto, args=(name,)).start()
                # Запуск многопоточности
                # file_names = []
                # with ThreadPoolExecutor() as executor:
                #     for path, subdirs, files in os.walk(input_folder):
                #         for name in files:
                #             if self.pause is False:
                #                 executor.submit(loop_equal_foto, file_name=name)
                #                 # threading.Thread(target=loop_equal_foto, args=(name,)).start()

                print(f"Final time: {round(time.time() - start_time, 1)}")
                print('end')

            # меняет русскую букву "Р" на английскую
            def change_p_to_eng(max_workers=1):
                print(f'max_workers={max_workers}')

                folder = 'input'
                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + folder + '\\'
                pattern = '*.jpg'

                for path, subdirs, files in os.walk(relative_path):
                    for name in files:
                        if fnmatch(name, pattern):
                            try:
                                first_name = name.split('+')[0].strip()
                                second_name = name.split('+')[1].strip()
                                if ord(first_name[0:1:]) == 1056 or ord(second_name[0:1:]) == 1056:
                                    if ord(first_name[0:1:]) == 1056:
                                        first_name = chr(80) + first_name[1::]
                                    if ord(second_name[0:1:]) == 1056:
                                        second_name = chr(80) + second_name[1::]
                                    new = f'{first_name}+{second_name}'
                                    os.rename(relative_path + name, relative_path + new)
                                    print(new)
                            except:
                                try:
                                    print(f'{relative_path}{name} error rename')
                                except:
                                    print(name)

                print('complete')

            # меняет английскую букву "Р" на русскую
            def change_p_to_rus(max_workers=1):
                print(f'max_workers={max_workers}')

                folder = 'input'
                relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + folder + '\\'
                pattern = '*.jpg'

                for path, subdirs, files in os.walk(relative_path):
                    for name in files:
                        if fnmatch(name, pattern):
                            try:
                                first_name = name.split('+')[0].strip()
                                second_name = name.split('+')[1].strip()
                                if ord(first_name[0:1:]) == 80 or ord(second_name[0:1:]) == 80:
                                    if ord(first_name[0:1:]) == 80:
                                        first_name = chr(1056) + first_name[1::]
                                    if ord(second_name[0:1:]) == 80:
                                        second_name = chr(1056) + second_name[1::]
                                    new = f'{first_name}+{second_name}'
                                    os.rename(relative_path + name, relative_path + new)
                                    print(new)
                            except:
                                try:
                                    print(f'{relative_path}{name} error rename')
                                except:
                                    print(name)

                print('complete')

            def example(max_workers=1):
                print(f'max_workers={max_workers}')

                def loop_example(name):
                    if self.pause is False:
                        time.sleep(1)
                        print(name)
                        print(threading)
                        return 1
                    return 0

                with ThreadPoolExecutor(max_workers=max_workers) as executor:
                    futures = []
                    for name in range(1, 500):
                        if self.pause is False:
                            futures.append(executor.submit(loop_example, name=name))
                            for future in concurrent.futures.as_completed(futures):
                                print(future.result())
                print('completed')

            # threading.Thread(target=example, args=([3])).start()
            # threading.Thread(target=find_face, args=([3])).start()
            threading.Thread(target=equal_foto, args=(['equal_foto'])).start()
            # threading.Thread(target=change_p_to_eng, args=([3])).start()

            ############################################################################################################

            # #  Синхронный код
            # start_time = time.time()
            # # Ссылки
            # page_urls = ["https://en.wikipedia.org/wiki/" + str(i) for i in range(21)]
            #
            # # Синхронная функция
            # def get_page_from_url(page_url, timeout=2):
            #     try:
            #         response = requests.get(url=page_url, timeout=timeout)
            #         page_status = "unknown"
            #         if response.status_code == 200:
            #             page_status = "exists"
            #         elif response.status_code == 404:
            #             page_status = "does not exist"
            #
            #         return page_url + " - " + page_status
            #     except Exception as error:
            #         return page_url + " - " + f'error: {error}'
            #
            # # Цикл для прохода по ссылкам
            # for url in page_urls:
            #     print(get_page_from_url(page_url=url))
            #
            # # Финальное время
            # print(f"Final time: {round(time.time() - start_time, 1)}")

            ############################################################################################################

            # #  Асинхронный код
            # start_time = time.time()
            # # Ссылки
            # page_urls = ["https://en.wikipedia.org/wiki/" + str(i) for i in range(21)]
            #
            # # Асинхронная функция
            # async def get_page_from_url_async(page_url, timeout=2):
            #     try:
            #         response = requests.get(url=page_url, timeout=timeout)
            #         page_status = "unknown"
            #         if response.status_code == 200:
            #             page_status = "exists"
            #         elif response.status_code == 404:
            #             page_status = "does not exist"
            #
            #         print(page_url + " - " + page_status)
            #     except Exception as error:
            #         print(page_url + " - " + f'error: {error}')
            #
            # # Цикл для прохода по ссылкам
            # async def main():
            #     tasks = []
            #     for url in page_urls:
            #         tasks.append(asyncio.create_task(get_page_from_url_async(url)))
            # asyncio.run(main())
            # # Финальное время
            # print(f"Final time: {round(time.time() - start_time, 1)}")

            ############################################################################################################

            # #  Синхронная функция для многопоточного выполнения под Threading
            # start_time = time.time()
            # # Ссылки
            # page_urls = ["https://en.wikipedia.org/wiki/" + str(i) for i in range(21)]
            #
            # # Синхронная функция получения статуса при завершении загрузки страницы
            # def get_page_from_url_threading(page_url, timeout=2):
            #     try:
            #         response = requests.get(url=page_url, timeout=timeout)
            #         page_status = "unknown"
            #         if response.status_code == 200:
            #             page_status = "exists"
            #         elif response.status_code == 404:
            #             page_status = "does not exist"
            #
            #         print(page_url + " - " + page_status)
            #     except Exception as error:
            #         print(page_url + " - " + f'error: {error}')
            #
            # # Цикл для прохода по ссылкам
            # for url in page_urls:
            #     threading.Thread(target=get_page_from_url_threading, args=([url])).start()
            #
            # # Финальное время
            # print(f"Final time: {round(time.time() - start_time, 1)}")

            ############################################################################################################

            # # Многопоточный код c ThreadPoolExecutor
            # start_time = time.time()
            # # Ссылки
            # page_urls = ["https://en.wikipedia.org/wiki/" + str(i) for i in range(21)]
            #
            # # Синхронная функция
            # def get_page_from_url(page_url, timeout=2):
            #     try:
            #         response = requests.get(url=page_url, timeout=timeout)
            #         page_status = "unknown"
            #         if response.status_code == 200:
            #             page_status = "exists"
            #         elif response.status_code == 404:
            #             page_status = "does not exist"
            #
            #         return page_url + " - " + page_status
            #     except Exception as error:
            #         return page_url + " - " + f'error: {error}'
            #
            # # Менеджер контекста для многопотока под ThreadPoolExecutor
            # with ThreadPoolExecutor() as executor:
            #     futures = []
            #     # Цикл для прохода по ссылкам
            #     for url in page_urls:
            #         futures.append(executor.submit(get_page_from_url, page_url=url))
            #     for future in concurrent.futures.as_completed(futures):
            #         print(future.result())
            #
            # # Финальное время
            # print(f"Final time: {round(time.time() - start_time, 1)}")

            ############################################################################################################

            # # Мультипроцессорный код c ProcessPoolExecutor
            # start_time = time.time()
            # # Ссылки
            # page_urls = ["https://en.wikipedia.org/wiki/" + str(i) for i in range(21)]
            #
            # # Синхронная функция
            # def get_page_from_url(page_url, timeout=2):
            #     try:
            #         response = requests.get(url=page_url, timeout=timeout)
            #         page_status = "unknown"
            #         if response.status_code == 200:
            #             page_status = "exists"
            #         elif response.status_code == 404:
            #             page_status = "does not exist"
            #
            #         return page_url + " - " + page_status
            #     except Exception as error:
            #         return page_url + " - " + f'error: {error}'
            #
            # # Менеджер контекста для мультипроцесса под ProcessPoolExecutor
            # with ProcessPoolExecutor() as executor:
            #     futures = []
            #     # Цикл для прохода по ссылкам
            #     for url in page_urls:
            #         futures.append(executor.submit(get_url, page_url=url))
            #     for future in concurrent.futures.as_completed(futures):
            #         print(future.result())
            #
            # # Финальное время
            # print(f"Final time: {round(time.time() - start_time, 1)}")

            ############################################################################################################

        except Exception as error:
            print(error)


# 1 Перевести в единый формат .jpg фото из папок: готовые в импорт и уже добавлены. Сменить латинскую P на кириллицу.
# 2 Объединить все фото в одной папке, заменив перед этим старые свежими.
# 3 Обрезать лица алгоритмом: поиграться с отношением, разрешением и сжатием.
# 4 Найти в базе фото совпадения с КМ, скорректировать ошибки.
# 5 Найти в базе фото совпадения с ТОО, скорректировать ошибки.
# 6 Сменить кириллическую P на латинскую.
# 7 Импортировать в базу данных hikvision.
# 8 Переделать некорректные названия фото и снова импортировать.
# 9 Выгрузить из системы список работников, добавить поля в базу hikvision и загрузить дополненный список из 1с.

# MAIN
if __name__ == "__main__":
    freeze_support()
    app_container = AppContainerClass()
    widget = app_container.create_ui(
        title="приложение",
        width=640,
        height=480,
        icon="icon.ico"
    )
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec())
