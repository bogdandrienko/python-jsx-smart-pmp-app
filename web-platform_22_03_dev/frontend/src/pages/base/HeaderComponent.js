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

const HeaderComponent = ({
  logic = true,
  redirect = true,
  title = "",
  description = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const userLoginAnyStore = useSelector((state) => state.userLoginAnyStore); // store.js
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginAnyStore;
  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  ); // store.js
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsAuthStore;

  useEffect(() => {
    if (logic) {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(actions.userDetailsAction(form));
    }
  }, [dispatch, logic]);

  useEffect(() => {
    if (logic) {
      if (dataUserLogin == null && location.pathname !== "/login" && redirect) {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      } else {
        if (dataUserDetails && dataUserDetails["user_model"]) {
          if (
            dataUserDetails["user_model"]["activity_boolean_field"] === false
          ) {
            dispatch(actions.userLogoutAction());
            navigate("/login");
          }
          if (
            !dataUserDetails["user_model"]["secret_question_char_field"] ||
            !dataUserDetails["user_model"]["secret_answer_char_field"]
          ) {
            navigate("/change_profile");
          }
        }
      }
    }
  }, [
    dataUserLogin,
    location.pathname,
    navigate,
    dispatch,
    logic,
    errorUserDetails,
    dataUserDetails,
  ]);

  useEffect(() => {
    if (userDetailsAuthStore) {
      if (!utils.CheckPageAccess(userDetailsAuthStore, location) && redirect) {
        navigate("/home");
      }
    }
  }, []);

  return (
    <header className="header navbar-fixed-top pb-3">
      <Navbar expand="lg" className="text-center">
        <Container>
          <a className="w-25" href="https://km.kz/">
            <img src="/static/img/logo.png" className="w-25" alt="id" />
          </a>
          <a className="navbar-brand" href="/">
            Домашняя
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailsAuthStore, module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={module.Header}
                      id="basic-nav-dropdown"
                      className=""
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          utils.CheckAccess(
                            userDetailsAuthStore,
                            section.Access
                          ) && (
                            <li key={section_i}>
                              <strong className="dropdown-header text-center m-1 p-0">
                                {section.Header}
                              </strong>
                              {section.Links.map((link, link_i) =>
                                link.ExternalLink
                                  ? utils.CheckAccess(
                                      userDetailsAuthStore,
                                      link.Access
                                    ) && (
                                      <a
                                        key={link_i}
                                        className={
                                          link.Active
                                            ? "dropdown-item m-1 p-0"
                                            : "disabled dropdown-item m-1 p-0"
                                        }
                                        href={link.Link}
                                        target="_self"
                                      >
                                        {link.Header}
                                      </a>
                                    )
                                  : utils.CheckAccess(
                                      userDetailsAuthStore,
                                      link.Access
                                    ) &&
                                    link.ShowLink && (
                                      <LinkContainer
                                        key={link_i}
                                        to={link.Link}
                                        className={
                                          link.Active
                                            ? "m-1 p-1"
                                            : "disabled m-1 p-1"
                                        }
                                      >
                                        <Nav.Link className="">
                                          {link.Header}
                                        </Nav.Link>
                                      </LinkContainer>
                                    )
                              )}
                              <NavDropdown.Divider className="" />
                            </li>
                          )
                      )}
                    </NavDropdown>
                  )
              )}
              {dataUserLogin ? (
                <LinkContainer to="/logout">
                  <Nav.Link>
                    <button className="btn btn-sm btn-danger">
                      Выйти <i className="fa-solid fa-user" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <button className="btn btn-sm btn-primary">
                      Войти <i className="fa-solid fa-user" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {title !== "" && description !== "" && (
        <div className="container p-0">
          <div className="card shadow">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal">{title}</small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
