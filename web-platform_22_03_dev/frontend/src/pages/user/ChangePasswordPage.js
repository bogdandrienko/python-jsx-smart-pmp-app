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
export const ChangePasswordPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userChangeStore = useSelector((state) => state.userChangeStore);
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
    dispatch(actions.userChangeAction(form));
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Изменение пароля"}
        description={"страница редактирования Вашего пароля от аккаунта"}
      />
      <main className="container  ">
        <div className="">
          <components.StoreStatusComponent
            storeStatus={userChangeStore}
            key={"userChangeStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={true}
            loadText={""}
            showData={true}
            dataText={"Данные успешно изменены!"}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
        </div>
        <div>
          <div className="form-control">
            <form className="text-center p-1 m-1" onSubmit={formHandlerSubmit}>
              <div>
                <label className="form-control-sm">
                  Введите пароль для входа в аккаунт:
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-sm"
                    value={password}
                    placeholder="введите сюда новый пароль..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                <label className="form-control-sm">
                  Повторите новый пароль:
                  <p className="m-0 p-0">
                    <small className="text-danger">
                      Только латинские буквы и цифры!
                    </small>
                  </p>
                  <input
                    type="password"
                    id="password2"
                    className="form-control form-control-sm"
                    value={password2}
                    placeholder="введите сюда новый пароль..."
                    required
                    onChange={(e) => setPassword2(e.target.value)}
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
              </div>
              <hr />
              <div className="container">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary p-2 m-1"
                  >
                    Сохранить новые данные
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      setPassword("");
                      setPassword2("");
                    }}
                    className="btn btn-sm btn-warning p-2 m-1"
                  >
                    Сбросить данные
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      utils.ChangePasswordVisibility(["password", "password2"])
                    }
                    className="btn btn-sm btn-danger p-2 m-1"
                  >
                    Видимость пароля
                  </button>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
