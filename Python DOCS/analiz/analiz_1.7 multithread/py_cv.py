import asyncio
import os
import time
import cv2
import httplib2
import numpy
import datetime
import threading
import multiprocessing
from py_sql import SQLClass
from py_utilites import LoggingClass, CopyDictionary


class AnalyzeClass:
    @staticmethod
    def start_analyze(data: dict):
        sources = AnalyzeClass.get_full_sources(source_type=data['source_type'], sources=data['ip_cam'],
                                                masks=data['mask_cam'], protocol=data['protocol_cam_type'],
                                                login=data['login_cam'], password=data['password_cam'],
                                                port=data['port_cam'], sensitivity=data['sensitivity_analysis'],
                                                correct=data['correct_coefficient'])
        data = CopyDictionary.get_all_sources(data, {'sources': sources})
        if data['compute_debug'] == 'sync':
            AnalyzeClass.sync_method(data)
        elif data['compute_debug'] == 'async':
            AnalyzeClass.async_method(data)
        elif data['compute_debug'] == 'multithread':
            AnalyzeClass.multithread_method(data)
        elif data['compute_debug'] == 'multiprocess':
            AnalyzeClass.multiprocess_method(data)
        elif data['compute_debug'] == 'complex':
            AnalyzeClass.complex_method(data)

    @staticmethod
    def sync_method(data: dict):
        while True:
            if not data['pause']():
                cv2.destroyAllWindows()
                break
            else:
                for source in data['sources']:
                    AnalyzeClass.analyze(source, data)
            time.sleep(1 / data['speed_analysis'])

    @staticmethod
    def async_method(data: dict):
        def thread_loop(source):
            while True:
                if not data['pause']():
                    cv2.destroyAllWindows()
                    break
                else:
                    asyncio.run(AnalyzeClass.async_analiz(source, data))
                time.sleep(1 / data['speed_analysis'])

        for src in data['sources']:
            threading.Thread(target=thread_loop, args=(src,)).start()

    @staticmethod
    async def async_analiz(source, data: dict):
        image = await AnalyzeClass.async_get_source(data['source_type'], source[0], data['login_cam'],
                                                    data['password_cam'])
        mask = source[1]
        name = source[0].split("192.168.")[1].strip().split(":")[0].strip()
        AnalyzeClass.render_final(image=image, mask=mask,
                                  sensitivity_analysis=source[2],
                                  correct_coefficient=source[3],
                                  name=name,
                                  resolution_debug=data['resolution_debug'])
        cv2.waitKey(round(1000 / data['speed_video_stream']))
        values = AnalyzeClass.result_final(image=image, mask=mask,
                                           sensitivity_analysis=source[2],
                                           correct_coefficient=source[3])
        AnalyzeClass.write_result(ip_sql=data['ip_sql'],
                                  server_sql=data['server_sql'],
                                  port_sql=data['port_sql'],
                                  database_sql=data['database_sql'],
                                  user_sql=data['user_sql'],
                                  password_sql=data['password_sql'],
                                  sql_now_check=data['sql_now_check'],
                                  table_now_sql=data['table_now_sql'],
                                  rows_now_sql=data['rows_now_sql'],
                                  sql_data_check=data['sql_data_check'],
                                  table_data_sql=data['table_data_sql'],
                                  rows_data_sql=data['rows_data_sql'],
                                  values=values,
                                  source=name,
                                  widget=data['widget'],
                                  widget_write=data['widget_write'],
                                  sql_val=data['sql_write']
                                  )

    @staticmethod
    async def async_get_source(source_type: str, sources: str, login: str, password: str):
        if source_type == 'image-http':
            h = httplib2.Http(os.path.abspath('__file__'))
            h.add_credentials(login, password)
            response, content = h.request(sources)
            image = cv2.imdecode(numpy.frombuffer(content, numpy.uint8), cv2.IMREAD_COLOR)
            return image
        elif source_type == 'video-rtsp' or 'video-file':
            cam_stream = cv2.VideoCapture(sources)
            _, image = cam_stream.read()
            cam_stream.release()
            return image

    @staticmethod
    def multithread_method(data: dict):
        def thread_loop(source):
            while True:
                if not data['pause']():
                    cv2.destroyAllWindows()
                    break
                else:
                    AnalyzeClass.analyze(source, data)
                time.sleep(1 / data['speed_analysis'])

        for src in data['sources']:
            threading.Thread(target=thread_loop, args=(src,)).start()

    @staticmethod
    def multiprocess_method(data: dict):
        def process_loop():
            while True:
                if not data['pause']():
                    cv2.destroyAllWindows()
                    break
                else:
                    with multiprocessing.Pool(data['process_cores']) as process:
                        process.map(AnalyzeClass.multi, _data)
                time.sleep(1 / data['speed_analysis'])

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
        AnalyzeClass.analyze(source, kwargs)

    @staticmethod
    def complex_method(data: dict):
        def thread_loop(source):
            while True:
                if not data['pause']():
                    cv2.destroyAllWindows()
                    break
                else:
                    asyncio.run(AnalyzeClass.async_complex_analiz(source, data))
                time.sleep(1 / data['speed_analysis'])

        for src in data['sources']:
            threading.Thread(target=thread_loop, args=(src,)).start()

    @staticmethod
    async def async_complex_analiz(source, data: dict):
        try:
            image = await AnalyzeClass.async_get_source(data['source_type'], source[0], data['login_cam'],
                                                        data['password_cam'])
            mask = source[1]
            name = source[0].split("192.168.")[1].strip().split(":")[0].strip()
            if data['render_debug'] == 'all':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cropping_image(image=image, name=name,
                                                   resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_bitwise_and(image=image, mask=mask, name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_bitwise_not_white(image=image, mask=mask, name=name,
                                                      resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cvtcolor(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_threshold(image=image, name=name,
                                              resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_inrange(image=image, sensitivity_analysis=source[2],
                                            name=name,
                                            resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_canny_edges(image=image,
                                                sensitivity_analysis=source[2],
                                                name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'extended':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cvtcolor(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_threshold(image=image, name=name,
                                              resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_inrange(image=image, sensitivity_analysis=source[2],
                                            name=name,
                                            resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_canny_edges(image=image,
                                                sensitivity_analysis=source[2],
                                                name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'final':
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'source':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
            cv2.waitKey(round(1000 / data['speed_video_stream']))
            values = AnalyzeClass.result_final(image=image, mask=mask,
                                               sensitivity_analysis=source[2],
                                               correct_coefficient=source[3])
            AnalyzeClass.write_result(ip_sql=data['ip_sql'],
                                      server_sql=data['server_sql'],
                                      port_sql=data['port_sql'],
                                      database_sql=data['database_sql'],
                                      user_sql=data['user_sql'],
                                      password_sql=data['password_sql'],
                                      sql_now_check=data['sql_now_check'],
                                      table_now_sql=data['table_now_sql'],
                                      rows_now_sql=data['rows_now_sql'],
                                      sql_data_check=data['sql_data_check'],
                                      table_data_sql=data['table_data_sql'],
                                      rows_data_sql=data['rows_data_sql'],
                                      values=values,
                                      source=name,
                                      widget=data['widget'],
                                      widget_write=data['widget_write'],
                                      sql_val=data['sql_write']
                                      )
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'analyze func error')
            print(ex)

    @staticmethod
    def analyze(source, data: dict):
        try:
            image = AnalyzeClass.get_source(data['source_type'], source[0], data['login_cam'],
                                            data['password_cam'])
            mask = source[1]
            name = source[0].split("192.168.")[1].strip().split(":")[0].strip()
            if data['render_debug'] == 'all':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cropping_image(image=image, name=name,
                                                   resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_bitwise_and(image=image, mask=mask, name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_bitwise_not_white(image=image, mask=mask, name=name,
                                                      resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cvtcolor(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_threshold(image=image, name=name,
                                              resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_inrange(image=image, sensitivity_analysis=source[2],
                                            name=name,
                                            resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_canny_edges(image=image,
                                                sensitivity_analysis=source[2],
                                                name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'extended':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_cvtcolor(image=image, name=name,
                                             resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_threshold(image=image, name=name,
                                              resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_inrange(image=image, sensitivity_analysis=source[2],
                                            name=name,
                                            resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_canny_edges(image=image,
                                                sensitivity_analysis=source[2],
                                                name=name,
                                                resolution_debug=data['resolution_debug'])
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'final':
                AnalyzeClass.render_final(image=image, mask=mask,
                                          sensitivity_analysis=source[2],
                                          correct_coefficient=source[3],
                                          name=name,
                                          resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'source':
                AnalyzeClass.render_origin(image=image, name=name,
                                           resolution_debug=data['resolution_debug'])
            cv2.waitKey(round(1000 / data['speed_video_stream']))
            values = AnalyzeClass.result_final(image=image, mask=mask,
                                               sensitivity_analysis=source[2],
                                               correct_coefficient=source[3])
            AnalyzeClass.write_result(ip_sql=data['ip_sql'],
                                      server_sql=data['server_sql'],
                                      port_sql=data['port_sql'],
                                      database_sql=data['database_sql'],
                                      user_sql=data['user_sql'],
                                      password_sql=data['password_sql'],
                                      sql_now_check=data['sql_now_check'],
                                      table_now_sql=data['table_now_sql'],
                                      rows_now_sql=data['rows_now_sql'],
                                      sql_data_check=data['sql_data_check'],
                                      table_data_sql=data['table_data_sql'],
                                      rows_data_sql=data['rows_data_sql'],
                                      values=values,
                                      source=name,
                                      widget=data['widget'],
                                      widget_write=data['widget_write'],
                                      sql_val=data['sql_write']
                                      )
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'analyze func error')
            print(ex)

    @staticmethod
    def get_full_sources(source_type: str, sources: list, masks: list, protocol: str, login: str, password: str,
                         port: int, sensitivity: list, correct: list):
        try:
            _sources = []
            for x in sources:
                index = sources.index(x)
                if source_type == 'image-http':
                    _sources.append([f'{protocol}://192.168.{x}:{port}/ISAPI/Streaming/channels/101/'
                                     f'picture?snapShotImageType=JPEG', cv2.imread(masks[index], 0),
                                     sensitivity[index], correct[index]])
                elif source_type == 'video-rtsp':
                    _sources.append([f'{protocol}://{login}:{password}@192.168.{x}:{port}', cv2.imread(masks[index], 0),
                                     sensitivity[index], correct[index]])
                elif source_type == 'video-file':
                    _sources.append([f'{x}', cv2.imread(masks[index], 0), sensitivity[index], correct[index]])
            return _sources
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'get_full_sources error : {ex}')

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
        AnalyzeClass.render(name=f"origin : {name}", source=image, resolution_debug=resolution_debug)

    @staticmethod
    def render_cropping_image(image, name, resolution_debug):
        cropping_image = image[250:1080, 600:1720]
        AnalyzeClass.render(name=f"cropping_image : {name}", source=cropping_image, resolution_debug=resolution_debug)

    @staticmethod
    def render_bitwise_not_white(image, mask, name, resolution_debug):
        bitwise_not = cv2.bitwise_not(image, image, mask=mask)
        AnalyzeClass.render(name=f"_bitwise_not_white : {name}", source=bitwise_not, resolution_debug=resolution_debug)

    @staticmethod
    def render_bitwise_and(image, mask, name, resolution_debug):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        AnalyzeClass.render(name=f"bitwise_and : {name}", source=bitwise_and, resolution_debug=resolution_debug)

    @staticmethod
    def render_threshold(image, name, resolution_debug):
        _, threshold = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)
        AnalyzeClass.render(name=f"threshold : {name}", source=threshold, resolution_debug=resolution_debug)

    @staticmethod
    def render_cvtcolor(image, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        AnalyzeClass.render(name=f"cvtcolor : {name}", source=cvtcolor, resolution_debug=resolution_debug)

    @staticmethod
    def render_inrange(image, sensitivity_analysis, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensitivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensitivity_analysis, 255], dtype=numpy.uint8))
        AnalyzeClass.render(name=f"inrange : {name}", source=inrange, resolution_debug=resolution_debug)

    @staticmethod
    def render_canny_edges(image, sensitivity_analysis, name, resolution_debug):
        canny = cv2.Canny(image, sensitivity_analysis, sensitivity_analysis, apertureSize=3, L2gradient=True)
        AnalyzeClass.render(name=f"canny_edges : {name}", source=canny, resolution_debug=resolution_debug)

    @staticmethod
    def render_final(image, mask, sensitivity_analysis, correct_coefficient, name, resolution_debug):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensitivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensitivity_analysis, 255], dtype=numpy.uint8))
        cv2.putText(inrange, f"{numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient:0.2f}%",
                    (int(1920 / 5), int(1080 / 2)), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
        AnalyzeClass.render(name=f"final : {name}", source=inrange, resolution_debug=resolution_debug)

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
    def result_final(image, mask, sensitivity_analysis, correct_coefficient):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensitivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensitivity_analysis, 255], dtype=numpy.uint8))
        try:
            return round(numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient, 2)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'result_final func error : {ex}')
            return 0.0

    @staticmethod
    def write_result(ip_sql: str, server_sql: str, port_sql: str, database_sql: str, user_sql: str, password_sql: str,
                     sql_now_check: bool, table_now_sql: str, rows_now_sql: list, sql_data_check: bool,
                     table_data_sql: str, rows_data_sql: list, source: str, values: float, widget, widget_write: bool,
                     sql_val: bool):
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
                if sql_now_check:
                    SQLClass.sql_post_now(ip=ip_sql, server=server_sql, port=port_sql, database=database_sql,
                                          username=user_sql, password=password_sql, table=table_now_sql,
                                          rows=rows_now_sql, values=_values)
                if sql_data_check:
                    SQLClass.sql_post_data(ip=ip_sql, server=server_sql, port=port_sql, database=database_sql,
                                           username=user_sql, password=password_sql, table=table_data_sql,
                                           rows=rows_data_sql, values=_values)
            except Exception as ex:
                LoggingClass.logging(ex)
                print(ex)

    @staticmethod
    def make_snapshot(data: dict):
        h = httplib2.Http("/path/to/cache-directory")
        h.add_credentials(name=data['login_cam'], password=data['password_cam'])
        sources = f"{data['protocol_cam_type']}://192.168.{data['ip_cam_snapshot']}:{data['port_cam']}/" \
                  f"ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG"
        response, content = h.request(sources)
        with open(data['name_snapshot'], 'wb') as file:
            file.write(content)
