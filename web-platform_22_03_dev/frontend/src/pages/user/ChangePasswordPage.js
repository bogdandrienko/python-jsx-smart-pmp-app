///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const ChangePasswordPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    // load: loadUserChange,
    data: dataUserChange,
    // error: errorUserChange,
    // fail: failUserChange,
  } = userChangeStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataUserChange) {
      utils.Sleep(1000).then(() => {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      });
    }
  }, [navigate, dataUserChange, dispatch]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerChangeSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE",
      password: password,
      password2: password2,
    };
    dispatch(actions.userChangeAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerChangeReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    passwordSet("");
    password2Set("");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header m-0 p-0">
                <components.StoreStatusComponent
                  storeStatus={userChangeStore}
                  key={"userChangeStore"}
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
                        * только латинские буквы и цифры
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
                        * только латинские буквы и цифры
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
                    onClick={(e) => handlerChangeReset(e)}
                  >
                    сбросить данные
                  </button>
                  <button
                    type="reset"
                    onClick={(e) =>
                      utils.ChangePasswordVisibility(["password", "password2"])
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
      </main>
      <components.FooterComponent />
    </div>
  );
};
