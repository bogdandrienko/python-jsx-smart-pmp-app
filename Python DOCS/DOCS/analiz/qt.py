import sys
import time
import cv2
# from PySide6.QtGui import QIcon
from PySide6 import QtWidgets
from numpy import array, uint8, sum
from threading import Thread


def play_analiz(ip_entry: str, video_file: str, sens: int, speed: float, multiplayer: float, windows: bool, width: int,
                height: int):
    global play
    play = False
    time.sleep(0.05)
    play = True

    if ip_entry == 'video':
        cap = cv2.VideoCapture(video_file)
    elif ip_entry == 'ip-cam':
        # ip = '192.168.8.223'
        ip = video_file
        port = 554
        login = 'admin'
        password = 'nehrfvths123'
        cam = f'rtsp://{login}:{password}@{ip}:{port}'
        cap = cv2.VideoCapture(cam)
    else:
        src_white = cv2.imread('mask_white.jpg', 0)
        img = cv2.resize(src_white, (width, height), interpolation=cv2.INTER_AREA)
        cv2.imshow('image', img)

    def render(name='output', source=None):
        try:
            _img = cv2.resize(source, (width, height), interpolation=cv2.INTER_AREA)
            cv2.imshow(name, _img)
        except:
            pass

    def whiles():
        while True:
            global play
            if play:
                def origin():
                    _, src_img = cap.read()
                    render('src_img', src_img)

                def cropping_image():
                    _, src_img = cap.read()

                    _cropping_image = src_img[250:1080, 600:1720]
                    render('cropping_image', _cropping_image)

                def bitwise_not_white():
                    _, src_img = cap.read()
                    _src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=_src_white)
                    render('bitwise_not_white', _bitwise_not_white)

                def bitwise_not_black():
                    _, src_img = cap.read()
                    src_black = cv2.imread('mask_black.jpg', 0)

                    _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                    render('bitwise_not_black', _bitwise_and_black)

                def bitwise_and_white():
                    _, src_img = cap.read()
                    _src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=_src_white)
                    render('bitwise_and_white', _bitwise_and_white)

                def bitwise_and_black():
                    _, src_img = cap.read()
                    src_black = cv2.imread('mask_black.jpg', 0)

                    _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                    render('bitwise_and_black', _bitwise_and_black)

                def threshold():
                    _, src_img = cap.read()

                    _, _threshold = cv2.threshold(src_img, 220, 255, cv2.THRESH_BINARY_INV)
                    render('threshold', _threshold)

                def cvtcolor():
                    _, src_img = cap.read()

                    _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                    render('cvtcolor', _cvtcolor)

                def inrange():
                    _, src_img = cap.read()

                    _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, array([0, 0, 255 - int(110)], dtype=uint8),
                                           array([255, int(110), 255], dtype=uint8))
                    render('inrange', _inrange)

                def canny_edges():
                    _, src_img = cap.read()

                    _canny_edges = cv2.Canny(src_img, int(sens), int(sens), apertureSize=3, L2gradient=True)
                    render('canny_edges', _canny_edges)

                def render_final():
                    _, src_img = cap.read()
                    _src_white = cv2.imread('mask_white.jpg', 0)

                    _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
                    _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, array([0, 0, 255 - int(sens)], dtype=uint8),
                                           array([255, int(sens), 255], dtype=uint8))
                    result = sum(_inrange > 0) * float(multiplayer) / sum(_src_white > 0) * 100
                    cv2.putText(_inrange, f"{result:0.4f}%", (int(int(1920) / 5), int(int(1080) / 2)),
                                cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
                    cv2.putText(_inrange, f"{sum(_inrange > 0)} | {sum(_src_white == 255)}",
                                (int(int(1920) / 5), int(int(1080) / 1.5)), cv2.FONT_HERSHEY_SIMPLEX, 3,
                                (255, 255, 255), 3)
                    render('render_final', _inrange)

                if windows:
                    origin()
                    # bitwise_not_white()
                    # bitwise_not_black()
                    # bitwise_and_white()
                    # bitwise_and_black()
                    # threshold()
                    cvtcolor()
                    inrange()
                    canny_edges()
                    cropping_image()
                    render_final()
                # Delay between two frames = 50 ms * speed (2x when delay from cycle functions)
                cv2.waitKey(round(50 / float(speed))) & 0xFF
                # Delay between cycle functions = 0.1 sec * speed
                time.sleep(round(0.1 / float(speed), 2))
            else:
                cap.release()
                cv2.destroyAllWindows()
                break

    thread_render = Thread(target=whiles)
    thread_render.start()


class MyWidget(QtWidgets.QWidget):
    def delegate(self):
        pass

    def __init__(self, title="app", width=640, height=480, icon="icon.ico"):
        super().__init__()
        self.resize(width, height)
        self.setWindowTitle(title)
        # self.setWindowIcon(QIcon(icon))

        # QVBoxLayout Window
        self.ui_window = QtWidgets.QVBoxLayout(self)

        # # Select data type
        # self.combo = QtWidgets.QComboBox()
        # self.combo.addItems([str(x) for x in ['video', 'ip-cam', 'image']])
        # self.combo.setCurrentText('видео')
        # self.ui_window.addWidget(self.combo)
        #
        # # Data of analysis
        # self.data_analysis = QtWidgets.QTextEdit("video.mp4")
        # self.ui_window.addWidget(self.data_analysis)
        #
        # # Sens of analysis
        # self.sens_analysis = QtWidgets.QTextEdit("sensitivity : 115")
        # self.sens_analysis.setReadOnly(True)
        # self.ui_window.addWidget(self.sens_analysis)
        #
        # # Set sens of analysis Button
        # self.sens_QPushButton = QtWidgets.QPushButton("setup sens")
        # self.ui_window.addWidget(self.sens_QPushButton)
        # self.sens_QPushButton.clicked.connect(self.getinteger_sens)
        #
        # # Speed of analysis
        # self.speed_analysis = QtWidgets.QTextEdit("speed analysis : 1.0")
        # self.speed_analysis.setReadOnly(True)
        # self.ui_window.addWidget(self.speed_analysis)
        #
        # # Set speed of analysis Button
        # self.speed_QPushButton = QtWidgets.QPushButton("setup speed")
        # self.ui_window.addWidget(self.speed_QPushButton)
        # self.speed_QPushButton.clicked.connect(self.getdouble_speed)
        #
        # # Multi of analysis
        # self.multi_analysis = QtWidgets.QTextEdit("multiplayer analysis : 1.0")
        # self.multi_analysis.setReadOnly(True)
        # self.ui_window.addWidget(self.multi_analysis)
        #
        # # Set multi of analysis Button
        # self.multi_QPushButton = QtWidgets.QPushButton("setup multi")
        # self.ui_window.addWidget(self.multi_QPushButton)
        # self.multi_QPushButton.clicked.connect(self.getdouble_sens)
        #
        # # Boolean value of rendering the windows
        # self.render_QCheckBox = QtWidgets.QCheckBox("render cv windows")
        # self.render_QCheckBox.setChecked(True)
        # self.ui_window.addWidget(self.render_QCheckBox)
        #
        # # Width window renderer
        # self.window_width = QtWidgets.QTextEdit(str(width))
        # self.ui_window.addWidget(self.window_width)
        #
        # # Height window renderer
        # self.window_height = QtWidgets.QTextEdit(str(height))
        # self.ui_window.addWidget(self.window_height)

        # Play Button
        self.play_QPushButton = QtWidgets.QPushButton("play")
        self.ui_window.addWidget(self.play_QPushButton)
        self.play_QPushButton.clicked.connect(self.play_btn_func)

        # Stop Button
        self.stop_QPushButton = QtWidgets.QPushButton("stop")
        self.ui_window.addWidget(self.stop_QPushButton)
        self.stop_QPushButton.clicked.connect(MyWidget.stop_btn_func)

        # Quit Button
        self.quit_QPushButton = QtWidgets.QPushButton("quit")
        self.ui_window.addWidget(self.quit_QPushButton)
        self.quit_QPushButton.clicked.connect(MyWidget.quit_btn_func)

    # def getinteger_sens(self):
    #     value, okpressed = QtWidgets.QInputDialog.getInt(self, "Set speed", "Speed value:", 115, 1, 255, 5)
    #     if okpressed:
    #         self.sens_analysis.setText(f'sensitivity : {str(value)}')
    #
    # def getdouble_speed(self):
    #     value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.1, 50.0, 2)
    #     if okpressed:
    #         self.speed_analysis.setText(f'speed analysis : {(round(value, 3))}')
    #
    # def getdouble_sens(self):
    #     value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.1, 50.0, 2)
    #     if okpressed:
    #         self.multi_analysis.setText(f'multiplayer analysis : {(round(value, 3))}')

    def play_btn_func(self):
        pass
        # play_analiz(ip_entry=str(self.combo.currentText().strip()),
        #             video_file=str(self.data_analysis.toPlainText().strip()),
        #             sens=int(self.sens_analysis.toPlainText().split(':')[1].strip()),
        #             speed=float(self.speed_analysis.toPlainText().split(':')[1].strip()),
        #             multiplayer=float(self.multi_analysis.toPlainText().split(':')[1].strip()),
        #             windows=bool(self.render_QCheckBox.isChecked()),
        #             width=int(self.window_width.toPlainText().strip()),
        #             height=int(self.window_width.toPlainText().strip()))

    @staticmethod
    def stop_btn_func():
        global play
        play = False

    @staticmethod
    def quit_btn_func():
        global play
        play = False
        global app
        sys.exit(app.exec_())


if __name__ == "__main__":
    play = True
    app = QtWidgets.QApplication([])

    widget = MyWidget(title="analysis", width=640, height=480, icon="icon.ico")
    thread_main = Thread(target=widget.show())
    thread_main.start()

    sys.exit(app.exec_())
