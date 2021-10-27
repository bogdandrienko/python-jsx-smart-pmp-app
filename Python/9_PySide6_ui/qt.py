import sys
import cv2
from PySide6 import QtCore, QtWidgets, QtGui
from numpy import array, uint8, sum
from threading import Thread
from time import sleep


def play_analiz(ip_entry, video_file, sens, speed, multiplayer, windows, width, height):
    global play
    play = False
    sleep(0.5)
    play = True

    if ip_entry == 'Да' or ip_entry == 'да':
        cap = cv2.VideoCapture(video_file)
    else:
        # ip = '192.168.8.223'
        ip = video_file
        port = 554
        login = 'admin'
        password = 'nehrfvths123'
        cam = f'rtsp://{login}:{password}@{ip}:{port}'
        cap = cv2.VideoCapture(cam)

    def render(name='output', source=None):
        try:
            img = cv2.resize(source, (int(width), int(height)), interpolation=cv2.INTER_AREA)
            cv2.imshow(name, img)
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
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=src_white)
                    render('bitwise_not_white', _bitwise_not_white)

                def bitwise_not_black():
                    _, src_img = cap.read()
                    src_black = cv2.imread('mask_black.jpg', 0)

                    _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                    render('bitwise_not_black', _bitwise_and_black)

                def bitwise_and_white():
                    _, src_img = cap.read()
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=src_white)
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
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=src_white)
                    _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, array([0, 0, 255 - int(sens)], dtype=uint8),
                                           array([255, int(sens), 255], dtype=uint8))
                    # print(f'white: {cv2.countNonZero(src_white)}')
                    # print(f'black: {cv2.countNonZero(src_black)}')
                    # result = sum(_inrange > 0) * float(multiplayer) / sum(src_white > 0) * 100
                    result = sum(_inrange > 0) * float(multiplayer) / sum(src_white > 0) * 100
                    cv2.putText(_inrange, f"{result:0.4f}%", (int(int(1920) / 5), int(int(1080) / 2)),
                                cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
                    cv2.putText(_inrange, f"{sum(_inrange > 0)} | {sum(src_white == 255)}",
                                (int(int(1920) / 5), int(int(1080) / 1.5)), cv2.FONT_HERSHEY_SIMPLEX, 3,
                                (255, 255, 255), 3)
                    # app.log_entry.insert(0, f'{result:0.4f}% |{white_pix}/{all_scope} | ')
                    render('render_final', _inrange)

                if windows == 'да' or windows == 'Да':
                    origin()
                    # bitwise_not_white()
                    # bitwise_not_black()
                    # bitwise_and_white()
                    # bitwise_and_black()
                    cvtcolor()
                    inrange()
                    threshold()
                    canny_edges()
                    cropping_image()
                    render_final()

                k = cv2.waitKey(round(30 / float(speed))) & 0xFF
                if k == 27:
                    play = False
            else:
                cap.release()
                cv2.destroyAllWindows()
                break

    thread_render = Thread(target=whiles)
    thread_render.start()
    # _, src_img = cap.read()
    # render('src_img', src_img)


class MyWidget(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.play_button = QtWidgets.QPushButton("play")
        self.stop_button = QtWidgets.QPushButton("stop")
        self.quit_button = QtWidgets.QPushButton("quit")

        self.ui_window = QtWidgets.QVBoxLayout(self)
        self.ui_window.addWidget(self.play_button)
        self.ui_window.addWidget(self.stop_button)
        self.ui_window.addWidget(self.quit_button)

        self.play_button.clicked.connect(self.play_btn_func)
        self.stop_button.clicked.connect(self.stop_btn_func)
        self.quit_button.clicked.connect(self.quit_btn_func)

    @QtCore.Slot()
    def play_btn_func(self):
        play_analiz(ip_entry='да', video_file='video.mp4', sens='115', speed='1.0', multiplayer='1.0', windows='да',
                    width='640', height='480')

    @QtCore.Slot()
    def stop_btn_func(self):
        global play
        play = False
        pass

    @QtCore.Slot()
    def quit_btn_func(self):
        global play
        play = False
        global app
        sys.exit(app.exec_())
        pass


if __name__ == "__main__":
    play = False
    app = QtWidgets.QApplication([])

    widget = MyWidget()
    widget.resize(640, 480)
    thread_main = Thread(target=widget.show())
    thread_main.start()

    sys.exit(app.exec_())
