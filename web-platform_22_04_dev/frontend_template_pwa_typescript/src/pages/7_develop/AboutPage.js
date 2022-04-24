import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Counter } from "../../components/test/counter/Counter";

export const AboutPage = () => {
  var a = "some value"; // functional or global scoped
  let b = "some value"; // block scoped
  const c = "some value"; // block scoped + cannot get new value

  // TODO function
  function function1(funcParam1 = "funcParam1", funcParam2 = "funcParam2") {
    const localParam = 33;
    return localParam + funcParam1 + funcParam2;
  }
  console.log("TODO functions: ", function1(11, 22));

  // TODO array function
  console.log(
    "TODO array functions: ",
    setTimeout((funcParam1 = "funcParam1", funcParam2 = "funcParam2") => {
      if (1 > 0) {
        return funcParam1;
      } else {
        return funcParam2;
      }
    }, 2000)
  );

  // TODO create objects
  // Definition a Constructor
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.setMiles = function (miles) {
      this.miles = miles;
      return miles;
    };
  }
  // Using a constructor
  const car1 = new Car("Toyota", "Prius", 2016);
  console.log("car1: ", car1);
  const car2 = new Car("Hyundai", "Sonata", 2018);
  console.log("car2: ", car2);
  // Adding method to the constructor prototype
  Car.prototype.age = function () {
    return new Date().getFullYear() - this.year;
  };
  car1.age(); // 2
  console.log("car1.age(): ", car1.age());

  //https://cheatsheets.shecodes.io/javascript

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="frontend_template_pwa_typescript/src/pages/7_develop/AboutPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="frontend_template_pwa_typescript/src/pages/7_develop/AboutPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="frontend_template_pwa_typescript/src/pages/7_develop/AboutPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="frontend_template_pwa_typescript/src/pages/7_develop/AboutPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
