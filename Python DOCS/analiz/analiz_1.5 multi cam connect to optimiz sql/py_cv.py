import random
import threading
import time
import cv2
import numpy
import datetime
from py_sql import SQLclass


class Analizclass:
    def __init__(self):
        self.id = random.randint(1, 10000)
        self.play = True
        self.ip_entry = []

    def start_analiz_threads(self, ip_entry: list, sens: int, speed: float, multiplayer: float, windows: str,
                             width: int, height: int, sql_val: bool, server: str, database: str, username: str,
                             password: str, table: str, rows: list, port: int, login_cam: str, password_cam: str,
                             widget):
        def sql_post_data(data: list):
            try:
                sql = SQLclass.pyodbc_connect(server=server, database=database, username=username, password=password)
                SQLclass.execute_data_query(connection=sql, table=table.split(',')[1].strip(), rows=rows, values=data)
            except Exception as ex:
                print(ex)
                with open('log.txt', 'a') as log:
                    log.write(f'\n{ex}\n')

        def sql_post_now(data: list):
            try:
                sql = SQLclass.pyodbc_connect(server=server, database=database, username=username, password=password)
                SQLclass.execute_now_query(connection=sql, table=table.split(',')[0].strip(), rows=rows, values=data)
            except Exception as ex:
                print(ex)
                with open('log.txt', 'a') as log:
                    log.write(f'\n{ex}\n')

        def write_result(src: str, result: float):
            _datetime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            sql_data = [src, result, _datetime, '']
            try:
                widget.set_data_func(f'{src}: {result}')
            except Exception as _ex:
                print(_ex)
                with open('log.txt', 'w') as _log:
                    _log.write(f'\n{_ex}\n')
            try:
                if sql_val:
                    sql_post_now(sql_data)
                    sql_post_data(sql_data)
            except Exception as _ex:
                print(_ex)
                with open('log.txt', 'w') as _log:
                    _log.write(f'\n{_ex}\n')
            try:
                with open('db.txt', 'a') as db:
                    db.write(f'{sql_data}\n')
            except Exception as _ex:
                print(_ex)
                with open('log.txt', 'w') as _log:
                    _log.write(f'\n{_ex}\n')

        def analiz_thread(src: str):
            cap = cv2.VideoCapture(src)
            _src_white = cv2.imread('mask_white.jpg', 0)
            while True:
                if self.play:
                    try:
                        if windows == 'render all':
                            Analizclass.origin(src=src, cap=cap, width=width, height=height)
                            Analizclass.bitwise_not_white(src=src, cap=cap, width=width, height=height)
                            Analizclass.bitwise_not_black(src=src, cap=cap, width=width, height=height)
                            Analizclass.bitwise_and_white(src=src, cap=cap, width=width, height=height)
                            Analizclass.bitwise_and_black(src=src, cap=cap, width=width, height=height)
                            Analizclass.threshold(src=src, cap=cap, width=width, height=height)
                            Analizclass.cvtcolor(src=src, cap=cap, width=width, height=height)
                            Analizclass.inrange(src=src, cap=cap, sens=sens, width=width, height=height)
                            Analizclass.canny_edges(src=src, cap=cap, sens=sens, width=width, height=height)
                            Analizclass.cropping_image(src=src, cap=cap, width=width, height=height)
                            Analizclass.render_final(src=src, cap=cap, sens=sens, multiplayer=multiplayer, width=width,
                                                     height=height)
                        elif windows == 'extended':
                            Analizclass.origin(src=src, cap=cap, width=width, height=height)
                            Analizclass.inrange(src=src, cap=cap, sens=sens, width=width, height=height)
                            Analizclass.canny_edges(src=src, cap=cap, sens=sens, width=width, height=height)
                            Analizclass.cropping_image(src=src, cap=cap, width=width, height=height)
                            Analizclass.render_final(src=src, cap=cap, sens=sens, multiplayer=multiplayer, width=width,
                                                     height=height)
                        elif windows == 'only final':
                            Analizclass.render_final(src=src, cap=cap, sens=sens, multiplayer=multiplayer, width=width,
                                                     height=height)
                        elif windows == 'only source':
                            Analizclass.origin(src=src, cap=cap, width=width, height=height)
                        result = Analizclass.result_final(cap=cap, sens=sens, multiplayer=multiplayer)
                        write_result(src=src, result=result)
                    except Exception as ex:
                        print(ex)
                        with open('log.txt', 'w') as log:
                            log.write(f'\n{ex}\n')
                    cv2.waitKey(int(100 / speed)) & 0xFF
                    time.sleep(round(0.2 / speed, 2))
                else:
                    cap.release()
                    cv2.destroyAllWindows()
                    break

        self.play = False
        time.sleep(round(0.2 / speed * 1.1, 2))
        self.play = True

        ip_cams = []
        for x in ip_entry:
            ip_cams.append(f'rtsp://{login_cam}:{password_cam}@192.168.{x}:{port}')

        if len(ip_entry) <= 2:
            ip_cams = ['video.mp4', 'video_1.mp4', 'video_2.mp4', 'video_3.mp4']
        for cam in ip_cams:
            thread = threading.Thread(target=analiz_thread, args=(cam,))
            thread.start()

    @staticmethod
    def render(name: str, source, width: int, height: int):
        try:
            if source is not None:
                _img = cv2.resize(source, (width, height), interpolation=cv2.INTER_AREA)
                cv2.imshow(name, _img)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    @staticmethod
    def origin(src: str, cap, width: int, height: int):
        _, src_img = cap.read()
        Analizclass.render(f'{src}_src_img', src_img, width, height)

    @staticmethod
    def cropping_image(src, cap, width: int, height: int):
        _, src_img = cap.read()

        _cropping_image = src_img[250:1080, 600:1720]
        Analizclass.render(f'{src}_cropping_image', _cropping_image, width, height)

    @staticmethod
    def bitwise_not_white(src, cap, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=_src_white)
        Analizclass.render(f'{src}_bitwise_not_white', _bitwise_not_white, width, height)

    @staticmethod
    def bitwise_not_black(src, cap, width: int, height: int):
        _, src_img = cap.read()
        src_black = cv2.imread('mask_black.jpg', 0)

        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
        Analizclass.render(f'{src}_bitwise_not_black', _bitwise_and_black, width, height)

    @staticmethod
    def bitwise_and_white(src, cap, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        Analizclass.render(f'{src}_bitwise_and_white', _bitwise_and_white, width, height)

    @staticmethod
    def bitwise_and_black(src, cap, width: int, height: int):
        _, src_img = cap.read()
        src_black = cv2.imread('mask_black.jpg', 0)

        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
        Analizclass.render(f'{src}_bitwise_and_black', _bitwise_and_black, width, height)

    @staticmethod
    def threshold(src, cap, width: int, height: int):
        _, src_img = cap.read()

        _, _threshold = cv2.threshold(src_img, 220, 255, cv2.THRESH_BINARY_INV)
        Analizclass.render(f'{src}_threshold', _threshold, width, height)

    @staticmethod
    def cvtcolor(src, cap, width: int, height: int):
        _, src_img = cap.read()

        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
        Analizclass.render(f'{src}_cvtcolor', _cvtcolor, width, height)

    @staticmethod
    def inrange(src, cap, sens, width: int, height: int):
        _, src_img = cap.read()

        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        Analizclass.render(f'{src}_inrange', _inrange, width, height)

    @staticmethod
    def canny_edges(src, cap, sens, width: int, height: int):
        _, src_img = cap.read()

        _canny_edges = cv2.Canny(src_img, sens, sens, apertureSize=3, L2gradient=True)
        Analizclass.render(f'{src}_canny_edges', _canny_edges, width, height)

    @staticmethod
    def render_final(src, cap, sens, multiplayer, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        result = f"{numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * multiplayer:0.4f}%"
        cv2.putText(_inrange, result, (int(1920 / 5), int(1080 / 2)),
                    cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
        Analizclass.render(f'{src}_render_final', _inrange, width, height)

    @staticmethod
    def result_final(cap, sens, multiplayer):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        result = round(numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * multiplayer, 4)
        return result
