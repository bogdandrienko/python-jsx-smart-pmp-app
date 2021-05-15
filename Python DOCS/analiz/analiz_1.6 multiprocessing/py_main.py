import sys
import threading
from py_cv import Analizclass
from py_ui import AppContainerclass
from multiprocessing import Pool, Process
from threading import Thread


def play_func(data: dict):
    global analiz_container
    try:
        if analiz_container:
            analiz_container.play = False
            analiz_container = None
            analiz_container = Analizclass()
            analiz_container.start_analiz(pause, **data)
        else:
            analiz_container = Analizclass()
            analiz_container.start_analiz(pause, **data)
    except Exception as ex:
        print(ex)
        with open('log.txt', 'a') as log:
            log.write(f'\n{ex}\n')


def stop_func():
    global analiz_container
    global play_analiz
    if analiz_container:
        analiz_container.play = False
    play_analiz = False


def pause(value):
    global play_analiz
    if value is not None:
        play_analiz = value
    return play_analiz


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec_())


if __name__ == "__main__":
    play_analiz = True
    analiz_container = None
    app_container = AppContainerclass()
    widget = app_container.create_ui(title="analysis", width=1280, height=720, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func)
    # ui_process = Process(target=widget.show())
    ui_thread = Thread(target=widget.show())
    sys.exit(app_container.app.exec_())