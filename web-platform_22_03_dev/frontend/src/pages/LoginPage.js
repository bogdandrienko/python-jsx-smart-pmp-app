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
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capcha, setCapcha] = useState("");

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
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Вход в систему"}
        second={"страница для входа в систему."}
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
        <div className="">
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
              <label className="form-control-md m-1 lead">
                Введите Ваш ИИН:
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
              <label className="m-1">
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
                    type="submit"
                    className="btn btn-md btn-primary form-control"
                  >
                    Войти в систему
                  </button>
                </div>
                <div className="m-1">
                  <button
                    type="reset"
                    onClick={(e) => {
                      setPassword("");
                      setUsername("");
                    }}
                    className="btn btn-md btn-warning form-control"
                  >
                    Сбросить данные
                  </button>
                </div>
                <div className="m-1">
                  <button
                    type="button"
                    onClick={changeVisibility}
                    className="btn btn-md btn-danger form-control"
                  >
                    Видимость пароля
                  </button>
                </div>
                <div className="m-1">
                  <LinkContainer to="/recover_password" className="m-0 p-0">
                    <Nav.Link>
                      <button className="btn btn-md btn-success form-control">
                        Восстановить доступ к аккаунту
                      </button>
                    </Nav.Link>
                  </LinkContainer>
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
