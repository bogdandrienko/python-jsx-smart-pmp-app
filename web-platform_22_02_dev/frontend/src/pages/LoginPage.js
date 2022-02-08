import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [capcha, setCapcha] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: errorvar,
    loading: loadingvar,
    userInfo: userInfovar,
  } = userLogin;
  console.log("loadingvar: ", loadingvar);
  console.log("userInfovar: ", userInfovar);
  console.log("errorvar: ", errorvar);

  useEffect(() => {
    if (userInfovar) {
      navigate("/");
    }
  }, [navigate, userInfovar]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      dispatch(userLoginAction(email, password));
      // navigate("/");
    }
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  function changeCapcha(value) {
    setCapcha(value);
  }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Вход в систему"}
        second={"страница для входа в систему."}
      />
      <main className="container text-center">
        <FormContainerComponent>
          {errorvar && (
            <MessageComponent variant="danger">{errorvar}</MessageComponent>
          )}
          {loadingvar && <LoaderComponent />}
          <Form onSubmit={submitHandler}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                maxLength="16"
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
          </Form>
        </FormContainerComponent>
      </main>
      <FooterComponent />
    </div>
  );
}

export default LoginScreen;
