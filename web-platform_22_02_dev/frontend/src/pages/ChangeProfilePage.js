import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { USER_CHANGE_RESET_CONSTANT } from "../js/constants";
import {
  userChangeProfileAction,
  userDetailsAction,
  userLogoutAction,
} from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import ReCAPTCHA from "react-google-recaptcha";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ChangeProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [capcha, setCapcha] = useState("");
  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    fail: failUserDetails,
  } = userDetailsStore;

  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    load: loadUserChange,
    data: dataUserChange,
    error: errorUserChange,
    fail: failUserChange,
  } = userChangeStore;

  useEffect(() => {
    if (dataUserDetails) {
      if (dataUserDetails["user_model"]) {
        if (dataUserDetails["user_model"]["email_field"]) {
          setEmail(dataUserDetails["user_model"]["email_field"]);
        }
        if (dataUserDetails["user_model"]["secret_question_char_field"]) {
          setSecretQuestion(
            dataUserDetails["user_model"]["secret_question_char_field"]
          );
        }
        if (dataUserDetails["user_model"]["secret_answer_char_field"]) {
          setSecretAnswer(
            dataUserDetails["user_model"]["secret_answer_char_field"]
          );
        }
        if (dataUserDetails["user_model"]["password_slug_field"]) {
          setPassword("");
          setPassword2("");
        }
      }
    } else {
      dispatch(userDetailsAction());
      setPassword("");
      setPassword2("");
    }
  }, [dispatch, dataUserDetails]);

  useEffect(() => {
    if (dataUserChange) {
      sleep(1000).then(() => {
        dispatch({ type: USER_CHANGE_RESET_CONSTANT });
        dispatch(userLogoutAction());
        navigate("/login");
      });
    }
  }, [dispatch, dataUserChange, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      dispatch(
        userChangeProfileAction({
          email: email,
          secretQuestion: secretQuestion,
          secretAnswer: secretAnswer,
          password: password,
          password2: password2,
        })
      );
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

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function changeCapcha(value) {
    setCapcha(value);
  }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Изменение профиля"}
        second={"страница редактирования Вашего личного профиля."}
        logic={true}
      />
      <main className="container text-center">
        <div>
          {loadUserDetails && <LoaderComponent />}
          {dataUserDetails && (
            <MessageComponent variant="success">
              Данные успешно получены!
            </MessageComponent>
          )}
          {errorUserDetails && (
            <MessageComponent variant="danger">
              {errorUserDetails}
            </MessageComponent>
          )}
          {failUserDetails && (
            <MessageComponent variant="warning">
              {failUserChange}
            </MessageComponent>
          )}
        </div>
        <div>
          {loadUserChange && <LoaderComponent />}
          {dataUserChange && (
            <MessageComponent variant="success">
              Данные успешно изменены!
            </MessageComponent>
          )}
          {errorUserChange && (
            <MessageComponent variant="danger">
              {errorUserChange}
            </MessageComponent>
          )}
          {failUserChange && (
            <MessageComponent variant="warning">
              {failUserChange}
            </MessageComponent>
          )}
          {!capcha && (
            <MessageComponent variant="danger">
              Пройдите проверку на робота!
            </MessageComponent>
          )}
        </div>

        <div>
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
                  type="email"
                  id="email"
                  name="email"
                  required=""
                  placeholder="Введите почту для восстановления доступа"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="1"
                  maxLength="128"
                  className="form-control form-control-lg"
                />
              </div>
              <div className="input-group m-1">
                <input
                  type="text"
                  id="secretQuestion"
                  name="secretQuestion"
                  required=""
                  placeholder="Введите секретный вопрос для восстановления доступа"
                  value={secretQuestion}
                  onChange={(e) => setSecretQuestion(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-lg"
                />
                <input
                  type="text"
                  id="secretAnswer"
                  name="secretAnswer"
                  required=""
                  placeholder="Введите секретный ответ на вопрос"
                  value={secretAnswer}
                  onChange={(e) => setSecretAnswer(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-lg"
                />
              </div>
              <div className="input-group m-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required=""
                  placeholder="Введите новый пароль от аккаунта"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-lg"
                  autoComplete="none"
                  aria-autocomplete="none"
                />
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  required=""
                  placeholder="Повторите новый пароль"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  minLength="8"
                  maxLength="32"
                  className="form-control form-control-lg"
                  autoComplete="none"
                  aria-autocomplete="none"
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
                  className="btn btn-lg btn-outline-primary form-control"
                >
                  Сохранить новые данные
                </button>
                <button
                  href=""
                  type="reset"
                  onClick={(e) => {
                    setEmail("");
                    setSecretQuestion("");
                    setSecretAnswer("");
                    setPassword("");
                    setPassword2("");
                  }}
                  className="btn btn-lg btn-outline-warning form-control"
                >
                  Сбросить данные
                </button>
              </div>
            </form>
          </div>

          <div className="form-control bg-warning bg-opacity-10">
            <h2 className="text-danger display-6 lead">
              Внимание, все эти поля необходимо заполнить!
            </h2>
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
                  <ReCAPTCHA
                    sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                    onChange={changeCapcha}
                  />
                </label>
              </div>
              <div>
                <label className="form-control-lg m-1 lead">
                  Почта для восстановления доступа:
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required=""
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    minLength="1"
                    maxLength="128"
                    className="form-control form-control-lg"
                  />
                  <small className="text-muted">
                    формат: bogdandrienko@gmail.com
                  </small>
                </label>
              </div>

              <div>
                <label className="form-control-lg m-1 lead">
                  Введите секретный вопрос для восстановления доступа:
                  <input
                    type="text"
                    id="secretQuestion"
                    name="secretQuestion"
                    required=""
                    placeholder=""
                    value={secretQuestion}
                    onChange={(e) => setSecretQuestion(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-lg"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
                </label>
                <label className="form-control-lg m-1 lead">
                  Введите ответ на секретный вопрос:
                  <input
                    type="text"
                    id="secretAnswer"
                    name="secretAnswer"
                    required=""
                    placeholder=""
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-lg"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
                </label>
              </div>

              <div>
                <label className="form-control-lg m-1 lead">
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
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
                </label>
                <label className="form-control-lg m-1 lead">
                  Повторите новый пароль:
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    required=""
                    placeholder=""
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    minLength="8"
                    maxLength="32"
                    className="form-control form-control-lg"
                    autoComplete="none"
                    aria-autocomplete="none"
                  />
                  <small className="text-muted">
                    количество символов: от 8 до 32
                  </small>
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
                      Сохранить новые данные
                    </button>
                  </div>
                  <div className="m-1">
                    <button
                      href=""
                      type="reset"
                      onClick={(e) => {
                        setEmail("");
                        setSecretQuestion("");
                        setSecretAnswer("");
                        setPassword("");
                        setPassword2("");
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
                </ul>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangeProfilePage;
