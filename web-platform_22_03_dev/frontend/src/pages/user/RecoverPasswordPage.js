// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
import { Link } from "react-router-dom";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const RecoverPasswordPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [captcha, captchaSet] = useState("");
  const [username, usernameSet] = useState("");
  const [secretQuestion, secretQuestionSet] = useState("");
  const [secretAnswer, secretAnswerSet] = useState("");
  const [email, emailSet] = useState("");
  const [recoverPassword, recoverPasswordSet] = useState("");
  const [success, successSet] = useState(false);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const userRecoverPasswordStore = useSelector(
    (state) => state.userRecoverPasswordStore
  );
  const {
    // load: loadUserRecoverPassword,
    data: dataUserRecoverPassword,
    // error: errorUserRecoverPassword,
    // fail: failUserRecoverPassword,
  } = userRecoverPasswordStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataUserRecoverPassword) {
      if (dataUserRecoverPassword["username"]) {
        usernameSet(dataUserRecoverPassword["username"]);
      } else {
        usernameSet("");
      }
      if (dataUserRecoverPassword["secretQuestion"]) {
        secretQuestionSet(dataUserRecoverPassword["secretQuestion"]);
      } else {
        secretQuestionSet("");
      }
      if (dataUserRecoverPassword["email"]) {
        emailSet(dataUserRecoverPassword["email"]);
      } else {
        emailSet("");
      }
      if (dataUserRecoverPassword["success"]) {
        successSet(dataUserRecoverPassword["success"]);
      } else {
        successSet(false);
      }
    } else {
    }
  }, [dataUserRecoverPassword]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
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
  const handlerRecoverPasswordSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE_PASSWORD",
      username: username,
      password: password,
      password2: password2,
    };
    dispatch(actions.userRecoverPasswordAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerRecoverPasswordReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    passwordSet("");
    password2Set("");
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
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
        <div className="m-0 p-1">
          {!success && !secretQuestion && !email ? (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
              <form className="m-0 p-0" onSubmit={handlerSubmitFindUser}>
                <div className="card shadow custom-background-transparent-low m-0 p-0">
                  {!captcha && (
                    <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                      Пройдите проверку на робота!
                    </div>
                  )}
                  <div className="card-body m-0 p-0">
                    <div className="m-0 p-1">
                      <label className="m-0 p-1">
                        <ReCAPTCHA
                          sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                          onChange={(e) => captchaSet(e)}
                        />
                      </label>
                      <label className="form-control-sm text-center w-75 m-0 p-1">
                        Введите Ваш ИИН:
                        <input
                          type="text"
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={username}
                          placeholder="введите ИИН тут..."
                          required
                          minLength="12"
                          maxLength="12"
                          onChange={(e) =>
                            usernameSet(
                              e.target.value.replace(
                                utils.GetRegexType({ numbers: true }),
                                ""
                              )
                            )
                          }
                          autoComplete="current-username"
                        />
                        <small className="text-danger m-0 p-0">
                          * обязательно
                          <small className="text-warning m-0 p-0">
                            {" "}
                            * только цифры
                          </small>
                          <small className="text-muted m-0 p-0">
                            {" "}
                            * длина: 12 символов
                          </small>
                        </small>
                      </label>
                    </div>
                  </div>
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      <button
                        className="btn btn-sm btn-primary m-1 p-2"
                        type="submit"
                      >
                        Проверить идентификатор
                      </button>
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          ) : (
            ""
          )}
          {!success && secretQuestion && email ? (
            <div className="row shadow m-0 p-0">
              <div className="col m-0 p-0">
                <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center text-center m-0 p-1">
                  <form className="m-0 p-0" onSubmit={handlerSubmitCheckAnswer}>
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                        Восстановление через секретный вопрос:
                      </div>
                      <div className="card-body m-0 p-0">
                        <div className="m-0 p-1">
                          <label className="form-control-sm text-center m-0 p-1">
                            <div className="text-danger">
                              Секретный вопрос: '
                              <small className="text-warning fw-bold">{`${secretQuestion}`}</small>
                              '
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center m-0 p-1"
                              id="secretAnswer"
                              name="secretAnswer"
                              required
                              placeholder="введите секретный ответ тут..."
                              value={secretAnswer}
                              onChange={(e) =>
                                secretAnswerSet(
                                  e.target.value.replace(
                                    utils.GetRegexType({
                                      numbers: true,
                                      cyrillic: true,
                                      space: true,
                                    }),
                                    ""
                                  )
                                )
                              }
                              minLength="4"
                              maxLength="32"
                            />
                            <small className="text-danger m-0 p-0">
                              * обязательно
                              <small className="text-warning m-0 p-0">
                                {" "}
                                * только кириллица, цифры и пробел
                              </small>
                              <small className="text-muted m-0 p-0">
                                {" "}
                                * длина: от 4 до 32 символов
                              </small>
                            </small>
                          </label>
                        </div>
                      </div>
                      <div className="card-footer m-0 p-0">
                        <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                          <button
                            className="btn btn-sm btn-primary m-1 p-2"
                            type="submit"
                          >
                            Проверить ответ
                          </button>
                        </ul>
                      </div>
                    </div>
                  </form>
                </ul>
              </div>
              <div className="col m-0 p-0">
                <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center text-center m-0 p-1">
                  <form
                    className="m-0 p-0"
                    onSubmit={handlerSubmitRecoverEmail}
                  >
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                        Восстановление через почту:
                      </div>
                      <div className="card-header bg-secondary bg-opacity-10 text-muted m-0 p-1">
                        Часть почты, куда будет отправлено письмо: '
                        <small className="text-warning">
                          {email &&
                            `${email.slice(0, 4)} ... ${email.slice(-5)}`}
                        </small>
                        '
                      </div>
                      <div className="card-body m-0 p-0">
                        <div className="m-0 p-1">
                          <label className="form-control-sm text-center m-0 p-1">
                            Код восстановления отправленный на почту
                            <input
                              type="text"
                              id="recoverPassword"
                              name="recoverPassword"
                              required
                              placeholder="введите код с почты тут..."
                              value={recoverPassword}
                              onChange={(e) =>
                                recoverPasswordSet(e.target.value)
                              }
                              minLength="1"
                              maxLength="300"
                              className="form-control form-control-sm text-center m-0 p-1"
                            />
                            <small className="text-danger m-0 p-0">
                              * обязательно
                              <small className="text-warning m-0 p-0">
                                {" "}
                                * вводить без кавычек
                              </small>
                              <small className="text-muted m-0 p-0">
                                {" "}
                                * длина: не более 300 символов
                              </small>
                            </small>
                            <p className="text-danger m-0 p-0">
                              * код действует в течении часа с момента отправки
                            </p>
                          </label>
                        </div>
                      </div>
                      <div className="card-footer m-0 p-0">
                        <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                          <button
                            className="btn btn-sm btn-primary m-1 p-2"
                            type="submit"
                          >
                            Проверить код
                          </button>
                          <button
                            type="button"
                            onClick={handlerSubmitSendEmail}
                            className="btn btn-sm btn-danger p-2 m-0 p-1"
                          >
                            Отправить код на почту
                          </button>
                        </ul>
                      </div>
                    </div>
                  </form>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          {success && (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
              <form className="m-0 p-0" onSubmit={handlerRecoverPasswordSubmit}>
                <div className="card shadow custom-background-transparent-low m-0 p-0">
                  <div className="card-body m-0 p-0">
                    <div className="m-0 p-1">
                      <label className="form-control-sm text-center m-0 p-1">
                        Введите пароль для входа в аккаунт:
                        <input
                          type="password"
                          className="form-control form-control-sm text-center m-0 p-1"
                          id="password"
                          value={password}
                          placeholder="введите новый пароль тут..."
                          required
                          onChange={(e) =>
                            passwordSet(
                              e.target.value.replace(
                                utils.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              )
                            )
                          }
                          minLength="8"
                          maxLength="16"
                          autoComplete="off"
                        />
                        <small className="text-danger m-0 p-0">
                          * обязательно
                          <small className="text-warning m-0 p-0">
                            {" "}
                            * только латиница, цифры и нижний пробел
                          </small>
                          <small className="text-muted m-0 p-0">
                            {" "}
                            * длина: от 8 до 16 символов
                          </small>
                        </small>
                      </label>
                      <label className="form-control-sm text-center m-0 p-1">
                        Повторите новый пароль:
                        <input
                          type="password"
                          className="form-control form-control-sm text-center m-0 p-1"
                          id="password2"
                          value={password2}
                          placeholder="введите новый пароль тут..."
                          required
                          onChange={(e) =>
                            password2Set(
                              e.target.value.replace(
                                utils.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              )
                            )
                          }
                          minLength="8"
                          maxLength="16"
                          autoComplete="off"
                        />
                        <small className="text-danger m-0 p-0">
                          * обязательно
                          <small className="text-warning m-0 p-0">
                            {" "}
                            * только латиница, цифры и нижний пробел
                          </small>
                          <small className="text-muted m-0 p-0">
                            {" "}
                            * длина: от 8 до 16 символов
                          </small>
                        </small>
                      </label>
                    </div>
                  </div>
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      <button
                        className="btn btn-sm btn-primary m-1 p-2"
                        type="submit"
                      >
                        Сохранить новые данные
                      </button>
                      <button
                        className="btn btn-sm btn-warning m-1 p-2"
                        type="reset"
                        onClick={(e) => handlerRecoverPasswordReset(e)}
                      >
                        сбросить данные
                      </button>
                      <button
                        type="reset"
                        onClick={(e) =>
                          utils.ChangePasswordVisibility([
                            "password",
                            "password2",
                          ])
                        }
                        className="btn btn-sm btn-danger m-1 p-2"
                      >
                        Видимость пароля
                      </button>
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
