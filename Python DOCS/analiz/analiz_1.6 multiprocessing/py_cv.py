import time
import cv2
import httplib2
import numpy
import datetime
import threading
from multiprocessing import Pool
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
        # elif data['compute_debug'] == 'async':
        #     Analizclass.async_method(data)
        # elif data['compute_debug'] == 'multithread':
        #     Analizclass.multithread_method(data)
        # elif data['compute_debug'] == 'multiprocess':
        #     Analizclass.multiprocess_method(data)

    @staticmethod
    def sync_method(data: dict):
        while True:
            try:
                val = data['pause']()
                if not val:
                    cv2.destroyAllWindows()
                    break
                for x in data['sources']:
                    data = CopyDictionary.add_value_and_return(data, {'source': x})
                    Analizclass.analiz(data)
                cv2.waitKey(round(100 / data['speed_analysis']))
                time.sleep(0.2 / data['speed_analysis'])
            except Exception as ex:
                LoggingClass.logging(ex)
                print(f'sync_method func error')
                print(ex)

    # @staticmethod
    # def async_method(data: dict):
    #     pass
    #
    # @staticmethod
    # def multithread_method(data: dict):
    #     def analyse_image(source):
    #         try:
    #             Analizclass.analiz(render_debug=render_debug,
    #                                resolution_debug=resolution_debug,
    #                                sensetivity_analysis=sensetivity_analysis,
    #                                correct_coefficient=correct_coefficient,
    #                                login_cam=login_cam,
    #                                password_cam=password_cam,
    #                                source=source,
    #                                source_type=source_type,
    #                                widget=widget,
    #                                pause=pause,
    #                                process_cores=process_cores,
    #                                widget_write=widget_write,
    #                                speed_analysis=speed_analysis,
    #                                speed_video_stream=speed_video_stream,
    #                                protocol_cam_type=protocol_cam_type,
    #                                port_cam=port_cam,
    #                                ip_cam=ip_cam,
    #                                mask_cam=mask_cam,
    #                                sql_write=sql_write,
    #                                server_sql=server_sql,
    #                                database_sql=database_sql,
    #                                user_sql=user_sql,
    #                                password_sql=password_sql,
    #                                table_now_sql=table_now_sql,
    #                                rows_now_sql=rows_now_sql,
    #                                table_data_sql=table_data_sql,
    #                                rows_data_sql=rows_data_sql,
    #                                sources=sources)
    #         except Exception as ex:
    #             LoggingClass.logging(ex)
    #             print(f'multithread_analyse_image func error')
    #             print(ex)
    #
    #     def thread(_src):
    #         while True:
    #             val = pause(None)
    #             if not val:
    #                 cv2.destroyAllWindows()
    #                 break
    #             analyse_image(_src)
    #             cv2.waitKey(round(100 / speed_analysis))
    #             time.sleep(0.2 / speed_analysis)
    #
    #     for src in sources:
    #         threading.Thread(target=thread, args=(src,)).start()
    #
    # @staticmethod
    # def multiprocess_method(data: dict):
    #     def processes(_data):
    #         while True:
    #             val = pause(None)
    #             if not val:
    #                 cv2.destroyAllWindows()
    #                 break
    #             else:
    #                 with Pool(process_cores) as process:
    #                     process.map(Analizclass.multi, [*_data])
    #             time.sleep(0.2 / speed_analysis)
    #
    #     datas = {
    #         'process_cores': process_cores,
    #         'widget_write': widget_write,
    #         'render_debug': render_debug,
    #         'resolution_debug': resolution_debug,
    #         'source_type': source_type,
    #
    #         'speed_analysis': speed_analysis,
    #         'speed_video_stream': speed_video_stream,
    #         'sensetivity_analysis': sensetivity_analysis,
    #         'correct_coefficient': correct_coefficient,
    #
    #         'protocol_cam_type': protocol_cam_type,
    #         'port_cam': port_cam,
    #         'login_cam': login_cam,
    #         'password_cam': password_cam,
    #         'ip_cam': ip_cam,
    #         'mask_cam': mask_cam,
    #
    #         'sql_write': sql_write,
    #         'server_sql': server_sql,
    #         'database_sql': database_sql,
    #         'user_sql': user_sql,
    #         'password_sql': password_sql,
    #         'table_now_sql': table_now_sql,
    #         'rows_now_sql': rows_now_sql,
    #         'table_data_sql': table_data_sql,
    #         'rows_data_sql': rows_data_sql,
    #     }
    #     data = []
    #     for _loop in sources:
    #         local_dict = datas.copy()
    #         local_dict['source'] = _loop
    #         data.append(local_dict)
    #     threading.Thread(target=processes, args=(data,)).start()

    @staticmethod
    def multi(kwargs):
        source_type = kwargs["source_type"]
        login_cam = kwargs["login_cam"]
        password_cam = kwargs["password_cam"]
        sensetivity_analysis = kwargs["sensetivity_analysis"]
        correct_coefficient = kwargs["correct_coefficient"]
        resolution_debug = [kwargs["resolution_debug"][0], kwargs["resolution_debug"][1]]
        speed_analysis = kwargs["speed_analysis"]
        server_sql = kwargs["server_sql"]
        database_sql = kwargs["database_sql"]
        user_sql = kwargs["user_sql"]
        password_sql = kwargs["password_sql"]
        table_now_sql = kwargs["table_now_sql"]
        rows_now_sql = kwargs["rows_now_sql"]
        table_data_sql = kwargs["table_data_sql"]
        rows_data_sql = kwargs["rows_data_sql"]
        # widget = kwargs["widget"]
        widget = None
        widget_write = kwargs["widget_write"]
        sql_write = kwargs["sql_write"]
        source = kwargs["source"]
        image = Analizclass.get_source(source_type, source, login_cam, password_cam)
        mask = source[1]
        Analizclass.render(f'render final: {str(source)[:30:]}',
                           Analizclass.render_final(image=image, mask=mask,
                                                    sensetivity_analysis=sensetivity_analysis,
                                                    correct_coefficient=correct_coefficient, name=source,
                                                    resolution_debug=resolution_debug),
                           resolution_debug)
        values = Analizclass.result_final(image=image, mask=mask, sensetivity_analysis=sensetivity_analysis,
                                          correct_coefficient=correct_coefficient)
        Analizclass.write_result(server_sql, database_sql, user_sql, password_sql, table_now_sql, rows_now_sql,
                                 table_data_sql, rows_data_sql, source[0].split("192.168.")[1].strip().split(":")[0].
                                 strip(), values, widget, widget_write, sql_write)
        cv2.waitKey(round(100 / speed_analysis))

    @staticmethod
    def analiz(data: dict):
        try:
            image = Analizclass.get_source(data['source_type'], data['source'][0], data['login_cam'],
                                           data['password_cam'])
            mask = data['source'][1]
            if data['render_debug'] == 'none':
                pass
            elif data['render_debug'] == 'all':
                pass
            elif data['render_debug'] == 'extended':
                pass
            elif data['render_debug'] == 'final':
                # if len(source[0]) > 10:
                #     source = source[0].split("192.168.")[1].strip().split(":")[0].strip()
                # else:
                #     source = source[0]
                Analizclass.render_final(image=image, mask=mask, sensetivity_analysis=data['sensetivity_analysis'],
                                         correct_coefficient=data['correct_coefficient'], name=data['name'],
                                         resolution_debug=data['resolution_debug'])
            elif data['render_debug'] == 'source':
                pass
            # if len(source[0]) > 10:
            #     source = source[0].split("192.168.")[1].strip().split(":")[0].strip()
            # else:
            #     source = source[0]
            values = Analizclass.result_final(image=image, mask=mask, sensetivity_analysis=data['sensetivity_analysis'],
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
                                     source=data['source'][0].split("192.168.")[1].strip().split(":")[0].strip(),
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
    def origin(image, name, resolution_debug):
        Analizclass.render(name=name, source=image, resolution_debug=resolution_debug)

    @staticmethod
    def cropping_image(image, name, resolution_debug):
        cropping_image = image[250:1080, 600:1720]
        Analizclass.render(name=name, source=cropping_image, resolution_debug=resolution_debug)

    @staticmethod
    def bitwise_not_white(image, mask, name, resolution_debug):
        bitwise_not = cv2.bitwise_not(image, image, mask=mask)
        Analizclass.render(name=name, source=bitwise_not, resolution_debug=resolution_debug)

    @staticmethod
    def bitwise_and(image, mask, name, resolution_debug):
        bitwise_and = cv2.bitwise_and(image, image, mask=mask)
        Analizclass.render(name=name, source=bitwise_and, resolution_debug=resolution_debug)

    @staticmethod
    def threshold(image, name, resolution_debug):
        _, threshold = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)
        Analizclass.render(name=name, source=threshold, resolution_debug=resolution_debug)

    @staticmethod
    def cvtcolor(image, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        Analizclass.render(name=name, source=cvtcolor, resolution_debug=resolution_debug)

    @staticmethod
    def inrange(image, sensetivity_analysis, name, resolution_debug):
        cvtcolor = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensetivity_analysis], dtype=numpy.uint8),
                              numpy.array([255, sensetivity_analysis, 255], dtype=numpy.uint8))
        Analizclass.render(name=name, source=inrange, resolution_debug=resolution_debug)

    @staticmethod
    def canny_edges(image, sensetivity_analysis, name, resolution_debug):
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
        _values = [source, values, sql_datetime, '']
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
