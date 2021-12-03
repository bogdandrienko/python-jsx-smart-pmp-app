import asyncio
import concurrent
import datetime
import json
import multiprocessing
import os
import sys
import threading
import time

import chardet
import colorama
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from functools import wraps

from typing import Union

import numpy as np
import openpyxl
import pyttsx3
import requests
import psycopg2 as pg
from gmplot import gmplot
from matplotlib import pyplot as plt, cm
from matplotlib.ticker import LinearLocator
from mpl_toolkits.mplot3d import axes3d
from openpyxl.utils import get_column_letter


class TimeUtils:
    @staticmethod
    def get_current_datetime():
        return f"{time.strftime('%Y-%m-%d %H:%M:%S')}"

    @staticmethod
    def get_current_date():
        return f"{time.strftime('%Y-%m-%d')}"

    @staticmethod
    def get_current_time():
        return f"{time.strftime('%H:%M:%S')}"

    @staticmethod
    def get_difference_datetime(days=0.0, hours=0.0, minutes=0.0, seconds=0.0):
        value = datetime.datetime.now() + datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
        return f"{value.strftime('%Y-%m-%d %H:%M:%S')}"

    class Example:
        @staticmethod
        def example_get_datetime():
            print(TimeUtils.get_current_datetime())

        @staticmethod
        def example_get_difference_datetime():
            print(TimeUtils.get_difference_datetime(hours=-2))


class FileReadWriteClass:
    @staticmethod
    def write_to_file(file_name, text_file, mode='a'):
        with open(file_name, mode=mode) as file:
            file.write(text_file)

    @staticmethod
    def read_from_file_lines(file_name, mode='r'):
        with open(file_name, mode=mode) as file:
            return file.readlines()

    @staticmethod
    def read_from_file(file_name, mode='r'):
        with open(file_name, mode=mode) as file:
            return file.read()

    @staticmethod
    def example_write_to_file_add():
        FileReadWriteClass.write_to_file(file_name='file.txt', text_file='text\n', mode='a')

    @staticmethod
    def example_write_to_file_rewrite():
        FileReadWriteClass.write_to_file(file_name='file.txt', text_file='text\n', mode='w')

    @staticmethod
    def example_read_from_file_lines():
        print(FileReadWriteClass.read_from_file_lines(file_name='file.txt', mode='r'))

    @staticmethod
    def example_read_from_file():
        print(FileReadWriteClass.read_from_file(file_name='file.txt', mode='r'))


class LoggingClass:
    @staticmethod
    def logging_to_local_file(logging_text, error_func, file_name='logging.txt', type_write='a'):
        try:
            with open(file_name, type_write) as file:
                file.write(f'\n{TimeUtils.get_current_datetime()} | error_func: {error_func} | {logging_text}\n')
        except Exception as error:
            print(f'\n{time.strftime("%x %X")} | error_func: {error_func} | {error}\n')

    class Example:
        @staticmethod
        def example_logging():
            LoggingClass.logging_to_local_file(
                logging_text='example',
                error_func='LoggingClass.Example.example_logging',
                file_name='logging.txt',
                type_write='a'
            )


class ExcelClass:
    @staticmethod
    def workbook_create():
        workbook = openpyxl.Workbook()
        return workbook

    @staticmethod
    def workbook_load(excel_file: str):
        workbook = openpyxl.load_workbook(excel_file)
        return workbook

    @staticmethod
    def workbook_activate(workbook):
        sheet = workbook.active
        return sheet

    @staticmethod
    def workbook_save(workbook, excel_file: str):
        try:
            os.remove(excel_file)
        except Exception as error:
            pass
        try:
            workbook.save(excel_file)
        except Exception as error:
            print(f'Please, close the excel_file: {excel_file} | {error}')

    @staticmethod
    def workbook_close(workbook):
        openpyxl.Workbook.close(workbook)

    @staticmethod
    def set_sheet_title(sheet, page_name='page 1'):
        sheet.title = page_name

    @staticmethod
    def get_sheet_value(col: Union[str, int], row: int, sheet):
        if isinstance(col, int):
            col = ExcelClass.get_column_letter(col)
        value = str(sheet[str(col).upper() + str(row)].value)
        if value == 'None' or value is None:
            value = ''
        else:
            value = str(value)
        return value

    @staticmethod
    def set_sheet_value(col: Union[str, int], row: int, value: str, sheet):
        if isinstance(col, int):
            col = ExcelClass.get_column_letter(col)
        if value == 'None' or value is None:
            value = ''
        sheet[str(col) + str(row)] = str(value)

    @staticmethod
    def get_column_letter(num: int):
        return get_column_letter(num)

    @staticmethod
    def get_max_num_rows(sheet):
        return int(sheet.max_row)

    class Example:
        @staticmethod
        def example_read_from_excel_file_col_int():
            excel_file = 'export.xlsx'
            workbook = ExcelClass.workbook_load(excel_file=excel_file)
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            max_num_rows = ExcelClass.get_max_num_rows(sheet=sheet)
            max_num_cols = 10
            global_list = []
            for row in range(1, max_num_rows + 1):
                local_list = []
                for col in range(1, max_num_cols + 1):
                    value = ExcelClass.get_sheet_value(col=col, row=row, sheet=sheet)
                    local_list.append(value)
                global_list.append(local_list)
            for row in global_list:
                print(row)
            ExcelClass.workbook_close(workbook=workbook)

        @staticmethod
        def example_read_from_excel_file_col_char():
            excel_file = 'export.xlsx'
            workbook = ExcelClass.workbook_load(excel_file=excel_file)
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            max_num_rows = ExcelClass.get_max_num_rows(sheet=sheet)
            char_cols = 'ACDF'
            global_list = []
            for row in range(1, max_num_rows + 1):
                local_list = []
                for col in char_cols:
                    value = ExcelClass.get_sheet_value(col=col, row=row, sheet=sheet)
                    local_list.append(value)
                global_list.append(local_list)
            for row in global_list:
                print(row)
            ExcelClass.workbook_close(workbook=workbook)

        @staticmethod
        def example_write_to_excel_file():
            global_list = [
                ['title_1', 'title_2', 'title_3'],
                ['body_1_1', 'body_1_2', 'body_1_3'],
                ['body_2_1', 'body_2_2', 'body_2_3'],
                ['body_3_1', 'body_3_3', 'body_3_3'],
            ]

            excel_file = 'import.xlsx'
            workbook = ExcelClass.workbook_create()
            sheet = ExcelClass.workbook_activate(workbook=workbook)
            for row in global_list:
                for value in row:
                    ExcelClass.set_sheet_value(
                        col=row.index(value) + 1,
                        row=global_list.index(row) + 1,
                        value=value,
                        sheet=sheet
                    )
            ExcelClass.workbook_save(workbook=workbook, excel_file=excel_file)


class DirPathFolderPathClass:
    @staticmethod
    def create_folder_in_this_dir(folder_name='new_folder', current_path=os.path.dirname(os.path.abspath('__file__'))):
        full_path = current_path + f'\\{folder_name}'
        try:
            os.makedirs(full_path)
        except Exception as error:
            print(f'directory already yet | {error}')
        finally:
            return full_path

    @staticmethod
    def get_all_files_in_path(path=os.path.dirname(os.path.abspath('__file__'))):
        files_list = []
        for root, dirs, files in os.walk(path, topdown=True):
            for name in files:
                files_list.append(f"{os.path.join(root, name)}")
        return files_list

    @staticmethod
    def get_all_dirs_in_path(path=os.path.dirname(os.path.abspath('__file__'))):
        directories_list = []
        for root, dirs, files in os.walk(path, topdown=True):
            for name in dirs:
                directories_list.append(f"{os.path.join(root, name)}")
        return directories_list

    class Example:
        @staticmethod
        def example_create_folder_in_this_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder')
            print(path)

        @staticmethod
        def example_create_folder_in_folder_in_this_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder\\new')
            print(path)

        @staticmethod
        def example_create_folder_in_external_folder():
            path = DirPathFolderPathClass.create_folder_in_this_dir(folder_name='new_folder\\new', current_path='C:\\')
            print(path)

        @staticmethod
        def example_get_all_files_in_path():
            files_list = DirPathFolderPathClass.get_all_files_in_path(
                path=r'C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_12_21_dev\app_admin'
            )
            for file in files_list:
                print(file)

        @staticmethod
        def example_get_all_folders_in_path():
            path_list = DirPathFolderPathClass.get_all_dirs_in_path(
                path=r'C:\Project\Github_Projects\python-jsx-smart-pmp-app\web-platform_12_21_dev\app_admin'
            )
            for path in path_list:
                print(path)


class EncryptingClass:
    @staticmethod
    def encrypt_text(text: str, hash_chars: str):
        chars = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' + ' _-:' + hash_chars
        chars = set(chars)
        forward_ord_list = []
        for char in chars:
            forward_ord_list.append(ord(char))
        forward_ord_list.sort(reverse=False)
        reverse_ord_list = forward_ord_list.copy()
        reverse_ord_list.sort(reverse=True)
        forward_dictinary = {reverse_ord_list[forward_ord_list.index(x)]: x for x in forward_ord_list}
        return ''.join([chr(forward_dictinary[ord(x)]) for x in text])

    @staticmethod
    def decrypt_text(text: str, hash_chars: str):
        chars = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' + ' _-:' + hash_chars
        chars = set(chars)
        forward_ord_list = []
        for char in chars:
            forward_ord_list.append(ord(char))
        forward_ord_list.sort(reverse=False)
        reverse_ord_list = forward_ord_list.copy()
        reverse_ord_list.sort(reverse=True)
        reverse_dictinary = {forward_ord_list[reverse_ord_list.index(x)]: x for x in reverse_ord_list}
        return ''.join([chr(reverse_dictinary[ord(x)]) for x in text])

    class Example:
        @staticmethod
        def example_encrypt_text():
            value = EncryptingClass.encrypt_text(text='12345', hash_chars='321')
            print(value)

        @staticmethod
        def example_decrypt_text():
            value = EncryptingClass.decrypt_text(text='wvuts', hash_chars='321')
            print(value)


class TypeVariablesClass:
    @staticmethod
    def example_get_type_of_variable(variable):
        return type(variable)

    @staticmethod
    def example_check_type_of_variable(variable, type_variable: str):
        if type_variable == 'bool':
            if isinstance(variable, bool):
                return True
            else:
                return False
        elif type_variable == 'int':
            if isinstance(variable, int):
                return True
            else:
                return False
        elif type_variable == 'float':
            if isinstance(variable, float):
                return True
            else:
                return False
        elif type_variable == 'str' or type_variable == 'string':
            if isinstance(variable, str):
                return True
            else:
                return False
        elif type_variable == 'list':
            if isinstance(variable, list):
                return True
            else:
                return False
        elif type_variable == 'dict' or type_variable == 'dictionary':
            if isinstance(variable, dict):
                return True
            else:
                return False
        elif type_variable == 'tuple':
            if isinstance(variable, tuple):
                return True
            else:
                return False
        elif type_variable == 'set':
            if isinstance(variable, set):
                return True
            else:
                return False
        else:
            return None

    class Example:
        @staticmethod
        def example_get_type():
            value = TypeVariablesClass.example_get_type_of_variable(variable=12.5)
            print(value)

        @staticmethod
        def example_check_type():
            value = TypeVariablesClass.example_check_type_of_variable(variable=12.5, type_variable='int')
            print(value)


class JsonClass:
    @staticmethod
    def write_json_to_file(dictionary: dict, file_name="json"):
        with open(f'{file_name}.json', 'w') as file:
            json.dump(dictionary, file)

    @staticmethod
    def read_json_from_file(file_name="json"):
        with open(f'{file_name}.json', 'r') as file:
            return json.load(file)

    class Example:
        @staticmethod
        def example_write_json_to_file():
            data = {
                'key_1': 'value_1',
                'key_2': 3,
                'key_3': {
                    'key_3_1': True,
                    'key_3_2': 'value_3_2',
                }
            }
            JsonClass.write_json_to_file(dictionary=data, file_name='json')

        @staticmethod
        def example_read_json_to_file():
            dictionary = JsonClass.read_json_from_file(file_name='json')
            print(dictionary)
            print(dictionary['key_1'])


class DictionaryClass:
    @staticmethod
    def get_all_keys(dictionary: dict):
        return dictionary.keys()

    @staticmethod
    def get_all_values(dictionary: dict):
        return dictionary.values()

    @staticmethod
    def get_all_sources(dictionary: dict, values: dict):
        dictionary_local = dictionary.copy()
        for key, value in values.items():
            dictionary_local[key] = value
        return dictionary_local


class EncodingClass:
    @staticmethod
    def find_encoding(text: Union[str, bytes]):
        if isinstance(text, str):
            text = text.encode()
        return chardet.detect(text)['encoding']

    @staticmethod
    def convert_encoding(text: Union[str, bytes], encoding=None, new_encoding='utf-8'):
        if encoding is None:
            encoding = EncodingClass.find_encoding(text)
        if isinstance(text, str):
            text = text.encode(encoding=encoding)
        return text.decode(encoding=new_encoding)

    class Example:
        @staticmethod
        def example_find_encoding():
            text = 'РђР»РµРєСЃР°РЅРґСЂР° РџСЂРѕРєРѕС„СЊРµРІР°'
            encoding = EncodingClass.find_encoding(text=text.encode(encoding='utf-8'))
            print(encoding)

        @staticmethod
        def example_convert_encoding():
            text = '\xd0\xa0\xd1\x92\xd0\xa0\xc2'
            text = 'РџСЂРѕРєРѕС„СЊРµРІР°'
            encoding = EncodingClass.find_encoding(text=text)
            text = EncodingClass.convert_encoding(text=text, encoding='Windows-1251', new_encoding='utf-8')
            print(text)


########################################################################################################################


########################################################################################################################
if __name__ == '__main__':

    EncodingClass.Example.example_convert_encoding()

    pass
