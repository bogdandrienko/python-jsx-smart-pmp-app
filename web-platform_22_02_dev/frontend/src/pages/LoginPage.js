import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userLoginAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capcha, setCapcha] = useState("");
  const [error, setError] = useState("");

  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    load: loadUserLogin,
    data: dataUserLogin,
    error: errorUserLogin,
    fail: failUserLogin,
  } = userLoginState;

  useEffect(() => {
    if (dataUserLogin) {
      sleep(1000).then(() => {
        navigate("/news");
      });
    }
  }, [navigate, dataUserLogin]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      dispatch(userLoginAction(username, password));
    } else {
      setError("Введите капчу!");
      sleep(3000).then(() => {
        setError("");
      });
    }
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  function changeCapcha(value) {
    setCapcha(value);
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Вход в систему"}
        second={"страница для входа в систему."}
        logic={true}
      />
      <main className="container text-center">
        <div>
          {loadUserLogin && <LoaderComponent />}
          {dataUserLogin && (
            <MessageComponent variant="success">
              Вы успешно вошли!
            </MessageComponent>
          )}
          {errorUserLogin && (
            <MessageComponent variant="danger">
              {errorUserLogin}
            </MessageComponent>
          )}
          {failUserLogin && (
            <MessageComponent variant="warning">
              {failUserLogin}
            </MessageComponent>
          )}
          {!capcha && (
            <MessageComponent variant="danger">
              Пройдите проверку на робота!
            </MessageComponent>
          )}
        </div>

        <div className="form-control bg-success bg-opacity-10">
          <form className="">
            <label className="form-control-lg m-1">
              <ReCAPTCHA
                sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                onChange={changeCapcha}
              />
            </label>
            <div className="input-group m-1">
              <input
                type="text"
                id="username"
                name="username"
                required=""
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="12"
                maxLength="12"
                className="form-control form-control-lg"
              />
              <input
                type="password"
                id="password"
                name="password"
                required=""
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                maxLength="32"
                className="form-control form-control-lg"
              />
              <button
                href=""
                type="button"
                onClick={changeVisibility}
                className="btn btn-lg btn-outline-danger"
              >
                Видимость пароля
              </button>
            </div>
            <div className="btn-group m-1">
              <button
                href=""
                type="submit"
                className="btn btn-lg btn-outline-primary"
              >
                Войти в систему
              </button>
              <button
                href=""
                type="reset"
                onClick={(e) => {
                  setPassword("");
                  setUsername("");
                }}
                className="btn btn-lg btn-outline-warning"
              >
                Сбросить данные
              </button>
              <a
                href="/recover_password"
                type="button"
                className="btn btn-lg btn-outline-success"
              >
                Восстановить доступ к аккаунту
              </a>
            </div>
          </form>
        </div>

        <div className="form-control bg-warning bg-opacity-10">
          <form
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="account_login"
            autoComplete="on"
            className="text-center p-1 m-1"
            onSubmit={submitHandler}
          >
            <div>
              <label className="form-control-lg m-1">
                Введите Ваш ИИН:
                <input
                  type="text"
                  id="username"
                  name="username"
                  required=""
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="12"
                  maxLength="12"
                  className="form-control form-control-lg"
                />
                <small className="text-muted">количество символов: 12</small>
              </label>
              <label className="form-control-lg m-1">
                Введите пароль для входа в аккаунт:
                <input
                  type="password"
                  id="password"
                  name="password"
                  required=""
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-lg"
                />
                <small className="text-muted">
                  количество символов: от 8 до 32
                </small>
              </label>
              <label className="form-control-lg m-1">
                <small className="lead text-danger">
                  Докажите, что Вы не робот!
                </small>
                <ReCAPTCHA
                  sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                  onChange={changeCapcha}
                />
              </label>
            </div>
            <hr />
            <div className="container text-center">
              <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                <div className="m-1">
                  <button
                    href=""
                    type="submit"
                    className="btn btn-lg btn-outline-primary form-control"
                  >
                    Войти в систему
                  </button>
                </div>
                <div className="m-1">
                  <button
                    href=""
                    type="reset"
                    onClick={(e) => {
                      setPassword("");
                      setUsername("");
                    }}
                    className="btn btn-lg btn-outline-warning form-control"
                  >
                    Сбросить данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    href=""
                    type="button"
                    onClick={changeVisibility}
                    className="btn btn-lg btn-outline-danger form-control"
                  >
                    Видимость пароля
                  </button>
                </div>
                <div className="m-1">
                  <a
                    href="/recover_password"
                    type="button"
                    className="btn btn-lg btn-outline-success form-control"
                  >
                    Восстановить доступ к аккаунту
                  </a>
                </div>
              </ul>
            </div>
          </form>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default LoginPage;
