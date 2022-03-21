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
export const AdminExportUsersPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const adminExportUsersStore = useSelector(
    (state) => state.adminExportUsersStore
  );
  const {
    load: loadExportUsers,
    data: dataExportUsers,
    // error: errorExportUsers,
    // fail: failExportUsers,
  } = adminExportUsersStore;

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "EXPORT_USERS",
    };
    dispatch(actions.adminExportUsersAction(form));
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Экспорт пользователей"}
        description={" функционал выгрузки всех пользователей системы"}
      />
      <main className="container  ">
        <div className="">
          <components.StoreStatusComponent
            storeStatus={adminExportUsersStore}
            key={"adminExportUsersStore"}
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
        <div className="input-group m-1">
          {!loadExportUsers && (
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="EXPORT_USERS"
              autoComplete="on"
              className="w-100"
              onSubmit={formHandlerSubmit}
            >
              <button className="btn btn-sm btn-primary" type="submit">
                получить
              </button>
            </form>
          )}
        </div>
        <hr />
        <div>
          {dataExportUsers && (
            <div>
              <a
                className="btn btn-sm btn-success m-1"
                href={`/${dataExportUsers["excel"]}`}
              >
                Скачать excel-документ
              </a>
            </div>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
