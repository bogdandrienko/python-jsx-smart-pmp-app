import FormContainerComponent from "../components/FormContainerComponent";
import React from "react";

console.log("hello");

// changeble variable
let number = 5;
console.log(number);
console.log(typeof number);

number = 7;
console.log(number);

// not changeble variable
const leftNumber = 10;
console.log(leftNumber);
// leftNumber = 3;
console.log(leftNumber);

// variable is create (value=undefined) before defined and have global visibility
console.log(globalNumber);
var globalNumber = 12;
console.log(globalNumber);

let null1 = null;
console.log(null1);
let number1 = 4;
console.log(number1);
let number2 = 4.5;
console.log(number2);
let bool1 = true;
console.log(bool1);
let list1 = [1, 2, 3, 4, 5, 6];
console.log(list1);
let dict1 = { name: "Ivan", body: 12 };
console.log(dict1);
console.log(dict1.body);
console.log(dict1["name"]);

// const result = confirm("Are you here?");
// console.log(result);

// const answer = prompt("Are you here?", "Yes!");
// console.log(answer);

// document.write('Hello world!');

// interpolation
let var1 = 12;
console.log(`http://${var1}\\$`);

//increment and decrement

let incr = 10,
  decr = 10;

console.log(incr++);
console.log(++incr);
console.log(--decr);

console.log(7 % 2);

console.log(2 * 4 === 8);
console.log(2 * 4 == "8");

console.log(true && false);

console.log(true || false);

console.log(!true);

// function getValue(value) {
//   if (typeof value === "number") {
//     return value.toFixed(2);
//   } else {
//     return value;
//   }
// }
//
// let month = "01";
// const setMonth = (month_) => {
//   if (month_.length <= 1) {
//     month = "0" + month_;
//   } else {
//     month = month_;
//   }
// };
//
// let year = "2022";
// const setYear = (year_) => {
//   year = year_;
// };
//
// async function renderTable() {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${userToken.token}`,
//     },
//   };
//   const { data } = await axios.get(`/api/salary`, config);
//   console.log(data);
//   document.getElementById("salary").innerHTML = JSON.stringify(data);
// }
//
// const data = () => async () => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${userToken.token}`,
//     },
//   };
//   const { data } = await axios.get(`/api/salary`, config);
//   return data;
// };

<FormContainerComponent>
  {/* <Form onSubmit={submitHandler}>
            <div className="form-control">
              <small className="lead text-danger">Пройдите проверку!</small>
              <ReCAPTCHA
                sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                onChange={changeCapcha}
              />
            </div>

            <Form.Group controlId="email">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control
                type="text"
                placeholder="пример: 970801351179"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="12"
                maxLength="12"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Пароль от аккаунта:</Form.Label>
              <Form.Control
                type="password"
                placeholder="пример: 12345Qq$"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                controlid="password"
                minLength="8"
                maxLength="64"
              />
            </Form.Group>

            <div className="btn-group">
              <Button type="submit" variant="outline-primary" className="m-1">
                Войти
              </Button>

              <Button
                onClick={changeVisibility}
                type="button"
                variant="outline-warning"
                className="m-1"
              >
                видимость пароля
              </Button>

              <Button type="button" variant="outline-danger" className="m-1">
                <LinkContainer to="/recover_password">
                  <Nav.Link className="text-danger">
                    восстановить пароль
                  </Nav.Link>
                </LinkContainer>
              </Button>
            </div>
          </Form> */}
</FormContainerComponent>;
