// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/component";
import * as constant from "../../components/constant";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RecoverPasswordPage = () => {
  // TODO variables ////////////////////////////////////////////////////////////////////////////////////////////////////

  const [captcha, captchaSet] = useState("");
  const [username, usernameSet] = useState("");
  const [secretQuestion, secretQuestionSet] = useState("");
  const [secretAnswer, secretAnswerSet] = useState("");
  const [email, emailSet] = useState("");
  const [recoverPassword, recoverPasswordSet] = useState("");
  const [success, successSet] = useState(false);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const userRecoverPasswordStore = useSelector(
  //   // @ts-ignore
  //   (state) => state.userRecoverPasswordStore
  // );
  // const {
  //   // load: loadUserRecoverPassword,
  //   data: dataUserRecoverPassword,
  //   // error: errorUserRecoverPassword,
  //   // fail: failUserRecoverPassword,
  // } = userRecoverPasswordStore;

  // useEffect(() => {
  //   if (dataUserRecoverPassword) {
  //     if (dataUserRecoverPassword["username"]) {
  //       usernameSet(dataUserRecoverPassword["username"]);
  //     } else {
  //       usernameSet("");
  //     }
  //     if (dataUserRecoverPassword["secretQuestion"]) {
  //       secretQuestionSet(dataUserRecoverPassword["secretQuestion"]);
  //     } else {
  //       secretQuestionSet("");
  //     }
  //     if (dataUserRecoverPassword["email"]) {
  //       emailSet(dataUserRecoverPassword["email"]);
  //     } else {
  //       emailSet("");
  //     }
  //     if (dataUserRecoverPassword["success"]) {
  //       successSet(dataUserRecoverPassword["success"]);
  //     } else {
  //       successSet(false);
  //     }
  //   } else {
  //   }
  // }, [dataUserRecoverPassword]);

  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const handlerSubmitFindUser = (event) => {
    event.preventDefault();
    if (captcha !== "") {
      // const form = {
      //   "Action-type": "FIND_USER",
      //   username: username,
      // };
      // dispatch(
      //   utils.ActionConstructorUtility(
      //     form,
      //     "/api/any/user/recover/find/",
      //     "POST",
      //     30000,
      //     constants.USER_RECOVER,
      //     false
      //   )
      // );
    }
  };
  //////////////////////////////////////////////////////////
  // @ts-ignore
  const handlerSubmitCheckAnswer = (event) => {
    event.preventDefault();
    // const form = {
    //   "Action-type": "CHECK_ANSWER",
    //   username: username,
    //   secretAnswer: secretAnswer,
    // };
    // dispatch(
    //   utils.ActionConstructorUtility(
    //     form,
    //     "/api/any/user/recover/check_answer/",
    //     "POST",
    //     30000,
    //     constants.USER_RECOVER,
    //     false
    //   )
    // );
  };
  //////////////////////////////////////////////////////////
  // @ts-ignore
  const handlerSubmitSendEmail = (event) => {
    event.preventDefault();
    // const form = {
    //   "Action-type": "SEND_EMAIL_PASSWORD",
    //   username: username,
    // };
    // dispatch(
    //   utils.ActionConstructorUtility(
    //     form,
    //     "/api/any/user/recover/send_email/",
    //     "POST",
    //     30000,
    //     constants.USER_RECOVER,
    //     false
    //   )
    // );
  };
  //////////////////////////////////////////////////////////
  // @ts-ignore
  const handlerSubmitRecoverEmail = (event) => {
    event.preventDefault();
    // const form = {
    //   "Action-type": "CHECK_EMAIL_PASSWORD",
    //   username: username,
    //   recoverPassword: recoverPassword,
    // };
    // dispatch(
    //   utils.ActionConstructorUtility(
    //     form,
    //     "/api/any/user/recover/check_email/",
    //     "POST",
    //     30000,
    //     constants.USER_RECOVER,
    //     false
    //   )
    // );
  };
  //////////////////////////////////////////////////////////
  // @ts-ignore
  const handlerRecoverPasswordSubmit = (event) => {
    event.preventDefault();
    // const form = {
    //   "Action-type": "CHANGE_PASSWORD",
    //   username: username,
    //   password: password,
    //   password2: password2,
    // };
    // dispatch(
    //   utils.ActionConstructorUtility(
    //     form,
    //     "/api/any/user/recover/change_password/",
    //     "POST",
    //     30000,
    //     constants.USER_RECOVER,
    //     false
    //   )
    // );
  };
  //////////////////////////////////////////////////////////
  // @ts-ignore
  const handlerRecoverPasswordReset = async (event) => {
    try {
      event.preventDefault();
    } catch (error) {}
    passwordSet("");
    password2Set("");
  };

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.BaseComponent1>
      {/*<component.StoreComponent*/}
      {/*  storeStatus={constant.userRecoverPasswordStore}*/}
      {/*  consoleLog={constant.DEBUG_CONSTANT}*/}
      {/*  showLoad={true}*/}
      {/*  loadText={""}*/}
      {/*  showData={true}*/}
      {/*  dataText={"Успешно!"}*/}
      {/*  showError={true}*/}
      {/*  errorText={""}*/}
      {/*  showFail={true}*/}
      {/*  failText={""}*/}
      {/*/>*/}
      <div className="m-0 p-1">
        {!success && !secretQuestion && !email ? (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerSubmitFindUser}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                {!captcha && (
                  <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                    <i className="fa-solid fa-robot m-0 p-1" />
                    Пройдите проверку на робота!
                  </div>
                )}
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="m-0 p-1">
                      <ReCAPTCHA
                        sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                        // @ts-ignore
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
                        minLength={12}
                        maxLength={12}
                        onChange={(e) =>
                          usernameSet(
                            e.target.value.replace(
                              util.GetRegexType({ numbers: true }),
                              ""
                            )
                          )
                        }
                        autoComplete="current-username"
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
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
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      проверить ИИН
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        ) : (
          ""
        )}
        {!success && (secretQuestion || email) ? (
          <div className="shadow m-0 p-0">
            <component.AccordionComponent
              key_target={"accordion1"}
              isCollapse={false}
              title={"Регламент восстановления:"}
              text_style="custom-color-warning-1"
              header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
              body_style="bg-light bg-opacity-10 custom-background-transparent-low"
            >
              {
                <div className="text-center m-0 p-4">
                  <ul className="text-start m-0 p-0">
                    <li className="m-0 p-1">
                      <h6 className="m-0 p-0">
                        Если Вам не удаётся восстановить доступ через секретный
                        вопрос и/или почту:
                      </h6>
                      <small className="m-0 p-0">
                        Вы можете обратиться к закреплённому системному
                        администратору, он может сбросить Вам пароль и сообщить
                        новый временный пароль Вашему начальнику!
                      </small>
                    </li>
                  </ul>
                </div>
              }
            </component.AccordionComponent>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 shadow m-0 p-0">
              <div className="col-6 m-0 p-0">
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
                              <i className="fa-solid fa-question-circle m-0 p-1" />
                              Секретный вопрос:
                              <small className="custom-color-warning-1 fw-bold">
                                <i className="fa-solid fa-message m-0 p-1" />'
                                {`${secretQuestion}`}'
                              </small>
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
                                    util.GetRegexType({
                                      numbers: true,
                                      cyrillic: true,
                                      space: true,
                                    }),
                                    ""
                                  )
                                )
                              }
                              minLength={4}
                              maxLength={32}
                            />
                            <small className="text-danger m-0 p-0">
                              * обязательно
                              <small className="custom-color-warning-1 m-0 p-0">
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
                            <i className="fa-solid fa-circle-check m-0 p-1" />
                            проверить ответ
                          </button>
                        </ul>
                      </div>
                    </div>
                  </form>
                </ul>
              </div>
              <div className="col-6 m-0 p-0">
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
                        <small className="custom-color-warning-1">
                          {email &&
                            `${email.slice(0, 4)} ... ${email.slice(-5)}`}
                        </small>
                        '
                      </div>
                      <div className="card-body m-0 p-0">
                        <div className="m-0 p-1">
                          <label className="form-control-sm text-center m-0 p-1">
                            <i className="fa-solid fa-unlock m-0 p-1" />
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
                              minLength={1}
                              maxLength={300}
                              className="form-control form-control-sm text-center m-0 p-1"
                            />
                            <small className="text-danger m-0 p-0">
                              * обязательно
                              <small className="custom-color-warning-1 m-0 p-0">
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
                            <i className="fa-solid fa-circle-check m-0 p-1" />
                            проверить код
                          </button>
                          <button
                            type="button"
                            onClick={handlerSubmitSendEmail}
                            className="btn btn-sm btn-danger m-1 p-2"
                          >
                            <i className="fa-solid fa-envelope m-0 p-1" />
                            отправить код на почту
                          </button>
                        </ul>
                      </div>
                    </div>
                  </form>
                </ul>
              </div>
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
                      <i className="fa-solid fa-key m-0 p-1" />
                      Введите пароль для входа в аккаунт:
                      <div className="input-group form-control-sm m-0 p-1">
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
                                util.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              )
                            )
                          }
                          minLength={8}
                          maxLength={18}
                          autoComplete="off"
                        />
                        <span className="">
                          <i
                            className="fa-solid fa-eye btn btn-outline-secondary m-0 p-3"
                            onClick={() =>
                              util.ChangePasswordVisibility(["password"])
                            }
                          />
                        </span>
                      </div>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
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
                      <i className="fa-solid fa-key m-0 p-1" />
                      Повторите новый пароль:
                      <div className="input-group form-control-sm m-0 p-1">
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
                                util.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              )
                            )
                          }
                          minLength={8}
                          maxLength={16}
                          autoComplete="off"
                        />
                        <span className="">
                          <i
                            className="fa-solid fa-eye btn btn-outline-secondary m-0 p-3"
                            onClick={() =>
                              util.ChangePasswordVisibility(["password2"])
                            }
                          />
                        </span>
                      </div>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
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
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      сохранить новые данные
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                      onClick={(e) => handlerRecoverPasswordReset(e)}
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        )}
      </div>
    </base.BaseComponent1>
  );
};
