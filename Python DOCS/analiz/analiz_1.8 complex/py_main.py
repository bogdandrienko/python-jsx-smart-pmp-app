import sys
import threading

import cv2
import numpy as np

from py_cv import AnalyzeClass
from py_ui import AppContainerClass
from py_utilites import CopyDictionary
from multiprocessing import freeze_support


def play_func(data: dict):
    global play
    try:
        # play = True
        #
        # def play_analyze():
        #     AnalyzeClass.start_analyze(data=CopyDictionary.get_all_sources(data, {'pause': pause}))
        # threading.Thread(target=play_analyze, args=()).start()

        source_img = cv2.imread('picture.jpg', 1)

        AnalyzeClass.render(name=f"source : img", source=source_img, resolution_debug=[640, 480])
    except Exception as ex:
        print(ex)
        with open('log.txt', 'a') as log:
            log.write(f'\n{ex}\n')


# render_shapes('shapes', [640, 480])
# @staticmethod
# def render_shapes(name, resolution_debug):
#     red = (0, 0, 255)
#     green = (0, 255, 0)
#     blue = (255, 0, 0)
#     yellow = (0, 255, 255)
#     np.set_printoptions(threshold=0)
#     img = np.zeros(shape=(512, 512, 3), dtype=np.uint8)
#     cv2.line(
#         img=img,
#         pt1=(0, 0),
#         pt2=(311, 511),
#         color=blue,
#         thickness=10
#     )
#     cv2.rectangle(
#         img=img,
#         pt1=(30, 166),
#         pt2=(130, 266),
#         color=green,
#         thickness=3
#     )
#     cv2.circle(
#         img=img,
#         center=(222, 222),
#         radius=50,
#         color=(255.111, 111),
#         thickness=-1
#     )
#     cv2.ellipse(
#         img=img,
#         center=(333, 333),
#         axes=(50, 20),
#         angle=0,
#         startAngle=0,
#         endAngle=150,
#         color=red,
#         thickness=-1
#     )
#     pts = np.array(
#         [[10, 5], [20, 30], [70, 20], [50, 10]],
#         dtype=np.int32
#     )
#     pts = pts.reshape((-1, 1, 2,))
#     cv2.polylines(
#         img=img,
#         pts=[pts],
#         isClosed=True,
#         color=yellow,
#         thickness=5
#     )
#     cv2.putText(
#         img=img,
#         text="SOL",
#         org=(10, 400),
#         fontFace=cv2.FONT_ITALIC,
#         fontScale=3.5,
#         color=(255, 255, 255),
#         thickness=2
#     )
#     AnalyzeClass.render(name=f"shapes : {name}", source=img, resolution_debug=resolution_debug)

# render_cvtcolor(source_img, cv2.COLOR_RGB2GRAY, 'COLOR_RGB2GRAY', [640, 480])
# render_cvtcolor(source_img, cv2.COLOR_BGR2HSV, 'COLOR_BGR2HSV', [640, 480])
# render_cvtcolor(source_img, cv2.COLORMAP_MAGMA, 'COLORMAP_MAGMA', [640, 480])
# @staticmethod
# def render_cvtcolor(image, color_type, name, resolution_debug):
#     cvtcolor = cv2.cvtColor(image, color_type)
#     AnalyzeClass.render(name=f"cvtcolor : {name}", source=cvtcolor, resolution_debug=resolution_debug)

# render_flip(source_img, 0, 'flip_img=0', [640, 480])
# render_flip(source_img, -1, 'flip_img=-1', [640, 480])
# render_flip(source_img, 1, 'flip_img=1', [640, 480])
# @staticmethod
# def render_flip(image, flipCode, name, resolution_debug):
#     flip = cv2.flip(image, flipCode)
#     AnalyzeClass.render(name=f"flip : {name}", source=flip, resolution_debug=resolution_debug)

# @staticmethod
# def render_final(image, mask, sensitivity_analysis, correct_coefficient, name, resolution_debug):
#     bitwise_and = cv2.bitwise_and(image, image, mask=mask)
#     cvtcolor = cv2.cvtColor(bitwise_and, cv2.COLOR_BGR2HSV)
#     inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - sensitivity_analysis], dtype=numpy.uint8),
#                           numpy.array([255, sensitivity_analysis, 255], dtype=numpy.uint8))
#     cv2.putText(inrange, f"{numpy.sum(inrange > 0) / numpy.sum(mask > 0) * 100 * correct_coefficient:0.2f}%",
#                 (int(1920 / 5), int(1080 / 2)), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 3)
#     AnalyzeClass.render(name=f"final : {name}", source=inrange, resolution_debug=resolution_debug)


def stop_func():
    global play
    play = False


def pause():
    global play
    return play


def quit_func():
    stop_func()
    sys.exit(app_container.app.exec_())


def snapshot_func(data: dict):
    threading.Thread(target=AnalyzeClass.make_snapshot, args=(data,)).start()


if __name__ == "__main__":
    freeze_support()
    play = True
    app_container = AppContainerClass()
    widget = app_container.create_ui(title="analysis", width=300, height=300, icon="icon.ico",
                                     play_f=play_func, stop_f=stop_func, quit_f=quit_func, snapshot_f=snapshot_func)
    ui_thread = threading.Thread(target=widget.show())
    sys.exit(app_container.app.exec_())
