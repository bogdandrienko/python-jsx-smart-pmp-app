import datetime
import pyodbc
import pandas as pd


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
        return pd.read_sql_query(f'{query} {database}.dbo.{table} ORDER BY id', connection)

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
