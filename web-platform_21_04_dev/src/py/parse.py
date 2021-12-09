import csv
from datetime import datetime
import requests
from bs4 import BeautifulSoup


def get_html(url):
    response = requests.get(url)
    return response.text


def get_all_links(html):
    # soup = BeautifulSoup(html, 'lxml')
    # tds = soup.find('table', id='currencies-all').find_all('td', class_='currency-name')
    # links = []
    # for td in tds:
    #     a = td.find('a', class_='currency-name-container').get('href')
    #     link = 'https://coinmarketcap.com' + a
    #     links.append(link)
    # return links
    soup = BeautifulSoup(html, 'lxml')
    tds = soup.find_all('td', class_='heading')
    links = []
    # for td in tds:
    #     a = td.find('a', class_='currency-name-container').get('href')
    #     link = 'https://coinmarketcap.com' + a
    #     links.append(link)
    return tds


def text_before_word(text, word):
    line = text.split(word)[0].strip()
    return line


def get_page_data(html):
    soup = BeautifulSoup(html, 'lxml')
    try:
        name = text_before_word(soup.find('title').text, 'price')
    except:
        name = ''
    try:
        price = text_before_word(soup.find('div', 
class_='col-xs-6 col-sm-8 col-md-4 text-left').text, 'USD')
    except:
        price = ''
    data = {'name': name,
            'price': price}
    return data


def write_csv(i, data):
    with open('coinmarketcap.csv', 'a') as f:
        writer = csv.writer(f)
        writer.writerow((data['name'],
                         data['price']))
        print(i, data['name'], 'parsed')


def main():
    start = datetime.now()
    # url = 'https://coinmarketcap.com/all/views/all'
    url = 'https://openweathermap.org/city/1516601'
    # all_links = get_all_links(get_html(url))
    # all_links = get_all_links(get_html(url))
    # for i, link in enumerate(all_links):
    #     html = get_html(link)
    #     data = get_page_data(html)
    #     write_csv(i, data)
    end = datetime.now()
    total = end - start
    # print(str(total))
    print(str(get_html(url)))
    a = input()

if __name__ == '__main__':
    main()