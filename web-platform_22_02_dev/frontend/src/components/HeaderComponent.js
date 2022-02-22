import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modules } from "../js/constants";
import { userDetailsAction, userLogoutAction } from "../js/actions";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderComponent = ({ logic = true, redirect = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginState;

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  console.log("dataUserDetails: ", dataUserDetails);

  useEffect(() => {
    if (logic) {
      dispatch(userDetailsAction());
    }
  }, [dispatch, logic]);

  useEffect(() => {
    if (logic) {
      if (dataUserLogin == null && location.pathname !== "/login" && redirect) {
        navigate("/login");
      } else {
        if (errorUserDetails !== undefined) {
          dispatch(userLogoutAction());
        } else {
          if (dataUserLogin !== undefined) {
            if (dataUserDetails && dataUserDetails["user_model"]) {
              if (
                dataUserDetails["user_model"]["activity_boolean_field"] ===
                false
              ) {
                dispatch(userLogoutAction());
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

  function checkAccess(slug = "") {
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        return dataUserDetails["group_model"].includes(slug);
      }
      return false;
    }
    return false;
  }

  return (
    <header className="navbar-fixed-top bg-secondary bg-opacity-10 m-0 p-0">
      <Navbar expand="lg">
        <Container>
          <a className="navbar-brand w-25" href="https://km.kz/">
            <img
              src="static/logo.png"
              className="w-25 img-responsive"
              alt="id"
            />
          </a>
          <a className="navbar-brand" href="/">
            Домашняя
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {modules.map(
                (module, module_i) =>
                  checkAccess(module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={module.Header}
                      id="basic-nav-dropdown"
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          checkAccess(section.Access) && (
                            <li key={section_i}>
                              <strong className="dropdown-header text-center">
                                {section.Header}
                              </strong>
                              {section.Links.map((link, link_i) =>
                                link.ExternalLink
                                  ? checkAccess(link.Access) && (
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
                                  : checkAccess(link.Access) && (
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
    </header>
  );
};

export default HeaderComponent;
