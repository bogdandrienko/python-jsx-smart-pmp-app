import pyodbc
import pandas
import datetime


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
    def execute_data_query(connection, table, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        __rows = ''
        for x in rows:
            __rows = f"{__rows}{str(x)}, "
        value = f"INSERT INTO {table} (" + __rows[:-2:] + f") VALUES {tuple(values)}"
        cursor.execute(value)
        connection.commit()

    @staticmethod
    def execute_now_query(connection, table, rows: list, values: list):
        cursor = connection.cursor()
        cursor.fast_executemany = True
        __rows = ''
        for x in rows:
            __rows = f"{__rows}{str(x)}, "
        value = f"""UPDATE {table} SET {rows[1]} = '{values[1]}',{rows[2]} = '{values[2]}' WHERE {rows[0]} = '{values[0]}'"""
        cursor.execute(value)
        connection.commit()
