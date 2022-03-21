///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect } from "react";
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
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as constants from "./constants";
import * as utils from "./utils";
import * as actions from "./actions";
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
export const HeaderComponent = ({
  logic = true,
  redirect = true,
  title = "",
  description = "",
}) => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (logic) {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(actions.userDetailsAction(form));
    }
  }, [dispatch, logic]);
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
    dataUserLogin,
    location.pathname,
    navigate,
    dispatch,
    logic,
    errorUserDetails,
    dataUserDetails,
  ]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (userDetailsStore) {
      if (!utils.CheckPageAccess(userDetailsStore, location) && redirect) {
        navigate("/home");
      }
    }
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
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
                  utils.CheckAccess(userDetailsStore, module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={module.Header}
                      id="basic-nav-dropdown"
                      className="btn btn-light m-1 p-0"
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          utils.CheckAccess(
                            userDetailsStore,
                            section.Access
                          ) && (
                            <li key={section_i}>
                              <strong className="dropdown-header text-center m-1 p-0">
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
                                      userDetailsStore,
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
          <div className="card shadow custom-background-transparent-middle">
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
export const FooterComponent = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <footer className="footer m-0 p-0 pt-3">
      <div className="">
        <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center m-0 p-0">
          <li className="m-1">
            <a className="btn btn-sm btn-outline-secondary text-white" href="#">
              <i className="fa fa-arrow-up">{"  "} вверх</i>
              {"  "}
              <i className="fa fa-arrow-up"> </i>
            </a>
          </li>
          <li className="m-1">
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
                    km.kz
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://www.km-open.online/"
                  >
                    km-open.online
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://web.cplus.kz/"
                  >
                    web.cplus.kz
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="dropdown-item"
                    href="https://chrysotile.kz/"
                  >
                    chrysotile.kz
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
          <li className="m-1">
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
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
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
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
    <div key={keyStatus} className="m-0 p-0 my-1">
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
              <span className="sr-only m-0 p-1" />
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
export const ModulesComponent = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (!dataUserDetails) {
      dispatch(actions.userDetailsAction());
    }
  }, [dispatch]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      {constants.modules && (
        <div>
          <h2>Модули:</h2>
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailsStore, module.Access) &&
                  module.ShowInModules && (
                    <div key={module_i} className="border shadow text-center  ">
                      <div className="card-header m-0 p-0 lead">
                        {module["Header"]}
                      </div>
                      <div className="text-center">
                        <img
                          src={module["Image"]}
                          className="img-fluid w-25"
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
                                  className="card-body m-0 p-0 text-end  "
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled d-flex  ">
                                      <div className="">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled"
                                      >
                                        <Nav.Link>
                                          <small className="fw-bold text-light">
                                            {section["Header"]}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    </li>
                                    <ul className="list-group-flush   m-1">
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
                                                    className="list-group-item list-group-item-action  "
                                                  >
                                                    {link.ExternalLink ? (
                                                      <a
                                                        key={link_i}
                                                        className={
                                                          link["Active"]
                                                            ? "text-dark dropdown-item"
                                                            : "disabled"
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
                                                        <Nav.Link>
                                                          <small className="text-dark">
                                                            {link["Header"]}
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
                                                    className="list-group-item list-group-item-action disabled   m-1"
                                                  >
                                                    <LinkContainer
                                                      to={
                                                        link["Link"]
                                                          ? link["Link"]
                                                          : "#"
                                                      }
                                                      className="disabled"
                                                    >
                                                      <Nav.Link>
                                                        <small className="text-muted">
                                                          {link["Header"]} (
                                                          <small className="text-danger">
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
/////////////////////////////////////////////////////////////////////////////////////TODO default export const component
export const NewsComponent = (count = 100) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div className="card list-group list-group-item-action list-group-flush custom-background-blured-95">
      <div className="border-bottom scrollarea">
        <LinkContainer to="/news" className=" ">
          <Nav.Link className="m-0 p-0">
            <div
              className="list-group-item active m-0 p-2 lh-tight shadow"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1 lead">Лента</strong>
                <strong className="text-warning">Свежие сверху</strong>
              </div>
              {count.count <= 9 && (
                <div className="col-10 mb-1 small">
                  нажмите сюда для просмотра всех изменений
                </div>
              )}
            </div>
          </Nav.Link>
        </LinkContainer>
        {constants.news.slice(0, count.count).map((news_elem, index) => (
          <div key={index}>
            <Link
              to={news_elem.Link}
              className={
                news_elem.Status !== "active"
                  ? "list-group-item list-group-item-action py-1 lh-tight bg-secondary bg-opacity-10"
                  : "list-group-item list-group-item-action py-1 lh-tight bg-success bg-opacity-10"
              }
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (
                    <small className="text-primary"> (ссылка)</small>
                  )}
                </strong>
                <small className="text-muted">
                  {news_elem.Status !== "active" ? (
                    <strong className="text-secondary text-start">
                      (в разработке)
                    </strong>
                  ) : (
                    <strong className="text-success text-start">
                      (завершено)
                    </strong>
                  )}
                </small>
              </div>
              <div className="col-10 mb-1 small">
                {news_elem.Description}
                {news_elem.Helps && (
                  <small className="text-secondary"> ({news_elem.Helps})</small>
                )}
                {news_elem.Danger && (
                  <small className="text-danger"> ({news_elem.Danger})</small>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
