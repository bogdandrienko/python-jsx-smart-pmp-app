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

const AdminExportUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const adminExportUsersStore = useSelector(
    (state) => state.adminExportUsersStore
  ); // store.js
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
    dispatch(actions.adminExportUsersAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Расчётный лист"}
        second={"страница выгрузки Вашего расчётного листа."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            adminExportUsersStore,
            "adminExportUsersStore",
            true,
            "Данные успешно отправлены!",
            constants.DEBUG_CONSTANT
          )}
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
      <FooterComponent />
    </div>
  );
};

export default AdminExportUsersPage;
