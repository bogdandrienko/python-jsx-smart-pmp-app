import os
import matplotlib
import numpy
import numpy as np
import matplotlib.pyplot as plt
from skimage import exposure, io, filters, data
import numpy as np
from skimage import data
import matplotlib.pyplot as plt
# %matplotlib inline

# image = data.camera()
# import_file = io.imread('https://scipy-lectures.org/_images/sphx_glr_plot_camera_001.png')
import_file = io.imread('Безымянный.png')
# type(image)
# numpy.ndarray  # Изображение - это массив NumPy

image = import_file
mask = image < 90
image[mask] = 255
# plt.imshow(image, cmap='gray')
# plt.show()
plt.imsave(f'{os.path.dirname(os.path.abspath("__file__"))}\\local.png', arr=image)

# def arrays(multi):
#     check = np.zeros((multi + 8, multi + 8))
#     check[::multi + 1, ::multi + 1] = 1
#     check[1::multi + 1, 1::multi + 1] = 1
#     return check
#
#
# multiplayer = 5
# check = arrays(1)
# # result_1 = plt.matshow(check, cmap='binary')
# result_2 = plt.imshow(check, cmap='binary', interpolation='nearest')
# plt.imsave(f'{os.path.dirname(os.path.abspath("__file__"))}\\local.png', arr=check)
# plt.show()

# camera = data.camera()
# val = filters.threshold_otsu(import_file_2)
# mask = camera < val

# io.imsave('local_logo.png', import_file)
# result_2 = plt.imshow(check, cmap='gray', interpolation='nearest')
# plt.show()
# plt.imsave(check, 'local_logo.png')
# plt.imsave(result, f'{os.path.dirname(os.path.abspath("__file__"))}\\local.png', check['GroupColor'])


# camera = data.camera()
# val = filters.threshold_otsu(import_file)
# mask = camera < val
#
# export_file = filters.sobel(import_file)
# export_file = exposure.equalize_hist(import_file)
# # export_file = mask
# io.imsave('local_logo.png', export_file)
