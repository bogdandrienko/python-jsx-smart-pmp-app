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

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userChangeStore = useSelector((state) => state.userChangeStore); // store.js
  const {
    // load: loadUserChange,
    data: dataUserChange,
    // error: errorUserChange,
    // fail: failUserChange,
  } = userChangeStore;

  useEffect(() => {
    if (dataUserChange) {
      utils.Sleep(1000).then(() => {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      });
    }
  }, [navigate, dataUserChange, dispatch]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE",
      password: password,
      password2: password2,
    };
    dispatch(actions.userChangeAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Изменение пароля"}
        second={"страница редактирования Вашего пароля от аккаунта."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            userChangeStore,
            "userChangeStore",
            true,
            "Пароль успешно изменён!",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div>
          <div className="form-control">
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

export default ChangePasswordPage;
