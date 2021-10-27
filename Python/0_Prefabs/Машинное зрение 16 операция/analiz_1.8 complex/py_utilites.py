import json
import time
import smtplib


class LoggingClass:
    @staticmethod
    def logging(message, file_name='log.txt', type_write='a'):
        with open(file_name, type_write) as log:
            log.write(f'{TimeUtils.get_current_time()} : {message}\n')


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


class TimeUtils:
    @staticmethod
    def get_current_time():
        return f"{time.strftime('%X')}"


class SendMail:
    @staticmethod
    def sender_email(subject='subj', text='text'):
        host = 'smtp.yandex.ru'
        port = '465'
        login = 'eevee.cycle'
        password = '31284bogdan'
        writer = 'eevee.cycle@yandex.ru'
        recipient = 'eevee.cycle@yandex.ru'

        message = f"""From: {recipient}\nTo: {writer}\nSubject: {subject}\n\n{text}"""

        smtpobj = smtplib.SMTP_SSL(host=host, port=port)
        smtpobj.ehlo()
        smtpobj.login(user=login, password=password)
        smtpobj.sendmail(from_addr=writer, to_addrs=recipient, msg=message)
        smtpobj.quit()
