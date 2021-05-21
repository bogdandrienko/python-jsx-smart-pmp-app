import PySide6.QtWidgets as QtWidgets
import PySide6.QtGui as QtGui
from py_utilites import FileSettings, LoggingClass


class AppContainerClass:
    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.widget = None

    def create_ui(self, title, width, height, icon, play_f, stop_f, quit_f, snapshot_f):
        self.widget = MainWidgetclass(title, width, height, icon, play_f, stop_f, quit_f, snapshot_f)
        self.widget.autoplay_func()
        return self.widget

    @staticmethod
    def create_qlable(text: str, _parent, background=False):
        _widget = QtWidgets.QLabel(text)
        if background:
            _widget.setAutoFillBackground(True)
            _widget.setStyleSheet("QLabel { background-color: rgba(0, 0, 0, 255); color : white; }")
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qpushbutton(_parent, _connect_func, _text='set'):
        _widget = QtWidgets.QPushButton(_text)
        _parent.addWidget(_widget)
        _widget.clicked.connect(_connect_func)
        return _widget

    @staticmethod
    def create_qcheckbox(_parent, _text='check?', default=False):
        _widget = QtWidgets.QCheckBox(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qcombobox(_parent, _text: list, default=None):
        _widget = QtWidgets.QComboBox()
        _widget.addItems([x for x in _text])
        _widget.setCurrentText(default)
        _parent.addWidget(_widget)
        return _widget

    @staticmethod
    def create_qradiobutton(_parent, _text: str, default=False):
        _widget = QtWidgets.QRadioButton(_text)
        _widget.setChecked(default)
        _parent.addWidget(_widget)
        return _widget


class MainWidgetclass(QtWidgets.QWidget):
    def __init__(self, title="APP", width=640, height=480, icon="", play_f=None, stop_f=None, quit_f=None,
                 snapshot_f=None):
        super().__init__()

        self.play_f = play_f
        self.snapshot_f = snapshot_f
        self.resize(width, height)
        self.setWindowTitle(title)
        self.setWindowIcon(QtGui.QIcon(icon))
        self.resolution_debug = []
        # Main vertical Layout
        self.v_layout_m = QtWidgets.QVBoxLayout(self)

        # MANAGEMENT
        self.h_layout_g_management = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_management)
        self.g_management_set = AppContainerClass.create_qlable('MANAGEMENT', self.h_layout_g_management,
                                                                background=True)
        self.h_layout_management_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_management_1)
        self.play_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1, self.play_btn_func,
                                                                     'play')
        self.stop_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1, stop_f, 'stop')
        self.quit_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_management_1, quit_f, 'quit')
        # CAMERAS
        self.h_layout_g_cam = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_cam)
        self.g_cam_set = AppContainerClass.create_qlable('CAMERAS', self.h_layout_g_cam, background=True)
        self.h_layout_cam_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_cam_1)
        self.protocol_cam_type = AppContainerClass.create_qlable('PROTOCOL TYPE : http', self.h_layout_cam_1)
        self.set_protocol_cam_type = AppContainerClass.create_qpushbutton(self.h_layout_cam_1,
                                                                          self.get_protocol_cam_type_button)
        self.port_cam = AppContainerClass.create_qlable('PORT CAM : 80', self.h_layout_cam_1)
        self.set_port_cam = AppContainerClass.create_qpushbutton(self.h_layout_cam_1, self.get_port_cam_button)
        self.login_cam = AppContainerClass.create_qlable('LOGIN CAM : admin', self.h_layout_cam_1)
        self.set_login_cam = AppContainerClass.create_qpushbutton(self.h_layout_cam_1, self.get_login_cam_button)
        self.password_cam = AppContainerClass.create_qlable('PASSWORD CAM : q1234567', self.h_layout_cam_1)
        self.set_password_cam = AppContainerClass.create_qpushbutton(self.h_layout_cam_1, self.get_password_cam_button)
        self.h_layout_cam_2 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_cam_2)
        self.ip_cam = AppContainerClass.create_qlable('IP CAM : 15.202 | 15.206 | 15.207 | 15.208 | 15.209 | 15.210 '
                                                      '| 15.211 | 15.203 | 15.204 | 15.205', self.h_layout_cam_2)
        self.set_ip_cam = AppContainerClass.create_qpushbutton(self.h_layout_cam_2, self.get_ip_cam_button)
        self.h_layout_cam_3 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_cam_3)
        self.mask_cam = AppContainerClass.create_qlable('MASK CAM : m_16_1.jpg | m_16_2.jpg | m_16_3.jpg | m_16_4.jpg '
                                                        '| m_16_5.jpg | m_16_6.jpg | m_16_7.jpg | m_16_8.jpg '
                                                        '| m_16_9.jpg | m_16_10.jpg', self.h_layout_cam_3)
        self.set_mask_cam = AppContainerClass.create_qpushbutton(self.h_layout_cam_3, self.get_mask_cam_button)
        self.h_layout_cam_4 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_cam_4)
        self.sensitivity_analysis = AppContainerClass.create_qlable('SENSITIVITY ANALYSIS : 115 | 115 | 115 | 115 '
                                                                    '| 115 | 115 | 115 | 115 | 115 | 115',
                                                                    self.h_layout_cam_4)
        self.set_sensitivity_analysis = AppContainerClass.create_qpushbutton(self.h_layout_cam_4,
                                                                             self.get_sensitivity_analysis_button)
        self.h_layout_cam_5 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_cam_5)
        self.correct_coefficient = AppContainerClass.create_qlable('CORRECT COEFFICIENT : 1.0 | 1.0 | 1.0 | 1.0 | 1.0 '
                                                                   '| 1.0 | 1.0 | 1.0 | 1.0 | 1.0', self.h_layout_cam_5)
        self.set_correct_coefficient = AppContainerClass.create_qpushbutton(self.h_layout_cam_5,
                                                                            self.get_correct_coefficient_button)
        # SQL
        self.h_layout_g_sql = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_sql)
        self.g_sql_set = AppContainerClass.create_qlable('SQL', self.h_layout_g_sql, background=True)
        self.h_layout_sql_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_sql_1)
        self.sql_write = AppContainerClass.create_qcheckbox(self.h_layout_sql_1, 'WRITE TO SQL?')
        self.server_sql = AppContainerClass.create_qlable('SERVER SQL : WIN-AIK33SUODO5\\SQLEXPRESS',
                                                          self.h_layout_sql_1)
        # self.server_sql = AppContainerClass.create_qlable('SERVER SQL : WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER',
        #                                                   self.h_layout_sql_2)
        self.set_server_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_1, self.get_server_sql_button)
        self.h_layout_sql_2 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_sql_2)
        self.database_sql = AppContainerClass.create_qlable('DATABASE SQL : ruda_db', self.h_layout_sql_2)
        self.set_database_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_2, self.get_database_sql_button)
        self.user_sql = AppContainerClass.create_qlable('USER SQL : ruda_user', self.h_layout_sql_2)
        self.set_user_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_2, self.get_user_sql_button)
        self.h_layout_sql_3 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_sql_3)
        self.password_sql = AppContainerClass.create_qlable('PASSWORD SQL : ruda_user', self.h_layout_sql_2)
        self.set_password_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_2, self.get_password_sql_button)
        self.table_now_sql = AppContainerClass.create_qlable('TABLE NOW SQL : ruda_now_table', self.h_layout_sql_3)
        self.set_table_now_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_3,
                                                                      self.get_table_now_sql_button)
        self.rows_now_sql = AppContainerClass.create_qlable('ROWS NOW SQL : device_row | value_row | datetime_row',
                                                            self.h_layout_sql_3)
        self.set_rows_now_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_3, self.get_rows_now_sql_button)
        self.h_layout_sql_4 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_sql_4)
        self.table_data_sql = AppContainerClass.create_qlable('TABLE DATA SQL : ruda_data_table', self.h_layout_sql_4)
        self.set_table_data_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_4,
                                                                       self.get_table_data_sql_button)
        self.rows_data_sql = AppContainerClass.create_qlable('ROWS DATA SQL : device_row | value_row | datetime_row',
                                                             self.h_layout_sql_4)
        self.set_rows_data_sql = AppContainerClass.create_qpushbutton(self.h_layout_sql_4,
                                                                      self.get_rows_data_sql_button)
        # DEBUG
        self.h_layout_g_debug = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_debug)
        self.g_debug_set = AppContainerClass.create_qlable('DEBUG', self.h_layout_g_debug, background=True)
        self.h_layout_debug_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_1)
        self.autoplay_check = AppContainerClass.create_qcheckbox(self.h_layout_debug_1, 'AUTOPLAY?')
        self.speed_analysis = AppContainerClass.create_qlable('SPEED ANALYSIS : 1.0', self.h_layout_debug_1)
        self.set_speed_analysis = AppContainerClass.create_qpushbutton(self.h_layout_debug_1,
                                                                       self.get_speed_analysis_button)
        self.speed_video_stream = AppContainerClass.create_qlable('SPEED VIDEO-STREAM : 1.0', self.h_layout_debug_1)
        self.set_speed_video_stream = AppContainerClass.create_qpushbutton(self.h_layout_debug_1,
                                                                           self.get_speed_video_stream_button)
        self.h_layout_debug_2 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_2)
        self.widget_data_value = AppContainerClass.create_qlable('0.00%', self.h_layout_debug_2)
        self.h_layout_debug_2.addStretch()
        self.widget_write = AppContainerClass.create_qcheckbox(self.h_layout_debug_2, 'WRITE TO WIDGET?')
        self.source_win_type = AppContainerClass.create_qlable('SOURCE TYPE :', self.h_layout_debug_2)
        self.source_type = AppContainerClass.create_qcombobox(self.h_layout_debug_2,
                                                              ['image-http', 'video-rtsp', 'video-file'],
                                                              'image-http')
        self.compute_win_debug = AppContainerClass.create_qlable('COMPUTE TYPE :', self.h_layout_debug_2)
        self.compute_debug = AppContainerClass.create_qcombobox(self.h_layout_debug_2, ['sync', 'async', 'multithread',
                                                                                        'multiprocess'], 'multithread')
        self.process_cores = AppContainerClass.create_qlable('PROCESS CORES : 4', self.h_layout_debug_2)
        self.set_process_cores = AppContainerClass.create_qpushbutton(self.h_layout_debug_2,
                                                                      self.get_process_cores_button)
        self.h_layout_debug_3 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_debug_3)
        self.render_win_debug = AppContainerClass.create_qlable('Render windows :', self.h_layout_debug_3)
        self.render_debug = AppContainerClass.create_qcombobox(self.h_layout_debug_3,
                                                               ['none', 'source', 'final', 'extended',
                                                                'all'], 'none')
        self.resolution_debug_1 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '320x240', default=True)
        self.resolution_debug_1.toggled.connect(self.set_resolution_debug(self.resolution_debug_1, 320, 240))
        self.resolution_debug_2 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '640x480')
        self.resolution_debug_2.toggled.connect(self.set_resolution_debug(self.resolution_debug_2, 640, 480))
        self.resolution_debug_3 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '1280x720')
        self.resolution_debug_3.toggled.connect(self.set_resolution_debug(self.resolution_debug_3, 1280, 720))
        self.resolution_debug_4 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '1920x1080')
        self.resolution_debug_4.toggled.connect(self.set_resolution_debug(self.resolution_debug_4, 1920, 1080))
        self.resolution_debug_5 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '2560x1600')
        self.resolution_debug_5.toggled.connect(self.set_resolution_debug(self.resolution_debug_5, 2560, 1600))
        self.resolution_debug_6 = AppContainerClass.create_qradiobutton(self.h_layout_debug_3, '3840x2160')
        self.resolution_debug_6.toggled.connect(self.set_resolution_debug(self.resolution_debug_6, 3840, 2160))
        # IMPORTS
        self.h_layout_g_imports = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_imports)
        self.g_imports_set = AppContainerClass.create_qlable('IMPORTS', self.h_layout_g_imports, background=True)
        self.h_layout_imports_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_imports_1)
        self.import_file = AppContainerClass.create_qlable('SETTINGS FILE NAME : settings', self.h_layout_imports_1)
        self.set_import_file = AppContainerClass.create_qpushbutton(self.h_layout_imports_1,
                                                                    self.get_settings_file_name)
        self.export_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_imports_1,
                                                                       self.export_settings_func, 'export')
        self.import_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_imports_1,
                                                                       self.import_settings_func, 'import')
        # SHOT
        self.h_layout_g_shot = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_g_shot)
        self.g_shot_set = AppContainerClass.create_qlable('SHOT', self.h_layout_g_shot, background=True)
        self.h_layout_shot_1 = QtWidgets.QHBoxLayout()
        self.v_layout_m.addLayout(self.h_layout_shot_1)
        self.ip_cam_snapshot = AppContainerClass.create_qlable('ip-cam : 15.204', self.h_layout_shot_1)
        self.set_ip_cam_snapshot = AppContainerClass.create_qpushbutton(self.h_layout_shot_1,
                                                                        self.get_ip_cam_snapshot_button)
        self.name_snapshot = AppContainerClass.create_qlable('file name : picture.jpg', self.h_layout_shot_1)
        self.set_name_snapshot = AppContainerClass.create_qpushbutton(self.h_layout_shot_1,
                                                                      self.set_name_snapshot_button)
        self.snapshot_QPushButton = AppContainerClass.create_qpushbutton(self.h_layout_shot_1, self.snapshot_btn_func,
                                                                         'snapshot')

        self.setLayout(self.v_layout_m)

    def get_speed_analysis_button(self):
        widget = self.speed_analysis
        value, success = QtWidgets.QInputDialog.getDouble(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          1.0, 0.1, 50.0, 2)
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_speed_video_stream_button(self):
        widget = self.speed_video_stream
        value, success = QtWidgets.QInputDialog.getDouble(self, f'Set {widget.text().split(":")[0].strip()}',
                                                          f'{widget.text().split(":")[0].strip()} value:',
                                                          1.0, 0.1, 50.0, 2)
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_sensitivity_analysis_button(self):
        widget = self.sensitivity_analysis
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_correct_coefficient_button(self):
        widget = self.correct_coefficient
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_protocol_cam_type_button(self):
        widget = self.protocol_cam_type
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_port_cam_button(self):
        widget = self.port_cam
        value, success = QtWidgets.QInputDialog.getInt(self, f'Set {widget.text().split(":")[0].strip()}',
                                                       f'{widget.text().split(":")[0].strip()} value:',
                                                       554, 1, 9999, 5)
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_login_cam_button(self):
        widget = self.login_cam
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_password_cam_button(self):
        widget = self.password_cam
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_ip_cam_button(self):
        widget = self.ip_cam
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')
        pass

    def get_mask_cam_button(self):
        widget = self.mask_cam
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')
        pass

    def get_server_sql_button(self):
        widget = self.server_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_database_sql_button(self):
        widget = self.database_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_user_sql_button(self):
        widget = self.user_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_password_sql_button(self):
        widget = self.password_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_table_now_sql_button(self):
        widget = self.table_now_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_rows_now_sql_button(self):
        widget = self.rows_now_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_table_data_sql_button(self):
        widget = self.table_data_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_rows_data_sql_button(self):
        widget = self.rows_data_sql
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_settings_file_name(self):
        widget = self.import_file
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
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

    def set_window_resolution(self, value):
        for radio in self.resolution_debug:
            try:
                if radio[1] == value[0]:
                    radio[0].setChecked(True)
                else:
                    radio[0].setChecked(False)
            except Exception as ex:
                print(ex)

    def get_process_cores_button(self):
        widget = self.process_cores
        value, success = QtWidgets.QInputDialog.getInt(self, f'Set {widget.text().split(":")[0].strip()}',
                                                       f'{widget.text().split(":")[0].strip()} value:',
                                                       4, 1, 16, 5)
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_ip_cam_snapshot_button(self):
        widget = self.ip_cam_snapshot
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def set_name_snapshot_button(self):
        widget = self.name_snapshot
        value, success = QtWidgets.QInputDialog.getText(self, f'Set {widget.text().split(":")[0].strip()}',
                                                        f'{widget.text().split(":")[0].strip()} value:',
                                                        text=f'{widget.text().split(":")[1].strip()}')
        if success:
            widget.setText(f'{widget.text().split(":")[0].strip()} : {str(value)}')

    def get_string_from_list(self, source: list):
        value = ''
        for x in source:
            value = f'{value} | {x}'
        return value[3::]

    def set_data_func(self, value: str):
        try:
            self.widget_data_value.setText(f"{value}")
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'set_data_func error : {ex}')

    def create_data_func(self):
        try:
            data = {
                'protocol_cam_type': str(self.protocol_cam_type.text().split(':')[1].strip()),
                'port_cam': int(self.port_cam.text().split(':')[1].strip()),
                'login_cam': str(self.login_cam.text().split(':')[1].strip()),
                'password_cam': str(self.password_cam.text().split(':')[1].strip()),
                'ip_cam': list([x.strip() for x in self.ip_cam.text().split(':')[1].strip().split('|')]),
                'mask_cam': list([x.strip() for x in self.mask_cam.text().split(':')[1].strip().split('|')]),
                'sensitivity_analysis': list([int(x.strip()) for x in
                                              self.sensitivity_analysis.text().split(':')[1].strip().split('|')]),
                'correct_coefficient': list([float(x.strip()) for x in
                                             self.correct_coefficient.text().split(':')[1].strip().split('|')]),

                'sql_write': bool(self.sql_write.isChecked()),
                'server_sql': str(self.server_sql.text().split(':')[1].strip()),
                'database_sql': str(self.database_sql.text().split(':')[1].strip()),
                'user_sql': str(self.user_sql.text().split(':')[1].strip()),
                'password_sql': str(self.password_sql.text().split(':')[1].strip()),
                'table_now_sql': str(self.table_now_sql.text().split(':')[1].strip()),
                'rows_now_sql': list([x.strip() for x in self.rows_now_sql.text().split(':')[1].strip().split('|')]),
                'table_data_sql': str(self.table_data_sql.text().split(':')[1].strip()),
                'rows_data_sql': list([x.strip() for x in self.rows_data_sql.text().split(':')[1].strip().split('|')]),

                'autoplay_check': bool(self.autoplay_check.isChecked()),
                'speed_analysis': float(self.speed_analysis.text().split(':')[1].strip()),
                'speed_video_stream': float(self.speed_video_stream.text().split(':')[1].strip()),

                'widget_write': bool(self.widget_write.isChecked()),
                'widget': self.set_data_func,
                'source_type': str(self.source_type.currentText().strip()),
                'compute_debug': str(self.compute_debug.currentText().strip()),
                'process_cores': int(self.process_cores.text().split(':')[1].strip()),
                'render_debug': str(self.render_debug.currentText().strip()),
                'resolution_debug': list(self.get_window_resolution()),

                'import_file': str(self.import_file.text().split(':')[1].strip()),

                'ip_cam_snapshot': str(self.ip_cam_snapshot.text().split(":")[1].strip()),
                'name_snapshot': str(self.name_snapshot.text().split(":")[1].strip()),
            }
            return data
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'create_data_func error : {ex}')

    def play_btn_func(self):
        try:
            data = self.create_data_func()
            self.play_f(data=data)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'play_btn_func error : {ex}')

    def snapshot_btn_func(self):
        try:
            data = self.create_data_func()
            self.snapshot_f(data=data)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'snapshot_btn_func error : {ex}')

    def export_settings_func(self):
        try:
            data = self.create_data_func()
            del data['widget']
            FileSettings.export_settings(data)
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'export_settings_func error : {ex}')

    def import_settings_func(self):
        try:
            data = FileSettings.import_settings()
            self.protocol_cam_type.setText(f'{self.protocol_cam_type.text().split(":")[0].strip()} : '
                                           f'{str(data["protocol_cam_type"])}')
            self.port_cam.setText(f'{self.port_cam.text().split(":")[0].strip()} : '
                                  f'{str(data["port_cam"])}')
            self.login_cam.setText(f'{self.login_cam.text().split(":")[0].strip()} : '
                                   f'{str(data["login_cam"])}')
            self.password_cam.setText(f'{self.password_cam.text().split(":")[0].strip()} : '
                                      f'{str(data["password_cam"])}')
            self.ip_cam.setText(f'{self.ip_cam.text().split(":")[0].strip()} : '
                                f'{self.get_string_from_list(data["ip_cam"])}')
            self.mask_cam.setText(f'{self.mask_cam.text().split(":")[0].strip()} : '
                                  f'{self.get_string_from_list(data["mask_cam"])}')
            self.sensitivity_analysis.setText(f'{self.sensitivity_analysis.text().split(":")[0].strip()} : '
                                              f'{self.get_string_from_list(data["sensitivity_analysis"])}')
            self.correct_coefficient.setText(f'{self.correct_coefficient.text().split(":")[0].strip()} : '
                                             f'{self.get_string_from_list(data["correct_coefficient"])}')
            self.sql_write.setChecked(data["sql_write"])
            self.server_sql.setText(f'{self.server_sql.text().split(":")[0].strip()} : {str(data["server_sql"])}')
            self.database_sql.setText(f'{self.database_sql.text().split(":")[0].strip()} : '
                                      f'{str(data["database_sql"])}')
            self.user_sql.setText(f'{self.user_sql.text().split(":")[0].strip()} : '
                                  f'{str(data["user_sql"])}')
            self.password_sql.setText(f'{self.password_sql.text().split(":")[0].strip()} : '
                                      f'{str(data["password_sql"])}')
            self.table_now_sql.setText(f'{self.table_now_sql.text().split(":")[0].strip()} : '
                                       f'{str(data["table_now_sql"])}')
            self.rows_now_sql.setText(f'{self.rows_now_sql.text().split(":")[0].strip()} : '
                                      f'{self.get_string_from_list(data["rows_now_sql"])}')
            self.table_data_sql.setText(f'{self.table_data_sql.text().split(":")[0].strip()} : '
                                        f'{str(data["table_data_sql"])}')
            self.rows_data_sql.setText(f'{self.rows_data_sql.text().split(":")[0].strip()} : '
                                       f'{self.get_string_from_list(data["rows_data_sql"])}')
            self.autoplay_check.setChecked(data["autoplay_check"])
            self.speed_analysis.setText(f'{self.speed_analysis.text().split(":")[0].strip()} : '
                                        f'{str(data["speed_analysis"])}')
            self.speed_video_stream.setText(f'{self.speed_video_stream.text().split(":")[0].strip()} : '
                                            f'{str(data["speed_video_stream"])}')
            self.widget_write.setChecked(data["widget_write"])
            self.source_type.setCurrentText(data["source_type"])
            self.compute_debug.setCurrentText(data["compute_debug"])
            self.process_cores.setText(f'{self.process_cores.text().split(":")[0].strip()} : '
                                       f'{str(data["process_cores"])}')
            self.render_debug.setCurrentText(data["render_debug"])
            self.set_window_resolution(data["resolution_debug"])
            self.import_file.setText(f'{self.import_file.text().split(":")[0].strip()} : '
                                     f'{str(data["import_file"])}')
            self.ip_cam_snapshot.setText(f'{self.ip_cam_snapshot.text().split(":")[0].strip()} : '
                                         f'{str(data["ip_cam_snapshot"])}')
            self.name_snapshot.setText(f'{self.name_snapshot.text().split(":")[0].strip()} : '
                                       f'{str(data["name_snapshot"])}')
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'import_settings_func error : {ex}')

    def autoplay_func(self):
        try:
            data = FileSettings.import_settings()
            if data['autoplay_check']:
                self.play_btn_func()
                self.showMinimized()
        except Exception as ex:
            LoggingClass.logging(ex)
            print(f'autoplay_func error : {ex}')
