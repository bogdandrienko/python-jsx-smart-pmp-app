import sys
import threading
from py_cv import AnalyzeClass
from py_ui import AppContainerClass
from py_utilites import CopyDictionary
from multiprocessing import freeze_support


def play_func(data: dict):
    global play
    try:
        play = True
        AnalyzeClass.start_analyze(data=CopyDictionary.add_value_and_return(data, {'pause': pause}))
    except Exception as ex:
        print(ex)
        with open('log.txt', 'a') as log:
            log.write(f'\n{ex}\n')


def stop_func():
    global play
    play = False


def pause():
    global play
    return play


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec_())


def snapshot_func(data: dict):
    threading.Thread(target=AnalyzeClass.make_snapshot, args=(data,)).start()


if __name__ == "__main__":
    freeze_support()
    play = True
    app_container = AppContainerClass()
    widget = app_container.create_ui(title="analysis", width=1280, height=720, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func, snapshot_f=snapshot_func)
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec_())
