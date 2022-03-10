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

const ChangeProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore); // store.js
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  const userChangeStore = useSelector((state) => state.userChangeStore); // store.js
  const {
    // load: loadUserChange,
    data: dataUserChange,
    // error: errorUserChange,
    // fail: failUserChange,
  } = userChangeStore;

  useEffect(() => {
    if (dataUserDetails && dataUserDetails["user_model"]) {
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
    } else {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(actions.userDetailsAuthAction(form));
      setPassword("");
      setPassword2("");
    }
  }, [dispatch, dataUserDetails]);

  useEffect(() => {
    if (dataUserChange) {
      utils.Sleep(1000).then(() => {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      });
    }
  }, [dispatch, dataUserChange, navigate]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE",
      email: email,
      secretQuestion: secretQuestion,
      secretAnswer: secretAnswer,
      password: password,
      password2: password2,
    };
    dispatch(actions.userChangeAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Изменение профиля"}
        second={"страница редактирования Вашего личного профиля."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            userDetailsStore,
            "userDetailsStore",
            true,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            userChangeStore,
            "userChangeStore",
            true,
            "Данные успешно изменены!",
            constants.DEBUG_CONSTANT
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
              onSubmit={formHandlerSubmit}
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
                      type="button"
                      onClick={(e) =>
                        utils.ChangePasswordVisibility([
                          "password",
                          "password2",
                        ])
                      }
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
