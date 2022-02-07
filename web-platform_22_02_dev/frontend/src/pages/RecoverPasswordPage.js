import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import {
  changeUserProfileAction,
  userChangeAction,
  userLogoutAction,
  userPasswordRecoverAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FormContainerComponent from "../components/FormContainerComponent";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userRecoverPassword = useSelector((state) => state.userRecoverPassword);
  const {
    userRecoverPasswordLoadingReducer,
    userRecoverPasswordDataReducer,
    userRecoverPasswordErrorReducer,
  } = userRecoverPassword;

  const postSecretQuestionHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(userPasswordRecoverAction(username, "", "", ""));
  };

  const postSecretAnswerHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(userPasswordRecoverAction(username, secretAnswer, "", ""));
  };

  const postRecoverPasswordHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(userPasswordRecoverAction(username, "", password, password2));
    dispatch(userChangeAction());
    dispatch(userLogoutAction());
    navigate("/login");
  };

  useEffect(() => {
    if (userRecoverPasswordDataReducer) {
      if (userRecoverPasswordDataReducer["username"]) {
        setUsername(userRecoverPasswordDataReducer["username"]);
      } else {
        setUsername("");
      }
      if (userRecoverPasswordDataReducer["secretQuestion"]) {
        setSecretQuestion(userRecoverPasswordDataReducer["secretQuestion"]);
      } else {
        setSecretQuestion("");
      }
      if (userRecoverPasswordDataReducer["success"]) {
        setSuccess(userRecoverPasswordDataReducer["success"]);
      } else {
        setSuccess(false);
      }
    } else {
    }
  }, [dispatch, userRecoverPasswordDataReducer, username]);

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    password2.setAttribute("type", type);
  };

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Восстановление пароля"}
        second={"страница восстановления доступа к Вашему аккаунту."}
        logic={false}
      />
      <main className="container text-center">
        <div className="m-1">
          {userRecoverPasswordErrorReducer && (
            <MessageComponent variant="danger">
              {userRecoverPasswordErrorReducer}
            </MessageComponent>
          )}
          {userRecoverPasswordLoadingReducer && <LoaderComponent />}
          {success ? (
            <div>
              <FormContainerComponent>
                <Form onSubmit={postRecoverPasswordHandlerSubmit}>
                  <Form.Group controlId="password">
                    <Form.Label>Новый пароль от аккаунта:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="пример: 12345Qq$"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="none"
                      aria-autocomplete="none"
                      minLength="8"
                      maxLength="16"
                    />
                  </Form.Group>

                  <Form.Group controlId="password2">
                    <Form.Label>Повторите Пароль от аккаунта:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="пример: 12345Qq$"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      autoComplete="none"
                      aria-autocomplete="none"
                      minLength="8"
                      maxLength="16"
                    />
                  </Form.Group>

                  <Form.Group controlId="button">
                    <Button
                      type="submin"
                      variant="outline-primary"
                      className="m-1"
                    >
                      Сохранить
                    </Button>
                    <Button
                      onClick={changeVisibility}
                      type="button"
                      variant="outline-warning"
                      className="m-1"
                    >
                      видимость паролей
                    </Button>
                  </Form.Group>
                </Form>
              </FormContainerComponent>
            </div>
          ) : secretQuestion ? (
            <div>
              <div className="text-danger lead">
                Секретный вопрос: '
                <small className="text-danger lead fw-bold">{`${secretQuestion}`}</small>
                '
              </div>
              <FormContainerComponent>
                <Form>
                  <Form.Group controlId="email">
                    <Form.Label>Ответ:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="пример: 4"
                      value={secretAnswer}
                      onChange={(e) => setSecretAnswer(e.target.value)}
                      minLength="1"
                      maxLength="16"
                    />
                  </Form.Group>

                  <Form.Group controlId="button">
                    <Button
                      type="button"
                      variant="outline-primary"
                      className="m-1"
                      onClick={postSecretAnswerHandlerSubmit}
                    >
                      Найти
                    </Button>
                  </Form.Group>
                </Form>
              </FormContainerComponent>
            </div>
          ) : (
            <FormContainerComponent>
              <Form>
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

                <Form.Group controlId="button">
                  <Button
                    type="button"
                    variant="outline-primary"
                    className="m-1"
                    onClick={postSecretQuestionHandlerSubmit}
                  >
                    Найти
                  </Button>
                </Form.Group>
              </Form>
            </FormContainerComponent>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangePasswordPage;
