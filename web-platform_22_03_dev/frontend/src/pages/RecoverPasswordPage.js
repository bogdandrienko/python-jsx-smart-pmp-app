import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  userChangeProfileAction,
  userLoginAction,
  userRecoverPasswordAction,
} from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import { USER_DETAILS_RESET_CONSTANT } from "../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const [capcha, setCapcha] = useState("");
  const [username, setUsername] = useState("");

  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");

  const [email, setEmail] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userRecoverPasswordStore = useSelector(
    (state) => state.userRecoverPasswordStore
  );
  const {
    load: loadUserRecoverPassword,
    data: dataUserRecoverPassword,
    error: errorUserRecoverPassword,
    fail: failUserRecoverPassword,
  } = userRecoverPasswordStore;
  console.log("dataUserRecoverPassword: ", dataUserRecoverPassword);

  const postFindUserHandlerSubmit = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      const form = {
        "Action-type": "FIND_USER",
        username: username,
      };
      dispatch(userRecoverPasswordAction(form));
    }
  };

  const postCheckAnswerHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHECK_ANSWER",
      username: username,
      secretAnswer: secretAnswer,
    };
    dispatch(userRecoverPasswordAction(form));
  };

  const postSendEmailHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "SEND_EMAIL_PASSWORD",
      username: username,
    };
    dispatch(userRecoverPasswordAction(form));
  };

  const postRecoverEmailHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHECK_EMAIL_PASSWORD",
      username: username,
      recoverPassword: recoverPassword,
    };
    dispatch(userRecoverPasswordAction(form));
  };

  const postRecoverPasswordHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE_PASSWORD",
      username: username,
      password: password,
      password2: password2,
    };
    dispatch(userRecoverPasswordAction(form));
    dispatch({ type: USER_DETAILS_RESET_CONSTANT });
  };

  useEffect(() => {
    if (dataUserRecoverPassword) {
      if (dataUserRecoverPassword["username"]) {
        setUsername(dataUserRecoverPassword["username"]);
      } else {
        setUsername("");
      }
      if (dataUserRecoverPassword["secretQuestion"]) {
        setSecretQuestion(dataUserRecoverPassword["secretQuestion"]);
      } else {
        setSecretQuestion("");
      }
      if (dataUserRecoverPassword["email"]) {
        setEmail(dataUserRecoverPassword["email"]);
      } else {
        setEmail("");
      }
      if (dataUserRecoverPassword["success"]) {
        setSuccess(dataUserRecoverPassword["success"]);
      } else {
        setSuccess(false);
      }
    } else {
    }
  }, [dataUserRecoverPassword]);

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
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Восстановление пароля"}
        second={"страница восстановления доступа к Вашему аккаунту."}
      />
      <main className="container text-center">
        <div>
          {loadUserRecoverPassword && <LoaderComponent />}
          {dataUserRecoverPassword && (
            <MessageComponent variant="success">Успешно!</MessageComponent>
          )}
          {errorUserRecoverPassword && (
            <MessageComponent variant="danger">
              {errorUserRecoverPassword}
            </MessageComponent>
          )}
          {failUserRecoverPassword && (
            <MessageComponent variant="warning">
              {failUserRecoverPassword}
            </MessageComponent>
          )}
          {!capcha && (
            <MessageComponent variant="danger">
              Пройдите проверку на робота!
            </MessageComponent>
          )}
        </div>
        <div className="m-1">
          {!success && !secretQuestion && !email ? (
            <div>
              <div className="form-control">
                <form
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="account_login"
                  autoComplete="on"
                  className="text-center p-1 m-1"
                  onSubmit={postFindUserHandlerSubmit}
                >
                  <div>
                    <label className="m-1">
                      <ReCAPTCHA
                        sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                        onChange={changeCapcha}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="form-control-md m-1 lead">
                      Введите Ваш ИИН:
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength="12"
                        maxLength="12"
                        className="form-control form-control-md"
                      />
                      <p>
                        <small className="text-danger">* обязательно</small>
                        <p>
                          <small className="text-muted">
                            количество символов: 12
                          </small>
                        </p>
                      </p>
                    </label>
                  </div>
                  <hr />
                  <div className="container text-center">
                    <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                      <div className="m-1">
                        <button
                          type="submit"
                          className="btn btn-md btn-primary form-control"
                        >
                          Проверить идентификатор
                        </button>
                      </div>
                      <div className="m-1">
                        <button
                          type="reset"
                          onClick={(e) => {
                            setUsername("");
                            setSecretQuestion("");
                            setSuccess(false);
                          }}
                          className="btn btn-md btn-warning form-control"
                        >
                          Сбросить данные
                        </button>
                      </div>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
          {!success && secretQuestion && email ? (
            <div>
              <div className="row">
                <div className="col">
                  <h4 className="lead">
                    Восстановление через секретный вопрос/ответ.
                  </h4>
                  <form
                    method="POST"
                    target="_self"
                    encType="multipart/form-data"
                    name="account_login"
                    autoComplete="on"
                    className="text-center p-1 m-1"
                    onSubmit={postCheckAnswerHandlerSubmit}
                  >
                    <div>
                      <label className="form-control-md">
                        <div className="text-danger lead">
                          Секретный вопрос: '
                          <small className="text-warning lead fw-bold">{`${secretQuestion}`}</small>
                          '
                        </div>
                        <input
                          type="text"
                          id="secretAnswer"
                          name="secretAnswer"
                          required
                          placeholder=""
                          value={secretAnswer}
                          onChange={(e) => setSecretAnswer(e.target.value)}
                          minLength="4"
                          maxLength="32"
                          className="form-control form-control-md"
                        />
                        <small className="text-muted">
                          количество символов: от 4 до 32
                        </small>
                      </label>
                    </div>
                    <hr />
                    <div className="container text-center">
                      <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                        <div className="m-1">
                          <button
                            type="submit"
                            className="btn btn-md btn-primary"
                          >
                            Проверить ответ
                          </button>
                        </div>
                      </ul>
                    </div>
                  </form>
                </div>
                <div className="col">
                  <h4 className="lead">
                    Восстановление через введённую ранее почту.
                  </h4>
                  <form
                    method="POST"
                    target="_self"
                    encType="multipart/form-data"
                    name="account_login"
                    autoComplete="on"
                    className="text-center p-1 m-1"
                    onSubmit={postRecoverEmailHandlerSubmit}
                  >
                    <div>
                      <label className="form-control-md">
                        Код восстановления отправленный на почту
                        <p className="text-danger">
                          * вводить без кавычек
                          <p className="text-danger">
                            * код действует в течении часа с момента отправки
                          </p>
                          <p className="text-success">
                            Часть почты, куда будет отправлено письмо: '
                            <small className="text-warning">
                              {email &&
                                `${email.slice(0, 5)} ... ${email.slice(-7)}`}
                            </small>
                            '
                          </p>
                        </p>
                        <input
                          type="text"
                          id="recoverPassword"
                          name="recoverPassword"
                          required
                          placeholder=""
                          value={recoverPassword}
                          onChange={(e) => setRecoverPassword(e.target.value)}
                          minLength="1"
                          maxLength="64"
                          className="form-control form-control-md"
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
                            type="submit"
                            className="btn btn-md btn-success"
                          >
                            Проверить код
                          </button>
                        </div>
                        <div className="m-1">
                          <button
                            type="reset"
                            onClick={postSendEmailHandlerSubmit}
                            className="btn btn-md btn-danger"
                          >
                            Отправить код на почту
                          </button>
                        </div>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {success && (
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
                <label className="form-control-md m-1 lead">
                  Введите пароль для входа в аккаунт:
                  <p>
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-md"
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <p>
                    <small className="text-danger">* обязательно</small>
                    <p>
                      <small className="text-muted">
                        количество символов: от 8 до 32
                      </small>
                    </p>
                  </p>
                </label>
                <label className="form-control-md m-1 lead">
                  Повторите новый пароль:
                  <p>
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    required
                    placeholder=""
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-md"
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <p>
                    <small className="text-danger">* обязательно</small>
                    <p>
                      <small className="text-muted">
                        количество символов: от 8 до 32
                      </small>
                    </p>
                  </p>
                </label>
              </div>
              <hr />
              <div className="container text-center">
                <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <div className="m-1">
                    <button
                      type="submit"
                      className="btn btn-md btn-primary form-control"
                    >
                      Сохранить новые данные
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      type="reset"
                      onClick={(e) => {
                        setPassword("");
                        setPassword2("");
                      }}
                      className="btn btn-md btn-warning form-control"
                    >
                      Сбросить данные
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      type="button"
                      onClick={changeVisibility}
                      className="btn btn-md btn-danger form-control"
                    >
                      Видимость пароля
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
