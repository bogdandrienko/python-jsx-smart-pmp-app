import tkinter
import openpyxl
import os


def click_button(export_file='', import_file=''):
    """

    :param export_file:
    :param import_file:
    """
    app.root.config(background="red")
    print('start')
    relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
    export_path = relative_path + export_file
    import_path = relative_path + import_file
    workers_from_1c = []
    workers_from_db = []

    workbook = openpyxl.load_workbook(export_path)
    sheet = workbook.active
    for num in range(1, 5000):
        worker_list = []
        for x in 'ABCDEFGHM':
            value = get_sheet_value(x, num, sheet=sheet)
            if value == 'None' or value is None or value == '':
                value = ''
            worker_list.append(value)
        worker_id = Worker(*worker_list)
        workers_from_1c.append(worker_id)
    workbook.close()

    workbook = openpyxl.load_workbook(import_path)
    sheet = workbook.active
    for num in range(14, 5000):
        workers_from_db.append(get_sheet_value('C', num, sheet=sheet))
    # List comprehension
    # workers_from_db = [get_sheet_value('C', num, sheet=sheet) for num in range(14, 5000)]

    for worker_from_1C in workers_from_1c:
        for worker_from_DB in workers_from_db:
            if worker_from_1C.get_worker_id() == worker_from_DB:
                for x in 'RSTBAUCVF':
                    try:
                        set_sheet_value(x, workers_from_db.index(worker_from_DB) + 14,
                                        worker_from_1C.get_worker_value('RSTBAUCVF'.index(x)), sheet=sheet)
                    except:
                        pass

    workbook.save(import_file)
    workbook.close()
    app.root.config(background="green")
    print('complete')


def input_integer_value(description):
    """

    :param description:
    :return:
    """
    while True:
        try:
            value_ = round(int(input(f'{description}')))
            if value_ > 0:
                break
        except:
            print('Ошибка, введите ещё раз.')
    return value_


def get_sheet_value(column, row, sheet=None):
    """

    :param sheet:
    :param column:
    :param row:
    :return:
    """
    return str(sheet[str(column) + str(row)].value)


def set_sheet_value(column, row, value_, sheet=None):
    """

    :param sheet:
    :param column:
    :param row:
    :param value_:
    """
    if value_:
        sheet[str(column) + str(row)] = value_
    else:
        sheet[str(column) + str(row)] = ''


class Application(tkinter.Frame):
    """

    """

    def __init__(self, root, **kw):
        super().__init__(**kw)
        self.root = root

        # Configure the root object for the Application
        self.root.title("Сравнение фото")
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.config(background="black")
        self.root.geometry('320x240')
        self.master.minsize(320, 240)
        self.master.maxsize(320, 240)
        self.id = 0
        self.iid = 0

        self.submit_button = tkinter.Button(self.root, text="Запустить", font="100", command=self.insert_data)
        self.submit_button.grid(row=0, column=0, sticky=tkinter.W)

        self.exit_button = tkinter.Button(self.root, text="Выход", font="100", command=self.root.quit)
        self.exit_button.grid(row=0, column=1, sticky=tkinter.W)

        # Define the different GUI widgets
        self.export_label = tkinter.Label(self.root, text="Файл экспорта", font="100")
        self.export_label.grid(row=1, column=0, sticky=tkinter.W)

        self.export_entry = tkinter.Entry(self.root, font="100")
        self.export_entry.grid(row=1, column=1, sticky=tkinter.W)

        self.import_label = tkinter.Label(self.root, text="Файл импорта", font="100")
        self.import_label.grid(row=2, column=0, sticky=tkinter.W)

        self.import_entry = tkinter.Entry(self.root, font="100")
        self.import_entry.grid(row=2, column=1, sticky=tkinter.W)

        # self.import_label = tk.Listbox(self.root, text="Файл импорта", font="100")
        # self.import_label.grid(row=2, column=0, sticky=tk.W)

    def insert_data(self):
        """

        """
        click_button(self.export_entry.get(), self.import_entry.get())


class Worker:
    """
    Класс, который содержит в себе работника, со значениями по строке
    """

    def __init__(self, A_1='', B_1='', C_1='', D_1='', E_1='', F_1='', G_1='', H_1='', M_1=''):
        # Подразделение
        self.A_1 = A_1
        # Цех или Служба
        self.B_1 = B_1
        # Отдел или участок
        self.C_1 = C_1
        # Фамилия
        self.D_1 = D_1
        # Имя
        self.E_1 = E_1
        # Отчество
        self.F_1 = F_1
        # Табельный №
        self.G_1 = G_1
        # Категория
        self.H_1 = H_1
        # Пол
        self.M_1 = M_1

    def print_worker(self):
        """

        """
        print(f'{self.A_1}+{self.B_1}+{self.C_1}+{self.D_1}+{self.E_1}+{self.F_1}+{self.G_1}+{self.H_1}+{self.M_1}')

    def get_worker_value(self, index):
        """

        :param index:
        :return:
        """
        value_ = list((self.A_1, self.B_1, self.C_1, self.D_1, self.E_1, self.F_1, self.G_1, self.H_1, self.M_1))
        return value_[index]

    def get_worker_id(self):
        """

        :return:
        """
        return self.G_1


if __name__ == "__main__":
    app = Application(tkinter.Tk())
    app.root.mainloop()
