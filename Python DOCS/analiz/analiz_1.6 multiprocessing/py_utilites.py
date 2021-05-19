import os
import json


class LoggingClass:
    @staticmethod
    def logging(message, file_name='log.txt', type_write='a'):
        with open(file_name, type_write) as log:
            log.write(f'{message}\n')


class CopyDictionary:
    @staticmethod
    def add_value_and_return(source: dict, values: dict):
        value = source.copy()
        for _key, _value in values.items():
            value[_key] = _value
        return value


class FileSettings:
    @staticmethod
    def export_settings(data: dict):
        del data['widget']
        with open('settings.json', 'w') as file:
            json.dump(data, file)
            # file.write(f"{data}")

    @staticmethod
    def import_settings():
        with open('settings.json', 'r') as file:
            data = file.read()
        return data
