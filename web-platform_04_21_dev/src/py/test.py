class RationalModel():
    rational_name = 'ivan'
    rational_place_innovation = f'uploads/rational/{rational_name}/'

    def name(self):
        return self.rational_place_innovation
a = RationalModel
# print(RationalModel.name(a))


bool_value = True
float_value = 10.5
integer_value = 10
string_value = 'hello'
list_value = ["Hi!", 100, 10.5]
dict_value = {'maxLevel': 80, "currentLevel": 79.5}
tuple_value = (100, 'experience', "maximum")
set_value = {'exp', 100.5, "12"}

# Проверка на тип переменной:
def check_type_of_variable(variable):
    return type(variable)

print(check_type_of_variable(set_value))
