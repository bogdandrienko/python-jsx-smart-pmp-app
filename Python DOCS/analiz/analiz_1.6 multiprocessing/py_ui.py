import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui
from py_utilites import FileSettings


class AppContainerClass:
    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.widget = None

    def create_ui(self, title, width, height, icon, play_f, stop_f, quit_f, snapshot_f):
        self.widget = MainWidgetclass(title, width, height, icon, play_f, stop_f, quit_f, snapshot_f)
        return self.widget


class MainWidgetclass(QtWidgets.QWidget):
    def __init__(self, title="APP", width=640, height=480, icon="", play_f=None, stop_f=None, quit_f=None,
                 snapshot_f=None):
        super().__init__()

        self.play_f = play_f
        self.snapshot_f = snapshot_f
        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))

        #####
        self.horizontal_layout_calibration = QtWidgets.QHBoxLayout()

        # global_label_calibration
        self.global_label_calibration = QtWidgets.QLabel("CALIBRATION")
        self.global_label_calibration.setAutoFillBackground(True)
        self.global_label_calibration.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_calibration.addWidget(self.global_label_calibration)

        # horizontal_layout_calibration_1
        self.horizontal_layout_calibration_1 = QtWidgets.QHBoxLayout()

        # speed_analysis
        self.speed_analysis = QtWidgets.QLabel("SPEED ANALYSIS : 1.0")
        self.horizontal_layout_calibration_1.addWidget(self.speed_analysis)

        # speed_analysis_button
        self.speed_analysis_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_calibration_1.addWidget(self.speed_analysis_button)
        self.speed_analysis_button.clicked.connect(self.get_speed_analysis_button)

        # speed_video_stream
        self.speed_video_stream = QtWidgets.QLabel("SPEED VIDEO-STREAM : 1.0")
        self.horizontal_layout_calibration_1.addWidget(self.speed_video_stream)

        # speed_video_stream_button
        self.speed_video_stream_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_calibration_1.addWidget(self.speed_video_stream_button)
        self.speed_video_stream_button.clicked.connect(self.get_speed_video_stream_button)

        # sensetivity_analysis
        self.sensetivity_analysis = QtWidgets.QLabel("SENSETIVITY ANALYSIS : 115")
        self.horizontal_layout_calibration_1.addWidget(self.sensetivity_analysis)

        # sensetivity_analysis_button
        self.sensetivity_analysis_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_calibration_1.addWidget(self.sensetivity_analysis_button)
        self.sensetivity_analysis_button.clicked.connect(self.get_sensetivity_analysis_button)

        # correct_coefficient
        self.correct_coefficient = QtWidgets.QLabel("SPEED CORRECT COEFFICIENT : 1.0")
        self.horizontal_layout_calibration_1.addWidget(self.correct_coefficient)

        # correct_coefficient_button
        self.correct_coefficient_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_calibration_1.addWidget(self.correct_coefficient_button)
        self.correct_coefficient_button.clicked.connect(self.get_correct_coefficient_button)

        #####
        self.horizontal_layout_cameras = QtWidgets.QHBoxLayout()

        # global_label_cameras
        self.global_label_cameras = QtWidgets.QLabel("CAMERAS")
        self.global_label_cameras.setAutoFillBackground(True)
        self.global_label_cameras.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_cameras.addWidget(self.global_label_cameras)

        # horizontal_layout_cameras_1
        self.horizontal_layout_cameras_1 = QtWidgets.QHBoxLayout()

        # protocol_cam_type
        self.protocol_cam_type = QtWidgets.QLabel("PROTOCOL TYPE : http")
        self.horizontal_layout_cameras_1.addWidget(self.protocol_cam_type)

        # protocol_cam_type_button
        self.protocol_cam_type_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_1.addWidget(self.protocol_cam_type_button)
        self.protocol_cam_type_button.clicked.connect(self.get_protocol_cam_type_button)

        # port_cam
        self.port_cam = QtWidgets.QLabel("PORT CAM : 80")
        self.horizontal_layout_cameras_1.addWidget(self.port_cam)

        # port_cam_button
        self.port_cam_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_1.addWidget(self.port_cam_button)
        self.port_cam_button.clicked.connect(self.get_port_cam_button)

        # login_cam
        self.login_cam = QtWidgets.QLabel("LOGIN CAM : admin")
        self.horizontal_layout_cameras_1.addWidget(self.login_cam)

        # login_cam_button
        self.login_cam_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_1.addWidget(self.login_cam_button)
        self.login_cam_button.clicked.connect(self.get_login_cam_button)

        # password_cam
        self.password_cam = QtWidgets.QLabel("PASSWORD CAM : q1234567")
        self.horizontal_layout_cameras_1.addWidget(self.password_cam)

        # password_cam_button
        self.password_cam_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_1.addWidget(self.password_cam_button)
        self.password_cam_button.clicked.connect(self.get_password_cam_button)

        # horizontal_layout_cameras_2
        self.horizontal_layout_cameras_2 = QtWidgets.QHBoxLayout()

        # ip_cam
        self.ip_cam = QtWidgets.QLabel("IP CAM : 15.203 | 15.204 | 15.205 | 15.202 | 15.206 | 15.207 | 15.208 | 15.209 "
                                       "| 15.210 | 15.211")
        self.horizontal_layout_cameras_2.addWidget(self.ip_cam)

        # ip_cam_button
        self.ip_cam_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_2.addWidget(self.ip_cam_button)
        self.ip_cam_button.clicked.connect(self.get_ip_cam_button)

        # horizontal_layout_cameras_3
        self.horizontal_layout_cameras_3 = QtWidgets.QHBoxLayout()

        # mask_cam
        self.mask_cam = QtWidgets.QLabel("MASK CAM : mask_16_8 | mask_16_9 | mask_16_10 | mask_16_1  | mask_16_2.jpg "
                                         "| mask_16_3 | mask_16_4 | mask_16_5 | mask_16_6 | mask_16_7")
        self.horizontal_layout_cameras_3.addWidget(self.mask_cam)

        # mask_cam_button
        self.mask_cam_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_cameras_3.addWidget(self.mask_cam_button)
        self.mask_cam_button.clicked.connect(self.get_mask_cam_button)

        #####
        self.horizontal_layout_sql = QtWidgets.QHBoxLayout()

        # global_label_sql
        self.global_label_sql = QtWidgets.QLabel("SQL")
        self.global_label_sql.setAutoFillBackground(True)
        self.global_label_sql.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_sql.addWidget(self.global_label_sql)

        # horizontal_layout_sql_1
        self.horizontal_layout_sql_1 = QtWidgets.QHBoxLayout()

        # sql_write
        self.sql_write = QtWidgets.QCheckBox("Write to SQL?")
        self.sql_write.setChecked(False)
        self.horizontal_layout_sql_1.addWidget(self.sql_write)

        # server_sql
        # self.server_sql = QtWidgets.QLabel("SERVER SQL : WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER")  # Home
        self.server_sql = QtWidgets.QLabel("SERVER SQL : WIN-AIK33SUODO5\\SQLEXPRESS")  # Work
        self.horizontal_layout_sql_1.addWidget(self.server_sql)

        # database_sql_button
        self.server_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_1.addWidget(self.server_sql_button)
        self.server_sql_button.clicked.connect(self.get_server_sql_button)

        # database_sql
        self.database_sql = QtWidgets.QLabel("DATABASE SQL : ruda_db")
        self.horizontal_layout_sql_1.addWidget(self.database_sql)

        # database_sql_button
        self.database_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_1.addWidget(self.database_sql_button)
        self.database_sql_button.clicked.connect(self.get_database_sql_button)

        # user_sql
        self.user_sql = QtWidgets.QLabel("USER SQL : ruda_user")
        self.horizontal_layout_sql_1.addWidget(self.user_sql)

        # user_sql_button
        self.user_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_1.addWidget(self.user_sql_button)
        self.user_sql_button.clicked.connect(self.get_user_sql_button)

        # password_sql
        self.password_sql = QtWidgets.QLabel("PASSWORD SQL : ruda_user")
        self.horizontal_layout_sql_1.addWidget(self.password_sql)

        # password_sql_button
        self.password_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_1.addWidget(self.password_sql_button)
        self.password_sql_button.clicked.connect(self.get_password_sql_button)

        # horizontal_layout_sql_2
        self.horizontal_layout_sql_2 = QtWidgets.QHBoxLayout()

        # table_now_sql
        self.table_now_sql = QtWidgets.QLabel("TABLE NOW SQL : ruda_now_table")
        self.horizontal_layout_sql_2.addWidget(self.table_now_sql)

        # table_now_sql_button
        self.table_now_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_2.addWidget(self.table_now_sql_button)
        self.table_now_sql_button.clicked.connect(self.get_table_now_sql_button)

        # rows_now_sql
        self.rows_now_sql = QtWidgets.QLabel("ROWS NOW SQL : device_row | value_row | datetime_row")
        self.horizontal_layout_sql_2.addWidget(self.rows_now_sql)

        # rows_now_sql_button
        self.rows_now_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_2.addWidget(self.rows_now_sql_button)
        self.rows_now_sql_button.clicked.connect(self.get_rows_now_sql_button)

        # horizontal_layout_sql_3
        self.horizontal_layout_sql_3 = QtWidgets.QHBoxLayout()

        # table_data_sql
        self.table_data_sql = QtWidgets.QLabel("TABLE DATA SQL : ruda_data_table")
        self.horizontal_layout_sql_3.addWidget(self.table_data_sql)

        # table_data_sql_button
        self.table_data_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_3.addWidget(self.table_data_sql_button)
        self.table_data_sql_button.clicked.connect(self.get_table_data_sql_button)

        # rows_data_sql
        self.rows_data_sql = QtWidgets.QLabel("ROWS DATA SQL : device_row | value_row | datetime_row")
        self.horizontal_layout_sql_3.addWidget(self.rows_data_sql)

        # rows_data_sql_button
        self.rows_data_sql_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_sql_3.addWidget(self.rows_data_sql_button)
        self.rows_data_sql_button.clicked.connect(self.get_rows_data_sql_button)

        #####
        self.horizontal_layout_snapshot = QtWidgets.QHBoxLayout()

        # global_label_sql
        self.global_label_snapshot = QtWidgets.QLabel("SNAPSHOT")
        self.global_label_snapshot.setAutoFillBackground(True)
        self.global_label_snapshot.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_snapshot.addWidget(self.global_label_snapshot)

        # horizontal_layout_snapshot_1
        self.horizontal_layout_snapshot_1 = QtWidgets.QHBoxLayout()

        # ip_cam_snapshot
        self.ip_cam_snapshot = QtWidgets.QLabel("ip-cam : 15.204")
        self.horizontal_layout_snapshot_1.addWidget(self.ip_cam_snapshot)

        # rows_now_sql_button
        self.ip_cam_snapshot_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_snapshot_1.addWidget(self.ip_cam_snapshot_button)
        self.ip_cam_snapshot_button.clicked.connect(self.get_ip_cam_snapshot_button)

        # Snapshot Button
        self.snapshot_QPushButton = QtWidgets.QPushButton("snapshot")
        self.horizontal_layout_snapshot_1.addWidget(self.snapshot_QPushButton)
        self.snapshot_QPushButton.clicked.connect(self.snapshot_btn_func)

        #####
        self.horizontal_layout_debug = QtWidgets.QHBoxLayout()

        # global_label_sql
        self.global_label_debug = QtWidgets.QLabel("DEBUG")
        self.global_label_debug.setAutoFillBackground(True)
        self.global_label_debug.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_debug.addWidget(self.global_label_debug)

        # horizontal_layout_debug_1
        self.horizontal_layout_debug_1 = QtWidgets.QHBoxLayout()

        # widget_data_value
        self.widget_data_value = QtWidgets.QLabel("0.00%")
        self.horizontal_layout_debug_1.addWidget(self.widget_data_value)
        self.horizontal_layout_debug_1.addStretch(0)

        # widget_write
        self.widget_write = QtWidgets.QCheckBox("Write to Widget?")
        self.widget_write.setChecked(False)
        self.horizontal_layout_debug_1.addWidget(self.widget_write)

        # render_debug
        self.render_debug = QtWidgets.QComboBox()
        self.render_debug.addItems([x for x in ['none', 'source', 'final', 'extended', 'all']])
        self.render_debug.setCurrentText('none')
        self.horizontal_layout_debug_1.addWidget(self.render_debug)

        self.resolution_debug = []

        # resolution_debug
        self.resolution_debug_1 = QtWidgets.QRadioButton("320x240")
        self.resolution_debug_1.setChecked(True)
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_1)
        self.resolution_debug_1.toggled.connect(self.set_resolution_debug(self.resolution_debug_1, 320, 240))

        # resolution_debug_2
        self.resolution_debug_2 = QtWidgets.QRadioButton("640x480")
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_2)
        self.resolution_debug_2.toggled.connect(self.set_resolution_debug(self.resolution_debug_2, 640, 480))

        # resolution_debug_3
        self.resolution_debug_3 = QtWidgets.QRadioButton("1280x720")
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_3)
        self.resolution_debug_3.toggled.connect(self.set_resolution_debug(self.resolution_debug_3, 1280, 720))

        # resolution_debug_4
        self.resolution_debug_4 = QtWidgets.QRadioButton("1920x1080")
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_4)
        self.resolution_debug_4.toggled.connect(self.set_resolution_debug(self.resolution_debug_4, 1920, 1080))

        # resolution_debug_5
        self.resolution_debug_5 = QtWidgets.QRadioButton("2560x1600")
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_5)
        self.resolution_debug_5.toggled.connect(self.set_resolution_debug(self.resolution_debug_5, 2560, 1600))

        # resolution_debug_6
        self.resolution_debug_6 = QtWidgets.QRadioButton("3840x2160")
        self.horizontal_layout_debug_1.addWidget(self.resolution_debug_5)
        self.resolution_debug_6.toggled.connect(self.set_resolution_debug(self.resolution_debug_6, 3840, 2160))

        # horizontal_layout_debug_2
        self.horizontal_layout_debug_2 = QtWidgets.QHBoxLayout()

        # process_cores
        self.process_cores = QtWidgets.QLabel("PROCESS CORES : 4")
        self.horizontal_layout_debug_2.addWidget(self.process_cores)

        # process_cores_button
        self.process_cores_button = QtWidgets.QPushButton("set")
        self.horizontal_layout_debug_2.addWidget(self.process_cores_button)
        self.process_cores_button.clicked.connect(self.get_process_cores_button)

        # compute_debug
        self.compute_debug = QtWidgets.QComboBox()
        self.compute_debug.addItems([x for x in ['sync', 'async', 'multithread', 'multiprocess']])
        self.compute_debug.setCurrentText('multithread')
        self.horizontal_layout_debug_2.addWidget(self.compute_debug)

        # source_type
        self.source_type = QtWidgets.QComboBox()
        self.source_type.addItems([x for x in ['image-http', 'video-rtsp', 'video-file']])
        self.source_type.setCurrentText('image-http')
        self.horizontal_layout_debug_2.addWidget(self.source_type)

        #####
        self.horizontal_layout_imports = QtWidgets.QHBoxLayout()

        # global_label_sql
        self.global_label_imports = QtWidgets.QLabel("IMPORTS")
        self.global_label_imports.setAutoFillBackground(True)
        self.global_label_imports.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_imports.addWidget(self.global_label_imports)

        # horizontal_layout_debug_imports
        self.horizontal_layout_imports_1 = QtWidgets.QHBoxLayout()

        # Export Button
        self.export_QPushButton = QtWidgets.QPushButton("export")
        self.horizontal_layout_imports_1.addWidget(self.export_QPushButton)
        self.export_QPushButton.clicked.connect(self.export_settings)

        # Import Button
        self.import_QPushButton = QtWidgets.QPushButton("import")
        self.horizontal_layout_imports_1.addWidget(self.import_QPushButton)
        self.import_QPushButton.clicked.connect(self.import_settings)

        #####
        self.horizontal_layout_btns = QtWidgets.QHBoxLayout()

        # horizontal_layout_btns
        self.horizontal_label_btns = QtWidgets.QLabel("MANAGEMENT")
        self.horizontal_label_btns.setAutoFillBackground(True)
        self.horizontal_label_btns.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        self.horizontal_layout_btns.addWidget(self.horizontal_label_btns)

        #####
        self.horizontal_layout_btns_1 = QtWidgets.QHBoxLayout()

        # Play Button
        self.play_QPushButton = QtWidgets.QPushButton("play")
        self.horizontal_layout_btns_1.addWidget(self.play_QPushButton)
        self.play_QPushButton.clicked.connect(self.play_btn_func)

        # Stop Button
        self.stop_QPushButton = QtWidgets.QPushButton("stop")
        self.horizontal_layout_btns_1.addWidget(self.stop_QPushButton)
        self.stop_QPushButton.clicked.connect(stop_f)

        # Quit Button
        self.quit_QPushButton = QtWidgets.QPushButton("quit")
        self.horizontal_layout_btns_1.addWidget(self.quit_QPushButton)
        self.quit_QPushButton.clicked.connect(quit_f)

        # Main vertical Layout
        self.vertical_layout_main = QtWidgets.QVBoxLayout(self)
        self.vertical_layout_main.addLayout(self.horizontal_layout_calibration)
        self.vertical_layout_main.addLayout(self.horizontal_layout_calibration_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_cameras)
        self.vertical_layout_main.addLayout(self.horizontal_layout_cameras_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_cameras_2)
        self.vertical_layout_main.addLayout(self.horizontal_layout_cameras_3)
        self.vertical_layout_main.addLayout(self.horizontal_layout_sql)
        self.vertical_layout_main.addLayout(self.horizontal_layout_sql_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_sql_2)
        self.vertical_layout_main.addLayout(self.horizontal_layout_sql_3)
        self.vertical_layout_main.addLayout(self.horizontal_layout_snapshot)
        self.vertical_layout_main.addLayout(self.horizontal_layout_snapshot_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_debug)
        self.vertical_layout_main.addLayout(self.horizontal_layout_debug_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_debug_2)
        self.vertical_layout_main.addLayout(self.horizontal_layout_imports)
        self.vertical_layout_main.addLayout(self.horizontal_layout_imports_1)
        self.vertical_layout_main.addLayout(self.horizontal_layout_btns)
        self.vertical_layout_main.addLayout(self.horizontal_layout_btns_1)

        self.setLayout(self.vertical_layout_main)

    def get_speed_analysis_button(self):
        widget = self.speed_analysis
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, f'Set {widget.text().split(":")[0].strip()}',
                                                            f'{widget.text().split(":")[0].strip()} value:',
                                                            1.0, 0.1, 50.0, 2)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_speed_video_stream_button(self):
        widget = self.speed_video_stream
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, f'Set {widget.text().split(":")[0].strip()}',
                                                            f'{widget.text().split(":")[0].strip()} value:',
                                                            1.0, 0.1, 50.0, 2)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_sensetivity_analysis_button(self):
        widget = self.sensetivity_analysis
        value, okpressed = QtWidgets.QInputDialog.getInt(self, f'Set {widget.text().split(":")[0].strip()}',
                                                         f'{widget.text().split(":")[0].strip()} value:',
                                                         115, 1, 255, 5)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_correct_coefficient_button(self):
        widget = self.correct_coefficient
        value, okpressed = QtWidgets.QInputDialog.getDouble(self, f'Set {widget.text().split(":")[0].strip()}',
                                                            f'{widget.text().split(":")[0].strip()} value:',
                                                            1.0, 0.1, 50.0, 2)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_protocol_cam_type_button(self):
        widget = self.protocol_cam_type
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_port_cam_button(self):
        widget = self.port_cam
        value, okpressed = QtWidgets.QInputDialog.getInt(self, f'Set {widget.text().split(":")[0].strip()}',
                                                         f'{widget.text().split(":")[0].strip()} value:',
                                                         554, 1, 9999, 5)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_login_cam_button(self):
        widget = self.login_cam
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_password_cam_button(self):
        widget = self.password_cam
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_ip_cam_button(self):
        widget = self.ip_cam
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')
        pass

    def get_mask_cam_button(self):
        widget = self.mask_cam
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')
        pass

    def get_server_sql_button(self):
        widget = self.server_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_database_sql_button(self):
        widget = self.database_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_user_sql_button(self):
        widget = self.user_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_password_sql_button(self):
        widget = self.password_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_table_now_sql_button(self):
        widget = self.table_now_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_rows_now_sql_button(self):
        widget = self.rows_now_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_table_data_sql_button(self):
        widget = self.table_data_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_rows_data_sql_button(self):
        widget = self.rows_data_sql
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def set_resolution_debug(self, radio, width: int, height: int):
        self.resolution_debug.append([radio, width, height])

    def get_window_resolution(self):
        for radio in self.resolution_debug:
            try:
                if radio[0].isChecked():
                    return [int(radio[1]), int(radio[2])]
            except Exception as ex:
                print(ex)

    def get_process_cores_button(self):
        widget = self.process_cores
        value, okpressed = QtWidgets.QInputDialog.getInt(self, f'Set {widget.text().split(":")[0].strip()}',
                                                         f'{widget.text().split(":")[0].strip()} value:',
                                                         4, 1, 16, 5)
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_ip_cam_snapshot_button(self):
        widget = self.ip_cam_snapshot
        value, okpressed = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          text=f'{widget.text().split(":")[1].strip()}')
        if okpressed:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def play_btn_func(self):
        data = {
            'process_cores': int(self.process_cores.text().split(':')[1].strip()),
            'widget_write': bool(self.widget_write.isChecked()),
            'widget': self.set_data,
            'render_debug': str(self.render_debug.currentText().strip()),
            'resolution_debug': list(self.get_window_resolution()),
            'compute_debug': str(self.compute_debug.currentText().strip()),
            'source_type': str(self.source_type.currentText().strip()),

            'speed_analysis': float(self.speed_analysis.text().split(':')[1].strip()),
            'speed_video_stream': float(self.speed_video_stream.text().split(':')[1].strip()),
            'sensetivity_analysis': int(self.sensetivity_analysis.text().split(':')[1].strip()),
            'correct_coefficient': float(self.correct_coefficient.text().split(':')[1].strip()),

            'protocol_cam_type': str(self.protocol_cam_type.text().split(':')[1].strip()),
            'port_cam': int(self.port_cam.text().split(':')[1].strip()),
            'login_cam': str(self.login_cam.text().split(':')[1].strip()),
            'password_cam': str(self.password_cam.text().split(':')[1].strip()),
            'ip_cam': list([x.strip() for x in self.ip_cam.text().split(':')[1].strip().split('|')]),
            'mask_cam': list([f"{x.strip()}.jpg" for x in self.mask_cam.text().split(':')[1].strip().split('|')]),

            'sql_write': bool(self.sql_write.isChecked()),
            'server_sql': str(self.server_sql.text().split(':')[1].strip()),
            'database_sql': str(self.database_sql.text().split(':')[1].strip()),
            'user_sql': str(self.user_sql.text().split(':')[1].strip()),
            'password_sql': str(self.password_sql.text().split(':')[1].strip()),
            'table_now_sql': str(self.table_now_sql.text().split(':')[1].strip()),
            'rows_now_sql': list([x.strip() for x in self.rows_now_sql.text().split(':')[1].strip().split('|')]),
            'table_data_sql': str(self.table_data_sql.text().split(':')[1].strip()),
            'rows_data_sql': list([x.strip() for x in self.rows_data_sql.text().split(':')[1].strip().split('|')]),
        }
        self.play_f(data=data)

    def snapshot_btn_func(self):
        data = {
            'source_type': str(self.source_type.currentText().strip()),
            'mask_cam': list([x.strip() for x in self.mask_cam.text().split(':')[1].strip().split('|')[0]]),
            'protocol_cam_type': str(self.protocol_cam_type.text().split(':')[1].strip()),
            'port_cam': int(self.port_cam.text().split(':')[1].strip()),
            'ip_cam': str(self.ip_cam_snapshot.text().split(":")[1].strip()),
            'name_photo': str(self.ip_cam_snapshot.text().split(":")[0].strip()),
            'login_cam': str(self.login_cam.text().split(':')[1].strip()),
            'password_cam': str(self.password_cam.text().split(':')[1].strip()),

        }
        self.snapshot_f(data=data)

    def set_data(self, value: str):
        self.widget_data_value.setText(f"{value}")

    def export_settings(self):
        data = {
            'process_cores': int(self.process_cores.text().split(':')[1].strip()),
            'widget_write': bool(self.widget_write.isChecked()),
            'widget': self.set_data,
            'render_debug': str(self.render_debug.currentText().strip()),
            'resolution_debug': list(self.get_window_resolution()),
            'compute_debug': str(self.compute_debug.currentText().strip()),
            'source_type': str(self.source_type.currentText().strip()),

            'speed_analysis': float(self.speed_analysis.text().split(':')[1].strip()),
            'speed_video_stream': float(self.speed_video_stream.text().split(':')[1].strip()),
            'sensetivity_analysis': int(self.sensetivity_analysis.text().split(':')[1].strip()),
            'correct_coefficient': float(self.correct_coefficient.text().split(':')[1].strip()),

            'protocol_cam_type': str(self.protocol_cam_type.text().split(':')[1].strip()),
            'port_cam': int(self.port_cam.text().split(':')[1].strip()),
            'login_cam': str(self.login_cam.text().split(':')[1].strip()),
            'password_cam': str(self.password_cam.text().split(':')[1].strip()),
            'ip_cam': list([x.strip() for x in self.ip_cam.text().split(':')[1].strip().split('|')]),
            'mask_cam': list([f"{x.strip()}.jpg" for x in self.mask_cam.text().split(':')[1].strip().split('|')]),

            'sql_write': bool(self.sql_write.isChecked()),
            'server_sql': str(self.server_sql.text().split(':')[1].strip()),
            'database_sql': str(self.database_sql.text().split(':')[1].strip()),
            'user_sql': str(self.user_sql.text().split(':')[1].strip()),
            'password_sql': str(self.password_sql.text().split(':')[1].strip()),
            'table_now_sql': str(self.table_now_sql.text().split(':')[1].strip()),
            'rows_now_sql': list([x.strip() for x in self.rows_now_sql.text().split(':')[1].strip().split('|')]),
            'table_data_sql': str(self.table_data_sql.text().split(':')[1].strip()),
            'rows_data_sql': list([x.strip() for x in self.rows_data_sql.text().split(':')[1].strip().split('|')]),
        }
        FileSettings.export_settings(data)

    def import_settings(self):
        data = FileSettings.import_settings()
        self.speed_analysis.setText(f'{self.speed_analysis.text().split(":")[0].strip()} : '
                                    f'{str(data["speed_analysis"])}')
        self.speed_video_stream.setText(f'{self.speed_video_stream.text().split(":")[0].strip()} : '
                                        f'{str(data["speed_video_stream"])}')
        self.sensetivity_analysis.setText(f'{self.sensetivity_analysis.text().split(":")[0].strip()} : '
                                          f'{str(data["sensetivity_analysis"])}')
        self.correct_coefficient.setText(f'{self.correct_coefficient.text().split(":")[0].strip()} : '
                                         f'{str(data["correct_coefficient"])}')
