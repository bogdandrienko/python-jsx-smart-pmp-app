"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionComponent = exports.NewsComponent = exports.ModulesComponent = exports.LoaderComponent = exports.MessageComponent = exports.StoreStatus1 = exports.StoreComponent = exports.StoreStatusComponent = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_bootstrap_1 = require("react-bootstrap");
// @ts-ignore
var react_router_bootstrap_1 = require("react-router-bootstrap");
var constant = require("./constant");
var hook = require("./hook");
var router = require("./router");
var util = require("./util");
var react_router_dom_1 = require("react-router-dom");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var StoreStatusComponent = function (_a) {
    var 
    // @ts-ignore
    storeStatus = _a.storeStatus, _b = _a.keyStatus, keyStatus = _b === void 0 ? "StoreStatus" : _b, _c = _a.consoleLog, consoleLog = _c === void 0 ? false : _c, _d = _a.showLoad, showLoad = _d === void 0 ? true : _d, _e = _a.loadText, loadText = _e === void 0 ? "" : _e, _f = _a.showData, showData = _f === void 0 ? true : _f, _g = _a.dataText, dataText = _g === void 0 ? "" : _g, _h = _a.showError, showError = _h === void 0 ? true : _h, _j = _a.errorText, errorText = _j === void 0 ? "" : _j, _k = _a.showFail, showFail = _k === void 0 ? true : _k, _l = _a.failText, failText = _l === void 0 ? "" : _l;
    /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
    var loadStatus = storeStatus.load, dataStatus = storeStatus.data, errorStatus = storeStatus.error, failStatus = storeStatus.fail;
    if (consoleLog) {
        console.log("".concat(keyStatus), storeStatus);
    }
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div key={keyStatus} className="m-0 p-0">
      {showLoad && loadStatus && (<div className="row justify-content-center m-0 p-0">
          {loadText !== "" ? (<react_bootstrap_1.Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </react_bootstrap_1.Alert>) : (<react_bootstrap_1.Spinner animation="border" role="status" style={{
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    display: "block",
                }} className="text-center m-0 p-0">
              <small className="m-0 p-0">ждите</small>
              <span className="sr-only m-0 p-0"/>
            </react_bootstrap_1.Spinner>)}
        </div>)}
      {showData && dataStatus && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"success"} className="text-center m-0 p-1">
            {dataText !== "" ? dataText : dataStatus}
          </react_bootstrap_1.Alert>
        </div>)}
      {showError && errorStatus && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText !== "" ? errorText : errorStatus}
          </react_bootstrap_1.Alert>
        </div>)}
      {showFail && failStatus && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"warning"} className="text-center m-0 p-1">
            {failText !== "" ? failText : failStatus}
          </react_bootstrap_1.Alert>
        </div>)}
    </div>);
};
exports.StoreStatusComponent = StoreStatusComponent;
var StoreComponent = function (_a) {
    var 
    // @ts-ignore
    storeStore = _a.storeStatus, _b = _a.consoleLog, consoleLog = _b === void 0 ? false : _b, _c = _a.showLoad, showLoad = _c === void 0 ? true : _c, _d = _a.loadText, loadText = _d === void 0 ? "" : _d, _e = _a.showData, showData = _e === void 0 ? true : _e, _f = _a.dataText, dataText = _f === void 0 ? "" : _f, _g = _a.showError, showError = _g === void 0 ? true : _g, _h = _a.errorText, errorText = _h === void 0 ? "" : _h, _j = _a.showFail, showFail = _j === void 0 ? true : _j, _k = _a.failText, failText = _k === void 0 ? "" : _k;
    /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
    var storeConstant = storeStore.data.split("_")[0];
    var _l = (0, react_redux_1.useSelector)(function (state) { return state[storeConstant]; }), loadStore = _l.load, dataStore = _l.data, errorStore = _l.error, failStore = _l.fail;
    if (consoleLog) {
        console.log("".concat(storeConstant), {
            load: loadStore,
            data: dataStore,
            error: errorStore,
            fail: failStore,
        });
    }
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div key={storeConstant} className="m-0 p-0">
      {showLoad && loadStore && (<div className="row justify-content-center m-0 p-0">
          {loadText ? (<react_bootstrap_1.Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </react_bootstrap_1.Alert>) : (<react_bootstrap_1.Spinner animation="border" role="status" style={{
                    height: "40px",
                    width: "40px",
                    margin: "auto",
                    display: "block",
                }} className="text-center m-0 p-0">
              <span className="sr-only m-0 p-0"/>
            </react_bootstrap_1.Spinner>)}
        </div>)}
      {showData && dataStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"success"} className="text-center m-0 p-1">
            {dataText
                ? dataText
                : typeof dataStore === "string"
                    ? dataStore
                    : "произошла ошибка"}
          </react_bootstrap_1.Alert>
        </div>)}
      {showError && errorStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText ? errorText : errorStore}
          </react_bootstrap_1.Alert>
        </div>)}
      {showFail && failStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"warning"} className="text-center m-0 p-1">
            {failText ? failText : failStore}
          </react_bootstrap_1.Alert>
        </div>)}
    </div>);
};
exports.StoreComponent = StoreComponent;
var StoreStatus1 = function (_a) {
    var 
    // @ts-ignore
    storeConstant = _a.storeConstant, _b = _a.consoleLog, consoleLog = _b === void 0 ? false : _b, _c = _a.showLoad, showLoad = _c === void 0 ? true : _c, _d = _a.loadText, loadText = _d === void 0 ? "" : _d, _e = _a.showData, showData = _e === void 0 ? true : _e, _f = _a.dataText, dataText = _f === void 0 ? "" : _f, _g = _a.showError, showError = _g === void 0 ? true : _g, _h = _a.errorText, errorText = _h === void 0 ? "" : _h, _j = _a.showFail, showFail = _j === void 0 ? true : _j, _k = _a.failText, failText = _k === void 0 ? "" : _k;
    /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
    var loadStore = storeConstant.load, dataStore = storeConstant.data, errorStore = storeConstant.error, failStore = storeConstant.fail;
    if (consoleLog) {
        console.log("".concat(storeConstant), {
            load: loadStore,
            data: dataStore,
            error: errorStore,
            fail: failStore,
        });
    }
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div key={storeConstant} className="m-0 p-0">
      {showLoad && loadStore && (<div className="row justify-content-center m-0 p-0">
          {loadText ? (<react_bootstrap_1.Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </react_bootstrap_1.Alert>) : (<react_bootstrap_1.Spinner animation="border" role="status" style={{
                    height: "40px",
                    width: "40px",
                    margin: "auto",
                    display: "block",
                }} className="text-center m-0 p-0">
              <span className="sr-only m-0 p-0"/>
            </react_bootstrap_1.Spinner>)}
        </div>)}
      {showData && dataStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"success"} className="text-center m-0 p-1">
            {dataText
                ? dataText
                : typeof dataStore === "string"
                    ? dataStore
                    : "произошла ошибка"}
          </react_bootstrap_1.Alert>
        </div>)}
      {showError && errorStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText ? errorText : errorStore}
          </react_bootstrap_1.Alert>
        </div>)}
      {showFail && failStore && (<div className="row justify-content-center m-0 p-0">
          <react_bootstrap_1.Alert variant={"warning"} className="text-center m-0 p-1">
            {failText ? failText : failStore}
          </react_bootstrap_1.Alert>
        </div>)}
    </div>);
};
exports.StoreStatus1 = StoreStatus1;
// @ts-ignore
var MessageComponent = function (_a) {
    var variant = _a.variant, children = _a.children;
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div className="row justify-content-center m-0 p-1">
      <react_bootstrap_1.Alert variant={variant} className="text-center m-0 p-1">
        {children}
      </react_bootstrap_1.Alert>
    </div>);
};
exports.MessageComponent = MessageComponent;
var LoaderComponent = function () {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<react_bootstrap_1.Spinner animation="border" role="status" style={{
            height: "50px",
            width: "50px",
            margin: "auto",
            display: "block",
        }}>
      ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
    </react_bootstrap_1.Spinner>);
};
exports.LoaderComponent = LoaderComponent;
var ModulesComponent = function () {
    // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
    var NotificationReadListStore = hook.useSelectorCustom1(constant.NotificationReadListStore);
    var userDetailStore = hook.useSelectorCustom1(constant.userDetailStore);
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div className="shadow text-center m-0 p-0">
      {router.modules && (<div className="m-0 p-0">
          <h6 className="display-6 text-center card-header bg-light bg-opacity-100 m-0 p-1">
            Модули:
          </h6>
          <div className="m-0 p-0">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
              {router.modules.map(function (module, module_i) {
                return util.CheckAccess(userDetailStore, module.Access) &&
                    module.ShowInModules && (<div key={module_i} className="text-center m-0 p-1">
                      <div className="lead card-header border shadow bg-light bg-opacity-100 custom-background-transparent-hard m-0 p-0">
                        {module["Header"]}
                      </div>
                      <div className="text-center custom-background-transparent-middle m-0 p-0">
                        <img src={module["Image"]} className="img-fluid w-25 m-0 p-0" alt="id"/>
                      </div>
                      {module["Sections"]
                        ? module["Sections"].map(function (section, section_i) {
                            return util.CheckAccess(userDetailStore, section.Access) && (<div key={section_i} className="card-body text-end m-0 p-0">
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled bg-primary bg-opacity-75 d-flex m-0 p-1">
                                      <div className="m-0 p-0">
                                        <img src={section["Image"]} className="img-fluid w-25 m-0 p-0" alt="id"/>
                                      </div>
                                      <react_router_bootstrap_1.LinkContainer to="#" className="disabled m-0 p-3">
                                        <react_bootstrap_1.Nav.Link>
                                          <small className="fw-bold text-light m-0 p-0">
                                            {section["Header"]}
                                          </small>
                                        </react_bootstrap_1.Nav.Link>
                                      </react_router_bootstrap_1.LinkContainer>
                                    </li>
                                    <ul className="list-group-flush m-0 p-0">
                                      {section["Links"]
                                    ? section["Links"].map(function (link, link_i) {
                                        return link["Active"]
                                            ? link.ShowLink &&
                                                util.CheckAccess(userDetailStore, link.Access) && (<li key={link_i} className="list-group-item list-group-item-action m-0 p-0">
                                                    {link.ExternalLink ? (<a key={link_i} className={link["Active"]
                                                        ? "text-dark dropdown-item m-0 p-0"
                                                        : "disabled m-0 p-1"} href={link["Link"]} target="_self">
                                                        <i className={link.LinkIcon}/>
                                                        {link["Header"]}
                                                      </a>) : (<react_router_bootstrap_1.LinkContainer to={link["Link"]}>
                                                        <react_bootstrap_1.Nav.Link className="m-0 p-1">
                                                          <small className={link.Style !== ""
                                                        ? "".concat(link.Style, " m-0 p-1")
                                                        : "text-dark m-0 p-1"}>
                                                            <i className={link.LinkIcon}/>
                                                            {link["Header"]}
                                                            {"  "}
                                                            {link.Header ===
                                                        "Уведомления" &&
                                                        NotificationReadListStore.data && (<span className="badge rounded-pill text-danger m-0 p-1">
                                                                  <i className="fa-solid fa-bell text-danger m-0 p-1"/>
                                                                  {NotificationReadListStore
                                                            .data["x-total-count"]}
                                                                </span>)}
                                                          </small>
                                                        </react_bootstrap_1.Nav.Link>
                                                      </react_router_bootstrap_1.LinkContainer>)}
                                                  </li>)
                                            : link.ShowLink &&
                                                util.CheckAccess(userDetailStore, link.Access) && (<li key={link_i} className="list-group-item list-group-item-action disabled m-0 p-0">
                                                    <react_router_bootstrap_1.LinkContainer to={link["Link"]
                                                    ? link["Link"]
                                                    : "#"} className="disabled m-0 p-0">
                                                      <react_bootstrap_1.Nav.Link>
                                                        <small className="text-muted m-0 p-0">
                                                          {link["Header"]} (
                                                          <small className="text-danger m-0 p-0">
                                                            В РАЗРАБОТКЕ
                                                          </small>
                                                          )
                                                        </small>
                                                      </react_bootstrap_1.Nav.Link>
                                                    </react_router_bootstrap_1.LinkContainer>
                                                  </li>);
                                    })
                                    : ""}
                                    </ul>
                                  </div>
                                </div>);
                        })
                        : ""}
                    </div>);
            })}
            </div>
          </div>
        </div>)}
    </div>);
};
exports.ModulesComponent = ModulesComponent;
var NewsComponent = function (_a) {
    var _b = _a.count, count = _b === void 0 ? 100 : _b;
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div className="card list-group list-group-item-action list-group-flush custom-background-transparent-low-middle m-0 p-0">
      <div className="border-bottom scrollarea m-0 p-0">
        <react_router_bootstrap_1.LinkContainer to="/news" className="m-0 p-0">
          <react_bootstrap_1.Nav.Link className="m-0 p-0">
            <div className="list-group-item active shadow m-0 p-2" aria-current="true">
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="lead m-0 p-0 mb-1">
                  <i className="fa-solid fa-newspaper m-0 p-1"/>
                  Лента
                </strong>
                <strong className="text-warning m-0 p-0">Свежие сверху</strong>
              </div>
              {count !== 100 && (<div className="small m-0 p-0 mb-1">
                  (нажмите сюда для просмотра всех изменений)
                </div>)}
            </div>
          </react_bootstrap_1.Nav.Link>
        </react_router_bootstrap_1.LinkContainer>
        {constant.news.slice(0, count).map(function (news_elem, index) { return (<div key={index} className="custom-hover m-0 p-0">
            <react_router_dom_1.Link to={news_elem.Link} className={news_elem.Status !== "active"
                ? "list-group-item list-group-item-action bg-secondary bg-opacity-10 m-0 p-1"
                : "list-group-item list-group-item-action bg-success bg-opacity-10 m-0 p-1"}>
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="m-0 p-0">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (<small className="custom-color-primary-1 m-0 p-0">
                      {" "}
                      (нажмите сюда для перехода)
                    </small>)}
                </strong>
                <small className="text-muted m-0 p-0">
                  {news_elem.Status !== "active" ? (<strong className="text-secondary text-start m-0 p-0">
                      (в разработке)
                    </strong>) : (<strong className="text-success text-start m-0 p-0">
                      (завершено)
                    </strong>)}
                </small>
              </div>
              <div className="small m-0 p-0">
                {news_elem.Description}
                {news_elem.Helps && (<small className="text-secondary m-0 p-0">
                    {" "}
                    ({news_elem.Helps})
                  </small>)}
                {news_elem.Danger && (<small className="text-danger m-0 p-0">
                    {" "}
                    ({news_elem.Danger})
                  </small>)}
              </div>
            </react_router_dom_1.Link>
          </div>); })}
      </div>
    </div>);
};
exports.NewsComponent = NewsComponent;
var AccordionComponent = function (_a) {
    var 
    // @ts-ignore
    key_target = _a.key_target, _b = _a.isCollapse, isCollapse = _b === void 0 ? true : _b, 
    // @ts-ignore
    title = _a.title, _c = _a.text_style, text_style = _c === void 0 ? "text-danger" : _c, _d = _a.header_style, header_style = _d === void 0 ? "bg-danger bg-opacity-10" : _d, _e = _a.body_style, body_style = _e === void 0 ? "bg-danger bg-opacity-10" : _e, 
    // @ts-ignore
    children = _a.children;
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div className="m-0 p-0">
      <div className="accordion m-0 p-0" id="accordionExample">
        <div className="accordion-item custom-background-transparent-middle m-0 p-0">
          <h2 className="accordion-header custom-background-transparent-low m-0 p-0" id="accordion_heading_1">
            <button className={"accordion-button m-0 p-0 ".concat(header_style)} type="button" data-bs-toggle="" data-bs-target={"#".concat(key_target)} aria-expanded="false" aria-controls={key_target} onClick={function (e) { return util.ChangeAccordionCollapse([key_target]); }}>
              <h6 className={"lead m-0 p-3 ".concat(text_style)}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (нажмите сюда, для переключения)
                </small>
              </h6>
            </button>
          </h2>
          <div id={key_target} className={isCollapse
            ? "accordion-collapse collapse m-0 p-0"
            : "accordion-collapse m-0 p-0"} aria-labelledby={key_target} data-bs-parent="#accordionExample">
            <div className={"accordion-body m-0 p-0 ".concat(body_style)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.AccordionComponent = AccordionComponent;
