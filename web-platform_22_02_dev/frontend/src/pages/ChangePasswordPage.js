import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  userChangeProfileAction,
  userDetailsAction,
  userLogoutAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import { USER_CHANGE_RESET_CONSTANT } from "../constants/userConstants";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    load: loadUserChange,
    data: dataUserChange,
    error: errorUserChange,
    fail: failUserChange,
  } = userChangeStore;

  useEffect(() => {
    if (dataUserChange) {
      sleep(1000).then(() => {
        dispatch({ type: USER_CHANGE_RESET_CONSTANT });
        dispatch(userLogoutAction());
        navigate("/login");
      });
    }
  }, [navigate, dataUserChange, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userChangeProfileAction({
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
      <HeaderComponent />
      <TitleComponent
        first={"Изменение пароля"}
        second={"страница редактирования Вашего пароля от аккаунта."}
        logic={true}
      />
      <main className="container text-center">
        <div className="text-center">
          {loadUserChange && <LoaderComponent />}
          {dataUserChange && (
            <div className="m-1">
              <MessageComponent variant="success">
                Пароль успешно изменён!
              </MessageComponent>
            </div>
          )}
          {errorUserChange && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorUserChange}
              </MessageComponent>
            </div>
          )}
          {failUserChange && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failUserChange}
              </MessageComponent>
            </div>
          )}
        </div>
        <div className="m-1">
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
              <label className="form-control-lg m-1">
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

export default ChangePasswordPage;
