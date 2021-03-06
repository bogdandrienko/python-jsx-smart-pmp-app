import threading
import sys
import time
import cv2
import numpy
import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui


def play_analiz(ip_entry: str, video_file: str, sens: int, speed: float, multiplayer: float, windows: bool, width: int,
                height: int):
    global play
    play = False
    time.sleep(0.2)
    play = True
    global widget

    if ip_entry == 'video':
        cap = cv2.VideoCapture(video_file)
    elif ip_entry == 'ip-cam':
        protocol = f'rtsp'
        port = f'554'
        ip = f'192.168.8.222'
        username = f'admin'
        password = f'nehrfvths123'
        cam = f'{protocol}://{username}:{password}@{ip}:{port}'
        cap = cv2.VideoCapture(cam)
    else:
        src_white = cv2.imread('mask_white.jpg', 0)
        img = cv2.resize(src_white, (width, height), interpolation=cv2.INTER_AREA)
        cv2.imshow('image', img)

    def render(name='output', source=None):
        try:
            _img = cv2.resize(source, (width, height), interpolation=cv2.INTER_AREA)
            cv2.imshow(name, _img)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'w') as log:
                log.write(f'\n{ex}\n')
            MyWidget.stop_btn_func()

    def whiles():
        global play
        while True:
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
                    _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                                           numpy.array([255, sens, 255], dtype=numpy.uint8))
                    render('inrange', _inrange)

                def canny_edges():
                    _, src_img = cap.read()

                    _canny_edges = cv2.Canny(src_img, sens, sens, apertureSize=3, L2gradient=True)
                    render('canny_edges', _canny_edges)

                def render_final(rendering: bool):
                    _, src_img = cap.read()
                    _src_white = cv2.imread('mask_white.jpg', 0)

                    _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
                    _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                                           numpy.array([255, sens, 255], dtype=numpy.uint8))
                    result = f"{numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * multiplayer:0.4f}%"
                    if rendering:
                        cv2.putText(_inrange, result, (int(1920 / 5), int(1080 / 2)),
                                    cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
                        # cv2.putText(_inrange, f"{numpy.sum(_inrange > 0)} | {numpy.sum(_src_white == 255)}",
                        #             (int(1920 / 5), int(1080 / 1.5)), cv2.FONT_HERSHEY_SIMPLEX, 3,
                        #             (255, 255, 255), 3)
                        render('render_final', _inrange)
                    widget.set_data(result)

                try:
                    if windows:
                        origin()
                        bitwise_not_white()
                        bitwise_not_black()
                        bitwise_and_white()
                        bitwise_and_black()
                        threshold()
                        cvtcolor()
                        inrange()
                        canny_edges()
                        cropping_image()
                    render_final(windows)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'w') as log:
                        log.write(f'\n{ex}\n')
                    MyWidget.stop_btn_func()
                # Delay between two frames = 50 ms * speed (2x when delay from cycle functions)
                cv2.waitKey(int(50 / speed)) & 0xFF
                # Delay between cycle functions = 0.1 sec * speed
                time.sleep(round(0.1 / speed, 2))
            else:
                cap.release()
                cv2.destroyAllWindows()
                break

    thread_render = threading.Thread(target=whiles())
    thread_render.start()


class MyWidget(QtWidgets.QWidget):
    def __init__(self, title="app", width=640, height=480, icon=""):
        super().__init__()
        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))

        # data type
        self.horizontal_box_data_type = QtWidgets.QHBoxLayout()

        # Select data type
        self.combo = QtWidgets.QComboBox()
        self.combo.addItems([x for x in ['video', 'ip-cam', 'image']])
        self.combo.setCurrentText('видео')
        self.horizontal_box_data_type.addWidget(self.combo)

        # Data of analysis
        self.data_analysis = QtWidgets.QTextEdit("video.mp4")
        self.horizontal_box_data_type.addWidget(self.data_analysis)

        # Sens of analysis
        self.horizontal_box_sens_of_analysis = QtWidgets.QHBoxLayout()

        # Sens of analysis
        self.sens_analysis = QtWidgets.QTextEdit("sensitivity : 115")
        self.sens_analysis.setReadOnly(True)
        self.horizontal_box_sens_of_analysis.addWidget(self.sens_analysis)

        # Set sens of analysis Button
        self.sens_QPushButton = QtWidgets.QPushButton("setup sens")
        self.horizontal_box_sens_of_analysis.addWidget(self.sens_QPushButton)
        self.sens_QPushButton.clicked.connect(self.getinteger_sens)

        # Speed of analysis
        self.horizontal_box_speed_of_analysis = QtWidgets.QHBoxLayout()

        # Speed of analysis
        self.speed_analysis = QtWidgets.QTextEdit("speed analysis : 1.0")
        self.speed_analysis.setReadOnly(True)
        self.horizontal_box_speed_of_analysis.addWidget(self.speed_analysis)

        # Set speed of analysis Button
        self.speed_QPushButton = QtWidgets.QPushButton("setup speed")
        self.horizontal_box_speed_of_analysis.addWidget(self.speed_QPushButton)
        self.speed_QPushButton.clicked.connect(self.getdouble_speed)

        # multi of analysis
        self.horizontal_box_multi_of_analysis = QtWidgets.QHBoxLayout()

        # Multi of analysis
        self.multi_analysis = QtWidgets.QTextEdit("multiplayer analysis : 1.0")
        self.multi_analysis.setReadOnly(True)
        self.horizontal_box_multi_of_analysis.addWidget(self.multi_analysis)

        # Set multi of analysis Button
        self.multi_QPushButton = QtWidgets.QPushButton("setup multi")
        self.horizontal_box_multi_of_analysis.addWidget(self.multi_QPushButton)
        self.multi_QPushButton.clicked.connect(self.getdouble_sens)

        # renderer
        self.horizontal_box_renderer = QtWidgets.QHBoxLayout()

        # Boolean value of rendering the windows
        self.render_QCheckBox = QtWidgets.QCheckBox("render cv windows")
        self.render_QCheckBox.setChecked(False)
        self.horizontal_box_renderer.addWidget(self.render_QCheckBox)

        self.resolution_window = [640, 480]
        self.radio_btn_s = []

        # Height window renderer
        self.window_height_1 = QtWidgets.QRadioButton("320x240")
        self.horizontal_box_renderer.addWidget(self.window_height_1)
        self.window_height_1.toggled.connect(self.set_window_resolution(self.window_height_1, 320, 240))

        # Height window renderer
        self.window_height_2 = QtWidgets.QRadioButton("640x480")
        self.horizontal_box_renderer.addWidget(self.window_height_2)
        self.window_height_2.setChecked(True)
        self.window_height_2.toggled.connect(self.set_window_resolution(self.window_height_2, 640, 480))

        # Height window renderer
        self.window_height_3 = QtWidgets.QRadioButton("1280x720")
        self.horizontal_box_renderer.addWidget(self.window_height_3)
        self.window_height_3.toggled.connect(self.set_window_resolution(self.window_height_3, 1280, 720))

        # Height window renderer
        self.window_height_4 = QtWidgets.QRadioButton("1920x1080")
        self.horizontal_box_renderer.addWidget(self.window_height_4)
        self.window_height_4.toggled.connect(self.set_window_resolution(self.window_height_4, 1920, 1080))

        # data_value
        self.vertical_box_data_value = QtWidgets.QVBoxLayout()
        self.vertical_box_data_value.addStretch(1)

        # PlainText data value
        self.data_ruda = QtWidgets.QPlainTextEdit("0.0000%")
        self.data_ruda.setReadOnly(True)
        self.vertical_box_data_value.addWidget(self.data_ruda)

        # psq_btn
        self.horizontal_box_psq_btn = QtWidgets.QHBoxLayout()

        # Play Button
        self.play_QPushButton = QtWidgets.QPushButton("play")
        self.horizontal_box_psq_btn.addWidget(self.play_QPushButton)
        self.play_QPushButton.clicked.connect(self.play_btn_func)

        # Stop Button
        self.stop_QPushButton = QtWidgets.QPushButton("stop")
        self.horizontal_box_psq_btn.addWidget(self.stop_QPushButton)
        self.stop_QPushButton.clicked.connect(MyWidget.stop_btn_func)

        # Quit Button
        self.quit_QPushButton = QtWidgets.QPushButton("quit")
        self.horizontal_box_psq_btn.addWidget(self.quit_QPushButton)
        self.quit_QPushButton.clicked.connect(MyWidget.quit_btn_func)

        # Main vertical Layout
        self.vertical_box_main = QtWidgets.QVBoxLayout(self)
        self.vertical_box_main.addLayout(self.horizontal_box_data_type)
        self.vertical_box_main.addLayout(self.horizontal_box_sens_of_analysis)
        self.vertical_box_main.addLayout(self.horizontal_box_speed_of_analysis)
        self.vertical_box_main.addLayout(self.horizontal_box_multi_of_analysis)
        self.vertical_box_main.addLayout(self.horizontal_box_renderer)
        self.vertical_box_main.addLayout(self.vertical_box_data_value)
        self.vertical_box_main.addLayout(self.horizontal_box_psq_btn)
        self.setLayout(self.vertical_box_main)

    def getinteger_sens(self):
        value, okpressed = QtWidgets.QInputDialog.getInt(self, "Set speed", "Speed value:", 115, 1, 255, 5)
        if okpressed:
            self.sens_analysis.setText(f'sensitivity : {str(value)}')

    def getdouble_speed(self):
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.1, 50.0, 2)
        if okpressed:
            self.speed_analysis.setText(f'speed analysis : {(round(value, 3))}')

    def getdouble_sens(self):
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.1, 50.0, 2)
        if okpressed:
            self.multi_analysis.setText(f'multiplayer analysis : {(round(value, 3))}')

    def set_window_resolution(self, radio, widht: int, height: int):
        self.radio_btn_s.append([radio, widht, height])

    def get_window_resolution(self):
        for radio in self.radio_btn_s:
            try:
                if radio[0].isChecked():
                    return [radio[1], radio[2]]
            except Exception as ex:
                print(ex)

    def play_btn_func(self):
        play_analiz(ip_entry=str(self.combo.currentText().strip()),
                    video_file=str(self.data_analysis.toPlainText().strip()),
                    sens=int(self.sens_analysis.toPlainText().split(':')[1].strip()),
                    speed=float(self.speed_analysis.toPlainText().split(':')[1].strip()),
                    multiplayer=float(self.multi_analysis.toPlainText().split(':')[1].strip()),
                    windows=bool(self.render_QCheckBox.isChecked()),
                    width=int(self.get_window_resolution()[0]),
                    height=int(self.get_window_resolution()[1]))

    def set_data(self, value: str):
        self.data_ruda.clear()
        self.data_ruda.setPlaceholderText(f"{value}\n")

    @staticmethod
    def stop_btn_func():
        global play
        play = False

    @staticmethod
    def quit_btn_func():
        MyWidget.stop_btn_func()
        global app
        sys.exit(app.exec_())


if __name__ == "__main__":
    play = True
    app = QtWidgets.QApplication([])

    widget = MyWidget(title="analysis", width=300, height=510, icon="icon.ico")
    thread_ui = threading.Thread(target=widget.show())
    thread_ui.start()

    sys.exit(app.exec_())
