import random
from openpyxl import Workbook


col = str(input('Выберите букву стобца'+ "\n"))
number = int(input('количество паролей?'+ "\n"))
length = int(input('длина пароля?'+ "\n"))

wb = Workbook()
sheet = wb.active
chars = '+-/*!&$#?=@<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
sheet[f'{col}1'] = 'Пароль'

for n in range(2, number + 1):
    password = ''
    for i in range(1, length + 1):
        password += random.choice(chars)
    sheet[f'{col}{n}'] = password

wb.save('static/media/tempates/password.xlsx')
