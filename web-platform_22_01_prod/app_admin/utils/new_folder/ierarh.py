import pandas as pd
import openpyxl
import xlrd

o_12 = {
    "Отдел управления данными": 121,
    "Отдел информационных технологий": 122,
    "Служба автоматизации": 123,
    "Отдел стандартизации и метрологии": 124,
    "Отдел управления проектами и бережливого производства": 125,

}
guide = {
    "Председатель правления": 1,
    "Директор по цифровым технологиям и стратегическому развитию": 12,
    "Технический директор": 11,
    "GR director": 17,
    "Коммерчесикий директор": 13,
    "Главный бухгалер": 114,
    "Финансовый директор": 14,
    "Служба управления персоналом": 15,
    "Заместитель финансового директора по инвестиционным проектам": 142,
    "Заместитель коммерческого директора": 131,
    "Заместитель коммерческого директора по складской логистике": 132,
    "Советник технического директора по строительству": 112,
    "Заместитель технического директора по производству": 111
}

# for lst in guide:
#     print(list(guide.items()))
#
# for pr in guide:
#     print(str(pr))


o_11 = {
    "Заместитель техничего директора по производству": 111,
    "Советник технического директора по строительству": 112,
    "Служба охраны труда  и промышленной безопастности": 113,
    "Технический отдел": 114,
    "Геологический отдел": 115,
    "Негосударственная противопожарная служба": 116,
    "Строительно конструкторский отдел": 119,
    "Автотранспортное п/п ": 1113,
    "Горно-транспортный комплекс": 1114,
    "Обогатительный комплекс": 1115,
    "Энергоуправление": 1116,
    "Маркшейдерский отдел": 117,
    "Отдел главного механика": 118,

}

o_13 = {
    "Заместитель коммерческого директора ": 131,
    "Заместитель коммерческого директора по складской логистике": 132,
    "Отдел сбыта": 1311,
    "Отдел внешнеэкономической деятельности": 1312,
    "Отдел закупок": 1313,
    "Группа по развитию казахстанского содержния ": 13131,
    "Складское хозяйство": 1321
}

o_14 = {
    "Центральная бухгалтерия": 1411,
    "Заместитель финансового директора по инвестиционным проектом": 142,
    "Контрольно-ревизионный отдел": 143,
    "Финансовый отдел": 144,
    "Планово- экономический отдел": 145

}

o_15 = {
    "Служба управления персоналом ": 151,
    "Отдел огранизации труда и заработной платы": 1511,
    "Отдел кадров": 1512,
    "Учебный центр": 1513,
    "Отдел оценки и развития персонала": 1514
}

o_16 = {
    "Служба управления делами": 16,
    "Отдел физической культуры и спорта": 161,
    "Административно хозяйственный отдел": 162

}

atp = {
    "Начальник": 1113,
    "Заместитель начальника": 11131,
    "Начальник службы по эксплуатации транспорта": 111311,
    "Главный инженер": 111312,
    "Отдел по экономике и развитию": 111313,
    "Цех вспомогательного транспорта| Начальник отдела": 111311,

}
book = xlrd.open_workbook('BI 2000 в лицо.xls')
sheet = book.sheet_by_name('Родство')
data = [[sheet.cell_value(r, c) for c in range(sheet.ncols)] for r in range(sheet.nrows)]
# Profit !
print(data)

# lst_1 = []
# lst_2 = []
# lst_3 = []
# excel_df = pd.read_excel('BI 2000 в лицо.xls', sheet_name='Личные данные', usecols=(range(24, 28)))
#
# excel_df.to_excel('111.xls')

# with pd.ExcelWriter('test1.xlsx', mode='a', engine='openpyxl') as writer:
#     excel_df.to_excel(writer, )
#
# for val1 in o_11:
#     lst_1.append(excel_df)
# excel_sheets =
# for x in range(1, employees_sheet.max_row+1):
#     print(employees_sheet.cell(row=x, column=1).value)