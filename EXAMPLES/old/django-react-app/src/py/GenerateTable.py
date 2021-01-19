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