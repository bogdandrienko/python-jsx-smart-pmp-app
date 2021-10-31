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

import time
from functools import wraps


def measure_time(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f'Executed {func} in {elapsed:0.4f} seconds')
        return result

    return wrap


def async_measure_time(func):
    @wraps(func)
    async def wrap(*args, **kwargs):
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f'Executed {func} in {elapsed:0.4f} seconds')
        return result

    return wrap


import pyttsx3


class Voice:

    def __init__(self, obj_id=0, volume=1.0, rate=200, voice=None, voices=None):
        self.engine = pyttsx3.init()
        self.volume = volume
        self.rate = rate
        self.voice = voice
        self.voices = voices
        self.obj_id = obj_id
        self.properties = [self.volume, self.rate, self.voice, self.voices]

    @staticmethod
    def speak(text: str = 'Inicialization successfull.'):
        pyttsx3.speak(text)

    @staticmethod
    async def async_speak(text: str = 'Inicialization successfull.'):
        await pyttsx3.speak(text)
        return text

    def say(self, text: str = 'Inicialization successfull.'):
        self.engine.say(text)
        self.engine.runAndWait()

    def get_property(self, name='volume'):
        return self.engine.getProperty(name)

    def get_properties(self):
        return [self.engine.getProperty(name) for name in self.properties]

    def set_property(self, name='volume', value=1.0):
        self.engine.setProperty(name, value)

    def set_properties(self, volume=1.0, rate=200):
        self.set_property(self.properties[0], volume)
        self.set_property(self.properties[1], rate)


if __name__ == '__main__':
    # Not create class:
    Voice.speak()
    Voice.speak('Приветики!')
    # With create class:
    voice = Voice()
    voice.say()
    voice.say('Я уничтожу человечество!!!')
