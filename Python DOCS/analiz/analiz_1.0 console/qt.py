import time
import cv2
import numpy
import datetime

if __name__ == "__main__":
    play = True
    video = 'video.mp4'
    cap = cv2.VideoCapture('video.mp4')


    def render_image():
        while True:
            if play:
                try:
                    def render_final():
                        _, src_img = cap.read()
                        src_white = cv2.imread('mask_white.jpg', 0)

                        pre_render_final = cv2.bitwise_and(src_img, src_img, mask=src_white)
                        cvtcolor = cv2.cvtColor(pre_render_final, cv2.COLOR_BGR2HSV)
                        inrange = cv2.inRange(cvtcolor, numpy.array([0, 0, 255 - 115], dtype=numpy.uint8),
                                              numpy.array([255, 115, 255], dtype=numpy.uint8))
                        result = f"{numpy.sum(inrange > 0) / numpy.sum(src_white > 0) * 100 * 1:0.4f}%"
                        date = f'{str(datetime.datetime.now()).split(" ")[0]}'
                        time = f'{str(datetime.datetime.now()).split(" ")[1].split(".")[0]}'
                        print(result, time, date)

                    render_final()
                except Exception as ex:
                    print(ex)
                    with open('log.txt', 'w') as log:
                        log.write(f'\n{ex}\n')
                # Delay between two frames = 50 ms * speed (2x when delay from cycle functions)
                cv2.waitKey(int(100 / 1)) & 0xFF
                # Delay between cycle functions = 0.1 sec * speed
                time.sleep(round(0.2 / 1, 2))
            else:
                cap.release()
                cv2.destroyAllWindows()
                break


    render_image()
