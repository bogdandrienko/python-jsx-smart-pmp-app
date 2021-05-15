import time
import cv2
import httplib2
import numpy
import datetime
import threading
from multiprocessing import Pool
from py_sql import SQLclass
from py_utilites import LoggingClass


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

        source_type = ['image-http', 'video-rtsp', 'video-file']
        source_type = source_type[0]
        compute_type = ['sync', 'async', 'multithread', 'multiprocess']
        compute_type = compute_type[0]
        sources = Analizclass.get_sources(source_type=source_type, sources=ip_cam, masks=mask_cam,
                                          protocol=protocol_cam_type, login=login_cam, password=password_cam,
                                          port=port_cam)
        ##########################
        if compute_type == 'sync':
            Analizclass.sync_method(render_debug=render_debug,
                                    resolution_debug=resolution_debug,
                                    sensetivity_analysis=sensetivity_analysis,
                                    correct_coefficient=correct_coefficient,
                                    login_cam=login_cam,
                                    password_cam=password_cam,
                                    source_type=source_type,
                                    widget=widget,
                                    pause=pause,
                                    process_cores=process_cores,
                                    widget_write=widget_write,
                                    speed_analysis=speed_analysis,
                                    speed_video_stream=speed_video_stream,
                                    protocol_cam_type=protocol_cam_type,
                                    port_cam=port_cam,
                                    ip_cam=ip_cam,
                                    mask_cam=mask_cam,
                                    sql_write=sql_write,
                                    server_sql=server_sql,
                                    database_sql=database_sql,
                                    user_sql=user_sql,
                                    password_sql=password_sql,
                                    table_now_sql=table_now_sql,
                                    rows_now_sql=rows_now_sql,
                                    table_data_sql=table_data_sql,
                                    rows_data_sql=rows_data_sql,
                                    sources=sources)
        #############################
        elif compute_type == 'async':
            Analizclass.async_method()
        ###################################
        elif compute_type == 'multithread':
            Analizclass.multithread_method()
        ####################################
        elif compute_type == 'multiprocess':
            Analizclass.multiprocess_method()

    @staticmethod
    def sync_method(pause,
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
                    rows_data_sql: list,
                    source_type: str,
                    sources: list):
        def sync_analyse_image(source):
            # try:
                Analizclass.analiz(render_debug=render_debug,
                                   resolution_debug=resolution_debug,
                                   sensetivity_analysis=sensetivity_analysis,
                                   correct_coefficient=correct_coefficient,
                                   login_cam=login_cam,
                                   password_cam=password_cam,
                                   source=source,
                                   source_type=source_type,
                                   widget=widget,
                                   pause=pause,
                                   process_cores=process_cores,
                                   widget_write=widget_write,
                                   speed_analysis=speed_analysis,
                                   speed_video_stream=speed_video_stream,
                                   protocol_cam_type=protocol_cam_type,
                                   port_cam=port_cam,
                                   ip_cam=ip_cam,
                                   mask_cam=mask_cam,
                                   sql_write=sql_write,
                                   server_sql=server_sql,
                                   database_sql=database_sql,
                                   user_sql=user_sql,
                                   password_sql=password_sql,
                                   table_now_sql=table_now_sql,
                                   rows_now_sql=rows_now_sql,
                                   table_data_sql=table_data_sql,
                                   rows_data_sql=rows_data_sql,
                                   sources=sources)
            # except Exception as ex:
            #     LoggingClass.logging(ex)
            #     print(f'sync_analyse_image func error')
            #     print(ex)

        def loop():
            pause(True)
            while True:
                val = pause(None)
                if not val:
                    cv2.destroyAllWindows()
                    break
                for x in sources:
                    sync_analyse_image(x)
                cv2.waitKey(round(100 / speed_analysis))
                time.sleep(0.2 / speed_analysis)

        threading.Thread(target=loop, args=()).start()

    @staticmethod
    def async_method():
        pass

    @staticmethod
    def multithread_method():
        pass
        # for cam in ip_cams:
        #     threading.Thread(target=Analizclass.analiz_image, args=(cam,)).start()

    @staticmethod
    def multiprocess_method():
        pass
        # def analyse(ip_cams_: list):
        #     while True:
        #         with Pool(process_cores) as process:
        #             process.map(Analizclass.analiz_image, ip_cams_)
        #             time.sleep(round(0.033 / speed_analysis * 10, 2))
        #
        # threading.Thread(target=analyse, args=(ip_cams,)).start()

    @staticmethod
    def analiz(pause,
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
               rows_data_sql: list,

               source: list,
               source_type: str,
               sources: list):
        # try:
            image = Analizclass.get_source(source_type, source, login_cam, password_cam)
            mask = source[1]
            if render_debug == 'none':
                pass
            elif render_debug == 'all':
                pass
            elif render_debug == 'extended':
                pass
            elif render_debug == 'final':
                if len(source[0]) > 10:
                    source = source[0].split("192.168.")[1].strip().split(":")[0].strip()
                else:
                    source = source[0]
                Analizclass.render(f'render final: {source}',
                                   Analizclass.render_final(image=image, mask=mask,
                                                            sensetivity_analysis=sensetivity_analysis,
                                                            correct_coefficient=correct_coefficient),
                                   resolution_debug)
            elif render_debug == 'source':
                pass

            if len(source[0]) > 10:
                source = source[0].split("192.168.")[1].strip().split(":")[0].strip()
            else:
                source = source[0]
            values = Analizclass.result_final(image, mask, sensetivity_analysis, correct_coefficient)
            Analizclass.write_result(server=server_sql, database=database_sql, username=user_sql,
                                     password=password_sql, table=table_data_sql, rows=rows_data_sql, values=values,
                                     source=source, widget=widget,
                                     widget_write=widget_write, sql_val=sql_write)
        # except Exception as ex:
        #     LoggingClass.logging(ex)
        #     print(f'analiz func error')
        #     print(ex)

    @staticmethod
    def get_sources(source_type: str, sources: list, masks: list, protocol: str, login: str, password: str, port: int):
        _sources = []
        if source_type == 'image-http':
            for x in sources:
                _sources.append([f'{protocol}://192.168.{x}:{port}/'
                                 f'ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG',
                                 cv2.imread(masks[sources.index(x)], 0)])
            return _sources
        elif source_type == 'video-rtsp':
            for x in sources:
                _sources.append([f'{protocol}://{login}:{password}@192.168.{x}:{port}',
                                 cv2.imread(masks[sources.index(x)], 0)])
            return _sources
        elif source_type == 'video-file':
            for x in sources:
                _sources.append([f'{x}', cv2.imread(masks[sources.index(x)], 0)])
            return _sources

    @staticmethod
    def get_source(source_type: str, sources: list, login: str, password: str):
        try:
            if source_type == 'image-http':
                h = httplib2.Http("/path/to/cache-directory")
                h.add_credentials(login, password)
                response, content = h.request(sources[0])
                image = cv2.imdecode(numpy.frombuffer(content, numpy.uint8), cv2.IMREAD_COLOR)
                return image
            elif source_type == 'video-rtsp' or 'video-file':
                cam_stream = cv2.VideoCapture(sources[0])
                _, image = cam_stream.read()
                cam_stream.release()
                return image
            else:
                LoggingClass.logging(f'source error')
                print(f'source error')
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'get_source func error')
            print(ex)

    @staticmethod
    def origin(image):
        return image

    @staticmethod
    def cropping_image(image):
        cropping_image = image[250:1080, 600:1720]
        return cropping_image

    @staticmethod
    def bitwise_not_white(image, mask):
        bitwise_not = cv2.bitwise_not(image, image, mask=mask)
        return bitwise_not

    @staticmethod
    def bitwise_and(image, mask):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        return bitwise_and

    @staticmethod
    def threshold(image):
        _, threshold = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)
        return threshold

    @staticmethod
    def cvtcolor(image):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        return cvtcolor

    @staticmethod
    def inrange(image, sensetivity_analysis):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        return inrange

    @staticmethod
    def canny_edges(image, sensetivity_analysis):
        canny = cv2.Canny(image, sensetivity_analysis, sensetivity_analysis, apertureSize=3, L2gradient=True)
        return canny

    @staticmethod
    def render_final(image, mask, sensetivity_analysis, correct_coefficient):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        cv2.putText(inrange, f"{numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient:0.2f}%",
                    (int(1920 / 5), int(1080 / 2)), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
        return inrange

    @staticmethod
    def render(name: str, source, resolution_debug: list):
        try:
            if source is not None:
                img = cv2.resize(source, (resolution_debug[0], resolution_debug[1]), interpolation=cv2.INTER_AREA)
                cv2.imshow(name, img)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(ex)

    @staticmethod
    def result_final(image, mask, sensetivity_analysis, correct_coefficient):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        return round(numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient, 2)

    @staticmethod
    def write_result(server: str, database: str, username: str, password: str, table: str, rows: list, source: str,
                     values: float, widget, widget_write: bool, sql_val: bool):
        sql_datetime = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        _values = [source, values, sql_datetime, '']
        # Write result to widget
        if widget_write:
            try:
                widget.set_data(f'{source}: {values}')
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)
        # Write result to sql database
        if sql_val:
            try:
                SQLclass.sql_post_now(server=server, database=database, username=username, password=password,
                                      table=table, rows=rows, values=_values)
                # SQLclass.sql_post_data(server=server, database=database, username=username, password=password,
                #                        table=table, rows=rows, values=_values)
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)
        # Write result to text file
        try:
            with open('db.txt', 'a') as db:
                db.write(f'{values}\n')
        except Exception as ex:
            LoggingClass.logging(ex)
            print(ex)
