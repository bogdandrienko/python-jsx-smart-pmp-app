///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const LoginPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [username, usernameSet] = useState("");
  const [password, passwordSet] = useState("");
  const [captcha, captchaSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userLoginStore = useSelector((state) => state.userLoginStore);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataUserLogin) {
      utils.Sleep(2000).then(() => {
        navigate("/news");
      });
    }
  }, [dataUserLogin]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerLoginSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    if (captcha && captcha !== "") {
      const form = {
        "Action-type": "USER_LOGIN",
        username: username,
        password: password,
      };
      dispatch(actions.userLoginAction(form));
    }
  };
  //////////////////////////////////////////////////////////
  const handlerLoginReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    usernameSet("");
    passwordSet("");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerLoginSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              {!captcha && (
                <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                  Пройдите проверку на робота!
                </div>
              )}
              <div className="card-header m-0 p-0">
                <components.StoreStatusComponent
                  storeStatus={userLoginStore}
                  key={"userLoginStore"}
                  consoleLog={constants.DEBUG_CONSTANT}
                  showLoad={true}
                  loadText={""}
                  showData={true}
                  dataText={"Вы успешно вошли!"}
                  showError={true}
                  errorText={""}
                  showFail={true}
                  failText={""}
                />
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-1">
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
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    Введите пароль от аккаунта:
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password"
                      value={password}
                      placeholder="введите пароль тут..."
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
                      autoComplete="current-password"
                      minLength="8"
                      maxLength="16"
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
                  <label className="m-0 p-1">
                    <ReCAPTCHA
                      sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                      onChange={(e) => captchaSet(e)}
                    />
                  </label>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className="btn btn-sm btn-primary m-1 p-2"
                    type="submit"
                  >
                    войти в систему
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={(e) => handlerLoginReset(e)}
                  >
                    сбросить данные
                  </button>
                  <button
                    type="reset"
                    onClick={(e) =>
                      utils.ChangePasswordVisibility(["password"])
                    }
                    className="btn btn-sm btn-danger m-1 p-2"
                  >
                    Видимость пароля
                  </button>
                  <Link
                    to="/recover_password"
                    className="btn btn-sm btn-success m-1 p-2"
                  >
                    Восстановить доступ к аккаунту
                  </Link>
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
