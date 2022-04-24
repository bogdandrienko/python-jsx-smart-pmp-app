"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarComponent3 = exports.NavbarComponent2 = exports.NavbarComponent1 = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
// @ts-ignore
var react_router_bootstrap_1 = require("react-router-bootstrap");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("../action");
var constant = require("../constant");
var hook = require("../hook");
var router = require("../router");
var util = require("../util");
var context_1 = require("../context");
var button_1 = require("./button");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var NavbarComponent1 = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var _a = util.GetInfoPage(location.pathname), title = _a.title, description = _a.description, access = _a.access;
    var userLoginStore = hook.useSelectorCustom1(constant.userLoginStore);
    var userDetailStore = hook.useSelectorCustom1(constant.userDetailStore);
    var NotificationReadListStore = hook.useSelectorCustom1(constant.NotificationReadListStore);
    (0, react_1.useEffect)(function () {
        if (userLoginStore.data) {
            localStorage.setItem("userToken", JSON.stringify(userLoginStore.data));
            dispatch(action.User.UserDetailAction(constant.userDetailStore));
            dispatch(action.Notification.ReadListAction(constant.NotificationReadListStore, 1, 10));
        }
    }, [userLoginStore.data]);
    (0, react_1.useEffect)(function () {
        if (userDetailStore.data) {
            if (userDetailStore.data["user_model"]) {
                if (!util.CheckPageAccess(userDetailStore.data["group_model"], access)) {
                    navigate("/");
                }
                if (userDetailStore.data["user_model"]["activity_boolean_field"] === false) {
                    dispatch(action.userLogoutAction());
                }
                if ((!userDetailStore.data["user_model"]["secret_question_char_field"] ||
                    !userDetailStore.data["user_model"]["secret_answer_char_field"]) &&
                    location.pathname !== "/password/change") {
                    navigate("/password/change");
                }
            }
        }
    }, [userDetailStore.data]);
    return (<div className="m-0 p-0 pb-3">
      <header className="header navbar-fixed-top bg-dark bg-opacity-10 shadow-lg m-0 p-0">
        <react_bootstrap_1.Navbar expand="lg" className="m-0 p-0">
          <react_bootstrap_1.Container className="">
            <a className="m-0 p-0" href="/">
              <img src="/static/img/logo.svg" className="img-responsive btn btn-outline-light m-0 p-2" alt="id"/>
            </a>
            {NotificationReadListStore.data && (<i className="fa-solid fa-bell text-danger m-0 p-2"/>)}
            <react_bootstrap_1.Navbar.Toggle aria-controls="basic-navbar-nav" className="btn btn-success text-success bg-warning bg-opacity-50">
              <span className="navbar-toggler-icon text-success"/>
            </react_bootstrap_1.Navbar.Toggle>
            <react_bootstrap_1.Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
              <react_bootstrap_1.Nav className="me-auto m-0 p-0">
                {router.modules.map(function (module, m_index) {
            return util.CheckAccess(userDetailStore, module.Access) && (<react_bootstrap_1.NavDropdown title={<span>
                            <i className="fa-solid fa-earth-asia m-0 p-0"/>{" "}
                            {module.Header === "Профиль" ? (NotificationReadListStore.data ? (<span className="m-0 p-1">
                                  {module.Header}
                                  <i className="fa-solid fa-bell text-danger m-0 p-1"/>
                                  {NotificationReadListStore.data["x-total-count"]}
                                </span>) : (module.Header)) : (module.Header)}
                          </span>} key={m_index} id="basic-nav-dropdown" className="btn btn-sm btn-dark custom-background-transparent-low-middle m-1 p-0">
                        {module.Sections.map(function (section, s_index) {
                    return util.CheckAccess(userDetailStore, section.Access) && (<li className="m-0 p-1" key={s_index}>
                                <strong className="dropdown-header text-center m-0 p-0">
                                  {section.Header}
                                </strong>
                                {section.Links.map(function (link, l_index) {
                            return link.ShowLink &&
                                util.CheckAccess(userDetailStore, link.Access) && (<react_router_bootstrap_1.LinkContainer to={link.Link} className="custom-hover m-0 p-0" key={l_index}>
                                        <react_bootstrap_1.Nav.Link className={link.Style + " m-0 p-0"}>
                                          <span className={link.Style +
                                    " badge rounded-pill m-0 p-0"}>
                                            <i className={link.LinkIcon + " m-0 p-1"}/>
                                          </span>
                                          <small>
                                            {link.Header === "Уведомления" ? (NotificationReadListStore.data ? (<span className="m-0 p-1">
                                                  {link.Header}
                                                  <i className="fa-solid fa-bell text-danger m-0 p-1"/>
                                                  {NotificationReadListStore
                                        .data["x-total-count"]}
                                                </span>) : (link.Header)) : (link.Header)}
                                          </small>
                                        </react_bootstrap_1.Nav.Link>
                                      </react_router_bootstrap_1.LinkContainer>);
                        })}
                                <react_bootstrap_1.NavDropdown.Divider className="m-0 p-0"/>
                              </li>);
                })}
                      </react_bootstrap_1.NavDropdown>);
        })}
              </react_bootstrap_1.Nav>
              {!userLoginStore.data ? (<react_router_bootstrap_1.LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <react_bootstrap_1.Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти{" "}
                      <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1"/>
                    </button>
                  </react_bootstrap_1.Nav.Link>
                </react_router_bootstrap_1.LinkContainer>) : (<react_router_bootstrap_1.LinkContainer to="/logout" className="text-center m-0 p-1 mx-1">
                  <react_bootstrap_1.Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-danger m-0 p-2">
                      Выйти <i className="fa-solid fa-door-open m-0 p-1"/>
                    </button>
                  </react_bootstrap_1.Nav.Link>
                </react_router_bootstrap_1.LinkContainer>)}
            </react_bootstrap_1.Navbar.Collapse>
          </react_bootstrap_1.Container>
        </react_bootstrap_1.Navbar>
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
    </div>);
};
exports.NavbarComponent1 = NavbarComponent1;
var NavbarComponent2 = function () {
    // @ts-ignore
    var _a = (0, react_1.useContext)(context_1.default), isAuth = _a.isAuth, setIsAuth = _a.setIsAuth;
    // @ts-ignore
    var logout = function (event) {
        event.preventDefault();
        setIsAuth(false);
        localStorage.removeItem("auth");
    };
    return (<div className="custom_navbar_1">
      <button_1.Button1 onClick={logout}>logout</button_1.Button1>
      <div className="custom_navbar_1_links">
        <react_router_dom_1.Link to="/" className="custom_navbar_1_link">
          home
        </react_router_dom_1.Link>
      </div>
    </div>);
};
exports.NavbarComponent2 = NavbarComponent2;
var NavbarComponent3 = function () {
    // @ts-ignore
    var _a = (0, react_1.useContext)(context_1.default), isAuth = _a.isAuth, setIsAuth = _a.setIsAuth;
    // @ts-ignore
    var logout = function (event) {
        event.preventDefault();
        setIsAuth(false);
        localStorage.removeItem("auth");
    };
    return (<header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/frontend_template_pwa_typescript/src/pages" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"/>
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
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>);
};
exports.NavbarComponent3 = NavbarComponent3;
