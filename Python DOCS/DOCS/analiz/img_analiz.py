from skimage import io
import cv2
from matplotlib import pyplot as plt

img = io.imread('Безымянный.png')
edges = cv2.Canny(img, 50, 50, apertureSize=3, L2gradient=True)
plt.imsave('Безымянный_линии.png', edges)
