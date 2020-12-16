
def i_am_a_loop(value, multiplayer):
    while value > multiplayer:
        value = value - multiplayer
    return value


print(i_am_a_loop(29, 5))