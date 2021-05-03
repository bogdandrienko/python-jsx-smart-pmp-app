import cv2
import tkinter
from numpy import sum, array, uint8
from threading import Thread
from time import sleep


def click_button(video_file='', sens='100', speed=1.0, width='640',
                 height='480', windows='да', multiplayer='7.0'):
    global play
    play = False
    sleep(0.25)
    play = True
    app.root.config(background="red")

    cap = cv2.VideoCapture(video_file)

    def whiles():
        while True:
            global play
            if play:
                def origin():
                    _, src_img = cap.read()
                    render('src_img', src_img, width, height)

                def bitwise_not_white():
                    _, src_img = cap.read()
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=src_white)
                    render('bitwise_not_white', _bitwise_not_white, width, height)

                def bitwise_not_black():
                    _, src_img = cap.read()
                    src_black = cv2.imread('mask_black.jpg', 0)

                    _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                    render('bitwise_not_black', _bitwise_and_black, width, height)

                def bitwise_and_white():
                    _, src_img = cap.read()
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=src_white)
                    render('bitwise_and_white', _bitwise_and_white, width, height)

                def bitwise_and_black():
                    _, src_img = cap.read()
                    src_black = cv2.imread('mask_black.jpg', 0)

                    _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                    render('bitwise_and_black', _bitwise_and_black, width, height)

                def cvtcolor():
                    _, src_img = cap.read()

                    _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                    render('cvtcolor', _cvtcolor, width, height)

                def inrange():
                    _, src_img = cap.read()

                    _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, array([0, 0, 255 - int(110)],
                                                            dtype=uint8), array([255, int(110), 255], dtype=uint8))
                    render('inrange', _inrange, width, height)

                def threshold():
                    _, src_img = cap.read()

                    _, _threshold = cv2.threshold(src_img, 220, 255, cv2.THRESH_BINARY_INV)
                    render('threshold', _threshold, width, height)

                def canny_edges():
                    _, src_img = cap.read()

                    _canny_edges = cv2.Canny(src_img, int(sens), int(sens), apertureSize=3, L2gradient=True)
                    render('canny_edges', _canny_edges, width, height)

                def cropping_image():
                    _, src_img = cap.read()

                    _cropping_image = src_img[250:1080, 600:1720]
                    render('cropping_image', _cropping_image, width, height)

                def render_final():
                    _, src_img = cap.read()
                    src_white = cv2.imread('mask_white.jpg', 0)

                    _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=src_white)
                    _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
                    _inrange = cv2.inRange(_cvtcolor, array([0, 0, 255 - int(sens)],
                                                            dtype=uint8), array([255, int(sens), 255], dtype=uint8))
                    # print(f'white: {cv2.countNonZero(src_white)}')
                    # print(f'black: {cv2.countNonZero(src_black)}')
                    # result = sum(_inrange > 0) * float(multiplayer) / sum(src_white > 0) * 100
                    result = sum(_inrange > 0) * float(multiplayer) / sum(src_white > 0) * 100
                    cv2.putText(_inrange, f"{result:0.4f}%", (int(int(1920)/5), int(int(1080)/2)),
                                cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
                    cv2.putText(_inrange, f"{sum(_inrange > 0)} | {sum(src_white == 255)}",
                                (int(int(1920)/5), int(int(1080)/1.5)), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
                    # app.log_entry.insert(0, f'{result:0.4f}% |{white_pix}/{all_scope} | ')
                    render('render_final', _inrange, width, height)

                if windows == 'да' or windows == 'Да':
                    origin()
                    bitwise_not_white()
                    bitwise_not_black()
                    bitwise_and_white()
                    bitwise_and_black()
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
                app.root.config(background="green")
                app.quit()
                break

    thread_render = Thread(target=whiles)
    thread_render.start()


def render(name='output', source=None, width='640', height='480'):
    img = cv2.resize(source, (int(width), int(height)), interpolation=cv2.INTER_AREA)
    cv2.imshow(name, img)


def quit_button():
    global play
    play = False


class Application(tkinter.Frame):
    def __init__(self, root, **kw):
        super().__init__(**kw)
        self.root = root
        self.root.title("Анализ видеоданных")
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.config(background="black")
        self.root.geometry('640x480')
        self.master.minsize(640, 480)
        self.master.maxsize(640, 480)
        self.id = 0
        self.iid = 0

        self.submit_button = tkinter.Button(self.root, text="Запустить", font="100", command=self.insert_data)
        self.submit_button.grid(row=0, column=0, sticky=tkinter.W)

        self.exit_button = tkinter.Button(self.root, text="Выход", font="100", command=quit_button)
        self.exit_button.grid(row=0, column=1, sticky=tkinter.W)

        self.export_label = tkinter.Label(self.root, text="Видеофайл для анализа", font="100")
        self.export_label.grid(row=1, column=0, sticky=tkinter.W)
        self.export_entry = tkinter.Entry(self.root, font="100")
        self.export_entry.grid(row=1, column=1, sticky=tkinter.W)
        self.export_entry.insert(0, 'video.mp4')

        self.speed_label = tkinter.Label(self.root, text="Скорость анализа", font="100")
        self.speed_label.grid(row=2, column=0, sticky=tkinter.W)
        self.speed_entry = tkinter.Entry(self.root, font="100")
        self.speed_entry.grid(row=2, column=1, sticky=tkinter.W)
        self.speed_entry.insert(0, '1.0')

        self.sensitivity_label = tkinter.Label(self.root, text="Чувствительность анализа", font="100")
        self.sensitivity_label.grid(row=3, column=0, sticky=tkinter.W)
        self.sensitivity_entry = tkinter.Entry(self.root, font="100")
        self.sensitivity_entry.grid(row=3, column=1, sticky=tkinter.W)
        self.sensitivity_entry.insert(0, '115')

        self.correct_label = tkinter.Label(self.root, text="Коэффициент белого", font="100")
        self.correct_label.grid(row=4, column=0, sticky=tkinter.W)
        self.correct_entry = tkinter.Entry(self.root, font="100")
        self.correct_entry.grid(row=4, column=1, sticky=tkinter.W)
        self.correct_entry.insert(0, '1.0')

        self.render_label = tkinter.Label(self.root, text="Рендерить окна (да/нет)", font="100")
        self.render_label.grid(row=5, column=0, sticky=tkinter.W)
        self.render_entry = tkinter.Entry(self.root, font="100")
        self.render_entry.grid(row=5, column=1, sticky=tkinter.W)
        self.render_entry.insert(0, 'да')

        self.width_label = tkinter.Label(self.root, text="Ширина", font="100")
        self.width_label.grid(row=6, column=0, sticky=tkinter.W)
        self.width_entry = tkinter.Entry(self.root, font="100")
        self.width_entry.grid(row=6, column=1, sticky=tkinter.W)
        self.width_entry.insert(0, '640')

        self.height_label = tkinter.Label(self.root, text="Высота", font="100")
        self.height_label.grid(row=7, column=0, sticky=tkinter.W)
        self.height_entry = tkinter.Entry(self.root, font="100")
        self.height_entry.grid(row=7, column=1, sticky=tkinter.W)
        self.height_entry.insert(0, '480')

    def insert_data(self):
        click_button(self.export_entry.get(), self.sensitivity_entry.get(), self.speed_entry.get(),
                     self.width_entry.get(), self.height_entry.get(), self.render_entry.get(),
                     self.correct_entry.get())


if __name__ == "__main__":
    play = True
    app = Application(tkinter.Tk())
    start = app.root.mainloop
    thread_main = Thread(target=app.root.mainloop())
    thread_main.start()
