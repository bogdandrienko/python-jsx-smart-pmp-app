import threading
import sys
from py_cv import Analizclass
from py_ui import AppContainerclass


def play_func(data: dict):
    global analiz_container
    try:
        if analiz_container:
            analiz_container.play = False
            analiz_container = None
            analiz_container = Analizclass()
            analiz_container.start_analiz_threads(**data)
        else:
            analiz_container = Analizclass()
            analiz_container.start_analiz_threads(**data)
    except Exception as ex:
        print(ex)
        with open('log.txt', 'a') as log:
            log.write(f'\n{ex}\n')


def stop_func():
    global analiz_container
    if analiz_container:
        analiz_container.play = False


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec_())


if __name__ == "__main__":
    analiz_container = None
    app_container = AppContainerclass()
    widget = app_container.create_ui(title="analysis", width=760, height=660, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func)
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec_())
