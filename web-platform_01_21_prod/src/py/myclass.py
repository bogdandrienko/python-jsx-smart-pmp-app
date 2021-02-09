class Crud:

    def __init__(self):
        self.id = 1
        self.string = 'Hello World'
        self.integer = 10
        self.float = 5.5

    def create(self, string, integer, float):
        self.string = string
        self.integer = integer
        self.float = float
        return 

    def read(self):
        return {'id': self.id, 'string': self.string, 'integer': self.integer, 'float': self.float}

    def update(self, string, integer, float):
        self.string = string
        self.integer = integer
        self.float = float
        return 

    def delete(self):
        return self


class Car:

    wheels_number = 4

    def __init__(self, name, color, year, is_crashed):
        self.name = name
        self.color = color
        self.year = year
        self.is_crashed = is_crashed
