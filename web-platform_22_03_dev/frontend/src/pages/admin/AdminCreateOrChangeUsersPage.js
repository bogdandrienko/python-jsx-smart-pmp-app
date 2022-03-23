///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const AdminCreateOrChangeUsersPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
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
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const adminCreateOrChangeUsersStore = useSelector(
    (state) => state.adminCreateOrChangeUsersStore
  );
  const {
    // load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = adminCreateOrChangeUsersStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(2000).then(() => {
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "CREATE_OR_CHANGE_USERS",
      changeUser: changeUser,
      changeUserPassword: changeUserPassword,
      clearUserGroups: clearUserGroups,
      additionalExcel: additionalExcel,
    };
    dispatch(actions.adminCreateOrChangeUsersAction(form));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={adminCreateOrChangeUsersStore}
          key={"adminCreateOrChangeUsersStore"}
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
                  onSubmit={handlerSubmit}
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
                        <label className="form-control-sm text-center m-0 p-1">
                          Что делать с уже существующими пользователями:
                          <select
                            id="changeUser"
                            name="changeUser"
                            required
                            className="form-control form-control-sm text-center m-0 p-1"
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
                        <label className="form-control-sm text-center m-0 p-1">
                          Что делать с паролем уже существующего пользователя:
                          <select
                            id="changeUserPassword"
                            name="changeUserPassword"
                            required
                            className="form-control form-control-sm text-center m-0 p-1"
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
                        <label className="form-control-sm text-center m-0 p-1">
                          Что делать с группами уже существующего пользователя:
                          <select
                            id="clearUserGroups"
                            name="clearUserGroups"
                            required
                            className="form-control form-control-sm text-center m-0 p-1"
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
                        <label className="form-control-sm text-center m-0 p-1">
                          Excel файл с пользователями:
                          <input
                            type="file"
                            id="AdditionalExcel"
                            name="AdditionalExcel"
                            required
                            accept=".xlsx, .xls"
                            className="form-control form-control-sm text-center m-0 p-1"
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
      <components.FooterComponent />
    </div>
  );
};
