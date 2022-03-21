///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const AdminChangeUserPasswordPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [captcha, captchaSet] = useState("");
  const [username, usernameSet] = useState("");
  const [success, successSet] = useState(false);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const adminChangeUserPasswordStore = useSelector(
    (state) => state.adminChangeUserPasswordStore
  );
  const {
    // load: loadAdminChangeUserPassword,
    data: dataAdminChangeUserPassword,
    // error: errorAdminChangeUserPassword,
    // fail: failAdminChangeUserPassword,
  } = adminChangeUserPasswordStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataAdminChangeUserPassword) {
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
    }
  }, [navigate, dataAdminChangeUserPassword, dispatch]);

  const handlerCheckUserSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    if (captcha !== "") {
      const form = {
        "Action-type": "CHECK_USER",
        username: username,
      };
      dispatch(actions.adminChangeUserPasswordAction(form));
    }
  };

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
      utils.Sleep(5000).then(() => {
        dispatch({ type: constants.ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT });
      });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
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
        {!captcha && (
          <components.MessageComponent variant="danger">
            Пройдите проверку на робота!
          </components.MessageComponent>
        )}
        {!success ? (
          <div>
            <div className="form-control">
              <form
                method="POST"
                target="_self"
                encType="multipart/form-data"
                name="account_login"
                autoComplete="on"
                className="text-center p-1 m-1"
                onSubmit={handlerCheckUserSubmit}
              >
                <div>
                  <label className="m-1">
                    <ReCAPTCHA
                      sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                      onChange={(e) => captchaSet(e)}
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control-sm m-1 lead">
                    Введите ИИН пользователя для смены пароля:
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      placeholder=""
                      value={username}
                      onChange={(e) => usernameSet(e.target.value)}
                      minLength="12"
                      maxLength="12"
                      className="form-control form-control-sm"
                    />
                    <p>
                      <small className="text-danger">* обязательно</small>
                      <p>
                        <small className="text-muted">
                          количество символов: 12
                        </small>
                      </p>
                    </p>
                  </label>
                </div>
                <hr />
                <div className="container text-center">
                  <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                    <div className="m-1">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary form-control"
                      >
                        Проверить идентификатор
                      </button>
                    </div>
                    <div className="m-1">
                      <button
                        type="reset"
                        onClick={(e) => {
                          usernameSet("");
                        }}
                        className="btn btn-sm btn-warning form-control"
                      >
                        Сбросить данные
                      </button>
                    </div>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {success && (
          <form
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="account_login"
            autoComplete="on"
            className="text-center p-1 m-1"
            onSubmit={handlerChangeUserPasswordSubmit}
          >
            <div>
              <label className="form-control-sm m-1 lead">
                Введите пароль для входа в аккаунт:
                <p>
                  <small className="text-danger">
                    Только латинские буквы и цифры!
                  </small>
                </p>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder=""
                  value={password}
                  onChange={(e) => passwordSet(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-sm"
                  autoComplete="none"
                  aria-autocomplete="none"
                />
                <p>
                  <small className="text-danger">* обязательно</small>
                  <p>
                    <small className="text-muted">
                      количество символов: от 8 до 32
                    </small>
                  </p>
                </p>
              </label>
              <label className="form-control-sm m-1 lead">
                Повторите новый пароль:
                <p>
                  <small className="text-danger">
                    Только латинские буквы и цифры!
                  </small>
                </p>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  required
                  placeholder=""
                  value={password2}
                  onChange={(e) => password2Set(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-sm"
                  autoComplete="none"
                  aria-autocomplete="none"
                />
                <p>
                  <small className="text-danger">* обязательно</small>
                  <p>
                    <small className="text-muted">
                      количество символов: от 8 до 32
                    </small>
                  </p>
                </p>
              </label>
            </div>
            <hr />
            <div className="container text-center">
              <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                <div className="m-1">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary form-control"
                  >
                    Сохранить новые данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    type="reset"
                    onClick={(e) => {
                      passwordSet("");
                      password2Set("");
                    }}
                    className="btn btn-sm btn-warning form-control"
                  >
                    Сбросить данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    type="button"
                    onClick={(e) =>
                      utils.ChangePasswordVisibility(["password", "password2"])
                    }
                    className="btn btn-sm btn-danger form-control"
                  >
                    Видимость пароля
                  </button>
                </div>
              </ul>
            </div>
          </form>
        )}
      </main>
      <components.FooterComponent />
    </body>
  );
};
