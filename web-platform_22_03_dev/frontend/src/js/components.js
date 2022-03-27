///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
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
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as constants from "./constants";
import * as utils from "./utils";
import * as actions from "./actions";
////////////////////////////////////////////////////////////////////////////////////////////////////TODO base components
export const HeaderComponent = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const { title, description, logic, redirect } = utils.GetInfoPage(location);
  const [firstRefreshUserDetails, firstRefreshUserDetailsSet] = useState(true);
  const [firstRefreshNotification, firstRefreshNotificationSet] =
    useState(true);
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userLoginStore = useSelector((state) => state.userLoginStore);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginStore;
  //////////////////////////////////////////////////////////
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
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
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (!dataUserDetails) {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(actions.userDetailsAction(form));
    } else {
      if (firstRefreshUserDetails && logic) {
        firstRefreshUserDetailsSet(false);
        dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
      }
      if (!utils.CheckPageAccess(userDetailsStore, location) && redirect) {
        navigate("/");
      }
    }
  }, [
    dataUserDetails,
    dispatch,
    firstRefreshUserDetails,
    logic,
    location,
    redirect,
    navigate,
  ]);
  //////////////////////////////////////////////////////////
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
    logic,
    dataUserLogin,
    location,
    redirect,
    dispatch,
    navigate,
    dataUserDetails,
  ]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataNotificationList) {
      const form = {
        "Action-type": "NOTIFICATION_LIST",
      };
      dispatch(actions.notificationListAction(form));
    } else {
      if (firstRefreshNotification) {
        firstRefreshNotificationSet(false);
        dispatch({ type: constants.NOTIFICATION_LIST_RESET_CONSTANT });
      }
    }
  }, [dispatch, firstRefreshNotification]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <header className="header navbar-fixed-top m-0 p-0 pb-3">
      <Navbar expand="lg" className="m-0 p-0">
        <Container>
          <a className="w-25 m-0 p-0" href="https://km.kz/">
            <img src="/static/img/logo.png" className="w-25 m-0 p-0" alt="id" />
          </a>
          <a className="btn btn-outline-light navbar-brand m-0 p-2" href="/">
            Домашняя
          </a>
          {dataNotificationList && dataNotificationList.length > 0 && (
            <span className="badge bg-danger rounded-pill m-0 p-2 mx-3">
              {" "}
              !{" "}
            </span>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
            <Nav className="me-auto m-0 p-0">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailsStore, module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={
                        module.Header !== "Профиль" ? (
                          module.Header
                        ) : (
                          <span className="m-0 p-0">
                            {module.Header}{" "}
                            {dataNotificationList &&
                              dataNotificationList.length > 0 && (
                                <span className="badge bg-danger rounded-pill m-0 p-2">
                                  {dataNotificationList.length}
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
                            userDetailsStore,
                            section.Access
                          ) && (
                            <li key={section_i} className="m-0 p-1">
                              <strong className="dropdown-header text-center m-0 p-0">
                                {section.Header}
                              </strong>
                              {section.Links.map((link, link_i) =>
                                link.ExternalLink
                                  ? utils.CheckAccess(
                                      userDetailsStore,
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
                                        {link.Header}
                                      </a>
                                    )
                                  : utils.CheckAccess(
                                      userDetailsStore,
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
                                          className={`${link.Style} m-0 p-1`}
                                        >
                                          {link.Header}{" "}
                                          {link.Header === "Уведомления" &&
                                            dataNotificationList &&
                                            dataNotificationList.length > 0 && (
                                              <span className="badge bg-danger rounded-pill m-0 p-2">
                                                {dataNotificationList.length}
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
                      Выйти <i className="fa-solid fa-user m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти <i className="fa-solid fa-user m-0 p-1" />
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
              <p className="lead fw-normal m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FooterComponent = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <footer className="footer m-0 p-0 pt-3">
      <div className="">
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
                  <strong className="dropdown-header">
                    Telegram / WhatsApp
                  </strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    +7 747 261 03 59
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ModulesComponent = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div className="m-0 p-0">
      {constants.modules && (
        <div className="m-0 p-0">
          <h6 className="display-6 text-center card-header bg-light bg-opacity-100 m-0 p-1">
            Модули:
          </h6>
          <div className="m-0 p-0">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailsStore, module.Access) &&
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
                                userDetailsStore,
                                section.Access
                              ) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end m-0 p-0"
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled d-flex m-0 p-1">
                                      <div className="">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25 m-0 p-0"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled m-0 p-0"
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
                                                  userDetailsStore,
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
                                                            {link["Header"]}
                                                            {"  "}
                                                            {link.Header ===
                                                              "Уведомления" &&
                                                              dataNotificationList &&
                                                              dataNotificationList.length >
                                                                0 && (
                                                                <span className="badge bg-danger rounded-pill m-0 p-2">
                                                                  {
                                                                    dataNotificationList.length
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
                                                  userDetailsStore,
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
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
//////////////////////////////////////////////////////////////////////////////////////////////////TODO custom components
export const LoaderComponent = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const MessageComponent = ({ variant, children }) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div className="row justify-content-center m-0 p-1">
      <Alert variant={variant} className="text-center m-0 p-1">
        {children}
      </Alert>
    </div>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const NewsComponent = ({ count = 100 }) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
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
                <strong className="lead m-0 p-0 mb-1">Лента</strong>
                <strong className="text-warning m-0 p-0">Свежие сверху</strong>
              </div>
              {count !== 100 && (
                <div className="small m-0 p-0 mb-1">
                  нажмите сюда для просмотра всех изменений
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
                    <small className="text-primary m-0 p-0"> (ссылка)</small>
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <li className="m-0 p-1">
      <h6 className="lead fw-bold bold">{header}</h6>
      <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
        <thead>
          <tr>
            {thead_array.map((thead, index_h) => (
              <th key={index_h} className="text-center">
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody_array.map((tbody, index_i) => (
            <tr key={index_i}>
              {tbody.slice(0, 1).map((body, index_j) => (
                <td key={index_j} className="text-start">
                  {body}
                </td>
              ))}
              {tbody.slice(1, -1).map((body, index_j) => (
                <td key={index_j} className="text-end">
                  {body ? body : ""}
                </td>
              ))}
              {tbody.slice(-1).map((body, index_j) => (
                <td key={index_j} className="text-end">
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AccordionComponent = ({
  key_target,
  isCollapse = true,
  title,
  text_style = "text-danger",
  header_style = "bg-danger bg-opacity-10",
  body_style = "bg-danger bg-opacity-10",
  children,
}) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
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
////////////////////////////////////////////////////////////////////////////////////////////////////TODO test components
export const RationalComponent = ({ object, shortView = false }) => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div
      className={
        shortView ? "card list-group-item-action shadow  " : "card shadow  "
      }
    >
      <div className="card-header m-0 p-0   bg-opacity-10 bg-primary">
        <h6 className="lead fw-bold">
          {object["name_char_field"]}{" "}
          {utils.CheckAccess(userDetailsStore, "rational_admin") && (
            <small className="text-danger">
              [{utils.GetSliceString(object["status_moderate_char_field"], 30)}]
            </small>
          )}
        </h6>
      </div>
      <div className="card-body m-0 p-0">
        <label className="form-control-sm m-0 p-0">
          Подразделение:
          <select
            id="subdivision"
            name="subdivision"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["subdivision_char_field"]}</option>
          </select>
        </label>
        <label className="form-control-sm m-0 p-0">
          Зарегистрировано за №{" "}
          <strong className="btn btn-light disabled">
            {object["number_char_field"]}
          </strong>
        </label>
      </div>

      <div className="card-body m-0 p-0  ">
        <label className="form-control-sm m-0 p-1">
          Сфера:
          <select
            id="sphere"
            name="sphere"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["sphere_char_field"]}</option>
          </select>
        </label>
        <label className="form-control-sm m-0 p-1">
          Категория:
          <select
            id="category"
            name="category"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["category_char_field"]}</option>
          </select>
        </label>
      </div>
      <div className="card-body m-0 p-0  ">
        <img
          src={utils.GetStaticFile(object["avatar_image_field"])}
          className={
            shortView
              ? "card-img-top img-fluid w-25"
              : "card-img-top img-fluid w-100"
          }
          alt="id"
        />
      </div>
      <div className="card-body m-0 p-0  ">
        <label className="w-100 form-control-sm">
          Место внедрения:
          <input
            type="text"
            id="name_char_field"
            name="name_char_field"
            required
            placeholder="Цех / участок / отдел / лаборатория и т.п."
            defaultValue={object["place_char_field"]}
            readOnly={true}
            minLength="1"
            maxLength="100"
            className="form-control form-control-sm"
          />
        </label>
      </div>
      <div className="card-body m-0 p-0  ">
        <label className="w-100 form-control-sm m-0 p-1">
          Описание:
          <textarea
            required
            placeholder="Описание"
            defaultValue={
              !shortView
                ? utils.GetSliceString(object["description_text_field"], 50)
                : object["description_text_field"]
            }
            readOnly={true}
            minLength="1"
            maxLength="5000"
            rows="3"
            className="form-control form-control-sm"
          />
        </label>
      </div>
      {!shortView && (
        <div className="card-body m-0 p-0  ">
          <label className="form-control-sm m-0 p-1">
            Word файл-приложение:
            <a
              className="btn btn-sm btn-primary m-0 p-1"
              href={utils.GetStaticFile(object["additional_word_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-0 p-1">
            Pdf файл-приложение:
            <a
              className="btn btn-sm btn-danger m-0 p-1"
              href={utils.GetStaticFile(object["additional_pdf_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-0 p-1">
            Excel файл-приложение:
            <a
              className="btn btn-sm btn-success m-0 p-1"
              href={utils.GetStaticFile(object["additional_excel_file_field"])}
            >
              Скачать документ
            </a>
          </label>
        </div>
      )}
      <div className="card-body m-0 p-0  ">
        <Link to={`#`} className="text-decoration-none btn btn-sm btn-warning">
          Автор: {object["user_model"]["last_name_char_field"]}{" "}
          {object["user_model"]["first_name_char_field"]}{" "}
          {object["user_model"]["patronymic_char_field"]}
        </Link>
      </div>
      {!shortView && (
        <label className="w-100 form-control-sm m-0 p-1">
          Участники:
          {object["user1_char_field"] &&
            object["user1_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user1_char_field"]}
                placeholder="участник № 1"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user2_char_field"] &&
            object["user2_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user2_char_field"]}
                placeholder="участник № 2"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user3_char_field"] &&
            object["user3_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user3_char_field"]}
                placeholder="участник № 3"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user4_char_field"] &&
            object["user4_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user4_char_field"]}
                placeholder="участник № 4"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user5_char_field"] &&
            object["user5_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user5_char_field"]}
                placeholder="участник № 5"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
        </label>
      )}
      <div className="card-body m-0 p-0  ">
        <label className="text-muted border p-1 m-0 p-1">
          подано:{" "}
          <p className=" ">
            {utils.GetCleanDateTime(object["created_datetime_field"], true)}
          </p>
        </label>
        <label className="text-muted border p-1 m-0 p-1">
          зарегистрировано:{" "}
          <p className=" ">
            {utils.GetCleanDateTime(object["register_datetime_field"], true)}
          </p>
        </label>
      </div>
      {shortView && (
        <div className="card-header m-0 p-0  ">
          <Link
            className="btn btn-sm btn-primary w-100"
            to={`/rational_detail/${object.id}`}
          >
            Подробнее
          </Link>
        </div>
      )}
    </div>
  );
};
