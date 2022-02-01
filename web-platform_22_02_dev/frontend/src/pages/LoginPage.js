import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Navbar,
  Nav,
  Container,
  Row,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

import Header from "../components/Header";
import Title from "../components/Title";
import Footer from "../components/Footer";

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
    dispatch(login(email, password));
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
      <Header />
      <Title
        first={"Вход в систему"}
        second={"страница для входа в систему."}
      />
      <main className="container text-center">
        <FormContainer>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control
                type="text"
                placeholder="пример: 970801351179"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Пароль от аккаунта:</Form.Label>
              <Form.Control
                type="password"
                placeholder="пример: 12345Qq$"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                controlid="password"
              ></Form.Control>
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
        </FormContainer>
      </main>
      <Footer />
    </div>
  );
}

export default LoginScreen;
