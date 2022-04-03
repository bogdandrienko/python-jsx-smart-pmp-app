// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const AdminChangeUserPasswordPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [username, usernameSet] = useState("");
  const [success, successSet] = useState(false);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const adminChangeUserPasswordStore = useSelector(
    (state) => state.adminChangeUserPasswordStore
  );
  const {
    // load: loadAdminChangeUserPassword,
    data: dataAdminChangeUserPassword,
    // error: errorAdminChangeUserPassword,
    // fail: failAdminChangeUserPassword,
  } = adminChangeUserPasswordStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataAdminChangeUserPassword) {
      utils.Sleep(10).then(() => {
        dispatch({ type: constants.ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT });
        if (dataAdminChangeUserPassword["success"]) {
          successSet(dataAdminChangeUserPassword["success"]);
        } else {
          successSet(false);
        }
        if (dataAdminChangeUserPassword["username"]) {
          usernameSet(dataAdminChangeUserPassword["username"]);
        } else {
          usernameSet("");
        }
      });
    }
  }, [dataAdminChangeUserPassword]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerCheckUserSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "CHECK_USER",
      username: username,
    };
    dispatch(actions.adminChangeUserPasswordAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerChangeUserPasswordSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    if (success) {
      const form = {
        "Action-type": "CHANGE_USER_PASSWORD",
        username: username,
        password: password,
        password2: password2,
      };
      dispatch(actions.adminChangeUserPasswordAction(form));
    }
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
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={adminChangeUserPasswordStore}
          key={"adminChangeUserPasswordStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={"Пользователь найден или пароль успешно изменён!"}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!success ? (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerCheckUserSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Введите ИИН пользователя для смены пароля:
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
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form
              className="m-0 p-0"
              onSubmit={handlerChangeUserPasswordSubmit}
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
                        <span className="">
                          <i
                            className="fa-solid fa-eye btn btn-outline-secondary m-0 p-3"
                            onClick={(e) =>
                              utils.ChangePasswordVisibility(["password"])
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
                        <span className="">
                          <i
                            className="fa-solid fa-eye btn btn-outline-secondary m-0 p-3"
                            onClick={(e) =>
                              utils.ChangePasswordVisibility(["password2"])
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
      </main>
      <components.FooterComponent />
    </div>
  );
};