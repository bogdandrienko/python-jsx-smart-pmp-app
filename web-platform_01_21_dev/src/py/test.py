from myclass import Crud

object1 = Crud()

print(object1)

value1 = object1.read()

print(value1)

for item in value1:
    print(item)

for key, item in value1.items():
    print(str(key)+' - '+str(item))
