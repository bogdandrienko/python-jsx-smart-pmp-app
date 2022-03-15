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
import HeaderComponent from "../base/HeaderComponent";
import FooterComponent from "../base/FooterComponent";
import StoreStatusComponent from "../base/StoreStatusComponent";
import MessageComponent from "../base/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AdminCreateOrChangeUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [changeUser, setChangeUser] = useState(
    "Изменять уже существующего пользователя"
  );
  const [changeUserPassword, setChangeUserPassword] = useState(
    "Оставлять предыдущий пароль пользователя"
  );
  const [clearUserGroups, setClearUserGroups] = useState(
    "Добавлять новые группы доступа к предыдущим"
  );
  const [additionalExcel, setAdditionalExcel] = useState(null);

  const adminCreateOrChangeUsersAuthStore = useSelector(
    (state) => state.adminCreateOrChangeUsersAuthStore
  ); // store.js
  const {
    // load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = adminCreateOrChangeUsersAuthStore;

  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(5000).then(() => {
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_RESET_CONSTANT,
        });
        setChangeUser("Изменять уже существующего пользователя");
        setChangeUserPassword("Оставлять предыдущий пароль пользователя");
        setClearUserGroups("Добавлять новые группы доступа к предыдущим");
        setAdditionalExcel(null);
      });
    }
  }, [dataRationalCreate]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CREATE_OR_CHANGE_USERS",
      changeUser: changeUser,
      changeUserPassword: changeUserPassword,
      clearUserGroups: clearUserGroups,
      additionalExcel: additionalExcel,
    };
    dispatch(actions.adminCreateOrChangeUsersAction(form));
  };

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Создание или изменение пользователей"}
        description={
          "страница содержит форму с полями и настройками для создание или изменения пользователей"
        }
      />
      <main className="container  ">
        <div className="">
          <StoreStatusComponent
            storeStatus={adminCreateOrChangeUsersAuthStore}
            key={"adminCreateOrChangeUsersAuthStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={true}
            loadText={""}
            showData={true}
            dataText={"Данные успешно отправлены!"}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
        </div>
        {!dataRationalCreate && (
          <div className="container-fluid text-center">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
              <div className="container">
                <br />
                <form
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="RATIONAL_CREATE"
                  autoComplete="on"
                  className="text-center"
                  onSubmit={formHandlerSubmit}
                >
                  <div>
                    <div className="">
                      <div>
                        <h6 className="lead">
                          Скачать шаблон для заполнения и проверки формата полей
                        </h6>
                        <a
                          className="btn btn-sm btn-success m-1"
                          href="/static/media/admin/account/create_users.xlsx"
                        >
                          Скачать excel-документ
                        </a>
                      </div>
                      <div>
                        <label className="form-control-sm m-1">
                          Что делать с уже существующими пользователями:
                          <select
                            id="changeUser"
                            name="changeUser"
                            required
                            className="form-control form-control-sm"
                            value={changeUser}
                            onChange={(e) => setChangeUser(e.target.value)}
                          >
                            <option value="Изменять уже существующего пользователя">
                              Изменять уже существующего пользователя
                            </option>
                            <option value="Не изменять уже существующего пользователя">
                              Не изменять уже существующего пользователя
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Что делать с паролем уже существующего пользователя:
                          <select
                            id="changeUserPassword"
                            name="changeUserPassword"
                            required
                            className="form-control form-control-sm"
                            value={changeUserPassword}
                            onChange={(e) =>
                              setChangeUserPassword(e.target.value)
                            }
                          >
                            <option value="Оставлять предыдущий пароль пользователя">
                              Оставлять предыдущий пароль пользователя
                            </option>
                            <option value="Изменять пароль уже существующего пользователя">
                              Изменять пароль уже существующего пользователя
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Что делать с группами уже существующего пользователя:
                          <select
                            id="clearUserGroups"
                            name="clearUserGroups"
                            required
                            className="form-control form-control-sm"
                            value={clearUserGroups}
                            onChange={(e) => setClearUserGroups(e.target.value)}
                          >
                            <option value="Добавлять новые группы доступа к предыдущим">
                              Добавлять новые группы доступа к предыдущим
                            </option>
                            <option value="Очищать все предыдущие группы доступа">
                              Очищать все предыдущие группы доступа
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="form-control-sm m-1">
                          Excel файл с пользователями:
                          <input
                            type="file"
                            id="AdditionalExcel"
                            name="AdditionalExcel"
                            required
                            accept=".xlsx, .xls"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setAdditionalExcel(e.target.files[0])
                            }
                          />
                          <small className="text-danger">* обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div className="container-fluid text-center">
                        <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                          <li className="m-1">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              type="submit"
                            >
                              Отправить
                            </button>
                          </li>
                          <li className="m-1">
                            <button
                              className="btn btn-sm btn-outline-warning"
                              type="reset"
                            >
                              Сбросить все данные
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
              </div>
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};
