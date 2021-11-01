import sys
from PySide6 import QtWidgets
from threading import Thread
from time import sleep


def play_func(data):
    global play
    play = False
    sleep(0.5)
    play = True

    def whiles():
        print(data)

    thread_render = Thread(target=whiles)
    thread_render.start()
    widget.set_text_func('завершено')


class MyWidget(QtWidgets.QWidget):
    def __init__(self, title="ожидание"):
        super().__init__()
        self.play_button = QtWidgets.QPushButton("play")
        self.temp_box = QtWidgets.QDoubleSpinBox()
        self.stop_button = QtWidgets.QPushButton("stop")
        self.quit_button = QtWidgets.QPushButton("quit")
        self.temp_box.setValue(36.6)
        self.setWindowTitle(title)

        self.ui_window = QtWidgets.QHBoxLayout(self)
        self.ui_window.addWidget(self.play_button)
        self.ui_window.addWidget(self.temp_box)
        self.ui_window.addWidget(self.stop_button)
        self.ui_window.addWidget(self.quit_button)

        self.play_button.clicked.connect(self.play_btn_func)
        self.stop_button.clicked.connect(self.stop_btn_func)
        self.quit_button.clicked.connect(self.quit_btn_func)

    def play_btn_func(self):
        self.set_text_func("в процессе")
        play_func(data=self.temp_box.value())

    def stop_btn_func(self):
        self.set_text_func("пауза")
        global play
        play = False

    def quit_btn_func(self):
        self.set_text_func("выйти")
        global play
        play = False
        global app
        sys.exit(app.exec())

    def set_text_func(self, text: str):
        self.setWindowTitle(text)


if __name__ == "__main__":
    play = False
    app = QtWidgets.QApplication([])
    widget = MyWidget()
    widget.resize(640, 480)
    thread_main = Thread(target=widget.show())
    thread_main.start()
    sys.exit(app.exec())
