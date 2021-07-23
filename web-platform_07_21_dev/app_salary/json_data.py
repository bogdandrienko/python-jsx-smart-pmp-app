import json


def create_arr_from_json(json_obj, parent_key: str):
    headers = []
    for x in json_obj[parent_key]["Fields"]:
        headers.append(json_obj[parent_key]["Fields"][x])
    del json_obj[parent_key]["Fields"]
    bodies = []
    for x in json_obj[parent_key]:
        val = [x]
        for y in json_obj[parent_key][x]:
            val.append(json_obj[parent_key][x][y])
        bodies.append(val)
    return [parent_key, headers, bodies]


def data_s():
    with open("static/media/data/zarplata.json", "r", encoding="utf-8") as read_file:
        data = [
            [
                ["1. НАЧИСЛЕНО"],
                ["Вид", "Период", "Дни", "Часы", "Сумма"],
                [
                    ["оклад по часам", "Июн21", 9, 72, 47250.00],
                    ["Доплата за ЗОЖ", "Июн21", None, None, 2362.50],
                    ["Компенсация расходов на оплату питания работникам", "Июн21", None, None, 2250.00],
                ],
            ],
            [
                ["2. УДЕРЖАНО"],
                ["Вид", "Период", "Сумма"],
                [
                    ["Взносы НДП Нур Отан", "Июн21", 298.00],
                    ["за питание", "Июн21", 6800.00],
                    ["ИПН исчисленный", "Июн21", 20101.84],
                ],
            ],
            [
                ["3. ДОХОДЫ В НАТУРАЛЬНОЙ ФОРМЕ"],
                ["Вид", "Период", "Дни", "Часы", "Сумма"],
                [
                    ["Всего натуралных доходов", None, None, None, None],
                ],
            ],
            [
                ["4. ВЫПЛАЧЕНО"],
                ["Вид", "Период", "Сумма"],
                [
                    ["Перечислено в банк (Платежное поручение исходящее 0000005893 от 25.05.21)", "Июн21", 40000.84],
                    ["Перечислено в банк (Платежное поручение исходящее 0000005894 от 10.06.21)", "Июн21", 60250.00],
                    ["Всего выплат", None, 100250.84],
                ],
            ],
            [
                ["5. НАЛОГОВЫЕ ВЫЧЕТЫ"],
                ["Вид", "Период", "Дни", "Часы", "Сумма"],
                [
                    ["Вычет ОПВ", "Июн21", None, None, 27372.49],
                    ["Стандартный 1 МЗП", "Июн21", None, None, 42500.00],
                    ["Всего вычеты", None, None, None, 69872.49],
                ],
            ],
        ]
        data = json.load(read_file)

        # global_objects = []
        # for x in data["global_objects"]:
        #     global_objects.append(x)
        # global_objects = [x for x in data["global_objects"]]

        # return_data = []
        # for x in global_objects:
        #     return_data.append(create_arr_from_json(data["global_objects"], x))
        # return_data = [create_arr_from_json(data["global_objects"], x) for x in global_objects]

        return_data = [create_arr_from_json(data["global_objects"], y) for y in [x for x in data["global_objects"]]]
    return return_data
