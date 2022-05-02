// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as util from "../../components/util";
import * as slice from "../../components/slice";

import * as base from "../../components/ui/base";
import * as hook from "../../components/hook";
import * as constant from "../../components/constant";
import * as action from "../../components/action";
import * as captcha from "../../components/ui/captcha";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RecoverPasswordPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const captchaCheckStore = hook.useSelectorCustom2(
    slice.captcha.captchaCheckStore
  );
  const userRecoverPasswordStore = hook.useSelectorCustom2(
    slice.user.userRecoverPasswordStore
  );
  const userRecoverPasswordSendEmailStore = hook.useSelectorCustom2(
    slice.user.userRecoverPasswordSendEmailStore
  );
  const userRecoverPasswordChangePasswordStore = hook.useSelectorCustom2(
    slice.user.userRecoverPasswordChangePasswordStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recover, setRecover, resetRecover] = hook.useStateCustom1({
    stage: "First",
    username: "",
    secretQuestion: "",
    secretAnswer: "",
    email: "",
    recoverPassword: "",
  });

  const [user, setUser, resetUser] = hook.useStateCustom1({
    secretQuestion: "",
    secretAnswer: "",
    email: "",
    password: "",
    password2: "",
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (userRecoverPasswordStore.data) {
      setRecover({ ...recover, ...userRecoverPasswordStore.data });
    }
  }, [userRecoverPasswordStore.data]);

  useEffect(() => {
    resetRecover();
    resetUser();
    dispatch({
      type: slice.user.userRecoverPasswordSendEmailStore.constant.reset,
    });
  }, []);

  useEffect(() => {
    if (userRecoverPasswordChangePasswordStore.data) {
      util.Delay(() => {
        resetRecover();
        resetUser();
        dispatch(action.user.logout());
        dispatch({
          type: slice.user.userRecoverPasswordChangePasswordStore.constant
            .reset,
        });
        navigate("/login");
      }, 10);
    }
  }, [userRecoverPasswordChangePasswordStore.data]);

  useEffect(() => {
    if (userRecoverPasswordSendEmailStore.data) {
      util.Delay(
        () =>
          dispatch({
            type: slice.user.userRecoverPasswordSendEmailStore.constant.reset,
          }),
        5000
      );
    }
  }, [userRecoverPasswordSendEmailStore.data]);

  useEffect(() => {
    if (userRecoverPasswordSendEmailStore.error) {
      util.Delay(
        () =>
          dispatch({
            type: slice.user.userRecoverPasswordSendEmailStore.constant.reset,
          }),
        5000
      );
    }
  }, [userRecoverPasswordSendEmailStore.error]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const Check = () => {
    if (captchaCheckStore.data) {
      dispatch(
        slice.user.userRecoverPasswordStore.action({
          form: { username: recover.username },
        })
      );
    }
  };

  const CheckAnswer = () => {
    dispatch(
      slice.user.userRecoverPasswordStore.action({
        form: {
          username: recover.username,
          secretAnswer: recover.secretAnswer,
        },
      })
    );
  };

  const CheckRecoverCode = () => {
    dispatch(
      slice.user.userRecoverPasswordStore.action({
        form: {
          username: recover.username,
          recoverPassword: recover.recoverPassword,
        },
      })
    );
  };

  const SendMailCode = () => {
    dispatch(
      slice.user.userRecoverPasswordSendEmailStore.action({
        form: {
          username: recover.username,
          ...user,
        },
      })
    );
  };

  const ChangePassword = () => {
    dispatch(
      slice.user.userRecoverPasswordChangePasswordStore.action({
        form: {
          username: recover.username,
          ...user,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.StatusStore1
        slice={slice.user.userRecoverPasswordStore}
        consoleLog={constant.DEBUG_CONSTANT}
        dataText={"Пользователь успешно найден или данные совпали!"}
      />
      <component.StatusStore1
        slice={slice.user.userRecoverPasswordSendEmailStore}
        consoleLog={constant.DEBUG_CONSTANT}
        dataText={"Письмо успешно отправлено!"}
      />
      <component.StatusStore1
        slice={slice.user.userRecoverPasswordChangePasswordStore}
        consoleLog={constant.DEBUG_CONSTANT}
        dataText={"Пароль успешно изменён!"}
      />
      <div className="m-0 p-1">
        {recover.stage === "First" && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                Check();
              }}
            >
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header m-0 p-1">
                  <h2>Восстановить пароль от аккаунта</h2>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Введите Ваш ИИН:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        placeholder="введите ИИН тут..."
                        required
                        minLength={12}
                        maxLength={12}
                        value={recover.username}
                        onChange={(event) =>
                          setRecover({
                            ...recover,
                            username: event.target.value.replace(
                              util.RegularExpression.GetRegexType({
                                numbers: true,
                              }),
                              ""
                            ),
                          })
                        }
                        autoComplete="current-username"
                      />
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только цифры
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: 12 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="m-0 p-1">
                      <captcha.Captcha1 />
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
        )}
        {recover.stage === "Second" && (
          <div className="shadow m-0 p-0">
            <component.Accordion1
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
            </component.Accordion1>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 shadow m-0 p-0">
              <div className="col-6 m-0 p-0">
                <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center text-center m-0 p-1">
                  <form
                    className="m-0 p-0"
                    onSubmit={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      CheckAnswer();
                    }}
                  >
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
                                <small className="lead">{`${recover.secretQuestion}`}</small>
                                '
                              </small>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center m-0 p-1"
                              id="secretAnswer"
                              name="secretAnswer"
                              required
                              placeholder="введите секретный ответ тут..."
                              minLength={4}
                              maxLength={32}
                              value={recover.secretAnswer}
                              onChange={(event) =>
                                setRecover({
                                  ...recover,
                                  secretAnswer: event.target.value.replace(
                                    util.RegularExpression.GetRegexType({
                                      numbers: true,
                                      cyrillic: true,
                                      space: true,
                                    }),
                                    ""
                                  ),
                                })
                              }
                            />
                            <small className="custom-color-warning-1 m-0 p-0">
                              * только кириллица
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
                    onSubmit={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      CheckRecoverCode();
                    }}
                  >
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                        Восстановление через почту:
                      </div>
                      <div className="card-header bg-secondary bg-opacity-10 text-muted m-0 p-1">
                        Часть почты, куда будет отправлено письмо: '
                        <small className="custom-color-warning-1">
                          {recover.email &&
                            `${recover.email.slice(
                              0,
                              4
                            )} ... ${recover.email.slice(-5)}`}
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
                              className="form-control form-control-sm text-center m-0 p-1"
                              required
                              placeholder="введите код с почты тут..."
                              minLength={1}
                              maxLength={300}
                              value={recover.recoverPassword}
                              onChange={(event) =>
                                setRecover({
                                  ...recover,
                                  recoverPassword: event.target.value,
                                })
                              }
                            />
                            <small className="custom-color-warning-1 m-0 p-0">
                              * вводить без кавычек
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
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              SendMailCode();
                            }}
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
        )}
        {recover.stage === "Third" && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                ChangePassword();
              }}
            >
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
                          placeholder="введите новый пароль тут..."
                          required
                          minLength={8}
                          maxLength={18}
                          autoComplete="off"
                          value={user.password}
                          onChange={(event) =>
                            setUser({
                              ...user,
                              password: event.target.value.replace(
                                util.RegularExpression.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              ),
                            })
                          }
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
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только латиница
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
                          placeholder="введите новый пароль тут..."
                          required
                          minLength={8}
                          maxLength={16}
                          autoComplete="off"
                          value={user.password2}
                          onChange={(event) =>
                            setUser({
                              ...user,
                              password2: event.target.value.replace(
                                util.RegularExpression.GetRegexType({
                                  numbers: true,
                                  latin: true,
                                  lowerSpace: true,
                                }),
                                ""
                              ),
                            })
                          }
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
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только латиница
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
                      onClick={() => resetUser()}
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
    </base.Base1>
  );
};
