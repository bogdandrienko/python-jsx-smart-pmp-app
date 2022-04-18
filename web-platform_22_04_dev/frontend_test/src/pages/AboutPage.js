import React from "react";

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
    <main className="text-center">
      <h1>About Page</h1>
      <div>123</div>
    </main>
  );
};
