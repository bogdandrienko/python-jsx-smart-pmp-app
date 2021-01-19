import openpyxl

# читаем excel-файл
wb = openpyxl.load_workbook('Список.xlsx')

# печатаем список листов
sheets = wb.sheetnames
#for sheet in sheets:
    #print(sheet)

# получаем активный лист
sheet = wb.active

# печатаем значение ячейки A1
#print(sheet['A1'].value)

def printer(Value):
    cellName1 = "A" + str(Value)
    cellName2 = "B" + str(Value)
    cellName3 = "C" + str(Value)
    Name1 = " Фамилия: "+ str(sheet[cellName1].value)
    Name2 = " Имя: "+ str(sheet[cellName2].value)
    Name3 = " Отчество: "+ str(sheet[cellName3].value)
    if str(Name1) != " Фамилия: None":
        print(Name1+Name2+Name3)
        

#Объявление переменной
a = int(input("С кого числа? "))
b = int(input("По какое число?"))

while a < b:
    printer(a)
    a = a + 1