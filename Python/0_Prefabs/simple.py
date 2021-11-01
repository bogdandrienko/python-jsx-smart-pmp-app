class Actions:
    def __init__(self):
        pass

    @staticmethod
    def action(first_value, second_value):
        return first_value + second_value


print(Actions.action(10, 30))


class Circle:
    pi = 3.14

    def __init__(self, radius=1):
        self.radius = radius
        self.circle_reference = 2 * self.pi * self.radius

    def get_area(self):
        return self.pi * (self.radius ** 2)

    def get_circle_reference(self):
        return 2 * self.pi * self.radius


circle_1 = Circle(4)
print(circle_1.get_area())
print(circle_1.circle_reference)
print(circle_1.get_circle_reference())


# Классы
class Car:
    wheels_number = 4

    def __init__(self, name, color, year, is_crashed):
        self.name = name
        self.color = color
        self.year = year
        self.is_crashed = is_crashed


mazda_car = Car(name="Mazda CX7", color="red", year=2017, is_crashed=True)
print(mazda_car.name, mazda_car.is_crashed, mazda_car.wheels_number)
bmw_car = Car(name="Mazda", color="black", year=2019, is_crashed=False)
print(bmw_car.name, bmw_car.is_crashed, bmw_car.wheels_number)
print(Car.wheels_number * 3)
