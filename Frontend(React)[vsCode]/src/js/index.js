"use strict";

let btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    // got.getALLCharacters()
    //     .then(res => console.log(res));

    // got.getCharacters(100)
    //     .then(res => console.log(res));

    // got.getALLCharacters()
    //     .then(res => {
    //         console.log(res.forEach( item => console.log(item.name)))
    //     });

    //alert("Угроза захвата!")??

    user.sayHi();
});

class GOTServise {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetc ${url}, status: ${res.status}`)
        }

        return await res.json();
    };
    getALLCharacters() {
        return this.getResourse('/characters?page=5&pageSize=10');
    }
    getCharacters(id) {
        return this.getResourse(`/characters/${id}`);
    }
}

const got =new GOTServise();


  let user = {
    name: "Джон",
    age: 30
  };
  
  user.sayHi = function() {
    alert("Привет!");
  };
  
   // Привет!