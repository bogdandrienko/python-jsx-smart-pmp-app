import os
import sys
from fnmatch import fnmatch
from multiprocessing import freeze_support
from shutil import move
import threading

import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui

from utils import ExcelClass


def create_dir(dir_name='folder', current_path=os.path.dirname(os.path.abspath('__file__'))):
    full_path = current_path + f'\\{dir_name}'
    try:
        os.makedirs(full_path)
    except:
        print('directory already yet')
    finally:
        return full_path

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
            def find_personal_number_in_1c():
                if self.pause is False:
                    # Создание папок, если их не существовало
                    import_folder = create_dir('Исходные фото')
                    equal_folder = create_dir('Есть в базе')
                    not_equal_folder = create_dir('Нет в базе')
                    correct_folder = create_dir('Корректировка фамилии или имени')
                    error_format_folder = create_dir('Неверный формат файла')
                    error_folder = create_dir('Ошибка')

                    # файл для чтения
                    export_excel_file = 'export.xlsx'
                    # колонки для чтения в матрицу 'Табельный|Имя|Фамилия'
                    export_col_person = '954'

                    # расширения распознаваемых файлов
                    pattern = '*.jpg'
                    error_patterns = ['*.jpeg', '*.jfif', '*.png']

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

            threading.Thread(target=find_personal_number_in_1c, args=()).start()
        except Exception as error:
            print(error)


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
