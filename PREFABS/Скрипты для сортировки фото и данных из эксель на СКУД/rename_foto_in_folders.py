import os
import shutil
import tkinter
from fnmatch import fnmatch


def create_dir(dir_name='new folder', current_path=os.path.dirname(os.path.abspath('__file__'))):
    f"""
Create directory with {dir_name} - name in {current_path} - path. And return this full path.
    :param current_path:
    :param dir_name:
    :return: Full path with created directory
    """
    full_path = current_path + f'\\{dir_name}'
    try:
        os.makedirs(full_path)
    except Exception as ex:
        print(ex)
        print('directory already yet')
    finally:
        return full_path


def click_button(source, dest):
    f"""
    Работай!
    """
    print(source)
    print(dest)
    # source_path = os.path.dirname(os.path.abspath('__file__')) + r"\ВЗРЫВ\2020г"
    source_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + source
    # dest_path = os.path.dirname(os.path.abspath('__file__')) + r"\Boom\new"
    dest_path = os.path.dirname(os.path.abspath('__file__')) + '\\' + dest
    try:
        # create_dir(r'Boom\new')
        create_dir(dest)
    except:
        pass

    pattern = '*.jpg'
    directories_ = []
    for root, dirs, files in os.walk(source_path, topdown=True):
        for name in dirs:
            directories_.append(f"{os.path.join(root, name)}")
    files_ = []
    for dir_ in directories_:
        for root, dirs, files in os.walk(dir_, topdown=True):
            for file in files:
                if fnmatch(file, pattern):
                    files_.append(f"{dir_}\\{file}")
    for file in files_:
        index_file = files_.index(file) + 1
        try:
            sub_sub_dir = file.split('\\')[len(file.split('\\')) - 3].split('Взрыв ')[1]
            subdir = file.split('\\')[len(file.split('\\')) - 2]
            file_name = file.split('\\')[len(file.split('\\')) - 1]
            print(file_name)
            ext = file_name[:-4]
            shutil.copyfile(file, f"{dest_path}\\{sub_sub_dir}_{subdir}_{ext}___{index_file}.jpg")
        except Exception as ex:
            print(ex)
    # Тут уже лежат в папке файлы с нужными именами


class Application(tkinter.Frame):
    """

    """

    def __init__(self, root, **kw):
        super().__init__(**kw)
        self.root = root

        # Configure the root object for the Application
        self.root.title("Анализ изображений после взрыва")
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

        # Define the different GUI widgets
        self.export_label = tkinter.Label(self.root, text="Откуда копируем", font="100")
        self.export_label.grid(row=1, column=0, sticky=tkinter.W)

        self.export_entry = tkinter.Entry(self.root, font="100")
        self.export_entry.grid(row=1, column=1, sticky=tkinter.W)
        self.export_entry.insert(0, r"Boom\New")

        self.col_label = tkinter.Label(self.root, text="Куда копируем", font="100")
        self.col_label.grid(row=2, column=0, sticky=tkinter.W)

        self.col_entry = tkinter.Entry(self.root, font="100")
        self.col_entry.grid(row=2, column=1, sticky=tkinter.W)

    def insert_data(self):
        """

        """
        click_button(self.export_entry.get(), self.col_entry.get())


if __name__ == "__main__":
    app = Application(tkinter.Tk())
    app.root.mainloop()
