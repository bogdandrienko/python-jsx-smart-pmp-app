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
      dispatch(actions.userDetailsAuthAction(form));
    }
  }, [dispatch, logic]);

  // function reboot() {
  //   console.log("reboot");
  //   const { data } = axios({
  //     url: "http://192.168.1.208/ISAPI/System/reboot",
  //     method: "PUT",
  //     timeout: 3000,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: { username: "admin", password: "snrg2017" },
  //     },
  //     data: {},
  //   });
  //   console.log("data: ", data);
  // }

  const reboot = async () => {
    console.log("reboot");
    const { data } = axios({
      url: "http://admin:snrg2017@192.168.1.208/ISAPI/System/reboot",
      method: "PUT",
      timeout: 3000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: { username: "admin", password: "snrg2017" },
      },
      data: {},
    });
    console.log("data: ", data);
  };

  // const reboot = () => async () => {
  //   const { data } = await axios({
  //     url: "http://192.168.1.208/ISAPI/System/reboot",
  //     method: "PUT",
  //     timeout: 10000,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: { username: "admin", password: "snrg2017" },
  //     },
  //     data: {},
  //   });
  //   console.log("data: ", data);
  // };
  // // 1. Create a new XMLHttpRequest object
  // var xhr = new XMLHttpRequest();
  // // xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
  // // xhr.setRequestHeader("Content-type", "application/ecmascript");
  // // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencode");
  // let url = "http://%20:%20@192.168.1.208/ISAPI/System/reboot";
  // let asyn = true;
  // let username = "admin";
  // let password = "snrg2017";
  //
  // // 2. Configure it: GET-request for the URL /article/.../load
  // xhr.open("PUT", url, asyn, username, password);
  //
  // xhr.onload = function () {
  //   alert(`Loaded: ${xhr.status} ${xhr.response}`);
  // };
  //
  // xhr.onerror = function () {
  //   // only triggers if the request couldn't be made at all
  //   alert(`Network Error`);
  // };
  //
  // xhr.onprogress = function (event) {
  //   // triggers periodically
  //   // event.loaded - how many bytes downloaded
  //   // event.lengthComputable = true if the server sent Content-Length header
  //   // event.total - total number of bytes (if lengthComputable)
  //   alert(`Received ${event.loaded} of ${event.total}`);
  // };
  //
  // // 3. Send the request over the network
  // xhr.send();
  //
  // console.log("xhr: ", xhr);

  // const { data } = await axios({
  //   url: "http://%20:%20@192.168.1.208/ISAPI/System/reboot",
  //   method: "PUT",
  //   timeout: 10000,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: { username: "admin", password: "snrg2017" },
  //   },
  //   data: "",
  // });
  // console.log("data: ", data);
  // };
  // "http://admin:snrg2017@192.168.1.208/ISAPI/System/reboot"

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
    <header className="navbar-fixed-top pb-3">
      <Navbar expand="lg">
        <Container>
          <a className="w-25" href="https://km.kz/">
            <img
              src="/static/img/logo.png"
              className="w-25 img-responsive"
              alt="id"
            />
          </a>
          <a className="navbar-brand" href="/">
            Домашняя
          </a>
          <button onClick={reboot}>reboot</button>
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
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          utils.CheckAccess(
                            userDetailsAuthStore,
                            section.Access
                          ) && (
                            <li key={section_i}>
                              <strong className="dropdown-header text-center">
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
                                            ? "dropdown-item"
                                            : "disabled dropdown-item"
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
                                          link.Active ? "" : "disabled"
                                        }
                                      >
                                        <Nav.Link>{link.Header}</Nav.Link>
                                      </LinkContainer>
                                    )
                              )}
                              <NavDropdown.Divider />
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
        <div className="container card shadow text-start p-0">
          <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
            <small className="display-6 fw-normal">{title}</small>
          </div>
          <div className="card-body m-0 p-1">
            <p className="lead fw-normal card-body m-0 p-1">{description}</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
