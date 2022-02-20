import numpy as np
import cv2
import time

video = 'video.mp4'
color = (255, 0, 0)
thickness = 2
scale_percent = 40
speed = 360
_cap = cv2.VideoCapture(video)
while True:
    _ret1, _frame1 = _cap.read()
    width = int(_frame1.shape[1] * scale_percent / 100)
    height = int(_frame1.shape[0] * scale_percent / 100)
    dim = (width, height)
    _frame1 = cv2.resize(_frame1, dim, interpolation=cv2.INTER_AREA)
    # _frame1 = _frame1[100:-100, 100:-100]
    cv2.imshow('_frame1', _frame1)
    time.sleep(1 / speed)
    _ret2, _frame2 = _cap.read()
    _frame2 = cv2.resize(_frame2, dim, interpolation=cv2.INTER_AREA)
    # _frame2 = _frame2[100:-100, 100:-100]
    img_diff = cv2.absdiff(_frame1, _frame2)
    img_gray = cv2.cvtColor(img_diff, cv2.COLOR_BGR2GRAY)
    cv2.imshow('img_gray', img_gray)
    blur = cv2.GaussianBlur(img_gray, (21, 21), 0)
    _ret3, thresh = cv2.threshold(blur, 200, 255, cv2.THRESH_OTSU)
    cv2.imshow('thresh', thresh)
    img_weight = cv2.addWeighted(_frame1, 0.9, img_diff, 0.1, 0)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    img_final = cv2.addWeighted(_frame1, 0.9, img_diff, 0.1, 0)
    for c in contours:
        rect = cv2.boundingRect(c)
        x, y, w, h = cv2.boundingRect(c)
        if abs(w) >= 100 and abs(h) >= 100:
            img_weight = cv2.drawContours(img_weight, c, -1, color, thickness)
            img_final = cv2.rectangle(img_weight, (x, y), (x + w, y + h), (0, 0, 255), 2)

    cv2.imshow('img_final', img_final)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
_cap.release()
cv2.destroyAllWindows()
