import numpy as np


pic_min = 532  # Минимальный пик шума в массиве
pic_max = 850  # Максимальный пик шума в массиве
data = []
with open('data_1.txt', 'r+', encoding='utf-8') as file:
    # read_data = file.readline()
    for lines in file:
        line_data = []
        for line in lines.split("\t"):
            try:
                line_data.append(float(line))
            except Exception as ex:
                line_data.append(line)
            print(line)  # 580.7
        data.append(line_data)
        print(lines)  # 580.7	12678.000	12497.000
short_data = data[:1000]
print(short_data)
print(type(short_data))  # <class

#

# print(type(read_data))  # <class 'str'>
# print(read_data)  # Wl	0	501	1001	1501	2002	2502	3002	3503	4003

# short_data = read_data[:1050]
# print(short_data)

# arr_data = short_data
# arr_data = list(map(float, short_data))

# arr_data = list(map(float, short_data.split(' ')))
# print(type(arr_data))  # <class 'str'>
# print(arr_data)  # Wl	0	501	1001	1501	2002	2502	3002	3503	4003



