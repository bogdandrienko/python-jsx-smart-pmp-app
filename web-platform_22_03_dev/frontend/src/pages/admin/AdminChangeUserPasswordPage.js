import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import MessageComponent from "../../components/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AdminChangeUserPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [captcha, captchaSet] = useState("");
  const [username, usernameSet] = useState("");
  const [success, successSet] = useState(false);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");

  const adminChangeUserPasswordStore = useSelector(
    (state) => state.adminChangeUserPasswordStore
  ); // store.js
  const {
    // load: loadAdminChangeUserPassword,
    data: dataAdminChangeUserPassword,
    // error: errorAdminChangeUserPassword,
    // fail: failAdminChangeUserPassword,
  } = adminChangeUserPasswordStore;

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

  const formHandlerSubmitCheckUser = (e) => {
    e.preventDefault();
    if (captcha !== "") {
      const form = {
        "Action-type": "CHECK_USER",
        username: username,
      };
      dispatch(actions.adminChangeUserPasswordAuthAction(form));
    }
  };

  const formHandlerSubmitChangeUserPassword = (e) => {
    e.preventDefault();
    if (success) {
      const form = {
        "Action-type": "CHANGE_USER_PASSWORD",
        username: username,
        password: password,
        password2: password2,
      };
      dispatch(actions.adminChangeUserPasswordAuthAction(form));
      utils.Sleep(5000).then(() => {
        dispatch({ type: constants.ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT });
      });
    }
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Изменение пароля выбранного пользователя"}
        second={"страница редактирования пароля от выбранного аккаунта."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            adminChangeUserPasswordStore,
            "adminChangeUserPasswordStore",
            true,
            "Пользователь найден или пароль успешно изменён!",
            constants.DEBUG_CONSTANT
          )}
          {!captcha && (
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
                onSubmit={formHandlerSubmitCheckUser}
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
                  <label className="form-control-md m-1 lead">
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
                        type="submit"
                        className="btn btn-md btn-primary form-control"
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
            onSubmit={formHandlerSubmitChangeUserPassword}
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
                  onChange={(e) => passwordSet(e.target.value)}
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
                  onChange={(e) => password2Set(e.target.value)}
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
                    type="submit"
                    className="btn btn-md btn-primary form-control"
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
                    className="btn btn-md btn-warning form-control"
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
