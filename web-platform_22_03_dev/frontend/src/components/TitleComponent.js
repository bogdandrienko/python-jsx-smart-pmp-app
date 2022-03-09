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

const TitleComponent = ({ first = "Заголовок", second = "подзаголовок." }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <header className="pb-3">
        <div className="container d-flex flex-wrap justify-content-center shadow">
          <div className="d-flex align-items-center mb-0 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <span className="fw-normal fs-4 text-start">
              <small className="display-6 fw-normal text-start">{first}</small>
              <p className="lead fw-normal text-start m-0">{second}</p>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TitleComponent;
