import time
import cv2
import httplib2
import numpy
import datetime
import threading
import multiprocessing
from py_sql import SQLclass
from py_utilites import LoggingClass, CopyDictionary


class Analizclass:
    @staticmethod
    def start_analiz(data: dict):
        sources = Analizclass.get_sources(source_type=data['source_type'], sources=data['ip_cam'],
                                          masks=data['mask_cam'], protocol=data['protocol_cam_type'],
                                          login=data['login_cam'], password=data['password_cam'], port=data['port_cam'])
        data = CopyDictionary.add_value_and_return(data, {'sources': sources})
        if data['compute_debug'] == 'sync':
            Analizclass.sync_method(data)
        elif data['compute_debug'] == 'async':
            Analizclass.async_method(data)
        elif data['compute_debug'] == 'multithread':
            Analizclass.multithread_method(data)
        elif data['compute_debug'] == 'multiprocess':
            Analizclass.multiprocess_method(data)

    @staticmethod
    def sync_method(data: dict):
        while True:
            val = data['pause']()
            if not val:
                cv2.destroyAllWindows()
                break
            else:
                for source in data['sources']:
                    Analizclass.analiz(source, data)
            time.sleep(0.2 / data['speed_analysis'])

    @staticmethod
    def async_method(data: dict):
        pass

    @staticmethod
    def multithread_method(data: dict):
        def thread_loop(source):
            while True:
                val = data['pause']()
                if not val:
                    cv2.destroyAllWindows()
                    break
                else:
                    Analizclass.analiz(source, data)
                time.sleep(0.2 / data['speed_analysis'])
        for src in data['sources']:
            threading.Thread(target=thread_loop, args=(src,)).start()

    @staticmethod
    def multiprocess_method(data: dict):
        def process_loop():
            while True:
                val = data['pause']()
                if not val:
                    cv2.destroyAllWindows()
                    break
                else:
                    with multiprocessing.Pool(data['process_cores']) as process:
                        process.map(Analizclass.multi, _data)
                time.sleep(0.2 / data['speed_analysis'])
        _data = []
        for loop in data['sources']:
            __data = data.copy()
            del __data['widget']
            __data['source'] = loop
            _data.append(__data)
        threading.Thread(target=process_loop).start()

    @staticmethod
    def multi(kwargs):
        source = kwargs['source']
        kwargs['widget'] = None
        Analizclass.analiz(source, kwargs)

    @staticmethod
    def analiz(source, data: dict):
        try:
            image = Analizclass.get_source(data['source_type'],  source[0], data['login_cam'],
                                           data['password_cam'])
            mask = source[1]
            name = source[0].split("192.168.")[1].strip().split(":")[0].strip()
            if data['render_debug'] == 'all':
                Analizclass.render_origin(image=image, name=name,
                                          resolution_debug=data['resolution_debug'])
                Analizclass.render_cropping_image(image=image, name=name,
                                                  resolution_debug=data['resolution_debug'])
                Analizclass.render_bitwise_and(image=image, mask=mask, name=name,
                                               resolution_debug=data['resolution_debug'])
                Analizclass.render_bitwise_not_white(image=image, mask=mask, name=name,
                                                     resolution_debug=data['resolution_debug'])
                Analizclass.render_cvtcolor(image=image, name=name,
                                            resolution_debug=data['resolution_debug'])
                Analizclass.render_threshold(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                Analizclass.render_inrange(image=image, sensetivity_analysis=data['sensetivity_analysis'],
                                           name=name,
                                           resolution_debug=data['resolution_debug'])
                Analizclass.render_canny_edges(image=image,
                                               sensetivity_analysis=data['sensetivity_analysis'],
                                               name=name,
                                               resolution_debug=data['resolution_debug'])
                Analizclass.render_final(image=image, mask=mask,
                                         sensetivity_analysis=data['sensetivity_analysis'],
                                         correct_coefficient=data['correct_coefficient'],
                                         name=name,
                                         resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'extended':
                Analizclass.render_origin(image=image, name=name,
                                          resolution_debug=data['resolution_debug'])
                Analizclass.render_cvtcolor(image=image, name=name,
                                            resolution_debug=data['resolution_debug'])
                Analizclass.render_threshold(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                Analizclass.render_inrange(image=image, sensetivity_analysis=data['sensetivity_analysis'],
                                           name=name,
                                           resolution_debug=data['resolution_debug'])
                Analizclass.render_canny_edges(image=image,
                                               sensetivity_analysis=data['sensetivity_analysis'],
                                               name=name,
                                               resolution_debug=data['resolution_debug'])
                Analizclass.render_final(image=image, mask=mask,
                                         sensetivity_analysis=data['sensetivity_analysis'],
                                         correct_coefficient=data['correct_coefficient'],
                                         name=name,
                                         resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'final':
                Analizclass.render_final(image=image, mask=mask,
                                         sensetivity_analysis=data['sensetivity_analysis'],
                                         correct_coefficient=data['correct_coefficient'],
                                         name=name,
                                         resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'source':
                Analizclass.render_origin(image=image, name=data['source'][0],
                                          resolution_debug=data['resolution_debug'])
            cv2.waitKey(round(100 / data['speed_video_stream']))
            values = Analizclass.result_final(image=image, mask=mask,
                                              sensetivity_analysis=data['sensetivity_analysis'],
                                              correct_coefficient=data['correct_coefficient'])
            Analizclass.write_result(server_sql=data['server_sql'],
                                     database_sql=data['database_sql'],
                                     user_sql=data['user_sql'],
                                     password_sql=data['password_sql'],
                                     table_now_sql=data['table_now_sql'],
                                     rows_now_sql=data['rows_now_sql'],
                                     table_data_sql=data['table_data_sql'],
                                     rows_data_sql=data['rows_data_sql'],
                                     values=values,
                                     source=name,
                                     widget=data['widget'],
                                     widget_write=data['widget_write'],
                                     sql_val=data['sql_write'])
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'analiz func error')
            print(ex)

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
    def get_source(source_type: str, sources: str, login: str, password: str):
        try:
            if source_type == 'image-http':
                h = httplib2.Http("/path/to/cache-directory")
                h.add_credentials(login, password)
                response, content = h.request(sources)
                image = cv2.imdecode(numpy.frombuffer(content, numpy.uint8), cv2.IMREAD_COLOR)
                return image
            elif source_type == 'video-rtsp' or 'video-file':
                cam_stream = cv2.VideoCapture(sources)
                _, image = cam_stream.read()
                cam_stream.release()
                return image
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'get_source func error')
            print(ex)

    @staticmethod
    def render_origin(image, name, resolution_debug):
        Analizclass.render(name=name, source=image, resolution_debug=resolution_debug)

    @staticmethod
    def render_cropping_image(image, name, resolution_debug):
        cropping_image = image[250:1080, 600:1720]
        Analizclass.render(name=name, source=cropping_image, resolution_debug=resolution_debug)

    @staticmethod
    def render_bitwise_not_white(image, mask, name, resolution_debug):
        bitwise_not = cv2.bitwise_not(image, image, mask=mask)
        Analizclass.render(name=name, source=bitwise_not, resolution_debug=resolution_debug)

    @staticmethod
    def render_bitwise_and(image, mask, name, resolution_debug):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        Analizclass.render(name=name, source=bitwise_and, resolution_debug=resolution_debug)

    @staticmethod
    def render_threshold(image, name, resolution_debug):
        _, threshold = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)
        Analizclass.render(name=name, source=threshold, resolution_debug=resolution_debug)

    @staticmethod
    def render_cvtcolor(image, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        Analizclass.render(name=name, source=cvtcolor, resolution_debug=resolution_debug)

    @staticmethod
    def render_inrange(image, sensetivity_analysis, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        Analizclass.render(name=name, source=inrange, resolution_debug=resolution_debug)

    @staticmethod
    def render_canny_edges(image, sensetivity_analysis, name, resolution_debug):
        canny = cv2.Canny(image, sensetivity_analysis, sensetivity_analysis, apertureSize=3, L2gradient=True)
        Analizclass.render(name=name, source=canny, resolution_debug=resolution_debug)

    @staticmethod
    def render_final(image, mask, sensetivity_analysis, correct_coefficient, name, resolution_debug):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        cv2.putText(inrange, f"{numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient:0.2f}%",
                    (int(1920 / 5), int(1080 / 2)), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
        Analizclass.render(name=name, source=inrange, resolution_debug=resolution_debug)

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
    def write_result(server_sql: str, database_sql: str, user_sql: str, password_sql: str, table_now_sql: str,
                     rows_now_sql: list, table_data_sql: str, rows_data_sql: list, source: str, values: float, widget,
                     widget_write: bool, sql_val: bool):
        sql_datetime = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        _values = [source, values, sql_datetime]
        if widget_write:
            try:
                widget(f'{_values}')
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)
            try:
                with open('db.txt', 'a') as db:
                    db.write(f'{_values}\n')
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)
        if sql_val:
            try:
                SQLclass.sql_post_now(server=server_sql, database=database_sql, username=user_sql,
                                      password=password_sql, table=table_now_sql, rows=rows_now_sql, values=_values)
                SQLclass.sql_post_data(server=server_sql, database=database_sql, username=user_sql,
                                       password=password_sql, table=table_data_sql, rows=rows_data_sql, values=_values)
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)
