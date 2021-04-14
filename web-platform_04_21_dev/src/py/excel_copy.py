
import openpyxl

old_path = 'C:\\Users\\bogdan\\Desktop\\new\\'
old_file = 'Export.xlsx'
new_path = 'C:\\Users\\bogdan\\Desktop\\new\\'
new_file = 'Import.xlsx'
A_1 = []
C_1 = []
ID_1 = []
ID_2 = []

def get_sheet_value(column = str, row = int):
    return str(sheet[str(str(column)+str(row))].value)

workbook = openpyxl.load_workbook(old_path+old_file)
sheet = workbook.active
for num in range(1, 2155):
    A_1.append(get_sheet_value('A', num))
    C_1.append(get_sheet_value('C', num))
    ID_1.append(get_sheet_value('G', num))

workbook = openpyxl.load_workbook(new_path+new_file)
sheet = workbook.active
for num in range(1, 1387):
    ID_2.append(get_sheet_value('C', num))

for id_1 in ID_1:
    value_1 = ID_1.index(id_1)
    for id_2 in ID_2:
        value_2 = ID_2.index(id_2)+1
        if id_1 == id_2:
            try:
                if C_1[value_1] == 'None' or C_1[value_1] == '':
                    sheet['R'+str(value_2)] = ''
                else:
                    sheet['R'+str(value_2)] = C_1[value_1]
                if A_1[value_1] == 'None' or A_1[value_1] == '':
                    sheet['S'+str(value_2)] = ''
                else:
                    sheet['S'+str(value_2)] = A_1[value_1]
                print('.')
            except:
                print('error')

workbook.save(new_path+new_file)