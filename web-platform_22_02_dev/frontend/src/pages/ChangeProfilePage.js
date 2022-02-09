import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import {
  userDetailsAction,
  userChangeProfileAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FormContainerComponent from "../components/FormContainerComponent";
import ReCAPTCHA from "react-google-recaptcha";

const ChangeProfilePage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    load: loadUserLogin,
    data: dataUserLogin,
    error: errorUserLogin,
    fail: failUserLogin,
  } = userLoginState;
  // console.log("loadUserLogin: ", loadUserLogin);
  // console.log("dataUserLogin: ", dataUserLogin);
  // console.log("errorUserLogin: ", errorUserLogin);
  // console.log("failUserLogin: ", failUserLogin);

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    fail: failUserDetails,
  } = userDetailsStore;
  // console.log("loadUserDetails: ", loadUserDetails);
  // console.log("dataUserDetails: ", dataUserDetails);
  // console.log("errorUserDetails: ", errorUserDetails);
  // console.log("failUserDetails: ", failUserDetails);

  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    load: loadUserChange,
    data: dataUserChange,
    error: errorUserChange,
    fail: failUserChange,
  } = userChangeStore;
  // console.log("loadUserChange: ", loadUserChange);
  // console.log("dataUserChange: ", dataUserChange);
  // console.log("errorUserChange: ", errorUserChange);
  // console.log("failUserChange: ", failUserChange);

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
    dispatch(userDetailsAction());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userChangeProfileAction({
        email: email,
        secretQuestion: secretQuestion,
        secretAnswer: secretAnswer,
        password: password,
        password2: password2,
      })
    );
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    password2.setAttribute("type", type);
  };

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Изменение профиля"}
        second={"страница редактирования Вашего личного профиля."}
        logic={true}
      />
      <main className="container text-center">
        <div className="m-1">
          <div>
            <h2 className="text-danger display-6 lead">
              Внимание, все эти поля необходимо заполнить!
            </h2>
            <h5>
              Идентификатор пользователя: '
              {dataUserLogin && dataUserLogin.username}'
            </h5>
            {errorUserChange && (
              <MessageComponent variant="danger">
                {errorUserChange}
              </MessageComponent>
            )}
            {loadUserChange && <LoaderComponent />}
          </div>

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
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangeProfilePage;
