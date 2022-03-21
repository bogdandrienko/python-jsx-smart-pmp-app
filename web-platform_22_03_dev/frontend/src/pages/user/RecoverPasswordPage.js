///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RecoverPasswordPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [captcha, captchaSet] = useState("");
  const [username, setUsername] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userRecoverPasswordStore = useSelector(
    (state) => state.userRecoverPasswordStore
  );
  const {
    // load: loadUserRecoverPassword,
    data: dataUserRecoverPassword,
    // error: errorUserRecoverPassword,
    // fail: failUserRecoverPassword,
  } = userRecoverPasswordStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmitFindUser = (e) => {
    e.preventDefault();
    if (captcha !== "") {
      const form = {
        "Action-type": "FIND_USER",
        username: username,
      };
      dispatch(actions.userRecoverPasswordAction(form));
    }
  };
  //////////////////////////////////////////////////////////
  const handlerSubmitCheckAnswer = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHECK_ANSWER",
      username: username,
      secretAnswer: secretAnswer,
    };
    dispatch(actions.userRecoverPasswordAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerSubmitSendEmail = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "SEND_EMAIL_PASSWORD",
      username: username,
    };
    dispatch(actions.userRecoverPasswordAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerSubmitRecoverEmail = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHECK_EMAIL_PASSWORD",
      username: username,
      recoverPassword: recoverPassword,
    };
    dispatch(actions.userRecoverPasswordAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerSubmitRecoverPassword = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE_PASSWORD",
      username: username,
      password: password,
      password2: password2,
    };
    dispatch(actions.userRecoverPasswordAction(form));
    dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={userRecoverPasswordStore}
          key={"userRecoverPasswordStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={
            "Пользователь найден или введённые данные успешно совпадают!"
          }
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!captcha && (
          <components.MessageComponent variant="danger">
            Пройдите проверку на робота!
          </components.MessageComponent>
        )}
        <div className="m-1">
          {!success && !secretQuestion && !email ? (
            <div>
              <div className="form-control">
                <form
                  className="text-center p-1 m-1"
                  onSubmit={handlerSubmitFindUser}
                >
                  <div>
                    <label className="m-1">
                      <ReCAPTCHA
                        sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                        onChange={(e) => captchaSet(e)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="form-control-sm m-1 lead">
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
                        className="form-control form-control-sm"
                      />
                      <p className="m-0 p-0">
                        <small className="text-danger">
                          * обязательно
                          <small className="text-muted">
                            {" "}
                            * количество символов: 12
                          </small>
                        </small>
                      </p>
                    </label>
                  </div>
                  <hr />
                  <div className="container">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary p-2 m-1"
                      >
                        Проверить идентификатор
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          setUsername("");
                          setSecretQuestion("");
                          setSuccess(false);
                        }}
                        className="btn btn-sm btn-warning p-2 m-1"
                      >
                        Сбросить данные
                      </button>
                      <button
                        type="button"
                        onClick={(e) =>
                          utils.ChangePasswordVisibility([
                            "password",
                            "password2",
                          ])
                        }
                        className="btn btn-sm btn-danger p-2 m-1"
                      >
                        Видимость пароля
                      </button>
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
                    className="text-center m-0 p-0"
                    onSubmit={handlerSubmitCheckAnswer}
                  >
                    <div>
                      <label className="form-control-sm">
                        <div className="text-danger">
                          Секретный вопрос: '
                          <small className="text-warning fw-bold">{`${secretQuestion}`}</small>
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
                          className="form-control form-control-sm"
                        />
                        <small className="text-muted">
                          количество символов: от 4 до 32
                        </small>
                      </label>
                    </div>
                    <hr />
                    <div className="container">
                      <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary p-2 m-1"
                        >
                          Проверить ответ
                        </button>
                      </ul>
                    </div>
                  </form>
                </div>
                <div className="col">
                  <h4 className="lead">
                    Восстановление через введённую ранее почту.
                  </h4>
                  <form
                    className="text-center m-0 p-0"
                    onSubmit={handlerSubmitRecoverEmail}
                  >
                    <div>
                      <label className="form-control-sm">
                        Код восстановления отправленный на почту
                        <p className="text-danger m-0 p-0">
                          * вводить без кавычек
                          <p className="text-danger m-0 p-0">
                            * код действует в течении часа с момента отправки
                          </p>
                          <p className="text-success m-0 p-0">
                            (Часть почты, куда будет отправлено письмо: '
                            <small className="text-warning">
                              {email &&
                                `${email.slice(0, 5)} ... ${email.slice(-7)}`}
                            </small>
                            ')
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
                          className="form-control form-control-sm"
                        />
                        <small className="text-muted">
                          количество символов: от 1 до 64
                        </small>
                      </label>
                    </div>
                    <hr />
                    <div className="container">
                      <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary p-2 m-1"
                        >
                          Проверить код
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            setPassword("");
                            setPassword2("");
                          }}
                          className="btn btn-sm btn-warning p-2 m-1"
                        >
                          Сбросить данные
                        </button>
                        <button
                          type="button"
                          onClick={handlerSubmitSendEmail}
                          className="btn btn-sm btn-danger p-2 m-1"
                        >
                          Отправить код на почту
                        </button>
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
              className="text-center p-1 m-1"
              onSubmit={handlerSubmitRecoverPassword}
            >
              <div>
                <label className="form-control-sm">
                  Введите пароль для входа в аккаунт:
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-sm"
                    value={password}
                    placeholder="введите сюда новый пароль..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    maxLength="32"
                  />
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        {" "}
                        * количество символов: от 8 до 32
                      </small>
                    </small>
                  </p>
                </label>
                <label className="form-control-sm">
                  Повторите новый пароль:
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password2"
                    className="form-control form-control-sm"
                    value={password2}
                    placeholder="введите сюда новый пароль..."
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                    minLength="8"
                    maxLength="32"
                  />
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        {" "}
                        * количество символов: от 8 до 32
                      </small>
                    </small>
                  </p>
                </label>
              </div>
              <hr />
              <div className="container">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary p-2 m-1"
                  >
                    Сохранить новые данные
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      setPassword("");
                      setPassword2("");
                    }}
                    className="btn btn-sm btn-warning p-2 m-1"
                  >
                    Сбросить данные
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      utils.ChangePasswordVisibility(["password", "password2"])
                    }
                    className="btn btn-sm btn-danger p-2 m-1"
                  >
                    Видимость пароля
                  </button>
                </ul>
              </div>
            </form>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
