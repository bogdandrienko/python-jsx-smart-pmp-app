import threading
import sys
import time
import cv2
import numpy
import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui
import datetime
import pyodbc
import pandas


class SQLclass:
    def __init__(self, server, database, username, password, table):
        self.server = server
        self.database = database
        self.username = username
        self.password = password
        self.table = table
        self.cursor = self.pyodbc_connect(server=server, database=database, username=username,
                                          password=password).cursor()

    @staticmethod
    def pyodbc_connect(server, database, username, password):
        return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' +
                              database + ';UID=' + username + ';PWD=' + password +
                              ';Trusted_Connection=yes;')

    @staticmethod
    def pd_read_sql_query(query: str, database: str, table: str, connection):
        return pandas.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

    @staticmethod
    def execute_query(connection, table, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        __rows = ''
        for x in rows:
            __rows = f"{__rows}{str(x)}, "
        value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
        # value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
        # value = f"INSERT INTO {table} (id_row, device_row, percent_row, time_row, data_row, extra_row)
        # VALUES {tuple(values)}"
        cursor.execute(value)
        connection.commit()


def play_analiz(ip_entry: list, sens: int, speed: float, multiplayer: float, windows: bool, width: int, height: int,
                sql_val: bool, server: str, database: str, username: str, password: str, table: str, rows: list,
                port: int, login_cam: str, password_cam: str):
    global widget
    global play
    play = False
    time.sleep(0.2)
    play = True

    ip_cams = []
    for x in ip_entry:
        ip_cams.append(f'rtsp://{login_cam}:{password_cam}@192.168.{x}:{port}')
    # ip_cams = ['video_1.mp4', 'video_2.mp4', 'video_3.mp4']
    ip_cams = ['video_1.mp4']

    def sql_read():
        # Server variables
        # _server = 'WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER'
        # _database = 'ruda_db'
        # _username = 'ruda_user'
        # _password = 'ruda_user'
        # _table = 'ruda_table'
        # _rows = ['id_row', 'device_row', 'percent_row', 'time_row', 'data_row', 'extra_row']
        try:
            sql = SQLclass.pyodbc_connect(server=server, database=database, username=username, password=password)
            db_data = SQLclass.pd_read_sql_query(query='SELECT * FROM', database=database, table=table, connection=sql)
            print(db_data)
            print(type(db_data))
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    def sql_post(data: list):
        # Server variables
        # _server = 'WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER'
        # _database = 'ruda_db'
        # _username = 'ruda_user'
        # _password = 'ruda_user'
        # _table = 'ruda_table'
        # _rows = ['id_row', 'device_row', 'percent_row', 'time_row', 'data_row', 'extra_row']

        try:
            sql = SQLclass.pyodbc_connect(server=server, database=database, username=username, password=password)
            SQLclass.execute_query(connection=sql, table=table, rows=rows, values=data)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    def render(name='output', source=None):
        try:
            if source is not None:
                _img = cv2.resize(source, (width, height), interpolation=cv2.INTER_AREA)
                cv2.imshow(name, _img)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')
            MyWidget.stop_btn_func()

    def render_image(src):
        global play
        cap = cv2.VideoCapture(src)
        while True:
            if play:
                try:
                    def origin():
                        _, src_img = cap.read()
                        render(f'{src}_src_img', src_img)

                    def cropping_image():
                        _, src_img = cap.read()

                        _cropping_image = src_img[250:1080, 600:1720]
                        render(f'{src}_cropping_image', _cropping_image)

                    def bitwise_not_white():
                        _, src_img = cap.read()
                        _src_white = cv2.imread('mask_white.jpg', 0)

                        _bitwise_not_white = cv2.bitwise_not(src_img, src_img, mask=_src_white)
                        render(f'{src}_bitwise_not_white', _bitwise_not_white)

                    def bitwise_not_black():
                        _, src_img = cap.read()
                        src_black = cv2.imread('mask_black.jpg', 0)

                        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                        render(f'{src}_bitwise_not_black', _bitwise_and_black)

                    def bitwise_and_white():
                        _, src_img = cap.read()
                        _src_white = cv2.imread('mask_white.jpg', 0)

                        _bitwise_and_white = cv2.bitwise_and(src_img, src_img, mask=_src_white)
                        render(f'{src}_bitwise_and_white', _bitwise_and_white)

                    def bitwise_and_black():
                        _, src_img = cap.read()
                        src_black = cv2.imread('mask_black.jpg', 0)

                        _bitwise_and_black = cv2.bitwise_and(src_img, src_img, mask=src_black)
                        render(f'{src}_bitwise_and_black', _bitwise_and_black)

                    def threshold():
                        _, src_img = cap.read()

                        _, _threshold = cv2.threshold(src_img, 220, 255, cv2.THRESH_BINARY_INV)
                        render(f'{src}_threshold', _threshold)

                    def cvtcolor():
                        _, src_img = cap.read()

                        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                        render(f'{src}_cvtcolor', _cvtcolor)

                    def inrange():
                        _, src_img = cap.read()

                        _cvtcolor = cv2.cvtColor(src_img, cv2.COLOR_BGR2HSV)
                        _inrange = cv2.inRange(_cvtcolor, numpy.array([0, 0, 255 - sens], dtype=numpy.uint8),
                                               numpy.array([255, sens, 255], dtype=numpy.uint8))
                        render(f'{src}_inrange', _inrange)

                    def canny_edges():
                        _, src_img = cap.read()

                        _canny_edges = cv2.Canny(src_img, sens, sens, apertureSize=3, L2gradient=True)
                        render(f'{src}_canny_edges', _canny_edges)

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
                            render(f'{src}_render_final', _inrange)
                        try:
                            widget.set_data(f'{src}: {result}')
                        except Exception as _ex:
                            print(_ex)
                            with open('log.txt', 'w') as _log:
                                _log.write(f'\n{_ex}\n')
                        _date = f'{str(datetime.datetime.now()).split(" ")[0]}'
                        _time = f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}'
                        if sql_val:
                            sql_post([0, src, result, _time, _date, ''])
                        with open('db.txt', 'a') as db:
                            db.write(f'{[0, src, result, _time, _date, ""]}\n')

                    if windows:
                        pass
                        # origin()
                        # bitwise_not_white()
                        # bitwise_not_black()
                        # bitwise_and_white()
                        # bitwise_and_black()
                        # threshold()
                        # cvtcolor()
                        # inrange()
                        # canny_edges()
                        # cropping_image()
                    render_final(windows)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'w') as log:
                        log.write(f'\n{ex}\n')
                    MyWidget.stop_btn_func()
                # Delay between two frames = 50 ms * speed (2x when delay from cycle functions)
                cv2.waitKey(int(100 / speed)) & 0xFF
                # Delay between cycle functions = 0.1 sec * speed
                time.sleep(round(0.2 / speed, 2))
            else:
                cap.release()
                cv2.destroyAllWindows()
                break

    for cam in ip_cams:
        thread = threading.Thread(target=render_image, args=(cam,))
        thread.start()


class MyWidget(QtWidgets.QWidget):
    def __init__(self, title="app", width=640, height=480, icon=""):
        super().__init__()
        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))

        # data type
        self.horizontal_box_data_type = QtWidgets.QHBoxLayout()

        # Data of analysis
        # "8.222 | 8.223 | 15.137 | 15.138 | 15.139 | 15.140 | 15.141
        # | 15.142 | 12.209 | 12.210 | 4.254 | 2.254 | 2.8 | 2.9"
        self.data_analysis = QtWidgets.QTextEdit("8.222 | 8.223 | 12.209 | 12.210 "
                                                 "| 4.254 | 2.254 | 15.137 | 15.138 | 15.139")
        self.data_analysis.setReadOnly(True)
        self.horizontal_box_data_type.addWidget(self.data_analysis)

        # Set Data of analysis Button
        self.data_QPushButton = QtWidgets.QPushButton("setup ip cam")
        self.horizontal_box_data_type.addWidget(self.data_QPushButton)
        self.data_QPushButton.clicked.connect(self.gettext_data)

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

        # renderer
        self.horizontal_box_sql_server = QtWidgets.QHBoxLayout()

        # Boolean value of rendering the windows
        self.sql_QCheckBox = QtWidgets.QCheckBox("Save to SQL?")
        self.sql_QCheckBox.setChecked(False)
        self.horizontal_box_sql_server.addWidget(self.sql_QCheckBox)

        # Sql server data value
        self._server = QtWidgets.QTextEdit("WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER")
        self._server.setReadOnly(True)
        self.horizontal_box_sql_server.addWidget(self._server)

        # Set
        self.server_QPushButton = QtWidgets.QPushButton("setup server")
        self.horizontal_box_sql_server.addWidget(self.server_QPushButton)
        self.server_QPushButton.clicked.connect(self.get_sql_server)

        # Sql server data value
        self._database = QtWidgets.QTextEdit("ruda_db")
        self._database.setReadOnly(True)
        self.horizontal_box_sql_server.addWidget(self._database)

        # Set
        self.database_QPushButton = QtWidgets.QPushButton("setup database")
        self.horizontal_box_sql_server.addWidget(self.database_QPushButton)
        self.database_QPushButton.clicked.connect(self.get_sql_database)

        # renderer
        self.horizontal_box_sql_user = QtWidgets.QHBoxLayout()

        # Sql server data value
        self._username = QtWidgets.QTextEdit("ruda_user")
        self._username.setReadOnly(True)
        self.horizontal_box_sql_user.addWidget(self._username)

        # Set
        self.username_QPushButton = QtWidgets.QPushButton("setup username")
        self.horizontal_box_sql_user.addWidget(self.username_QPushButton)
        self.username_QPushButton.clicked.connect(self.get_sql_username)

        # Sql server data value
        self._password = QtWidgets.QTextEdit("ruda_user")
        self._password.setReadOnly(True)
        self.horizontal_box_sql_user.addWidget(self._password)

        # Set
        self.password_QPushButton = QtWidgets.QPushButton("setup password")
        self.horizontal_box_sql_user.addWidget(self.password_QPushButton)
        self.password_QPushButton.clicked.connect(self.get_sql_password)

        # renderer
        self.horizontal_box_sql_table = QtWidgets.QHBoxLayout()

        # Sql server data value
        self._table = QtWidgets.QTextEdit("ruda_table")
        self._table.setReadOnly(True)
        self.horizontal_box_sql_table.addWidget(self._table)

        # Set
        self.table_QPushButton = QtWidgets.QPushButton("setup table")
        self.horizontal_box_sql_table.addWidget(self.table_QPushButton)
        self.table_QPushButton.clicked.connect(self.get_sql_table)

        # Sql server data value
        self._rows = QtWidgets.QTextEdit("id_row, device_row, percent_row, time_row, data_row, extra_row")
        self._rows.setReadOnly(True)
        self.horizontal_box_sql_table.addWidget(self._rows)

        # Set
        self.rows_QPushButton = QtWidgets.QPushButton("setup rows")
        self.horizontal_box_sql_table.addWidget(self.rows_QPushButton)
        self.rows_QPushButton.clicked.connect(self.get_sql_rows)

        # data_value
        self.vertical_box_data_value = QtWidgets.QVBoxLayout()
        self.vertical_box_data_value.addStretch(1)

        # PlainText data value
        self.data_ruda = QtWidgets.QPlainTextEdit("0.0000%")
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
        self.vertical_box_main.addLayout(self.horizontal_box_sql_server)
        self.vertical_box_main.addLayout(self.horizontal_box_sql_user)
        self.vertical_box_main.addLayout(self.horizontal_box_sql_table)
        self.vertical_box_main.addLayout(self.vertical_box_data_value)
        self.vertical_box_main.addLayout(self.horizontal_box_psq_btn)

        self.setLayout(self.vertical_box_main)

    def get_arr_ip_cam(self):
        return [x.strip() for x in self.data_analysis.toPlainText().split('|')]

    def gettext_data(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the IP of cam:", "User name:",
                                                          text=self.data_analysis.toPlainText())
        if okpressed:
            self.data_analysis.setText(f'{str(value)}')

    def getinteger_sens(self):
        value, okpressed = QtWidgets.QInputDialog.getInt(self, "Set speed", "Speed value:", 115, 1, 255, 5)
        if okpressed:
            self.sens_analysis.setText(f'sensitivity : {str(value)}')

    def getdouble_speed(self):
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.05, 100.0, 2)
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

    def get_sql_server(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter server name:", "Server name:",
                                                          text=self._server.toPlainText())
        if okpressed:
            self._server.setText(f'{str(value)}')

    def get_sql_database(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter database name:", "Database name:",
                                                          text=self._database.toPlainText())
        if okpressed:
            self._database.setText(f'{str(value)}')

    def get_sql_username(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter username:", "Username:",
                                                          text=self._username.toPlainText())
        if okpressed:
            self._username.setText(f'{str(value)}')

    def get_sql_password(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter password:", "Password:",
                                                          text=self._password.toPlainText())
        if okpressed:
            self._password.setText(f'{str(value)}')

    def get_sql_table(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the table:", "Table:",
                                                          text=self._table.toPlainText())
        if okpressed:
            self._table.setText(f'{str(value)}')

    def get_sql_rows(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the rows:", "Rows:",
                                                          text=self._rows.toPlainText())
        if okpressed:
            self._rows.setText(f'{str(value)}')

    def play_btn_func(self):
        play_analiz(ip_entry=list(self.get_arr_ip_cam()),
                    sens=int(self.sens_analysis.toPlainText().split(':')[1].strip()),
                    speed=float(self.speed_analysis.toPlainText().split(':')[1].strip()),
                    multiplayer=float(self.multi_analysis.toPlainText().split(':')[1].strip()),
                    windows=bool(self.render_QCheckBox.isChecked()),
                    width=int(self.get_window_resolution()[0]),
                    height=int(self.get_window_resolution()[1]),
                    sql_val=bool(self.sql_QCheckBox.isChecked()),
                    server=str(self._server.toPlainText()),
                    database=str(self._database.toPlainText()),
                    username=str(self._username.toPlainText()),
                    password=str(self._password.toPlainText()),
                    table=str(self._table.toPlainText()),
                    rows=list(self._rows.toPlainText().split(', ')),
                    port=int(554),
                    login_cam=str('admin'),
                    password_cam=str('nehrfvths123'))

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
