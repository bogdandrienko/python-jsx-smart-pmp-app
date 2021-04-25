import openpyxl

# читаем excel-файл
wb = openpyxl.load_workbook('Список.xlsx')

# печатаем список листов
sheets = wb.sheetnames
# for sheet in sheets:
# print(sheet)

# получаем активный лист
sheet = wb.active


# печатаем значение ячейки A1
# print(sheet['A1'].value)

def printer(Value):
    cellname1 = "A" + str(Value)
    cellname2 = "B" + str(Value)
    cellname3 = "C" + str(Value)
    name1 = " Фамилия: " + str(sheet[cellname1].value)
    name2 = " Имя: " + str(sheet[cellname2].value)
    name3 = " Отчество: " + str(sheet[cellname3].value)
    if str(name1) != " Фамилия: None":
        print(name1 + name2 + name3)


# Объявление переменной
a = int(input("С кого числа? "))
b = int(input("По какое число?"))

while a < b:
    printer(a)
    a += 1
