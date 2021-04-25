# Boolean(bool) - it's value that contains two logical values = True/False (1/0)
bool_t = True
bool_f = False

print(bool_t, bool_f)
print(type(bool_t), type(bool_f))

if bool_t:
    print('Say TRUTH!')
else:
    print('Say ERROR!')

if bool_f:
    print('Say ERROR!')
else:
    print('Say NOT TRUTH!')
