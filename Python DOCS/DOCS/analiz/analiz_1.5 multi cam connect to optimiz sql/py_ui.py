import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui


class AppContainerclass:
    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.widget = None

    def create_ui(self, title, width, height, icon, play_f, stop_f, quit_f):
        self.widget = MainWidgetclass(title, width, height, icon, play_f, stop_f, quit_f)
        return self.widget


class MainWidgetclass(QtWidgets.QWidget):
    def __init__(self, title="APP", width=640, height=480, icon="", play_f=None, stop_f=None, quit_f=None):
        super().__init__()

        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))

        self.play_f = play_f
        self.stop_f = stop_f
        self.quit_f = quit_f

        # data type
        self.horizontal_box_data_type = QtWidgets.QHBoxLayout()

        # Data of analysis
        # "8.222 | 8.223 | 15.137 | 15.138 | 15.139 | 15.140 | 15.141
        # | 15.142 | 12.209 | 12.210 | 4.254 | 2.254 | 2.8 | 2.9"
        self.data_analysis = QtWidgets.QTextEdit("IP-CAM : 8.222 | 8.223 | 12.209 | 12.210 "
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
        self.sens_analysis = QtWidgets.QTextEdit("SENSETIVIY : 115")
        self.sens_analysis.setReadOnly(True)
        self.horizontal_box_sens_of_analysis.addWidget(self.sens_analysis)

        # Set sens of analysis Button
        self.sens_QPushButton = QtWidgets.QPushButton("setup sens")
        self.horizontal_box_sens_of_analysis.addWidget(self.sens_QPushButton)
        self.sens_QPushButton.clicked.connect(self.getinteger_sens)

        # Speed of analysis
        self.horizontal_box_speed_of_analysis = QtWidgets.QHBoxLayout()

        # Speed of analysis
        self.speed_analysis = QtWidgets.QTextEdit("SPEED ANALYSIS : 1.0")
        self.speed_analysis.setReadOnly(True)
        self.horizontal_box_speed_of_analysis.addWidget(self.speed_analysis)

        # Set speed of analysis Button
        self.speed_QPushButton = QtWidgets.QPushButton("setup speed")
        self.horizontal_box_speed_of_analysis.addWidget(self.speed_QPushButton)
        self.speed_QPushButton.clicked.connect(self.getdouble_speed)

        # multi of analysis
        self.horizontal_box_multi_of_analysis = QtWidgets.QHBoxLayout()

        # Multi of analysis
        self.multi_analysis = QtWidgets.QTextEdit("MULTIPLAYER ANALYSIS : 1.0")
        self.multi_analysis.setReadOnly(True)
        self.horizontal_box_multi_of_analysis.addWidget(self.multi_analysis)

        # Set multi of analysis Button
        self.multi_QPushButton = QtWidgets.QPushButton("setup multi")
        self.horizontal_box_multi_of_analysis.addWidget(self.multi_QPushButton)
        self.multi_QPushButton.clicked.connect(self.getdouble_sens)

        # renderer
        self.horizontal_box_renderer = QtWidgets.QHBoxLayout()

        # Select data type
        self.render_QComboBox = QtWidgets.QComboBox()
        self.render_QComboBox.addItems([x for x in ['not render', 'only source', 'only final',
                                                    'extended', 'render all']])
        self.render_QComboBox.setCurrentText('not render')
        self.horizontal_box_renderer.addWidget(self.render_QComboBox)

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
        self._server = QtWidgets.QTextEdit("SERVER NAME : WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER")
        self._server.setReadOnly(True)
        self.horizontal_box_sql_server.addWidget(self._server)

        # Set
        self.server_QPushButton = QtWidgets.QPushButton("setup server")
        self.horizontal_box_sql_server.addWidget(self.server_QPushButton)
        self.server_QPushButton.clicked.connect(self.get_sql_server)

        # Sql server data value
        self._database = QtWidgets.QTextEdit("DATABASE NAME : ruda_db")
        self._database.setReadOnly(True)
        self.horizontal_box_sql_server.addWidget(self._database)

        # Set
        self.database_QPushButton = QtWidgets.QPushButton("setup database")
        self.horizontal_box_sql_server.addWidget(self.database_QPushButton)
        self.database_QPushButton.clicked.connect(self.get_sql_database)

        # renderer
        self.horizontal_box_sql_user = QtWidgets.QHBoxLayout()

        # Sql server data value
        self._username = QtWidgets.QTextEdit("USERNAME : ruda_user")
        self._username.setReadOnly(True)
        self.horizontal_box_sql_user.addWidget(self._username)

        # Set
        self.username_QPushButton = QtWidgets.QPushButton("setup username")
        self.horizontal_box_sql_user.addWidget(self.username_QPushButton)
        self.username_QPushButton.clicked.connect(self.get_sql_username)

        # Sql server data value
        self._password = QtWidgets.QTextEdit("PASSWORD : ruda_user")
        self._password.setReadOnly(True)
        self.horizontal_box_sql_user.addWidget(self._password)

        # Set
        self.password_QPushButton = QtWidgets.QPushButton("setup password")
        self.horizontal_box_sql_user.addWidget(self.password_QPushButton)
        self.password_QPushButton.clicked.connect(self.get_sql_password)

        # renderer
        self.horizontal_box_sql_table = QtWidgets.QHBoxLayout()

        # Sql server data value
        self._table = QtWidgets.QTextEdit("SQL TABLE : ruda_now_table, ruda_data_table")
        self._table.setReadOnly(True)
        self.horizontal_box_sql_table.addWidget(self._table)

        # Set
        self.table_QPushButton = QtWidgets.QPushButton("setup table")
        self.horizontal_box_sql_table.addWidget(self.table_QPushButton)
        self.table_QPushButton.clicked.connect(self.get_sql_table)

        # Sql server data value
        self._rows = QtWidgets.QTextEdit("TABLE ROWS : device_row, value_row, datetime_row, extra_row")
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
        self.data_ruda = QtWidgets.QLabel("0.0000%")
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
        self.stop_QPushButton.clicked.connect(self.stop_btn_func)

        # Quit Button
        self.quit_QPushButton = QtWidgets.QPushButton("quit")
        self.horizontal_box_psq_btn.addWidget(self.quit_QPushButton)
        self.quit_QPushButton.clicked.connect(self.quit_btn_func)

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

    def gettext_data(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the IP of cam:", "User name:",
                                                          text=self.data_analysis.toPlainText().split(':')[1].strip())
        if okpressed:
            self.data_analysis.setText(f'IP-CAM : {str(value)}')

    def getinteger_sens(self):
        value, okpressed = QtWidgets.QInputDialog.getInt(self, "Set speed", "Speed value:", 115, 1, 255, 5)
        if okpressed:
            self.sens_analysis.setText(f'SENSETIVIY : {str(value)}')

    def getdouble_speed(self):
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.05, 100.0, 2)
        if okpressed:
            self.speed_analysis.setText(f'SPEED ANALYSIS : {(round(value, 3))}')

    def getdouble_sens(self):
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, "Set speed", "Speed value:", 1.0, 0.1, 50.0, 2)
        if okpressed:
            self.multi_analysis.setText(f'MULTIPLAYER ANALYSIS : {(round(value, 3))}')

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
                                                          text=self._server.toPlainText().split(':')[1].strip())
        if okpressed:
            self._server.setText(f'SERVER NAME : {str(value)}')

    def get_sql_database(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter database name:", "Database name:",
                                                          text=self._database.toPlainText().split(':')[1].strip())
        if okpressed:
            self._database.setText(f'DATABASE NAME : {str(value)}')

    def get_sql_username(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter username:", "Username:",
                                                          text=self._username.toPlainText().split(':')[1].strip())
        if okpressed:
            self._username.setText(f'USERNAME : {str(value)}')

    def get_sql_password(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter password:", "Password:",
                                                          text=self._password.toPlainText().split(':')[1].strip())
        if okpressed:
            self._password.setText(f'PASSWORD : {str(value)}')

    def get_sql_table(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the table:", "Table:",
                                                          text=self._table.toPlainText().split(':')[1].strip())
        if okpressed:
            self._table.setText(f'SQL TABLE : {str(value)}')

    def get_sql_rows(self):
        value, okpressed = QtWidgets.QInputDialog.getText(self, "Enter the rows:", "Rows:",
                                                          text=self._rows.toPlainText().split(':')[1].strip())
        if okpressed:
            self._rows.setText(f'TABLE ROWS : {str(value)}')

    def set_data(self, value: str):
        self.data_ruda.setText(f"{value}")

    def play_btn_func(self):
        dict_data = {
            'ip_entry': list(self.data_analysis.toPlainText().split(':')[1].strip().split('|')),
            'sens': int(self.sens_analysis.toPlainText().split(':')[1].strip()),
            'speed': float(self.speed_analysis.toPlainText().split(':')[1].strip()),
            'multiplayer': float(self.multi_analysis.toPlainText().split(':')[1].strip()),
            'windows': str(self.render_QComboBox.currentText().strip()),
            'width': int(self.get_window_resolution()[0]),
            'height': int(self.get_window_resolution()[1]),
            'sql_val': bool(self.sql_QCheckBox.isChecked()),
            'server': str(self._server.toPlainText().split(':')[1].strip()),
            'database': str(self._database.toPlainText().split(':')[1].strip()),
            'username': str(self._username.toPlainText().split(':')[1].strip()),
            'password': str(self._password.toPlainText().split(':')[1].strip()),
            'table': str(self._table.toPlainText().split(':')[1].strip()),
            'rows': list(self._rows.toPlainText().split(':')[1].strip().split(', ')),
            'port': int(554),
            'login_cam': str('admin'),
            'password_cam': str('nehrfvths123'),
            'widget': self
        }
        self.play_f(data=dict_data)

    def stop_btn_func(self):
        self.stop_f()

    def quit_btn_func(self):
        self.quit_f()
