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
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StoreStatusComponent = ({
  storeStatus,
  keyStatus = "StoreStatus",
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = storeStatus;
  if (consoleLog) {
    console.log(`${keyStatus}`, storeStatus);
  }

  return (
    <div key={keyStatus} className="m-0 p-0 my-1">
      {showLoad && loadStatus && (
        <div className="row justify-content-center m-0 p-0">
          {loadText !== "" ? (
            <Alert variant={"secondary"} className="m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "55px",
                width: "55px",
                margin: "auto",
                display: "block",
              }}
              className="m-0 p-0"
            >
              <small className="m-0 p-0">загрузка</small>
              <span className="sr-only m-0 p-1" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="m-0 p-1">
            {dataText !== "" ? dataText : dataStatus}
          </Alert>
        </div>
      )}
      {showError && errorStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="m-0 p-1">
            {errorText !== "" ? errorText : errorStatus}
          </Alert>
        </div>
      )}
      {showFail && failStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="m-0 p-1">
            {failText !== "" ? failText : failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default StoreStatusComponent;
