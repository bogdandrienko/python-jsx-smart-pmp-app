import openpyxl

old_path = r'E:\WORK\Система контроля и учета доступа\СКУД\1. Добавление и удаление персонала'
old_file = r'\Export.xlsx'
new_path = r'E:\WORK\Система контроля и учета доступа\СКУД\1. Добавление и удаление персонала'
new_file = r'\Import.xlsx'
A_1 = []
C_1 = []
ID_1 = []
ID_2 = []

def get_sheet_value(column = str, row = int):
    return str(sheet[str(str(column)+str(row))].value)

workbook = openpyxl.load_workbook(old_path+old_file)
sheet = workbook.active
for num in range(1, 2156):
    A_1.append(get_sheet_value('A', num))
    C_1.append(get_sheet_value('C', num))
    ID_1.append(get_sheet_value('G', num))

workbook = openpyxl.load_workbook(new_path+new_file)
sheet = workbook.active
for num in range(1, 1388):
    ID_2.append(get_sheet_value('C', num))

i = 1
for id_1 in ID_1:
    for id_2 in ID_2:
        if id_1 == id_2:
            try:
                if C_1[ID_1.index(id_1)] == 'None' or C_1[ID_1.index(id_1)] == '':
                    sheet['R'+str(ID_2.index(id_2)+1)] = ''
                else:
                    sheet['R'+str(ID_2.index(id_2)+1)] = C_1[ID_1.index(id_1)]
                if A_1[ID_1.index(id_1)] == 'None' or A_1[ID_1.index(id_1)] == '':
                    sheet['S'+str(ID_2.index(id_2)+1)] = ''
                else:
                    sheet['S'+str(ID_2.index(id_2)+1)] = A_1[ID_1.index(id_1)]
                print(i)
                i = i+1
            except:
                print('error')
sheet['S'+str(1)] = ''
workbook.save(new_path+new_file)
workbook.close()