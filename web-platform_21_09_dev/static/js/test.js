"use strict";

// class CustomServise {
//     // вывод в консоль
//     voidConsoleLog = function(variable) {
//             console.log(variable);
//         }
//         // печать страницы
//     voidPrint = function(text) {
//             print(text);
//         }
//         // вывод предпреждения
//     voidAlarm = function(text) {
//             alert(text);
//         }
//         // вывод предупреждения с вводом текста
//     getPromt = function(title, [text]) {
//             return prompt(title, [text]);
//         }
//         // вывод подтверждения
//     getСonfirm = function(question) {
//         return confirm(question);
//     }
// }





// const domain = 'http://127.0.0.1:8000/';
// const domain = 'http://192.168.0.109:8000/';
const domain = 'https://kostanay-minerals.herokuapp.com/';
let list = document.getElementById('list');
let listLoader = new XMLHttpRequest();

listLoader.addEventListener('readystatechange', () => {
    if (listLoader.readyState == 4) {
        if (listLoader.status == 200) {
            let data = JSON.parse(listLoader.responseText);
            let iterations = JSON.parse(listLoader.responseText).length;
            let s = '<ul class="list-group list-group-flush">';
            let d;
            for (let i = 0; i < iterations; i++) {
                d = data[i];
                s += '<li class="list-group-item">' + d.id + ' | ' + d.title + ' | ' + d.description + ' | ' + d.done + '</li>';
                console.log(data[i]);
            }
            s += '</ul>';
            list.innerHTML = s;
        } else {
            window.alert(listLoader.statusText);
        }
    }
});

function listLoad() {
    listLoader.open('GET', domain + 'app_react/api/todo/', true);
    console.log(listLoader);
    listLoader.send();
}

let btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    // let service = new CustomServise();
    // service.voidAlarm('Угроза жизни!');
    // service.voidPrint('Угроза смерти!');
    // service.getPromt('Угроза жизни!', ['Подтверждаю']);
    // service.getСonfirm('Угроза смерти!');
    // service.voidConsoleLog('Угроза жизни!');

    listLoad();
});