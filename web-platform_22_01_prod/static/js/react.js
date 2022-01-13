"use strict";

let listLoader = new XMLHttpRequest();

const delay = async(ms) => await new Promise(resolve => setTimeout(resolve, ms));

function listLoad() {
    listLoader.open('GET', 'http://89.218.132.130:8000/' + 'drf/ideas/', true);
    listLoader.send();
}

listLoader.addEventListener('readystatechange', () => {
    if (listLoader.readyState === 4) {
        if (listLoader.status === 200) {
            let data = JSON.parse(listLoader.responseText);
            let iterations = JSON.parse(listLoader.responseText).length;
            let s = '<table class="table table-bordered table-info table-striped table-hover table-sm"><thead><tr><th scope="col" colspan="1" class="text-center">Автор</th><th scope="col" colspan="1" class="text-center">Дата и время</th><th scope="col" colspan="1" class="text-center">Текст</th></tr></thead><tbody>';
            let d;
            for (let i = 0; i < iterations; i++) {
                d = data[i];
                let datetime;
                datetime = d.created_datetime_field.toString().split('T')
                let date;
                date = datetime[0]
                let time;
                time = datetime[1].split('.')[0]
                s += '<tr><td colspan="1" class="align-bottom text-center">' + d.author_char_field + '</td><td colspan="1" class="align-bottom text-center">' + date + ' ' + time + '</td><td colspan="1" class="align-bottom text-center">' + d.text_field + '</td></tr>';

            }
            s += '</tbody></table>';
            document.getElementById('list').innerHTML = s;
        } else {
            window.alert(listLoader.statusText);
        }
    }
});

listLoad();
window.setInterval(listLoad, 500);