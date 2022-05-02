// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as hook from "../hook";
import * as router from "../router";
import * as util from "../util";
import * as context from "../context";
import * as button from "./button";
import * as slice from "../slice";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NavbarComponent1 = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userLoginStore = hook.useSelectorCustom2(slice.user.userLoginStore);
  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);
  const notificationReadListStore = hook.useSelectorCustom2(
    slice.notification.notificationReadListStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const location = useLocation();

  // TODO variable /////////////////////////////////////////////////////////////////////////////////////////////////////

  const { title, description } = util.GetInfoPage(location.pathname);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0 pb-3">
      <util.PageLogic />
      <header className="header navbar-fixed-top bg-dark bg-opacity-10 shadow-lg m-0 p-0">
        <Navbar expand="lg" className="m-0 p-0">
          <Container className="">
            <a className="m-0 p-0" href="/">
              <img
                src="/static/img/logo.svg"
                className="img-responsive btn btn-outline-light m-0 p-2"
                alt="id"
              />
            </a>
            {notificationReadListStore.data &&
            notificationReadListStore.data.list.length > 0 ? (
              <span className="m-0 p-1">
                <i className="fa-solid fa-bell text-danger m-0 p-1" />
                {notificationReadListStore.data["x-total-count"]}
              </span>
            ) : (
              <span className="m-0 p-1">
                <i className="fa-solid fa-bell text-muted m-0 p-1" />0
              </span>
            )}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="btn btn-success text-success bg-warning bg-opacity-50"
            >
              <span className="navbar-toggler-icon text-success" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
              <Nav className="me-auto m-0 p-0">
                {router.modules.map(
                  (module, m_index) =>
                    util.CheckAccess(userDetailStore, module.Access) && (
                      <NavDropdown
                        title={
                          <span>
                            <i className={module.ModuleIcon} /> {module.Header}
                            {"  "}
                            {module.Header === "Профиль" &&
                              (notificationReadListStore.data &&
                              notificationReadListStore.data.list.length > 0 ? (
                                <span className="m-0 p-1">
                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                  {
                                    notificationReadListStore.data[
                                      "x-total-count"
                                    ]
                                  }
                                </span>
                              ) : (
                                <span className="m-0 p-1">
                                  <i className="fa-solid fa-bell text-muted m-0 p-1" />
                                  0
                                </span>
                              ))}
                          </span>
                        }
                        key={m_index}
                        id="basic-nav-dropdown"
                        className="btn btn-sm btn-dark custom-background-transparent-low-middle m-1 p-0"
                      >
                        {module.Sections.map(
                          (section, s_index) =>
                            util.CheckAccess(
                              userDetailStore,
                              section.Access
                            ) && (
                              <li className="m-0 p-1" key={s_index}>
                                <strong className="dropdown-header text-center m-0 p-0">
                                  {section.Header}
                                </strong>
                                {section.Links.map(
                                  (link, l_index) =>
                                    link.ShowLink &&
                                    util.CheckAccess(
                                      userDetailStore,
                                      link.Access
                                    ) && (
                                      <LinkContainer
                                        to={link.Link}
                                        className="custom-hover m-0 p-0"
                                        key={l_index}
                                      >
                                        <Nav.Link
                                          className={link.Style + " m-0 p-0"}
                                        >
                                          <span
                                            className={
                                              link.Style +
                                              " badge rounded-pill m-0 p-0"
                                            }
                                          >
                                            <i
                                              className={
                                                link.LinkIcon + " m-0 p-1"
                                              }
                                            />
                                          </span>
                                          <small>
                                            {link.Header}
                                            {"  "}
                                            {link.Header === "Уведомления" &&
                                              (notificationReadListStore.data &&
                                              notificationReadListStore.data
                                                .list.length > 0 ? (
                                                <span className="m-0 p-1">
                                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                  {
                                                    notificationReadListStore
                                                      .data["x-total-count"]
                                                  }
                                                </span>
                                              ) : (
                                                <span className="m-0 p-1">
                                                  <i className="fa-solid fa-bell text-muted m-0 p-1" />
                                                  0
                                                </span>
                                              ))}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    )
                                )}
                                <NavDropdown.Divider className="m-0 p-0" />
                              </li>
                            )
                        )}
                      </NavDropdown>
                    )
                )}
              </Nav>
              {!userLoginStore.data ? (
                <LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти{" "}
                      <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer
                  to="/logout"
                  className="text-center m-0 p-1 mx-1"
                >
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-danger m-0 p-2">
                      Выйти <i className="fa-solid fa-door-open m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal m-0 p-1">{title}</small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export const NavbarComponent2 = () => {
  // @ts-ignore
  const { isAuth, setIsAuth } = useContext(context.AuthContext);
  // @ts-ignore
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_navbar_1">
      <button.Button1 onClick={logout}>logout</button.Button1>
      <div className="custom_navbar_1_links">
        <Link to="/" className="custom_navbar_1_link">
          home
        </Link>
      </div>
    </div>
  );
};

export const NavbarComponent3 = () => {
  // @ts-ignore
  const { isAuth, setIsAuth } = useContext(context.AuthContext);
  // @ts-ignore
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/frontend_template_pwa_typescript/src/pages"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
