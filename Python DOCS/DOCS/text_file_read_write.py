text = open('text.txt', 'w')
name = 'first'
text.write(name + '\n' + ' - line')
text.close()

with text.write(name + '\n' + ' - line'):
    pass
