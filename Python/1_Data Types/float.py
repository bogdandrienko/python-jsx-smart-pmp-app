# Float(float) - it's value that contains number with a decimal point = 1.0/200.5/-50.7/0.4
float_1 = 1.0
float_2 = 200.5
float_3 = -50.7
float_4 = 0.4

print(float_1, float_2, float_3, float_4)
print(type(float_1), type(float_2), type(float_3), type(float_4))

if float_1:
    print('Say TRUTH!')
else:
    print('Say ERROR!')

if float_2 < 200:
    print('Say ERROR!')
else:
    print('Say NOT TRUTH!')

if float_3 > 0:
    print('Say ERROR!')
else:
    print('Say NOT TRUTH!')

if float_4:
    print('Say TRUTH!')
else:
    print('Say ERROR!')
