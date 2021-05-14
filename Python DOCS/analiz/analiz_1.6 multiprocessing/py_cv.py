import time
import cv2
import httplib2
import numpy
import datetime
import threading
from multiprocessing import Pool
from py_sql import SQLclass


class Analizclass:
    @staticmethod
    def start_analiz(pause,
                     process_cores: int,
                     widget_write: bool,
                     widget: object,
                     render_debug: str,
                     resolution_debug: list,

                     speed_analysis: float,
                     speed_video_stream: float,
                     sensetivity_analysis: int,
                     correct_coefficient: float,

                     protocol_cam_type: str,
                     port_cam: int,
                     login_cam: str,
                     password_cam: str,
                     ip_cam: list,
                     mask_cam: list,

                     sql_write: bool,
                     server_sql: str,
                     database_sql: str,
                     user_sql: str,
                     password_sql: str,
                     table_now_sql: str,
                     rows_now_sql: list,
                     table_data_sql: str,
                     rows_data_sql: list):
        ip_cams = []
        for x in ip_cam:
            # ip_cams.append(f'{protocol_cam_type}://{login_cam}:{password_cam}@192.168.{x}:{port_cam}')
            ip_cams.append(f'{protocol_cam_type}://192.168.{x}:{port_cam}/'
                           f'ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG')
        if len(ip_cam) < 1:
            ip_cams = ['video.mp4', 'video_1.mp4', 'video_2.mp4', 'video_3.mp4']

        # ip_cams = ['video.mp4', 'video_1.mp4', 'video_2.mp4', 'video_3.mp4']

        # for cam in ip_cams:
        #     threading.Thread(target=Analizclass.analiz, args=(cam,)).start()

        def analyse_image(src):
            try:
                # url = f'http://192.168.15.203:80/ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG'
                h = httplib2.Http("/path/to/cache-directory")
                # h.add_credentials(f'admin', f'nehrfvths123')
                # h.add_credentials(f'admin', f'q1234567')
                h.add_credentials(login_cam, password_cam)
                response, content = h.request(src)
                img = cv2.imdecode(numpy.frombuffer(content, numpy.uint8), cv2.IMREAD_COLOR)

                # # MAKE SCREENSHOOT
                # with open('SCREENSHOOT.jpg', 'wb') as f:
                #     f.write(content)
                # cv2.imwrite('./SCREENSHOOT_cv.jpg', img)

                _src_white = cv2.imread('mask_white.jpg', 0)
                _pre_render_final = cv2.bitwise_and(img, img, mask=_src_white)
                _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
                _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                                       numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
                result = f"{numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * correct_coefficient:0.2f}%"
                cv2.putText(_inrange, result, (int(2560 / 3), int(1600 / 2)),
                            cv2.FONT_HERSHEY_SIMPLEX, 4, (255, 255, 255), 4)
                cv2.putText(_inrange, f"{datetime.datetime.now()}", (int(2560 / 10), int(1600 / 10)),
                            cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)

                _img = cv2.resize(_inrange, (resolution_debug[0], resolution_debug[1]), interpolation=cv2.INTER_AREA)
                __img = cv2.resize(img, (resolution_debug[0], resolution_debug[1]), interpolation=cv2.INTER_AREA)
                cv2.imshow(f'source: {src[15:21:]}', __img)
                cv2.imshow(f'final: {src[15:21:]}', _img)
                cv2.waitKey(round(25 / speed_video_stream))
            except Exception as ex:
                print(ex)
                with open('log.txt', 'w') as log:
                    log.write(f'\n{ex}\n')

        def whilees(src):
            pause(True)
            while True:
                for x in src:
                    analyse_image(x)
                val = pause(None)
                if not val:
                    cv2.destroyAllWindows()
                    break
                time.sleep(0.2 / speed_video_stream)

        threading.Thread(target=whilees, args=(ip_cams,)).start()

        # def analyse(ip_cams_: list):
        #     while True:
        #         with Pool(process_cores) as process:
        #             process.map(Analizclass.analiz, ip_cams_)
        #             time.sleep(round(0.033 / speed_analysis * 10, 2))
        #
        # threading.Thread(target=analyse, args=(ip_cams,)).start()

    @staticmethod
    def analiz(source='video.mp4',

               speed=0.1,
               sens=115,
               multiplayer=1.0,

               sql_val=True,
               server='WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER',
               # server='WIN-AIK33SUODO5\\SQLEXPRESS',
               database='ruda_db',
               username='ruda_user',
               password='ruda_user',
               table='ruda_now_table, ruda_data_table',
               rows=None,

               windows='only final',
               width=640,
               height=480,
               widget=''
               ):
        if rows is None:
            rows = ['device_row', 'value_row', 'datetime_row', 'extra_row']
        _src_white = cv2.imread('mask_white.jpg', 0)

        # while True:
        #     url = f'http://192.168.8.222:80/ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG'
        #     h = httplib2.Http("/path/to/cache-directory")
        #     h.add_credentials(f'admin', f'nehrfvths123')
        #     response, content = h.request(url)
        #     img = cv2.imdecode(numpy.frombuffer(content, numpy.uint8), cv2.IMREAD_COLOR)
        #     cv2.imshow('img', img)
        #     cv2.waitKey(1)
        #     time.sleep(0.5)

        cap = cv2.VideoCapture(source)
        i = 0
        while i < 10:
            i += 1
            if i < 10:
                try:
                    if windows == 'all':
                        Analizclass.origin(source=source, cap=cap, width=width, height=height)
                        Analizclass.bitwise_not_white(source=source, cap=cap, width=width, height=height)
                        Analizclass.bitwise_not_black(source=source, cap=cap, width=width, height=height)
                        Analizclass.bitwise_and_white(source=source, cap=cap, width=width, height=height)
                        Analizclass.bitwise_and_black(source=source, cap=cap, width=width, height=height)
                        Analizclass.threshold(source=source, cap=cap, width=width, height=height)
                        Analizclass.cvtcolor(source=source, cap=cap, width=width, height=height)
                        Analizclass.inrange(source=source, cap=cap, sens=sens, width=width, height=height)
                        Analizclass.canny_edges(source=source, cap=cap, sens=sens, width=width, height=height)
                        Analizclass.cropping_image(source=source, cap=cap, width=width, height=height)
                        Analizclass.render_final(source=source, cap=cap, sens=sens, multiplayer=multiplayer,
                                                 width=width,
                                                 height=height)
                    elif windows == 'extended':
                        Analizclass.origin(source=source, cap=cap, width=width, height=height)
                        Analizclass.inrange(source=source, cap=cap, sens=sens, width=width, height=height)
                        Analizclass.canny_edges(source=source, cap=cap, sens=sens, width=width, height=height)
                        Analizclass.cropping_image(source=source, cap=cap, width=width, height=height)
                        Analizclass.render_final(source=source, cap=cap, sens=sens, multiplayer=multiplayer,
                                                 width=width,
                                                 height=height)
                    elif windows == 'final':
                        Analizclass.render_final(source=source, cap=cap, sens=sens, multiplayer=multiplayer,
                                                 width=width,
                                                 height=height)
                    elif windows == 'source':
                        Analizclass.origin(source=source, cap=cap, width=width, height=height)
                    values = Analizclass.result_final(cap=cap, sens=sens, multiplayer=multiplayer)
                    Analizclass.write_result(server=server, database=database, username=username, password=password,
                                             table=table, rows=rows, values=values, source=source, widget=widget,
                                             sql_val=sql_val)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'w') as log:
                        log.write(f'\n{ex}\n')
                cv2.waitKey(int(1 / speed)) & 0xFF
                time.sleep(round(0.033 / speed, 2))
                # cap.release()
                # cv2.destroyAllWindows()
            else:
                cap.release()
                # cv2.destroyWindow()
                cv2.destroyAllWindows()

    @staticmethod
    def origin(cap, source: str, width: int, height: int):
        _, src_img = cap.read()
        Analizclass.render(f'{source}_src_img', src_img, width, height)

    @staticmethod
    def cropping_image(source, cap, width: int, height: int):
        _, src_img = cap.read()

        _cropping_image = src_img[250:1080, 600:1720]
        Analizclass.render(f'{source}_cropping_image', _cropping_image, width, height)

    @staticmethod
    def bitwise_not_white(source, cap, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=_src_white)
        Analizclass.render(f'{source}_bitwise_not_white', _bitwise_not_white, width, height)

    @staticmethod
    def bitwise_not_black(source, cap, width: int, height: int):
        _, src_img = cap.read()
        src_black = cv2.imread('mask_black.jpg', 0)

        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
        Analizclass.render(f'{source}_bitwise_not_black', _bitwise_and_black, width, height)

    @staticmethod
    def bitwise_and_white(source, cap, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        Analizclass.render(f'{source}_bitwise_and_white', _bitwise_and_white, width, height)

    @staticmethod
    def bitwise_and_black(source, cap, width: int, height: int):
        _, src_img = cap.read()
        src_black = cv2.imread('mask_black.jpg', 0)

        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
        Analizclass.render(f'{source}_bitwise_and_black', _bitwise_and_black, width, height)

    @staticmethod
    def threshold(source, cap, width: int, height: int):
        _, src_img = cap.read()

        _, _threshold = cv2.threshold(src_img, 220, 255, cv2.THRESH_BINARY_INV)
        Analizclass.render(f'{source}_threshold', _threshold, width, height)

    @staticmethod
    def cvtcolor(source, cap, width: int, height: int):
        _, src_img = cap.read()

        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
        Analizclass.render(f'{source}_cvtcolor', _cvtcolor, width, height)

    @staticmethod
    def inrange(source, cap, sens, width: int, height: int):
        _, src_img = cap.read()

        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        Analizclass.render(f'{source}_inrange', _inrange, width, height)

    @staticmethod
    def canny_edges(source, cap, sens, width: int, height: int):
        _, src_img = cap.read()

        _canny_edges = cv2.Canny(src_img, sens, sens, apertureSize=3, L2gradient=True)
        Analizclass.render(f'{source}_canny_edges', _canny_edges, width, height)

    @staticmethod
    def render_final(source, cap, sens, multiplayer, width: int, height: int):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        result = f"{numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * multiplayer:0.2f}%"
        cv2.putText(_inrange, result, (int(1920 / 5), int(1080 / 2)),
                    cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
        Analizclass.render(f'{source}_render_final', _inrange, width, height)

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
    def result_final(cap, sens, multiplayer):
        _, src_img = cap.read()
        _src_white = cv2.imread('mask_white.jpg', 0)

        _pre_render_final = cv2.bitwise_and(src_img, src_img, mask=_src_white)
        _cvtcolor = cv2.cvtColor(_pre_render_final, cv2.COLOR_BGR2HSV)
        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                               numpy.array([255, sens, 255], dtype=numpy.uint8))
        result = round(numpy.sum(_inrange > 0) / numpy.sum(_src_white > 0) * 100 * multiplayer, 2)
        return result

    @staticmethod
    def write_result(server: str, database: str, username: str, password: str, table: str, rows: list, source: str,
                     values: float, widget, sql_val: bool):
        sql_datetime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        _values = [source, values, sql_datetime, '']
        # try:
        #     widget.set_data(f'{source}: {values}')
        # except Exception as _ex:
        #     print(_ex)
        #     with open('log.txt', 'w') as _log:
        #         _log.write(f'\n{_ex}\n')
        try:
            if sql_val:
                SQLclass.sql_post_now(server=server, database=database, username=username, password=password,
                                      table=table, rows=rows, values=_values)
                SQLclass.sql_post_data(server=server, database=database, username=username, password=password,
                                       table=table, rows=rows, values=_values)
        except Exception as _ex:
            print(_ex)
            with open('log.txt', 'w') as _log:
                _log.write(f'\n{_ex}\n')
        try:
            with open('db.txt', 'a') as db:
                db.write(f'{values}\n')
        except Exception as _ex:
            print(_ex)
            with open('log.txt', 'w') as _log:
                _log.write(f'\n{_ex}\n')
