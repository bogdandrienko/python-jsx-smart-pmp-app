

class SQLClass:

    @staticmethod
    def example_cv():
        class SQLClass:
            @staticmethod
            def sql_post_data(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                              rows: list, values: list):
                try:
                    sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                                  password=password)
                    SQLClass.execute_data_query(connection=sql, table=table, rows=rows, values=values)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'a') as log:
                        log.write(f'\n{ex}\n')

            @staticmethod
            def sql_post_now(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                             rows: list, values: list):
                try:
                    sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                                  password=password)
                    SQLClass.execute_now_query(connection=sql, table=table, rows=rows, values=values)
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'a') as log:
                        log.write(f'\n{ex}\n')

            @staticmethod
            def pyodbc_connect(ip: str, server: str, port: str, database: str, username: str, password: str):
                conn_str = (
                        r'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:' + ip + '\\' + server + ',' + port +
                        ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password + ';'
                )
                return pyodbc.connect(conn_str)

            @staticmethod
            def pd_read_sql_query(connection, query: str, database: str, table: str):
                return pandas.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

            @staticmethod
            def execute_data_query(connection, table: str, rows: list, values: list):
                cursor = connection.cursor()
                cursor.fast_executemany = True
                _rows = ''
                for x in rows:
                    _rows = f"{_rows}{str(x)}, "
                value = f"INSERT INTO {table} (" + _rows[:-2:] + f") VALUES {tuple(values)}"
                cursor.execute(value)
                connection.commit()

            @staticmethod
            def execute_now_query(connection, table, rows: list, values: list):
                cursor = connection.cursor()
                cursor.fast_executemany = True
                __rows = ''
                for x in rows:
                    __rows = f"{__rows}{str(x)}, "
                value = f"UPDATE {table} SET {rows[1]} = '{values[1]}',{rows[2]} = '{values[2]}' ,{rows[3]} = '{values[3]}' " \
                        f"WHERE {rows[0]} = '{values[0]}'"
                cursor.execute(value)
                connection.commit()

    @staticmethod
    def sql_post_data(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                      rows: list, values: list):
        try:
            sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                          password=password)
            SQLClass.execute_data_query(connection=sql, table=table, rows=rows, values=values)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    @staticmethod
    def sql_post_now(ip: str, server: str, port: str, database: str, username: str, password: str, table: str,
                     rows: list, values: list):
        try:
            sql = SQLClass.pyodbc_connect(ip=ip, server=server, port=port, database=database, username=username,
                                          password=password)
            SQLClass.execute_now_query(connection=sql, table=table, rows=rows, values=values)
        except Exception as ex:
            print(ex)
            with open('log.txt', 'a') as log:
                log.write(f'\n{ex}\n')

    @staticmethod
    def pyodbc_connect(ip: str, server: str, port: str, database: str, username: str, password: str):
        conn_str = (
                r'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:' + ip + '\\' + server + ',' + port +
                ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password + ';'
        )
        return pyodbc.connect(conn_str)

    @staticmethod
    def pd_read_sql_query(connection, query: str, database: str, table: str):
        return pandas.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

    @staticmethod
    def execute_data_query(connection, table: str, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        _rows = ''
        for x in rows:
            _rows = f"{_rows}{str(x)}, "
        value = f"INSERT INTO {table} (" + _rows[:-2:] + f") VALUES {tuple(values)}"
        cursor.execute(value)
        connection.commit()

    @staticmethod
    def execute_now_query(connection, table, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        __rows = ''
        for x in rows:
            __rows = f"{__rows}{str(x)}, "
        value = f"UPDATE {table} SET {rows[1]} = '{values[1]}',{rows[2]} = '{values[2]}' ,{rows[3]} = '{values[3]}' " \
                f"WHERE {rows[0]} = '{values[0]}'"
        cursor.execute(value)
        connection.commit()

    # class SQLclass:
    #     def __init__(self, server, database, username, password, table):
    #         self.server = server
    #         self.database = database
    #         self.username = username
    #         self.password = password
    #         self.table = table
    #         self.cursor = self.pyodbc_connect(server=server, database=database, username=username,
    #                                           password=password).cursor()
    #
    #     @staticmethod
    #     def pyodbc_connect(server, database, username, password):
    #         return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' +
    #                               database + ';UID=' + username + ';PWD=' + password +
    #                               ';Trusted_Connection=yes;')
    #
    #     @staticmethod
    #     def pd_read_sql_query(query: str, database: str, table: str, connection):
    #         return pd.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)
    #
    #     @staticmethod
    #     def execute_query(connection, table, rows: list, values: list):
    #         cursor = connection.cursor()
    #         cursor.fast_executemany = True
    #         __rows = ''
    #         for x in rows:
    #             __rows = f"{__rows}{str(x)}, "
    #         value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
    #         # value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
    #         # value = f"INSERT INTO {table} (id_row, device_row, percent_row, time_row, data_row, extra_row)
    #         # VALUES {tuple(values)}"
    #         cursor.execute(value)
    #         connection.commit()

    # # Server variables
    # _server = 'WIN-P4E9N6ORCNP\\ANALIZ_SQLSERVER'
    # _database = 'ruda_db'
    # _username = 'ruda_user'
    # _password = 'ruda_user'
    # _table = 'ruda_table'
    #
    # _date = f'{str(datetime.datetime.now()).split(" ")[0]}'
    # _time = f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}'
    #
    # _rows = ['id_row', 'device_row', 'percent_row', 'time_row', 'data_row', 'extra_row']
    # _values = ['id_row', 'device_row', 'percent_row', f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}',
    #            f'{str(datetime.datetime.now()).split(" ")[0]}', 'extra_row']

    # Read SQL data with Class
    # sql = SQLclass.pyodbc_connect(server=_server, database=_database, username=_username,
    #                               password=_password, table=_table)
    # data = SQLclass.pd_read_sql_query(query='SELECT * FROM', database=_database, table=_table, connection=sql)
    # print(data)
    # print(type(data))
    # for row in data:
    #     print(row)

    # # Read SQL data native
    # connection_native = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + _server + ';DATABASE=' +
    #                                    _database + ';UID=' + _username + ';PWD=' + _password +
    #                                    ';Trusted_Connection=yes;')
    # sql_query_read = pd.read_sql_query(f'SELECT * FROM {_database}.dbo.{_table}', connection_native)
    # print(sql_query_read)
    # print(type(sql_query_read))
    # for row in sql_query_read:
    #     print(row)
    # print(type(row))

    # Write SQL data with Class
    # sql = SQLclass.pyodbc_connect(server=_server, database=_database, username=_username, password=_password)
    # SQLclass.execute_query(connection=sql, table=_table, rows=_rows, values=_values)

    # # Write SQL data native
    # connection_native = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + _server + ';DATABASE=' +
    #                                    _database + ';UID=' + _username + ';PWD=' + _password +
    #                                    ';Trusted_Connection=yes;')
    # cursor = connection_native.cursor()
    # cursor.fast_executemany = True
    # count = cursor.execute(f"""INSERT INTO {_table} (id_row, device_row, percent_row, time_row, data_row, extra_row)
    # VALUES (id_row, device_row, percent_row, '{_time}', '{_date}', extra_row)""").rowcount
    # connection_native.commit()

    def example(self):
        # sql_select_query = f"SELECT * " \
        #                    f"FROM dbtable " \
        #                    f"WHERE CAST(temperature AS FLOAT) >= {temp} AND personid = '6176' OR personid = '25314' OR personid = '931777' OR personid = '5863' " \
        #                    f"ORDER BY date1 DESC, date2 DESC;"
        # sql_select_query = f"SELECT * " \
        #                    f"FROM dbtable " \
        #                    f"WHERE CAST(temperature AS FLOAT) < 37.0 AND date1 BETWEEN '2021-07-25' AND '2021-08-25' " \
        #                    f"ORDER BY date1 DESC, date2 DESC;"
        connect_db = self.pyodbc_connect()
        cursor = connect_db.cursor()
        cursor.fast_executemany = True
        # cursor.execute(sql_select_query)
        data = cursor.fetchall()

connect_db = SQLClass.pyodbc_connect(ip="192.168.15.87", server="DESKTOP-SM7K050", port="1434",
                                     database="thirdpartydb", username="sa", password="pass12345678")
cursor = connect_db.cursor()
cursor.fast_executemany = True
try:
    # check = request.POST['check']
    sql_select_query = f"SELECT * " \
                       f"FROM dbtable " \
                       f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' AND personid = '{personid}' " \
                       f"AND CAST(temperature AS FLOAT) >= 37.0 " \
                       f"ORDER BY date1 DESC, date2 DESC;"
except Exception as error:
    DjangoClass.LoggingClass.logging_errors(request=request, error=error)
    sql_select_query = f"SELECT * " \
                       f"FROM dbtable " \
                       f"WHERE date1 BETWEEN '{date_start}' AND '{date_end}' " \
                       f"AND CAST(temperature AS FLOAT) >= 37.0 " \
                       f"ORDER BY date1 DESC, date2 DESC;"
cursor.execute(sql_select_query)
data = cursor.fetchall()