import chardet


def convert_encoding(data: str, new_coding='utf-8'):
    encoding = chardet.detect(data)['encoding']
    _data = data.encode(encoding)
    __data = _data.decode(encoding, data)
    ___data = __data.encode(new_coding)
    return ___data


def find_encoding(data):
    encoding = chardet.detect(data)['encoding']
    return encoding


a = 'РђР»РµРєСЃР°РЅРґСЂР° РџСЂРѕРєРѕС„СЊРµРІР°'
b = a.encode()
c = find_encoding(b)
# c = convert_encoding(a)

print(c)
# print(c)
