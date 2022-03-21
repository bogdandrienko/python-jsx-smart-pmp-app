///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
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
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////components

//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const LoginPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [username, usernameSet] = useState("");
  const [password, passwordSet] = useState("");
  const [captcha, captchaSet] = useState("");

  const userLoginStore = useSelector((state) => state.userLoginStore);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginStore;

  useEffect(() => {
    if (dataUserLogin) {
      utils.Sleep(1000).then(() => {
        navigate("/news");
      });
    }
  }, [navigate, dataUserLogin]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    if (captcha && captcha !== "") {
      const form = {
        "Action-type": "USER_LOGIN",
        username: username,
        password: password,
      };
      dispatch(actions.userLoginAction(form));
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Вход в систему"}
        description={"страница для входа в систему"}
      />
      <main className="container  ">
        <div className="">
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
          {!captcha && (
            <components.MessageComponent variant="danger">
              Пройдите проверку на робота!
            </components.MessageComponent>
          )}
        </div>
        <div className="">
          <form className="text-center p-1 m-1" onSubmit={formHandlerSubmit}>
            <div>
              <label className="form-control-sm m-1 lead">
                Введите Ваш ИИН:
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
                  value={username}
                  placeholder="введите сюда ИИН..."
                  required
                  onChange={(e) => usernameSet(e.target.value)}
                  minLength="12"
                  maxLength="12"
                />
                <p>
                  <small className="text-danger">
                    * обязательно
                    <small className="text-muted">
                      {" "}
                      * количество символов: 12
                    </small>
                  </small>
                </p>
              </label>
              <label className="form-control-sm m-1 lead">
                Введите пароль для входа в аккаунт:
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  value={password}
                  placeholder="введите сюда пароль..."
                  required
                  onChange={(e) => passwordSet(e.target.value)}
                  minLength="8"
                  maxLength="32"
                />
                <p className="m-0 p-0">
                  <small className="text-danger">
                    * обязательно
                    <small className="text-muted">
                      {" "}
                      * количество символов: от 8 до 32
                    </small>
                  </small>
                </p>
              </label>
              <label className="m-1">
                <ReCAPTCHA
                  sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                  onChange={(e) => captchaSet(e)}
                />
              </label>
            </div>
            <hr />
            <div className="container">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary p-2 m-1"
                >
                  Войти в систему
                </button>
                <button
                  type="reset"
                  className="btn btn-sm btn-warning p-2 m-1"
                  onClick={(e) => {
                    passwordSet("");
                    usernameSet("");
                  }}
                >
                  Сбросить данные
                </button>
                <button
                  type="reset"
                  onClick={(e) => utils.ChangePasswordVisibility(["password"])}
                  className="btn btn-sm btn-danger p-2 m-1"
                >
                  Видимость пароля
                </button>
                <Link
                  to="/recover_password"
                  className="btn btn-sm btn-success p-2 m-1"
                >
                  Восстановить доступ к аккаунту
                </Link>
              </ul>
            </div>
          </form>
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
