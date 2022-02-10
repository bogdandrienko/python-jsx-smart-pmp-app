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
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="account_login"
              autoComplete="on"
              className="text-center p-1 m-1"
              onSubmit={postRecoverPasswordHandlerSubmit}
            >
              <div>
                <label className="form-control-lg m-1">
                  Введите пароль для входа в аккаунт:
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required=""
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-lg"
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
                </label>
                <label className="form-control-lg m-1">
                  Повторите новый пароль:
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    required=""
                    placeholder=""
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-lg"
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
                </label>
              </div>
              <hr />
              <div className="container text-center">
                <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <div className="m-1">
                    <button
                      href=""
                      type="submit"
                      className="btn btn-lg btn-outline-primary form-control"
                    >
                      Сохранить новые данные
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      href=""
                      type="reset"
                      onClick={(e) => {
                        setPassword("");
                        setPassword2("");
                      }}
                      className="btn btn-lg btn-outline-warning form-control"
                    >
                      Сбросить данные
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      href=""
                      type="button"
                      onClick={changeVisibility}
                      className="btn btn-lg btn-outline-danger form-control"
                    >
                      Видимость пароля
                    </button>
                  </div>
                </ul>
              </div>
            </form>
          ) : secretQuestion ? (
            <div className="row">
              <div className="form-control col">
                <h3 className="lead display-6">
                  Восстановление через секретный вопрос/ответ.
                </h3>
                <form
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="account_login"
                  autoComplete="on"
                  className="text-center p-1 m-1"
                >
                  <div>
                    <label className="form-control-lg m-1">
                      <div className="text-danger lead">
                        Секретный вопрос: '
                        <small className="text-warning lead fw-bold">{`${secretQuestion}`}</small>
                        '
                      </div>
                      <input
                        type="text"
                        id="secretAnswer"
                        name="secretAnswer"
                        required=""
                        placeholder=""
                        value={secretAnswer}
                        onChange={(e) => setSecretAnswer(e.target.value)}
                        minLength="8"
                        maxLength="32"
                        className="form-control form-control-lg"
                      />
                      <small className="text-muted">
                        количество символов: от 8 до 32
                      </small>
                    </label>
                  </div>
                  <hr />
                  <div className="container text-center">
                    <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                      <div className="m-1">
                        <button
                          href=""
                          type="submit"
                          className="btn btn-lg btn-outline-primary form-control"
                          onClick={postSecretAnswerHandlerSubmit}
                        >
                          Проверить секретный ответ
                        </button>
                      </div>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="form-control col">
                <h3 className="lead display-6">
                  Восстановление через введённую ранее почту.
                </h3>
                <form
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="account_login"
                  autoComplete="on"
                  className="text-center p-1 m-1"
                >
                  <div>
                    <label className="form-control-lg m-1">
                      Код восстановления отправленный на почту (
                      <small className="text-danger">
                        вводить без кавычек, код действует в течении часа с
                        момента отправки
                      </small>
                      ):
                      <div className="m-1">
                        Часть почты, на которую будет отправлен код
                        восстановления: '
                        <small className="text-warning">
                          {email &&
                            `${email.slice(0, 5)} ... ${email.slice(-7)}`}
                        </small>
                        '
                      </div>
                      <input
                        type="text"
                        id="recoverPassword"
                        name="recoverPassword"
                        required=""
                        placeholder=""
                        value={recoverPassword}
                        onChange={(e) => setRecoverPassword(e.target.value)}
                        minLength="1"
                        maxLength="64"
                        className="form-control form-control-lg"
                      />
                      <small className="text-muted">
                        количество символов: от 1 до 64
                      </small>
                    </label>
                  </div>
                  <hr />
                  <div className="container text-center">
                    <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                      <div className="m-1">
                        <button
                          href=""
                          type="submit"
                          className="btn btn-lg btn-outline-success form-control"
                          onClick={postSecretQuestionHandlerSubmit}
                        >
                          Проверить код восстановления
                        </button>
                      </div>
                      <div className="m-1">
                        <button
                          href=""
                          type="reset"
                          onClick={postSendEmailHandlerSubmit}
                          className="btn btn-lg btn-outline-danger form-control"
                        >
                          Отправить код восстановления на почту
                        </button>
                      </div>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="account_login"
              autoComplete="on"
              className="text-center p-1 m-1"
            >
              <div>
                <label className="form-control-lg m-1">
                  <small className="lead text-danger">
                    Докажите, что Вы не робот!
                  </small>
                  <ReCAPTCHA
                    sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                    onChange={changeCapcha}
                  />
                </label>
              </div>
              <div>
                <label className="form-control-lg m-1">
                  Введите Ваш ИИН:
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required=""
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="12"
                    maxLength="12"
                    className="form-control form-control-lg"
                  />
                  <small className="text-muted">количество символов: 12</small>
                </label>
              </div>
              <hr />
              <div className="container text-center">
                <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <div className="m-1">
                    <button
                      href=""
                      type="submit"
                      className="btn btn-lg btn-outline-primary form-control"
                      onClick={postSecretQuestionHandlerSubmit}
                    >
                      Проверить идентификатор
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      href=""
                      type="reset"
                      onClick={(e) => {
                        setUsername("");
                        setSecretQuestion("");
                        setSuccess(false);
                      }}
                      className="btn btn-lg btn-outline-warning form-control"
                    >
                      Сбросить данные
                    </button>
                  </div>
                </ul>
              </div>
            </form>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangePasswordPage;
