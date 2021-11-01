import tkinter
import tkinter as tk
import tkinter.ttk as ttk
from threading import Thread
from time import sleep


def play_func(data: str):
    global play
    play = False
    sleep(0.5)
    play = True

    def whiles():
        print(data)

    thread_render = Thread(target=whiles)
    thread_render.start()
    app.set_title("Завершено")


class Application(tkinter.Frame):
    def __init__(self, root, **kw):
        super().__init__(**kw)
        self.id = 0
        self.iid = 0
        self.root = root
        self.root.title("ожидание")
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.config(background="black")
        self.root.geometry('1280x720')
        self.master.minsize(1280, 720)
        self.master.maxsize(1280, 720)

        self.play_btn = tkinter.Button(self.root, text="Запустить", font="100", command=self.play_button)
        self.play_btn.grid(row=0, column=0, sticky=tkinter.W)
        self.stop_btn = tkinter.Button(self.root, text="Остановить", font="100", command=self.stop_button)
        self.stop_btn.grid(row=0, column=1, sticky=tkinter.W)
        self.quit_btn = tkinter.Button(self.root, text="Выход", font="100", command=self.quit_button)
        self.quit_btn.grid(row=0, column=2, sticky=tkinter.W)

        self.export_label = tkinter.Label(self.root, text="Видеофайл для анализа/ip для анализа", font="100")
        self.export_label.grid(row=1, column=0, sticky=tkinter.W)
        self.export_entry = tkinter.Entry(self.root, font="100")
        self.export_entry.grid(row=1, column=1, sticky=tkinter.W)
        self.export_entry.insert(0, 'video.mp4')

        chk_state = tk.BooleanVar()
        chk_state.set(False)
        chk = ttk.Checkbutton(self.root, text='Выбрать', var=chk_state)
        chk_state.set(False)
        chk.grid(row=2, column=1)

        self.combo = ttk.Combobox(self.root)
        self.combo['values'] = (1, 2, 3, 4, 5, "Text")
        self.combo.current(1)
        self.combo.grid(row=3, column=1, sticky=tkinter.W)

        self.text = tkinter.Text(self.root, font="100")
        self.text.grid(row=4, column=0, sticky=tkinter.W)

    def play_button(self):
        self.set_title("в процессе")
        play_func(data="старт")

    def stop_button(self):
        self.set_title("пауза")
        global play
        play = False

    def quit_button(self):
        self.set_title("выход")
        global play
        play = False
        self.quit()

    def set_title(self, title: str):
        self.root.title(title)


if __name__ == "__main__":
    play = False
    app = Application(tk.Tk())
    thread_main = Thread(target=app.root.mainloop())
    thread_main.start()
