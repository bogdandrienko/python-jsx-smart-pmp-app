import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { adminChangeUserPasswordAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import ReCAPTCHA from "react-google-recaptcha";
import { ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT } from "../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AdminChangeUserPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [capcha, setCapcha] = useState("");
  const [username, setUsername] = useState("");

  const [success, setSuccess] = useState(false);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const adminChangeUserPasswordStore = useSelector(
    (state) => state.adminChangeUserPasswordStore
  );
  const {
    load: loadAdminChangeUserPassword,
    data: dataAdminChangeUserPassword,
    error: errorAdminChangeUserPassword,
    fail: failAdminChangeUserPassword,
  } = adminChangeUserPasswordStore;
  console.log("dataAdminChangeUserPassword: ", dataAdminChangeUserPassword);

  useEffect(() => {
    if (dataAdminChangeUserPassword) {
      if (dataAdminChangeUserPassword["success"]) {
        setSuccess(dataAdminChangeUserPassword["success"]);
      } else {
        setSuccess(false);
      }
      if (dataAdminChangeUserPassword["username"]) {
        setUsername(dataAdminChangeUserPassword["username"]);
      } else {
        setUsername("");
      }
    }
  }, [navigate, dataAdminChangeUserPassword, dispatch]);

  const submitCheckUserHandler = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      const form = {
        "Action-type": "CHECK_USER",
        username: username,
      };
      dispatch(adminChangeUserPasswordAction(form));
    }
  };

  const submitChangeUserPasswordHandler = (e) => {
    e.preventDefault();
    if (success) {
      const form = {
        "Action-type": "CHANGE_USER_PASSWORD",
        username: username,
        password: password,
        password2: password2,
      };
      dispatch(adminChangeUserPasswordAction(form));
      sleep(5000).then(() => {
        dispatch({ type: ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT });
      });
    }
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    password2.setAttribute("type", type);
  };

  function changeCapcha(value) {
    setCapcha(value);
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Изменение пароля выбранноого пользователя"}
        second={"страница редактирования пароля от выбранного аккаунта."}
      />
      <main className="container text-center">
        <div className="text-center">
          {loadAdminChangeUserPassword && <LoaderComponent />}
          {dataAdminChangeUserPassword && (
            <div className="m-1">
              <MessageComponent variant="success">
                Пользователь найден или пароль успешно изменён!
              </MessageComponent>
            </div>
          )}
          {errorAdminChangeUserPassword && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorAdminChangeUserPassword}
              </MessageComponent>
            </div>
          )}
          {failAdminChangeUserPassword && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failAdminChangeUserPassword}
              </MessageComponent>
            </div>
          )}
          {!capcha && (
            <MessageComponent variant="danger">
              Пройдите проверку на робота!
            </MessageComponent>
          )}
        </div>
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
                onSubmit={submitCheckUserHandler}
              >
                <div>
                  <label className="m-1">
                    <ReCAPTCHA
                      sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                      onChange={changeCapcha}
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control-md m-1 lead">
                    Введите ИИН пользователя для смены пароля:
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      placeholder=""
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      minLength="12"
                      maxLength="12"
                      className="form-control form-control-md"
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
                        href=""
                        type="submit"
                        className="btn btn-md btn-primary form-control"
                      >
                        Проверить идентификатор
                      </button>
                    </div>
                    <div className="m-1">
                      <button
                        href=""
                        type="reset"
                        onClick={(e) => {
                          setUsername("");
                        }}
                        className="btn btn-md btn-warning form-control"
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
            onSubmit={submitChangeUserPasswordHandler}
          >
            <div>
              <label className="form-control-md m-1 lead">
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
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-md"
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
              <label className="form-control-md m-1 lead">
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
                  onChange={(e) => setPassword2(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-md"
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
                    href=""
                    type="submit"
                    className="btn btn-md btn-primary form-control"
                  >
                    Сохранить новые данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    href=""
                    type="reset"
                    onClick={(e) => {
                      setPassword("");
                      setPassword2("");
                    }}
                    className="btn btn-md btn-warning form-control"
                  >
                    Сбросить данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    href=""
                    type="button"
                    onClick={changeVisibility}
                    className="btn btn-md btn-danger form-control"
                  >
                    Видимость пароля
                  </button>
                </div>
              </ul>
            </div>
          </form>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default AdminChangeUserPasswordPage;
