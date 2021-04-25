# Integer(int) - it's value that contains whole number = 1/200/-50/0
integer_1 = 1
integer_2 = 200
integer_3 = -50
integer_4 = 0

print(integer_1, integer_2, integer_3, integer_4)
print(type(integer_1), type(integer_2), type(integer_3), type(integer_4))

if integer_1:
    print('Say TRUTH!')
else:
    print('Say ERROR!')

if integer_2 > 199:
    print('Say TRUTH!')
else:
    print('Say ERROR!')

if integer_3 > 0:
    print('Say ERROR!')
else:
    print('Say NOT TRUTH!')

if integer_4:
    print('Say ERROR!')
else:
    print('Say NOT TRUTH!')
