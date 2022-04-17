// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";
import * as utils from "./utils";
import * as actions from "./actions";

// TODO base ///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HeaderComponent = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////

  const { title, description, logic, redirect } = utils.GetInfoPage(
    location.pathname
  );

  const [firstRefreshUserDetails, firstRefreshUserDetailsSet] = useState(true);
  const [firstRefreshNotification, firstRefreshNotificationSet] =
    useState(true);

  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////

  const userLoginStore = useSelector((state) => state.userLoginStore);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginStore;
  //////////////////////////////////////////////////////////
  const userDetailStore = useSelector((state) => state.userDetailStore);
  const {
    // load: loadUserDetail,
    data: dataUserDetail,
    // error: errorUserDetail,
    // fail: failUserDetail,
  } = userDetailStore;
  //////////////////////////////////////////////////////////
  const notificationListStore = useSelector(
    (state) => state.notificationListStore
  );
  const {
    // load: loadNotificationList,
    data: dataNotificationList,
    // error: errorNotificationList,
    // fail: failNotificationList,
  } = notificationListStore;

  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!dataUserDetail) {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/user/detail/",
          "POST",
          30000,
          constants.USER_DETAIL,
          true
        )
      );
    } else {
      if (logic && firstRefreshUserDetails) {
        firstRefreshUserDetailsSet(false);
        dispatch({ type: constants.USER_DETAIL.reset });
      }
      if (
        redirect &&
        !utils.CheckPageAccess(userDetailStore, location.pathname)
      ) {
        navigate("/");
      }
    }
  }, [
    dataUserDetail,
    dispatch,
    firstRefreshUserDetails,
    logic,
    location.pathname,
    redirect,
    navigate,
  ]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (logic) {
      if (dataUserLogin == null && location.pathname !== "/login" && redirect) {
        utils.Sleep(10).then(() => {
          if (
            dataUserLogin == null &&
            location.pathname !== "/login" &&
            redirect
          ) {
            dispatch(actions.userLogoutAction());
            navigate("/login");
          }
        });
      } else {
        if (dataUserDetail && dataUserDetail["user_model"]) {
          if (
            dataUserDetail["user_model"]["activity_boolean_field"] === false
          ) {
            dispatch(actions.userLogoutAction());
            navigate("/login");
          }
          if (
            !dataUserDetail["user_model"]["secret_question_char_field"] ||
            !dataUserDetail["user_model"]["secret_answer_char_field"]
          ) {
            navigate("/change_profile");
          }
        }
      }
    }
  }, [logic, location.pathname, redirect, dispatch, navigate]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataNotificationList) {
      const form = {
        "Action-type": "",
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          `/api/auth/user/notification/?page=${1}&limit=${-1}`,
          "GET",
          30000,
          constants.NOTIFICATION_LIST
        )
      );
    } else {
      if (firstRefreshNotification) {
        firstRefreshNotificationSet(false);
        dispatch({ type: constants.NOTIFICATION_LIST.reset });
      }
    }
  }, [dispatch, firstRefreshNotification]);

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <header className="header navbar-fixed-top m-0 p-0 pb-3">
      <Navbar expand="lg" className="m-0 p-0">
        <Container>
          <a className="w-25 m-0 p-0" href="https://web.km.kz/">
            <img src="/static/img/logo.svg" className="w-50 m-0 p-0" alt="id" />
          </a>
          <a className="btn btn-outline-light navbar-brand m-0 p-2" href="/">
            <i className="fa-solid fa-earth-asia m-0 p-1" />
            Домашняя
          </a>
          {dataNotificationList && dataNotificationList.data.length > 0 && (
            <i className="fa-solid fa-bell text-danger m-0 p-2" />
          )}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="btn btn-success text-success bg-warning bg-opacity-50"
          >
            <span className="navbar-toggler-icon text-success" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
            <Nav className="me-auto m-0 p-0">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailStore, module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={
                        module.Header !== "Профиль" ? (
                          module.Header
                        ) : (
                          <span className="m-0 p-0">
                            {module.Header}{" "}
                            {dataNotificationList &&
                              dataNotificationList.data.length > 0 && (
                                <span className="badge rounded-pill text-danger m-0 p-1">
                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                  {dataNotificationList.data.length}
                                </span>
                              )}
                          </span>
                        )
                      }
                      id="basic-nav-dropdown"
                      className="btn custom-background-transparent-low-middle m-1 p-0"
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          utils.CheckAccess(
                            userDetailStore,
                            section.Access
                          ) && (
                            <li key={section_i} className="m-0 p-1">
                              <strong className="dropdown-header text-center m-0 p-0">
                                {section.Header}
                              </strong>
                              {section.Links.map((link, link_i) =>
                                link.ExternalLink
                                  ? utils.CheckAccess(
                                      userDetailStore,
                                      link.Access
                                    ) && (
                                      <a
                                        key={link_i}
                                        className={
                                          link.Active
                                            ? "dropdown-item m-0 p-1"
                                            : "disabled dropdown-item m-0 p-1"
                                        }
                                        href={link.Link}
                                        target="_blank"
                                      >
                                        <i className={link.LinkIcon} />
                                        {link.Header}
                                      </a>
                                    )
                                  : utils.CheckAccess(
                                      userDetailStore,
                                      link.Access
                                    ) &&
                                    link.ShowLink && (
                                      <LinkContainer
                                        key={link_i}
                                        to={link.Link}
                                        className={
                                          link.Active
                                            ? "custom-hover m-0 p-0"
                                            : "disabled custom-hover m-0 p-0"
                                        }
                                      >
                                        <Nav.Link
                                          className={
                                            link.Style ===
                                            "custom-color-warning-1"
                                              ? `custom-color-warning-2 m-0 p-1`
                                              : `${link.Style} m-0 p-1`
                                          }
                                        >
                                          <i className={link.LinkIcon} />
                                          {link.Header}{" "}
                                          {link.Header === "Уведомления" &&
                                            dataNotificationList &&
                                            dataNotificationList.data.length >
                                              0 && (
                                              <span className="badge rounded-pill text-danger m-0 p-1">
                                                <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                {
                                                  dataNotificationList.data
                                                    .length
                                                }
                                              </span>
                                            )}
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
              {dataUserLogin ? (
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
              ) : (
                <LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти{" "}
                      <i className="fa-solid fa-user m-0 p-1">
                        <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1" />
                      </i>
                    </button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {title !== "" && description !== "" && (
        <div className="container p-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal m-0 p-1">{title}</small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const FooterComponent = () => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <footer className="footer m-0 p-0 pt-3">
      <div className="m-0 p-0">
        <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center m-0 p-0">
          <li className="m-0 p-1">
            <a className="btn btn-sm btn-outline-secondary text-white" href="#">
              <i className="fa fa-arrow-up">{"  "} вверх</i>
              {"  "}
              <i className="fa fa-arrow-up"> </i>
            </a>
          </li>
          <li className="m-0 p-1">
            <Navbar className="dropup m-0 p-0">
              <NavDropdown
                title={
                  <span className="btn-outline-primary text-white">
                    Наши Ссылки
                    <i className="fa-solid fa-circle-info m-0 p-1" />
                  </span>
                }
                id="basic-nav-dropdown-1"
                className="btn btn-sm btn-outline-primary m-0 p-0"
              >
                <li>
                  <strong className="dropdown-header">Сайты</strong>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://km.kz/"
                  >
                    KM KZ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.km-open.online/"
                  >
                    KM OPEN
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://web.cplus.kz/"
                  >
                    KM QR
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Соцсети</strong>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.instagram.com/kostanay_minerals/?igshid=smmei29dpn8h"
                  >
                    instagram
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.facebook.com/kostmineral/"
                  >
                    facebook
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://t.me/kostanayminerals"
                  >
                    telegram
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.youtube.com/watch?v=GT9q0WWGH44&ab_channel=%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B"
                  >
                    youtube
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Газета "Хризотил"</strong>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.instagram.com/gazetakm/"
                  >
                    instagram
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://chrysotile.kz/"
                  >
                    сайт
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Адрес</strong>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.google.com/maps/place/%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5+%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B/@52.1831046,61.1857708,17z/data=!3m1!4b1!4m5!3m4!1s0x43d3248327188171:0x195ab2741ac003fb!8m2!3d52.1831013!4d61.1879595?hl=ru-KG"
                  >
                    110700,
                    <br /> Республика Казахстан,
                    <br />
                    Костанайская область,
                    <br />
                    г. Житикара,
                    <br />
                    ул. Ленина, 67
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Тел/факс</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    8 (714 35) 2-40-30
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    info@km.kz
                  </NavDropdown.Item>
                </li>
              </NavDropdown>
            </Navbar>
          </li>
          <li className="m-0 p-1">
            <Navbar className="dropup text-dark m-0 p-0">
              <NavDropdown
                title={
                  <span className="btn-outline-danger text-white">
                    По всем вопросам!
                    <i className="fa-solid fa-truck-medical m-0 p-1" />
                  </span>
                }
                id="basic-nav-dropdown-2"
                className="btn btn-sm btn-outline-danger m-0 p-0"
              >
                <li>
                  <strong className="dropdown-header">Рабочий номер</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    12-28
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта, локальная</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    Andryenko@km.local
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта, глобальная</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    Andryenko@km.kz
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
              </NavDropdown>
            </Navbar>
          </li>
        </ul>
      </div>
    </footer>
  );
};

// TODO components /////////////////////////////////////////////////////////////////////////////////////////////////////

export const ModulesComponent = () => {
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const userDetailStore = useSelector((state) => state.userDetailStore);
  //////////////////////////////////////////////////////////
  const notificationListStore = useSelector(
    (state) => state.notificationListStore
  );
  const {
    // load: loadNotificationList,
    data: dataNotificationList,
    // error: errorNotificationList,
    // fail: failNotificationList,
  } = notificationListStore;
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="shadow text-center m-0 p-0">
      {constants.modules && (
        <div className="m-0 p-0">
          <h6 className="display-6 text-center card-header bg-light bg-opacity-100 m-0 p-1">
            Модули:
          </h6>
          <div className="m-0 p-0">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailStore, module.Access) &&
                  module.ShowInModules && (
                    <div key={module_i} className="text-center m-0 p-1">
                      <div className="lead card-header border shadow bg-light bg-opacity-100 custom-background-transparent-hard m-0 p-0">
                        {module["Header"]}
                      </div>
                      <div className="text-center custom-background-transparent-middle m-0 p-0">
                        <img
                          src={module["Image"]}
                          className="img-fluid w-25 m-0 p-0"
                          alt="id"
                        />
                      </div>
                      {module["Sections"]
                        ? module["Sections"].map(
                            (section, section_i) =>
                              utils.CheckAccess(
                                userDetailStore,
                                section.Access
                              ) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end m-0 p-0"
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled bg-primary bg-opacity-75 d-flex m-0 p-1">
                                      <div className="m-0 p-0">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25 m-0 p-0"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled m-0 p-3"
                                      >
                                        <Nav.Link>
                                          <small className="fw-bold text-light m-0 p-0">
                                            {section["Header"]}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    </li>
                                    <ul className="list-group-flush m-0 p-0">
                                      {section["Links"]
                                        ? section["Links"].map((link, link_i) =>
                                            link["Active"]
                                              ? utils.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) &&
                                                link.ShowLink && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action m-0 p-0"
                                                  >
                                                    {link.ExternalLink ? (
                                                      <a
                                                        key={link_i}
                                                        className={
                                                          link["Active"]
                                                            ? "text-dark dropdown-item m-0 p-0"
                                                            : "disabled m-0 p-1"
                                                        }
                                                        href={link["Link"]}
                                                        target="_self"
                                                      >
                                                        <i
                                                          className={
                                                            link.LinkIcon
                                                          }
                                                        />
                                                        {link["Header"]}
                                                      </a>
                                                    ) : (
                                                      <LinkContainer
                                                        to={link["Link"]}
                                                      >
                                                        <Nav.Link className="m-0 p-1">
                                                          <small
                                                            className={
                                                              link.Style !== ""
                                                                ? `${link.Style} m-0 p-1`
                                                                : "text-dark m-0 p-1"
                                                            }
                                                          >
                                                            <i
                                                              className={
                                                                link.LinkIcon
                                                              }
                                                            />
                                                            {link["Header"]}
                                                            {"  "}
                                                            {link.Header ===
                                                              "Уведомления" &&
                                                              dataNotificationList &&
                                                              dataNotificationList
                                                                .data.length >
                                                                0 && (
                                                                <span className="badge rounded-pill text-danger m-0 p-1">
                                                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                                  {
                                                                    dataNotificationList
                                                                      .data
                                                                      .length
                                                                  }
                                                                </span>
                                                              )}
                                                          </small>
                                                        </Nav.Link>
                                                      </LinkContainer>
                                                    )}
                                                  </li>
                                                )
                                              : utils.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) &&
                                                link.ShowLink && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action disabled m-0 p-0"
                                                  >
                                                    <LinkContainer
                                                      to={
                                                        link["Link"]
                                                          ? link["Link"]
                                                          : "#"
                                                      }
                                                      className="disabled m-0 p-0"
                                                    >
                                                      <Nav.Link>
                                                        <small className="text-muted m-0 p-0">
                                                          {link["Header"]} (
                                                          <small className="text-danger m-0 p-0">
                                                            В РАЗРАБОТКЕ
                                                          </small>
                                                          )
                                                        </small>
                                                      </Nav.Link>
                                                    </LinkContainer>
                                                  </li>
                                                )
                                          )
                                        : ""}
                                    </ul>
                                  </div>
                                </div>
                              )
                          )
                        : ""}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const NewsComponent = ({ count = 100 }) => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="card list-group list-group-item-action list-group-flush custom-background-transparent-low-middle m-0 p-0">
      <div className="border-bottom scrollarea m-0 p-0">
        <LinkContainer to="/news" className="m-0 p-0">
          <Nav.Link className="m-0 p-0">
            <div
              className="list-group-item active shadow m-0 p-2"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="lead m-0 p-0 mb-1">
                  <i className="fa-solid fa-newspaper m-0 p-1" />
                  Лента
                </strong>
                <strong className="text-warning m-0 p-0">Свежие сверху</strong>
              </div>
              {count !== 100 && (
                <div className="small m-0 p-0 mb-1">
                  (нажмите сюда для просмотра всех изменений)
                </div>
              )}
            </div>
          </Nav.Link>
        </LinkContainer>
        {constants.news.slice(0, count).map((news_elem, index) => (
          <div key={index} className="custom-hover m-0 p-0">
            <Link
              to={news_elem.Link}
              className={
                news_elem.Status !== "active"
                  ? "list-group-item list-group-item-action bg-secondary bg-opacity-10 m-0 p-1"
                  : "list-group-item list-group-item-action bg-success bg-opacity-10 m-0 p-1"
              }
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="m-0 p-0">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (
                    <small className="custom-color-primary-1 m-0 p-0">
                      {" "}
                      (нажмите сюда для перехода)
                    </small>
                  )}
                </strong>
                <small className="text-muted m-0 p-0">
                  {news_elem.Status !== "active" ? (
                    <strong className="text-secondary text-start m-0 p-0">
                      (в разработке)
                    </strong>
                  ) : (
                    <strong className="text-success text-start m-0 p-0">
                      (завершено)
                    </strong>
                  )}
                </small>
              </div>
              <div className="small m-0 p-0">
                {news_elem.Description}
                {news_elem.Helps && (
                  <small className="text-secondary m-0 p-0">
                    {" "}
                    ({news_elem.Helps})
                  </small>
                )}
                {news_elem.Danger && (
                  <small className="text-danger m-0 p-0">
                    {" "}
                    ({news_elem.Danger})
                  </small>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StoreStatusComponent = ({
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
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = storeStatus;
  if (consoleLog) {
    console.log(`${keyStatus}`, storeStatus);
  }
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div key={keyStatus} className="m-0 p-0">
      {showLoad && loadStatus && (
        <div className="row justify-content-center m-0 p-0">
          {loadText !== "" ? (
            <Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "50px",
                width: "50px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <small className="m-0 p-0">ждите</small>
              <span className="sr-only m-0 p-0" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="text-center m-0 p-1">
            {dataText !== "" ? dataText : dataStatus}
          </Alert>
        </div>
      )}
      {showError && errorStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText !== "" ? errorText : errorStatus}
          </Alert>
        </div>
      )}
      {showFail && failStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="text-center m-0 p-1">
            {failText !== "" ? failText : failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
};

export const MessageComponent = ({ variant, children }) => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="row justify-content-center m-0 p-1">
      <Alert variant={variant} className="text-center m-0 p-1">
        {children}
      </Alert>
    </div>
  );
};

export const LoaderComponent = () => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "block",
      }}
    >
      ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
    </Spinner>
  );
};

export const AccordionComponent = ({
  key_target,
  isCollapse = true,
  title,
  text_style = "text-danger",
  header_style = "bg-danger bg-opacity-10",
  body_style = "bg-danger bg-opacity-10",
  children,
}) => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-1">
      <div className="accordion m-0 p-0" id="accordionExample">
        <div className="accordion-item custom-background-transparent-middle m-0 p-0">
          <h2
            className="accordion-header custom-background-transparent-low m-0 p-0"
            id="accordion_heading_1"
          >
            <button
              className={`accordion-button m-0 p-0 ${header_style}`}
              type="button"
              data-bs-toggle=""
              data-bs-target={`#${key_target}`}
              aria-expanded="false"
              aria-controls={key_target}
              onClick={(e) => utils.ChangeAccordionCollapse([key_target])}
            >
              <h6 className={`lead m-0 p-3 ${text_style}`}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (нажмите сюда, для переключения)
                </small>
              </h6>
            </button>
          </h2>
          <div
            id={key_target}
            className={
              isCollapse
                ? "accordion-collapse collapse m-0 p-0"
                : "accordion-collapse m-0 p-0"
            }
            aria-labelledby={key_target}
            data-bs-parent="#accordionExample"
          >
            <div className={`accordion-body m-0 p-0 ${body_style}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SalaryTableComponent = ({ tab = {} }) => {
  let header = tab[0];
  let thead_array = [];
  for (let i in tab[1]["Fields"]) {
    if (
      tab[1]["Fields"][i] !== "ВсегоДни" &&
      tab[1]["Fields"][i] !== "ВсегоЧасы"
    ) {
      thead_array.push(tab[1]["Fields"][i]);
    }
  }
  let tbody_array = [];
  for (let i in tab[1]) {
    if (i !== "Fields") {
      let local_tbody_array = [];
      for (let j in tab[1][i]) {
        if (j !== "ВсегоДни" && j !== "ВсегоЧасы") {
          local_tbody_array.push(tab[1][i][j]);
        }
      }
      tbody_array.push(local_tbody_array);
    }
  }
  function getValue(value) {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else {
      return value;
    }
  }
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <li className="col-12 col-md-6 col-lg-6 m-0 p-3 my-1">
      <h6 className="lead fw-bold bold m-0 p-0">{header.slice(2)}</h6>
      <table className="table table-sm table-condensed table-striped table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
        <thead className="m-0 p-0 mb-1">
          <tr className="m-0 p-0">
            {thead_array.map((thead, index_h) => (
              <th
                key={index_h}
                className={
                  index_h === 4
                    ? "text-center w-25 m-0 p-p-1"
                    : "text-center m-0 p-p-1"
                }
              >
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="m-0 p-0">
          {tbody_array.map((tbody, index_i) => (
            <tr key={index_i} className="m-0 p-0">
              {tbody.slice(0, 1).map((body, index_j) => (
                <td key={index_j} className="text-start m-0 p-1">
                  {body}
                </td>
              ))}
              {tbody.slice(1, -1).map((body, index_j) => (
                <td key={index_j} className="text-end m-0 p-1">
                  {body ? body : ""}
                </td>
              ))}
              {tbody.slice(-1).map((body, index_j) => (
                <td
                  key={index_j}
                  className={
                    index_j === 0 ? "text-end m-0 p-0" : "text-end m-0 p-1"
                  }
                >
                  {body ? getValue(body) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  );
};
