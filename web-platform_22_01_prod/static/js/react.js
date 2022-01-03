"use strict";

class CustomServise {

    // вывод в консоль
    voidConsoleLog = function(variable) {
        console.log(variable);
    };

    // печать страницы
    voidPrint = function(text) {
        print(text);
    };

    // вывод предупреждения
    voidAlarm = function(text) {
        alert(text);
    };

    // вывод предупреждения с вводом текста
    getPromt = function(title, [text]) {
        return prompt(title, [text]);
    };

    // вывод подтверждения
    getConfirm = function(question) {
        return confirm(question);
    };
}

let list = document.getElementById('list');
let listLoader = new XMLHttpRequest();
const domain = 'http://127.0.0.1/';


const delay = async(ms) => await new Promise(resolve => setTimeout(resolve, ms));

function listLoad() {
    listLoader.open('GET', domain + 'drf/ideas/', true);
    listLoader.send();
}

listLoader.addEventListener('readystatechange', () => {
    if (listLoader.readyState === 4) {
        if (listLoader.status === 200) {
            let data = JSON.parse(listLoader.responseText);
            let iterations = JSON.parse(listLoader.responseText).length;
            let s = '<ul class="list-group list-group-flush">';
            let d;
            for (let i = 0; i < iterations; i++) {
                d = data[i];
                s += '<li class="list-group-item">' + d.id + ' | ' + d.author_char_field + ' | ' + d.name_char_field + ' | ' + d.category_slug_field + '</li>';
                console.log(data[i]);
            }
            s += '</ul>';
            list.innerHTML = s;
        } else {
            window.alert(listLoader.statusText);
        }
    }
});

let btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    // let service = new CustomServise();
    // service.voidAlarm('Угроза жизни!');
    // service.voidPrint('Угроза смерти!');
    // service.getPromt('Угроза жизни!', ['Подтверждаю']);
    // service.getСonfirm('Угроза смерти!');
    // service.voidConsoleLog('Угроза жизни!');

    listLoad();
    window.setInterval(listLoad, 3000);

});