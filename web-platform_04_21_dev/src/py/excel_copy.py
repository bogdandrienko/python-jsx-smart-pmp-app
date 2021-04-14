import openpyxl
from openpyxl.descriptors.base import String

old_path = 'C:\\Users\\bogdan\\Desktop\\new\\'
old_file = 'Export.xlsx'
new_path = 'C:\\Users\\bogdan\\Desktop\\new\\'
new_file = 'Import.xlsx'

def get_sheet_value(column = str, row = int):
    return str(sheet[str(str(column)+str(row))].value)

workbook = openpyxl.load_workbook(old_path+old_file)
sheet = workbook.active
A_1 = ['']
B_1 = ['']
G_1 = ['']
for row in range(1, 2155):
    A_1.append(get_sheet_value('A', row))
    B_1.append(get_sheet_value('B', row))
    G_1.append(get_sheet_value('G', row))
workbook = openpyxl.load_workbook(new_path+new_file)
sheet = workbook.active
C_2 = ['']
for row in range(14, 1388):
    C_2.append(get_sheet_value('C', row))


for id_1 in G_1:
    for id_2 in C_2:
        if id_1 == id_2:
            sheet['R'+str(id_2)] = B_1.index(id_1)


            # if B_1[G_1.index(id_1)] == '' or B_1[G_1.index(id_1)] == 'None':
            #     sheet[str(str('R')+str(id_2))] = ''
            # else:
            #     sheet[str(str('R')+str(id_2))] = B_1[id_1]



workbook.save(new_path+new_file)