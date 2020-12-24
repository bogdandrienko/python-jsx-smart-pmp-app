"use strict";

class CustomServise {  
    // вывод в консоль
    voidConsoleLog = function(variable) {
        console.log(variable);
    }
    // печать страницы
    voidPrint = function(text) {
        print(text); 
    }
    // вывод предпреждения
    voidAlarm = function(text) {
        alert(text);
    }
    // вывод предупреждения с вводом текста
    getPromt = function(title, [text]) {
        return prompt(title, [text]);
    }
    // вывод подтверждения
    getСonfirm = function(question) {
        return confirm(question);
    }
}

let btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    let service =new CustomServise();
    // service.voidAlarm('Угроза жизни!');
    // service.voidPrint('Угроза смерти!');
    service.getPromt('Угроза жизни!', ['Подтверждаю']);
    // service.getСonfirm('Угроза смерти!');
    // service.voidConsoleLog('Угроза жизни!');
})
