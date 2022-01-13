def Калькулятор (
    #Импорты
    import sys, math
    from colorama import init, Fore, AnsiToWin32
    init(wrap=False)
    stream = AnsiToWin32(sys.stderr).stream
    #Функция расчёта
    def mathematic(firstValue, argument, secondValue):
        result = str('Вы ввели некорректное действие')
        if argument=='*':
            result = int(firstValue * secondValue)
        if argument=='/':
            if secondValue == 0:
                while secondValue == 0:
                    print('Делитель равен нулю!')
                    secondValue = int(input("Введите  второе число: "))           
            if secondValue != 0:
                result = firstValue / secondValue
            if result > int(result):
                result = float(result)
            if result == int(result):
                result = int(result)
        if argument=='+':
            result = int(firstValue + secondValue)
        if argument=='-':
            result = int(firstValue - secondValue)
        if argument=='%':
            result = str(int(firstValue * secondValue / 100)) + '%'
        if argument=='**':
            result = int(firstValue ** secondValue)
        if argument=='^':
            result = 'Корень из первого числа:  ' + str(math.sqrt(firstValue)) + '     Корень из второго числа:  ' + str(math.sqrt(secondValue))
        return result
    #Цикл
    while True:
        print(Fore.YELLOW + '', file=stream)
        a = int(input("Введите первое число: "))
        print(Fore.GREEN + '', file=stream)
        b = str(input("Введите действие: "))
        print(Fore.BLUE + '', file=stream)
        c = int(input("Введите второе число: "))
        print(Fore.RED + '', file=stream)
        print('Ответ: ' + str(mathematic(a, b, c)))
        print(Fore.RESET + '', file=stream)
        if str.lower(str(input("Выйти?(N/n)"))) == "n":
            break
    )
def Таймер (
    #Импорты
    import time

    #Отрисовка
    def render(sec, min, hour):
        print(str(hour)+' : '+str(min)+' : '+str(sec))

    #Тик
    def tick(seconds,  multiplayerSeconds):
        seconds = seconds + int(multiplayerSeconds)
        return seconds
    #ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
    seconds = float(0)
    minuts = float(0)
    hours = float(0)
    #ЦИКЛ
    while True:
        seconds = tick(seconds, 1)
        if seconds > 59:
            seconds = float(0)
            minuts = minuts + int(1)
            if minuts > 59:
                minuts = float(0)
                hours = hours + int(1)
                if hours > 24:
                    hours = float(0)
                    minuts = float(0)
                    seconds = float(0)
        render(int(seconds), int(minuts), int(hours))
        time.sleep(1.0)
    )

    from tkinter import *  
  
  
def clicked():  
    res = "Привет {}".format(txt.get())  
    lbl.configure(text=res)  
  
  
window = Tk()  
window.title("Добро пожаловать в приложение PythonRu")  
window.geometry('1920x1080')  
lbl = Label(window, text="Привет")  
lbl.grid(column=0, row=0)  
txt = Entry(window,width=10)  
txt.grid(column=1, row=0)  
btn = Button(window, text="Клик!", command=clicked)  
btn.grid(column=2, row=0)  
window.mainloop()

#Импорты
import random, time
from tkinter import *  

#Функция получения случайного числа
def getValue(MaxValue):
    return random.randint(1,int(MaxValue))

#Объявление и ввод      
#a = int(input("Введите максимальное число: "))

#Вывод в консоль
#print(getValue(a))

{
  "Ключ1": 'значение',
  "Ключ2": 2,
  "Ключ3": True
}

import tkinter as tk
import tkinter.ttk as ttk

class Application(tk.Frame):
    def __init__(self, root):
        self.root = root
        self.initialize_user_interface()

    def initialize_user_interface(self):
        # Configure the root object for the Application
        self.root.title("Попытка в приложение")
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.config(background="black")
        self.root.geometry('1280x720')

        # Define the different GUI widgets
        self.SurnameNumber_label = tk.Label(self.root, text="Фамилия:", font="100")
        self.SurnameNumber_entry = tk.Entry(self.root, font="100")
        self.SurnameNumber_label.grid(row=0, column=0, sticky=tk.W)
        self.SurnameNumber_entry.grid(row=0, column=0)
        
        self.NameName_label = tk.Label(self.root, text="Имя:", font="100")
        self.NameName_entry = tk.Entry(self.root, font="100")
        self.NameName_label.grid(row=1, column=0, sticky=tk.W)
        self.NameName_entry.grid(row=1, column=0)

        self.PatronymicName_label = tk.Label(self.root, text="Отчество:", font="100")
        self.PatronymicName_entry = tk.Entry(self.root, font="100")
        self.PatronymicName_label.grid(row=2, column=0, sticky=tk.W)
        self.PatronymicName_entry.grid(row=2, column=0)

        self.submit_button = tk.Button(self.root, text="Добавить", font="100", command=self.insert_data)
        self.submit_button.grid(row=2, column=1, sticky=tk.W)

        self.exit_button = tk.Button(self.root, text="Выход", font="100", command=self.root.quit)
        self.exit_button.grid(row=0, column=1, sticky=tk.W)

        # Set the treeview
        self.tree = ttk.Treeview(self.root, columns=('№', 'Фамилия:', 'Имя:', 'Отчество:'))

        # Set the heading (Attribute Names)
        self.tree.heading('#0', text='№')
        self.tree.heading('#1', text='Фамилия')
        self.tree.heading('#2', text='Имя')
        self.tree.heading('#3', text='Отчество')

        # Specify attributes of the columns (We want to stretch it!)
        self.tree.column('#0', stretch=tk.YES)
        self.tree.column('#1', stretch=tk.YES)
        self.tree.column('#2', stretch=tk.YES)
        self.tree.column('#3', stretch=tk.YES)

        self.tree.grid(row=3, columnspan=4, sticky='nsew')
        self.treeview = self.tree

        self.id = 0
        self.iid = 0

    def insert_data(self):
        self.treeview.insert('', 'end', iid=self.iid, text=str(self.id+1),
                             values=(self.SurnameNumber_entry.get(), self.NameName_entry.get(), self.PatronymicName_entry.get()))
        self.iid = self.iid + 1
        self.id = self.id + 1

app = Application(tk.Tk())
app.root.mainloop()