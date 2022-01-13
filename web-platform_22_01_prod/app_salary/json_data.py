import json
import httplib2
import os


def get_data(url='http://192.168.1.158/Tanya_perenos/hs/zp/rl/970801351179/202105', month=4):
    url = f'http://192.168.1.158/Tanya_perenos/hs/zp/rl/970801351179/20210{month}'
    relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
    h = httplib2.Http(relative_path + "\\static\\media\\data\\httplib2")
    login = 'zpadmin'
    password = '159159qo'
    h.add_credentials(login, password)
    response, content = h.request(url)
    return json.loads(content)


def get_users(url='http://192.168.1.158/Tanya_perenos/hs/iden/change/20210301', month=1):
    url = f'http://192.168.1.158/Tanya_perenos/hs/zp/rl/970801351179/2021030{month}'
    relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
    h = httplib2.Http(relative_path + "\\static\\media\\data\\httplib2")
    login = 'zpadmin'
    password = '159159qo'
    h.add_credentials(login, password)
    response, content = h.request(url)
    # return json.loads(content)
    with open("static/media/data/accounts.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    return data


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


def create_arr_table(title: str, footer: str, json_obj, exclude: list):
    headers = []
    bodies = []
    footers = []

    for x in json_obj["Fields"]:
        headers.append(json_obj["Fields"][x])
    del json_obj["Fields"]
    bodies = [["", title]]

    if exclude:
        hours = 0
        days = 0
        sum = 0
        for x in json_obj:
            val = [x]
            i = 0
            for y in json_obj[x]:
                i += 1
                if i == exclude[0]:
                    hours += json_obj[x][y]
                    continue
                if i == exclude[1]:
                    days += json_obj[x][y]
                    continue
                if i == len(json_obj[x]):
                    sum += json_obj[x][y]
                val.append(json_obj[x][y])
            bodies.append(val)
        footers = ["", footer, "", hours, days, round(sum, 2)]
    else:
        sum = 0
        for x in json_obj:
            val = [x]
            i = 0
            for y in json_obj[x]:
                i += 1
                if i == len(json_obj[x]):
                    sum += json_obj[x][y]
                val.append(json_obj[x][y])
            bodies.append(val)
        footers = ["", footer, "", round(sum, 2)]

    return [headers, bodies, footers]


def data_s(month=4):
    data = get_data(month=month)

    # data = None
    # with open("static/media/data/zarplata_temp.json", "r", encoding="utf-8") as file:
    #     data = json.load(file)
    # data_s = get_users()
    if data:
        # with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
        #     json.dump(data_s, file, ensure_ascii=False, indent=4)
        pass
    else:
        data = None

    # table_1 = create_arr_from_json(data["global_objects"], "1.Начислено")
    print("")
    print("********************")
    print("")
    print(data["global_objects"])
    print("")
    print("********************")
    print("")
    print(data["global_objects"]["1.Начислено"])
    print("")
    print("********************")
    print("")
    print(data["global_objects"]["1.Начислено"]["Fields"])
    print("")
    print("********************")
    print("")
    print(data["global_objects"]["1.Начислено"]["Fields"]["1"])
    print("")
    print("********************")
    print("")
    try:
        json_obj = data["global_objects"]["3.Доходы в натуральной форме"]
    except Exception as ex:
        data["global_objects"]["3.Доходы в натуральной форме"] = {
            "Fields": {
                "1": "Вид",
                "2": "Период",
                "3": "Дни",
                "4": "Часы",
                "5": "Сумма",
                "6": "ВсегоДни",
                "7": "ВсегоЧасы"
            },
        }

    data = {
        "Table_1": create_arr_table(
            title="1.Начислено", footer="Всего начислено", json_obj=data["global_objects"]["1.Начислено"],
            exclude=[5, 6]
        ),
        "Table_2": create_arr_table(
            title="2.Удержано", footer="Всего удержано", json_obj=data["global_objects"]["2.Удержано"], exclude=[]
        ),
        "Table_3": create_arr_table(
            title="3.Доходы в натуральной форме", footer="Всего натуральных доходов",
            json_obj=data["global_objects"]["3.Доходы в натуральной форме"], exclude=[]
        ),
        "Table_4": create_arr_table(
            title="4.Выплачено", footer="Всего выплат", json_obj=data["global_objects"]["4.Выплачено"], exclude=[]
        ),
        "Table_5": create_arr_table(
            title="5.Налоговые вычеты", footer="Всего вычеты", json_obj=data["global_objects"]["5.Налоговые вычеты"],
            exclude=[]
        ),
        "Down": {
            "first": ["Долг за организацией на начало месяца", data["Долг за организацией на начало месяца"]],
            "last": ["Долг за организацией на конец месяца", data["Долг за организацией на конец месяца"]],
        },
    }
    print(data)
    print("")
    print("********************")
    print("")
    # global_objects = []
    # for x in data["global_objects"]:
    #     global_objects.append(x)
    # global_objects = [x for x in data["global_objects"]]

    # return_data = []
    # for x in global_objects:
    #     return_data.append(create_arr_from_json(data["global_objects"], x))
    # return_data = [create_arr_from_json(data["global_objects"], x) for x in global_objects]

    # return_data = [create_arr_from_json(data["global_objects"], y) for y in [x for x in data["global_objects"]]]

    return data
