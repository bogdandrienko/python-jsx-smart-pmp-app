import sys
import threading
from py_cv import Analizclass
from py_ui import AppContainerclass
from py_utilites import CopyDictionary
from multiprocessing import freeze_support


def play_func(data: dict):
    global play_analiz
    global analiz_container
    try:
        play_analiz = True
        if analiz_container:
            analiz_container = None
            analiz_container = Analizclass()
            analiz_container.start_analiz(data=CopyDictionary.add_value_and_return(data, {'pause': pause}))
        else:
            analiz_container = Analizclass()
            analiz_container.start_analiz(data=CopyDictionary.add_value_and_return(data, {'pause': pause}))
    except Exception as ex:
        print(ex)
        with open('log.txt', 'a') as log:
            log.write(f'\n{ex}\n')


def stop_func():
    global play_analiz
    play_analiz = False


def pause():
    global play_analiz
    return play_analiz


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec_())


if __name__ == "__main__":
    freeze_support()
    analiz_container = None
    play_analiz = True
    app_container = AppContainerclass()
    widget = app_container.create_ui(title="analysis", width=1280, height=720, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func)
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec_())
