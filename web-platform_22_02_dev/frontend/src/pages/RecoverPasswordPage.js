import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import {
  userChangeProfileAction,
  userRecoverPasswordAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FormContainerComponent from "../components/FormContainerComponent";
import ReCAPTCHA from "react-google-recaptcha";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [capcha, setCapcha] = useState("");

  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");

  const [email, setEmail] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");

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
    if (capcha !== "") {
      dispatch(
        userRecoverPasswordAction({
          actionType: "FIND_USER",
          username: username,
          secretAnswer: "",
          recoverPassword: "",
          password: "",
          password2: "",
        })
      );
    }
  };

  const postSecretAnswerHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userRecoverPasswordAction({
        actionType: "CHECK_ANSWER",
        username: username,
        secretAnswer: secretAnswer,
        recoverPassword: "",
        password: "",
        password2: "",
      })
    );
  };

  const postSendEmailHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userRecoverPasswordAction({
        actionType: "SEND_EMAIL_PASSWORD",
        username: username,
        secretAnswer: "",
        recoverPassword: "",
        password: "",
        password2: "",
      })
    );
  };

  const postRecoverEmailHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userRecoverPasswordAction({
        actionType: "CHECK_EMAIL_PASSWORD",
        username: username,
        secretAnswer: "",
        recoverPassword: recoverPassword,
        password: "",
        password2: "",
      })
    );
  };

  const postRecoverPasswordHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userRecoverPasswordAction({
        actionType: "CHANGE_PASSWORD",
        username: username,
        secretAnswer: "",
        recoverPassword: "",
        password: password,
        password2: password2,
      })
    );
    dispatch(userChangeProfileAction());
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
      if (userRecoverPasswordDataReducer["email"]) {
        setEmail(userRecoverPasswordDataReducer["email"]);
      } else {
        setEmail("");
      }
      if (userRecoverPasswordDataReducer["success"]) {
        setSuccess(userRecoverPasswordDataReducer["success"]);
      } else {
        setSuccess(false);
      }
    } else {
    }
  }, [dispatch, userRecoverPasswordDataReducer]);

  const cleanUsername = () => {
    setUsername("");
    setSecretQuestion("");
    setSuccess(false);
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    password2.setAttribute("type", type);
  };

  function changeCapcha(value) {
    setCapcha(value);
  }

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
            <div className="row">
              <div className="form-control col">
                <h3 className="lead">
                  Восстановление через секретный вопрос/ответ.
                </h3>
                <div className="text-danger lead">
                  Секретный вопрос: '
                  <small className="text-warning lead fw-bold">{`${secretQuestion}`}</small>
                  '
                </div>
                <FormContainerComponent>
                  <Form>
                    <Form.Group controlId="text">
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
                        variant="outline-success"
                        className="m-1"
                        onClick={postSecretAnswerHandlerSubmit}
                      >
                        Проверить
                      </Button>
                    </Form.Group>
                  </Form>
                </FormContainerComponent>
              </div>
              <div className="form-control col">
                <h3 className="lead">
                  Восстановление через введённую ранее почту.
                </h3>
                <div className="text-danger lead">
                  Первая и последняя часть почты: '
                  <small className="text-warning lead fw-bold">
                    {`${email}`.slice(0, 3)} ... {`${email}`.slice(-9)}
                  </small>
                  '
                </div>
                <FormContainerComponent>
                  <Form>
                    <Form.Group controlId="email">
                      <Form.Label>
                        Код восстановления отправленный на почту (
                        <small className="text-danger">
                          вводить без кавычек, код действует в течении часа с
                          момента отправки
                        </small>
                        ):
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="пример: 4"
                        value={recoverPassword}
                        onChange={(e) => setRecoverPassword(e.target.value)}
                        minLength="1"
                        maxLength="64"
                      />
                    </Form.Group>

                    <Form.Group controlId="button">
                      <Button
                        type="button"
                        variant="outline-success"
                        className="m-1"
                        onClick={postRecoverEmailHandlerSubmit}
                      >
                        Проверить
                      </Button>
                      <Button
                        type="button"
                        variant="outline-primary"
                        className="m-1"
                        onClick={postSendEmailHandlerSubmit}
                      >
                        Отправить код восстановления на почту
                      </Button>
                    </Form.Group>
                  </Form>
                </FormContainerComponent>
              </div>
            </div>
          ) : (
            <FormContainerComponent>
              <div className="form-control">
                <small className="lead text-danger">Пройдите проверку!</small>
                <ReCAPTCHA
                  sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                  onChange={changeCapcha}
                />
              </div>
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
                  <Button
                    onClick={cleanUsername}
                    type="button"
                    variant="outline-warning"
                    className="m-1"
                  >
                    очистить поле
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
