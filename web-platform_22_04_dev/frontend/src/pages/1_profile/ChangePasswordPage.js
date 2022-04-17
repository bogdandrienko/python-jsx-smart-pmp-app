// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as utils from "../../js/utils";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const ChangePasswordPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    // load: loadUserChange,
    data: dataUserChange,
    actions,
    // error: errorUserChange,
    // fail: failUserChange,
  } = userChangeStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataUserChange) {
      utils.Sleep(10).then(() => {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      });
    }
  }, [dataUserChange]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerChangeSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "USER_CHANGE",
      password: password,
      password2: password2,
    };
    dispatch(
      utils.ActionConstructorUtility(
        form,
        "/api/auth/user/change/",
        "POST",
        30000,
        constants.USER_CHANGE
      )
    );
  };
  //////////////////////////////////////////////////////////
  const handlerChangeReset = async (e) => {
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
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header m-0 p-0">
                <components.StoreStatusComponent
                  storeStatus={userChangeStore}
                  keyStatus={"userChangeStore"}
                  consoleLog={constants.DEBUG_CONSTANT}
                  showLoad={true}
                  loadText={""}
                  showData={true}
                  dataText={"Данные успешно изменены!"}
                  showError={true}
                  errorText={""}
                  showFail={true}
                  failText={""}
                />
              </div>
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
                    onClick={(e) => handlerChangeReset(e)}
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить данные
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      </main>
      <components.FooterComponent />
    </div>
  );
};
