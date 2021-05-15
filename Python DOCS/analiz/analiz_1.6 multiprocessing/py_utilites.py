class LoggingClass:
    @staticmethod
    def logging(message, file_name='log.txt', type_write='a'):
        with open(file_name, type_write) as log:
            log.write(f'{message}\n')
