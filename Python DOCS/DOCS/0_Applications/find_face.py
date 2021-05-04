import tkinter
import os
import cv2
from fnmatch import fnmatch
from threading import Thread
from time import sleep
from skimage import io


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
    except:
        print('directory already yet')
    finally:
        return full_path


def click_button(input_path='input', output_path='output', width_add='0', height_add='0', windows='да', width='640', height='480'):
    global play
    _input_path = create_dir(input_path)
    _output_path = create_dir(output_path)
    play = False
    sleep(0.25)
    play = True
    app.root.config(background="red")
    pattern = '*.JPG'

    def crop_img(input_file='input.jpg', output_file='output.jpg'):
        try:
            os.remove('local.jpg')
        except:
            pass
        src_img = io.imread(input_file)
        # cv2 не читает кириллицу
        # src_img = cv2.imread(input_file, 1)
        output = None
        gray_img = cv2.cvtColor(src_img, cv2.COLOR_BGR2GRAY)
        haar_face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
        faces = haar_face_cascade.detectMultiScale(gray_img)
        for (x, y, w, h) in faces:
            # output = cv2.rectangle(src_img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            print(f'x={x} | y={y} | h={h} | w={w}')
            output = src_img[int(y - int(height_add)):int(y + h + int(height_add)), int(x - int(width_add)):int(x + w + int(width_add))]
            # output = src_img[:, :]
        try:
            os.remove(output_file)
        except:
            pass
        io.imsave(output_file, output)
        os.remove(input_file)
        # cv2 не записывает кириллицу
        # cv2.imwrite(output_file, output)
        print(output_file)
        if windows == 'да' or windows == 'Да':
            render('img', output, width, height)

    def loop():
        for path, subdirs, files in os.walk(_input_path):
            for name in files:
                if fnmatch(name, pattern) and play:
                    try:
                        crop_img(f'{_input_path}\\{name}', f'{_output_path}\\{name}')
                    except:
                        print(f'{_input_path}\\{name} error to {_output_path}\\{name}')

    thread_render = Thread(target=loop)
    thread_render.start()


def render(name='output', source=None, width='640', height='480'):
    img = cv2.resize(source, (int(width), int(height)), interpolation=cv2.INTER_AREA)
    cv2.imshow(name, img)


def quit_button():
    global play
    play = False
    cv2.destroyAllWindows()
    app.root.config(background="green")
    app.quit()


class Application(tkinter.Frame):
    def __init__(self, root, **kw):
        super().__init__(**kw)
        self.root = root
        self.root.title("Анализ видеоданных")
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.config(background="black")
        self.root.geometry('640x480')
        self.master.minsize(640, 480)
        self.master.maxsize(640, 480)
        self.id = 0
        self.iid = 0

        self.submit_button = tkinter.Button(self.root, text="Запустить", font="100", command=self.insert_data)
        self.submit_button.grid(row=0, column=0, sticky=tkinter.W)

        self.exit_button = tkinter.Button(self.root, text="Выход", font="100", command=quit_button)
        self.exit_button.grid(row=0, column=1, sticky=tkinter.W)

        self.input_label = tkinter.Label(self.root, text="input", font="100")
        self.input_label.grid(row=1, column=0, sticky=tkinter.W)
        self.input_entry = tkinter.Entry(self.root, font="100")
        self.input_entry.grid(row=1, column=1, sticky=tkinter.W)
        self.input_entry.insert(0, 'input')

        self.output_label = tkinter.Label(self.root, text="output", font="100")
        self.output_label.grid(row=2, column=0, sticky=tkinter.W)
        self.output_entry = tkinter.Entry(self.root, font="100")
        self.output_entry.grid(row=2, column=1, sticky=tkinter.W)
        self.output_entry.insert(0, 'output')

        self.additions_w_label = tkinter.Label(self.root, text="w+", font="100")
        self.additions_w_label.grid(row=3, column=0, sticky=tkinter.W)
        self.additions_w_entry = tkinter.Entry(self.root, font="100")
        self.additions_w_entry.grid(row=3, column=1, sticky=tkinter.W)
        self.additions_w_entry.insert(0, '0')

        self.additions_h_label = tkinter.Label(self.root, text="h+", font="100")
        self.additions_h_label.grid(row=4, column=0, sticky=tkinter.W)
        self.additions_h_entry = tkinter.Entry(self.root, font="100")
        self.additions_h_entry.grid(row=4, column=1, sticky=tkinter.W)
        self.additions_h_entry.insert(0, '0')

        self.render_label = tkinter.Label(self.root, text="Рендерить окна (да/нет)", font="100")
        self.render_label.grid(row=5, column=0, sticky=tkinter.W)
        self.render_entry = tkinter.Entry(self.root, font="100")
        self.render_entry.grid(row=5, column=1, sticky=tkinter.W)
        self.render_entry.insert(0, 'нет')

        self.width_label = tkinter.Label(self.root, text="Ширина", font="100")
        self.width_label.grid(row=6, column=0, sticky=tkinter.W)
        self.width_entry = tkinter.Entry(self.root, font="100")
        self.width_entry.grid(row=6, column=1, sticky=tkinter.W)
        self.width_entry.insert(0, '640')

        self.height_label = tkinter.Label(self.root, text="Высота", font="100")
        self.height_label.grid(row=7, column=0, sticky=tkinter.W)
        self.height_entry = tkinter.Entry(self.root, font="100")
        self.height_entry.grid(row=7, column=1, sticky=tkinter.W)
        self.height_entry.insert(0, '480')

    def insert_data(self):
        click_button(self.input_entry.get(), self.output_entry.get(), self.additions_w_entry.get(),
                     self.additions_h_entry.get(), self.render_entry.get(), self.width_entry.get(),
                     self.height_entry.get())


if __name__ == "__main__":
    play = True
    app = Application(tkinter.Tk())
    start = app.root.mainloop
    thread_main = Thread(target=app.root.mainloop())
    thread_main.start()
