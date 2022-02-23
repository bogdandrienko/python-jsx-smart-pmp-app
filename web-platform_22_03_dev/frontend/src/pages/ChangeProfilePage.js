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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ChangeProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Изменение профиля"}
        second={"страница редактирования Вашего личного профиля."}
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
        </div>
        <div>
          <div className="">
            <h6 className="text-danger lead">
              Внимание, без правильного заполнения обязательных данных Вас будет
              перенаправлять на эту страницу постоянно!
            </h6>
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
                  Введите секретный вопрос для восстановления доступа:
                  <input
                    type="text"
                    id="secretQuestion"
                    name="secretQuestion"
                    required
                    placeholder=""
                    value={secretQuestion}
                    onChange={(e) => setSecretQuestion(e.target.value)}
                    minLength="6"
                    maxLength="32"
                    className="form-control form-control-md"
                  />
                  <p>
                    <small className="text-danger">* обязательно</small>
                    <p>
                      <small className="text-muted">
                        количество символов: от 6 до 32
                      </small>
                    </p>
                  </p>
                </label>
                <label className="form-control-md m-1 lead">
                  Введите ответ на секретный вопрос:
                  <input
                    type="text"
                    id="secretAnswer"
                    name="secretAnswer"
                    required
                    placeholder=""
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    minLength="4"
                    maxLength="32"
                    className="form-control form-control-md"
                  />
                  <p>
                    <small className="text-danger">* обязательно</small>
                    <p>
                      <small className="text-muted">
                        количество символов: от 4 до 32
                      </small>
                    </p>
                  </p>
                </label>
              </div>

              <div>
                <label className="form-control-md m-1 lead">
                  Почта для восстановления доступа:
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    minLength="1"
                    maxLength="128"
                    className="form-control form-control-md"
                  />
                  <p>
                    <small className="text-success">* не обязательно</small>
                  </p>
                </label>
              </div>

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
                <ul className="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center">
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
                        setEmail("");
                        setSecretQuestion("");
                        setSecretAnswer("");
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
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangeProfilePage;
