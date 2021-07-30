import json
import httplib2
import os


def get_data(url='http://192.168.1.158/Tanya_perenos/hs/zp/rl/970801351179/202104'):
    relative_path = os.path.dirname(os.path.abspath('__file__')) + '\\'
    h = httplib2.Http(relative_path + "\\static\\media\\data\\httplib2")
    login = 'zpadmin'
    password = '159159qo'
    h.add_credentials(login, password)
    response, content = h.request(url)
    # return json.loads(content)
    return json.loads("static/media/data/zarplata_temp.json")


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
    data = get_data()
    if data:
        # with open("static/media/data/zarplata.json", "w", encoding="utf-8") as file:
        #     json.dump(data, file, ensure_ascii=False, indent=4)
        pass
    else:
        data = None

    create_arr_from_json(data["global_objects"], "1.Начислено", )


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
