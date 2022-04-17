// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as actions from "../../js/actions";
import * as constants from "../../js/constants";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const LoginPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [username, usernameSet] = useState("");
  const [password, passwordSet] = useState("");
  const [captcha, captchaSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const userLoginStore = useSelector((state) => state.userLoginStore);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataUserLogin) {
      localStorage.setItem("userToken", JSON.stringify(dataUserLogin));
      utils.Sleep(10).then(() => {
        navigate("/news");
      });
    }
  }, [dataUserLogin]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerLoginSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    if (captcha && captcha !== "") {
      const form = {
        "Action-type": "USER_LOGIN",
        username: username,
        password: password,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/any/user/login/",
          "POST",
          30000,
          constants.USER_LOGIN,
          false
        )
      );
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
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerLoginSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              {!captcha && (
                <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                  <i className="fa-solid fa-robot m-0 p-1" />
                  Пройдите проверку на робота!
                </div>
              )}
              <div className="card-header m-0 p-0">
                <components.StoreStatusComponent
                  storeStatus={userLoginStore}
                  keyStatus={"userLoginStore"}
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
                    <i className="fa-solid fa-id-card m-0 p-1" />
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
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    <i className="fa-solid fa-key m-0 p-1" />
                    Введите пароль от аккаунта:
                    <div className="input-group form-control-sm m-0 p-1">
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
                      <span className="">
                        <i
                          className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
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
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    войти в систему
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={(e) => handlerLoginReset(e)}
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить данные
                  </button>
                </ul>
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <Link
                    to="/recover_password"
                    className="btn btn-sm btn-success m-1 p-2"
                  >
                    <i className="fa-solid fa-universal-access m-0 p-1" />
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
