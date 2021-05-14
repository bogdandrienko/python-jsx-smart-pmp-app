# String(str) - it's value that contains ordered sequence of characters = "Hi!"/'Word'/"That's"
bool_t = 'Tanker'
bool_f = "I'm a lion! Arrr!"

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
