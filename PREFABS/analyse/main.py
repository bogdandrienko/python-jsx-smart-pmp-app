import sys
import threading
import time
from multiprocessing import freeze_support

import PySide6.QtGui as QtGui
import PySide6.QtWidgets as QtWidgets
import cv2


# Запускается интерфейс для входа
# При вводе логина и пароля нужно читать с файла(Временный файл в локальном хранилище) имена пользователей и


class AppContainerClass:
    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.widget = None

    def create_ui(self, title, width, height, icon, play_f, stop_f, quit_f):
        self.widget = MainWidgetClass(title, width, height, icon, play_f, stop_f, quit_f)
        return self.widget

    @staticmethod
    def create_qlable(text: str, _parent, background=False):
        _widget = QtWidgets.QLabel(text)
        if background:
            _widget.setAutoFillBackground(True)
            _widget.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qpushbutton(_parent, _connect_func, _text='set'):
        _widget = QtWidgets.QPushButton(_text)
        _parent.addWidget(_widget)
        _widget.clicked.connect(_connect_func)
        return _widget

    @staticmethod
    def create_qcheckbox(_parent, _text='check?', default=False):
        _widget = QtWidgets.QCheckBox(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qcombobox(_parent, _text: list, default=None):
        _widget = QtWidgets.QComboBox()
        _widget.addItems([x for x in _text])
        _widget.setCurrentText(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qradiobutton(_parent, _text: str, default=False):
        _widget = QtWidgets.QRadioButton(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget


class MainWidgetClass(QtWidgets.QWidget):
    def __init__(self, title="APP", width=640, height=480, icon="", play_f=None, stop_f=None, quit_f=None):
        super().__init__()

        self.play_f = play_f
        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))
        self.resolution_debug = []
        self.v_layout_m = QtWidgets.QVBoxLayout(self)

        # MANAGEMENT
        self.h_layout_g_management = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_management)
        self.g_management_set = AppContainerClass.create_qlable('MANAGEMENT', self.h_layout_g_management,
                                                                background=True)
        self.h_layout_management_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_management_1)
        self.play_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1,
                                                                     self.play_btn_func,
                                                                     'play')
        self.stop_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1, stop_f, 'stop')
        self.quit_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1, quit_f, 'quit')

        # DEBUG
        self.h_layout_g_debug = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_debug)
        self.g_debug_set = AppContainerClass.create_qlable('DEBUG', self.h_layout_g_debug, background=True)
        self.h_layout_debug_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_1)
        self.auto_import_check = AppContainerClass.create_qcheckbox(self.h_layout_debug_1, 'AUTO IMPORT?')
        self.video = QtWidgets.QLineEdit('video.mp4')
        self.h_layout_debug_1.addWidget(self.video)
        self.speed = QtWidgets.QLineEdit('10')
        self.h_layout_debug_1.addWidget(self.speed)

        self.h_layout_debug_2 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_2)
        self.widget_data_value = AppContainerClass.create_qlable('0.00%', self.h_layout_debug_2)
        self.h_layout_debug_2.addStretch()

        self.h_layout_debug_3 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_3)
        self.render_win_debug = AppContainerClass.create_qlable('Render windows :', self.h_layout_debug_3)
        self.render_debug = AppContainerClass.create_qcombobox(self.h_layout_debug_3,
                                                               ['none', 'source', 'final', 'extended',
                                                                'all'], 'none')

        self.setLayout(self.v_layout_m)

    def create_data_func(self):
        try:
            data = {
                'video': str(self.video.text().strip()),
                'speed': int(self.speed.text().strip()),
                'widget': self.set_data_func,
            }
            return data
        except Exception as ex:
            print(f'create_data_func error : {ex}')

    def play_btn_func(self):
        try:
            data = self.create_data_func()
            self.play_f(data=data)
        except Exception as ex:
            print(f'play_btn_func error : {ex}')

    def set_data_func(self, value: str):
        try:
            self.widget_data_value.setText(f"{value}")
        except Exception as ex:
            print(f'set_data_func error : {ex}')


def play_func(data):
    global play
    try:
        play = True

        def play_analyze():
            try:
                video = data["video"]
            except:
                video = "video.mp4"
            try:
                color1 = data["color1"]
                color2 = data["color2"]
            except:
                color1 = (0, 255, 0)
                color2 = (0, 0, 255)
            try:
                thickness = data["thickness"]
            except:
                thickness = 2
            try:
                scale_percent = data["scale_percent"]
            except:
                scale_percent = 70
            try:
                speed = data["speed"]
            except:
                speed = 360
            try:
                widget = data["widget"]
            except:
                widget = None
            cap = cv2.VideoCapture(video)
            mask = cv2.imread("file.jpg", 0)
            width = int(mask.shape[1] * scale_percent / 100)
            height = int(mask.shape[0] * scale_percent / 100)
            dim = (width, height)

            # index = 0
            # if index == 0:
            #     cv2.imwrite("mask.png", mask)
            #     index += 1

            # # ЧТЕНИЕ ИЗ БАЗЫ И ПРОВЕРКА НА ПОЛЬЗОВАТЕЛЯ
            # with open('text.txt', 'r') as file:
            #     lines = file.readlines()
            #     index = 0
            #     for line in lines:
            #         print(f"{index}: {line}")
            #         index += 1
            #     # print(lines)
            # username = lines[0].split(';')[0].split('username: "')[1][:-1]
            # print("username: ", username)
            # password = lines[0].split(';')[1].split('password: "')[1][:-1]
            # print("password: ", password)
            # # .split('password: "')[1][:-1]
            # # username: "Bogdan"; password: "qwerty1";
            # # username: "Bogdan1"; password: "qwerty2";
            # # username: "Bogdan2"; password: "qwerty3";
            #
            # # ЗАПИСЬ В БАЗУ И РЕГИСТРАЦИЯ НА ПОЛЬЗОВАТЕЛЯ
            # with open('text.txt', 'a') as file:
            #     file.write('\nusername: "321321"; password: "123123";')

            def get_frame(_cap):
                return _cap.read()[1]

            def show_img(_img, title="window"):
                img = cv2.resize(_img, dim, interpolation=cv2.INTER_AREA)
                # img = img[100:-100, 100:-100]
                cv2.imshow(title, img)

            while play:
                img_source = get_frame(_cap=cap)
                show_img(_img=img_source, title="img_source")

                img_conveyer = cv2.bitwise_and(img_source, img_source, mask=mask)
                show_img(_img=img_conveyer, title="img_conveyer")

                time.sleep(1 / speed)

                img_source_next = get_frame(_cap=cap)
                show_img(_img=img_source_next, title="img_source_next")

                img_conveyer_next = cv2.bitwise_and(img_source_next, img_source_next, mask=mask)
                show_img(_img=img_conveyer_next, title="img_conveyer_next")

                img_diff = cv2.absdiff(img_conveyer, img_conveyer_next)
                img_gray = cv2.cvtColor(img_diff, cv2.COLOR_BGR2GRAY)
                show_img(_img=img_gray, title="img_gray")

                img_blur = cv2.GaussianBlur(img_gray, (21, 21), 0)
                ok, img_thresh = cv2.threshold(img_blur, 200, 255, cv2.THRESH_OTSU)
                show_img(_img=img_thresh, title="img_thresh")

                img_weight = cv2.addWeighted(img_source, 0.9, img_diff, 0.1, 0)
                contours, hierarchy = cv2.findContours(img_thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
                img_final = cv2.addWeighted(img_source, 0.9, img_diff, 0.1, 0)
                for contour in contours:
                    x, y, w, h = cv2.boundingRect(contour)
                    if 70 <= abs(w) <= 500 and 70 <= abs(h) <= 500:
                        img_weight = cv2.drawContours(img_weight, contour, -1, color1, thickness)
                        img_final = cv2.rectangle(img_weight, (x, y), (x + w, y + h), color2, 3)
                show_img(_img=img_final, title="img_final")
                if widget:
                    widget(len(contours))
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            cap.release()
            cv2.destroyAllWindows()

        threading.Thread(target=play_analyze, args=()).start()
    except Exception as ex:
        print(ex)


def stop_func():
    global play
    play = False


def pause():
    global play
    return play


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec())


# MAIN
if __name__ == "__main__":
    freeze_support()
    play = True
    app_container = AppContainerClass()
    widget = app_container.create_ui(title="analysis", width=300, height=300, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func)
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec())
