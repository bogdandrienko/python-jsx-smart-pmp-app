import os
from concurrent.futures import ThreadPoolExecutor, as_completed

import httplib2

ips = "192.168.1.207, 192.168.1.208, 192.168.8.220, 192.168.8.221, 192.168.15.131, " \
      "192.168.15.132, 192.168.15.133, 192.168.15.134, 192.168.15.135, 192.168.15.136, " \
      "192.168.2.6, 192.168.2.7, 192.168.23.251, 192.168.16.253, 192.168.5.202, " \
      "192.168.5.203, 192.168.12.207, 192.168.12.208, 192.168.19.253"
# ips = "192.168.12.207, 192.168.12.208"


# TODO action ######################################################################################

def reboot(_ip):
    url = "htt" + f"p://{ip}/ISAPI/System/reboot"
    h = httplib2.Http(
        os.path.dirname(os.path.abspath('__file__')) + "/static/media/data/temp/reboot_terminal"
    )
    login_ = 'admin'
    password_ = 'snrg2017'
    h.add_credentials(login_, password_)
    headers = {
        'Content-type': 'text/plain;charset=UTF-8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 '
                      'Firefox/75.0',
    }
    response_, content = h.request(uri=url, method="PUT", headers=headers)
    return [
        _ip,
        content.decode().split("<moderate_statusString>")[1].split("</moderate_statusString>")[0]
    ]


with ThreadPoolExecutor() as executor:
    futures = []
    for ip in [str(str(x).strip()) for x in ips.split(",")]:
        if len(str(ip)) < 3:
            continue
        futures.append(executor.submit(reboot, ip))
    responses = []
    for future in as_completed(futures):
        responses.append(future.result())

    for i in futures:
        print(i)
