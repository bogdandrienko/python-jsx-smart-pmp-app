// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as action from "../../components/action";
import * as util from "../../components/util";
import * as component from "../../components/ui/component";
import * as hook from "../../components/hook";
import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RecoverUserPasswordPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const adminCheckUserStore = hook.useSelectorCustom1(
    constant.adminCheckUserStore
  );
  const adminChangePasswordUserStore = hook.useSelectorCustom1(
    constant.adminChangePasswordUserStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [user, setUser, resetUser] = hook.useStateCustom1({
    username: "",
  });

  const [passwords, setPasswords, resetPasswords] = hook.useStateCustom1({
    password: "",
    password2: "",
  });

  const [isModalChangePasswordVisible, setIsModalChangePasswordVisible] =
    useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (adminChangePasswordUserStore.data) {
      util.Delay(() => {
        dispatch({ type: constant.adminCheckUserStore.reset });
        dispatch({ type: constant.adminChangePasswordUserStore.reset });
        Check();
      }, 100);
    }
  }, [adminChangePasswordUserStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  const Check = () => {
    dispatch({ type: constant.adminCheckUserStore.reset });
    dispatch({ type: constant.adminChangePasswordUserStore.reset });
    dispatch(
      action.Admin.CheckUser({
        form: { username: user.username },
      })
    );
  };

  const ChangeUserPassword = () => {
    dispatch(
      action.Admin.ChangeUserPassword({
        form: {
          username: adminCheckUserStore.data["username"],
          ...passwords,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <message.Message.Danger>
        Все Ваши действия записываются в логи!
      </message.Message.Danger>
      <component.StoreComponent1
        stateConstant={constant.adminCheckUserStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={true}
        dataText={"Пользователь успешно найден!"}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      <component.StoreComponent1
        stateConstant={constant.adminChangePasswordUserStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={true}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      {!adminCheckUserStore.load && (
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
                <h2>Изменить пароль от аккаунта</h2>
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
                      value={user.username}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          username: event.target.value.replace(
                            util.GetRegexType({
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
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="button"
                    onClick={() => {
                      dispatch({ type: constant.adminCheckUserStore.reset });
                      resetUser();
                    }}
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    сбросить
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      )}
      {adminCheckUserStore.data && (
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
                <td>{adminCheckUserStore.data["username"]}</td>
              </tr>
              <tr>
                <td>Табельный номер</td>
                <td>
                  {
                    adminCheckUserStore.data["user_model"][
                      "personnel_number_slug_field"
                    ]
                  }
                </td>
              </tr>
              <tr>
                <td>Ф.И.О.</td>
                <td>
                  {
                    adminCheckUserStore.data["user_model"][
                      "last_name_char_field"
                    ]
                  }{" "}
                  {
                    adminCheckUserStore.data["user_model"][
                      "first_name_char_field"
                    ]
                  }{" "}
                  {
                    adminCheckUserStore.data["user_model"][
                      "patronymic_char_field"
                    ]
                  }
                </td>
              </tr>
              <tr>
                <td>Должность</td>
                <td>
                  {
                    adminCheckUserStore.data["user_model"][
                      "position_char_field"
                    ]
                  }{" "}
                  {" | "}{" "}
                  {
                    adminCheckUserStore.data["user_model"][
                      "subdivision_char_field"
                    ]
                  }
                  {" | "}
                  {
                    adminCheckUserStore.data["user_model"][
                      "department_site_char_field"
                    ]
                  }
                  {" | "}
                  {
                    adminCheckUserStore.data["user_model"][
                      "workshop_service_char_field"
                    ]
                  }
                </td>
              </tr>
              <tr>
                <td>Группы пользователя</td>
                <td>{adminCheckUserStore.data["group_model"].join(", ")}</td>
              </tr>
              <tr>
                <td>Последний вход</td>
                <td>
                  {adminCheckUserStore.data["last_login"] &&
                    adminCheckUserStore.data["last_login"].split("T")[0] +
                      " " +
                      adminCheckUserStore.data["last_login"]
                        .split("T")[1]
                        .slice(0, 8)}
                </td>
              </tr>
              <tr>
                <td>Почта</td>
                <td>{adminCheckUserStore.data["user_model"]["email_field"]}</td>
              </tr>
              <tr>
                <td>Активность пользователя</td>
                {adminCheckUserStore.data["user_model"][
                  "activity_boolean_field"
                ] ? (
                  <td className="text-success">активен</td>
                ) : (
                  <td className="text-danger">неактивен</td>
                )}
              </tr>
              <tr>
                <td>Тип пароля</td>
                {adminCheckUserStore.data["user_model"][
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
                  {adminCheckUserStore.data["user_model"][
                    "temp_password_boolean_field"
                  ]
                    ? adminCheckUserStore.data["user_model"][
                        "password_char_field"
                      ]
                    : util.GetSliceString(
                        adminCheckUserStore.data["password"],
                        30
                      )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {adminCheckUserStore.data && (
        <div className="">
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form
              className="m-0 p-1"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsModalChangePasswordVisible(true);
              }}
            >
              <modal.ModalConfirm2
                isModalVisible={isModalChangePasswordVisible}
                setIsModalVisible={setIsModalChangePasswordVisible}
                description={"Заменить пароль пользователя?"}
                callback={() => ChangeUserPassword()}
              />
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
                          placeholder="введите новый пароль тут..."
                          minLength={8}
                          maxLength={16}
                          autoComplete="off"
                          required
                          value={passwords.password}
                          onChange={(event) =>
                            setPasswords({
                              ...passwords,
                              password: event.target.value.replace(
                                util.GetRegexType({
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
                            onClick={(e) =>
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
                          placeholder="введите новый пароль тут..."
                          minLength={8}
                          maxLength={16}
                          autoComplete="off"
                          required
                          value={passwords.password2}
                          onChange={(event) =>
                            setPasswords({
                              ...passwords,
                              password2: event.target.value.replace(
                                util.GetRegexType({
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
                            onClick={(e) =>
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
                      onClick={() => resetPasswords()}
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        </div>
      )}
    </base.Base1>
  );
};
