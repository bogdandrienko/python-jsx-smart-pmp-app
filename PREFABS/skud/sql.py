import pyodbc as pyodbc
conn_str = (
        r'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:' + '192.168.15.87' + '\\' + 'DESKTOP-SM7K050' + ',' + '1434' +
        ';DATABASE=' + 'thirdpartydb' + ';UID=' + 'sa' + ';PWD=' + 'skud12345678' + ';'
)
conn_db = pyodbc.connect(conn_str)
cursor = conn_db.cursor()
cursor.fast_executemany = True
sql_select_query = f"SELECT * " \
                   f"FROM dbtable " \
                   f"WHERE personid = '931777' " \
                   f"ORDER BY date1 DESC, date2 DESC;"
cursor.execute(sql_select_query)
data = cursor.fetchall()
index = 0
for i in data:
    index = index + 1
    print(f"{index}: {i}")
