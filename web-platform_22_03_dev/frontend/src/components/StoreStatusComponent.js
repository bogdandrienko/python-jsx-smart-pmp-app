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
import * as constants from "../js/constants";
import * as actions from "../js/actions";
import * as utils from "../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StoreStatusComponent = (
  StoreStatus,
  key = "StoreStatus",
  showSuccess = true,
  successText = "",
  consoleLog = false
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = StoreStatus;
  if (consoleLog) {
    console.log(`${key}`, StoreStatus);
  }

  return (
    <div key={key} className="m-1 p-0">
      {loadStatus && (
        <div className="m-0 p-0">
          <Spinner
            animation="border"
            role="status"
            style={{
              height: "60px",
              width: "60px",
              margin: "auto",
              display: "block",
            }}
            className="m-0 p-1"
          >
            ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
          </Spinner>
        </div>
      )}
      {dataStatus && showSuccess && (
        <div className="m-0 p-0">
          <Alert variant={"success"} className="m-0 p-1">
            {successText !== "" ? successText : dataStatus}
          </Alert>
        </div>
      )}
      {errorStatus && (
        <div className="m-0 p-0">
          <Alert variant={"danger"} className="m-0 p-1">
            {errorStatus}
          </Alert>
        </div>
      )}
      {failStatus && (
        <div className="m-0 p-0">
          <Alert variant={"warning"} className="m-0 p-1">
            {failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default StoreStatusComponent;
