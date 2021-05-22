import json


class LoggingClass:
    @staticmethod
    def logging(message, file_name='log.txt', type_write='a'):
        with open(file_name, type_write) as log:
            log.write(f'{message}\n')


class CopyDictionary:
    @staticmethod
    def get_all_sources(source: dict, values: dict):
        value = source.copy()
        for _key, _value in values.items():
            value[_key] = _value
        return value


class FileSettings:
    @staticmethod
    def export_settings(data: dict):
        with open(f"{data['import_file']}.json", 'w') as file:
            json.dump(data, file)

    @staticmethod
    def import_settings(data: dict):
        try:
            with open(f"{data['import_file']}.json", "r") as read_file:
                data = json.load(read_file)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'import_settings error : {ex}')
        return data
