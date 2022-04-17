// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";

import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const ActionsUserPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [username, usernameSet] = useState("");
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const adminCheckUserStore = useSelector((state) => state.adminCheckUserStore);
  const {
    //   // load: loadAdminCheckUser,
    data: dataAdminCheckUser,
    //   // error: errorAdminCheckUser,
    //   // fail: failAdminCheckUser,
  } = adminCheckUserStore;
  //////////////////////////////////////////////////////////
  const adminChangeUserPasswordStore = useSelector(
    (state) => state.adminChangeUserPasswordStore
  );
  const {
    //   // load: loadAdminChangeUserPassword,
    data: dataAdminChangeUserPassword,
    //   // error: errorAdminChangeUserPassword,
    //   // fail: failAdminChangeUserPassword,
  } = adminChangeUserPasswordStore;
  //////////////////////////////////////////////////////////
  const adminChangeUserActivityStore = useSelector(
    (state) => state.adminChangeUserActivityStore
  );
  const {
    //   // load: loadAdminChangeUserActivity,
    data: dataAdminChangeUserActivity,
    //   // error: errorAdminChangeUserActivity,
    //   // fail: failAdminChangeUserActivity,
  } = adminChangeUserActivityStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataAdminChangeUserPassword || dataAdminChangeUserActivity) {
      utils.Sleep(10).then(() => {
        handlerCheckUserSubmit();
      });
    }
  }, [dataAdminChangeUserPassword, dataAdminChangeUserActivity]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerCheckUserSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "ADMIN_CHECK_USER",
      username: username,
    };
    dispatch(
      utils.ActionConstructorUtility(
        form,
        "/api/auth/admin/check_user/",
        "POST",
        30000,
        constants.ADMIN_CHECK_USER
      )
    );
  };
  //////////////////////////////////////////////////////////
  const handlerChangeUserPasswordSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let confirm = window.confirm(
      "Вы действительно хотите сбросить пароль пользователя?"
    );
    if (confirm) {
      const form = {
        "Action-type": "ADMIN_CHANGE_USER_PASSWORD",
        username: dataAdminCheckUser["username"],
        password: "temp_" + password,
        password2: "temp_" + password2,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/admin/change_user_password/",
          "POST",
          30000,
          constants.ADMIN_CHANGE_USER_PASSWORD
        )
      );
    }
  };
  //////////////////////////////////////////////////////////
  const handlerChangeUserActivitySubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let confirm = window.confirm(
      "Вы действительно хотите сменить статус пользователя?"
    );
    if (confirm) {
      const form = {
        "Action-type": "ADMIN_CHANGE_USER_ACTIVITY",
        username: dataAdminCheckUser["username"],
        activity: !dataAdminCheckUser["user_model"]["activity_boolean_field"],
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/admin/change_user_activity/",
          "POST",
          30000,
          constants.ADMIN_CHANGE_USER_ACTIVITY
        )
      );
    }
  };
  //////////////////////////////////////////////////////////
  const handlerChangeUserPasswordReset = async (e) => {
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
        <components.MessageComponent variant={"danger"}>
          Внимание! ВСЕ Ваши действия записываются в логи!
        </components.MessageComponent>
        <components.StoreStatusComponent
          storeStatus={adminCheckUserStore}
          keyStatus={"adminCheckUserStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={"Пользователь с таким ИИН успешно найден!"}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <components.StoreStatusComponent
          storeStatus={adminChangeUserPasswordStore}
          keyStatus={"adminChangeUserPasswordStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <components.StoreStatusComponent
          storeStatus={adminChangeUserActivityStore}
          keyStatus={"adminChangeUserActivityStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerCheckUserSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-body m-0 p-0">
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    Введите ИИН пользователя:
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
                    className="btn btn-sm btn-outline-primary m-1 p-2"
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    получить данные
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
        {dataAdminCheckUser && (
          <div className="bg-light bg-opacity-100">
            <table className="table table-striped table-bordered table-responsive border-dark">
              <thead className="bg-primary bg-opacity-10">
                <tr>
                  <td>Тип</td>
                  <td>Описание</td>
                </tr>
              </thead>
              <tbody className="bg-light bg-opacity-25">
                <tr>
                  <td>ИИН</td>
                  <td>{dataAdminCheckUser["username"]}</td>
                </tr>
                <tr>
                  <td>Табельный номер</td>
                  <td>
                    {
                      dataAdminCheckUser["user_model"][
                        "personnel_number_slug_field"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td>Ф.И.О.</td>
                  <td>
                    {dataAdminCheckUser["user_model"]["last_name_char_field"]}{" "}
                    {dataAdminCheckUser["user_model"]["first_name_char_field"]}{" "}
                    {dataAdminCheckUser["user_model"]["patronymic_char_field"]}
                  </td>
                </tr>
                <tr>
                  <td>Должность</td>
                  <td>
                    {dataAdminCheckUser["user_model"]["position_char_field"]}{" "}
                    {" | "}{" "}
                    {dataAdminCheckUser["user_model"]["subdivision_char_field"]}
                    {" | "}
                    {
                      dataAdminCheckUser["user_model"][
                        "department_site_char_field"
                      ]
                    }
                    {" | "}
                    {
                      dataAdminCheckUser["user_model"][
                        "workshop_service_char_field"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td>Группы пользователя</td>
                  <td>{dataAdminCheckUser["group_model"].join(", ")}</td>
                </tr>
                <tr>
                  <td>Последний вход</td>
                  <td>
                    {dataAdminCheckUser["last_login"] &&
                      dataAdminCheckUser["last_login"].split("T")[0] +
                        " " +
                        dataAdminCheckUser["last_login"]
                          .split("T")[1]
                          .slice(0, 8)}
                  </td>
                </tr>
                <tr>
                  <td>Почта</td>
                  <td>{dataAdminCheckUser["user_model"]["email_field"]}</td>
                </tr>
                <tr>
                  <td>Активность пользователя</td>
                  {dataAdminCheckUser["user_model"][
                    "activity_boolean_field"
                  ] ? (
                    <td className="text-success">активен</td>
                  ) : (
                    <td className="text-danger">неактивен</td>
                  )}
                </tr>
                <tr>
                  <td>Тип пароля</td>
                  {dataAdminCheckUser["user_model"][
                    "temp_password_boolean_field"
                  ] ? (
                    <td className="text-danger">временный</td>
                  ) : (
                    <td className="text-success">постоянный</td>
                  )}
                </tr>
                <tr>
                  <td>Пароль</td>
                  <td>
                    {dataAdminCheckUser["user_model"][
                      "temp_password_boolean_field"
                    ]
                      ? dataAdminCheckUser["user_model"]["password_char_field"]
                      : utils.GetSliceString(
                          dataAdminCheckUser["password"],
                          30
                        )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {dataAdminCheckUser && (
          <div className="">
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
              <form
                className="m-0 p-1"
                onSubmit={handlerChangeUserPasswordSubmit}
              >
                <div className="card shadow custom-background-transparent-low m-0 p-0">
                  <div className="card-body m-0 p-0">
                    <div className="m-0 p-1">
                      <h5 className="lead">
                        Сбросить пароль от аккаунта на временный
                      </h5>
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
                            minLength="4"
                            maxLength="4"
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
                            * длина: 4 символа
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
                            minLength="4"
                            maxLength="4"
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
                            * длина: 4 символа
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
                        onClick={(e) => handlerChangeUserPasswordReset(e)}
                      >
                        <i className="fa-solid fa-pen-nib m-0 p-1" />
                        сбросить данные
                      </button>
                    </ul>
                  </div>
                </div>
              </form>
              <form
                className="m-0 p-1"
                onSubmit={handlerChangeUserActivitySubmit}
              >
                <div className="card shadow custom-background-transparent-low m-0 p-0">
                  <h5 className="lead">Сменить активность аккаунта</h5>
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      {dataAdminCheckUser["user_model"][
                        "activity_boolean_field"
                      ] ? (
                        <button
                          className="btn btn-sm btn-outline-danger m-1 p-2"
                          type="submit"
                        >
                          <i className="fa-solid fa-circle-check m-0 p-1" />
                          Отключить
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-success m-1 p-2"
                          type="submit"
                        >
                          <i className="fa-solid fa-circle-check m-0 p-1" />
                          Включить
                        </button>
                      )}
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
