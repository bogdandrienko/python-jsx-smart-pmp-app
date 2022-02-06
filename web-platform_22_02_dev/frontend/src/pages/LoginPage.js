import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";

import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
import FormContainerComponent from "../components/FormContainerComponent";
import { userLoginAction } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
    navigate("/");
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };
  // function changeVisibility() {
  //   const password = document.getElementById("password");
  //   const type =
  //     password.getAttribute("type") === "password" ? "text" : "password";
  //   password.setAttribute("type", type);
  // }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Вход в систему"}
        second={"страница для входа в систему."}
      />
      <main className="container text-center">
        <FormContainerComponent>
          {error && <MessageComponent variant="danger">{error}</MessageComponent>}
          {loading && <LoaderComponent />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control
                type="text"
                placeholder="пример: 970801351179"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </Form.Group>

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
          </Form>
        </FormContainerComponent>
      </main>
      <FooterComponent />
    </div>
  );
}

export default LoginScreen;
