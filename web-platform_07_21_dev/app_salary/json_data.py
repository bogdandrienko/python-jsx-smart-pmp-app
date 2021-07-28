import json
import httplib2


def get_data(url='http://192.168.1.158/Tanya_perenos/hs/zp/rl/970801351179/202104'):
    h = httplib2.Http("/path/to/cache-directory")
    login = 'zpadmin'
    password = '159159qo'
    h.add_credentials(login, password)
    response, content = h.request(url)
    return content


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

    data = get_data()
    print(data)
    print(type(data))

    try:
        with open(f"static/media/data/zarplata1.json", 'w', encoding='utf-8') as file:
            file.write(data)
    except Exception as ex:
        pass

    try:
        with open(f"static/media/data/zarplata2.json", 'w', encoding='utf-8') as file:
            file.write(data.decode())
    except Exception as ex:
        pass

    try:
        with open(f"static/media/data/zarplata3.json", 'w', encoding='utf-8') as file:
            json.dump(data.decode("utf-8"), file)
    except Exception as ex:
        pass

    print(json.dumps(data.decode()))
    print(type(json.dumps(data.decode())))

    data1 = json.loads(data)
    print(data1)
    print(type(data1))

    # return return_data
    return data1
